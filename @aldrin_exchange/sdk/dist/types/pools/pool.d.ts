import { TransactionInstruction } from '@solana/web3.js';
import { DepositLiquididtyInstructionParams, WithdrawLiquidityInstructionParams } from '.';
import { SwapInstructionParams } from './types/swap';
/**
 * Pool instructions & help utils
 */
export declare class Pool {
    /**
       * Create deposit liquidity instruction
       * @param params
       * @returns
       */
    static depositLiquididtyInstruction(params: DepositLiquididtyInstructionParams): TransactionInstruction;
    /**
     * Create widthradw liquidity instruction
     * @param params
     * @returns
     */
    static withdrawLiquidityInstruction(params: WithdrawLiquidityInstructionParams): TransactionInstruction;
    /**
     * Create swap tokens instruction. Detect pool program version base on `poolVersion` field
     * @param params
     * @returns
     */
    static swapInstruction(params: SwapInstructionParams): TransactionInstruction;
    private static swapInstructionData;
    /**
     * Create swap tokens instruction for v1 pool
     * @param params
     * @returns
     */
    static swapInstructionV1(params: SwapInstructionParams): TransactionInstruction;
    /**
     * Create swap tokens instruction for v2 pool
     * @param params
     * @returns
     */
    static swapInstructionV2(params: SwapInstructionParams): TransactionInstruction;
}
