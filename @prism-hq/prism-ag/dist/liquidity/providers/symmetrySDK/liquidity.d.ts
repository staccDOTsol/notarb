import { Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { PriceData } from "@pythnetwork/client";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { FundsIDL } from "./fundsIDL";
import { FundStateChainData, RouteData, TokenInfoData } from "./types";
export declare function checkForLiquidity(tokenInfoData: TokenInfoData[], fundAddress: PublicKey, fund: FundStateChainData, pythPrices: PriceData[], tokenFrom: number, tokenTo: number, fromAmount: number): RouteData | undefined;
export declare function loadRouteData(tokenInfoData: TokenInfoData[], funds: {
    pubkey: PublicKey;
    fund: FundStateChainData;
}[], pythPrices: PriceData[], tokenFrom: number | undefined, tokenTo: number | undefined, fromAmount: number): RouteData;
export declare function generateSwapInstruction(program: Program<FundsIDL>, wallet: Wallet, tokenInfoData: TokenInfoData[], routeData: RouteData, userFromTokenAccount: PublicKey, userToTokenAccount: PublicKey): Promise<TransactionInstruction>;
