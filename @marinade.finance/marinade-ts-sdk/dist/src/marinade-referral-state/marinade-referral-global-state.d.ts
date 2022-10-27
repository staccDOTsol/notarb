import { web3 } from '@project-serum/anchor';
import { Marinade } from '../marinade';
import { MarinadeReferralStateResponse } from './marinade-referral-state.types';
export declare class MarinadeReferralGlobalState {
    readonly state: MarinadeReferralStateResponse.GlobalState;
    readonly marinadeReferralProgramId: web3.PublicKey;
    private constructor();
    static fetch(marinade: Marinade): Promise<MarinadeReferralGlobalState>;
}
