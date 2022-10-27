import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Wallet } from '../types';
interface CreateInstructionParams {
    wallet: Wallet;
    size: number;
    connection: Connection;
    programId: PublicKey;
    newAccountPubkey: PublicKey;
}
export declare const createAccountInstruction: (params: CreateInstructionParams) => Promise<TransactionInstruction>;
export {};
