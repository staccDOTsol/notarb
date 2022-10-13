"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeStateBorshSchema = exports.Delegation = exports.Stake = exports.Lockup = exports.Authorized = exports.Meta = exports.StakeState = void 0;
const common_1 = require("./common");
class StakeState {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.StakeState = StakeState;
(function (StakeState_1) {
    class UninitializedState {
        constructor(args) {
            Object.assign(this, args);
        }
    }
    StakeState_1.UninitializedState = UninitializedState;
    class InitializedState {
        constructor(args) {
            Object.assign(this, args);
        }
    }
    StakeState_1.InitializedState = InitializedState;
    class StakeState {
        constructor(args) {
            Object.assign(this, args);
        }
    }
    StakeState_1.StakeState = StakeState;
    class RewardsPoolState {
        constructor(args) {
            Object.assign(this, args);
        }
    }
    StakeState_1.RewardsPoolState = RewardsPoolState;
})(StakeState = exports.StakeState || (exports.StakeState = {}));
class Meta {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.Meta = Meta;
class Authorized {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.Authorized = Authorized;
class Lockup {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.Lockup = Lockup;
class Stake {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.Stake = Stake;
class Delegation {
    constructor(args) {
        Object.assign(this, args);
    }
}
exports.Delegation = Delegation;
exports.stakeStateBorshSchema = [
    [StakeState.UninitializedState, {
            kind: 'struct',
            fields: [],
        }],
    [StakeState.InitializedState, {
            kind: 'struct',
            fields: [
                ['meta', Meta],
            ],
        }],
    [StakeState.StakeState, {
            kind: 'struct',
            fields: [
                ['meta', Meta],
                ['stake', Stake],
            ],
        }],
    [StakeState.RewardsPoolState, {
            kind: 'struct',
            fields: [],
        }],
    [Meta, {
            kind: 'struct',
            fields: [
                ['rentExemptReserve', 'u64'],
                ['authorized', Authorized],
                ['lockup', Lockup],
            ],
        }],
    [Authorized, {
            kind: 'struct',
            fields: [
                ['staker', common_1.deserializePublicKey],
                ['withdrawer', common_1.deserializePublicKey],
            ],
        }],
    [Lockup, {
            kind: 'struct',
            fields: [
                ['unixTimestamp', 'u64'],
                ['epoch', 'u64'],
                ['custodian', common_1.deserializePublicKey],
            ],
        }],
    [Stake, {
            kind: 'struct',
            fields: [
                ['delegation', Delegation],
                ['creditsObserved', 'u64'],
            ],
        }],
    [Delegation, {
            kind: 'struct',
            fields: [
                ['voterPubkey', common_1.deserializePublicKey],
                ['stake', 'u64'],
                ['activationEpoch', 'u64'],
                ['deactivationEpoch', 'u64'],
                ['warmupCooldownRate', common_1.deserializeF64],
            ],
        }],
    [StakeState, {
            kind: 'enum',
            values: [
                ['Uninitialized', StakeState.UninitializedState],
                ['Initialized', StakeState.InitializedState],
                ['Stake', StakeState.StakeState],
                ['RewardsPool', StakeState.RewardsPoolState],
            ],
        }],
];
//# sourceMappingURL=stake-state.js.map