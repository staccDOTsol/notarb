"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSwap = exports.CurveType = exports.TokenSwapLayout = exports.Numberu64 = exports.OLD_TOKEN_SWAP_PROGRAM_ID = exports.TOKEN_SWAP_PROGRAM_ID = void 0;
const assert_1 = __importDefault(require("assert"));
const bn_js_1 = __importDefault(require("bn.js"));
const buffer_1 = require("buffer");
const BufferLayout = __importStar(require("@solana/buffer-layout"));
const web3_js_1 = require("@solana/web3.js");
const Layout = __importStar(require("./layout"));
const account_1 = require("./util/account");
exports.TOKEN_SWAP_PROGRAM_ID = new web3_js_1.PublicKey('SwapsVeCiPHMUAtzQWZw7RjsKjgCjhwU55QGu4U1Szw');
exports.OLD_TOKEN_SWAP_PROGRAM_ID = new web3_js_1.PublicKey('SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8');
/**
 * Some amount of tokens
 */
class Numberu64 extends bn_js_1.default {
    /**
     * Convert to Buffer representation
     */
    toBuffer() {
        const a = super.toArray().reverse();
        const b = buffer_1.Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        (0, assert_1.default)(b.length < 8, 'Numberu64 too large');
        const zeroPad = buffer_1.Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    }
    /**
     * Construct a Numberu64 from Buffer representation
     */
    static fromBuffer(buffer) {
        (0, assert_1.default)(buffer.length === 8, `Invalid buffer length: ${buffer.length}`);
        return new Numberu64([...buffer]
            .reverse()
            .map(i => `00${i.toString(16)}`.slice(-2))
            .join(''), 16);
    }
}
exports.Numberu64 = Numberu64;
exports.TokenSwapLayout = BufferLayout.struct([
    BufferLayout.u8('version'),
    BufferLayout.u8('isInitialized'),
    BufferLayout.u8('bumpSeed'),
    Layout.publicKey('poolTokenProgramId'),
    Layout.publicKey('tokenAccountA'),
    Layout.publicKey('tokenAccountB'),
    Layout.publicKey('tokenPool'),
    Layout.publicKey('mintA'),
    Layout.publicKey('mintB'),
    Layout.publicKey('feeAccount'),
    Layout.uint64('tradeFeeNumerator'),
    Layout.uint64('tradeFeeDenominator'),
    Layout.uint64('ownerTradeFeeNumerator'),
    Layout.uint64('ownerTradeFeeDenominator'),
    Layout.uint64('ownerWithdrawFeeNumerator'),
    Layout.uint64('ownerWithdrawFeeDenominator'),
    Layout.uint64('hostFeeNumerator'),
    Layout.uint64('hostFeeDenominator'),
    BufferLayout.u8('curveType'),
    BufferLayout.blob(32, 'curveParameters'),
]);
exports.CurveType = Object.freeze({
    ConstantProduct: 0,
    ConstantPrice: 1,
    Offset: 3, // Offset curve, like Uniswap, but with an additional offset on the token B side
});
/**
 * A program to exchange tokens against a pool of liquidity
 */
