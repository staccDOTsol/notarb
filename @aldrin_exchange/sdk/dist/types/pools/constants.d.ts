import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { PoolCommon, WithPoolPK } from '.';
export declare const Side: {
    Bid: {
        bid: {};
    };
    Ask: {
        ask: {};
    };
};
export declare const SOL_MINT: PublicKey;
declare const POOLS: {
    RIN_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    RIN_SOL: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_USDT: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_ETH: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_BTC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    SOL_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_UST: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_MNGO: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    LARIX_mSOL: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    MEAN_mSOL: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    USDC_USDT: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
    mSOL_SOL: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
        curveType: number;
        poolVersion: number;
    };
};
declare const PERM_POOLS: {
    SLX_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
    };
    DATE_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
    };
    OOGI_USDC: {
        poolMint: PublicKey;
        poolPublicKey: PublicKey;
        baseTokenMint: PublicKey;
        quoteTokenMint: PublicKey;
        baseTokenVault: PublicKey;
        quoteTokenVault: PublicKey;
    };
};
declare type Keys = keyof typeof POOLS;
declare type PoolsMap = {
    [day in Keys]: PoolCommon & WithPoolPK;
};
declare type PermissionlessPoolsMap = {
    [day in keyof typeof PERM_POOLS]: PoolCommon & WithPoolPK;
};
export declare const AUTHORIZED_POOLS: PoolsMap;
export declare const PERMISSIONLESS_POOLS: PermissionlessPoolsMap;
export declare const PRE_VESTING_NUMERATOR: BN;
export declare const PRE_VESTING_DENOMINATOR: BN;
export declare const VESTING_NUMERATOR: BN;
export declare const VESTING_DENOMINATOR: BN;
export declare const SWAP_FEE_NUMERATOR: BN;
export declare const SWAP_FEE_DENOMINATOR: BN;
export declare const SOLANA_RPC_ENDPOINT = "https://api-cryptocurrencies-ai.rpcpool.com";
export {};
