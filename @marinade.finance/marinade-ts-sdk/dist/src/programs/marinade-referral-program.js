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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarinadeReferralProgram = void 0;
const anchor_1 = require("@project-serum/anchor");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const util_1 = require("../util");
const assert_1 = require("../util/assert");
const marinadeReferralIdlSchema = __importStar(require("./idl/marinade-referral-idl.json"));
class MarinadeReferralProgram {
    constructor(programAddress, anchorProvider, referralState) {
        this.programAddress = programAddress;
        this.anchorProvider = anchorProvider;
        this.referralState = referralState;
        this.liquidUnstakeInstructionAccounts = ({ marinadeState, ownerAddress, associatedMSolTokenAccountAddress }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                marinadeFinanceProgram: marinadeState.marinadeFinanceProgramId,
                state: marinadeState.marinadeStateAddress,
                referralState: (0, assert_1.assertNotNullAndReturn)(this.referralState, 'The referral code must be provided!'),
                msolMint: marinadeState.mSolMintAddress,
                liqPoolMsolLeg: marinadeState.mSolLeg,
                liqPoolSolLegPda: yield marinadeState.solLeg(),
                getMsolFrom: associatedMSolTokenAccountAddress,
                getMsolFromAuthority: ownerAddress,
                transferSolTo: ownerAddress,
                treasuryMsolAccount: marinadeState.treasuryMsolAccount,
                systemProgram: util_1.SYSTEM_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            });
        });
        this.liquidUnstakeInstruction = ({ accounts, amountLamports }) => this.program.instruction.liquidUnstake(amountLamports, { accounts });
        this.liquidUnstakeInstructionBuilder = (_a) => __awaiter(this, void 0, void 0, function* () {
            var { amountLamports } = _a, accountsArgs = __rest(_a, ["amountLamports"]);
            return this.liquidUnstakeInstruction({
                amountLamports,
                accounts: yield this.liquidUnstakeInstructionAccounts(accountsArgs),
            });
        });
        this.depositInstructionAccounts = ({ marinadeState, transferFrom, associatedMSolTokenAccountAddress }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                reservePda: yield marinadeState.reserveAddress(),
                marinadeFinanceProgram: marinadeState.marinadeFinanceProgramId,
                referralState: (0, assert_1.assertNotNullAndReturn)(this.referralState, 'The referral code must be provided!'),
                state: marinadeState.marinadeStateAddress,
                msolMint: marinadeState.mSolMintAddress,
                msolMintAuthority: yield marinadeState.mSolMintAuthority(),
                liqPoolMsolLegAuthority: yield marinadeState.mSolLegAuthority(),
                liqPoolMsolLeg: marinadeState.mSolLeg,
                liqPoolSolLegPda: yield marinadeState.solLeg(),
                mintTo: associatedMSolTokenAccountAddress,
                transferFrom,
                systemProgram: util_1.SYSTEM_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            });
        });
        this.depositInstruction = ({ accounts, amountLamports }) => this.program.instruction.deposit(amountLamports, { accounts });
        this.depositInstructionBuilder = (_b) => __awaiter(this, void 0, void 0, function* () {
            var { amountLamports } = _b, accountsArgs = __rest(_b, ["amountLamports"]);
            return this.depositInstruction({
                amountLamports,
                accounts: yield this.depositInstructionAccounts(accountsArgs),
            });
        });
        this.depositStakeAccountInstructionAccounts = ({ marinadeState, duplicationFlag, ownerAddress, stakeAccountAddress, authorizedWithdrawerAddress, associatedMSolTokenAccountAddress, }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                duplicationFlag,
                stakeAuthority: authorizedWithdrawerAddress,
                state: marinadeState.marinadeStateAddress,
                marinadeFinanceProgram: marinadeState.marinadeFinanceProgramId,
                referralState: (0, assert_1.assertNotNullAndReturn)(this.referralState, 'The referral code must be provided!'),
                stakeList: marinadeState.state.stakeSystem.stakeList.account,
                stakeAccount: stakeAccountAddress,
                validatorList: marinadeState.state.validatorSystem.validatorList.account,
                msolMint: marinadeState.mSolMintAddress,
                msolMintAuthority: yield marinadeState.mSolMintAuthority(),
                mintTo: associatedMSolTokenAccountAddress,
                rentPayer: ownerAddress,
                clock: web3_js_1.SYSVAR_CLOCK_PUBKEY,
                rent: web3_js_1.SYSVAR_RENT_PUBKEY,
                systemProgram: util_1.SYSTEM_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                stakeProgram: util_1.STAKE_PROGRAM_ID,
            });
        });
        this.depositStakeAccountInstruction = ({ accounts, validatorIndex }) => this.program.instruction.depositStakeAccount(validatorIndex, { accounts });
        this.depositStakeAccountInstructionBuilder = (_c) => __awaiter(this, void 0, void 0, function* () {
            var { validatorIndex } = _c, accountsArgs = __rest(_c, ["validatorIndex"]);
            return this.depositStakeAccountInstruction({
                validatorIndex,
                accounts: yield this.depositStakeAccountInstructionAccounts(accountsArgs),
            });
        });
    }
    get program() {
        return new anchor_1.Program(marinadeReferralIdlSchema, this.programAddress, this.anchorProvider);
    }
}
exports.MarinadeReferralProgram = MarinadeReferralProgram;
//# sourceMappingURL=marinade-referral-program.js.map