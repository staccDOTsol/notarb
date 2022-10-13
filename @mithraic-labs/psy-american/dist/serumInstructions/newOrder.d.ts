import { Program } from "@project-serum/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import { OrderParamsWithFeeRate } from "../types";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create a new order proxied through the Psy American Protocol
 *
 * @param program - Anchor Psy American program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param orderArguments - The Serum OrderParams
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
export declare const newOrderInstruction: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, orderArguments: OrderParamsWithFeeRate<PublicKey>, marketAuthorityBump?: number | undefined) => Promise<{
    openOrdersKey: PublicKey;
    tx: Transaction;
}>;
