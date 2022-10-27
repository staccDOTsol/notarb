import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
/**
 * Get the deterministic address for an Option based on its properties.
 * @returns
 */
export declare const deriveOptionKeyFromParams: ({ expirationUnixTimestamp, programId, quoteAmountPerContract, quoteMint, underlyingAmountPerContract, underlyingMint, }: {
    /** The OptionMarket expiration timestamp in seconds */
    expirationUnixTimestamp: BN;
    /** The Psy American program ID */
    programId: PublicKey;
    /** The quote asset amount per option contract  */
    quoteAmountPerContract: BN;
    /** The quote asset mint address  */
    quoteMint: PublicKey;
    /** The underlying asset amount per option contract */
    underlyingAmountPerContract: BN;
    /** The underlying asset mint address */
    underlyingMint: PublicKey;
}) => Promise<[PublicKey, number]>;
