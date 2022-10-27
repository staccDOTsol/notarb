import { BN, Program } from "@project-serum/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
import { OptionMarketWithKey } from "../types";
/**
 * After a market has expired, burn WriterTokens to get the underlying assets back from
 * the contract(s).
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param writerTokenSrc - The SPL Token address holding the WriterTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 */
export declare const closePostExpirationInstruction: (program: Program<PsyAmerican>, size: BN, optionMarket: OptionMarketWithKey, writerTokenSrc: PublicKey, underlyingAssetDest: PublicKey) => TransactionInstruction;
