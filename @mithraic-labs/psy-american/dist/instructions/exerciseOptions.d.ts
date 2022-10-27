import { BN, Program } from "@project-serum/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
import { OptionMarketWithKey } from "../types";
/**
 * Exercise OptionTokens you're holding
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param exerciserOptionTokenSrc - The SPL Token address holding the OptionTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 * @param quoteAssetSrc - The SPL Token address holding the quote asset used to exercise
 * @param opts
 * @returns
 */
export declare const exerciseOptionsInstruction: (program: Program<PsyAmerican>, size: BN, optionMarket: OptionMarketWithKey, exerciserOptionTokenSrc: PublicKey, underlyingAssetDest: PublicKey, quoteAssetSrc: PublicKey, opts?: {
    /** The authority account that owns the options */
    optionAuthority?: PublicKey;
}) => Promise<TransactionInstruction>;
/**
 * Exercise OptionTokens you're holding without fees!
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param exerciserOptionTokenSrc - The SPL Token address holding the OptionTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 * @param quoteAssetSrc - The SPL Token address holding the quote asset used to exercise
 * @param opts
 * @returns
 */
export declare const exerciseOptionsV2Instruction: (program: Program<PsyAmerican>, size: BN, optionMarket: OptionMarketWithKey, exerciserOptionTokenSrc: PublicKey, underlyingAssetDest: PublicKey, quoteAssetSrc: PublicKey, opts?: {
    /** The authority account that owns the options */
    optionAuthority?: PublicKey;
}) => TransactionInstruction;
