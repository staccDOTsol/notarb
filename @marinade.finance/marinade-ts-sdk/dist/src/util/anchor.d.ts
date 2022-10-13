/// <reference types="bn.js" />
import { BN, Provider, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { AccountInfo, Token } from '@solana/spl-token';
import { ParsedStakeAccountInfo, ProcessedEpochInfo } from './anchor.types';
export declare const SYSTEM_PROGRAM_ID: web3.PublicKey;
export declare const STAKE_PROGRAM_ID: web3.PublicKey;
export declare const U64_MAX: BN;
export declare function web3PubKeyOrNull(value: ConstructorParameters<typeof web3.PublicKey>[0] | null): web3.PublicKey | null;
export declare function BNOrNull(value: ConstructorParameters<typeof BN>[0] | null): BN | null;
export declare function getMintClient(anchorProvider: Provider, mintAddress: web3.PublicKey): Token;
export declare function getAssociatedTokenAccountAddress(mint: web3.PublicKey, owner: web3.PublicKey): Promise<web3.PublicKey>;
export declare function getTokenAccountInfo(mintClient: Token, publicKey: web3.PublicKey): Promise<AccountInfo>;
export declare function getOrCreateAssociatedTokenAccount(anchorProvider: anchor.Provider, mintAddress: web3.PublicKey, ownerAddress: web3.PublicKey, payerAddress?: web3.PublicKey): Promise<{
    associatedTokenAccountAddress: web3.PublicKey;
    createAssociateTokenInstruction: web3.TransactionInstruction | null;
}>;
export declare function getParsedStakeAccountInfo(anchorProvider: anchor.Provider, stakeAccountAddress: web3.PublicKey): Promise<ParsedStakeAccountInfo>;
export declare function getEpochInfo(connection: web3.Connection): Promise<ProcessedEpochInfo>;
