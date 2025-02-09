"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitializeNewSwapTx = exports.deployNewSwap = exports.createInitializeStableSwapInstructionsRaw = exports.createInitializeStableSwapInstructions = exports.loadSwapFromInitializeArgs = exports.initializeStableSwap = void 0;
const solana_contrib_1 = require("@saberhq/solana-contrib");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const constants_js_1 = require("../constants.js");
const swap_js_1 = require("../instructions/swap.js");
const stable_swap_js_1 = require("../stable-swap.js");
const fees_js_1 = require("../state/fees.js");
const layout_js_1 = require("../state/layout.js");
const instructions_js_1 = require("./instructions.js");
/**
 * Initializes a new StableSwap pool with a payer and stableSwapAccount.
 *
 * If you want to use a non-filesystem wallet as a payer, you'll want to generate
 * this transaction using StableSwap.createInitializeStableSwapTransaction
 * then sign it using the wallet directly.
 */
const initializeStableSwap = async (provider, stableSwapAccount, initializeSwapInstruction) => {
    if (!stableSwapAccount.publicKey.equals(initializeSwapInstruction.config.swapAccount)) {
        throw new Error("stable swap public key");
    }
    const { instructions } = await (0, exports.createInitializeStableSwapInstructionsRaw)({
        provider,
        initializeSwapInstruction,
    });
    const tx = new solana_contrib_1.TransactionEnvelope(provider, instructions.slice());
    console.log("createAccount and InitializeSwap");
    const txSig = (await tx.confirm()).signature;
    console.log(`TxSig: ${txSig}`);
    return (0, exports.loadSwapFromInitializeArgs)(initializeSwapInstruction);
};
exports.initializeStableSwap = initializeStableSwap;
/**
 * Creates a new instance of StableSwap from create args.
 * @param connection
 * @param initializeArgs
 * @returns
 */
const loadSwapFromInitializeArgs = (initializeArgs) => {
    var _a, _b;
    return new stable_swap_js_1.StableSwap(initializeArgs.config, {
        isInitialized: true,
        nonce: initializeArgs.nonce,
        futureAdminDeadline: constants_js_1.ZERO_TS,
        futureAdminAccount: web3_js_1.PublicKey.default,
        adminAccount: initializeArgs.adminAccount,
        tokenA: initializeArgs.tokenA,
        tokenB: initializeArgs.tokenB,
        poolTokenMint: initializeArgs.poolTokenMint,
        initialAmpFactor: new token_utils_1.u64(initializeArgs.ampFactor),
        isPaused: (_a = initializeArgs.isPaused) !== null && _a !== void 0 ? _a : false,
        targetAmpFactor: new token_utils_1.u64(initializeArgs.ampFactor),
        startRampTimestamp: constants_js_1.ZERO_TS,
        stopRampTimestamp: constants_js_1.ZERO_TS,
        fees: (_b = initializeArgs.fees) !== null && _b !== void 0 ? _b : fees_js_1.ZERO_FEES,
    });
};
exports.loadSwapFromInitializeArgs = loadSwapFromInitializeArgs;
/**
 * Creates a set of instructions to create a new StableSwap instance.
 *
 * After calling this, you must sign this transaction with the accounts:
 * - payer -- Account that holds the SOL to seed the account.
 * - args.config.stableSwapAccount -- This account is used once then its key is no longer relevant
 * - all returned signers
 */
