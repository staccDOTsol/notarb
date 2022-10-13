/// <reference types="bn.js" />
import { Connection, PublicKey } from '@solana/web3.js';
import { DepositLiquidityParams, GetPoolsParams, PoolRpcResponse, PoolRpcV2Response, WithdrawLiquidityParams } from '.';
import { PoolVersion } from '../types';
import { SwapParams } from './types/swap';
export declare class PoolClient {
    private connection;
    private tokenClient;
    constructor(connection?: Connection);
    static getPoolAddress(poolVersion: PoolVersion): PublicKey;
    /**
     * Get list of all pools for v1 pools program
     * @param filters
     * @returns List of all pools for program
     */
    getPools(filters?: GetPoolsParams): Promise<PoolRpcResponse[]>;
    /**
     * Get list of all pools for v2 pools program
     * @param filters
     * @returns List of all pools for program
     */
    getV2Pools(filters?: GetPoolsParams): Promise<PoolRpcV2Response[]>;
    /**
     * Add liquidity to AMM pool
     * @param params
     * @returns transaction Id
     */
    depositLiquidity(params: DepositLiquidityParams): Promise<string>;
    /**
     * Helper method for calculation max wihdrwawable based on LP tokens amount
     * @param params
     * @returns
     */
    getMaxWithdrawable(params: WithdrawLiquidityParams): Promise<{
        withdrawAmountBase: import("bn.js");
        withdrawAmountQuote: import("bn.js");
    }>;
    /**
     * Withdraw liquidity from AMM pool
     * @param params
     * @returns {Promise<stirng>} - Transaction Id
     */
    withdrawLiquidity(params: WithdrawLiquidityParams): Promise<string>;
    /**
     * Swap tokens
     * @param params
     * @returns {Promise<string>} - Transaction Id
     */
    swap(params: SwapParams): Promise<string>;
}
