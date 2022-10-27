import { Connection, PublicKey } from '@solana/web3.js';
import { TokenAccountInfo } from '.';
import { CreateAccountParams, CreateAccountResponse, TokenMintInfo } from './types';
/**
 * SPL Token wrapper
 */
export declare class TokenClient {
    private connection;
    constructor(connection: Connection);
    getMintInfo(mint: PublicKey): Promise<TokenMintInfo>;
    getTokenAccount(address: PublicKey): Promise<TokenAccountInfo>;
    /**
     *
     * Generate new account address and create transaction
     * @returns account public key, transaction
     *
     */
    static createTokenAccountTransaction(params: CreateAccountParams): Promise<CreateAccountResponse>;
}
