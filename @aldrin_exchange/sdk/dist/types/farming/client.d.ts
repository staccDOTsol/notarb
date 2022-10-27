import { Connection } from '@solana/web3.js';
import { ClaimFarmedParams, FarmingCalc, GetFarmingCalcParams, GetFarmingSnapshotParams } from '.';
import { EndFarmingParams, FarmingSnapshotQueue, FarmingState, FarmingTicket, GetFarmingStateParams, GetFarmingTicketsParams, StartFarmingParams } from './types';
/**
 * Aldrin AMM Pools farming(staking) client
 */
export declare class FarmingClient {
    private connection;
    constructor(connection?: Connection);
    /**
     * Get farming state for pool
     * @param params
     * @returns
     */
    getFarmingState(params: GetFarmingStateParams): Promise<FarmingState[]>;
    /**
     * Get farming tickets for pool/user
     * @param params
     * @returns
     */
    getFarmingTickets(params?: GetFarmingTicketsParams): Promise<FarmingTicket[]>;
    /**
     * Get farming calc accounts for farming and/or user
     * @param params Search params (farming state, user)
     * @returns
     */
    getFarmingCalcAccounts(params?: GetFarmingCalcParams): Promise<FarmingCalc[]>;
    /**
     * Start farming, creates Farming Ticket
     * @param params
     * @returns Transaction Id
     */
    startFarming(params: StartFarmingParams): Promise<string>;
    /**
     * End farming
     */
    endFarming(params: EndFarmingParams): Promise<string>;
    /**
     * Claim staking rewards
     * @param params
     * @returns Transaction Id
     */
    claimFarmed(params: ClaimFarmedParams): Promise<string>;
    /**
     * Get farming snapshots. Useful for reward calculations.
     * // TODO: add caching
     *
     */
    getFarmingSnapshotsQueue(params: GetFarmingSnapshotParams): Promise<FarmingSnapshotQueue[]>;
}
