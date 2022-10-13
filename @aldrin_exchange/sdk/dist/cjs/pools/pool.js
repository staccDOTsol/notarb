"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var _1 = require(".");
var __1 = require("..");
var utils_1 = require("../utils");
var swap_1 = require("./types/swap");
/**
 * Pool instructions & help utils
 */
var Pool = /** @class */ (function () {
    function Pool() {
    }
    /**
       * Create deposit liquidity instruction
       * @param params
       * @returns
       */
    Pool.depositLiquididtyInstruction = function (params) {
        var data = Buffer.alloc(_1.DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT.span);
        var creationSize = params.creationSize, maxBaseTokenAmount = params.maxBaseTokenAmount, maxQuoteTokenAmount = params.maxQuoteTokenAmount, programId = params.programId;
        _1.DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('create_basket'),
            creationSize: creationSize,
            maxBaseTokenAmount: maxBaseTokenAmount,
            maxQuoteTokenAmount: maxQuoteTokenAmount,
        }, data);
        var keys = [
            (0, utils_1.account)(params.pool.poolPublicKey),
            (0, utils_1.account)(params.pool.poolMint, true),
            (0, utils_1.account)(params.poolSigner),
            (0, utils_1.account)(params.userBaseTokenAccount, true),
            (0, utils_1.account)(params.userQuoteTokenAccount, true),
            (0, utils_1.account)(params.pool.baseTokenVault, true),
            (0, utils_1.account)(params.pool.quoteTokenVault, true),
            (0, utils_1.account)(params.userPoolTokenAccount, true),
            (0, utils_1.account)(params.walletAuthority, false, true),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
            (0, utils_1.account)(web3_js_1.SYSVAR_RENT_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create widthradw liquidity instruction
     * @param params
     * @returns
     */
    Pool.withdrawLiquidityInstruction = function (params) {
        var data = Buffer.alloc(_1.WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT.span);
        var poolTokenAmount = params.poolTokenAmount, baseTokenReturnedMin = params.baseTokenReturnedMin, quoteTokenReturnedMin = params.quoteTokenReturnedMin, poolSigner = params.poolSigner, userPoolTokenAccount = params.userPoolTokenAccount, userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount, walletAuthority = params.walletAuthority, _a = params.pool, feeBaseAccount = _a.feeBaseAccount, feeQuoteAccount = _a.feeQuoteAccount, poolPublicKey = _a.poolPublicKey, poolMint = _a.poolMint, baseTokenVault = _a.baseTokenVault, quoteTokenVault = _a.quoteTokenVault, programId = params.programId;
        _1.WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('redeem_basket'),
            redemptionSize: poolTokenAmount,
            baseTokenReturnedMin: baseTokenReturnedMin,
            quoteTokenReturnedMin: quoteTokenReturnedMin,
        }, data);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(poolMint, true),
            (0, utils_1.account)(baseTokenVault, true),
            (0, utils_1.account)(quoteTokenVault, true),
            (0, utils_1.account)(poolSigner),
            (0, utils_1.account)(userPoolTokenAccount, true),
            (0, utils_1.account)(userBaseTokenAccount, true),
            (0, utils_1.account)(userQuoteTokenAccount, true),
            (0, utils_1.account)(walletAuthority, false, true),
            (0, utils_1.account)(walletAuthority),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
            (0, utils_1.account)(feeBaseAccount, true),
            (0, utils_1.account)(feeQuoteAccount, true),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: programId,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create swap tokens instruction. Detect pool program version base on `poolVersion` field
     * @param params
     * @returns
     */
    Pool.swapInstruction = function (params) {
        if (params.poolVersion === 1) {
            return this.swapInstructionV1(params);
        }
        return this.swapInstructionV2(params);
    };
    Pool.swapInstructionData = function (params) {
        var data = Buffer.alloc(_1.SWAP_INSTRUCTION_LAYOUT.span);
        var outcomeAmount = params.outcomeAmount, minIncomeAmount = params.minIncomeAmount, side = params.side;
        _1.SWAP_INSTRUCTION_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('swap'),
            tokens: outcomeAmount,
            minTokens: minIncomeAmount,
            side: side === swap_1.SIDE.ASK ? _1.Side.Ask : _1.Side.Bid,
        }, data);
        return data;
    };
    /**
     * Create swap tokens instruction for v1 pool
     * @param params
     * @returns
     */
    Pool.swapInstructionV1 = function (params) {
        var _a = params.pool, poolPublicKey = _a.poolPublicKey, poolMint = _a.poolMint, baseTokenVault = _a.baseTokenVault, quoteTokenVault = _a.quoteTokenVault, feePoolTokenAccount = _a.feePoolTokenAccount, walletAuthority = params.walletAuthority, poolSigner = params.poolSigner, userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount;
        var data = Pool.swapInstructionData(params);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(poolSigner),
            (0, utils_1.account)(poolMint, true),
            (0, utils_1.account)(baseTokenVault, true),
            (0, utils_1.account)(quoteTokenVault, true),
            (0, utils_1.account)(feePoolTokenAccount, true),
            (0, utils_1.account)(walletAuthority, false, true),
            (0, utils_1.account)(userBaseTokenAccount, true),
            (0, utils_1.account)(userQuoteTokenAccount, true),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: __1.POOLS_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    /**
     * Create swap tokens instruction for v2 pool
     * @param params
     * @returns
     */
    Pool.swapInstructionV2 = function (params) {
        var _a = params.pool, poolPublicKey = _a.poolPublicKey, poolMint = _a.poolMint, baseTokenVault = _a.baseTokenVault, quoteTokenVault = _a.quoteTokenVault, feePoolTokenAccount = _a.feePoolTokenAccount, curve = _a.curve, walletAuthority = params.walletAuthority, poolSigner = params.poolSigner, userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount;
        if (!curve) {
            throw new Error('No curve account provided');
        }
        var data = Pool.swapInstructionData(params);
        var keys = [
            (0, utils_1.account)(poolPublicKey),
            (0, utils_1.account)(poolSigner),
            (0, utils_1.account)(poolMint, true),
            (0, utils_1.account)(baseTokenVault, true),
            (0, utils_1.account)(quoteTokenVault, true),
            (0, utils_1.account)(feePoolTokenAccount, true),
            (0, utils_1.account)(walletAuthority, false, true),
            (0, utils_1.account)(userBaseTokenAccount, true),
            (0, utils_1.account)(userQuoteTokenAccount, true),
            (0, utils_1.account)(curve),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: __1.POOLS_V2_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    return Pool;
}());
exports.Pool = Pool;
