import { web3 } from '@project-serum/anchor';
export declare class MarinadeConfig {
    marinadeFinanceProgramId: web3.PublicKey;
    marinadeReferralProgramId: web3.PublicKey;
    marinadeStateAddress: web3.PublicKey;
    marinadeReferralGlobalStateAddress: web3.PublicKey;
    stakeWithdrawAuthPDA: web3.PublicKey;
    connection: web3.Connection;
    publicKey: web3.PublicKey | null;
    referralCode: web3.PublicKey | null;
    constructor(configOverrides?: Partial<MarinadeConfig>);
}
