import { BN, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 *
 * @param program - Anchor Psy American Program
 * @param param1
 * @returns
 */
export declare const initializeSerumMarket: (program: Program<PsyAmerican>, { asks, bids, eventQueue, optionMarketKey, optionMint, pcDustThreshold, pcLotSize, pcMint, serumProgramKey, }: {
    /** The address for the new Serum market's eventual Event Queue */
    eventQueue?: PublicKey;
    /** The address for the new Serum market's bids */
    bids?: PublicKey;
    /** The address for the new Serum market's asks */
    asks?: PublicKey;
    /** The OptionMarket address that owns the OptionToken mint */
    optionMarketKey: PublicKey;
    /** The OptionToken's Mint address. This is the base token for the Serum market */
    optionMint: PublicKey;
    /** Serum market's dust threshold for the price currency */
    pcDustThreshold: BN;
    /** Serum market's price currency lot size */
    pcLotSize: BN;
    /** The Serum's price currency mint */
    pcMint: PublicKey;
    /** The Serum DEX program ID */
    serumProgramKey: PublicKey;
}) => Promise<{
    marketAuthority: PublicKey;
    serumMarketKey: PublicKey;
    tx: string;
}>;
