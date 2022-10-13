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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarinadeFinanceProgram = void 0;
const bs58_1 = __importDefault(require("bs58"));
const anchor_1 = require("@project-serum/anchor");
const marinadeFinanceIdlSchema = __importStar(require("./idl/marinade-finance-idl.json"));
const util_1 = require("../util");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("../marinade-state/borsh");
const borsh_2 = require("borsh");
const ticket_account_1 = require("../marinade-state/borsh/ticket-account");
class MarinadeFinanceProgram {
    constructor(programAddress, anchorProvider) {
        this.programAddress = programAddress;
        this.anchorProvider = anchorProvider;
        // Estimate due date if a ticket would be created right now
        this.getEstimatedUnstakeTicketDueDate = (marinadeState) => __awaiter(this, void 0, void 0, function* () {
            const epochInfo = yield (0, util_1.getEpochInfo)(this.anchorProvider.connection);
            return (0, util_1.estimateTicketDateInfo)(epochInfo, Date.now(), marinadeState.state.stakeSystem.slotsForStakeDelta.toNumber());
        });
        this.addLiquidityInstructionAccounts = ({ marinadeState, ownerAddress, associatedLPTokenAccountAddress }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                state: marinadeState.marinadeStateAddress,
                lpMint: marinadeState.lpMintAddress,
                lpMintAuthority: yield marinadeState.lpMintAuthority(),
                liqPoolMsolLeg: marinadeState.mSolLeg,
                liqPoolSolLegPda: yield marinadeState.solLeg(),
                transferFrom: ownerAddress,
                mintTo: associatedLPTokenAccountAddress,
                systemProgram: util_1.SYSTEM_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            });
        });
        this.addLiquidityInstruction = ({ accounts, amountLamports }) => this.program.instruction.addLiquidity(amountLamports, { accounts });
        this.removeLiquidityInstructionAccounts = ({ marinadeState, ownerAddress, associatedLPTokenAccountAddress, associatedMSolTokenAccountAddress }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                state: marinadeState.marinadeStateAddress,
                lpMint: marinadeState.lpMintAddress,
                burnFrom: associatedLPTokenAccountAddress,
                burnFromAuthority: ownerAddress,
                liqPoolSolLegPda: yield marinadeState.solLeg(),
                transferSolTo: ownerAddress,
                transferMsolTo: associatedMSolTokenAccountAddress,
                liqPoolMsolLeg: marinadeState.mSolLeg,
                liqPoolMsolLegAuthority: yield marinadeState.mSolLegAuthority(),
                systemProgram: util_1.SYSTEM_PROGRAM_ID,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            });
        });
        this.removeLiquidityInstruction = ({ accounts, amountLamports }) => this.program.instruction.removeLiquidity(amountLamports, { accounts });
        this.liquidUnstakeInstructionAccounts = ({ marinadeState, ownerAddress, associatedMSolTokenAccountAddress }) => __awaiter(this, void 0, void 0, function* () {
            return ({
                state: marinadeState.marinadeStateAddress,
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
        return new anchor_1.Program(marinadeFinanceIdlSchema, this.programAddress, this.anchorProvider);
    }
    getDelayedUnstakeTickets(beneficiary) {
        return __awaiter(this, void 0, void 0, function* () {
            const discriminator = bs58_1.default.encode(Uint8Array.from([0x85, 0x4d, 0x12, 0x62]));
            const filters = [
                {
                    dataSize: 88,
                },
                {
                    memcmp: {
                        offset: 0,
                        bytes: discriminator,
                    },
                },
            ];
            if (beneficiary) {
                filters.push({
                    memcmp: {
                        offset: 8 + 32,
                        bytes: beneficiary.toBase58(),
                    },
                });
            }
            const ticketAccountInfos = yield this.anchorProvider.connection.getProgramAccounts(this.programAddress, { filters });
            const epochInfo = yield (0, util_1.getEpochInfo)(this.anchorProvider.connection);
            return new Map(ticketAccountInfos.map((ticketAccountInfo) => {
                const { data } = ticketAccountInfo.account;
                const ticketAccount = (0, borsh_2.deserializeUnchecked)(borsh_1.MARINADE_BORSH_SCHEMA, ticket_account_1.TicketAccount, data.slice(8, data.length));
                const ticketDateInfo = (0, util_1.getTicketDateInfo)(epochInfo, ticketAccount.createdEpoch.toNumber(), Date.now());
                return [
                    ticketAccountInfo.pubkey,
                    Object.assign(Object.assign({}, ticketAccount), ticketDateInfo),
                ];
            }));
        });
    }
}
exports.MarinadeFinanceProgram = MarinadeFinanceProgram;
//# sourceMappingURL=marinade-finance-program.js.map