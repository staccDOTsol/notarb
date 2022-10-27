"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAP_INSTRUCTION_LAYOUT = exports.WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT = exports.DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT = exports.POOL_V2_LAYOUT = exports.POOL_LAYOUT = void 0;
var buffer_layout_1 = require("@solana/buffer-layout");
var common_1 = require("../layout/common");
var FEES_LAYOUT = (0, buffer_layout_1.struct)([
    (0, common_1.uint64)('tradeFeeNumerator', true),
    (0, common_1.uint64)('tradeFeeDenominator', true),
    (0, common_1.uint64)('ownerTradeFeeNumerator', true),
    (0, common_1.uint64)('ownerTradeFeeDenominator', true),
    (0, common_1.uint64)('ownerWithdrawFeeNumerator', true),
    (0, common_1.uint64)('ownerWithdrawFeeDenominator', true),
], 'fees');
var POOL_FIELDS_COMMON = [
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.publicKey)('lpTokenFreezeVault'),
    (0, common_1.publicKey)('poolMint'),
    (0, common_1.publicKey)('baseTokenVault'),
    (0, common_1.publicKey)('baseTokenMint'),
    (0, common_1.publicKey)('quoteTokenVault'),
    (0, common_1.publicKey)('quoteTokenMint'),
    (0, common_1.publicKey)('poolSigner'),
    (0, buffer_layout_1.u8)('poolSignerNonce'),
    (0, common_1.publicKey)('authority'),
    (0, common_1.publicKey)('initializerAccount'),
    (0, common_1.publicKey)('feeBaseAccount'),
    (0, common_1.publicKey)('feeQuoteAccount'),
    (0, common_1.publicKey)('feePoolTokenAccount'),
    FEES_LAYOUT,
];
exports.POOL_LAYOUT = (0, buffer_layout_1.struct)(POOL_FIELDS_COMMON);
exports.POOL_V2_LAYOUT = (0, buffer_layout_1.struct)(__spreadArray(__spreadArray([], POOL_FIELDS_COMMON, true), [
    (0, buffer_layout_1.u8)('curveType'),
    (0, common_1.publicKey)('curve'),
], false));
exports.DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
    (0, common_1.uint64)('creationSize'),
    (0, common_1.uint64)('maxBaseTokenAmount'),
    (0, common_1.uint64)('maxQuoteTokenAmount'),
]);
exports.WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
    (0, common_1.uint64)('redemptionSize'),
    (0, common_1.uint64)('baseTokenReturnedMin'),
    (0, common_1.uint64)('quoteTokenReturnedMin'),
]);
exports.SWAP_INSTRUCTION_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
    (0, common_1.uint64)('tokens'),
    (0, common_1.uint64)('minTokens'),
    (0, common_1.rustEnum)([
        new buffer_layout_1.Structure([], 'bid'),
        new buffer_layout_1.Structure([], 'ask'),
    ], 'side'),
]);
