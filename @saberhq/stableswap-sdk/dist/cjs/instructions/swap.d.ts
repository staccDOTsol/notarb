import type { u64 } from "@saberhq/token-utils";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { Fees, RawFees } from "../state/index.js";
import type { StableSwapConfig } from "./common.js";
/**
 * Instruction enum.
 */
export declare enum StableSwapInstruction {
    INITIALIZE = 0,
    SWAP = 1,
    DEPOSIT = 2,
    WITHDRAW = 3,
    WITHDRAW_ONE = 4
}
/**
 * Info about the tokens to swap.
 */
export interface SwapTokenInfo {
    /**
     * The account that admin fees go to.
     */
    adminFeeAccount: PublicKey;
    /**
     * Mint of the token.
     */
    mint: PublicKey;
    /**
     * This swap's token reserves.
     */
    reserve: PublicKey;
}
export interface InitializeSwapInstruction {
    config: StableSwapConfig;
    /**
     * Account that can manage the swap.
     */
    adminAccount: PublicKey;
    tokenA: SwapTokenInfo;
    tokenB: SwapTokenInfo;
    poolTokenMint: PublicKey;
    /**
     * Destination account for the initial LP tokens.
     */
    destinationPoolTokenAccount: PublicKey;
    nonce: number;
    ampFactor: u64;
    fees?: Fees;
    isPaused?: boolean;
}
export interface SwapInstruction {
    config: StableSwapConfig;
    /**
     * User source authority
     */
    userAuthority: PublicKey;
    /**
     * User source token account
     */
    userSource: PublicKey;
    /**
     * Swap source token account
     */
    poolSource: PublicKey;
    /**
     * Swap destination token account
     */
    poolDestination: PublicKey;
    /**
     * User destination token account
     */
    userDestination: PublicKey;
    adminDestination: PublicKey;
    amountIn: u64;
    minimumAmountOut: u64;
}
export interface DepositInstruction {
    config: StableSwapConfig;
    /**
     * Authority for user account
     */
    userAuthority: PublicKey;
    /**
     * Depositor account for token A
     */
    sourceA: PublicKey;
    /**
     * Depositor account for token B
     */
    sourceB: PublicKey;
    tokenAccountA: PublicKey;
    tokenAccountB: PublicKey;
    poolTokenMint: PublicKey;
    poolTokenAccount: PublicKey;
    tokenAmountA: u64;
    tokenAmountB: u64;
    minimumPoolTokenAmount: u64;
}
export interface WithdrawInstruction {
    config: StableSwapConfig;
    /**
     * User source authority
     */
    userAuthority: PublicKey;
    poolMint: PublicKey;
    tokenAccountA: PublicKey;
    tokenAccountB: PublicKey;
    adminFeeAccountA: PublicKey;
    adminFeeAccountB: PublicKey;
    /**
     * Account which is the source of the pool tokens
     * that is; the user's pool token account
     */
    sourceAccount: PublicKey;
    userAccountA: PublicKey;
    userAccountB: PublicKey;
    poolTokenAmount: u64;
    minimumTokenA: u64;
    minimumTokenB: u64;
}
export interface WithdrawOneInstruction {
    config: StableSwapConfig;
    /**
     * User source authority
     */
    userAuthority: PublicKey;
    poolMint: PublicKey;
    /**
     * User account that holds the LP tokens
     */
    sourceAccount: PublicKey;
    /**
     * Pool account that holds the tokens to withdraw
     */
    baseTokenAccount: PublicKey;
    /**
     * Pool account that holds the other token
     */
    quoteTokenAccount: PublicKey;
    /**
     * User base token account to withdraw to
     */
    destinationAccount: PublicKey;
    /**
     * Admin base token account to send fees to
     */
    adminDestinationAccount: PublicKey;
    /**
     * Amount of pool tokens to burn. User receives an output of token a
     * or b based on the percentage of the pool tokens that are returned.
     */
    poolTokenAmount: u64;
    /**
     * Minimum amount of base tokens to receive, prevents excessive slippage
     */
    minimumTokenAmount: u64;
}
export declare const initializeSwapInstructionRaw: ({ config, adminAccount, tokenA: { adminFeeAccount: adminFeeAccountA, mint: tokenMintA, reserve: tokenAccountA, }, tokenB: { adminFeeAccount: adminFeeAccountB, mint: tokenMintB, reserve: tokenAccountB, }, poolTokenMint, destinationPoolTokenAccount, nonce, ampFactor, fees, }: Omit<InitializeSwapInstruction, "fees"> & {
    fees: RawFees;
}) => TransactionInstruction;
export declare const initializeSwapInstruction: ({ fees, ...args }: InitializeSwapInstruction) => TransactionInstruction;
export declare const swapInstruction: ({ config, userAuthority, userSource, poolSource, poolDestination, userDestination, adminDestination, amountIn, minimumAmountOut, }: SwapInstruction) => TransactionInstruction;
export declare const depositInstruction: ({ config, userAuthority, sourceA, sourceB, tokenAccountA, tokenAccountB, poolTokenMint, poolTokenAccount, tokenAmountA, tokenAmountB, minimumPoolTokenAmount, }: DepositInstruction) => TransactionInstruction;
export declare const withdrawInstruction: ({ config, userAuthority, poolMint, sourceAccount, tokenAccountA, tokenAccountB, userAccountA, userAccountB, adminFeeAccountA, adminFeeAccountB, poolTokenAmount, minimumTokenA, minimumTokenB, }: WithdrawInstruction) => TransactionInstruction;
export declare const withdrawOneInstruction: ({ config, userAuthority, poolMint, sourceAccount, baseTokenAccount, quoteTokenAccount, destinationAccount, adminDestinationAccount, poolTokenAmount, minimumTokenAmount, }: WithdrawOneInstruction) => TransactionInstruction;
//# sourceMappingURL=swap.d.ts.map