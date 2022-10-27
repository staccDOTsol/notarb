"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marinade = void 0;
const marinade_config_1 = require("./config/marinade-config");
const anchor_1 = require("@project-serum/anchor");
const marinade_state_1 = require("./marinade-state/marinade-state");
const anchor_2 = require("./util/anchor");
const marinade_finance_program_1 = require("./programs/marinade-finance-program");
const marinade_referral_program_1 = require("./programs/marinade-referral-program");
const marinade_referral_partner_state_1 = require("./marinade-referral-state/marinade-referral-partner-state");
const marinade_referral_global_state_1 = require("./marinade-referral-state/marinade-referral-global-state");
const assert_1 = require("./util/assert");
const util_1 = require("./util");
class Marinade {
    constructor(config = new marinade_config_1.MarinadeConfig()) {
        this.config = config;
        this.provider = new anchor_1.Provider(this.config.connection, new anchor_1.Wallet(anchor_1.web3.Keypair.generate()), { commitment: 'confirmed' });
        /**
         * The main Marinade Program
         */
        this.marinadeFinanceProgram = new marinade_finance_program_1.MarinadeFinanceProgram(this.config.marinadeFinanceProgramId, this.provider);
        /**
         * The Marinade Program for referral partners
         */
        this.marinadeReferralProgram = new marinade_referral_program_1.MarinadeReferralProgram(this.config.marinadeReferralProgramId, this.provider, this.config.referralCode);
    }
    provideReferralOrMainProgram() {
        return this.config.referralCode ? this.marinadeReferralProgram : this.marinadeFinanceProgram;
    }
    /**
     * Fetch the Marinade's internal state
     */
    getMarinadeState() {
        return __awaiter(this, void 0, void 0, function* () {
            return marinade_state_1.MarinadeState.fetch(this);
        });
    }
    /**
     * Fetch the Marinade referral partner's state
     */
    getReferralPartnerState() {
        return __awaiter(this, void 0, void 0, function* () {
            return marinade_referral_partner_state_1.MarinadeReferralPartnerState.fetch(this);
        });
    }
    /**
     * Fetch the Marinade referral program's global state
     */
    getReferralGlobalState() {
        return __awaiter(this, void 0, void 0, function* () {
            return marinade_referral_global_state_1.MarinadeReferralGlobalState.fetch(this);
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Add liquidity to the liquidity pool and receive LP tokens
     *
     * @param {BN} amountLamports - The amount of lamports added to the liquidity pool
     */
    addLiquidity(amountLamports) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerAddress = (0, assert_1.assertNotNullAndReturn)(this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const marinadeState = yield this.getMarinadeState();
            const transaction = new anchor_1.web3.Transaction();
            const { associatedTokenAccountAddress: associatedLPTokenAccountAddress, createAssociateTokenInstruction, } = yield (0, anchor_2.getOrCreateAssociatedTokenAccount)(this.provider, marinadeState.lpMintAddress, ownerAddress);
            if (createAssociateTokenInstruction) {
                transaction.add(createAssociateTokenInstruction);
            }
            const addLiquidityInstruction = this.marinadeFinanceProgram.addLiquidityInstruction({
                amountLamports,
                accounts: yield this.marinadeFinanceProgram.addLiquidityInstructionAccounts({
                    marinadeState,
                    associatedLPTokenAccountAddress,
                    ownerAddress,
                }),
            });
            transaction.add(addLiquidityInstruction);
            return {
                associatedLPTokenAccountAddress,
                transaction,
            };
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Burn LP tokens and get SOL and mSOL back from the liquidity pool
     *
     * @param {BN} amountLamports - The amount of LP tokens burned
     */
    removeLiquidity(amountLamports) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerAddress = (0, assert_1.assertNotNullAndReturn)(this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const marinadeState = yield this.getMarinadeState();
            const transaction = new anchor_1.web3.Transaction();
            const associatedLPTokenAccountAddress = yield (0, anchor_2.getAssociatedTokenAccountAddress)(marinadeState.lpMintAddress, ownerAddress);
            const { associatedTokenAccountAddress: associatedMSolTokenAccountAddress, createAssociateTokenInstruction, } = yield (0, anchor_2.getOrCreateAssociatedTokenAccount)(this.provider, marinadeState.mSolMintAddress, ownerAddress);
            if (createAssociateTokenInstruction) {
                transaction.add(createAssociateTokenInstruction);
            }
            const removeLiquidityInstruction = this.marinadeFinanceProgram.removeLiquidityInstruction({
                amountLamports,
                accounts: yield this.marinadeFinanceProgram.removeLiquidityInstructionAccounts({
                    marinadeState,
                    ownerAddress,
                    associatedLPTokenAccountAddress,
                    associatedMSolTokenAccountAddress,
                }),
            });
            transaction.add(removeLiquidityInstruction);
            return {
                associatedLPTokenAccountAddress,
                associatedMSolTokenAccountAddress,
                transaction,
            };
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Stake SOL in exchange for mSOL
     *
     * @param {BN} amountLamports - The amount lamports staked
     * @param {DepositOptions=} options - Additional deposit options
     */
    deposit(amountLamports, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const feePayer = (0, assert_1.assertNotNullAndReturn)(this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const mintToOwnerAddress = (0, assert_1.assertNotNullAndReturn)((_a = options.mintToOwnerAddress) !== null && _a !== void 0 ? _a : this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const marinadeState = yield this.getMarinadeState();
            const transaction = new anchor_1.web3.Transaction();
            const { associatedTokenAccountAddress: associatedMSolTokenAccountAddress, createAssociateTokenInstruction, } = yield (0, anchor_2.getOrCreateAssociatedTokenAccount)(this.provider, marinadeState.mSolMintAddress, mintToOwnerAddress, feePayer);
            if (createAssociateTokenInstruction) {
                transaction.add(createAssociateTokenInstruction);
            }
            const program = this.provideReferralOrMainProgram();
            const depositInstruction = yield program.depositInstructionBuilder({
                amountLamports,
                marinadeState,
                transferFrom: feePayer,
                associatedMSolTokenAccountAddress,
            });
            transaction.add(depositInstruction);
            return {
                associatedMSolTokenAccountAddress,
                transaction,
            };
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Swap your mSOL to get back SOL immediately using the liquidity pool
     *
     * @param {BN} amountLamports - The amount of mSOL exchanged for SOL
     */
    liquidUnstake(amountLamports, associatedMSolTokenAccountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerAddress = (0, assert_1.assertNotNullAndReturn)(this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const marinadeState = yield this.getMarinadeState();
            const transaction = new anchor_1.web3.Transaction();
            if (!associatedMSolTokenAccountAddress) {
                const associatedTokenAccountInfos = yield (0, anchor_2.getOrCreateAssociatedTokenAccount)(this.provider, marinadeState.mSolMintAddress, ownerAddress);
                const createAssociateTokenInstruction = associatedTokenAccountInfos.createAssociateTokenInstruction;
                associatedMSolTokenAccountAddress = associatedTokenAccountInfos.associatedTokenAccountAddress;
                if (createAssociateTokenInstruction) {
                    transaction.add(createAssociateTokenInstruction);
                }
            }
            const program = this.provideReferralOrMainProgram();
            const liquidUnstakeInstruction = yield program.liquidUnstakeInstructionBuilder({
                amountLamports,
                marinadeState,
                ownerAddress,
                associatedMSolTokenAccountAddress,
            });
            transaction.add(liquidUnstakeInstruction);
            return {
                associatedMSolTokenAccountAddress,
                transaction,
            };
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Deposit a delegated stake account.
     * Note that the stake must be fully activated and the validator must be known to Marinade
     *
     * @param {web3.PublicKey} stakeAccountAddress - The account to be deposited
     */
    depositStakeAccount(stakeAccountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerAddress = (0, assert_1.assertNotNullAndReturn)(this.config.publicKey, "User's public key must be provided in the configuration!" /* NO_PUBLIC_KEY */);
            const marinadeState = yield this.getMarinadeState();
            const transaction = new anchor_1.web3.Transaction();
            const currentEpoch = yield this.provider.connection.getEpochInfo();
            const stakeAccountInfo = yield (0, anchor_2.getParsedStakeAccountInfo)(this.provider, stakeAccountAddress);
            const { authorizedWithdrawerAddress, voterAddress, activationEpoch, isCoolingDown } = stakeAccountInfo;
            if (!authorizedWithdrawerAddress) {
                throw new Error('Withdrawer address is not available!');
            }
            if (!activationEpoch || !voterAddress) {
                throw new Error('The stake account is not delegated!');
            }
            if (isCoolingDown) {
                throw new Error('The stake is cooling down!');
            }
            const waitEpochs = 2;
            const earliestDepositEpoch = activationEpoch.addn(waitEpochs);
            if (earliestDepositEpoch.gtn(currentEpoch.epoch)) {
                throw new Error(`Deposited stake ${stakeAccountAddress} is not activated yet. Wait for #${earliestDepositEpoch} epoch`);
            }
            const { validatorRecords } = yield marinadeState.getValidatorRecords();
            const validatorLookupIndex = validatorRecords.findIndex(({ validatorAccount }) => validatorAccount.equals(voterAddress));
            const validatorIndex = validatorLookupIndex === -1 ? marinadeState.state.validatorSystem.validatorList.count : validatorLookupIndex;
            const duplicationFlag = yield marinadeState.validatorDuplicationFlag(voterAddress);
            const { associatedTokenAccountAddress: associatedMSolTokenAccountAddress, createAssociateTokenInstruction, } = yield (0, anchor_2.getOrCreateAssociatedTokenAccount)(this.provider, marinadeState.mSolMintAddress, ownerAddress);
            if (createAssociateTokenInstruction) {
                transaction.add(createAssociateTokenInstruction);
            }
            const program = this.provideReferralOrMainProgram();
            const depositStakeAccountInstruction = yield program.depositStakeAccountInstructionBuilder({
                validatorIndex,
                marinadeState,
                duplicationFlag,
                authorizedWithdrawerAddress,
                associatedMSolTokenAccountAddress,
                ownerAddress,
                stakeAccountAddress,
            });
            transaction.add(depositStakeAccountInstruction);
            return {
                associatedMSolTokenAccountAddress,
                voterAddress,
                transaction,
                mintRatio: marinadeState.mSolPrice,
            };
        });
    }
    /**
     * Returns a transaction with the instructions to
     * Liquidate a delegated stake account.
     * Note that the stake must be fully activated and the validator must be known to Marinade
     * and that the transaction should be executed immidiately after creation.
     *
     * @param {web3.PublicKey} stakeAccountAddress - The account to be deposited
     * @param {BN} mSolToKeep - Optional amount of mSOL lamports to keep
     */
    liquidateStakeAccount(stakeAccountAddress, mSolToKeep) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalBalance = yield this.provider.connection.getBalance(stakeAccountAddress);
            const rent = yield this.provider.connection.getMinimumBalanceForRentExemption(anchor_1.web3.StakeProgram.space);
            const stakeBalance = new anchor_1.BN(totalBalance - rent);
            const marinadeState = yield this.getMarinadeState();
            const { transaction: depositTx, associatedMSolTokenAccountAddress, voterAddress } = yield this.depositStakeAccount(stakeAccountAddress);
            const availableMsol = (0, util_1.computeMsolAmount)(stakeBalance, marinadeState);
            const unstakeAmount = availableMsol.sub(mSolToKeep !== null && mSolToKeep !== void 0 ? mSolToKeep : new anchor_1.BN(0));
            const { transaction: unstakeTx } = yield this.liquidUnstake(unstakeAmount, associatedMSolTokenAccountAddress);
            return {
                transaction: depositTx.add(unstakeTx),
                associatedMSolTokenAccountAddress,
                voterAddress,
            };
        });
    }
    /**
     * @todo
     */
    getDelayedUnstakeTickets(beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.marinadeFinanceProgram.getDelayedUnstakeTickets(beneficiary);
        });
    }
    /**
     * Returns estimated Due date for an unstake ticket created now
     *
     */
    getEstimatedUnstakeTicketDueDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const marinadeState = yield this.getMarinadeState();
            return this.marinadeFinanceProgram.getEstimatedUnstakeTicketDueDate(marinadeState);
        });
    }
}
exports.Marinade = Marinade;
//# sourceMappingURL=marinade.js.map