/// <reference types="bn.js" />
import { MarinadeConfig } from './config/marinade-config';
import { BN, Provider, web3 } from '@project-serum/anchor';
import { MarinadeState } from './marinade-state/marinade-state';
import { DepositOptions, MarinadeResult } from './marinade.types';
import { MarinadeFinanceProgram } from './programs/marinade-finance-program';
import { MarinadeReferralProgram } from './programs/marinade-referral-program';
import { MarinadeReferralPartnerState } from './marinade-referral-state/marinade-referral-partner-state';
import { MarinadeReferralGlobalState } from './marinade-referral-state/marinade-referral-global-state';
import { TicketAccount } from './marinade-state/borsh/ticket-account';
export declare class Marinade {
    readonly config: MarinadeConfig;
    constructor(config?: MarinadeConfig);
    readonly provider: Provider;
    /**
     * The main Marinade Program
     */
    readonly marinadeFinanceProgram: MarinadeFinanceProgram;
    /**
     * The Marinade Program for referral partners
     */
    readonly marinadeReferralProgram: MarinadeReferralProgram;
    private provideReferralOrMainProgram;
    /**
     * Fetch the Marinade's internal state
     */
    getMarinadeState(): Promise<MarinadeState>;
    /**
     * Fetch the Marinade referral partner's state
     */
    getReferralPartnerState(): Promise<MarinadeReferralPartnerState>;
    /**
     * Fetch the Marinade referral program's global state
     */
    getReferralGlobalState(): Promise<MarinadeReferralGlobalState>;
    /**
     * Returns a transaction with the instructions to
     * Add liquidity to the liquidity pool and receive LP tokens
     *
     * @param {BN} amountLamports - The amount of lamports added to the liquidity pool
     */
    addLiquidity(amountLamports: BN): Promise<MarinadeResult.AddLiquidity>;
    /**
     * Returns a transaction with the instructions to
     * Burn LP tokens and get SOL and mSOL back from the liquidity pool
     *
     * @param {BN} amountLamports - The amount of LP tokens burned
     */
    removeLiquidity(amountLamports: BN): Promise<MarinadeResult.RemoveLiquidity>;
    /**
     * Returns a transaction with the instructions to
     * Stake SOL in exchange for mSOL
     *
     * @param {BN} amountLamports - The amount lamports staked
     * @param {DepositOptions=} options - Additional deposit options
     */
    deposit(amountLamports: BN, options?: DepositOptions): Promise<MarinadeResult.Deposit>;
    /**
     * Returns a transaction with the instructions to
     * Swap your mSOL to get back SOL immediately using the liquidity pool
     *
     * @param {BN} amountLamports - The amount of mSOL exchanged for SOL
     */
    liquidUnstake(amountLamports: BN, associatedMSolTokenAccountAddress?: web3.PublicKey): Promise<MarinadeResult.LiquidUnstake>;
    /**
     * Returns a transaction with the instructions to
     * Deposit a delegated stake account.
     * Note that the stake must be fully activated and the validator must be known to Marinade
     *
     * @param {web3.PublicKey} stakeAccountAddress - The account to be deposited
     */
    depositStakeAccount(stakeAccountAddress: web3.PublicKey): Promise<MarinadeResult.DepositStakeAccount>;
    /**
     * Returns a transaction with the instructions to
     * Liquidate a delegated stake account.
     * Note that the stake must be fully activated and the validator must be known to Marinade
     * and that the transaction should be executed immidiately after creation.
     *
     * @param {web3.PublicKey} stakeAccountAddress - The account to be deposited
     * @param {BN} mSolToKeep - Optional amount of mSOL lamports to keep
     */
    liquidateStakeAccount(stakeAccountAddress: web3.PublicKey, mSolToKeep?: BN): Promise<MarinadeResult.LiquidateStakeAccount>;
    /**
     * @todo
     */
    getDelayedUnstakeTickets(beneficiary?: web3.PublicKey): Promise<Map<web3.PublicKey, TicketAccount>>;
    /**
     * Returns estimated Due date for an unstake ticket created now
     *
     */
    getEstimatedUnstakeTicketDueDate(): Promise<import("./util/ticket-date-info.types").TicketDateInfo>;
}
