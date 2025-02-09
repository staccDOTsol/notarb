import type { Provider } from "@saberhq/solana-contrib";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import type { Signer, TransactionInstruction, TransactionSignature } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import type { InitializeSwapInstruction } from "../instructions/swap.js";
import { StableSwap } from "../stable-swap.js";
import type { TransactionInstructions } from "./instructions.js";
export declare type ISeedPoolAccountsFn = (args: {
    tokenAAccount: PublicKey;
    tokenBAccount: PublicKey;
}) => TransactionInstructions;
/**
 * Arguments used to initialize a new swap.
 */
export interface InitializeNewStableSwapArgs extends Pick<InitializeSwapInstruction, "adminAccount" | "ampFactor" | "fees"> {
    provider: Provider;
    swapProgramID: PublicKey;
    tokenAMint: PublicKey;
    tokenBMint: PublicKey;
    /**
     * The owner of the account for the initial LP tokens to go to.
     * Defaults to the admin account.
     */
    initialLiquidityProvider?: PublicKey;
    /**
     * If true, create an associated account for the initial LP.
     */
    useAssociatedAccountForInitialLP?: boolean;
    /**
     * The signer for the pool's account. If unspecified, a new one is generated.
     */
    swapAccountSigner?: Signer;
    /**
     * The mint for the pool token. If unspecified, a new one is generated.
     */
    poolTokenMintSigner?: Signer;
    /**
     * Instructions to seed the pool accounts.
     */
    seedPoolAccounts: ISeedPoolAccountsFn;
}
/**
 * Initializes a new StableSwap pool with a payer and stableSwapAccount.
 *
 * If you want to use a non-filesystem wallet as a payer, you'll want to generate
 * this transaction using StableSwap.createInitializeStableSwapTransaction
 * then sign it using the wallet directly.
 */
export declare const initializeStableSwap: (provider: Provider, stableSwapAccount: Signer, initializeSwapInstruction: InitializeSwapInstruction) => Promise<StableSwap>;
/**
 * Creates a new instance of StableSwap from create args.
 * @param connection
 * @param initializeArgs
 * @returns
 */
export declare const loadSwapFromInitializeArgs: (initializeArgs: InitializeSwapInstruction) => StableSwap;
/**
 * Creates a set of instructions to create a new StableSwap instance.
 *
 * After calling this, you must sign this transaction with the accounts:
 * - payer -- Account that holds the SOL to seed the account.
 * - args.config.stableSwapAccount -- This account is used once then its key is no longer relevant
 * - all returned signers
 */
export declare const createInitializeStableSwapInstructions: ({ provider, swapProgramID, adminAccount, tokenAMint, tokenBMint, ampFactor, fees, initialLiquidityProvider, useAssociatedAccountForInitialLP, swapAccountSigner, poolTokenMintSigner, seedPoolAccounts, }: InitializeNewStableSwapArgs) => Promise<{
    initializeArgs: InitializeSwapInstruction;
    /**
     * Lamports needed to be rent exempt.
     */
    balanceNeeded: number;
    instructions: {
        /**
         * Create accounts for the LP token
         */
        createLPTokenMint: TransactionInstructions;
        /**
         * Create LP token account for the initial LP
         */
        createInitialLPTokenAccount: TransactionInstructions;
        /**
         * Create accounts for swap token A
         */
        createSwapTokenAAccounts: TransactionInstructions;
        /**
         * Create accounts for swap token B
         */
        createSwapTokenBAccounts: TransactionInstructions;
        /**
         * Seed the accounts for the pool
         */
        seedPoolAccounts: TransactionInstructions;
        /**
         * Initialize the swap
         */
        initializeSwap: TransactionInstructions;
    };
}>;
/**
 * Creates an unsigned InitializeSwap transaction.
 *
 * After calling this, you must sign this transaction with the accounts:
 * - payer -- Account that holds the SOL to seed the account.
 * - args.config.stableSwapAccount -- This account is used once then its key is no longer relevant
 */
export declare const createInitializeStableSwapInstructionsRaw: ({ provider, initializeSwapInstruction, }: {
    provider: Provider;
    initializeSwapInstruction: InitializeSwapInstruction;
}) => Promise<{
    balanceNeeded: number;
    instructions: readonly TransactionInstruction[];
}>;
/**
 * Deploys a new StableSwap pool.
 */
export declare const deployNewSwap: ({ enableLogging, ...args }: Omit<InitializeNewStableSwapArgs, "connection"> & {
    provider: Provider;
    enableLogging?: boolean | undefined;
}) => Promise<{
    swap: StableSwap;
    initializeArgs: InitializeSwapInstruction;
    txSigs: {
        setupAccounts1: TransactionSignature;
        setupAccounts2: TransactionSignature;
        initializeSwap: TransactionSignature;
    };
}>;
/**
 * Creates the transactions for creating a new swap.
 *
 * This is split into two transactions: setup and initialize, to ensure we are under the size limit.
 */
export declare const createInitializeNewSwapTx: (args: InitializeNewStableSwapArgs) => Promise<{
    swap: StableSwap;
    initializeArgs: InitializeSwapInstruction;
    txs: {
        setupAccounts1: TransactionEnvelope;
        setupAccounts2: TransactionEnvelope;
        initializeSwap: TransactionEnvelope;
    };
}>;
//# sourceMappingURL=initialize.d.ts.map