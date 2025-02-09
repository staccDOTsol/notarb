import { default as JSBI } from "jsbi";
/**
 * Compute the StableSwap invariant
 * @param ampFactor Amplification coefficient (A)
 * @param amountA Swap balance of token A
 * @param amountB Swap balance of token B
 * Reference: https://github.com/curvefi/curve-contract/blob/7116b4a261580813ef057887c5009e22473ddb7d/tests/simulation.py#L31
 */
export declare const computeD: (ampFactor: JSBI, amountA: JSBI, amountB: JSBI) => JSBI;
/**
 * Compute Y amount in respect to X on the StableSwap curve
 * @param ampFactor Amplification coefficient (A)
 * @param x The quantity of underlying asset
 * @param d StableSwap invariant
 * Reference: https://github.com/curvefi/curve-contract/blob/7116b4a261580813ef057887c5009e22473ddb7d/tests/simulation.py#L55
 */
export declare const computeY: (ampFactor: JSBI, x: JSBI, d: JSBI) => JSBI;
//# sourceMappingURL=curve.d.ts.map