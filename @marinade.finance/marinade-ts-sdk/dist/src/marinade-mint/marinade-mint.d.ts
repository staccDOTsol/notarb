import { Provider, web3 } from '@project-serum/anchor';
import { MintInfo, Token } from '@solana/spl-token';
export declare class MarinadeMint {
    private readonly anchorProvider;
    readonly address: web3.PublicKey;
    private constructor();
    static build(anchorProvider: Provider, mintAddress: web3.PublicKey): MarinadeMint;
    mintClient: () => Token;
    mintInfo: () => Promise<MintInfo>;
    /**
     * Returns Total supply as a number with decimals
     * @param mintInfoCached optional
     * @returns
     */
    totalSupply(mintInfoCached?: MintInfo): Promise<number>;
    /**
     * @deprecated use totalSupply() instead
     */
    tokenBalance(mintInfoCached?: MintInfo): Promise<number>;
}
