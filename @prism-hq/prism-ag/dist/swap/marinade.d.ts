/// <reference types="@lifinity/sdk/node_modules/@solana/web3.js" />
import { Program } from "@project-serum/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import { PrismAg } from "./idl";
export declare function marinadeSwap(user: PublicKey, program: Program<PrismAg>, route: any, fromTokenAccount: PublicKey, toTokenAccount: PublicKey, fees: any, hostFees: number, preTransaction: Transaction, postTransaction: Transaction, mainSigners: Array<any>, useT?: any, disableFees?: any): Promise<import("@solana/web3.js").TransactionInstruction>;
