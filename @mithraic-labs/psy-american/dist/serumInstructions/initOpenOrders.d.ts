import { Program } from "@project-serum/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create a proxied InitOpenOrdersInstruction
 *
 * @param program - Anchor Psy American program
 * @param owner - The user's wallet address
 * @param optionMarketKey - The OptionMarket address key
 * @param dexProgramId - Serum DEX id
 * @param serumMarketKey - The Serum market address
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
export declare const initOpenOrdersInstruction: (program: Program<PsyAmerican>, owner: PublicKey, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, marketAuthorityBump?: number | undefined) => Promise<{
    ix: TransactionInstruction;
}>;
