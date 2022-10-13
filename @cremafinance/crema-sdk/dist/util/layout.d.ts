/// <reference types="node" />
import type { Blob, Layout } from "@solana/buffer-layout";
import type { AccountInfo } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare type Parser<T> = (pubkey: PublicKey, info: AccountInfo<Buffer>) => {
    pubkey: PublicKey;
    info: AccountInfo<Buffer>;
    data: T;
} | undefined;
/** @internal */
export interface EncodeDecode<T> {
    decode: (buffer: Buffer, offset?: number) => T;
    encode: (src: T, buffer: Buffer, offset?: number) => number;
}
/** @internal */
export declare const encodeDecode: <T>(layout: Layout<T>) => EncodeDecode<T>;
export declare const publicKey: (property?: string) => Layout<PublicKey>;
export declare const uint64: (property?: string) => Blob;
export declare const int64: (property?: string) => Blob;
export declare const int128: (property?: string) => Blob;
export declare const uint128: (property?: string) => Blob;
export declare const decimal64: (property?: string, precision?: number) => Layout<Decimal>;
export declare const decimalU64: (property?: string, precision?: number) => Layout<Decimal>;
export declare const decimal128: (property?: string, precision?: number) => Layout<Decimal>;
export declare const decimalU128: (property?: string, precision?: number) => Layout<Decimal>;
