import { PoolInfo, PoolInfoResponse } from '../types';
export declare const poolResponseToModel: (response: PoolInfoResponse, prices: Map<string, number>) => PoolInfo;
