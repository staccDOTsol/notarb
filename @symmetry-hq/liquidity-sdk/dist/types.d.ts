import { AccountMeta, PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
export declare const FUNDS_PROGRAM_ID: PublicKey;
export declare const FUNDS_PROGRAM_PDA: PublicKey;
export declare const TOKEN_INFO_ADDRESS: PublicKey;
export declare const TOKEN_STATS_ADDRESS: PublicKey;
export declare const DATABASE_ADDRESS: PublicKey;
export declare const CREATE_FEE_ACCOUNT: PublicKey;
export declare const BUY_FEE_ACCOUNT: PublicKey;
export declare const REBALNCE_FEE_ACCOUNT: PublicKey;
export declare const SWAP_FEE_ACCOUNT: PublicKey;
export declare type FundFilter = "manager" | "host";
export declare type FilterOption = {
    filterType: FundFilter;
    filterPubkey: PublicKey;
};
export declare enum FilterType {
    Fixed = 0,
    MarketCap = 1,
    Volume = 2,
    Performace = 3
}
export declare enum WeightType {
    Fixed = 0,
    MarketCap = 1,
    Volume = 2,
    Performace = 3
}
export declare enum FilterTime {
    Day = 0,
    Week = 1,
    Month = 2,
    Quarter = 3,
    HalfYear = 4,
    Year = 5
}
export declare enum WeightTime {
    Day = 0,
    Week = 1,
    Month = 2,
    Quarter = 3,
    HalfYear = 4,
    Year = 5
}
export declare enum SortBy {
    DescendingOrder = 0,
    AscendingOrder = 1
}
export declare type Rule = {
    filterBy: FilterType;
    filterDays: FilterTime;
    sortBy: SortBy;
    totalWeight: number;
    fixedAsset: number;
    numAssets: number;
    weightBy: WeightType;
    weightDays: WeightTime;
    weightExpo: number;
    excludeAssets: number[];
    ruleAssets?: number[];
};
export declare type CreateFundParams = {
    hostPlatform: PublicKey;
    hostPlatformFee: number;
    manager: PublicKey;
    managerFee: number;
    activelyManaged: boolean;
    assetPool: number[];
    refilterInterval: number;
    reweightInterval: number;
    rebalanceInterval: number;
    rebalanceThreshold: number;
    rebalanceSlippage: number;
    rules: Rule[];
};
export declare type FundStateChainData = {
    version: BN;
    manager: PublicKey;
    fundToken: PublicKey;
    managerFee: BN;
    supplyOutsanding: BN;
    activelyManaged: BN;
    activeBuyStates: BN;
    sellState: BN;
    rebalanceSellState: BN;
    hostPubkey: PublicKey;
    hostFee: BN;
    numOfTokens: BN;
    currentCompToken: BN[];
    currentCompAmount: BN[];
    lastRebalanceTime: BN[];
    targetWeight: BN[];
    weightSum: BN;
    currentWeight: BN[];
    fundWorth: BN;
    lastUpdateTime: BN;
    refilterInterval: BN;
    reweightInterval: BN;
    rebalanceInterval: BN;
    rebalanceThreshold: BN;
    rebalanceSlippage: BN;
    lpOffsetThreshold: BN;
    lastRefilterTime: BN;
    lastReweightTime: BN;
    rulesReady: BN;
    assetPool: BN[];
    numOfRules: BN;
    rules: {
        filterBy: BN;
        filterDays: BN;
        sortBy: BN;
        totalWeight: BN;
        fixedAsset: BN;
        numAssets: BN;
        weightBy: BN;
        weightDays: BN;
        weightExpo: BN;
        excludeNum: BN;
        excludeAssets: BN[];
        ruleAssets: BN[];
    }[];
    numRuleTokens: BN;
    ruleTokens: BN[];
    ruleTokenWeights: BN[];
    messageDigestFive: BN[];
    fundLpFee: BN;
    symmetryLpFee: BN;
    extraBytes: BN[];
};
export declare type TokenInfoData = {
    id: number;
    symbol: string;
    name: string;
    mint: string;
    pdaAccount: string;
    pyth: string;
    decimals: number;
    coingeckoId: string;
};
export declare enum Side {
    To = 0,
    From = 1
}
export declare type RebalanceInfo = {
    tokenId: number;
    tokenAccountFrom: string;
    mintFrom: string;
    pythFrom: string;
    tokenAccountTo: string;
    mintTo: string;
    pythTo: string;
    amountFrom: number;
    volume: number;
    side: Side;
};
export declare type RouteData = {
    fromAmount: number;
    toAmount: number;
    minimumReceived: number;
    fromTokenId: number;
    toTokenId: number;
    feeUSDC: number;
    swapAccounts: {
        program: PublicKey;
        fundState: PublicKey;
        authority: PublicKey;
        source: PublicKey;
        destination: PublicKey;
        fees: PublicKey;
        tokenInfo: PublicKey;
        remainingAccounts: AccountMeta[];
    };
};
