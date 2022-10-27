import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create instruction to close OpenOrders account.
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param openOrdersKey - The open orders key for the account we're closing
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @param solWallet - OPTIONAL: pass in a different address to send the unlocked Sol to
 * @returns
 */
export declare const closeOpenOrdersInstruction: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, openOrdersKey: PublicKey, marketAuthorityBump: number | undefined, solWallet?: PublicKey) => Promise<import("@solana/web3.js").TransactionInstruction>;
