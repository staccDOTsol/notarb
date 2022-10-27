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
exports.getEpochInfo = exports.getParsedStakeAccountInfo = exports.getOrCreateAssociatedTokenAccount = exports.getTokenAccountInfo = exports.getAssociatedTokenAccountAddress = exports.getMintClient = exports.BNOrNull = exports.web3PubKeyOrNull = exports.U64_MAX = exports.STAKE_PROGRAM_ID = exports.SYSTEM_PROGRAM_ID = void 0;
const anchor_1 = require("@project-serum/anchor");
const anchor = __importStar(require("@project-serum/anchor"));
const spl_token_1 = require("@solana/spl-token");
exports.SYSTEM_PROGRAM_ID = new anchor_1.web3.PublicKey('11111111111111111111111111111111');
exports.STAKE_PROGRAM_ID = new anchor_1.web3.PublicKey('Stake11111111111111111111111111111111111111');
exports.U64_MAX = new anchor_1.BN('ffffffffffffffff', 16);
function web3PubKeyOrNull(value) {
    return value === null ? null : new anchor_1.web3.PublicKey(value);
}
exports.web3PubKeyOrNull = web3PubKeyOrNull;
function BNOrNull(value) {
    return value === null ? null : new anchor_1.BN(value);
}
exports.BNOrNull = BNOrNull;
function getMintClient(anchorProvider, mintAddress) {
    return new spl_token_1.Token(anchorProvider.connection, mintAddress, spl_token_1.TOKEN_PROGRAM_ID, anchor_1.web3.Keypair.generate());
}
exports.getMintClient = getMintClient;
function getAssociatedTokenAccountAddress(mint, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        return anchor.utils.token.associatedAddress({ mint, owner });
    });
}
exports.getAssociatedTokenAccountAddress = getAssociatedTokenAccountAddress;
function getTokenAccountInfo(mintClient, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        return mintClient.getAccountInfo(publicKey);
    });
}
exports.getTokenAccountInfo = getTokenAccountInfo;
function getOrCreateAssociatedTokenAccount(anchorProvider, mintAddress, ownerAddress, payerAddress) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const existingTokenAccounts = yield anchorProvider.connection.getTokenAccountsByOwner(ownerAddress, { mint: mintAddress });
        const [existingTokenAccount] = existingTokenAccounts.value;
        const associatedTokenAccountAddress = (_a = existingTokenAccount === null || existingTokenAccount === void 0 ? void 0 : existingTokenAccount.pubkey) !== null && _a !== void 0 ? _a : yield getAssociatedTokenAccountAddress(mintAddress, ownerAddress);
        let createAssociateTokenInstruction = null;
        const mintClient = getMintClient(anchorProvider, mintAddress);
        try {
            yield getTokenAccountInfo(mintClient, associatedTokenAccountAddress);
        }
        catch (err) {
            if (!(err instanceof Error) || err.message !== 'Failed to find account') {
                throw err;
            }
            createAssociateTokenInstruction = spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mintAddress, associatedTokenAccountAddress, ownerAddress, payerAddress !== null && payerAddress !== void 0 ? payerAddress : ownerAddress);
        }
        return {
            associatedTokenAccountAddress,
            createAssociateTokenInstruction,
        };
    });
}
exports.getOrCreateAssociatedTokenAccount = getOrCreateAssociatedTokenAccount;
function getParsedStakeAccountInfo(anchorProvider, stakeAccountAddress) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return __awaiter(this, void 0, void 0, function* () {
        const { value: stakeAccountInfo } = yield anchorProvider.connection.getParsedAccountInfo(stakeAccountAddress);
        if (!stakeAccountInfo) {
            throw new Error(`Failed to find the stake account ${stakeAccountAddress.toBase58()}`);
        }
        if (!stakeAccountInfo.owner.equals(exports.STAKE_PROGRAM_ID)) {
            throw new Error(`${stakeAccountAddress.toBase58()} is not a stake account because owner is ${stakeAccountInfo.owner}`);
        }
        if (!stakeAccountInfo.data || stakeAccountInfo.data instanceof Buffer) {
            throw new Error('Failed to parse the stake account data');
        }
        const { parsed: parsedData } = stakeAccountInfo.data;
        const activationEpoch = BNOrNull((_d = (_c = (_b = (_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _a === void 0 ? void 0 : _a.stake) === null || _b === void 0 ? void 0 : _b.delegation) === null || _c === void 0 ? void 0 : _c.activationEpoch) !== null && _d !== void 0 ? _d : null);
        const deactivationEpoch = BNOrNull((_h = (_g = (_f = (_e = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _e === void 0 ? void 0 : _e.stake) === null || _f === void 0 ? void 0 : _f.delegation) === null || _g === void 0 ? void 0 : _g.deactivationEpoch) !== null && _h !== void 0 ? _h : null);
        return {
            ownerAddress: stakeAccountInfo.owner,
            authorizedStakerAddress: web3PubKeyOrNull((_m = (_l = (_k = (_j = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _j === void 0 ? void 0 : _j.meta) === null || _k === void 0 ? void 0 : _k.authorized) === null || _l === void 0 ? void 0 : _l.staker) !== null && _m !== void 0 ? _m : null),
            authorizedWithdrawerAddress: web3PubKeyOrNull((_r = (_q = (_p = (_o = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _o === void 0 ? void 0 : _o.meta) === null || _p === void 0 ? void 0 : _p.authorized) === null || _q === void 0 ? void 0 : _q.withdrawer) !== null && _r !== void 0 ? _r : null),
            voterAddress: web3PubKeyOrNull((_v = (_u = (_t = (_s = parsedData === null || parsedData === void 0 ? void 0 : parsedData.info) === null || _s === void 0 ? void 0 : _s.stake) === null || _t === void 0 ? void 0 : _t.delegation) === null || _u === void 0 ? void 0 : _u.voter) !== null && _v !== void 0 ? _v : null),
            activationEpoch,
            deactivationEpoch,
            isCoolingDown: deactivationEpoch ? !deactivationEpoch.eq(exports.U64_MAX) : false,
        };
    });
}
exports.getParsedStakeAccountInfo = getParsedStakeAccountInfo;
function getEpochInfo(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const epochInfo = yield connection.getEpochInfo();
        const samples = yield connection.getRecentPerformanceSamples(64);
        const sampleSlots = samples.reduce((slots, sample) => sample.numSlots + slots, 0);
        const sampleSeconds = samples.reduce((seconds, sample) => sample.samplePeriodSecs + seconds, 0);
        const avgSlotDuration = sampleSeconds / sampleSlots * 1000;
        const slotsRemainingInEpoch = epochInfo.slotsInEpoch - epochInfo.slotIndex;
        const msUntilEpochEnd = avgSlotDuration * slotsRemainingInEpoch;
        const msElapsed = epochInfo.slotIndex * avgSlotDuration;
        const epochProgress = (100 * epochInfo.slotIndex) / epochInfo.slotsInEpoch;
        return Object.assign(Object.assign({}, epochInfo), { msUntilEpochEnd,
            msElapsed,
            epochProgress,
            avgSlotDuration,
            slotsRemainingInEpoch });
    });
}
exports.getEpochInfo = getEpochInfo;
//# sourceMappingURL=anchor.js.map