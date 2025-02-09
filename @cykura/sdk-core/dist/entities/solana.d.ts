import { Currency } from './currency';
import { NativeCurrency } from './nativeCurrency';
import { Token } from './token';
/**
 * Solana is the main usage of a 'native' currency, i.e. for Solana mainnet, testnet and devnet
 */
export declare class Solana extends NativeCurrency {
    protected constructor(chainId: number);
    get wrapped(): Token;
    private static _solanaCache;
    static onChain(chainId: number): Solana;
    equals(other: Currency): boolean;
}
