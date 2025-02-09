import type { Token } from "@saberhq/token-utils";
import { Fraction, TokenAmount } from "@saberhq/token-utils";
import { default as JSBI } from "jsbi";
import type { IExchangeInfo } from "../entities/exchange.js";
import type { Fees } from "../state/fees.js";
/**
 * Calculates the current virtual price of the exchange.
 * @param exchange
 * @returns
 */
export declare const calculateVirtualPrice: (exchange: IExchangeInfo) => Fraction | null;
/**
 * Calculates the estimated output amount of a swap.
 * @param exchange
 * @param fromAmount
 * @returns
 */
export declare const calculateEstimatedSwapOutputAmount: (exchange: IExchangeInfo, fromAmount: TokenAmount) => {
    fee: TokenAmount;
    outputAmountBeforeFees: TokenAmount;
    outputAmount: TokenAmount;
    lpFee: TokenAmount;
    adminFee: TokenAmount;
};
export interface IWithdrawOneResult {
    withdrawAmount: TokenAmount;
    withdrawAmountBeforeFees: TokenAmount;
    swapFee: TokenAmount;
    withdrawFee: TokenAmount;
    lpSwapFee: TokenAmount;
    lpWithdrawFee: TokenAmount;
    adminSwapFee: TokenAmount;
    adminWithdrawFee: TokenAmount;
}
/**
 * Calculates the amount of tokens withdrawn if only withdrawing one token.
 * @returns
 */
export declare const calculateEstimatedWithdrawOneAmount: ({ exchange, poolTokenAmount, withdrawToken, }: {
    exchange: IExchangeInfo;
    poolTokenAmount: TokenAmount;
    withdrawToken: Token;
}) => IWithdrawOneResult;
/**
 * Compute normalized fee for symmetric/asymmetric deposits/withdraws
 */
export declare const normalizedTradeFee: ({ trade }: Fees, n_coins: JSBI, amount: JSBI) => Fraction;
export declare const calculateEstimatedWithdrawAmount: ({ poolTokenAmount, reserves, fees, lpTotalSupply, }: {
    /**
     * Amount of pool tokens to withdraw
     */
    poolTokenAmount: TokenAmount;
} & Pick<IExchangeInfo, "fees" | "reserves" | "lpTotalSupply">) => {
    withdrawAmounts: readonly [TokenAmount, TokenAmount];
    withdrawAmountsBeforeFees: readonly [TokenAmount, TokenAmount];
    fees: readonly [TokenAmount, TokenAmount];
};
/**
 * Calculate the estimated amount of LP tokens minted after a deposit.
 * @param exchange
 * @param depositAmountA
 * @param depositAmountB
 * @returns
 */
export declare const calculateEstimatedMintAmount: (exchange: IExchangeInfo, depositAmountA: JSBI, depositAmountB: JSBI) => {
    mintAmountBeforeFees: TokenAmount;
    mintAmount: TokenAmount;
    fees: TokenAmount;
};
//# sourceMappingURL=amounts.d.ts.map