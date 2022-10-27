/// <reference types="node" />
import { web3 } from '@project-serum/anchor';
export declare function deserializePublicKey({ publicKey }: {
    publicKey: Buffer;
}): web3.PublicKey;
export declare function deserializeF64({ bytes }: {
    bytes: Buffer;
}): {
    value: number;
};
export declare const commonBorshSchema: readonly [readonly [typeof deserializePublicKey, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["publicKey", readonly [32]]];
}], readonly [typeof deserializeF64, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["bytes", readonly [8]]];
}]];
