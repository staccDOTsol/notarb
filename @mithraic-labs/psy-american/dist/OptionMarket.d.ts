import { Program } from "@project-serum/anchor";
import { PsyAmerican } from "./psyAmericanTypes";
import { OptionMarketWithKey } from "./types";
/**
 * Load all OptionMarkets owned by the given program from the blockchain.
 *
 * @param program - Anchor Psy American program
 * @returns
 */
export declare const getAllOptionAccounts: (program: Program<PsyAmerican>) => Promise<OptionMarketWithKey[]>;
