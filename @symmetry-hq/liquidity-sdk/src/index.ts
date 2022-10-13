import { Program, AnchorProvider } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { Connection, Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { FundStateChainData, FUNDS_PROGRAM_ID, RouteData, TokenInfoData, TOKEN_INFO_ADDRESS } from "./types";
import { FundsIDL, IDL } from "./fundsIDL";
import { fetchTokenInfo, findTokenId, getFunds, getPythPrices } from "./helpers";
import { availableRoutes, generateSwapInstruction, loadRouteData } from "./liquidity";
import { PriceData } from "@pythnetwork/client";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export class TokenSwap {

    private connection: Connection;
    private program: Program<FundsIDL>;
    private tokenInfoData: TokenInfoData[];
    private funds: {pubkey: PublicKey, fund: FundStateChainData}[];
    private pythPrices: PriceData[];
    private wallet?: Wallet;

    constructor(
        connection: Connection,
        program: Program<FundsIDL>,
        tokenInfoData: TokenInfoData[],
        funds: {pubkey: PublicKey, fund: FundStateChainData}[],
        pythPrices: PriceData[],
        wallet?: Wallet,
    ) {
        this.connection = connection;
        this.program = program;
        this.tokenInfoData = tokenInfoData;
        this.funds = funds;
        this.pythPrices = pythPrices;
        this.wallet = wallet;
    }
    
    static async init(
        connection: Connection,
        wallet?: Wallet,
    ): Promise<TokenSwap> {
        if (!wallet)
            wallet = new NodeWallet(Keypair.generate());
        let provider = new AnchorProvider(
            connection,
            wallet,
            {
                skipPreflight: true,
                preflightCommitment: "recent",
                commitment: "recent",
            }
        );
        let program = new Program(
            IDL,
            FUNDS_PROGRAM_ID,
            provider
        );
        let tokenInfoData = await fetchTokenInfo(
            program,
            TOKEN_INFO_ADDRESS,
        );

        let funds = await getFunds(connection, program);
        let pythPrices = await getPythPrices(connection, tokenInfoData);

        return new TokenSwap(
            connection,
            program,
            tokenInfoData,
            funds,
            pythPrices,
            wallet,
        )
    }

    setWallet(wallet: Wallet) {
        this.wallet = wallet;
        let provider = new AnchorProvider(
            this.connection,
            wallet,
            {
                skipPreflight: true,
                preflightCommitment: "recent",
                commitment: "recent",
            }
        )
        this.program = new Program(
            IDL,
            FUNDS_PROGRAM_ID,
            provider
        );
    }

    getTokenList(): {
        tokenId: number,
        coingeckoId: string,
        tokenMint: string,
    }[] {
        return this.tokenInfoData.map(x => {
            return {
                tokenId: x.id,
                coingeckoId: x.coingeckoId,
                tokenMint: x.mint,
            }
        })
    }

    async updateLiquiditySources() {
        this.funds = await getFunds(this.connection, this.program);
        this.pythPrices = await getPythPrices(this.connection, this.tokenInfoData);
    }

    async getLiquidityInfo(fundPubkey: PublicKey): Promise<{
        tokenMint: string,
        userCanSellToFund: number,
        userCanBuyFromFund: number,
    }[]> {
        let fund = null;
        for (let i = 0; i < this.funds.length; i++)
            if (this.funds[i].pubkey.equals(fundPubkey))
                fund = this.funds[i];
        if (!fund)
            throw new Error("No such fund found");
        this.pythPrices = await getPythPrices(this.connection, this.tokenInfoData);
        return availableRoutes(
            this.tokenInfoData,
            fund.fund,
            this.pythPrices
        );
    }

    loadSwap(
        tokenFrom: PublicKey,
        tokenTo: PublicKey,
        fromAmount: number
    ): RouteData {
        let tokenIdFrom = findTokenId(this.tokenInfoData, tokenFrom);
        let tokenIdTo = findTokenId(this.tokenInfoData, tokenTo);
        return loadRouteData(
            this.tokenInfoData,
            this.funds,
            this.pythPrices,
            tokenIdFrom,
            tokenIdTo,
            fromAmount,
        );
    }

    async generateSwapInstruction(
        routeData: RouteData,
        fromTokenAccount: PublicKey,
        toTokenAccount: PublicKey,
    ): Promise<TransactionInstruction> {
        if (!this.wallet)
            throw new Error("Wallet not provided");
        return await generateSwapInstruction(
            this.program,
            this.wallet,
            this.tokenInfoData,
            routeData,
            fromTokenAccount,
            toTokenAccount
        );
    }
}
