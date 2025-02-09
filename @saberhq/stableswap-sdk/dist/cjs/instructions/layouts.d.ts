import * as BufferLayout from "@solana/buffer-layout";
import type { RawFees } from "../state/layout.js";
import type { AdminInstruction } from "./admin.js";
import type { StableSwapInstruction } from "./swap.js";
export declare const InitializeSwapIXLayout: BufferLayout.Structure<{
    instruction: StableSwapInstruction.INITIALIZE;
    nonce: number;
    ampFactor: Uint8Array;
    fees: RawFees;
}>;
export declare const SwapIXLayout: BufferLayout.Structure<{
    instruction: StableSwapInstruction.SWAP;
    amountIn: Uint8Array;
    minimumAmountOut: Uint8Array;
}>;
export declare const DepositIXLayout: BufferLayout.Structure<{
    instruction: StableSwapInstruction.DEPOSIT;
    tokenAmountA: Uint8Array;
    tokenAmountB: Uint8Array;
    minimumPoolTokenAmount: Uint8Array;
}>;
export declare const WithdrawIXLayout: BufferLayout.Structure<{
    instruction: StableSwapInstruction.WITHDRAW;
    poolTokenAmount: Uint8Array;
    minimumTokenA: Uint8Array;
    minimumTokenB: Uint8Array;
}>;
export declare const WithdrawOneIXLayout: BufferLayout.Structure<{
    instruction: StableSwapInstruction.WITHDRAW_ONE;
    poolTokenAmount: Uint8Array;
    minimumTokenAmount: Uint8Array;
}>;
export declare const RampAIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.RAMP_A;
    targetAmp: Uint8Array;
    stopRampTS: number;
}>;
export declare const StopRampAIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.STOP_RAMP_A;
}>;
export declare const PauseIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.PAUSE;
}>;
export declare const UnpauseIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.UNPAUSE;
}>;
export declare const SetFeeAccountIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.SET_FEE_ACCOUNT;
}>;
export declare const ApplyNewAdminIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.APPLY_NEW_ADMIN;
}>;
export declare const CommitNewAdminIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.COMMIT_NEW_ADMIN;
}>;
export declare const SetNewFeesIXLayout: BufferLayout.Structure<{
    instruction: AdminInstruction.SET_NEW_FEES;
    fees: RawFees;
}>;
//# sourceMappingURL=layouts.d.ts.map