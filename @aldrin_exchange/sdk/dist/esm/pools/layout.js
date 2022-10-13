var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { blob, struct, Structure, u8 } from '@solana/buffer-layout';
import { publicKey, rustEnum, uint64 } from '../layout/common';
var FEES_LAYOUT = struct([
    uint64('tradeFeeNumerator', true),
    uint64('tradeFeeDenominator', true),
    uint64('ownerTradeFeeNumerator', true),
    uint64('ownerTradeFeeDenominator', true),
    uint64('ownerWithdrawFeeNumerator', true),
    uint64('ownerWithdrawFeeDenominator', true),
], 'fees');
var POOL_FIELDS_COMMON = [
    blob(8, 'padding'),
    publicKey('lpTokenFreezeVault'),
    publicKey('poolMint'),
    publicKey('baseTokenVault'),
    publicKey('baseTokenMint'),
    publicKey('quoteTokenVault'),
    publicKey('quoteTokenMint'),
    publicKey('poolSigner'),
    u8('poolSignerNonce'),
    publicKey('authority'),
    publicKey('initializerAccount'),
    publicKey('feeBaseAccount'),
    publicKey('feeQuoteAccount'),
    publicKey('feePoolTokenAccount'),
    FEES_LAYOUT,
];
export var POOL_LAYOUT = struct(POOL_FIELDS_COMMON);
export var POOL_V2_LAYOUT = struct(__spreadArray(__spreadArray([], POOL_FIELDS_COMMON, true), [
    u8('curveType'),
    publicKey('curve'),
], false));
export var DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT = struct([
    blob(8, 'instruction'),
    uint64('creationSize'),
    uint64('maxBaseTokenAmount'),
    uint64('maxQuoteTokenAmount'),
]);
export var WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT = struct([
    blob(8, 'instruction'),
    uint64('redemptionSize'),
    uint64('baseTokenReturnedMin'),
    uint64('quoteTokenReturnedMin'),
]);
export var SWAP_INSTRUCTION_LAYOUT = struct([
    blob(8, 'instruction'),
    uint64('tokens'),
    uint64('minTokens'),
    rustEnum([
        new Structure([], 'bid'),
        new Structure([], 'ask'),
    ], 'side'),
]);
