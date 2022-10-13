import { Connection } from "@solana/web3.js";
export declare function getAddressForWhat(address: string, pools: any): {
    key: string;
    ammId: any;
    version: any;
} | {
    key?: undefined;
    ammId?: undefined;
    version?: undefined;
};
export declare function fetchItemLiquidity(ammInfo: any): any;
export declare function loadRaydium(liquidity: any, connection: Connection): Promise<any>;