const createInitializeStableSwapInstructions = async ({ provider, swapProgramID = constants_js_1.SWAP_PROGRAM_ID, adminAccount, tokenAMint, tokenBMint, ampFactor, fees, initialLiquidityProvider = adminAccount, useAssociatedAccountForInitialLP, swapAccountSigner = web3_js_1.Keypair.generate(), poolTokenMintSigner = web3_js_1.Keypair.generate(), seedPoolAccounts, }) => {
    const instructions = {
        createLPTokenMint: new solana_contrib_1.TransactionEnvelope(provider, []),
        createInitialLPTokenAccount: new solana_contrib_1.TransactionEnvelope(provider, []),
        createSwapTokenAAccounts: new solana_contrib_1.TransactionEnvelope(provider, []),
        createSwapTokenBAccounts: new solana_contrib_1.TransactionEnvelope(provider, []),
        seedPoolAccounts: (0, instructions_js_1.createMutableTransactionInstructions)(),
        initializeSwap: (0, instructions_js_1.createMutableTransactionInstructions)(),
    };
    // Create swap account if not specified
    const swapAccount = swapAccountSigner.publicKey;
    instructions.initializeSwap.signers.push(swapAccountSigner);
    // Create authority and nonce
    const [authority, nonce] = await (0, stable_swap_js_1.findSwapAuthorityKey)(swapAccount, swapProgramID);
    // Create LP token mint
    const { decimals } = await new token_utils_1.SPLToken(provider.connection, tokenAMint, token_utils_1.TOKEN_PROGRAM_ID, web3_js_1.Keypair.generate()).getMintInfo();
    const mintBalanceNeeded = await token_utils_1.SPLToken.getMinBalanceRentForExemptMint(provider.connection);
    instructions.createLPTokenMint = await (0, token_utils_1.createInitMintInstructions)({
        provider,
        mintKP: poolTokenMintSigner,
        mintAuthority: authority,
        decimals,
    });
    const poolTokenMint = poolTokenMintSigner.publicKey;
    // Create initial LP token account
    let initialLPAccount = undefined;
    if (useAssociatedAccountForInitialLP) {
        const lpAccount = await (0, token_utils_1.getOrCreateATA)({
            provider,
            mint: poolTokenMint,
            owner: initialLiquidityProvider,
            payer: provider.wallet.publicKey,
        });
        initialLPAccount = lpAccount.address;
        if (lpAccount.instruction) {
            instructions.createInitialLPTokenAccount = new solana_contrib_1.TransactionEnvelope(provider, [lpAccount.instruction]);
        }
    }
    else {
        const { key: unassociatedInitialLPAccount, tx: initialLPInstructions } = await (0, token_utils_1.createTokenAccount)({
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
    (0, instructions_js_1.mergeInstructions)(instructions.createSwapTokenAAccounts, tokenAInstructions);
    // Create Swap Token B account
    const { info: tokenB, instructions: tokenBInstructions } = await initializeSwapTokenInfo({
        provider,
        mint: tokenBMint,
        authority,
        admin: adminAccount,
    });
    (0, instructions_js_1.mergeInstructions)(instructions.createSwapTokenBAccounts, tokenBInstructions);
    // Seed the swap's Token A and token B accounts with tokens
    // On testnet, this is usually a mint.
    // On mainnet, this is usually a token transfer.
    const seedPoolAccountsResult = seedPoolAccounts({
        tokenAAccount: tokenA.reserve,
        tokenBAccount: tokenB.reserve,
    });
    (0, instructions_js_1.mergeInstructions)(instructions.seedPoolAccounts, seedPoolAccountsResult);
    const initializeSwapInstruction = {
        config: {
            swapAccount: swapAccount,
            authority,
            swapProgramID,
            tokenProgramID: token_utils_1.TOKEN_PROGRAM_ID,
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
    const { balanceNeeded: swapBalanceNeeded, instructions: initializeStableSwapInstructions, } = await (0, exports.createInitializeStableSwapInstructionsRaw)({
        provider,
        initializeSwapInstruction,
    });
    (0, instructions_js_1.mergeInstructions)(instructions.initializeSwap, {
        instructions: initializeStableSwapInstructions,
        signers: [],
    });
    return {
        initializeArgs: initializeSwapInstruction,
        balanceNeeded: mintBalanceNeeded + swapBalanceNeeded,
        instructions,
    };
};
exports.createInitializeStableSwapInstructions = createInitializeStableSwapInstructions;
const initializeSwapTokenInfo = async ({ provider, mint, authority, admin, }) => {
    // Create Swap Token Account
    const { key: tokenAccount, tx: createSwapTokenAccountInstructions } = await (0, token_utils_1.createTokenAccount)({
        provider,
        mint,
        owner: authority,
        payer: provider.wallet.publicKey,
    });
    // Create Admin Fee Account
    const { key: adminFeeAccount, tx: createAdminFeeAccountInstructions } = await (0, token_utils_1.createTokenAccount)({
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
const createInitializeStableSwapInstructionsRaw = async ({ provider, initializeSwapInstruction, }) => {
    // Allocate memory for the account
    const balanceNeeded = await stable_swap_js_1.StableSwap.getMinBalanceRentForExemptStableSwap(provider.connection);
    return {
        balanceNeeded,
        instructions: [
            web3_js_1.SystemProgram.createAccount({
                fromPubkey: provider.wallet.publicKey,
                newAccountPubkey: initializeSwapInstruction.config.swapAccount,
                lamports: balanceNeeded,
                space: layout_js_1.StableSwapLayout.span,
                programId: initializeSwapInstruction.config.swapProgramID,
            }),
            (0, swap_js_1.initializeSwapInstruction)(initializeSwapInstruction),
        ],
    };
};
exports.createInitializeStableSwapInstructionsRaw = createInitializeStableSwapInstructionsRaw;
/**
 * Deploys a new StableSwap pool.
 */
const deployNewSwap = async ({ enableLogging = false, ...args }) => {
    const result = await (0, exports.createInitializeNewSwapTx)(args);
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
exports.deployNewSwap = deployNewSwap;
/**
 * Creates the transactions for creating a new swap.
 *
 * This is split into two transactions: setup and initialize, to ensure we are under the size limit.
 */
const createInitializeNewSwapTx = async (args) => {
    const { provider } = args;
    const { instructions, initializeArgs } = await (0, exports.createInitializeStableSwapInstructions)({
        ...args,
    });
    const setupAccounts1 = [
        "createLPTokenMint",
        "createSwapTokenAAccounts",
        "createSwapTokenBAccounts",
    ]
        .map((method) => {
        return new solana_contrib_1.TransactionEnvelope(provider, instructions[method].instructions.slice(), instructions[method].signers.slice());
    })
        .reduce((acc, tx) => acc.combine(tx));
    const setupAccounts2 = ["createInitialLPTokenAccount", "seedPoolAccounts"]
        .map((method) => {
        return new solana_contrib_1.TransactionEnvelope(provider, instructions[method].instructions.slice(), instructions[method].signers.slice());
    })
        .reduce((acc, tx) => acc.combine(tx));
    const initializeSwap = new solana_contrib_1.TransactionEnvelope(provider, instructions.initializeSwap.instructions.slice(), instructions.initializeSwap.signers.slice());
    const newSwap = (0, exports.loadSwapFromInitializeArgs)(initializeArgs);
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
exports.createInitializeNewSwapTx = createInitializeNewSwapTx;
//# sourceMappingURL=initialize.js.map