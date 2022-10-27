import { Connection } from "@solana/web3.js";
import { TokenInfo } from "../../types/types";
export declare function loadLiquidityInfos(fromCoin: TokenInfo, toCoin: TokenInfo, LI: any, connection: Connection, knownPairs: any, tokenMap: any, direct: boolean, reverse: boolean): Promise<any>;
