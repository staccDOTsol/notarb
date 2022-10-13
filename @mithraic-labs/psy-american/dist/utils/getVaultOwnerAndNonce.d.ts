import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
/**
 * This is needed for the permissioned serum markets.
 *
 * TODO can we replace this with PublicKey.findProgramAddress
 *
 * @param marketPublicKey
 * @param dexProgramId
 * @returns
 */
export declare const getVaultOwnerAndNonce: (marketPublicKey: PublicKey, dexProgramId: PublicKey) => Promise<[PublicKey, BN]>;
