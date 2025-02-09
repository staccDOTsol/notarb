/// <reference types="node" />
import type { AccountInfo } from "@solana/spl-token";
import type { AccountInfo as BaseAccountInfo, Connection, TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
/**
 * Get a authority token account address
 * @param tokenMint The mint of token
 * @param owner The owner associated token address
 * @returns
 */
export declare function getAssociatedTokenAddress(tokenMint: PublicKey, owner: PublicKey): Promise<PublicKey>;
/**
 * Get a create associated token account instruction
 * @param tokenMint The mint of token
 * @param owner The owner associated token address
 * @param authority The authority token account address
 * @param payer The pays for transaction
 * @returns
 */
export declare function createAssociatedTokenAccountInstruction(tokenMint: PublicKey, associatedAccount: PublicKey, owner: PublicKey, payer: PublicKey): TransactionInstruction;
/**
 * Get the token account info by address
 * @param conn The connection to use
 * @param address The token account address
 * @returns
 */
export declare function getTokenAccount(conn: Connection, address: PublicKey): Promise<AccountInfo>;
/**
 * Get the token accounts by owner
 * @param conn The connection to use
 * @param owner The owner address
 * @returns The token accounts
 */
export declare function getTokenAccounts(conn: Connection, owner: PublicKey): Promise<AccountInfo[]>;
export declare function parseTokenAccountData(data: Buffer): AccountInfo;
export declare function parseTokenAccount(account: BaseAccountInfo<Buffer>): AccountInfo;
