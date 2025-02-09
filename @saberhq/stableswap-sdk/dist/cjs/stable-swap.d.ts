/// <reference types="node" />
import type { ProgramAccount } from "@saberhq/token-utils";
import type { Connection, TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import type { IExchange } from "./entities/exchange.js";
import type { StableSwapConfig } from "./instructions/index.js";
import * as instructions from "./instructions/index.js";
import type { StableSwapState } from "./state/index.js";
export interface StableSwapInfo {
    config: StableSwapConfig;
    state: StableSwapState;
}
/**
 * Swap token A for token B
 * @param userSource
 * @param poolSource
 * @param poolDestination
 * @param userDestination
 * @param amountIn
 * @param minimumAmountOut
 */
export declare function createSaberSwapInstruction({ config, state }: StableSwapInfo, args: Pick<instructions.SwapInstruction, "userAuthority" | "userSource" | "userDestination" | "poolSource" | "poolDestination" | "amountIn" | "minimumAmountOut">): TransactionInstruction;
/**
 * Deposit tokens into the pool.
 */
export declare function createSaberDepositInstruction({ config, state }: StableSwapInfo, args: Pick<instructions.DepositInstruction, "userAuthority" | "sourceA" | "sourceB" | "poolTokenAccount" | "tokenAmountA" | "tokenAmountB" | "minimumPoolTokenAmount">): TransactionInstruction;
/**
 * Withdraw tokens from the pool
 */
export declare function createSaberWithdrawInstruction({ config, state }: StableSwapInfo, args: Pick<instructions.WithdrawInstruction, "userAuthority" | "userAccountA" | "userAccountB" | "sourceAccount" | "poolTokenAmount" | "minimumTokenA" | "minimumTokenB">): TransactionInstruction;
/**
 * Withdraw tokens from the pool
 */
export declare function createSaberWithdrawOneInstruction({ config, state }: StableSwapInfo, args: Pick<instructions.WithdrawOneInstruction, "userAuthority" | "baseTokenAccount" | "destinationAccount" | "sourceAccount" | "poolTokenAmount" | "minimumTokenAmount">): TransactionInstruction;
export declare class StableSwap implements StableSwapInfo {
    readonly config: StableSwapConfig;
    readonly state: StableSwapState;
    /**
     * Constructor for new StableSwap client object.
     * @param config
     * @param state
     */
    constructor(config: StableSwapConfig, state: StableSwapState);
    /**
     * Get the minimum balance for the token swap account to be rent exempt
     *
     * @return Number of lamports required
     */
    static getMinBalanceRentForExemptStableSwap(connection: Connection): Promise<number>;
    /**
     * Load an onchain StableSwap program.
     *
     * @param connection A {@link Connection} to use.
     * @param swapAccount The {@link PublicKey} of the swap account to load. You can obtain this pubkey by visiting [app.saber.so](https://app.saber.so/], navigating to the pool you want to load, and getting the "swap account" key.
     * @param programID Address of the onchain StableSwap program.
     */
    static load(connection: Connection, swapAccount: PublicKey, programID?: PublicKey): Promise<StableSwap>;
    /**
     * Loads an onchain StableSwap program from an {@link IExchange}.
     *
     * @param connection
     * @param exchange
     * @returns
     */
    static loadFromExchange(connection: Connection, exchange: IExchange): Promise<StableSwap>;
    /**
     * Loads the swap object from a program account.
     * @param data
     * @returns
     */
    static fromProgramAccount(data: ProgramAccount<StableSwapState>): Promise<StableSwap>;
    /**
     * Loads the swap object from a program account.
     * @param data
     * @returns
     */
    static fromData(data: ProgramAccount<StableSwapState>): StableSwap;
    /**
     * Loads the swap object from a program account, with the swap authority loaded.
     * @param data
     * @returns
     */
    static fromProgramAccountWithAuthority(data: ProgramAccount<StableSwapState>, authority: PublicKey): StableSwap;
    /**
     * Loads a StableSwap instance with data.
     *
     * @param programID The program ID.
     * @param swapAccount The address of the swap.
     * @param swapAccountData The data of the swapAccount.
     * @param authority The swap's authority.
     * @returns
     */
    static loadWithData(swapAccount: PublicKey, swapAccountData: Buffer, authority: PublicKey, programID?: PublicKey): StableSwap;
    /**
     * Swap token A for token B
     * @param userSource
     * @param poolSource
     * @param poolDestination
     * @param userDestination
     * @param amountIn
     * @param minimumAmountOut
     */
    swap(args: Pick<instructions.SwapInstruction, "userAuthority" | "userSource" | "userDestination" | "poolSource" | "poolDestination" | "amountIn" | "minimumAmountOut">): TransactionInstruction;
    /**
     * Deposit tokens into the pool.
     */
    deposit(args: Pick<instructions.DepositInstruction, "userAuthority" | "sourceA" | "sourceB" | "poolTokenAccount" | "tokenAmountA" | "tokenAmountB" | "minimumPoolTokenAmount">): TransactionInstruction;
    /**
     * Withdraw tokens from the pool
     */
    withdraw(args: Pick<instructions.WithdrawInstruction, "userAuthority" | "userAccountA" | "userAccountB" | "sourceAccount" | "poolTokenAmount" | "minimumTokenA" | "minimumTokenB">): TransactionInstruction;
    /**
     * Withdraw tokens from the pool
     */
    withdrawOne(args: Pick<instructions.WithdrawOneInstruction, "userAuthority" | "baseTokenAccount" | "destinationAccount" | "sourceAccount" | "poolTokenAmount" | "minimumTokenAmount">): TransactionInstruction;
}
/**
 * Finds the swap authority address that is used to sign transactions on behalf of the swap.
 *
 * @param swapAccount
 * @param swapProgramID
 * @returns
 */
export declare const findSwapAuthorityKey: (swapAccount: PublicKey, swapProgramID?: PublicKey) => Promise<[PublicKey, number]>;
/**
 * Finds the swap authority address that is used to sign transactions on behalf of the swap.
 *
 * @param swapAccount
 * @param swapProgramID
 * @returns
 */
export declare const findSwapAuthorityKeySync: (swapAccount: PublicKey, swapProgramID?: PublicKey) => [PublicKey, number];
/**
 * Finds the swap authority address that is used to sign transactions on behalf of the swap.
 *
 * @param swapAccount
 * @param swapProgramID
 * @returns
 */
export declare const getSwapAuthorityKey: (swapAccount: PublicKey, swapProgramID?: PublicKey) => PublicKey;
//# sourceMappingURL=stable-swap.d.ts.map