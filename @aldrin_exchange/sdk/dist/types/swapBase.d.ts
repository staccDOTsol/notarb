import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { TokenClient, TokenMintInfo, TokenSwapGetPriceParams } from '.';
import { Wallet } from './types';
export declare abstract class SwapBase {
    protected tokenClient: TokenClient;
    protected connection: Connection;
    protected mintInfos: Map<string, TokenMintInfo>;
    protected walletTokens: Map<string, {
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    }[]>;
    constructor(tokenClient: TokenClient, connection: Connection);
    abstract getPrice(params: TokenSwapGetPriceParams): Promise<number>;
    protected getMintInfo(mint: PublicKey): Promise<TokenMintInfo>;
    protected getWalletTokens(wallet: Wallet): Promise<{
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    }[]>;
}
