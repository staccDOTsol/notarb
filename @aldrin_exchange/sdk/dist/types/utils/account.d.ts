import { PublicKey } from '@solana/web3.js';
export declare function account(pubkey: PublicKey, isWritable?: boolean, isSigner?: boolean): {
    pubkey: PublicKey;
    isWritable: boolean;
    isSigner: boolean;
};
