import type { Connection, Signer, Transaction, TransactionSignature } from "@solana/web3.js";
/**
 * Send and confirm trnasaction with default option
 * @param conn The connection to use
 * @param transaction The transaction
 * @param signers The signers array
 * @returns
 */
export declare function sendAndConfirmTransaction(conn: Connection, transaction: Transaction, ...signers: Signer[]): Promise<TransactionSignature>;
