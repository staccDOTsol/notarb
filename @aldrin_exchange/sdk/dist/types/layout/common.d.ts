import { Layout, Structure } from '@solana/buffer-layout';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
declare class PublicKeyLayout extends Layout {
    private layout;
    constructor(property?: string);
    getSpan(b: Uint8Array, offset?: number): number;
    decode(b: Uint8Array, offset?: number): PublicKey;
    encode(src: PublicKey, b: Uint8Array, offset: number): number;
}
/**
 * Layout for a public key
 */
export declare const publicKey: (property: string) => PublicKeyLayout;
declare class U64Layout extends Layout {
    private layout;
    private toNumber;
    private signed;
    constructor(property: string, signed: boolean, toNumber: boolean);
    getSpan(b: Uint8Array, offset?: number): number;
    decode(b: Uint8Array, offset?: number): BN | number;
    encode(src: BN, b: Uint8Array, offset: number): number;
}
/**
 * Layout for a 64bit unsigned value
 */
export declare const uint64: (property: string, toNumber?: boolean) => U64Layout;
export declare const int64: (property: string, toNumber?: boolean) => U64Layout;
export declare const rustEnum: (variants: Structure[], property: string) => import("@solana/buffer-layout").Union;
declare class BoolLayout extends Layout {
    private layout;
    constructor(property: string);
    getSpan(b: Uint8Array, offset?: number): number;
    decode(b: Uint8Array, offset?: number): boolean;
    encode(src: boolean, b: Uint8Array, offset: number): number;
}
export declare const bool: (property: string) => BoolLayout;
export {};
