import { TransactionEnvelope } from "@saberhq/solana-contrib";
import { createInitMintInstructions, createTokenAccount, getOrCreateATA, SPLToken, TOKEN_PROGRAM_ID, u64, } from "@saberhq/token-utils";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { SWAP_PROGRAM_ID, ZERO_TS } from "../constants.js";
import { initializeSwapInstruction as createInitializeStableSwapInstruction } from "../instructions/swap.js";
import { findSwapAuthorityKey, StableSwap } from "../stable-swap.js";
import { ZERO_FEES } from "../state/fees.js";
import { StableSwapLayout } from "../state/layout.js";
import { createMutableTransactionInstructions, mergeInstructions, } from "./instructions.js";
/**
 * Initializes a new StableSwap pool with a payer and stableSwapAccount.
 *
 * If you want to use a non-filesystem wallet as a payer, you'll want to generate
 * this transaction using StableSwap.createInitializeStableSwapTransaction
 * then sign it using the wallet directly.
 */
export const initializeStableSwap = async (provider, stableSwapAccount, initializeSwapInstruction) => {
    if (!stableSwapAccount.publicKey.equals(initializeSwapInstruction.config.swapAccount)) {
        throw new Error("stable swap public key");
    }
    const { instructions } = await createInitializeStableSwapInstructionsRaw({
        provider,
        initializeSwapInstruction,
    });
    const tx = new TransactionEnvelope(provider, instructions.slice());
    console.log("createAccount and InitializeSwap");
    const txSig = (await tx.confirm()).signature;
    console.log(`TxSig: ${txSig}`);
    return loadSwapFromInitializeArgs(initializeSwapInstruction);
};
/**
 * Creates a new instance of StableSwap from create args.
 * @param connection
 * @param initializeArgs
 * @returns
 */
export const loadSwapFromInitializeArgs = (initializeArgs) => {
    var _a, _b;
    return new StableSwap(initializeArgs.config, {
        isInitialized: true,
        nonce: initializeArgs.nonce,
        futureAdminDeadline: ZERO_TS,
        futureAdminAccount: PublicKey.default,
        adminAccount: initializeArgs.adminAccount,
        tokenA: initializeArgs.tokenA,
        tokenB: initializeArgs.tokenB,
        poolTokenMint: initializeArgs.poolTokenMint,
        initialAmpFactor: new u64(initializeArgs.ampFactor),
        isPaused: (_a = initializeArgs.isPaused) !== null && _a !== void 0 ? _a : false,
        targetAmpFactor: new u64(initializeArgs.ampFactor),
        startRampTimestamp: ZERO_TS,
        stopRampTimestamp: ZERO_TS,
        fees: (_b = initializeArgs.fees) !== null && _b !== void 0 ? _b : ZERO_FEES,
    });
};
/**
 * Creates a set of instructions to create a new StableSwap instance.
 *
 * After calling this, you must sign this transaction with the accounts:
 * - payer -- Account that holds the SOL to seed the account.
 * - args.config.stableSwapAccount -- This account is used once then its key is no longer relevant
 * - all returned signers
 */
