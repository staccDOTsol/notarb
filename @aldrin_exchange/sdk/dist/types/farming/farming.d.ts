import { TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';
import { CalculateFarmedInstruction, CreateCalcInstructionParams, ClaimFarmedInstructionParams } from '.';
import { EndFarmingInstructionParams, GetFarmingRewardParams, StartFarmingInstructionParams } from './types';
/**
 * Farming pool transactions and utilites
 */
export declare class Farming {
    /**
     * Create start farming instruction
     * @param params
     * @returns
     */
    static startFarmingInstruction(params: StartFarmingInstructionParams): TransactionInstruction;
    /**
     * Create end farming instruction
     * @param params
     * @returns
     */
    static endFarmingInstruction(params: EndFarmingInstructionParams): TransactionInstruction;
    /**
     * Create calc account instruction
     * @param params
     * @returns
     */
    static createCalcAccountInstruction(params: CreateCalcInstructionParams): TransactionInstruction;
    /**
     * Create calculateFarmed instruction
     */
    static calculateFarmedInstruction(params: CalculateFarmedInstruction): TransactionInstruction;
    /**
     * Create withdrawFarmed instruction
     */
    static withdrawFarmedInstruction(params: ClaimFarmedInstructionParams): TransactionInstruction;
    /**
     * Calculate Farming Ticket rewards based on farming state & snapshots
     * @param params
     * @returns
     */
    static calculateFarmingRewards(params: GetFarmingRewardParams): {
        unclaimedTokens: BN;
        unclaimedSnapshots: number;
    };
}
