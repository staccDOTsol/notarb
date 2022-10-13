import { Connection, PublicKey } from '@solana/web3.js';
import { TokenClient, TokenSwapGetPriceParams, TokenSwapLoadParams, DTwapClient, DTwapPair } from '.';
import { SwapBase } from './swapBase';
import { Wallet } from './types';
export declare class DTwapSwap extends SwapBase {
    private pairs;
    private dtwapClient;
    protected tokenClient: TokenClient;
    protected connection: Connection;
    private wallet;
    constructor(pairs: DTwapPair[], dtwapClient: DTwapClient, tokenClient: TokenClient, connection?: Connection, wallet?: Wallet | null);
    getPrices(params: TokenSwapGetPriceParams): Promise<{
        price: number;
        order: import(".").DTwapOrderArayResponse;
        available: import(".").GetDTwapResponse;
    }[]>;
    getPrice(params: TokenSwapGetPriceParams): Promise<number>;
    findPair(mintFrom: PublicKey, mintTo: PublicKey): {
        pair: DTwapPair;
        isInverted: boolean;
    } | null;
    static initialize(params?: TokenSwapLoadParams): Promise<DTwapSwap>;
}
