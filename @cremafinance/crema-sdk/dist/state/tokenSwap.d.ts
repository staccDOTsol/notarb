/// <reference types="node" />
import type { AccountInfo, PublicKey } from "@solana/web3.js";
import type Decimal from "decimal.js";
import type { Parser } from "../util/layout";
export declare const TOKEN_SWAP_ACCOUNT_TYPE = 0;
export interface TokenSwapAccount {
    version: number;
    tokenSwapKey: PublicKey;
    accountType: number;
    isInitialized: number;
    nonce: number;
    tokenProgramId: PublicKey;
    manager: PublicKey;
    managerTokenA: PublicKey;
    managerTokenB: PublicKey;
    swapTokenA: PublicKey;
    swapTokenB: PublicKey;
    tokenAMint: PublicKey;
    tokenBMint: PublicKey;
    ticksKey: PublicKey;
    positionsKey: PublicKey;
    curveType: number;
    fee: Decimal;
    managerFee: Decimal;
    tickSpace: number;
    currentSqrtPrice: Decimal;
    currentLiquity: Decimal;
    feeGrowthGlobal0: Decimal;
    feeGrowthGlobal1: Decimal;
    managerFeeA: Decimal;
    managerFeeB: Decimal;
}
export declare const TokenSwapAccountLayout: import("@solana/buffer-layout").Structure<TokenSwapAccount>;
export declare const TOKEN_SWAP_ACCOUNT_SIZE: number;
export declare const isTokenSwapAccount: (info: AccountInfo<Buffer>) => boolean;
export declare const parseTokenSwapAccount: Parser<TokenSwapAccount>;
