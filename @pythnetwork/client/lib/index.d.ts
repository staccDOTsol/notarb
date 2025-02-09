/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
/** Constants. This section must be kept in sync with the on-chain program. */
export declare const Magic = 2712847316;
export declare const Version2 = 2;
export declare const Version = 2;
/** Number of slots that can pass before a publisher's price is no longer included in the aggregate. */
export declare const MAX_SLOT_DIFFERENCE = 25;
export declare enum PriceStatus {
    Unknown = 0,
    Trading = 1,
    Halted = 2,
    Auction = 3
}
export declare enum CorpAction {
    NoCorpAct = 0
}
export declare enum PriceType {
    Unknown = 0,
    Price = 1
}
export declare enum DeriveType {
    Unknown = 0,
    Volatility = 1
}
export declare enum AccountType {
    Unknown = 0,
    Mapping = 1,
    Product = 2,
    Price = 3,
    Test = 4
}
export interface Base {
    magic: number;
    version: number;
    type: AccountType;
    size: number;
}
export interface MappingData extends Base {
    nextMappingAccount: PublicKey | null;
    productAccountKeys: PublicKey[];
}
export interface Product {
    symbol: string;
    asset_type: string;
    quote_currency: string;
    tenor: string;
    price_account: string;
    [index: string]: string;
}
export interface ProductData extends Base {
    priceAccountKey: PublicKey;
    product: Product;
}
export interface Price {
    priceComponent: bigint;
    price: number;
    confidenceComponent: bigint;
    confidence: number;
    status: PriceStatus;
    corporateAction: CorpAction;
    publishSlot: number;
}
export interface PriceComponent {
    publisher: PublicKey | null;
    aggregate: Price;
    latest: Price;
}
export interface Ema {
    valueComponent: bigint;
    value: number;
    numerator: bigint;
    denominator: bigint;
}
export interface PriceData extends Base {
    priceType: PriceType;
    exponent: number;
    numComponentPrices: number;
    numQuoters: number;
    lastSlot: bigint;
    validSlot: bigint;
    emaPrice: Ema;
    emaConfidence: Ema;
    timestamp: bigint;
    minPublishers: number;
    drv2: number;
    drv3: number;
    drv4: number;
    productAccountKey: PublicKey;
    nextPriceAccountKey: PublicKey | null;
    previousSlot: bigint;
    previousPriceComponent: bigint;
    previousPrice: number;
    previousConfidenceComponent: bigint;
    previousConfidence: number;
    previousTimestamp: bigint;
    priceComponents: PriceComponent[];
    aggregate: Price;
    price: number | undefined;
    confidence: number | undefined;
    status: PriceStatus;
}
/** Parse data as a generic Pyth account. Use this method if you don't know the account type. */
export declare function parseBaseData(data: Buffer): Base | undefined;
export declare const parseMappingData: (data: Buffer) => MappingData;
export declare const parseProductData: (data: Buffer) => ProductData;
export declare const parsePriceData: (data: Buffer, currentSlot?: number | undefined) => PriceData;
export { PythConnection } from './PythConnection';
export { PythHttpClient } from './PythHttpClient';
export { getPythProgramKeyForCluster } from './cluster';
