import { Program } from "@project-serum/anchor";
import { Market } from "@project-serum/serum";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create a TransactionInstruction for the settleFunds instruction
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param baseWallet - The wallet address that contains the user's base asset tokens
 * @param quoteWallet - The wallet address that contains the user's quote asset tokens
 * @param serumReferralKey - The Psy American referral address for the quote asset
 * @param openOrdersKey - The open orders keys
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
export declare const settleFundsInstruction: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarketKey: PublicKey, baseWallet: PublicKey, quoteWallet: PublicKey, serumReferralKey: PublicKey, openOrdersKey: PublicKey, marketAuthorityBump?: number | undefined) => Promise<import("@solana/web3.js").TransactionInstruction>;
/**
 * Create a TransactionInstruction for the settleFunds instruction
 *
 * Note: this API abstracts the complexity of the serumReferralKey away.
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarket - The Serum market
 * @param baseWallet - The wallet address that contains the user's base asset tokens
 * @param quoteWallet - The wallet address that contains the user's quote asset tokens
 * @param openOrdersKey - The open orders keys
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
export declare const settleMarketFundsInstruction: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, dexProgramId: PublicKey, serumMarket: Market, baseWallet: PublicKey, quoteWallet: PublicKey, openOrdersKey: PublicKey) => Promise<import("@solana/web3.js").TransactionInstruction>;
