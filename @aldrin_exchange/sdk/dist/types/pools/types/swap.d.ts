import { Connection, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { WithAuhority, WithWallet } from '.';
import { PoolVersion, Wallet, WithReferral } from '../../types';
import { LiquidityPool } from './pools';
export declare enum SIDE {
    BID = 1,
    ASK = -1
}
declare type SwapPool = LiquidityPool & {
    feePoolTokenAccount: PublicKey;
    poolVersion?: PoolVersion;
    curve?: PublicKey;
};
export interface SwapParams extends WithWallet {
    outcomeAmount: BN;
    minIncomeAmount: BN;
    userBaseTokenAccount: PublicKey | undefined;
    userQuoteTokenAccount: PublicKey | undefined;
    side: SIDE;
    pool: SwapPool;
    slippage?: number;
    referralParams?: WithReferral;
}
export interface SwapInstructionParams extends SwapParams, WithAuhority {
    userBaseTokenAccount: PublicKey;
    userQuoteTokenAccount: PublicKey;
    poolVersion: PoolVersion;
}
export interface TokenSwapMints {
    mintFrom: PublicKey;
    mintTo: PublicKey;
}
export declare type TokenSwapGetPriceParams = TokenSwapMints;
export declare type OptionalAmounts = {
    outcomeAmount: BN;
    minIncomeAmount?: BN;
} | {
    outcomeAmount?: BN;
    minIncomeAmount: BN;
};
export interface TokenSwapSwapParamsInner extends TokenSwapMints {
    wallet?: Wallet;
    slippage?: number;
}
export declare type TokenSwapParams = TokenSwapSwapParamsInner & OptionalAmounts;
export interface TokenSwapLoadParams {
    connection?: Connection;
    wallet?: Wallet;
    referralParams?: WithReferral;
}
export declare type OptionalDepositAmounts = {
    maxBase: BN;
    maxQuote?: BN;
} | {
    maxQuote: BN;
    maxBase?: BN;
} | {
    maxBase: BN;
    maxQuote: BN;
};
export interface TokenSwapAddLiquidityParamsBase {
    poolMint: PublicKey;
    wallet?: Wallet;
}
export declare type TokenSwapAddlLiquidityParams = OptionalDepositAmounts & TokenSwapAddLiquidityParamsBase;
export declare type TokenSwapWithdrawLiquidityParams = TokenSwapAddLiquidityParamsBase & {
    poolTokenAmount: BN;
    slippage?: number;
    minBase?: BN;
    minQuote?: BN;
};
export interface TokenSwapGetFarmedParams {
    wallet?: Wallet;
    poolMint: PublicKey;
}
export {};
