import { Connection, PublicKey } from '@solana/web3.js';
import { FarmingClient, TokenClient } from '.';
import { PoolClient, PoolRpcResponse, TokenSwapAddlLiquidityParams, TokenSwapGetFarmedParams, TokenSwapGetPriceParams, TokenSwapLoadParams, TokenSwapParams, TokenSwapWithdrawLiquidityParams } from './pools';
import { SwapBase } from './swapBase';
import BN from 'bn.js';
import { Wallet, WithReferral } from './types';
/**
 * High-level API for Aldrin AMM Pools
 */
export declare class TokenSwap extends SwapBase {
    private pools;
    private poolClient;
    protected tokenClient: TokenClient;
    private farmingClient;
    protected connection: Connection;
    private wallet;
    private referralParams;
    constructor(pools: PoolRpcResponse[], poolClient: PoolClient, tokenClient: TokenClient, farmingClient: FarmingClient, connection?: Connection, wallet?: Wallet | null, referralParams?: WithReferral | undefined);
    findPool(mintFrom: PublicKey, mintTo: PublicKey): {
        pool: PoolRpcResponse;
        isInverted: boolean;
    } | null;
    swap(params: TokenSwapParams): Promise<string>;
    /**
     * Make tokens swap
     * @returns Transaction Id
     */
    private resolveSwapInputs;
    getSwapImpact(params: TokenSwapParams): Promise<{
        minIncomeAmount: BN;
        outcomeAmount: BN;
        priceImpact: number;
        isInverted: boolean;
        fee: BN;
    }>;
    /**
     * Add liquidity to Aldrin's AMM pool
     * @param params
     * @returns Transaction Id
     */
    depositLiquidity(params: TokenSwapAddlLiquidityParams): Promise<string>;
    /**
     * Withdraw liquidity from Aldrin's AMM pool
     * @param params
     * @returns Transaction Id
     */
    withdrawLiquidity(params: TokenSwapWithdrawLiquidityParams): Promise<string>;
    /**
     * Calculate price of mintForm/mintTo tokens
     * @param params
     * @returns
     */
    getPrice(params: TokenSwapGetPriceParams): Promise<number>;
    /**
     * Auto-initialize Tokenswap
     */
    static initialize(params?: TokenSwapLoadParams): Promise<TokenSwap>;
    getFarmed(params: TokenSwapGetFarmedParams): Promise<{
        calcAccount: import(".").FarmingCalc | undefined;
        tokenInfo: import(".").TokenAccountInfo;
        state: import(".").FarmingState;
    }[]>;
    claimFarmed(params: TokenSwapGetFarmedParams): Promise<string[]>;
}
