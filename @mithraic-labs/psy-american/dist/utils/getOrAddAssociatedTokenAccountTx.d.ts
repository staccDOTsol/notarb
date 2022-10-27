import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";
/**
 * Returns a TransactionInstruction for creating the associated token account
 * if one deos not exist.
 *
 * @param associatedAddress - The associated token account address
 * @param mintKey - The SPL token mint address
 * @param provider - The Anchor provider that has the wallet
 * @param owner - The user's address that owns the associated token account
 * @returns
 */
export declare const getOrAddAssociatedTokenAccountTx: (associatedAddress: PublicKey, mintKey: PublicKey, provider: Provider, owner?: PublicKey) => Promise<TransactionInstruction | null>;
