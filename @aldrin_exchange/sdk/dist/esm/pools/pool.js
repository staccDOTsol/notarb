import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT, Side, SWAP_INSTRUCTION_LAYOUT, WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT, } from '.';
import { POOLS_PROGRAM_ADDRESS, POOLS_V2_PROGRAM_ADDRESS } from '..';
import { account, instructionDiscriminator } from '../utils';
import { SIDE } from './types/swap';
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
        var data = Buffer.alloc(DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT.span);
        var creationSize = params.creationSize, maxBaseTokenAmount = params.maxBaseTokenAmount, maxQuoteTokenAmount = params.maxQuoteTokenAmount, programId = params.programId;
        DEPOSIT_LIQUIDITY_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('create_basket'),
            creationSize: creationSize,
            maxBaseTokenAmount: maxBaseTokenAmount,
            maxQuoteTokenAmount: maxQuoteTokenAmount,
        }, data);
        var keys = [
            account(params.pool.poolPublicKey),
            account(params.pool.poolMint, true),
            account(params.poolSigner),
            account(params.userBaseTokenAccount, true),
            account(params.userQuoteTokenAccount, true),
            account(params.pool.baseTokenVault, true),
            account(params.pool.quoteTokenVault, true),
            account(params.userPoolTokenAccount, true),
            account(params.walletAuthority, false, true),
            account(TOKEN_PROGRAM_ID),
            account(SYSVAR_CLOCK_PUBKEY),
            account(SYSVAR_RENT_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var data = Buffer.alloc(WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT.span);
        var poolTokenAmount = params.poolTokenAmount, baseTokenReturnedMin = params.baseTokenReturnedMin, quoteTokenReturnedMin = params.quoteTokenReturnedMin, poolSigner = params.poolSigner, userPoolTokenAccount = params.userPoolTokenAccount, userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount, walletAuthority = params.walletAuthority, _a = params.pool, feeBaseAccount = _a.feeBaseAccount, feeQuoteAccount = _a.feeQuoteAccount, poolPublicKey = _a.poolPublicKey, poolMint = _a.poolMint, baseTokenVault = _a.baseTokenVault, quoteTokenVault = _a.quoteTokenVault, programId = params.programId;
        WITHDRAW_LIQUIDITY_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('redeem_basket'),
            redemptionSize: poolTokenAmount,
            baseTokenReturnedMin: baseTokenReturnedMin,
            quoteTokenReturnedMin: quoteTokenReturnedMin,
        }, data);
        var keys = [
            account(poolPublicKey),
            account(poolMint, true),
            account(baseTokenVault, true),
            account(quoteTokenVault, true),
            account(poolSigner),
            account(userPoolTokenAccount, true),
            account(userBaseTokenAccount, true),
            account(userQuoteTokenAccount, true),
            account(walletAuthority, false, true),
            account(walletAuthority),
            account(TOKEN_PROGRAM_ID),
            account(feeBaseAccount, true),
            account(feeQuoteAccount, true),
            account(SYSVAR_CLOCK_PUBKEY),
        ];
        return new TransactionInstruction({
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
        var data = Buffer.alloc(SWAP_INSTRUCTION_LAYOUT.span);
        var outcomeAmount = params.outcomeAmount, minIncomeAmount = params.minIncomeAmount, side = params.side;
        SWAP_INSTRUCTION_LAYOUT.encode({
            instruction: instructionDiscriminator('swap'),
            tokens: outcomeAmount,
            minTokens: minIncomeAmount,
            side: side === SIDE.ASK ? Side.Ask : Side.Bid,
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
            account(poolPublicKey),
            account(poolSigner),
            account(poolMint, true),
            account(baseTokenVault, true),
            account(quoteTokenVault, true),
            account(feePoolTokenAccount, true),
            account(walletAuthority, false, true),
            account(userBaseTokenAccount, true),
            account(userQuoteTokenAccount, true),
            account(TOKEN_PROGRAM_ID),
        ];
        return new TransactionInstruction({
            programId: POOLS_PROGRAM_ADDRESS,
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
            account(poolPublicKey),
            account(poolSigner),
            account(poolMint, true),
            account(baseTokenVault, true),
            account(quoteTokenVault, true),
            account(feePoolTokenAccount, true),
            account(walletAuthority, false, true),
            account(userBaseTokenAccount, true),
            account(userQuoteTokenAccount, true),
            account(curve),
            account(TOKEN_PROGRAM_ID),
        ];
        return new TransactionInstruction({
            programId: POOLS_V2_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    return Pool;
}());
export { Pool };