export const createInitializeStableSwapInstructions = async ({ provider, swapProgramID = SWAP_PROGRAM_ID, adminAccount, tokenAMint, tokenBMint, ampFactor, fees, initialLiquidityProvider = adminAccount, useAssociatedAccountForInitialLP, swapAccountSigner = Keypair.generate(), poolTokenMintSigner = Keypair.generate(), seedPoolAccounts, }) => {
    const instructions = {
        createLPTokenMint: new TransactionEnvelope(provider, []),
        createInitialLPTokenAccount: new TransactionEnvelope(provider, []),
        createSwapTokenAAccounts: new TransactionEnvelope(provider, []),
        createSwapTokenBAccounts: new TransactionEnvelope(provider, []),
        seedPoolAccounts: createMutableTransactionInstructions(),
        initializeSwap: createMutableTransactionInstructions(),
    };
    // Create swap account if not specified
    const swapAccount = swapAccountSigner.publicKey;
    instructions.initializeSwap.signers.push(swapAccountSigner);
    // Create authority and nonce
    const [authority, nonce] = await findSwapAuthorityKey(swapAccount, swapProgramID);
    // Create LP token mint
    const { decimals } = await new SPLToken(provider.connection, tokenAMint, TOKEN_PROGRAM_ID, Keypair.generate()).getMintInfo();
    const mintBalanceNeeded = await SPLToken.getMinBalanceRentForExemptMint(provider.connection);
    instructions.createLPTokenMint = await createInitMintInstructions({
        provider,
        mintKP: poolTokenMintSigner,
        mintAuthority: authority,
        decimals,
    });
    const poolTokenMint = poolTokenMintSigner.publicKey;
    // Create initial LP token account
    let initialLPAccount = undefined;
    if (useAssociatedAccountForInitialLP) {
        const lpAccount = await getOrCreateATA({
            provider,
            mint: poolTokenMint,
            owner: initialLiquidityProvider,
            payer: provider.wallet.publicKey,
        });
        initialLPAccount = lpAccount.address;
        if (lpAccount.instruction) {
            instructions.createInitialLPTokenAccount = new TransactionEnvelope(provider, [lpAccount.instruction]);
        }
    }
    else {
        const { key: unassociatedInitialLPAccount, tx: initialLPInstructions } = await createTokenAccount({
            provider,
            mint: poolTokenMint,
            owner: initialLiquidityProvider,
            payer: provider.wallet.publicKey,
        });
        initialLPAccount = unassociatedInitialLPAccount;
        instructions.createInitialLPTokenAccount = initialLPInstructions;
    }
    // Create Swap Token A account
    const { info: tokenA, instructions: tokenAInstructions } = await initializeSwapTokenInfo({
        provider,
        mint: tokenAMint,
        authority,
        admin: adminAccount,
    });
    mergeInstructions(instructions.createSwapTokenAAccounts, tokenAInstructions);
    // Create Swap Token B account
    const { info: tokenB, instructions: tokenBInstructions } = await initializeSwapTokenInfo({
        provider,
        mint: tokenBMint,
        authority,
        admin: adminAccount,
    });
    mergeInstructions(instructions.createSwapTokenBAccounts, tokenBInstructions);
    // Seed the swap's Token A and token B accounts with tokens
    // On testnet, this is usually a mint.
    // On mainnet, this is usually a token transfer.
    const seedPoolAccountsResult = seedPoolAccounts({
        tokenAAccount: tokenA.reserve,
        tokenBAccount: tokenB.reserve,
    });
    mergeInstructions(instructions.seedPoolAccounts, seedPoolAccountsResult);
    const initializeSwapInstruction = {
        config: {
            swapAccount: swapAccount,
            authority,
            swapProgramID,
            tokenProgramID: TOKEN_PROGRAM_ID,
        },
        adminAccount,
        tokenA,
        tokenB,
        poolTokenMint,
        destinationPoolTokenAccount: initialLPAccount,
        nonce,
        ampFactor,
        fees,
    };
    const { balanceNeeded: swapBalanceNeeded, instructions: initializeStableSwapInstructions, } = await createInitializeStableSwapInstructionsRaw({
        provider,
        initializeSwapInstruction,
    });
    mergeInstructions(instructions.initializeSwap, {
        instructions: initializeStableSwapInstructions,
        signers: [],
    });
    return {
        initializeArgs: initializeSwapInstruction,
        balanceNeeded: mintBalanceNeeded + swapBalanceNeeded,
        instructions,
    };
};
const initializeSwapTokenInfo = async ({ provider, mint, authority, admin, }) => {
    // Create Swap Token Account
    const { key: tokenAccount, tx: createSwapTokenAccountInstructions } = await createTokenAccount({
        provider,
        mint,
        owner: authority,
        payer: provider.wallet.publicKey,
    });
    // Create Admin Fee Account
    const { key: adminFeeAccount, tx: createAdminFeeAccountInstructions } = await createTokenAccount({
        provider,
        mint,
        owner: admin,
        payer: provider.wallet.publicKey,
    });
    return {
        info: {
            mint,
            reserve: tokenAccount,
            adminFeeAccount: adminFeeAccount,
        },
        instructions: createSwapTokenAccountInstructions.combine(createAdminFeeAccountInstructions),
    };
};
/**
 * Creates an unsigned InitializeSwap transaction.
 *
 * After calling this, you must sign this transaction with the accounts:
 * - payer -- Account that holds the SOL to seed the account.
 * - args.config.stableSwapAccount -- This account is used once then its key is no longer relevant
 */
