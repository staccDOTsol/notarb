/// <reference types="bn.js" />
import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
export interface PoolState {
    bump: number;
    token0: PublicKey;
    token1: PublicKey;
    fee: number;
    tickSpacing: number;
    liquidity: BN;
    sqrtPriceX32: BN;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeGrowthGlobal0X32: BN;
    feeGrowthGlobal1X32: BN;
    protocolFeesToken0: BN;
    protocolFeesToken1: BN;
    unlocked: boolean;
}
export interface TickState {
    bump: number;
    tick: number;
    liquidityNet: BN;
    liquidityGross: BN;
    feeGrowthOutside0X32: BN;
    feeGrowthOutside1X32: BN;
    tickCumulativeOutside: BN;
    secondsPerLiquidityOutsideX32: BN;
    secondsOutside: number;
}
export interface ObservationState {
    bump: number;
    index: number;
    blockTimestamp: number;
    tickCumulative: BN;
    secondsPerLiquidityCumulativeX32: BN;
    initialized: boolean;
}
export declare function transformObservation({ observation, blockTimestamp, tick, liquidity, }: {
    observation: ObservationState;
    blockTimestamp: number;
    tick: number;
    liquidity: BN;
}): ObservationState;
export interface SnapshotCumulative {
    tickCumulativeInside: BN;
    secondsPerLiquidityInsideX32: BN;
    secondsInside: number;
}
export declare function snapshotCumulativesInside({ poolState, tickLower, tickUpper, latestObservation, time, }: {
    poolState: PoolState;
    tickLower: TickState;
    tickUpper: TickState;
    latestObservation: ObservationState;
    time: number;
}): SnapshotCumulative;
