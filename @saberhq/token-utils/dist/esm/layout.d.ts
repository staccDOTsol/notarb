/// <reference types="node" />
/// <reference types="node" />
import type { Layout } from "@solana/buffer-layout";
import * as BufferLayout from "@solana/buffer-layout";
import type { AccountInfo, MintInfo } from "@solana/spl-token";
export { Layout as TypedLayout, Structure as TypedStructure, } from "@solana/buffer-layout";
/**
 * Typed struct buffer layout
 * @param fields
 * @param property
 * @param decodePrefixes
 * @returns
 */
export declare const structLayout: <T>(fields: Layout<T[keyof T]>[], property?: string | undefined, decodePrefixes?: boolean | undefined) => BufferLayout.Structure<T>;
/**
 * Layout for a public key
 */
export declare const PublicKeyLayout: (property?: string) => BufferLayout.Blob;
/**
 * Layout for a 64bit unsigned value
 */
export declare const Uint64Layout: (property?: string) => BufferLayout.Blob;
/**
 * Layout for a TokenAccount.
 */
export declare const TokenAccountLayout: Layout<{
    mint: Buffer;
    owner: Buffer;
    amount: Buffer;
    delegateOption: number;
    delegate: Buffer;
    state: number;
    delegatedAmount: Buffer;
    isNativeOption: number;
    isNative: Buffer;
    closeAuthorityOption: number;
    closeAuthority: Buffer;
}>;
/**
 * Layout for a Mint.
 */
export declare const MintLayout: Layout<{
    mintAuthorityOption: number;
    mintAuthority: Buffer;
    supply: Buffer;
    decimals: number;
    isInitialized: number;
    freezeAuthorityOption: number;
    freezeAuthority: Buffer;
}>;
/**
 * Data in an SPL token account.
 */
export declare type TokenAccountData = Omit<AccountInfo, "address">;
/**
 * Deserializes a token account.
 * @param address
 * @param data
 * @returns
 */
export declare const deserializeAccount: (data: Buffer) => TokenAccountData;
/**
 * Deserialize a {@link Buffer} into a {@link MintInfo}.
 * @param data
 * @returns
 */
export declare const deserializeMint: (data: Buffer) => MintInfo;
//# sourceMappingURL=layout.d.ts.map