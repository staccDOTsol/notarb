/// <reference types="bn.js" />
import * as anchor from "@project-serum/anchor";
import { OrderParams } from "@project-serum/serum/lib/market";
import { PublicKey } from "@solana/web3.js";
export { PsyAmerican } from './psyAmericanTypes';
export declare enum ClusterName {
    devnet = "Devnet",
    mainnet = "Mainnet",
    testnet = "Testnet",
    localhost = "localhost"
}
export declare type NetworkInfo = {
    feeOwnerKey: PublicKey;
    serumReferrerId: PublicKey;
};
export declare type OptionMarket = {
    optionMint: PublicKey;
    writerTokenMint: PublicKey;
    underlyingAssetMint: PublicKey;
    quoteAssetMint: PublicKey;
    underlyingAssetPool: PublicKey;
    quoteAssetPool: PublicKey;
    mintFeeAccount: PublicKey;
    exerciseFeeAccount: PublicKey;
    underlyingAmountPerContract: anchor.BN;
    quoteAmountPerContract: anchor.BN;
    expirationUnixTimestamp: anchor.BN;
    expired: boolean;
    bumpSeed: number;
};
export declare type OptionMarketWithKey = OptionMarket & {
    key: PublicKey;
};
export declare type OrderParamsWithFeeRate<T> = OrderParams<T> & {
    feeRate?: number;
};
/**
 * An enumeration to keep track of the different program versions released.
 */
export declare enum ProgramVersions {
    V1 = 0,
    V1_1 = 1
}
