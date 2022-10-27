import { web3 } from '@project-serum/anchor';
import { deserializePublicKey } from './common';
export declare class StakeRecord {
    stakeAccount: web3.PublicKey;
    lastUpdateDelegatedLamports: number;
    lastUpdateEpoch: number;
    isEmergencyUnstaking: number;
    constructor(args: StakeRecord);
}
export declare const stakeRecordBorshSchema: readonly [readonly [typeof StakeRecord, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["stakeAccount", typeof deserializePublicKey], readonly ["lastUpdateDelegatedLamports", "u64"], readonly ["lastUpdateEpoch", "u64"], readonly ["isEmergencyUnstaking", "u8"]];
}]];
