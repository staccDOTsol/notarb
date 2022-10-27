import { Connection } from '@solana/web3.js';
import { DTwapPair } from './types';
import { GetDTwapAvailableTokensParams, GetDTwapOrders, GetDTwapResponse, DTwapExecuteSwapParams, DTwapOrderArayResponse } from '.';
export declare class DTwapClient {
    private connection;
    constructor(connection?: Connection);
    getPairs(): Promise<DTwapPair[]>;
    getOrders(params?: GetDTwapOrders): Promise<DTwapOrderArayResponse[]>;
    getAvailableTokens(params: GetDTwapAvailableTokensParams): Promise<GetDTwapResponse>;
    /**
     *
     * @param params
     * @returns Transaction Id
     */
    executeSwap(params: DTwapExecuteSwapParams): Promise<string>;
}
