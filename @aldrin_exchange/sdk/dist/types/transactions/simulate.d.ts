import { RpcResponseAndContext, SimulatedTransactionResponse } from '@solana/web3.js';
import { SendTransactionParams } from '.';
export declare function simulateTransaction({ transaction, wallet, connection, partialSigners, }: SendTransactionParams): Promise<RpcResponseAndContext<SimulatedTransactionResponse>>;
