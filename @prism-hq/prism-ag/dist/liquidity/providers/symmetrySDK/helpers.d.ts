import { Program } from "@project-serum/anchor";
import { PriceData } from "@pythnetwork/client";
import { Connection, PublicKey } from "@solana/web3.js";
import { FundsIDL } from "./fundsIDL";
import { FundStateChainData, TokenInfoData } from "./types";
export declare function getPythPrices(connection: Connection, tokenInfoData: TokenInfoData[]): Promise<PriceData[]>;
export declare function getFunds(connection: Connection, program: Program<FundsIDL>): Promise<{
    pubkey: PublicKey;
    fund: FundStateChainData;
}[]>;
export declare function asciiToString(coingeckoIdAscii: number[]): string;
export declare function fetchTokenInfo(program: Program<FundsIDL>, tokenInfo: PublicKey): Promise<TokenInfoData[]>;
export declare function findTokenId(tokenInfoData: TokenInfoData[], tokenMint: PublicKey): number | undefined;
