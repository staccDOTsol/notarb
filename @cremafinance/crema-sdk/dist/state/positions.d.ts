/// <reference types="node" />
import type { AccountInfo, PublicKey } from "@solana/web3.js";
import type Decimal from "decimal.js";
import type { Parser } from "../util/layout";
export declare const POSITIONS_ACCOUNT_SIZE = 360000;
export declare const POSITIONS_ACCOUNT_TYPE = 2;
export interface Position {
    nftTokenId: PublicKey;
    lowerTick: number;
    upperTick: number;
    liquity: Decimal;
    feeGrowthInsideALast: Decimal;
    feeGrowthInsideBLast: Decimal;
    tokenAFee: Decimal;
    tokenBFee: Decimal;
}
export interface PositionsAccount {
    swapVersion: number;
    tokenSwapKey: PublicKey;
    accountType: number;
    len: number;
    positions: Position[];
}
export interface PositionsAccountDataFlat {
    swapVersion: number;
    tokenSwapKey: PublicKey;
    accountType: number;
    len: number;
    dataFlat: Uint8Array;
}
export declare const PositionLayout: import("@solana/buffer-layout").Structure<Position>;
export declare const PositionsAccountLayout: import("@solana/buffer-layout").Structure<PositionsAccountDataFlat>;
export declare const MAX_ACCOUNT_POSITION_LENGTH: number;
export declare const isPositionsAccount: (info: AccountInfo<Buffer>) => boolean;
export declare const parsePositionsAccount: Parser<PositionsAccount>;
