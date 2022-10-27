import { BN, Program, web3, Provider } from '@project-serum/anchor';
import { MarinadeFinanceIdl } from './idl/marinade-finance-idl';
import { MarinadeState } from '../marinade-state/marinade-state';
import { TicketAccount } from '../marinade-state/borsh/ticket-account';
export declare class MarinadeFinanceProgram {
    readonly programAddress: web3.PublicKey;
    readonly anchorProvider: Provider;
    constructor(programAddress: web3.PublicKey, anchorProvider: Provider);
    get program(): Program;
    getDelayedUnstakeTickets(beneficiary?: web3.PublicKey): Promise<Map<web3.PublicKey, TicketAccount>>;
    getEstimatedUnstakeTicketDueDate: (marinadeState: MarinadeState) => Promise<import("../util/ticket-date-info.types").TicketDateInfo>;
    addLiquidityInstructionAccounts: ({ marinadeState, ownerAddress, associatedLPTokenAccountAddress }: {
        marinadeState: MarinadeState;
        ownerAddress: web3.PublicKey;
        associatedLPTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeFinanceIdl.Instruction.AddLiquidity.Accounts>;
    addLiquidityInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeFinanceIdl.Instruction.AddLiquidity.Accounts;
        amountLamports: BN;
    }) => web3.TransactionInstruction;
    removeLiquidityInstructionAccounts: ({ marinadeState, ownerAddress, associatedLPTokenAccountAddress, associatedMSolTokenAccountAddress }: {
        marinadeState: MarinadeState;
        ownerAddress: web3.PublicKey;
        associatedLPTokenAccountAddress: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeFinanceIdl.Instruction.RemoveLiquidity.Accounts>;
    removeLiquidityInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeFinanceIdl.Instruction.RemoveLiquidity.Accounts;
        amountLamports: BN;
    }) => web3.TransactionInstruction;
    liquidUnstakeInstructionAccounts: ({ marinadeState, ownerAddress, associatedMSolTokenAccountAddress }: {
        marinadeState: MarinadeState;
        ownerAddress: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeFinanceIdl.Instruction.LiquidUnstake.Accounts>;
    liquidUnstakeInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeFinanceIdl.Instruction.LiquidUnstake.Accounts;
        amountLamports: BN;
    }) => web3.TransactionInstruction;
    liquidUnstakeInstructionBuilder: ({ amountLamports, ...accountsArgs }: {
        amountLamports: BN;
    } & Parameters<this["liquidUnstakeInstructionAccounts"]>[0]) => Promise<web3.TransactionInstruction>;
    depositInstructionAccounts: ({ marinadeState, transferFrom, associatedMSolTokenAccountAddress }: {
        marinadeState: MarinadeState;
        transferFrom: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
    }) => Promise<MarinadeFinanceIdl.Instruction.Deposit.Accounts>;
    depositInstruction: ({ accounts, amountLamports }: {
        accounts: MarinadeFinanceIdl.Instruction.Deposit.Accounts;
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
    }) => Promise<MarinadeFinanceIdl.Instruction.DepositStakeAccount.Accounts>;
    depositStakeAccountInstruction: ({ accounts, validatorIndex }: {
        accounts: MarinadeFinanceIdl.Instruction.DepositStakeAccount.Accounts;
        validatorIndex: number;
    }) => web3.TransactionInstruction;
    depositStakeAccountInstructionBuilder: ({ validatorIndex, ...accountsArgs }: {
        validatorIndex: number;
    } & Parameters<this["depositStakeAccountInstructionAccounts"]>[0]) => Promise<web3.TransactionInstruction>;
}
