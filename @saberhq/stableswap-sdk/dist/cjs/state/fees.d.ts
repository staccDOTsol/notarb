import { Percent } from "@saberhq/token-utils";
import type { RawFees } from "./layout.js";
export declare type Fees = {
    trade: Percent;
    withdraw: Percent;
    adminTrade: Percent;
    adminWithdraw: Percent;
};
export declare const DEFAULT_FEE: Percent;
export declare const ZERO_FEES: Fees;
export declare const RECOMMENDED_FEES: Fees;
export declare const encodeFees: (fees: Fees) => RawFees;
export declare const decodeFees: (raw: RawFees) => Fees;
//# sourceMappingURL=fees.d.ts.map