export const createInitializeStableSwapInstructionsRaw = async ({ provider, initializeSwapInstruction, }) => {
    // Allocate memory for the account
    const balanceNeeded = await StableSwap.getMinBalanceRentForExemptStableSwap(provider.connection);
    return {
        balanceNeeded,
        instructions: [
            SystemProgram.createAccount({
                fromPubkey: provider.wallet.publicKey,
                newAccountPubkey: initializeSwapInstruction.config.swapAccount,
                lamports: balanceNeeded,
                space: StableSwapLayout.span,
                programId: initializeSwapInstruction.config.swapProgramID,
            }),
            createInitializeStableSwapInstruction(initializeSwapInstruction),
        ],
    };
};
/**
 * Deploys a new StableSwap pool.
 */
export const deployNewSwap = async ({ enableLogging = false, ...args }) => {
    const result = await createInitializeNewSwapTx(args);
    const { txs } = result;
    const { signature: setupAccounts1 } = await txs.setupAccounts1.confirm();
    if (enableLogging) {
        console.log(`Set up accounts pt 1: ${setupAccounts1}`);
    }
    const { signature: setupAccounts2 } = await txs.setupAccounts2.confirm();
    if (enableLogging) {
        console.log(`Set up accounts pt 2: ${setupAccounts2}`);
    }
    const { signature: initializeSwap } = await txs.initializeSwap.confirm();
    if (enableLogging) {
        console.log(`Initialize swap: ${initializeSwap}`);
    }
    return {
        ...result,
        txSigs: {
            setupAccounts1,
            setupAccounts2,
            initializeSwap,
        },
    };
};
/**
 * Creates the transactions for creating a new swap.
 *
 * This is split into two transactions: setup and initialize, to ensure we are under the size limit.
 */
export const createInitializeNewSwapTx = async (args) => {
    const { provider } = args;
    const { instructions, initializeArgs } = await createInitializeStableSwapInstructions({
        ...args,
    });
    const setupAccounts1 = [
        "createLPTokenMint",
        "createSwapTokenAAccounts",
        "createSwapTokenBAccounts",
    ]
        .map((method) => {
        return new TransactionEnvelope(provider, instructions[method].instructions.slice(), instructions[method].signers.slice());
    })
        .reduce((acc, tx) => acc.combine(tx));
    const setupAccounts2 = ["createInitialLPTokenAccount", "seedPoolAccounts"]
        .map((method) => {
        return new TransactionEnvelope(provider, instructions[method].instructions.slice(), instructions[method].signers.slice());
    })
        .reduce((acc, tx) => acc.combine(tx));
    const initializeSwap = new TransactionEnvelope(provider, instructions.initializeSwap.instructions.slice(), instructions.initializeSwap.signers.slice());
    const newSwap = loadSwapFromInitializeArgs(initializeArgs);
    return {
        swap: newSwap,
        initializeArgs,
        txs: {
            setupAccounts1,
            setupAccounts2,
            initializeSwap,
        },
    };
};
//# sourceMappingURL=initialize.js.map