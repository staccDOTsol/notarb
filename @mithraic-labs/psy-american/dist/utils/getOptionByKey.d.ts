import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
import { OptionMarketWithKey } from "../types";
export declare const getOptionByKey: (program: Program<PsyAmerican>, key: PublicKey) => Promise<OptionMarketWithKey | null>;
