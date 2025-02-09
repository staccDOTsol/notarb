import { Price } from "@saberhq/token-utils";
import type { IExchangeInfo } from "../index.js";
/**
 * Gets the price of the second token in the swap, i.e. "Token 1", with respect to "Token 0".
 *
 * To get the price of "Token 0", use `.invert()` on the result of this function.
 * @returns
 */
export declare const calculateSwapPrice: (exchangeInfo: IExchangeInfo) => Price;
//# sourceMappingURL=price.d.ts.map