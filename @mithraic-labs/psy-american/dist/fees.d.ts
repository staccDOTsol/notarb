/// <reference types="bn.js" />
import * as anchor from "@project-serum/anchor";
/** The fee owner key for the Psy American program */
export declare const FEE_OWNER_KEY: anchor.web3.PublicKey;
/** The number of lamports the protocol takes as a fee when minting or
 * exercising an option on an asset that cannot take a 5bps fee. E.g a minting
 * a call option on an NFT */
export declare const NFT_MINT_LAMPORTS: number;
/**
 * Get the protocol's fee amount when minting or exercising. When minting this
 * should be the underlingAmountPerContract. When exercising this should be
 * the quoteAmountPerContract.
 *
 * @param assetQuantity - Quantity of the asset being used to mint or exercise
 * @returns
 */
export declare const feeAmountPerContract: (assetQuantity: anchor.BN) => anchor.BN;
