import BN from 'bn.js';
import { AttachedFarmingState, FarmingSnapshot, FarmingState, FarmingTicket } from './types';
export declare const getFarmingRewardsFromSnapshots: ({ ticket, state, stateAttached, snapshots, }: {
    ticket: FarmingTicket;
    state: FarmingState;
    stateAttached?: AttachedFarmingState | undefined;
    snapshots: FarmingSnapshot[];
}) => {
    unclaimedTokens: BN;
    unclaimedSnapshots: number;
};
