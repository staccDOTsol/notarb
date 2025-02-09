import { Decimal } from "decimal.js";
import type { Tick } from "../state";
export declare const MAX_TICK = 443632;
export declare const MIN_TICK: number;
export declare const PIECES: Decimal;
export declare const PRICE_OFFSET: Decimal;
export declare const MAX_PRICE: Decimal;
export declare const MIN_PRICE: Decimal;
export declare const MAX_SQRT_PRICE: Decimal;
export declare const MIN_SQRT_PRICE: Decimal;
/**
 * Get the tick by sqrt price
 *
 * @param sqrtPrice the sqrt price
  let afterSqrtPrice = liquity.div(amountIn.add(liquity.div(upperSqrtPrice)));
 */
export declare function sqrtPrice2Tick(sqrtPrice: Decimal): number;
/**
 * Get the sqrt price by tick
 * @param tick the tick
 * @returns the sqrt price
 */
export declare function tick2SqrtPrice(tick: number): Decimal;
/**
 * Get the tick by price
 * @param price the price
 * @returns the tick
 */
export declare function price2Tick(price: Decimal): number;
/**
 * Get the price by tick
 * @param tick the tick
 * @returns the price
 */
export declare function tick2Price(tick: number): Decimal;
/**
 * Get the nearest valid tick
 * @deprecated please use {@link getNearestTickBySqrtPrice Or getNearestTickByPrice} instead
 * @param sqrtPrice the sqrt price
 * @param tickSpace the tick space
 * @param isLower is the tick is lowwer
 * @returns the tick or null
 */
export declare function getNearestTick(sqrtPrice: Decimal, tickSpace: number): number | null;
/**
 * Get the nearest valid tick for positions
 * @param sqrtPrice the sqrt price
 * @param tickSpace the tick space
 * @returns the tick or null(if the tick space <= 0)
 */
export declare function getNearestTickBySqrtPrice(sqrtPrice: Decimal, tickSpace: number): number;
/**
 * Get the nearest valid tick for positions
 * @param price the price
 * @param tickSpace the tick space
 * @returns the tick or null(if the tick space <= 0)
 */
export declare function getNearestTickByPrice(price: Decimal, tickSpace: number): number;
/**
 *
 * @param ticks The tick array of token swap
 * @param currentSqrtPrice The current sqrt price of token swap
 * @param fee The fee rate of token swap
 * @param currentLiquity The current liquity of token swap
 * @param amountIn The amount in of token A
 * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
 */
export declare function calculateSwapA2B(ticks: Tick[], currentSqrtPrice: Decimal, fee: Decimal, currentLiquity: Decimal, amountIn: Decimal): {
    amountOut: Decimal;
    amountUsed: Decimal;
    feeUsed: Decimal;
    afterPrice: Decimal;
    afterLiquity: Decimal;
};
/**
 *
 * @param ticks The tick array of token swap
 * @param currentSqrtPrice The current sqrt price of token swap
 * @param fee The fee rate of token swap
 * @param currentLiquity The current liquity of token swap
 * @param amountIn The amount in of token B
 * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
 */
export declare function calculateSwapB2A(ticks: Tick[], currentSqrtPrice: Decimal, fee: Decimal, currentLiquity: Decimal, amountIn: Decimal): {
    amountOut: Decimal;
    amountUsed: Decimal;
    feeUsed: Decimal;
    afterPrice: Decimal;
    afterLiquity: Decimal;
};
/** @internal */
export declare function maxAmountA(lowerSqrtPrice: Decimal, upperSqrtPrice: Decimal, liquity: Decimal): Decimal;
/** @internal */
export declare function maxAmountB(lowerSqrtPrice: Decimal, upperSqrtPrice: Decimal, liquity: Decimal): Decimal;
/** @internal */
export declare function swapA2B(upperSqrtPrice: Decimal, liquity: Decimal, amountIn: Decimal): {
    amountOut: Decimal;
    afterSqrtPrice: Decimal;
};
/** @internal */
export declare function swapB2A(lowerSqrtPrice: Decimal, liquity: Decimal, amountIn: Decimal): {
    amountOut: Decimal;
    afterSqrtPrice: Decimal;
};
