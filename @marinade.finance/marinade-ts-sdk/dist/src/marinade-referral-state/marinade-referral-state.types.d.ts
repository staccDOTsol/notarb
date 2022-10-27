/// <reference types="bn.js" />
import { web3, BN } from '@project-serum/anchor';
export declare const enum ProgramDerivedAddressSeed {
    GLOBAL_STATE_SEED = "mrp_initialize",
    REFERRAL_STATE_SEED = "mrp_create_referral"
}
export declare namespace MarinadeReferralStateResponse {
    interface GlobalState {
        adminAccount: web3.PublicKey;
        treasuryMsolAccount: web3.PublicKey;
        treasuryMsolAuthBump: number;
    }
    interface ReferralState {
        partnerName: string;
        partnerAccount: web3.PublicKey;
        tokenPartnerAccount: web3.PublicKey;
        transferDuration: number;
        lastTransferTime: BN;
        depositSolAmount: BN;
        depositSolOperations: BN;
        depositStakeAccountAmount: BN;
        depositStakeAccountOperations: BN;
        liqUnstakeMsolFees: BN;
        liqUnstakeSolAmount: BN;
        liqUnstakeMsolAmount: BN;
        liqUnstakeOperations: BN;
        delayedUnstakeAmount: BN;
        delayedUnstakeOperations: BN;
        baseFee: number;
        maxFee: number;
        maxNetStake: BN;
        pause: boolean;
    }
}