class TokenSwap {
    /**
     * Create a Token object attached to the specific token
     *
     * @param connection The connection to use
     * @param tokenSwap The token swap account
     * @param swapProgramId The program ID of the token-swap program
     * @param poolTokenProgramId The program ID of the token program for the pool tokens
     * @param poolToken The pool token
     * @param authority The authority over the swap and accounts
     * @param tokenAccountA The token swap's Token A account
     * @param tokenAccountB The token swap's Token B account
     * @param mintA The mint of Token A
     * @param mintB The mint of Token B
     * @param tradeFeeNumerator The trade fee numerator
     * @param tradeFeeDenominator The trade fee denominator
     * @param ownerTradeFeeNumerator The owner trade fee numerator
     * @param ownerTradeFeeDenominator The owner trade fee denominator
     * @param ownerWithdrawFeeNumerator The owner withdraw fee numerator
     * @param ownerWithdrawFeeDenominator The owner withdraw fee denominator
     * @param hostFeeNumerator The host fee numerator
     * @param hostFeeDenominator The host fee denominator
     * @param curveType The curve type
     * @param payer Pays for the transaction
     */
    constructor(connection, tokenSwap, swapProgramId, poolTokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, payer) {
        this.connection = connection;
        this.tokenSwap = tokenSwap;
        this.swapProgramId = swapProgramId;
        this.poolTokenProgramId = poolTokenProgramId;
        this.poolToken = poolToken;
        this.feeAccount = feeAccount;
        this.authority = authority;
        this.tokenAccountA = tokenAccountA;
        this.tokenAccountB = tokenAccountB;
        this.mintA = mintA;
        this.mintB = mintB;
        this.tradeFeeNumerator = tradeFeeNumerator;
        this.tradeFeeDenominator = tradeFeeDenominator;
        this.ownerTradeFeeNumerator = ownerTradeFeeNumerator;
        this.ownerTradeFeeDenominator = ownerTradeFeeDenominator;
        this.ownerWithdrawFeeNumerator = ownerWithdrawFeeNumerator;
        this.ownerWithdrawFeeDenominator = ownerWithdrawFeeDenominator;
        this.hostFeeNumerator = hostFeeNumerator;
        this.hostFeeDenominator = hostFeeDenominator;
        this.curveType = curveType;
        this.payer = payer;
        this.connection = connection;
        this.tokenSwap = tokenSwap;
        this.swapProgramId = swapProgramId;
        this.poolTokenProgramId = poolTokenProgramId;
        this.poolToken = poolToken;
        this.feeAccount = feeAccount;
        this.authority = authority;
        this.tokenAccountA = tokenAccountA;
        this.tokenAccountB = tokenAccountB;
        this.mintA = mintA;
        this.mintB = mintB;
        this.tradeFeeNumerator = tradeFeeNumerator;
        this.tradeFeeDenominator = tradeFeeDenominator;
        this.ownerTradeFeeNumerator = ownerTradeFeeNumerator;
        this.ownerTradeFeeDenominator = ownerTradeFeeDenominator;
        this.ownerWithdrawFeeNumerator = ownerWithdrawFeeNumerator;
        this.ownerWithdrawFeeDenominator = ownerWithdrawFeeDenominator;
        this.hostFeeNumerator = hostFeeNumerator;
        this.hostFeeDenominator = hostFeeDenominator;
        this.curveType = curveType;
        this.payer = payer;
    }
    /**
     * Get the minimum balance for the token swap account to be rent exempt
     *
     * @return Number of lamports required
     */
    static getMinBalanceRentForExemptTokenSwap(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection.getMinimumBalanceForRentExemption(exports.TokenSwapLayout.span);
        });
    }
    static createInitSwapInstruction(tokenSwapAccount, authority, tokenAccountA, tokenAccountB, tokenPool, feeAccount, tokenAccountPool, poolTokenProgramId, swapProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters = new Numberu64(0)) {
        const keys = [
            { pubkey: tokenSwapAccount.publicKey, isSigner: false, isWritable: true },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: tokenAccountA, isSigner: false, isWritable: false },
            { pubkey: tokenAccountB, isSigner: false, isWritable: false },
            { pubkey: tokenPool, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: false },
            { pubkey: tokenAccountPool, isSigner: false, isWritable: true },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
        ];
        const commandDataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            BufferLayout.nu64('tradeFeeNumerator'),
            BufferLayout.nu64('tradeFeeDenominator'),
            BufferLayout.nu64('ownerTradeFeeNumerator'),
            BufferLayout.nu64('ownerTradeFeeDenominator'),
            BufferLayout.nu64('ownerWithdrawFeeNumerator'),
            BufferLayout.nu64('ownerWithdrawFeeDenominator'),
            BufferLayout.nu64('hostFeeNumerator'),
            BufferLayout.nu64('hostFeeDenominator'),
            BufferLayout.u8('curveType'),
            BufferLayout.blob(32, 'curveParameters'),
        ]);
        let data = buffer_1.Buffer.alloc(1024);
        // package curve parameters
        // NOTE: currently assume all curves take a single parameter, u64 int
        //       the remaining 24 of the 32 bytes available are filled with 0s
        let curveParamsBuffer = buffer_1.Buffer.alloc(32);
        curveParameters.toBuffer().copy(curveParamsBuffer);
        {
            const encodeLength = commandDataLayout.encode({
                instruction: 0,
                tradeFeeNumerator,
                tradeFeeDenominator,
                ownerTradeFeeNumerator,
                ownerTradeFeeDenominator,
                ownerWithdrawFeeNumerator,
                ownerWithdrawFeeDenominator,
                hostFeeNumerator,
                hostFeeDenominator,
                curveType,
                curveParameters: curveParamsBuffer,
            }, data);
            data = data.slice(0, encodeLength);
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
    static loadTokenSwap(connection, address, programId, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, account_1.loadAccount)(connection, address, programId);
            const tokenSwapData = exports.TokenSwapLayout.decode(data);
            if (!tokenSwapData.isInitialized) {
                throw new Error(`Invalid token swap state`);
            }
            const [authority] = yield web3_js_1.PublicKey.findProgramAddress([address.toBuffer()], programId);
            const poolToken = new web3_js_1.PublicKey(tokenSwapData.tokenPool);
            const feeAccount = new web3_js_1.PublicKey(tokenSwapData.feeAccount);
            const tokenAccountA = new web3_js_1.PublicKey(tokenSwapData.tokenAccountA);
            const tokenAccountB = new web3_js_1.PublicKey(tokenSwapData.tokenAccountB);
            const mintA = new web3_js_1.PublicKey(tokenSwapData.mintA);
            const mintB = new web3_js_1.PublicKey(tokenSwapData.mintB);
            const poolTokenProgramId = new web3_js_1.PublicKey(tokenSwapData.poolTokenProgramId);
            const tradeFeeNumerator = Numberu64.fromBuffer(tokenSwapData.tradeFeeNumerator);
            const tradeFeeDenominator = Numberu64.fromBuffer(tokenSwapData.tradeFeeDenominator);
            const ownerTradeFeeNumerator = Numberu64.fromBuffer(tokenSwapData.ownerTradeFeeNumerator);
            const ownerTradeFeeDenominator = Numberu64.fromBuffer(tokenSwapData.ownerTradeFeeDenominator);
            const ownerWithdrawFeeNumerator = Numberu64.fromBuffer(tokenSwapData.ownerWithdrawFeeNumerator);
            const ownerWithdrawFeeDenominator = Numberu64.fromBuffer(tokenSwapData.ownerWithdrawFeeDenominator);
            const hostFeeNumerator = Numberu64.fromBuffer(tokenSwapData.hostFeeNumerator);
            const hostFeeDenominator = Numberu64.fromBuffer(tokenSwapData.hostFeeDenominator);
            const curveType = tokenSwapData.curveType;
            return new TokenSwap(connection, address, programId, poolTokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, payer);
        });
    }
    /**
     * Create a new Token Swap
     *
     * @param connection The connection to use
     * @param payer Pays for the transaction
     * @param tokenSwapAccount The token swap account
     * @param authority The authority over the swap and accounts
     * @param tokenAccountA: The token swap's Token A account
     * @param tokenAccountB: The token swap's Token B account
     * @param poolToken The pool token
     * @param tokenAccountPool The token swap's pool token account
     * @param poolTokenProgramId The program ID of the token program for pool tokens
     * @param swapProgramId The program ID of the token-swap program
     * @param feeNumerator Numerator of the fee ratio
     * @param feeDenominator Denominator of the fee ratio
     * @return Token object for the newly minted token, Public key of the account holding the total supply of new tokens
     */
    static createTokenSwap(connection, payer, tokenSwapAccount, authority, tokenAccountA, tokenAccountB, poolToken, mintA, mintB, feeAccount, tokenAccountPool, swapProgramId, poolTokenProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            const tokenSwap = new TokenSwap(connection, tokenSwapAccount.publicKey, swapProgramId, poolTokenProgramId, poolToken, feeAccount, authority, tokenAccountA, tokenAccountB, mintA, mintB, new Numberu64(tradeFeeNumerator), new Numberu64(tradeFeeDenominator), new Numberu64(ownerTradeFeeNumerator), new Numberu64(ownerTradeFeeDenominator), new Numberu64(ownerWithdrawFeeNumerator), new Numberu64(ownerWithdrawFeeDenominator), new Numberu64(hostFeeNumerator), new Numberu64(hostFeeDenominator), curveType, payer);
            // Allocate memory for the account
            const balanceNeeded = yield TokenSwap.getMinBalanceRentForExemptTokenSwap(connection);
            transaction = new web3_js_1.Transaction();
            transaction.add(web3_js_1.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: tokenSwapAccount.publicKey,
                lamports: balanceNeeded,
                space: exports.TokenSwapLayout.span,
                programId: swapProgramId,
            }));
            const instruction = TokenSwap.createInitSwapInstruction(tokenSwapAccount, authority, tokenAccountA, tokenAccountB, poolToken, feeAccount, tokenAccountPool, poolTokenProgramId, swapProgramId, tradeFeeNumerator, tradeFeeDenominator, ownerTradeFeeNumerator, ownerTradeFeeDenominator, ownerWithdrawFeeNumerator, ownerWithdrawFeeDenominator, hostFeeNumerator, hostFeeDenominator, curveType, curveParameters);
            transaction.add(instruction);
            yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer, tokenSwapAccount], confirmOptions);
            return tokenSwap;
        });
    }
    /**
     * Swap token A for token B
     *
     * @param userSource User's source token account
     * @param poolSource Pool's source token account
     * @param poolDestination Pool's destination token account
     * @param userDestination User's destination token account
     * @param sourceTokenProgramId Program id for the source token
     * @param destinationTokenProgramId Program id for the destination token
     * @param hostFeeAccount Host account to gather fees
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param amountIn Amount to transfer from source account
     * @param minimumAmountOut Minimum amount of tokens the user will receive
     */
    swap(userSource, poolSource, poolDestination, userDestination, sourceTokenProgramId, destinationTokenProgramId, hostFeeAccount, userTransferAuthority, amountIn, minimumAmountOut, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, web3_js_1.sendAndConfirmTransaction)(this.connection, new web3_js_1.Transaction().add(TokenSwap.swapInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userSource, poolSource, poolDestination, userDestination, this.poolToken, this.feeAccount, hostFeeAccount, this.swapProgramId, sourceTokenProgramId, destinationTokenProgramId, this.poolTokenProgramId, amountIn, minimumAmountOut)), [this.payer, userTransferAuthority], confirmOptions);
        });
    }
    static swapInstruction(tokenSwap, authority, userTransferAuthority, userSource, poolSource, poolDestination, userDestination, poolMint, feeAccount, hostFeeAccount, swapProgramId, sourceTokenProgramId, destinationTokenProgramId, poolTokenProgramId, amountIn, minimumAmountOut) {
        const dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('amountIn'),
            Layout.uint64('minimumAmountOut'),
        ]);
        const data = buffer_1.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 1,
            amountIn: new Numberu64(amountIn).toBuffer(),
            minimumAmountOut: new Numberu64(minimumAmountOut).toBuffer(),
        }, data);
        const keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: userSource, isSigner: false, isWritable: true },
            { pubkey: poolSource, isSigner: false, isWritable: true },
            { pubkey: poolDestination, isSigner: false, isWritable: true },
            { pubkey: userDestination, isSigner: false, isWritable: true },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: sourceTokenProgramId, isSigner: false, isWritable: false },
            { pubkey: destinationTokenProgramId, isSigner: false, isWritable: false },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
        ];
        if (hostFeeAccount !== null) {
            keys.push({ pubkey: hostFeeAccount, isSigner: false, isWritable: true });
        }
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
    /**
     * Deposit tokens into the pool
     * @param userAccountA User account for token A
     * @param userAccountB User account for token B
     * @param poolAccount User account for pool token
     * @param tokenProgramIdA Program id for token A
     * @param tokenProgramIdB Program id for token B
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param poolTokenAmount Amount of pool tokens to mint
     * @param maximumTokenA The maximum amount of token A to deposit
     * @param maximumTokenB The maximum amount of token B to deposit
     */
    depositAllTokenTypes(userAccountA, userAccountB, poolAccount, tokenProgramIdA, tokenProgramIdB, userTransferAuthority, poolTokenAmount, maximumTokenA, maximumTokenB, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, web3_js_1.sendAndConfirmTransaction)(this.connection, new web3_js_1.Transaction().add(TokenSwap.depositAllTokenTypesInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userAccountA, userAccountB, this.tokenAccountA, this.tokenAccountB, this.poolToken, poolAccount, this.swapProgramId, tokenProgramIdA, tokenProgramIdB, this.poolTokenProgramId, poolTokenAmount, maximumTokenA, maximumTokenB)), [this.payer, userTransferAuthority], confirmOptions);
        });
    }
    static depositAllTokenTypesInstruction(tokenSwap, authority, userTransferAuthority, sourceA, sourceB, intoA, intoB, poolToken, poolAccount, swapProgramId, tokenProgramIdA, tokenProgramIdB, poolTokenProgramId, poolTokenAmount, maximumTokenA, maximumTokenB) {
        const dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('poolTokenAmount'),
            Layout.uint64('maximumTokenA'),
            Layout.uint64('maximumTokenB'),
        ]);
        const data = buffer_1.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 2,
            poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
            maximumTokenA: new Numberu64(maximumTokenA).toBuffer(),
            maximumTokenB: new Numberu64(maximumTokenB).toBuffer(),
        }, data);
        const keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: sourceA, isSigner: false, isWritable: true },
            { pubkey: sourceB, isSigner: false, isWritable: true },
            { pubkey: intoA, isSigner: false, isWritable: true },
            { pubkey: intoB, isSigner: false, isWritable: true },
            { pubkey: poolToken, isSigner: false, isWritable: true },
            { pubkey: poolAccount, isSigner: false, isWritable: true },
            { pubkey: tokenProgramIdA, isSigner: false, isWritable: false },
            { pubkey: tokenProgramIdB, isSigner: false, isWritable: false },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
    /**
     * Withdraw tokens from the pool
     *
     * @param userAccountA User account for token A
     * @param userAccountB User account for token B
     * @param poolAccount User account for pool token
     * @param tokenProgramIdA Program id for token A
     * @param tokenProgramIdB Program id for token B
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param poolTokenAmount Amount of pool tokens to burn
     * @param minimumTokenA The minimum amount of token A to withdraw
     * @param minimumTokenB The minimum amount of token B to withdraw
     */
    withdrawAllTokenTypes(userAccountA, userAccountB, poolAccount, tokenProgramIdA, tokenProgramIdB, userTransferAuthority, poolTokenAmount, minimumTokenA, minimumTokenB, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, web3_js_1.sendAndConfirmTransaction)(this.connection, new web3_js_1.Transaction().add(TokenSwap.withdrawAllTokenTypesInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, this.poolToken, this.feeAccount, poolAccount, this.tokenAccountA, this.tokenAccountB, userAccountA, userAccountB, this.swapProgramId, this.poolTokenProgramId, tokenProgramIdA, tokenProgramIdB, poolTokenAmount, minimumTokenA, minimumTokenB)), [this.payer, userTransferAuthority], confirmOptions);
        });
    }
    static withdrawAllTokenTypesInstruction(tokenSwap, authority, userTransferAuthority, poolMint, feeAccount, sourcePoolAccount, fromA, fromB, userAccountA, userAccountB, swapProgramId, poolTokenProgramId, tokenProgramIdA, tokenProgramIdB, poolTokenAmount, minimumTokenA, minimumTokenB) {
        const dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('poolTokenAmount'),
            Layout.uint64('minimumTokenA'),
            Layout.uint64('minimumTokenB'),
        ]);
        const data = buffer_1.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 3,
            poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
            minimumTokenA: new Numberu64(minimumTokenA).toBuffer(),
            minimumTokenB: new Numberu64(minimumTokenB).toBuffer(),
        }, data);
        const keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: fromA, isSigner: false, isWritable: true },
            { pubkey: fromB, isSigner: false, isWritable: true },
            { pubkey: userAccountA, isSigner: false, isWritable: true },
            { pubkey: userAccountB, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
            { pubkey: tokenProgramIdA, isSigner: false, isWritable: false },
            { pubkey: tokenProgramIdB, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
    /**
     * Deposit one side of tokens into the pool
     * @param userAccount User account to deposit token A or B
     * @param poolAccount User account to receive pool tokens
     * @param sourceTokenProgramId Program id for the source token
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param sourceTokenAmount The amount of token A or B to deposit
     * @param minimumPoolTokenAmount Minimum amount of pool tokens to mint
     */
    depositSingleTokenTypeExactAmountIn(userAccount, poolAccount, sourceTokenProgramId, userTransferAuthority, sourceTokenAmount, minimumPoolTokenAmount, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, web3_js_1.sendAndConfirmTransaction)(this.connection, new web3_js_1.Transaction().add(TokenSwap.depositSingleTokenTypeExactAmountInInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, userAccount, this.tokenAccountA, this.tokenAccountB, this.poolToken, poolAccount, this.swapProgramId, sourceTokenProgramId, this.poolTokenProgramId, sourceTokenAmount, minimumPoolTokenAmount)), [this.payer, userTransferAuthority], confirmOptions);
        });
    }
    static depositSingleTokenTypeExactAmountInInstruction(tokenSwap, authority, userTransferAuthority, source, intoA, intoB, poolToken, poolAccount, swapProgramId, sourceTokenProgramId, poolTokenProgramId, sourceTokenAmount, minimumPoolTokenAmount) {
        const dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('sourceTokenAmount'),
            Layout.uint64('minimumPoolTokenAmount'),
        ]);
        const data = buffer_1.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 4,
            sourceTokenAmount: new Numberu64(sourceTokenAmount).toBuffer(),
            minimumPoolTokenAmount: new Numberu64(minimumPoolTokenAmount).toBuffer(),
        }, data);
        const keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: source, isSigner: false, isWritable: true },
            { pubkey: intoA, isSigner: false, isWritable: true },
            { pubkey: intoB, isSigner: false, isWritable: true },
            { pubkey: poolToken, isSigner: false, isWritable: true },
            { pubkey: poolAccount, isSigner: false, isWritable: true },
            { pubkey: sourceTokenProgramId, isSigner: false, isWritable: false },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
    /**
     * Withdraw tokens from the pool
     *
     * @param userAccount User account to receive token A or B
     * @param poolAccount User account to burn pool token
     * @param destinationTokenProgramId Program id for the destination token
     * @param userTransferAuthority Account delegated to transfer user's tokens
     * @param destinationTokenAmount The amount of token A or B to withdraw
     * @param maximumPoolTokenAmount Maximum amount of pool tokens to burn
     */
    withdrawSingleTokenTypeExactAmountOut(userAccount, poolAccount, destinationTokenProgramId, userTransferAuthority, destinationTokenAmount, maximumPoolTokenAmount, confirmOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, web3_js_1.sendAndConfirmTransaction)(this.connection, new web3_js_1.Transaction().add(TokenSwap.withdrawSingleTokenTypeExactAmountOutInstruction(this.tokenSwap, this.authority, userTransferAuthority.publicKey, this.poolToken, this.feeAccount, poolAccount, this.tokenAccountA, this.tokenAccountB, userAccount, this.swapProgramId, this.poolTokenProgramId, destinationTokenProgramId, destinationTokenAmount, maximumPoolTokenAmount)), [this.payer, userTransferAuthority], confirmOptions);
        });
    }
    static withdrawSingleTokenTypeExactAmountOutInstruction(tokenSwap, authority, userTransferAuthority, poolMint, feeAccount, sourcePoolAccount, fromA, fromB, userAccount, swapProgramId, poolTokenProgramId, destinationTokenProgramId, destinationTokenAmount, maximumPoolTokenAmount) {
        const dataLayout = BufferLayout.struct([
            BufferLayout.u8('instruction'),
            Layout.uint64('destinationTokenAmount'),
            Layout.uint64('maximumPoolTokenAmount'),
        ]);
        const data = buffer_1.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
            instruction: 5,
            destinationTokenAmount: new Numberu64(destinationTokenAmount).toBuffer(),
            maximumPoolTokenAmount: new Numberu64(maximumPoolTokenAmount).toBuffer(),
        }, data);
        const keys = [
            { pubkey: tokenSwap, isSigner: false, isWritable: false },
            { pubkey: authority, isSigner: false, isWritable: false },
            { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
            { pubkey: poolMint, isSigner: false, isWritable: true },
            { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
            { pubkey: fromA, isSigner: false, isWritable: true },
            { pubkey: fromB, isSigner: false, isWritable: true },
            { pubkey: userAccount, isSigner: false, isWritable: true },
            { pubkey: feeAccount, isSigner: false, isWritable: true },
            { pubkey: poolTokenProgramId, isSigner: false, isWritable: false },
            { pubkey: destinationTokenProgramId, isSigner: false, isWritable: false },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: swapProgramId,
            data,
        });
    }
}
exports.TokenSwap = TokenSwap;
