import { Connection, Signer, Transaction } from '@solana/web3.js';
import { Wallet } from '../types';
export interface SendTransactionParams {
    transaction: Transaction;
    wallet: Wallet;
    connection: Connection;
    timeout?: number;
    partialSigners?: Signer[];
}
export declare function sendTransaction({ transaction, wallet, connection, partialSigners, }: SendTransactionParams): Promise<string>;
