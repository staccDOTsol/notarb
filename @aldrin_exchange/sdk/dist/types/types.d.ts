import { PublicKey, Transaction } from '@solana/web3.js';
export interface Wallet {
    signTransaction(tx: Transaction): Promise<Transaction>;
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
    publicKey: PublicKey;
}
export interface TokenSwapClaimFarmedParams {
    wallet?: Wallet;
    poolMint: PublicKey;
}
export interface WithReferral {
    referralAccount: PublicKey;
    referralPercent: number;
    createTokenAccounts?: boolean;
}
export declare type PoolVersion = 1 | 2;
export declare enum SIDE {
    BID = 1,
    ASK = -1
}
