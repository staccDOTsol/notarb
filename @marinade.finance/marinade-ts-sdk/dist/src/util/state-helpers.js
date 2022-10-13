"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeMsolAmount = exports.proportionalBN = exports.unstakeNowFeeBp = void 0;
const anchor_1 = require("@project-serum/anchor");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
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
function unstakeNowFeeBp(lpMinFeeBasisPoints, lpMaxFeeBasisPoints, lpLiquidityTarget, lamportsAvailable, lamportsToObtain) {
    // if trying to get more than existing
    if (lamportsToObtain.gte(lamportsAvailable)) {
        return lpMaxFeeBasisPoints;
    }
    // result after operation
    const lamportsAfter = lamportsAvailable.sub(lamportsToObtain);
    // if GTE target => min fee
    if (lamportsAfter.gte(lpLiquidityTarget)) {
        return lpMinFeeBasisPoints;
    }
    else {
        const delta = lpMaxFeeBasisPoints - lpMinFeeBasisPoints;
        return lpMaxFeeBasisPoints
            - proportionalBN(new anchor_1.BN(delta), lamportsAfter, lpLiquidityTarget).toNumber();
    }
}
exports.unstakeNowFeeBp = unstakeNowFeeBp;
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
function proportionalBN(amount, numerator, denominator) {
    if (denominator.isZero()) {
        return amount;
    }
    const result = new bignumber_js_1.default(amount.toString()).multipliedBy(new bignumber_js_1.default(numerator.toString())).dividedBy(new bignumber_js_1.default(denominator.toString()));
    return new anchor_1.BN(result.decimalPlaces(0, bignumber_js_1.default.ROUND_FLOOR).toString());
}
exports.proportionalBN = proportionalBN;
/**
 * Returns amount of mSol that would result in a stake operation
 *
 * @param {BN} solAmount
 * @param {MarinadeState} marinadeState
 */
function computeMsolAmount(solAmount, marinadeState) {
    const total_cooling_down = marinadeState.state.stakeSystem.delayedUnstakeCoolingDown.add(marinadeState.state.emergencyCoolingDown);
    const total_lamports_under_control = marinadeState.state.validatorSystem.totalActiveBalance.add(total_cooling_down).add(marinadeState.state.availableReserveBalance);
    const total_virtual_staked_lamports = total_lamports_under_control.sub(marinadeState.state.circulatingTicketBalance);
    return proportionalBN(solAmount, marinadeState.state.msolSupply, total_virtual_staked_lamports);
}
exports.computeMsolAmount = computeMsolAmount;
//# sourceMappingURL=state-helpers.js.map