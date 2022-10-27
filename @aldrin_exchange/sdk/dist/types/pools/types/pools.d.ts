import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { PoolVersion, Wallet } from '../../types';
export interface PoolCommon {
    poolMint: PublicKey;
    baseTokenVault: PublicKey;
    baseTokenMint: PublicKey;
    quoteTokenVault: PublicKey;
    quoteTokenMint: PublicKey;
}
export interface WithFeesAccount {
    feeBaseAccount: PublicKey;
    feeQuoteAccount: PublicKey;
    feePoolTokenAccount: PublicKey;
}
export interface PoolResponse extends PoolCommon, WithFeesAccount {
    lpTokenFreezeVault: PublicKey;
    poolSigner: PublicKey;
    poolSignerNonce: number;
    authority: PublicKey;
    initializerAccount: PublicKey;
    fees: {
        tradeFeeNumerator: number;
        tradeFeeDenominator: number;
        ownerTradeFeeNumerator: number;
        ownerTradeFeeDenominator: number;
        ownerWithdrawFeeNumerator: number;
        ownerWithdrawFeeDenominator: number;
    };
    poolVersion: PoolVersion;
    curveType: number;
}
export interface PoolV2Response extends PoolResponse {
    curve: PublicKey;
}
export declare enum CURVE {
    PRODUCT = 0,
    STABLE = 1
}
export interface GetPoolsParams {
    mint?: PublicKey;
}
export declare type PoolRpcResponse = (PoolResponse) & WithPoolPK;
export declare type PoolRpcV2Response = (PoolV2Response) & WithPoolPK;
export interface WithPoolPK {
    poolPublicKey: PublicKey;
}
export interface LiquidityPool extends PoolCommon, WithPoolPK {
    poolVersion?: PoolVersion;
}
export interface BaseLiquidityParams {
    pool: LiquidityPool;
    userPoolTokenAccount: PublicKey | null;
    userBaseTokenAccount: PublicKey;
    userQuoteTokenAccount: PublicKey;
}
export interface WithWallet {
    wallet: Wallet;
}
export interface DepositLiquidityAmount {
    maxBaseTokenAmount: BN;
    maxQuoteTokenAmount: BN;
}
export interface WithSlippage {
    slippage?: number;
}
export interface DepositLiquidityParams extends BaseLiquidityParams, WithWallet, DepositLiquidityAmount, WithSlippage {
}
export interface WithAuhority {
    poolSigner: PublicKey;
    walletAuthority: PublicKey;
}
export interface DepositLiquididtyInstructionParams extends BaseLiquidityParams, DepositLiquidityAmount, WithAuhority {
    creationSize: BN;
    userPoolTokenAccount: PublicKey;
    programId: PublicKey;
}
export interface WithdrawLiquidityParams extends WithWallet, WithSlippage {
    pool: LiquidityPool & WithFeesAccount;
    poolTokenAmount: BN;
    userPoolTokenAccount: PublicKey;
    baseTokenReturnedMin?: BN;
    quoteTokenReturnedMin?: BN;
    userBaseTokenAccount?: PublicKey;
    userQuoteTokenAccount?: PublicKey;
}
export interface WithdrawLiquidityInstructionParams extends WithdrawLiquidityParams, WithAuhority {
    baseTokenReturnedMin: BN;
    quoteTokenReturnedMin: BN;
    userPoolTokenAccount: PublicKey;
    userBaseTokenAccount: PublicKey;
    userQuoteTokenAccount: PublicKey;
    programId: PublicKey;
}
