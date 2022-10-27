import { PublicKey, Transaction } from '@solana/web3.js';
import { Wallet } from '../types';
interface CreateAccountParams {
    wallet: Wallet;
    mint: PublicKey;
}
interface CreateAccountResponse {
    transaction: Transaction;
    newAccountPubkey: PublicKey;
}
export declare function createTokenAccountTransaction({ wallet, mint, }: CreateAccountParams): Promise<CreateAccountResponse>;
export {};
