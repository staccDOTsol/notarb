import { Program } from "@project-serum/anchor";
import { Order } from "@project-serum/serum/lib/market";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create a TransactionInstruction for canceling a specific _order_
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @param order - The Serum Order to cancel
 * @param marketAuthorityBump - Optional: bump seed for the Serum market
 * @returns
 */
export declare const cancelOrderInstructionV2: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, order: Order, marketAuthorityBump?: number | undefined) => Promise<TransactionInstruction>;
/**
 * Generate a `TransactionInstruction` for canceling an open order by the set clientId
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @param order - The Serum Order to cancel
 * @param marketAuthorityBump - Optional: bump seed for the Serum market
 * @returns
 */
export declare const cancelOrderByClientId: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, order: Order, marketAuthorityBump?: number | undefined) => Promise<TransactionInstruction>;
/**
 * Create an array of TransactionInstructions to cancel all of the wallet's orders for a given
 * OptionMarket and SerumMarket.
 *
 * NOTE: Current implementation does not account for Transaction packet size limitations. It
 * is on the client to slice the instructions to be within the limits.
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @returns
 */
export declare const cancelAllOpenOrders: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey) => Promise<TransactionInstruction[]>;
