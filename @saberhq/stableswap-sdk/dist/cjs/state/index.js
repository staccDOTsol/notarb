"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSwap = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const fees_js_1 = require("./fees.js");
const layout_js_1 = require("./layout.js");
tslib_1.__exportStar(require("./fees.js"), exports);
tslib_1.__exportStar(require("./layout.js"), exports);
/**
 * Decodes the Swap account.
 * @param data
 * @returns
 */
const decodeSwap = (data) => {
    const stableSwapData = layout_js_1.StableSwapLayout.decode(data);
    if (!stableSwapData.isInitialized) {
        throw new Error(`Invalid token swap state`);
    }
    const adminAccount = new web3_js_1.PublicKey(stableSwapData.adminAccount);
    const adminFeeAccountA = new web3_js_1.PublicKey(stableSwapData.adminFeeAccountA);
    const adminFeeAccountB = new web3_js_1.PublicKey(stableSwapData.adminFeeAccountB);
    const tokenAccountA = new web3_js_1.PublicKey(stableSwapData.tokenAccountA);
    const tokenAccountB = new web3_js_1.PublicKey(stableSwapData.tokenAccountB);
    const poolTokenMint = new web3_js_1.PublicKey(stableSwapData.tokenPool);
    const mintA = new web3_js_1.PublicKey(stableSwapData.mintA);
    const mintB = new web3_js_1.PublicKey(stableSwapData.mintB);
    const initialAmpFactor = token_utils_1.u64.fromBuffer(Buffer.from(stableSwapData.initialAmpFactor));
    const targetAmpFactor = token_utils_1.u64.fromBuffer(Buffer.from(stableSwapData.targetAmpFactor));
    const startRampTimestamp = stableSwapData.startRampTs;
    const stopRampTimestamp = stableSwapData.stopRampTs;
    const fees = (0, fees_js_1.decodeFees)(stableSwapData.fees);
    return {
        isInitialized: !!stableSwapData.isInitialized,
        isPaused: !!stableSwapData.isPaused,
        nonce: stableSwapData.nonce,
        futureAdminDeadline: stableSwapData.futureAdminDeadline,
        futureAdminAccount: new web3_js_1.PublicKey(stableSwapData.futureAdminAccount),
        adminAccount,
        tokenA: {
            adminFeeAccount: adminFeeAccountA,
            reserve: tokenAccountA,
            mint: mintA,
        },
        tokenB: {
            adminFeeAccount: adminFeeAccountB,
            reserve: tokenAccountB,
            mint: mintB,
        },
        poolTokenMint,
        initialAmpFactor,
        targetAmpFactor,
        startRampTimestamp,
        stopRampTimestamp,
        fees,
    };
};
exports.decodeSwap = decodeSwap;
//# sourceMappingURL=index.js.map