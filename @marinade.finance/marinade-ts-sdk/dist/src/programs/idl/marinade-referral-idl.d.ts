import { web3 } from '@project-serum/anchor';
export declare namespace MarinadeReferralIdl {
    namespace Instruction {
        namespace Deposit {
            type Accounts = {
                state: web3.PublicKey;
                msolMint: web3.PublicKey;
                liqPoolSolLegPda: web3.PublicKey;
                liqPoolMsolLeg: web3.PublicKey;
                liqPoolMsolLegAuthority: web3.PublicKey;
                reservePda: web3.PublicKey;
                transferFrom: web3.PublicKey;
                mintTo: web3.PublicKey;
                msolMintAuthority: web3.PublicKey;
                systemProgram: web3.PublicKey;
                tokenProgram: web3.PublicKey;
                marinadeFinanceProgram: web3.PublicKey;
                referralState: web3.PublicKey;
            };
        }
        namespace DepositStakeAccount {
            type Accounts = {
                state: web3.PublicKey;
                validatorList: web3.PublicKey;
                stakeList: web3.PublicKey;
                stakeAccount: web3.PublicKey;
                stakeAuthority: web3.PublicKey;
                duplicationFlag: web3.PublicKey;
                rentPayer: web3.PublicKey;
                msolMint: web3.PublicKey;
                mintTo: web3.PublicKey;
                msolMintAuthority: web3.PublicKey;
                clock: web3.PublicKey;
                rent: web3.PublicKey;
                systemProgram: web3.PublicKey;
                tokenProgram: web3.PublicKey;
                stakeProgram: web3.PublicKey;
                marinadeFinanceProgram: web3.PublicKey;
                referralState: web3.PublicKey;
            };
        }
        namespace LiquidUnstake {
            type Accounts = {
                state: web3.PublicKey;
                msolMint: web3.PublicKey;
                liqPoolSolLegPda: web3.PublicKey;
                liqPoolMsolLeg: web3.PublicKey;
                treasuryMsolAccount: web3.PublicKey;
                getMsolFrom: web3.PublicKey;
                getMsolFromAuthority: web3.PublicKey;
                transferSolTo: web3.PublicKey;
                systemProgram: web3.PublicKey;
                tokenProgram: web3.PublicKey;
                marinadeFinanceProgram: web3.PublicKey;
                referralState: web3.PublicKey;
            };
        }
        namespace Initialize {
            type Accounts = {
                adminAccount: web3.PublicKey;
                globalState: web3.PublicKey;
                treasuryMsolAccount: web3.PublicKey;
            };
        }
        namespace InitReferralAccount {
            type Accounts = {
                globalState: web3.PublicKey;
                adminAccount: web3.PublicKey;
                treasuryMsolAccount: web3.PublicKey;
                referralState: web3.PublicKey;
                partnerAccount: web3.PublicKey;
                tokenPartnerAccount: web3.PublicKey;
            };
        }
        namespace UpdateReferral {
            type Accounts = {
                globalState: web3.PublicKey;
                adminAccount: web3.PublicKey;
                referralState: web3.PublicKey;
            };
        }
        namespace ChangeAuthority {
            type Accounts = {
                globalState: web3.PublicKey;
                adminAccount: web3.PublicKey;
                newAdminAccount: web3.PublicKey;
            };
        }
    }
}
