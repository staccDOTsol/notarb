import { Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { FundStateChainData, RouteData, TokenInfoData } from "./types";
import { FundsIDL } from "./fundsIDL";
import { PriceData } from "@pythnetwork/client";
export declare class TokenSwap {
    private connection;
    private program;
    private tokenInfoData;
    private funds;
    private pythPrices;
    private wallet?;
    constructor(connection: Connection, program: Program<FundsIDL>, tokenInfoData: TokenInfoData[], funds: {
        pubkey: PublicKey;
        fund: FundStateChainData;
    }[], pythPrices: PriceData[], wallet?: Wallet);
    static init(connection: Connection, wallet?: Wallet): Promise<TokenSwap>;
    setWallet(wallet: Wallet): void;
    getTokenList(): {
        tokenId: number;
        tokenSymbol: string;
        tokenMint: string;
    }[];
    updateLiquiditySources(): Promise<void>;
    loadSwap(tokenFrom: PublicKey, tokenTo: PublicKey, fromAmount: number): RouteData;
    generateSwapInstruction(routeData: RouteData, fromTokenAccount: PublicKey, toTokenAccount: PublicKey): Promise<TransactionInstruction>;
}
