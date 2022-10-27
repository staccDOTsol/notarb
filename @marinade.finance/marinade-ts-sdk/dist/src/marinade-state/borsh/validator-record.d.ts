import { web3 } from '@project-serum/anchor';
import BN from 'bn.js';
import { deserializePublicKey } from './common';
export declare class ValidatorRecord {
    validatorAccount: web3.PublicKey;
    activeBalance: BN;
    score: number;
    lastStakeDeltaEpoch: BN;
    duplicationFlagBumpSeed: number;
    constructor(args: ValidatorRecord);
}
export declare const validatorRecordBorshSchema: readonly [readonly [typeof ValidatorRecord, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["validatorAccount", typeof deserializePublicKey], readonly ["activeBalance", "u64"], readonly ["score", "u32"], readonly ["lastStakeDeltaEpoch", "u64"], readonly ["duplicationFlagBumpSeed", "u8"]];
}]];
