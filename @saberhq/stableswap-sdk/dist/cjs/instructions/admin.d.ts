import type { u64 } from "@saberhq/token-utils";
import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { Fees } from "../state/fees.js";
import type { StableSwapState } from "../state/index.js";
import type { StableSwapConfig } from "./common.js";
/**
 * Admin instruction.
 */
export declare enum AdminInstruction {
    RAMP_A = 100,
    STOP_RAMP_A = 101,
    PAUSE = 102,
    UNPAUSE = 103,
    SET_FEE_ACCOUNT = 104,
    APPLY_NEW_ADMIN = 105,
    COMMIT_NEW_ADMIN = 106,
    SET_NEW_FEES = 107
}
/**
 * Creates a ramp A instruction.
 */
export declare const createAdminRampAInstruction: ({ config, state: { adminAccount }, targetAmp, stopRamp, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
    targetAmp: u64;
    stopRamp: Date;
}) => TransactionInstruction;
/**
 * Creates a stop ramp A instruction.
 */
export declare const createAdminStopRampAInstruction: ({ config, state: { adminAccount }, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
}) => TransactionInstruction;
/**
 * Creates a pause instruction.
 */
export declare const createAdminPauseInstruction: ({ config, state: { adminAccount }, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
}) => TransactionInstruction;
/**
 * Creates an unpause instruction.
 */
export declare const createAdminUnpauseInstruction: ({ config, state: { adminAccount }, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
}) => TransactionInstruction;
/**
 * Creates a set fee account instruction.
 */
export declare const createAdminSetFeeAccountInstruction: ({ config, state: { adminAccount }, tokenAccount, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
    tokenAccount: PublicKey;
}) => TransactionInstruction;
/**
 * Creates a set new fees instruction.
 */
export declare const createAdminApplyNewAdminInstruction: ({ config, state: { adminAccount }, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
}) => TransactionInstruction;
/**
 * Creates a set new fees instruction.
 */
export declare const createAdminCommitNewAdminInstruction: ({ config, state: { adminAccount }, newAdminAccount, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
    newAdminAccount: PublicKey;
}) => TransactionInstruction;
/**
 * Creates a set new fees instruction.
 */
export declare const createAdminSetNewFeesInstruction: ({ config, state: { adminAccount }, fees, }: {
    config: StableSwapConfig;
    state: Pick<StableSwapState, "adminAccount">;
    fees: Fees;
}) => TransactionInstruction;
//# sourceMappingURL=admin.d.ts.map