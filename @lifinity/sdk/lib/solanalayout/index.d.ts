/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { blob, Layout, Structure as _Structure, UInt } from './buffer-layout';
export * from './buffer-layout';
export { blob };
export declare class BNLayout<P extends string = ''> extends Layout<BN, P> {
    blob: Layout<Buffer>;
    signed: boolean;
    constructor(span: number, signed: boolean, property?: P);
    /** @override */
    decode(b: Buffer, offset?: number): BN;
    /** @override */
    encode(src: BN, b: Buffer, offset?: number): number;
}
export declare function u8<P extends string = ''>(property?: P): UInt<number, P>;
export declare function u32<P extends string = ''>(property?: P): UInt<number, P>;
export declare function u64<P extends string = ''>(property?: P): BNLayout<P>;
export declare function u128<P extends string = ''>(property?: P): BNLayout<P>;
export declare class WrappedLayout<T, U, P extends string = ''> extends Layout<U, P> {
    layout: Layout<T>;
    decoder: (data: T) => U;
    encoder: (src: U) => T;
    constructor(layout: Layout<T>, decoder: (data: T) => U, encoder: (src: U) => T, property?: P);
    decode(b: Buffer, offset?: number): U;
    encode(src: U, b: Buffer, offset?: number): number;
    getSpan(b: Buffer, offset?: number): number;
}
export declare function publicKey<P extends string = ''>(property?: P): Layout<PublicKey, P>;
export declare class Structure<T, P, D> extends _Structure<T, P, D> {
    /** @override */
    decode(b: Buffer, offset?: number): D;
}
export declare function struct<T, P extends string = ''>(fields: T, property?: P, decodePrefixes?: boolean): T extends Layout<infer Value, infer Property>[] ? Structure<Value, P, {
    [K in Exclude<Extract<Property, string>, ''>]: Extract<T[number], Layout<any, K>> extends Layout<infer V, any> ? V : any;
}> : any;
