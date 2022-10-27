"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farming = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
var _1 = require(".");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
/**
 * Farming pool transactions and utilites
 */
var Farming = /** @class */ (function () {
    function Farming() {
    }
    /**
     * Create start farming instruction
     * @param params
     * @returns
     */
    Farming.startFarmingInstruction = function (params) {
        var data = Buffer.alloc(_1.START_FARMING_INSTRUCTION_LAYOUT.span);
        var poolPublicKey = params.poolPublicKey, farmingState = params.farmingState, lpTokenFreezeVault = params.lpTokenFreezeVault, userKey = params.userKey, tokenAmount = params.tokenAmount, lpTokenAccount = params.lpTokenAccount, farmingTicket = params.farmingTicket, programId = params.programId;
        _1.START_FARMING_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('start_farming'),
            tokenAmount: tokenAmount,
        }, data);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(farmingState),
            (0, utils_1.account)(farmingTicket, true),
            (0, utils_1.account)(lpTokenFreezeVault, true),
            (0, utils_1.account)(lpTokenAccount, true),
            (0, utils_1.account)(userKey, false, true),
            (0, utils_1.account)(userKey, false, true),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
            (0, utils_1.account)(web3_js_1.SYSVAR_RENT_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create end farming instruction
     * @param params
     * @returns
     */
    Farming.endFarmingInstruction = function (params) {
        var data = Buffer.alloc(_1.END_FARMING_INSTRUCTION_LAYOUT.span);
        var poolPublicKey = params.poolPublicKey, poolSigner = params.poolSigner, farmingState = params.farmingState, farmingSnapshots = params.farmingSnapshots, farmingTicket = params.farmingTicket, lpTokenFreezeVault = params.lpTokenFreezeVault, userPoolTokenAccount = params.userPoolTokenAccount, userKey = params.userKey, programId = params.programId;
        _1.END_FARMING_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('end_farming'),
        }, data);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(farmingState),
            (0, utils_1.account)(farmingSnapshots),
            (0, utils_1.account)(farmingTicket, true),
            (0, utils_1.account)(lpTokenFreezeVault, true),
            (0, utils_1.account)(poolSigner),
            (0, utils_1.account)(userPoolTokenAccount, true),
            (0, utils_1.account)(userKey, false, true),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
            (0, utils_1.account)(web3_js_1.SYSVAR_RENT_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create calc account instruction
     * @param params
     * @returns
     */
    Farming.createCalcAccountInstruction = function (params) {
        var data = Buffer.alloc(_1.CREATE_CALC_INSTRUCTION_LAYOUT.span);
        _1.CREATE_CALC_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('initialize_farming_calc'),
        }, data);
        var farmingCalc = params.farmingCalc, farmingTicket = params.farmingTicket, userKey = params.userKey, farmingState = params.farmingState, initializer = params.initializer, programId = params.programId;
        var keys = [
            (0, utils_1.account)(farmingCalc, true),
            (0, utils_1.account)(farmingTicket),
            (0, utils_1.account)(userKey),
            (0, utils_1.account)(farmingState),
            (0, utils_1.account)(initializer, false, true),
            (0, utils_1.account)(web3_js_1.SYSVAR_RENT_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create calculateFarmed instruction
     */
    Farming.calculateFarmedInstruction = function (params) {
        var data = Buffer.alloc(_1.CALCULATE_FARMED_INSTRUCTION.span);
        var poolPublicKey = params.poolPublicKey, farmingState = params.farmingState, farmingSnapshots = params.farmingSnapshots, farmingTicket = params.farmingTicket, farmingCalc = params.farmingCalc, programId = params.programId;
        _1.CALCULATE_FARMED_INSTRUCTION.encode({
            instruction: (0, utils_1.instructionDiscriminator)('calculate_farmed'),
            maxSnapshots: params.maxSnapshots,
        }, data);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(farmingState),
            (0, utils_1.account)(farmingSnapshots),
            (0, utils_1.account)(farmingCalc, true),
            (0, utils_1.account)(farmingTicket, true),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create withdrawFarmed instruction
     */
    Farming.withdrawFarmedInstruction = function (params) {
        var poolPublicKey = params.poolPublicKey, farmingCalc = params.farmingCalc, farmingState = params.farmingState, farmingTokenVault = params.farmingTokenVault, poolSigner = params.poolSigner, userFarmingTokenAccount = params.userFarmingTokenAccount, userKey = params.userKey, programId = params.programId;
        var data = Buffer.alloc(_1.WITHDRAW_FARMED_INSTRUCTION_LAYOUT.span);
        _1.WITHDRAW_FARMED_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('withdraw_farmed'),
        }, data);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(farmingState),
            (0, utils_1.account)(farmingCalc, true),
            (0, utils_1.account)(farmingTokenVault, true),
            (0, utils_1.account)(poolSigner),
            (0, utils_1.account)(userFarmingTokenAccount, true),
            (0, utils_1.account)(userKey, false, true),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Calculate Farming Ticket rewards based on farming state & snapshots
     * @param params
     * @returns
     */
    Farming.calculateFarmingRewards = function (params) {
        var queue = params.queue, ticket = params.ticket, state = params.state;
        var ZERO = { unclaimedTokens: new bn_js_1.default(0), unclaimedSnapshots: 0 };
        var snapshotQueue = queue.find(function (snapshotQueue) { return snapshotQueue.queuePublicKey.equals(state.farmingSnapshots); });
        // Snapshot not found
        if (!snapshotQueue) {
            return ZERO;
        }
        var stateAttached = ticket.statesAttached.find(function (el) { return state.farmingStatePublicKey.equals(el.farmingState); });
        // if state attached and last withdraw time more than last farming state snapshot -
        // farming ended
        if (((stateAttached === null || stateAttached === void 0 ? void 0 : stateAttached.lastVestedWithdrawTime) || 0) >= state.currentTime) {
            return ZERO;
        }
        return (0, utils_2.getFarmingRewardsFromSnapshots)({
            ticket: ticket,
            state: state,
            stateAttached: stateAttached,
            snapshots: snapshotQueue.snapshots,
        });
    };
    return Farming;
}());
exports.Farming = Farming;
