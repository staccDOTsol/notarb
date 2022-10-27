import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';
import { CALCULATE_FARMED_INSTRUCTION, CREATE_CALC_INSTRUCTION_LAYOUT, END_FARMING_INSTRUCTION_LAYOUT, START_FARMING_INSTRUCTION_LAYOUT, WITHDRAW_FARMED_INSTRUCTION_LAYOUT, } from '.';
import { account, instructionDiscriminator } from '../utils';
import { getFarmingRewardsFromSnapshots } from './utils';
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
        var data = Buffer.alloc(START_FARMING_INSTRUCTION_LAYOUT.span);
        var poolPublicKey = params.poolPublicKey, farmingState = params.farmingState, lpTokenFreezeVault = params.lpTokenFreezeVault, userKey = params.userKey, tokenAmount = params.tokenAmount, lpTokenAccount = params.lpTokenAccount, farmingTicket = params.farmingTicket, programId = params.programId;
        START_FARMING_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('start_farming'),
            tokenAmount: tokenAmount,
        }, data);
        var keys = [
            account(poolPublicKey),
            account(farmingState),
            account(farmingTicket, true),
            account(lpTokenFreezeVault, true),
            account(lpTokenAccount, true),
            account(userKey, false, true),
            account(userKey, false, true),
            account(TOKEN_PROGRAM_ID),
            account(SYSVAR_CLOCK_PUBKEY),
            account(SYSVAR_RENT_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var data = Buffer.alloc(END_FARMING_INSTRUCTION_LAYOUT.span);
        var poolPublicKey = params.poolPublicKey, poolSigner = params.poolSigner, farmingState = params.farmingState, farmingSnapshots = params.farmingSnapshots, farmingTicket = params.farmingTicket, lpTokenFreezeVault = params.lpTokenFreezeVault, userPoolTokenAccount = params.userPoolTokenAccount, userKey = params.userKey, programId = params.programId;
        END_FARMING_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('end_farming'),
        }, data);
        var keys = [
            account(poolPublicKey),
            account(farmingState),
            account(farmingSnapshots),
            account(farmingTicket, true),
            account(lpTokenFreezeVault, true),
            account(poolSigner),
            account(userPoolTokenAccount, true),
            account(userKey, false, true),
            account(TOKEN_PROGRAM_ID),
            account(SYSVAR_CLOCK_PUBKEY),
            account(SYSVAR_RENT_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var data = Buffer.alloc(CREATE_CALC_INSTRUCTION_LAYOUT.span);
        CREATE_CALC_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('initialize_farming_calc'),
        }, data);
        var farmingCalc = params.farmingCalc, farmingTicket = params.farmingTicket, userKey = params.userKey, farmingState = params.farmingState, initializer = params.initializer, programId = params.programId;
        var keys = [
            account(farmingCalc, true),
            account(farmingTicket),
            account(userKey),
            account(farmingState),
            account(initializer, false, true),
            account(SYSVAR_RENT_PUBKEY),
        ];
        return new TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create calculateFarmed instruction
     */
    Farming.calculateFarmedInstruction = function (params) {
        var data = Buffer.alloc(CALCULATE_FARMED_INSTRUCTION.span);
        var poolPublicKey = params.poolPublicKey, farmingState = params.farmingState, farmingSnapshots = params.farmingSnapshots, farmingTicket = params.farmingTicket, farmingCalc = params.farmingCalc, programId = params.programId;
        CALCULATE_FARMED_INSTRUCTION.encode({
            instruction: instructionDiscriminator('calculate_farmed'),
            maxSnapshots: params.maxSnapshots,
        }, data);
        var keys = [
            account(poolPublicKey),
            account(farmingState),
            account(farmingSnapshots),
            account(farmingCalc, true),
            account(farmingTicket, true),
            account(SYSVAR_CLOCK_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var data = Buffer.alloc(WITHDRAW_FARMED_INSTRUCTION_LAYOUT.span);
        WITHDRAW_FARMED_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('withdraw_farmed'),
        }, data);
        var keys = [
            account(poolPublicKey),
            account(farmingState),
            account(farmingCalc, true),
            account(farmingTokenVault, true),
            account(poolSigner),
            account(userFarmingTokenAccount, true),
            account(userKey, false, true),
            account(TOKEN_PROGRAM_ID),
            account(SYSVAR_CLOCK_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var ZERO = { unclaimedTokens: new BN(0), unclaimedSnapshots: 0 };
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
        return getFarmingRewardsFromSnapshots({
            ticket: ticket,
            state: state,
            stateAttached: stateAttached,
            snapshots: snapshotQueue.snapshots,
        });
    };
    return Farming;
}());
export { Farming };
