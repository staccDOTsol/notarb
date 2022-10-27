import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { OptionMarketWithKey } from "../types";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Execute a transaction to mint _size_ options
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarketWithKey} optionMarket - The OptionMarket data
 */
export declare const mintOptionsTx: (program: anchor.Program<PsyAmerican>, minterOptionAcct: PublicKey, minterWriterAcct: PublicKey, minterUnderlyingAccount: PublicKey, size: anchor.BN, optionMarket: OptionMarketWithKey) => Promise<{
    tx: string;
}>;
/**
 * Create a TransactionInstruction for minting _size_ option contracts
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarket} optionMarket - The OptionMarket data
 */
export declare const mintOptionInstruction: (program: anchor.Program<PsyAmerican>, minterOptionAcct: PublicKey, minterWriterAcct: PublicKey, minterUnderlyingAccount: PublicKey, size: anchor.BN, optionMarket: OptionMarketWithKey) => Promise<{
    ix: anchor.web3.TransactionInstruction;
    signers: anchor.web3.Signer[];
}>;
/**
 * Create a TransactionInstruction for minting _size_ option contracts using V2 instruction
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarket} optionMarket - The OptionMarket data
 */
export declare const mintOptionV2Instruction: (program: anchor.Program<PsyAmerican>, minterOptionAcct: PublicKey, minterWriterAcct: PublicKey, minterUnderlyingAccount: PublicKey, size: anchor.BN, optionMarket: OptionMarketWithKey) => Promise<{
    ix: anchor.web3.TransactionInstruction;
    signers: anchor.web3.Signer[];
}>;
