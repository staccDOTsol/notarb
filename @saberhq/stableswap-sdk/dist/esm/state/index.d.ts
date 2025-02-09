/// <reference types="node" />
import { u64 } from "@saberhq/token-utils";
import { PublicKey } from "@solana/web3.js";
import type { SwapTokenInfo } from "../instructions/swap.js";
import type { Fees } from "./fees.js";
export * from "./fees.js";
export * from "./layout.js";
/**
 * State of a StableSwap, read from the swap account.
 */
export interface StableSwapState {
    /**
     * Whether or not the swap is initialized.
     */
    isInitialized: boolean;
    /**
     * Whether or not the swap is paused.
     */
    isPaused: boolean;
    /**
     * Nonce used to generate the swap authority.
     */
    nonce: number;
    /**
     * Mint account for pool token
     */
    poolTokenMint: PublicKey;
    /**
     * Admin account
     */
    adminAccount: PublicKey;
    tokenA: SwapTokenInfo;
    tokenB: SwapTokenInfo;
    /**
     * Initial amplification coefficient (A)
     */
    initialAmpFactor: u64;
    /**
     * Target amplification coefficient (A)
     */
    targetAmpFactor: u64;
    /**
     * Ramp A start timestamp
     */
    startRampTimestamp: number;
    /**
     * Ramp A start timestamp
     */
    stopRampTimestamp: number;
    /**
     * When the future admin can no longer become the admin, if applicable.
     */
    futureAdminDeadline: number;
    /**
     * The next admin.
     */
    futureAdminAccount: PublicKey;
    /**
     * Fee schedule
     */
    fees: Fees;
}
/**
 * Decodes the Swap account.
 * @param data
 * @returns
 */
export declare const decodeSwap: (data: Buffer) => StableSwapState;
//# sourceMappingURL=index.d.ts.map