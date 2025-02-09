import { Token } from '@cykura/sdk-core';
import { web3 } from '@project-serum/anchor';
import { FeeAmount } from '../constants';
/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @returns The pool address
 */
export declare function computePoolAddress({ factoryAddress, tokenA, tokenB, fee, }: {
    factoryAddress: web3.PublicKey;
    tokenA: Token;
    tokenB: Token;
    fee: FeeAmount;
}): Promise<web3.PublicKey>;
