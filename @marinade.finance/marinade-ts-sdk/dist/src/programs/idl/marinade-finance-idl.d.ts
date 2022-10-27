import { web3 } from '@project-serum/anchor';
export declare namespace MarinadeFinanceIdl {
    namespace Instruction {
        namespace Initialize {
            type Accounts = {
                creatorAuthority: web3.PublicKey;
                state: web3.PublicKey;
                reservePda: web3.PublicKey;
                stakeList: web3.PublicKey;
                validatorList: web3.PublicKey;
                msolMint: web3.PublicKey;
                operationalSolAccount: web3.PublicKey;
                liqPool: web3.PublicKey;
                treasuryMsolAccount: web3.PublicKey;
                clock: web3.PublicKey;
                rent: web3.PublicKey;
            };
        }
        namespace ChangeAuthority {
            type Accounts = {
                state: web3.PublicKey;
                adminAuthority: web3.PublicKey;
            };
        }
        namespace AddValidator {
            type Accounts = {
                state: web3.PublicKey;
                managerAuthority: web3.PublicKey;
                validatorList: web3.PublicKey;
                validatorVote: web3.PublicKey;
                duplicationFlag: web3.PublicKey;
                rentPayer: web3.PublicKey;
                clock: web3.PublicKey;
                rent: web3.PublicKey;
                systemProgram: web3.PublicKey;
            };
        }
        namespace RemoveValidator {
            type Accounts = {
                state: web3.PublicKey;
                managerAuthority: web3.PublicKey;
                validatorList: web3.PublicKey;
                duplicationFlag: web3.PublicKey;
                operationalSolAccount: web3.PublicKey;
            };
        }
        namespace SetValidatorScore {
            type Accounts = {
                state: web3.PublicKey;
                managerAuthority: web3.PublicKey;
                validatorList: web3.PublicKey;
            };
        }
        namespace ConfigValidatorSystem {
            type Accounts = {
                state: web3.PublicKey;
                managerAuthority: web3.PublicKey;
            };
        }
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
            };
        }
        namespace AddLiquidity {
            type Accounts = {
                state: web3.PublicKey;
                lpMint: web3.PublicKey;
                lpMintAuthority: web3.PublicKey;
                liqPoolMsolLeg: web3.PublicKey;
                liqPoolSolLegPda: web3.PublicKey;
                transferFrom: web3.PublicKey;
                mintTo: web3.PublicKey;
                systemProgram: web3.PublicKey;
                tokenProgram: web3.PublicKey;
            };
        }
        namespace RemoveLiquidity {
            type Accounts = {
                state: web3.PublicKey;
                lpMint: web3.PublicKey;
                burnFrom: web3.PublicKey;
                burnFromAuthority: web3.PublicKey;
                transferSolTo: web3.PublicKey;
                transferMsolTo: web3.PublicKey;
                liqPoolSolLegPda: web3.PublicKey;
                liqPoolMsolLeg: web3.PublicKey;
                liqPoolMsolLegAuthority: web3.PublicKey;
                systemProgram: web3.PublicKey;
                tokenProgram: web3.PublicKey;
            };
        }
        namespace SetLpParams {
            type Accounts = {
                state: web3.PublicKey;
                adminAuthority: web3.PublicKey;
            };
        }
        namespace ConfigMarinade {
            type Accounts = {
                state: web3.PublicKey;
                adminAuthority: web3.PublicKey;
            };
        }
        namespace OrderUnstake {
            type Accounts = {
                state: web3.PublicKey;
                msolMint: web3.PublicKey;
                burnMsolFrom: web3.PublicKey;
                burnMsolAuthority: web3.PublicKey;
                newTicketAccount: web3.PublicKey;
                clock: web3.PublicKey;
                rent: web3.PublicKey;
                tokenProgram: web3.PublicKey;
            };
        }
        namespace Claim {
            type Accounts = {
                state: web3.PublicKey;
                reservePda: web3.PublicKey;
                ticketAccount: web3.PublicKey;
                transferSolTo: web3.PublicKey;
                clock: web3.PublicKey;
                systemProgram: web3.PublicKey;
            };
        }
        namespace StakeReserve {
            type Accounts = {
                state: web3.PublicKey;
                validatorList: web3.PublicKey;
                stakeList: web3.PublicKey;
                validatorVote: web3.PublicKey;
                reservePda: web3.PublicKey;
                stakeAccount: web3.PublicKey;
                stakeDepositAuthority: web3.PublicKey;
                clock: web3.PublicKey;
                epochSchedule: web3.PublicKey;
                rent: web3.PublicKey;
                stakeHistory: web3.PublicKey;
                stakeConfig: web3.PublicKey;
                systemProgram: web3.PublicKey;
                stakeProgram: web3.PublicKey;
            };
        }
        namespace UpdateActive {
            type Accounts = {
                common: web3.PublicKey;
                validatorList: web3.PublicKey;
            };
        }
        namespace UpdateDeactivated {
            type Accounts = {
                common: web3.PublicKey;
                operationalSolAccount: web3.PublicKey;
                systemProgram: web3.PublicKey;
            };
        }
        namespace DeactivateStake {
            type Accounts = {
                state: web3.PublicKey;
                reservePda: web3.PublicKey;
                validatorList: web3.PublicKey;
                stakeList: web3.PublicKey;
                stakeAccount: web3.PublicKey;
                stakeDepositAuthority: web3.PublicKey;
                splitStakeAccount: web3.PublicKey;
                splitStakeRentPayer: web3.PublicKey;
                clock: web3.PublicKey;
                rent: web3.PublicKey;
                epochSchedule: web3.PublicKey;
                stakeHistory: web3.PublicKey;
                systemProgram: web3.PublicKey;
                stakeProgram: web3.PublicKey;
            };
        }
        namespace EmergencyUnstake {
            type Accounts = {
                state: web3.PublicKey;
                validatorManagerAuthority: web3.PublicKey;
                validatorList: web3.PublicKey;
                stakeList: web3.PublicKey;
                stakeAccount: web3.PublicKey;
                stakeDepositAuthority: web3.PublicKey;
                clock: web3.PublicKey;
                stakeProgram: web3.PublicKey;
            };
        }
        namespace MergeStakes {
            type Accounts = {
                state: web3.PublicKey;
                stakeList: web3.PublicKey;
                validatorList: web3.PublicKey;
                destinationStake: web3.PublicKey;
                sourceStake: web3.PublicKey;
                stakeDepositAuthority: web3.PublicKey;
                stakeWithdrawAuthority: web3.PublicKey;
                operationalSolAccount: web3.PublicKey;
                clock: web3.PublicKey;
                stakeHistory: web3.PublicKey;
                stakeProgram: web3.PublicKey;
            };
        }
    }
}
