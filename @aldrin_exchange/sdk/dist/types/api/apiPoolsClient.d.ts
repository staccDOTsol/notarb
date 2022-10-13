import { AldrinApiClient } from './aldrinClient';
import { PoolInfo } from './types';
/**
 * Aldrin's backed API client
 */
export declare class AldrinApiPoolsClient extends AldrinApiClient {
    /**
     * Get TVL for AMM pools
     * @returns last value in USD
     */
    getTotalVolumeLocked(): Promise<number>;
    /**
     * @returns Extended information about existing pools
     */
    getPoolsInfo(): Promise<PoolInfo[]>;
}
