"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MarinadeState = void 0;
const anchor_1 = require("@project-serum/anchor");
const borsh_1 = require("borsh");
const marinade_mint_1 = require("../marinade-mint/marinade-mint");
const util_1 = require("../util");
const StateHelper = __importStar(require("../util/state-helpers"));
const marinade_borsh_1 = require("./borsh/marinade-borsh");
const stake_record_1 = require("./borsh/stake-record");
const stake_state_1 = require("./borsh/stake-state");
const validator_record_1 = require("./borsh/validator-record");
const stake_info_1 = require("./borsh/stake-info");
class MarinadeState {
    // @todo rework args
    constructor(marinade, anchorProvider, state, marinadeStateAddress, marinadeFinanceProgramId) {
        this.marinade = marinade;
        this.anchorProvider = anchorProvider;
        this.state = state;
        this.marinadeStateAddress = marinadeStateAddress;
        this.marinadeFinanceProgramId = marinadeFinanceProgramId;
        this.reserveAddress = () => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("reserve" /* RESERVE_ACCOUNT */); });
        this.mSolPrice = this.state.msolPrice.toNumber() / 4294967296;
        this.mSolMintAddress = this.state.msolMint;
        this.mSolMint = marinade_mint_1.MarinadeMint.build(this.anchorProvider, this.mSolMintAddress);
        this.mSolMintAuthority = () => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("st_mint" /* LIQ_POOL_MSOL_MINT_AUTHORITY */); });
        this.mSolLegAuthority = () => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("liq_st_sol_authority" /* LIQ_POOL_MSOL_AUTHORITY */); });
        this.mSolLeg = this.state.liqPool.msolLeg;
        this.lpMintAddress = this.state.liqPool.lpMint;
        this.lpMint = marinade_mint_1.MarinadeMint.build(this.anchorProvider, this.lpMintAddress);
        this.lpMintAuthority = () => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("liq_mint" /* LIQ_POOL_MINT_AUTHORITY */); });
        this.solLeg = () => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("liq_sol" /* LIQ_POOL_SOL_ACCOUNT */); });
        this.validatorDuplicationFlag = (validatorAddress) => __awaiter(this, void 0, void 0, function* () { return this.findProgramDerivedAddress("unique_validator" /* UNIQUE_VALIDATOR */, [validatorAddress.toBuffer()]); });
        this.epochInfo = () => __awaiter(this, void 0, void 0, function* () { return this.anchorProvider.connection.getEpochInfo(); });
        this.treasuryMsolAccount = this.state.treasuryMsolAccount;
        /**
         * Commission in %
         */
        this.rewardsCommissionPercent = this.state.rewardFee.basisPoints / 100;
    }
    static fetch(marinade) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marinadeFinanceProgram, config } = marinade;
            const state = yield marinadeFinanceProgram.program.account.state.fetch(config.marinadeStateAddress);
            return new MarinadeState(marinade, marinade.provider, state, config.marinadeStateAddress, config.marinadeFinanceProgramId);
        });
    }
    findProgramDerivedAddress(seed, extraSeeds = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const seeds = [this.marinade.config.marinadeStateAddress.toBuffer(), Buffer.from(seed), ...extraSeeds];
            const [result] = yield anchor_1.web3.PublicKey.findProgramAddress(seeds, this.marinade.config.marinadeFinanceProgramId);
            return result;
        });
    }
    unstakeNowFeeBp(lamportsToObtain) {
        return __awaiter(this, void 0, void 0, function* () {
            const solLeg = yield this.solLeg();
            const solLegBalance = yield this.anchorProvider.connection.getBalance(solLeg);
            const maxLamports = new anchor_1.BN(solLegBalance).sub(this.state.rentExemptForTokenAcc);
            return StateHelper.unstakeNowFeeBp(this.state.liqPool.lpMinFee.basisPoints, this.state.liqPool.lpMaxFee.basisPoints, this.state.liqPool.lpLiquidityTarget, maxLamports, lamportsToObtain);
        });
    }
    // stakeDelta is roughly: stake-orders (deposits) minus unstake-orders during the epoch.
    // before the end of the epoch, the bot will perform staking, if stakeDelta is positive,
    // or unstaking, if stakeDelta is negative.
    stakeDelta() {
        // Source: Rust main code: pub fn stake_delta(&self, reserve_balance: u64) -> i128
        // Never try to stake lamports from emergency_cooling_down
        // (we must wait for update-deactivated first to keep SOLs for claiming on reserve)
        // But if we need to unstake without counting emergency_cooling_down and we have emergency cooling down
        // then we can count part of emergency stakes as starting to cooling down delayed unstakes
        // preventing unstake duplication by recalculating stake-delta for negative values
        // OK. Lets get stake_delta without emergency first
        const raw = this.state.availableReserveBalance.sub(this.state.rentExemptForTokenAcc)
            .add(this.state.stakeSystem.delayedUnstakeCoolingDown)
            .sub(this.state.circulatingTicketBalance);
        if (!raw.isNeg() || raw.isZero()) {
            // When it >= 0 it is right value to use
            return raw;
        }
        else {
            // Otherwise try to recalculate it with emergency
            const withEmergency = raw.add(this.state.emergencyCoolingDown);
            // And make sure it will not become positive
            if (withEmergency.isNeg()) {
                return withEmergency;
            }
            return new anchor_1.BN(0);
        }
    }
    /**
     * return validatorRecords with capacity
     */
    getValidatorRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const { validatorList } = this.state.validatorSystem;
            const recordBounds = (index) => (0, util_1.bounds)(index, validatorList.itemSize, 8);
            const validators = yield this.anchorProvider.connection.getAccountInfo(validatorList.account);
            if (!validators) {
                throw new Error(`Failed to fetch validators' details!`);
            }
            return {
                validatorRecords: Array.from({ length: validatorList.count }, (_, index) => {
                    return (0, borsh_1.deserializeUnchecked)(marinade_borsh_1.MARINADE_BORSH_SCHEMA, validator_record_1.ValidatorRecord, validators.data.slice(...recordBounds(index)));
                }),
                capacity: (validators.data.length - 8) / validatorList.itemSize,
            };
        });
    }
    /**
     * return stakeRecords with capacity
     */
    getStakeRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            const { stakeList } = this.state.stakeSystem;
            const recordBounds = (index) => (0, util_1.bounds)(index, stakeList.itemSize, 8);
            const stakes = yield this.anchorProvider.connection.getAccountInfo(stakeList.account);
            if (!stakes) {
                throw new Error(`Failed to fetch stakes' details!`);
            }
            return {
                stakeRecords: Array.from({ length: stakeList.count }, (_, index) => {
                    return (0, borsh_1.deserializeUnchecked)(marinade_borsh_1.MARINADE_BORSH_SCHEMA, stake_record_1.StakeRecord, stakes.data.slice(...recordBounds(index)));
                }), capacity: (stakes.data.length - 8) / stakeList.itemSize,
            };
        });
    }
    getStakeStates() {
        return __awaiter(this, void 0, void 0, function* () {
            const stakeAccountInfos = yield this.anchorProvider.connection.getProgramAccounts(util_1.STAKE_PROGRAM_ID, {
                filters: [
                    { dataSize: 200 },
                    {
                        memcmp: {
                            offset: 44,
                            bytes: this.marinade.config.stakeWithdrawAuthPDA.toString(),
                        },
                    },
                ],
            });
            return stakeAccountInfos.map((stakeAccountInfo) => {
                const { data } = stakeAccountInfo.account;
                // The data's first 4 bytes are: u8 0x0 0x0 0x0 but borsh uses only the first byte to find the enum's value index.
                // The next 3 bytes are unused and we need to get rid of them (or somehow fix the BORSH schema?)
                const adjustedData = Buffer.concat([
                    data.slice(0, 1),
                    data.slice(4, data.length), // the first byte indexing the enum
                ]);
                return (0, borsh_1.deserializeUnchecked)(marinade_borsh_1.MARINADE_BORSH_SCHEMA, stake_state_1.StakeState, adjustedData);
            });
        });
    }
    /**
     * return listStakeInfos with capacity
     */
    getStakeInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { stakeRecords, capacity } = yield this.getStakeRecords();
            const stakeInfos = new Array();
            const toProcess = stakeRecords.length;
            let processed = 0;
            // rpc.get_multiple_accounts() has a max of 100 accounts
            const BATCH_SIZE = 100;
            while (processed < toProcess) {
                const accountInfos = yield this.anchorProvider.connection.getMultipleAccountsInfo(stakeRecords
                    .slice(processed, processed + BATCH_SIZE)
                    .map(stakeRecord => stakeRecord.stakeAccount));
                stakeInfos.push(...accountInfos.map((accountInfo, index) => {
                    const adjustedData = Buffer.concat([
                        accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data.slice(0, 1),
                        accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data.slice(4, accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.data.length),
                    ]);
                    return new stake_info_1.StakeInfo({
                        index: processed + index,
                        record: stakeRecords[processed + index],
                        stake: (0, borsh_1.deserializeUnchecked)(marinade_borsh_1.MARINADE_BORSH_SCHEMA, stake_state_1.StakeState, adjustedData),
                        balance: new anchor_1.BN(accountInfo.lamports),
                    });
                }));
                processed += BATCH_SIZE;
            }
            return { stakeInfos: stakeInfos, capacity: capacity };
        });
    }
}
exports.MarinadeState = MarinadeState;
//# sourceMappingURL=marinade-state.js.map