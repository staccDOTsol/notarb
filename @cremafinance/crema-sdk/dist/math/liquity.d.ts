import Decimal from "decimal.js";
import type { Tick } from "../state";
/**
 * Calculate liquity and another token amount when current tick is in [tickLower, tickUpper]
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param currentSqrtPrice The current sqrt price
 * @param desiredAmountSrc The src token amount
 * @param direct 0(desiredAmountSrc is TokenA), 1(desiredAmountSrc is TokenB)
 * @returns The liquity and dst token amount
 */
export declare function calculateLiquity(tickLower: number, tickUpper: number, desiredAmountSrc: Decimal, currentSqrtPrice: Decimal, direct: number): {
    desiredAmountDst: Decimal;
    deltaLiquity: Decimal;
};
/**
 * Calculate amount out of token A and token B by liquity
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param currentSqrtPrice The current sqrt price
 * @param liquity The liquity amount
 * @returns The amount of token A and token B
 */
export declare function calculateTokenAmount(tickLower: number, tickUpper: number, liquity: Decimal, currentSqrtPrice: Decimal): {
    amountA: Decimal;
    amountB: Decimal;
};
/**
 * Calculate liquity when current tick is less than tickLower
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param desiredAmountA The desired amount of token A
 * @returns the liquity
 */
export declare function calculateLiquityOnlyA(tickLower: number, tickUpper: number, desiredAmountA: Decimal): Decimal;
/**
 * Calculate liquity when current tick is less than tickLower
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param desiredAmountA The desired amount of token B
 * @returns The liquity
 */
export declare function calculateLiquityOnlyB(tickLower: number, tickUpper: number, desiredAmountB: Decimal): Decimal;
export interface Liquity {
    lowerTick: number;
    upperTick: number;
    amount: Decimal;
}
/**
 * Calculate the liquitys table
 * @param ticks The tick array of token swap
 * @returns The min, max of liquity, and liquitys array
 */
export declare function calculateLiquityTable(ticks: Tick[]): {
    maxLiquity: Decimal;
    minLiquity: Decimal;
    liquitys: Liquity[];
};
/**
 * Calculate max tokenAmount with sliding point.
 * @param liquity.
 * @param current sqrt price.
 * @param sliding point.
 */
export declare function calculateSlidTokenAmount(tickLower: number, tickUpper: number, liquity: Decimal, currentSqrtPrice: Decimal, slid: Decimal): {
    maxAmountA: Decimal;
    minAmountA: Decimal;
    maxAmountB: Decimal;
    minAmountB: Decimal;
    amountA: Decimal;
    amountB: Decimal;
};
