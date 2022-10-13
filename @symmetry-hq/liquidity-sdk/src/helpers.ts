import { Program } from "@project-serum/anchor";
import { parsePriceData, PriceData } from "@pythnetwork/client";
import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { FundsIDL } from "./fundsIDL";
import { FundStateChainData, FUNDS_PROGRAM_ID, TokenInfoData } from "./types";

export async function getPythPrices(
    connection: Connection,
    tokenInfoData: TokenInfoData[]
): Promise<PriceData[]> {
    let rawAccounts = await connection.getMultipleAccountsInfo(
        tokenInfoData.map(x => new PublicKey(x.pyth))
    );
    //@ts-ignore
    return rawAccounts.map(x => parsePriceData(x.data))
}

export async function getFunds(
    connection: Connection,
    program: Program<FundsIDL>,
): Promise<{pubkey: PublicKey, fund: FundStateChainData}[]> {
    let rawAccounts = await connection.getProgramAccounts(
        FUNDS_PROGRAM_ID,
        {
            commitment: connection.commitment,
            filters: [
                { dataSize: 10208 },
            ],
            encoding: 'base64'
        }
    )
   
    return rawAccounts
        .map(x => {
            return {
                pubkey: x.pubkey,
                fund: program.coder.accounts.decode("fundState", x.account.data)
            }
        })
        .filter(fundData => fundData.fund.sellState.toNumber() == 0)
}

export function asciiToString(
    coingeckoIdAscii: number[],
): string {
    let coingeckoId: string = "";
    for(let i=0; i<coingeckoIdAscii.length; i++)
        if(coingeckoIdAscii[i] != 0)
            coingeckoId += String.fromCharCode(coingeckoIdAscii[i]).toString();
    return coingeckoId;
}

export async function fetchTokenInfo(
    program: Program<FundsIDL>,
    tokenInfo: PublicKey,
): Promise<TokenInfoData[]> {
    let solanaTokenList:any = [];
    let tokenMap: any = {};
    for (let i = 0; i < solanaTokenList.length; i++)
        tokenMap[solanaTokenList[i].address] = {
            symbol: solanaTokenList[i].symbol,
            name: solanaTokenList[i].name,
            decimals: solanaTokenList[i].decimals,
        }
    let state = await program.account.tokenInfo.fetch(tokenInfo);
    let numTokens = state.numTokens.toNumber();
    let tokens = [];
    for (let i = 0; i < numTokens; i++) {
        tokens.push({
            id: i,
            symbol: tokenMap[state.tokenMint[i].toBase58()]? tokenMap[state.tokenMint[i].toBase58()].symbol : undefined,
            name: tokenMap[state.tokenMint[i].toBase58()] ? tokenMap[state.tokenMint[i].toBase58()].name : undefined,
            mint: state.tokenMint[i].toBase58(),
            pdaAccount: state.pdaTokenAccount[i].toBase58(),
            pyth: state.pyth[i].toBase58(),
            decimals: state.decimals[i],
            //@ts-ignore
            coingeckoId: asciiToString(state.coingeckoIds[i]),
        });
    }
    return tokens;
}

export function findTokenId(
    tokenInfoData: TokenInfoData[],
    tokenMint: PublicKey,
): number|undefined {
    for (let i = 0; i < tokenInfoData.length; i++)
        if (tokenInfoData[i].mint == tokenMint.toBase58())
            return tokenInfoData[i].id;
    return undefined;
}
