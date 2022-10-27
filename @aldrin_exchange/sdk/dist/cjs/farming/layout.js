"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNAPSHOT_QUEUE_LAYOUT = exports.START_FARMING_INSTRUCTION_LAYOUT = exports.CALCULATE_FARMED_INSTRUCTION = exports.WITHDRAW_FARMED_INSTRUCTION_LAYOUT = exports.CREATE_CALC_INSTRUCTION_LAYOUT = exports.END_FARMING_INSTRUCTION_LAYOUT = exports.FARMING_CALC_LAYOUT = exports.FARMING_TICKET_LAYOUT = exports.FARMING_STATE_LAYOUT = exports.DEFAULT_FARMING_TICKET_END_TIME = void 0;
var buffer_layout_1 = require("@solana/buffer-layout");
var bn_js_1 = __importDefault(require("bn.js"));
var common_1 = require("../layout/common");
exports.DEFAULT_FARMING_TICKET_END_TIME = new bn_js_1.default('9223372036854775807');
exports.FARMING_STATE_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.uint64)('tokensUnlocked'),
    (0, common_1.uint64)('tokensPerPeriod'),
    (0, common_1.uint64)('tokensTotal'),
    (0, common_1.uint64)('periodLength', true),
    (0, common_1.uint64)('noWithdrawalTime', true),
    (0, buffer_layout_1.u8)('vestingType'),
    (0, common_1.uint64)('vestingPeriod', true),
    (0, common_1.uint64)('startTime', true),
    (0, common_1.uint64)('currentTime', true),
    (0, common_1.publicKey)('pool'),
    (0, common_1.publicKey)('farmingTokenVault'),
    (0, common_1.publicKey)('farmingSnapshots'),
]);
exports.FARMING_TICKET_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.uint64)('tokensFrozen'),
    (0, common_1.uint64)('startTime'),
    (0, common_1.uint64)('endTime'),
    (0, common_1.publicKey)('userKey'),
    (0, common_1.publicKey)('pool'),
    (0, common_1.uint64)('nextAttached'),
    (0, buffer_layout_1.seq)((0, buffer_layout_1.struct)([
        (0, common_1.publicKey)('farmingState'),
        (0, common_1.uint64)('lastWithdrawTime', true),
        (0, common_1.uint64)('lastVestedWithdrawTime', true),
    ]), 10, 'statesAttached'),
]);
exports.FARMING_CALC_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.publicKey)('farmingState'),
    (0, common_1.publicKey)('userKey'),
    (0, common_1.publicKey)('initializer'),
    (0, common_1.uint64)('tokenAmount'),
]);
exports.END_FARMING_INSTRUCTION_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
]);
exports.CREATE_CALC_INSTRUCTION_LAYOUT = exports.END_FARMING_INSTRUCTION_LAYOUT;
exports.WITHDRAW_FARMED_INSTRUCTION_LAYOUT = exports.END_FARMING_INSTRUCTION_LAYOUT;
exports.CALCULATE_FARMED_INSTRUCTION = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
    (0, common_1.uint64)('maxSnapshots'),
]);
exports.START_FARMING_INSTRUCTION_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
    (0, common_1.uint64)('poolTokenAmount'),
]);
exports.SNAPSHOT_QUEUE_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.uint64)('nextIndex'),
    (0, buffer_layout_1.seq)((0, buffer_layout_1.struct)([
        (0, buffer_layout_1.u8)('isInitialized'),
        (0, common_1.uint64)('tokensFrozen'),
        (0, common_1.uint64)('farmingTokens'),
        (0, common_1.uint64)('time', true),
    ]), 1500, 'snapshots'),
]);
