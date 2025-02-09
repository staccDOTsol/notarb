import { u64 } from "@saberhq/token-utils";
export interface StableSwapEvent {
    type: string;
    tokenAAmount?: u64;
    tokenBAmount?: u64;
    poolTokenAmount?: u64;
    fee?: u64;
}
/**
 * Parses the log message to return the StableSwap info about the transaction.
 * @param logMessages
 * @returns
 */
export declare const parseEventLogs: (logMessages?: string[] | null) => readonly StableSwapEvent[];
//# sourceMappingURL=events.d.ts.map