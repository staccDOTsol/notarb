import { blob, seq, struct, u8 } from '@solana/buffer-layout';
import BN from 'bn.js';
import { publicKey, uint64 } from '../layout/common';
export var DEFAULT_FARMING_TICKET_END_TIME = new BN('9223372036854775807');
export var FARMING_STATE_LAYOUT = struct([
    blob(8, 'padding'),
    uint64('tokensUnlocked'),
    uint64('tokensPerPeriod'),
    uint64('tokensTotal'),
    uint64('periodLength', true),
    uint64('noWithdrawalTime', true),
    u8('vestingType'),
    uint64('vestingPeriod', true),
    uint64('startTime', true),
    uint64('currentTime', true),
    publicKey('pool'),
    publicKey('farmingTokenVault'),
    publicKey('farmingSnapshots'),
]);
export var FARMING_TICKET_LAYOUT = struct([
    blob(8, 'padding'),
    uint64('tokensFrozen'),
    uint64('startTime'),
    uint64('endTime'),
    publicKey('userKey'),
    publicKey('pool'),
    uint64('nextAttached'),
    seq(struct([
        publicKey('farmingState'),
        uint64('lastWithdrawTime', true),
        uint64('lastVestedWithdrawTime', true),
    ]), 10, 'statesAttached'),
]);
export var FARMING_CALC_LAYOUT = struct([
    blob(8, 'padding'),
    publicKey('farmingState'),
    publicKey('userKey'),
    publicKey('initializer'),
    uint64('tokenAmount'),
]);
export var END_FARMING_INSTRUCTION_LAYOUT = struct([
    blob(8, 'instruction'),
]);
export var CREATE_CALC_INSTRUCTION_LAYOUT = END_FARMING_INSTRUCTION_LAYOUT;
export var WITHDRAW_FARMED_INSTRUCTION_LAYOUT = END_FARMING_INSTRUCTION_LAYOUT;
export var CALCULATE_FARMED_INSTRUCTION = struct([
    blob(8, 'instruction'),
    uint64('maxSnapshots'),
]);
export var START_FARMING_INSTRUCTION_LAYOUT = struct([
    blob(8, 'instruction'),
    uint64('poolTokenAmount'),
]);
export var SNAPSHOT_QUEUE_LAYOUT = struct([
    blob(8, 'padding'),
    uint64('nextIndex'),
    seq(struct([
        u8('isInitialized'),
        uint64('tokensFrozen'),
        uint64('farmingTokens'),
        uint64('time', true),
    ]), 1500, 'snapshots'),
]);
