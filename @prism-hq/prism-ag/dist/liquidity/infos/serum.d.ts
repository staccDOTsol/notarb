import { Market } from "@project-serum/serum";
import { Connection } from "@solana/web3.js";
export declare function getOrderBooks(connection: any, markets: any): Promise<any>;
export declare function loadMarket(decoded: any, programId: any, tokenMap: any): Market;
export declare function loadSerum(serumMarkets: any, connection: Connection, tokenList: any[]): Promise<any>;
