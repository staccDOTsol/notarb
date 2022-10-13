/// <reference types="bn.js" />
import { BN } from '@project-serum/anchor';
export declare function withDecimalPoint(bn: BN, decimals: number): string;
export declare function tokenBalanceToNumber(bn: BN, decimals: number): number;
export declare function lamportsToSol(bn: BN): number;
export declare function solToLamports(amountSol: number): BN;
