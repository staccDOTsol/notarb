/// <reference types="bn.js" />
import { BN, Provider, web3 } from '@project-serum/anchor';
export declare const LAMPORTS_AIRDROP_CAP: BN;
export declare const MARINADE_PROGRAM_REFERRAL_ID: web3.PublicKey;
export declare const SDK_USER: web3.Keypair;
export declare const PROVIDER_URL = "https://api.devnet.solana.com";
export declare const CONNECTION: web3.Connection;
export declare const PROVIDER: Provider;
export declare const REFERRAL_CODE: web3.PublicKey;
export declare const PARTNER_NAME = "REF_TEST";
export declare const airdrop: (to: web3.PublicKey, amountLamports: number) => Promise<void>;
export declare const getBalanceLamports: (account: web3.PublicKey) => Promise<number>;
export declare const provideMinimumLamportsBalance: (account: web3.PublicKey, minimumLamportsBalance: BN) => Promise<void>;
