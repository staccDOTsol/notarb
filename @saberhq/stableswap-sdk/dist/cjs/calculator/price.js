"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSwapPrice = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const index_js_1 = require("../index.js");
/**
 * Gets the price of the second token in the swap, i.e. "Token 1", with respect to "Token 0".
 *
 * To get the price of "Token 0", use `.invert()` on the result of this function.
 * @returns
 */
const calculateSwapPrice = (exchangeInfo) => {
    const reserve0 = exchangeInfo.reserves[0].amount;
    const reserve1 = exchangeInfo.reserves[1].amount;
    // We try to get at least 4 decimal points of precision here
    // Otherwise, we attempt to swap 1% of total supply of the pool
    // or at most, $1
    const inputAmountNum = Math.max(10000, Math.min(10 ** reserve0.token.decimals, Math.floor(parseInt(reserve0.toU64().div(new bn_js_1.default(100)).toString()))));
    const inputAmount = new token_utils_1.TokenAmount(reserve0.token, inputAmountNum);
    const outputAmount = (0, index_js_1.calculateEstimatedSwapOutputAmount)(exchangeInfo, inputAmount);
    const frac = outputAmount.outputAmountBeforeFees.asFraction.divide(inputAmount.asFraction);
    return new token_utils_1.Price(reserve0.token, reserve1.token, frac.denominator, frac.numerator);
};
exports.calculateSwapPrice = calculateSwapPrice;
//# sourceMappingURL=price.js.map