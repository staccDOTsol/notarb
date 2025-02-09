/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
export declare type Cluster = 'devnet' | 'mainnet' | 'localnet' | 'testnet';
export declare const msrmMints: {
    devnet: PublicKey;
    mainnet: PublicKey;
    localnet: PublicKey;
    testnet: PublicKey;
};
export declare const mngoMints: {
    devnet: PublicKey;
    mainnet: PublicKey;
    testnet: PublicKey;
};
export declare const delistedSpotMarkets: {
    publicKey: PublicKey;
    name: string;
    baseSymbol: string;
    baseDecimals: number;
    marketIndex: number;
}[];
export declare const delistedPerpMarkets: {
    publicKey: PublicKey;
    name: string;
    baseSymbol: string;
    baseDecimals: number;
    quoteDecimals: number;
    marketIndex: number;
}[];
export declare const delistedTokens: {
    mintKey: PublicKey;
    symbol: string;
    decimals: number;
}[];
export declare const delistedOracles: {
    publicKey: PublicKey;
    symbol: string;
    marketIndex: number;
}[];
export interface OracleConfig {
    symbol: string;
    publicKey: PublicKey;
}
export interface SpotMarketConfig {
    name: string;
    publicKey: PublicKey;
    baseSymbol: string;
    baseDecimals: number;
    quoteDecimals: number;
    marketIndex: number;
    bidsKey: PublicKey;
    asksKey: PublicKey;
    eventsKey: PublicKey;
}
export interface PerpMarketConfig {
    name: string;
    publicKey: PublicKey;
    baseSymbol: string;
    baseDecimals: number;
    quoteDecimals: number;
    marketIndex: number;
    bidsKey: PublicKey;
    asksKey: PublicKey;
    eventsKey: PublicKey;
}
export interface TokenConfig {
    symbol: string;
    mintKey: PublicKey;
    decimals: number;
    rootKey: PublicKey;
    nodeKeys: PublicKey[];
}
export interface GroupConfig {
    cluster: Cluster;
    name: string;
    quoteSymbol: string;
    publicKey: PublicKey;
    mangoProgramId: PublicKey;
    serumProgramId: PublicKey;
    oracles: OracleConfig[];
    perpMarkets: PerpMarketConfig[];
    spotMarkets: SpotMarketConfig[];
    tokens: TokenConfig[];
}
export declare function getSpotMarketConfig(group: GroupConfig, predicate: any): SpotMarketConfig | undefined;
export declare function getPerpMarketConfig(group: GroupConfig, predicate: any): PerpMarketConfig | undefined;
export declare function getTokenConfig(group: GroupConfig, predicate: any): TokenConfig | undefined;
export declare function getOracleConfig(group: GroupConfig, predicate: any): OracleConfig | undefined;
export declare function getMarketIndexBySymbol(group: GroupConfig, symbol: string): number;
export declare function getOracleBySymbol(group: GroupConfig, symbol: string): OracleConfig | undefined;
export declare function getPerpMarketByBaseSymbol(group: GroupConfig, symbol: string): PerpMarketConfig | undefined;
export declare function getPerpMarketByIndex(group: GroupConfig, marketIndex: number): PerpMarketConfig | undefined;
export declare function getSpotMarketByBaseSymbol(group: GroupConfig, symbol: string): SpotMarketConfig | undefined;
export declare type MarketKind = 'spot' | 'perp';
export interface MarketConfig {
    kind: MarketKind;
    name: string;
    publicKey: PublicKey;
    baseSymbol: string;
    baseDecimals: number;
    quoteDecimals: number;
    marketIndex: number;
    bidsKey: PublicKey;
    asksKey: PublicKey;
    eventsKey: PublicKey;
}
export declare function getAllMarkets(group: GroupConfig): MarketConfig[];
export declare function getMarketByBaseSymbolAndKind(group: GroupConfig, symbol: string, kind: MarketKind): MarketConfig;
export declare function getMarketByPublicKey(group: GroupConfig, key: string | Buffer | PublicKey): MarketConfig | undefined;
export declare function getTokenByMint(group: GroupConfig, mint: string | Buffer | PublicKey): TokenConfig | undefined;
export declare function getTokenBySymbol(group: GroupConfig, symbol: string): TokenConfig;
export declare class Config {
    cluster_urls: Record<Cluster, string>;
    groups: GroupConfig[];
    constructor(json: any);
    static ids(): Config;
    toJson(): any;
    getGroup(cluster: Cluster, name: string): GroupConfig | undefined;
    getGroupWithName(name: string): GroupConfig | undefined;
    storeGroup(group: GroupConfig): void;
}
//# sourceMappingURL=config.d.ts.map