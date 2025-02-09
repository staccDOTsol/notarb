"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNewFeesIXLayout = exports.CommitNewAdminIXLayout = exports.ApplyNewAdminIXLayout = exports.SetFeeAccountIXLayout = exports.UnpauseIXLayout = exports.PauseIXLayout = exports.StopRampAIXLayout = exports.RampAIXLayout = exports.WithdrawOneIXLayout = exports.WithdrawIXLayout = exports.DepositIXLayout = exports.SwapIXLayout = exports.InitializeSwapIXLayout = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const BufferLayout = tslib_1.__importStar(require("@solana/buffer-layout"));
const layout_js_1 = require("../state/layout.js");
exports.InitializeSwapIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.u8("nonce"),
    (0, token_utils_1.Uint64Layout)("ampFactor"),
    layout_js_1.FeesLayout,
]);
exports.SwapIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    (0, token_utils_1.Uint64Layout)("amountIn"),
    (0, token_utils_1.Uint64Layout)("minimumAmountOut"),
]);
exports.DepositIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    (0, token_utils_1.Uint64Layout)("tokenAmountA"),
    (0, token_utils_1.Uint64Layout)("tokenAmountB"),
    (0, token_utils_1.Uint64Layout)("minimumPoolTokenAmount"),
]);
exports.WithdrawIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    (0, token_utils_1.Uint64Layout)("poolTokenAmount"),
    (0, token_utils_1.Uint64Layout)("minimumTokenA"),
    (0, token_utils_1.Uint64Layout)("minimumTokenB"),
]);
exports.WithdrawOneIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    (0, token_utils_1.Uint64Layout)("poolTokenAmount"),
    (0, token_utils_1.Uint64Layout)("minimumTokenAmount"),
]);
exports.RampAIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    (0, token_utils_1.Uint64Layout)("targetAmp"),
    BufferLayout.ns64("stopRampTS"),
]);
exports.StopRampAIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.PauseIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.UnpauseIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.SetFeeAccountIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.ApplyNewAdminIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.CommitNewAdminIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
exports.SetNewFeesIXLayout = BufferLayout.struct([BufferLayout.u8("instruction"), layout_js_1.FeesLayout]);
//# sourceMappingURL=layouts.js.map