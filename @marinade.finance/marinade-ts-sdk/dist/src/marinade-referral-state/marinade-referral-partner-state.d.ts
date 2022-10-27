import { web3 } from '@project-serum/anchor';
import { Marinade } from '../marinade';
import { MarinadeReferralStateResponse } from './marinade-referral-state.types';
export declare class MarinadeReferralPartnerState {
    readonly state: MarinadeReferralStateResponse.ReferralState;
    readonly referralStateAddress: web3.PublicKey;
    readonly marinadeReferralProgramId: web3.PublicKey;
    private constructor();
    static fetch(marinade: Marinade): Promise<MarinadeReferralPartnerState>;
}
