"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTWAP_AVAILABLE_TOKENS = exports.GET_AVAILABLE_TOKENS_LAYOUT = exports.DTWAP_PAIR_SETTINGS = exports.DTWAP_ORDER_ARRAY = exports.DTWAP_ORDER = void 0;
var buffer_layout_1 = require("@solana/buffer-layout");
var common_1 = require("../layout/common");
exports.DTWAP_ORDER = (0, buffer_layout_1.struct)([
    (0, common_1.bool)('isInitialized'),
    (0, common_1.uint64)('amount'),
    (0, common_1.uint64)('startTime', true),
    (0, common_1.uint64)('endTime', true),
    (0, common_1.uint64)('timeHorizon', true),
    (0, common_1.uint64)('averageTransaction'),
    (0, common_1.uint64)('amountFilled'),
    (0, common_1.uint64)('amountToFill'),
    (0, common_1.uint64)('stepsFilled'),
    (0, common_1.uint64)('stepsToFill'),
    (0, common_1.uint64)('tokensSwapped'),
    (0, common_1.publicKey)('authority'),
]);
var SIDE = (0, common_1.rustEnum)([
    new buffer_layout_1.Structure([], 'bid'),
    new buffer_layout_1.Structure([], 'ask'),
], 'side');
exports.DTWAP_ORDER_ARRAY = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.publicKey)('twammFromTokenVault'),
    (0, common_1.publicKey)('twammToTokenVault'),
    (0, common_1.publicKey)('signer'),
    (0, buffer_layout_1.u8)('signerNonce'),
    (0, common_1.publicKey)('feeAccount'),
    (0, common_1.publicKey)('pairSettings'),
    SIDE,
    (0, buffer_layout_1.seq)(exports.DTWAP_ORDER, 30, 'orders'),
]);
var DTWAP_FEE = (0, buffer_layout_1.struct)([
    (0, common_1.uint64)('placingFeeNumerator'),
    (0, common_1.uint64)('placingFeeDenominator'),
    (0, common_1.uint64)('cancellingFeeNumerator'),
    (0, common_1.uint64)('cancellingFeeDenominator'),
], 'fees');
exports.DTWAP_PAIR_SETTINGS = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'padding'),
    (0, common_1.publicKey)('baseTokenMint'),
    (0, common_1.publicKey)('quoteTokenMint'),
    (0, common_1.publicKey)('authority'),
    (0, common_1.publicKey)('baseTokenFeeAccount'),
    (0, common_1.publicKey)('quoteTokenFeeAccount'),
    (0, common_1.publicKey)('initializerAccount'),
    (0, common_1.publicKey)('pyth'),
    (0, common_1.uint64)('discountNumerator'),
    (0, common_1.uint64)('discountDenominator'),
    DTWAP_FEE,
    (0, common_1.uint64)('minimumTokens'),
    (0, buffer_layout_1.u8)('baseMintDecimals'),
    (0, buffer_layout_1.u8)('quoteMintDecimals'),
]);
exports.GET_AVAILABLE_TOKENS_LAYOUT = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.blob)(8, 'instruction'),
]);
exports.DTWAP_AVAILABLE_TOKENS = (0, buffer_layout_1.struct)([
    (0, buffer_layout_1.u32)('length'),
    (0, common_1.int64)('amountTo'),
    (0, common_1.int64)('amountFrom'),
]);
