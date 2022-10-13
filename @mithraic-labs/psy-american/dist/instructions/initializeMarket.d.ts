import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Initialize a new OptionMarket
 *
 * @param program - The Psy American program
 * @param connection - Solana connection
 * @param params
 * @returns
 */
export declare const initializeMarket: (program: anchor.Program<PsyAmerican>, { expirationUnixTimestamp, quoteAmountPerContract, quoteMint, underlyingAmountPerContract, underlyingMint, }: {
    /** The option market expiration timestamp in seconds */
    expirationUnixTimestamp: anchor.BN;
    /** The quote amount per contract for the OptionMarket
     * Strike price is derived from underlyingAmountPerContract & quoteAmountPerContract */
    quoteAmountPerContract: anchor.BN;
    /** The quote asset mint */
    quoteMint: PublicKey;
    /** The underlying amount per contract for the OptionMarket. *
     * Strike price is derived from underlyingAmountPerContract & quoteAmountPerContract */
    underlyingAmountPerContract: anchor.BN;
    /** The underlying mint address */
    underlyingMint: PublicKey;
}) => Promise<{
    optionMarketKey: PublicKey;
    optionMintKey: PublicKey;
    quoteAssetPoolKey: PublicKey;
    tx: string;
    underlyingAssetPoolKey: PublicKey;
    writerMintKey: PublicKey;
}>;
