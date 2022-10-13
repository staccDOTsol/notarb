import { BN, Program } from "@project-serum/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
import { OptionMarketWithKey } from "../types";
/**
 * Close _size_ option positions by burning the OptionTokens and WriterTokens.
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of OptionTokens and WriterTokens to burn
 * @param optionMarket - The OptionMarket the OptionTokens and WriterTokens belong to
 * @param writerTokenSrc - The SPL Token address that holds the WriterTokens
 * @param optionTokenSrc - The SPL Token address that holds the OptionTokens
 * @param underlyingAssetDest - The SPL Token address destination for the returned underlying assets
 */
export declare const closePositionInstruction: (program: Program<PsyAmerican>, size: BN, optionMarket: OptionMarketWithKey, writerTokenSrc: PublicKey, optionTokenSrc: PublicKey, underlyingAssetDest: PublicKey) => TransactionInstruction;
