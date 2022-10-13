/// <reference types="node" />
import type { AccountInfo, PublicKey } from "@solana/web3.js";
import type Decimal from "decimal.js";
import type { Parser } from "../util/layout";
export declare const TICKS_ACCOUNT_SIZE = 504000;
export declare const TICKS_ACCOUNT_TYPE = 1;
export interface Tick {
    tick: number;
    tickPrice: Decimal;
    liquityGross: Decimal;
    liquityNet: Decimal;
    feeGrowthOutside0: Decimal;
    feeGrowthOutside1: Decimal;
}
export interface TicksAccount {
    swapVersion: number;
    tokenSwapKey: PublicKey;
    accountType: number;
    len: number;
    ticks: Tick[];
}
export interface TicksAccountDataFlat {
    swapVersion: number;
    tokenSwapKey: PublicKey;
    accountType: number;
    len: number;
    dataFlat: Uint8Array;
}
export declare const TickLayout: import("@solana/buffer-layout").Structure<Tick>;
export declare const isTicksAccount: (info: AccountInfo<Buffer>) => boolean;
export declare const parseTicksAccount: Parser<TicksAccount>;
