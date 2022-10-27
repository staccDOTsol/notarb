import { Program } from "@project-serum/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import { PrismAg } from "./idl";
export declare function gooseFxSwap(user: PublicKey, program: Program<PrismAg>, route: any, fromTokenAccount: PublicKey, toTokenAccount: PublicKey, fees: any, hostFees: number, preTransaction: Transaction, useT?: any, disableFees?: any): Promise<null>;
