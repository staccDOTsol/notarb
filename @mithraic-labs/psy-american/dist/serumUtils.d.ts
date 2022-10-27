import { Program } from "@project-serum/anchor";
import { OpenOrders } from "@project-serum/serum";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "./psyAmericanTypes";
/**
 * Load the open orders for a user based on the Serum DEX and Serum Market
 * address.
 *
 * @param program - Anchor Psy American program
 * @param dexProgramId - Serum DEX program id
 * @param serumMarketAddress - Serum market address
 * @returns
 */
export declare const findOpenOrdersAccountsForOwner: (program: Program<PsyAmerican>, dexProgramId: PublicKey, serumMarketAddress: PublicKey) => Promise<OpenOrders[]>;
/**
 * Load all the open orders for a user based on the Serum DEX and the option market keys.
 *
 * @param program - Anchor Psy American program
 * @param serumProgramId - Serum DEX program id
 * @param optionMarketKeys - Keys for the Psy American OptionMarket's to load the open orders from
 * @param priceCurrencyKey - Key of the pc (aka quote currency) from the serum markets
 * @param optionMetaList - Optional list of option meta data to pull serum market data from instead of deriving
 * the address. This is for backwards compatibility
 * @returns
 */
export declare const findOpenOrdersForOptionMarkets: (program: Program<PsyAmerican>, serumProgramId: PublicKey, optionMarketKeys: PublicKey[], priceCurrencyKey: PublicKey, optionMetaList?: {
    expiration: number;
    optionMarketAddress: string;
    optionContractMintAddress: string;
    optionWriterTokenMintAddress: string;
    quoteAssetMint: string;
    quoteAssetPoolAddress: string;
    underlyingAssetMint: string;
    underlyingAssetPoolAddress: string;
    underlyingAssetPerContract: string;
    quoteAssetPerContract: string;
    serumMarketAddress: string;
    serumProgramId: string;
    psyOptionsProgramId: string;
}[]) => Promise<Record<string, OpenOrders>>;
export declare const deriveSerumMarketAddress: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, priceCurrencyKey: PublicKey) => Promise<[PublicKey, number]>;
export declare const deriveMarketAuthority: (program: Program<PsyAmerican>, dexProgramId: PublicKey, serumMarketKey: PublicKey) => Promise<[PublicKey, number]>;
export declare const deriveRequestQueue: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, priceCurrencyKey: PublicKey) => Promise<[PublicKey, number]>;
export declare const deriveCoinVault: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, priceCurrencyKey: PublicKey) => Promise<[PublicKey, number]>;
export declare const derivePCVault: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, priceCurrencyKey: PublicKey) => Promise<[PublicKey, number]>;
/**
 * Given an OptionMarket address and DEX program, generate the Serum market key,
 * market authority, and authority bump seed.
 *
 * @param {Program} program - PsyOptions American V1 Anchor program
 * @param {PublicKey} optionMarketKey - The key for the OptionMarket
 * @param {PublicKey} dexProgramId - Serum DEX public key
 * @returns
 */
export declare const getMarketAndAuthorityInfo: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, priceCurrencyKey: PublicKey) => Promise<{
    serumMarketKey: PublicKey;
    marketAuthority: PublicKey;
    marketAuthorityBump: number;
}>;
