/// <reference types="node" />
export declare const BITMAP_SEED: Buffer;
export declare const POOL_SEED: Buffer;
export declare const POSITION_SEED: Buffer;
export declare const OBSERVATION_SEED: Buffer;
export declare const TICK_SEED: Buffer;
export declare const FEE_SEED: Buffer;
export declare function u16ToSeed(num: number): Uint8Array;
export declare function i16ToSeed(num: number): Uint8Array;
export declare function u32ToSeed(num: number): Uint8Array;
export declare function i32ToSeed(num: number): Uint8Array;
