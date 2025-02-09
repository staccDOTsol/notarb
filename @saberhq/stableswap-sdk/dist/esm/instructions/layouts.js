import { Uint64Layout } from "@saberhq/token-utils";
import * as BufferLayout from "@solana/buffer-layout";
import { FeesLayout } from "../state/layout.js";
export const InitializeSwapIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    BufferLayout.u8("nonce"),
    Uint64Layout("ampFactor"),
    FeesLayout,
]);
export const SwapIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Uint64Layout("amountIn"),
    Uint64Layout("minimumAmountOut"),
]);
export const DepositIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Uint64Layout("tokenAmountA"),
    Uint64Layout("tokenAmountB"),
    Uint64Layout("minimumPoolTokenAmount"),
]);
export const WithdrawIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Uint64Layout("poolTokenAmount"),
    Uint64Layout("minimumTokenA"),
    Uint64Layout("minimumTokenB"),
]);
export const WithdrawOneIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Uint64Layout("poolTokenAmount"),
    Uint64Layout("minimumTokenAmount"),
]);
export const RampAIXLayout = BufferLayout.struct([
    BufferLayout.u8("instruction"),
    Uint64Layout("targetAmp"),
    BufferLayout.ns64("stopRampTS"),
]);
export const StopRampAIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const PauseIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const UnpauseIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const SetFeeAccountIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const ApplyNewAdminIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const CommitNewAdminIXLayout = BufferLayout.struct([BufferLayout.u8("instruction")]);
export const SetNewFeesIXLayout = BufferLayout.struct([BufferLayout.u8("instruction"), FeesLayout]);
//# sourceMappingURL=layouts.js.map