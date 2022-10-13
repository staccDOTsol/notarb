import { web3 } from '@project-serum/anchor';
import BN from 'bn.js';
import { deserializeF64, deserializePublicKey } from './common';
export declare class StakeState {
    Uninitialized?: StakeState.UninitializedState;
    Initialized?: StakeState.InitializedState;
    Stake?: StakeState.StakeState;
    RewardsPool?: StakeState.RewardsPoolState;
    constructor(args: StakeState);
}
export declare namespace StakeState {
    class UninitializedState {
        constructor(args: UninitializedState);
    }
    class InitializedState {
        meta: Meta;
        constructor(args: InitializedState);
    }
    class StakeState {
        meta: Meta;
        stake: Stake;
        constructor(args: StakeState);
    }
    class RewardsPoolState {
        constructor(args: RewardsPoolState);
    }
}
export declare class Meta {
    rentExemptReserve: BN;
    authorized: Authorized;
    lockup: Lockup;
    constructor(args: Meta);
}
export declare class Authorized {
    staker: web3.PublicKey;
    withdrawer: web3.PublicKey;
    constructor(args: Authorized);
}
export declare class Lockup {
    unixTimestamp: BN;
    epoch: BN;
    custodian: web3.PublicKey;
    constructor(args: Lockup);
}
export declare class Stake {
    delegation: Delegation;
    creditsObserved: BN;
    constructor(args: Stake);
}
export declare class Delegation {
    voterPubkey: web3.PublicKey;
    stake: BN;
    activationEpoch: BN;
    deactivationEpoch: BN;
    warmupCooldownRate: {
        value: number;
    };
    constructor(args: Delegation);
}
export declare const stakeStateBorshSchema: readonly [readonly [typeof StakeState.UninitializedState, {
    readonly kind: "struct";
    readonly fields: readonly [];
}], readonly [typeof StakeState.InitializedState, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["meta", typeof Meta]];
}], readonly [typeof StakeState.StakeState, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["meta", typeof Meta], readonly ["stake", typeof Stake]];
}], readonly [typeof StakeState.RewardsPoolState, {
    readonly kind: "struct";
    readonly fields: readonly [];
}], readonly [typeof Meta, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["rentExemptReserve", "u64"], readonly ["authorized", typeof Authorized], readonly ["lockup", typeof Lockup]];
}], readonly [typeof Authorized, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["staker", typeof deserializePublicKey], readonly ["withdrawer", typeof deserializePublicKey]];
}], readonly [typeof Lockup, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["unixTimestamp", "u64"], readonly ["epoch", "u64"], readonly ["custodian", typeof deserializePublicKey]];
}], readonly [typeof Stake, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["delegation", typeof Delegation], readonly ["creditsObserved", "u64"]];
}], readonly [typeof Delegation, {
    readonly kind: "struct";
    readonly fields: readonly [readonly ["voterPubkey", typeof deserializePublicKey], readonly ["stake", "u64"], readonly ["activationEpoch", "u64"], readonly ["deactivationEpoch", "u64"], readonly ["warmupCooldownRate", typeof deserializeF64]];
}], readonly [typeof StakeState, {
    readonly kind: "enum";
    readonly values: readonly [readonly ["Uninitialized", typeof StakeState.UninitializedState], readonly ["Initialized", typeof StakeState.InitializedState], readonly ["Stake", typeof StakeState.StakeState], readonly ["RewardsPool", typeof StakeState.RewardsPoolState]];
}]];
