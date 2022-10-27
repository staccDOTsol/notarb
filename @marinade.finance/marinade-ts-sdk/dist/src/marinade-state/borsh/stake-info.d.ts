import BN from 'bn.js';
import { StakeRecord } from "./stake-record";
import { StakeState } from "./stake-state";
export declare class StakeInfo {
    index: number;
    record: StakeRecord;
    stake: StakeState;
    balance: BN;
    constructor(args: StakeInfo);
}
