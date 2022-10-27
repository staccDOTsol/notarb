/// <reference types="bn.js" />
import { BN, web3 } from '@project-serum/anchor';
import { Marinade } from '../marinade';
import { MarinadeMint } from '../marinade-mint/marinade-mint';
import { StakeRecord } from './borsh/stake-record';
import { StakeState } from './borsh/stake-state';
import { ValidatorRecord } from './borsh/validator-record';
import { MarinadeStateResponse } from './marinade-state.types';
import { StakeInfo } from './borsh/stake-info';
export declare class MarinadeState {
    private readonly marinade;
    private readonly anchorProvider;
    readonly state: MarinadeStateResponse;
    readonly marinadeStateAddress: web3.PublicKey;
    readonly marinadeFinanceProgramId: web3.PublicKey;
    private constructor();
    static fetch(marinade: Marinade): Promise<MarinadeState>;
    reserveAddress: () => Promise<web3.PublicKey>;
    mSolPrice: number;
    mSolMintAddress: web3.PublicKey;
    mSolMint: MarinadeMint;
    mSolMintAuthority: () => Promise<web3.PublicKey>;
    mSolLegAuthority: () => Promise<web3.PublicKey>;
    mSolLeg: web3.PublicKey;
    lpMintAddress: web3.PublicKey;
    lpMint: MarinadeMint;
    lpMintAuthority: () => Promise<web3.PublicKey>;
    solLeg: () => Promise<web3.PublicKey>;
    private findProgramDerivedAddress;
    validatorDuplicationFlag: (validatorAddress: web3.PublicKey) => Promise<web3.PublicKey>;
    epochInfo: () => Promise<web3.EpochInfo>;
    unstakeNowFeeBp(lamportsToObtain: BN): Promise<number>;
    stakeDelta(): BN;
    /**
     * return validatorRecords with capacity
     */
    getValidatorRecords(): Promise<{
        validatorRecords: ValidatorRecord[];
        capacity: number;
    }>;
    /**
     * return stakeRecords with capacity
     */
    getStakeRecords(): Promise<{
        stakeRecords: StakeRecord[];
        capacity: number;
    }>;
    getStakeStates(): Promise<StakeState[]>;
    /**
     * return listStakeInfos with capacity
     */
    getStakeInfos(): Promise<{
        stakeInfos: StakeInfo[];
        capacity: number;
    }>;
    treasuryMsolAccount: web3.PublicKey;
    /**
     * Commission in %
     */
    rewardsCommissionPercent: number;
}
