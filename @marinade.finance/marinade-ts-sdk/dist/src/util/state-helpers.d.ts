/// <reference types="bn.js" />
import { BN } from '@project-serum/anchor';
import { MarinadeState } from '../marinade-state/marinade-state';
/**
 * Compute a linear fee base on liquidity amount.
 * fee(0) = max fee -> fee(x >= target) = min fee
 *
 * @param {number} lpMinFeeBasisPoints
 * @param {number} lpMaxFeeBasisPoints
 * @param {BN} lpLiquidityTarget
 * @param {BN} lamportsAvailable
 * @param {BN} lamportsToObtain
 */
export declare function unstakeNowFeeBp(lpMinFeeBasisPoints: number, lpMaxFeeBasisPoints: number, lpLiquidityTarget: BN, lamportsAvailable: BN, lamportsToObtain: BN): number;
/**
 * Returns `amount` * `numerator` / `denominator`.
 * BN library proves to not be as accurate as desired.
 * BN was kept to minimize the change. To be replaced entirely by BigNumber.
 * String is the safest way to convert between them
 *
 * @param {BN} amount
 * @param {BN} numerator
 * @param {BN} denominator
 */
export declare function proportionalBN(amount: BN, numerator: BN, denominator: BN): BN;
/**
 * Returns amount of mSol that would result in a stake operation
 *
 * @param {BN} solAmount
 * @param {MarinadeState} marinadeState
 */
export declare function computeMsolAmount(solAmount: BN, marinadeState: MarinadeState): BN;
