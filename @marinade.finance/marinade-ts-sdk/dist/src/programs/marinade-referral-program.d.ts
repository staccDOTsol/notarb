import { BN, Program, Provider, web3 } from '@project-serum/anchor';
import { MarinadeState } from '../marinade-state/marinade-state';
import { MarinadeReferralIdl } from './idl/marinade-referral-idl';
export declare class MarinadeReferralProgram {
    readonly programAddress: web3.PublicKey;
    readonly anchorProvider: Provider;
    readonly referralState: web3.PublicKey | null;
    constructor(programAddress: web3.PublicKey, anchorProvider: Provider, referralState: web3.PublicKey | null);
    get program(): Program;
    liquidUnstakeInstructionAccounts: ({ marinadeState, ownerAddress, associatedMSolTokenAccountAddress }: {
        marinadeState: MarinadeState;
        ownerAddress: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeReferralIdl.Instruction.LiquidUnstake.Accounts>;
    liquidUnstakeInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeReferralIdl.Instruction.LiquidUnstake.Accounts;
        amountLamports: BN;
    }) => web3.TransactionInstruction;
    liquidUnstakeInstructionBuilder: ({ amountLamports, ...accountsArgs }: {
        amountLamports: BN;
    } & Parameters<this["liquidUnstakeInstructionAccounts"]>[0]) => Promise<web3.TransactionInstruction>;
    depositInstructionAccounts: ({ marinadeState, transferFrom, associatedMSolTokenAccountAddress }: {
        marinadeState: MarinadeState;
        transferFrom: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeReferralIdl.Instruction.Deposit.Accounts>;
    depositInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeReferralIdl.Instruction.Deposit.Accounts;
        amountLamports: BN;
    }) => web3.TransactionInstruction;
    depositInstructionBuilder: ({ amountLamports, ...accountsArgs }: {
        amountLamports: BN;
    } & Parameters<this["depositInstructionAccounts"]>[0]) => Promise<web3.TransactionInstruction>;
    depositStakeAccountInstructionAccounts: ({ marinadeState, duplicationFlag, ownerAddress, stakeAccountAddress, authorizedWithdrawerAddress, associatedMSolTokenAccountAddress, }: {
        marinadeState: MarinadeState;
        duplicationFlag: web3.PublicKey;
        ownerAddress: web3.PublicKey;
        stakeAccountAddress: web3.PublicKey;
        authorizedWithdrawerAddress: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeReferralIdl.Instruction.DepositStakeAccount.Accounts>;
    depositStakeAccountInstruction: ({ accounts, validatorIndex }: {
        accounts: MarinadeReferralIdl.Instruction.DepositStakeAccount.Accounts;
        validatorIndex: number;
    }) => web3.TransactionInstruction;
    depositStakeAccountInstructionBuilder: ({ validatorIndex, ...accountsArgs }: {
        validatorIndex: number;
    } & Parameters<this["depositStakeAccountInstructionAccounts"]>[0]) => Promise<web3.TransactionInstruction>;
}
