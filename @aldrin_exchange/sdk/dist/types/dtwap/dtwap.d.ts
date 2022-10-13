import { TransactionInstruction } from '@solana/web3.js';
import { GetDTwapAvailableTokensParams, DTwapExecuteSwapParams } from '.';
/**
 * TWAMM instructions & help utils
 */
export declare class TwAmm {
    /**
       * Create instruction for getAvailableTokensForSale simulation
      * @param params
       * @returns
       */
    static getAvailableTokensInstruction(params: GetDTwapAvailableTokensParams): TransactionInstruction;
    static executeSwapInstruction(params: DTwapExecuteSwapParams): TransactionInstruction;
}
