/* Config file should be manually updated every time on-chain program updates */

import { AccountMeta, Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

export const FUNDS_PROGRAM_ID = new PublicKey("2KehYt3KsEQR53jYcxjbQp2d2kCp4AkuQW68atufRwSr");
export const FUNDS_PROGRAM_PDA = new PublicKey("BLBYiq48WcLQ5SxiftyKmPtmsZPUBEnDEjqEnKGAR4zx");
export const TOKEN_INFO_ADDRESS = new PublicKey("4Rn7pKKyiSNKZXKCoLqEpRznX1rhveV4dW1DCg6hRoVH");
export const TOKEN_STATS_ADDRESS = new PublicKey("5u1AuCafhCtWENUo3m2aLKtDuoQQfWzr2bb5bDJzD47q");
export const DATABASE_ADDRESS = new PublicKey("2FC4kaLTtyqSypK9rZiSMvsM3WkA6kz9CUmu57h9wecb");
export const CREATE_FEE_ACCOUNT = new PublicKey("AWfpfzA6FYbqx4JLz75PDgsjH7jtBnnmJ6MXW5zNY2Ei");
export const BUY_FEE_ACCOUNT = new PublicKey("CzzVkhXfB3ZpVVgw3Fv5iku1Vm6xHiDjVK58NbRN5jRo");
export const REBALNCE_FEE_ACCOUNT = new PublicKey("51BcLm14742i9Z3LNBf51u4UJZnURSkoGdd4cjwcTF7d");
export const SWAP_FEE_ACCOUNT = new PublicKey("48jWdAAChBznvLngKcRMBvJZ19VbuzU7WYgNtCaQgvK7");

export type FundFilter = "manager" | "host";

export type FilterOption = {
    filterType: FundFilter,
    filterPubkey: PublicKey,
}

export enum FilterType {
    Fixed,
    MarketCap,
    Volume,
    Performace,
}

export enum WeightType {
    Fixed,
    MarketCap,
    Volume,
    Performace,
}

export enum FilterTime {
    Day,
    Week,
    Month,
    Quarter,
    HalfYear,
    Year,
}

export enum WeightTime {
    Day,
    Week,
    Month,
    Quarter,
    HalfYear,
    Year,
}

export enum SortBy {
    DescendingOrder,
    AscendingOrder,
}

export type Rule = {
    filterBy: FilterType,
    filterDays: FilterTime,
    sortBy: SortBy,
    totalWeight: number,
    fixedAsset: number,
    numAssets: number,
    weightBy: WeightType,
    weightDays: WeightTime,
    weightExpo: number,
    excludeAssets: number[],
    ruleAssets?: number[],
}

export type CreateFundParams = {
    hostPlatform: PublicKey,
    hostPlatformFee: number,
    manager: PublicKey,
    managerFee: number,
    activelyManaged: boolean,
    assetPool: number[],
    refilterInterval: number,
    reweightInterval: number,
    rebalanceInterval: number,
    rebalanceThreshold: number,
    rebalanceSlippage: number,
    rules: Rule[],
}

export type FundStateChainData = {
    version: BN,
    manager: PublicKey,
    fundToken: PublicKey,
    managerFee: BN,
    supplyOutsanding: BN,
    activelyManaged: BN,
    activeBuyStates: BN,

    sellState: BN,
    rebalanceSellState: BN,

    hostPubkey: PublicKey,
    hostFee: BN,

    numOfTokens: BN,     
    currentCompToken: BN[],
    currentCompAmount: BN[],
    lastRebalanceTime: BN[],
    targetWeight: BN[],
    weightSum: BN,

    currentWeight: BN[],
    fundWorth: BN,
    lastUpdateTime: BN,

    refilterInterval: BN,
    reweightInterval: BN,
    rebalanceInterval: BN,
    rebalanceThreshold: BN,
    rebalanceSlippage: BN,
    lpOffsetThreshold: BN,
    lastRefilterTime: BN,
    lastReweightTime: BN,

    rulesReady: BN,
    assetPool: BN[],
    numOfRules: BN,      
    rules: {
        filterBy: BN,
        filterDays: BN,
        sortBy: BN,
        totalWeight: BN,
        fixedAsset: BN,
        numAssets: BN,
        weightBy: BN,  
        weightDays: BN,
        weightExpo: BN,
        excludeNum: BN,
        excludeAssets: BN[],
        ruleAssets: BN[],
    }[],

    numRuleTokens: BN,   
    ruleTokens: BN[],
    ruleTokenWeights: BN[],

    messageDigestFive: BN[],

    fundLpFee: BN,
    symmetryLpFee: BN,
    extraBytes: BN[],
}

export type TokenInfoData = {
    id: number,
    symbol: string,
    name: string,
    mint: string,
    pdaAccount: string,
    pyth: string,
    decimals: number,
    coingeckoId: string,
}

export enum Side {
    To,
    From,
}

export type RebalanceInfo = {
    tokenId: number,
    tokenAccountFrom: string,
    mintFrom: string,
    pythFrom: string,
    tokenAccountTo: string,
    mintTo: string,
    pythTo: string,
    amountFrom: number,
    volume: number,
    side: Side
}

export type RouteData = {
    fromAmount: number,
    toAmount: number,
    minimumReceived: number,
    fromTokenId: number,
    toTokenId: number,
    feeUSDC: number,
    swapAccounts: {
        program: PublicKey,
        fundState: PublicKey,
        authority: PublicKey,
        source: PublicKey,
        destination: PublicKey,
        fees: PublicKey,
        tokenInfo: PublicKey,
        remainingAccounts: AccountMeta[],
    }
}
