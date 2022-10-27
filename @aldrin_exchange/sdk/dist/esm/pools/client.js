var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import base58 from 'bs58';
import { CURVE, POOL_LAYOUT, POOL_V2_LAYOUT, SOLANA_RPC_ENDPOINT, SOL_MINT, } from '.';
import { POOLS_PROGRAM_ADDRESS, POOLS_V2_PROGRAM_ADDRESS, PRECISION_NOMINATOR, TokenClient } from '..';
import { sendTransaction } from '../transactions';
import { SIDE } from '../types';
import { accountDiscriminator, u64 } from '../utils';
import { Pool } from './pool';
/**
 * Aldrin AMM Pool client
 */
var TOKEN_ACCOUNT_RENT_LAMPORTS = 2040000;
var PoolClient = /** @class */ (function () {
    function PoolClient(connection) {
        if (connection === void 0) { connection = new Connection(SOLANA_RPC_ENDPOINT); }
        this.connection = connection;
        this.tokenClient = new TokenClient(this.connection);
    }
    PoolClient.getPoolAddress = function (poolVersion) {
        return poolVersion === 1 ? POOLS_PROGRAM_ADDRESS : POOLS_V2_PROGRAM_ADDRESS;
    };
    /**
     * Get list of all pools for v1 pools program
     * @param filters
     * @returns List of all pools for program
     */
    PoolClient.prototype.getPools = function (filters) {
        if (filters === void 0) { filters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var searchFilters, _a, _b, _c, accounts;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = [{ dataSize: POOL_LAYOUT.span }];
                        _d = {};
                        _e = {
                            offset: 0
                        };
                        _c = (_b = base58).encode;
                        return [4 /*yield*/, accountDiscriminator('Pool')];
                    case 1:
                        searchFilters = _a.concat([
                            (_d.memcmp = (_e.bytes = _c.apply(_b, [_f.sent()]),
                                _e),
                                _d)
                        ]);
                        if (filters.mint) {
                            searchFilters.push({ memcmp: { offset: POOL_LAYOUT.offsetOf('poolMint') || 0, bytes: filters.mint.toBase58() } });
                        }
                        return [4 /*yield*/, this.connection.getProgramAccounts(POOLS_PROGRAM_ADDRESS, {
                                filters: searchFilters,
                            })];
                    case 2:
                        accounts = _f.sent();
                        return [2 /*return*/, accounts.map(function (p) {
                                var data = p.account.data, pubkey = p.pubkey;
                                var account = POOL_LAYOUT.decode(data);
                                return __assign(__assign({}, account), { poolPublicKey: pubkey, poolVersion: 1, curveType: CURVE.PRODUCT });
                            })];
                }
            });
        });
    };
    /**
     * Get list of all pools for v2 pools program
     * @param filters
     * @returns List of all pools for program
     */
    PoolClient.prototype.getV2Pools = function (filters) {
        if (filters === void 0) { filters = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var searchFilters, _a, _b, _c, accounts;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = [{ dataSize: POOL_V2_LAYOUT.span }];
                        _d = {};
                        _e = {
                            offset: 0
                        };
                        _c = (_b = base58).encode;
                        return [4 /*yield*/, accountDiscriminator('Pool')];
                    case 1:
                        searchFilters = _a.concat([
                            (_d.memcmp = (_e.bytes = _c.apply(_b, [_f.sent()]),
                                _e),
                                _d)
                        ]);
                        if (filters.mint) {
                            searchFilters.push({ memcmp: { offset: POOL_V2_LAYOUT.offsetOf('poolMint') || 0, bytes: filters.mint.toBase58() } });
                        }
                        return [4 /*yield*/, this.connection.getProgramAccounts(POOLS_V2_PROGRAM_ADDRESS, {
                                filters: searchFilters,
                            })];
                    case 2:
                        accounts = _f.sent();
                        return [2 /*return*/, accounts.map(function (p) {
                                var data = p.account.data, pubkey = p.pubkey;
                                var account = POOL_V2_LAYOUT.decode(data);
                                return __assign(__assign({}, account), { poolPublicKey: pubkey, poolVersion: 2 });
                            })];
                }
            });
        });
    };
    /**
     * Add liquidity to AMM pool
     * @param params
     * @returns transaction Id
     */
    PoolClient.prototype.depositLiquidity = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pool, maxBaseTokenAmount, wallet, _a, slippage, userPoolTokenAccount, poolPublicKey, poolMint, baseTokenVault, _b, poolVersion, transaction, programId, poolSigner, poolMintInfo, baseVaultTokenAmount, creationSize, _c, createAccountTransaction, newAccountPubkey, instruction;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        pool = params.pool, maxBaseTokenAmount = params.maxBaseTokenAmount, wallet = params.wallet, _a = params.slippage, slippage = _a === void 0 ? 0.01 : _a;
                        userPoolTokenAccount = params.userPoolTokenAccount;
                        poolPublicKey = pool.poolPublicKey, poolMint = pool.poolMint, baseTokenVault = pool.baseTokenVault, _b = pool.poolVersion, poolVersion = _b === void 0 ? 1 : _b;
                        transaction = new Transaction();
                        programId = PoolClient.getPoolAddress(poolVersion);
                        return [4 /*yield*/, PublicKey.findProgramAddress([poolPublicKey.toBuffer()], programId)];
                    case 1:
                        poolSigner = (_d.sent())[0];
                        return [4 /*yield*/, this.tokenClient.getMintInfo(poolMint)];
                    case 2:
                        poolMintInfo = _d.sent();
                        return [4 /*yield*/, this.tokenClient.getTokenAccount(baseTokenVault)];
                    case 3:
                        baseVaultTokenAmount = _d.sent();
                        creationSize = poolMintInfo.supply
                            .mul(maxBaseTokenAmount)
                            .div(baseVaultTokenAmount.amount)
                            .muln(1 - slippage);
                        if (!!userPoolTokenAccount) return [3 /*break*/, 5];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: wallet.publicKey,
                                mint: poolMint,
                            })];
                    case 4:
                        _c = _d.sent(), createAccountTransaction = _c.transaction, newAccountPubkey = _c.newAccountPubkey;
                        userPoolTokenAccount = newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        _d.label = 5;
                    case 5:
                        instruction = Pool.depositLiquididtyInstruction(__assign(__assign({}, params), { walletAuthority: wallet.publicKey, poolSigner: poolSigner, userPoolTokenAccount: userPoolTokenAccount, creationSize: creationSize, programId: programId }));
                        transaction.add(instruction);
                        return [2 /*return*/, sendTransaction({
                                wallet: wallet,
                                connection: this.connection,
                                transaction: transaction,
                            })];
                }
            });
        });
    };
    /**
     * Helper method for calculation max wihdrwawable based on LP tokens amount
     * @param params
     * @returns
     */
    PoolClient.prototype.getMaxWithdrawable = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, poolMint, baseTokenVault, quoteTokenVault, poolTokenAmount, _b, poolMintInfo, baseTokenInfo, quoteTokenInfo, supply, baseTokenAmount, quoteTokenAmount, withdrawAmountBase, withdrawAmountQuote;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.pool, poolMint = _a.poolMint, baseTokenVault = _a.baseTokenVault, quoteTokenVault = _a.quoteTokenVault, poolTokenAmount = params.poolTokenAmount;
                        return [4 /*yield*/, Promise.all([
                                this.tokenClient.getMintInfo(poolMint),
                                this.tokenClient.getTokenAccount(baseTokenVault),
                                this.tokenClient.getTokenAccount(quoteTokenVault),
                            ])];
                    case 1:
                        _b = _c.sent(), poolMintInfo = _b[0], baseTokenInfo = _b[1], quoteTokenInfo = _b[2];
                        supply = poolMintInfo.supply;
                        baseTokenAmount = baseTokenInfo.amount;
                        quoteTokenAmount = quoteTokenInfo.amount;
                        withdrawAmountBase = baseTokenAmount.mul(poolTokenAmount).div(supply);
                        withdrawAmountQuote = quoteTokenAmount.mul(poolTokenAmount).div(supply);
                        return [2 /*return*/, {
                                withdrawAmountBase: withdrawAmountBase,
                                withdrawAmountQuote: withdrawAmountQuote,
                            }];
                }
            });
        });
    };
    /**
     * Withdraw liquidity from AMM pool
     * @param params
     * @returns {Promise<stirng>} - Transaction Id
     */
    PoolClient.prototype.withdrawLiquidity = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pool, _a, slippage, wallet, baseTokenReturnedMin, quoteTokenReturnedMin, userBaseTokenAccount, userQuoteTokenAccount, poolPublicKey, baseTokenMint, quoteTokenMint, _b, poolVersion, programId, poolSigner, transaction, _c, createAccountTransaction, newAccountPubkey, _d, createAccountTransaction, newAccountPubkey, maxWithdraw, instruction;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        pool = params.pool, _a = params.slippage, slippage = _a === void 0 ? 0.001 : _a, wallet = params.wallet;
                        baseTokenReturnedMin = params.baseTokenReturnedMin, quoteTokenReturnedMin = params.quoteTokenReturnedMin, userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount;
                        poolPublicKey = pool.poolPublicKey, baseTokenMint = pool.baseTokenMint, quoteTokenMint = pool.quoteTokenMint, _b = pool.poolVersion, poolVersion = _b === void 0 ? 1 : _b;
                        programId = PoolClient.getPoolAddress(poolVersion);
                        return [4 /*yield*/, PublicKey.findProgramAddress([poolPublicKey.toBuffer()], programId)];
                    case 1:
                        poolSigner = (_e.sent())[0];
                        transaction = new Transaction();
                        if (!!userBaseTokenAccount) return [3 /*break*/, 3];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: wallet.publicKey,
                                mint: baseTokenMint,
                            })];
                    case 2:
                        _c = _e.sent(), createAccountTransaction = _c.transaction, newAccountPubkey = _c.newAccountPubkey;
                        userBaseTokenAccount = newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        _e.label = 3;
                    case 3:
                        if (!!userQuoteTokenAccount) return [3 /*break*/, 5];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: wallet.publicKey,
                                mint: quoteTokenMint,
                            })];
                    case 4:
                        _d = _e.sent(), createAccountTransaction = _d.transaction, newAccountPubkey = _d.newAccountPubkey;
                        userQuoteTokenAccount = newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        _e.label = 5;
                    case 5:
                        if (!(!baseTokenReturnedMin || !quoteTokenReturnedMin)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getMaxWithdrawable(params)];
                    case 6:
                        maxWithdraw = _e.sent();
                        baseTokenReturnedMin = baseTokenReturnedMin || maxWithdraw.withdrawAmountBase;
                        quoteTokenReturnedMin = quoteTokenReturnedMin || maxWithdraw.withdrawAmountQuote;
                        _e.label = 7;
                    case 7:
                        baseTokenReturnedMin = baseTokenReturnedMin.muln(1 - slippage);
                        quoteTokenReturnedMin = quoteTokenReturnedMin.muln(1 - slippage);
                        instruction = Pool.withdrawLiquidityInstruction(__assign(__assign({}, params), { userBaseTokenAccount: userBaseTokenAccount, userQuoteTokenAccount: userQuoteTokenAccount, baseTokenReturnedMin: baseTokenReturnedMin, quoteTokenReturnedMin: quoteTokenReturnedMin, poolSigner: poolSigner, walletAuthority: wallet.publicKey, programId: programId }));
                        transaction.add(instruction);
                        return [2 /*return*/, sendTransaction({
                                wallet: wallet,
                                connection: this.connection,
                                transaction: transaction,
                            })];
                }
            });
        });
    };
    /**
     * Swap tokens
     * @param params
     * @returns {Promise<string>} - Transaction Id
     */
    PoolClient.prototype.swap = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, baseTokenMint, quoteTokenMint, poolPublicKey, _c, poolVersion, referralParams, _d, slippage, side, wallet, outcomeAmount, userBaseTokenAccount, userQuoteTokenAccount, transaction, _e, createAccountTransaction, newAccountPubkey, _f, createAccountTransaction, newAccountPubkey, programId, poolSigner, minIncomeAmount, refFeeAmount, incomeMint_1, takeFeesFromAccount, walletTokensResponse, walletTokens, feesDestination, _g, createAccountTransaction, newAccountPubkey;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _b = params.pool, baseTokenMint = _b.baseTokenMint, quoteTokenMint = _b.quoteTokenMint, poolPublicKey = _b.poolPublicKey, _c = _b.poolVersion, poolVersion = _c === void 0 ? 1 : _c, referralParams = params.referralParams, _d = params.slippage, slippage = _d === void 0 ? 0.001 : _d, side = params.side, wallet = params.wallet, outcomeAmount = params.outcomeAmount;
                        userBaseTokenAccount = params.userBaseTokenAccount, userQuoteTokenAccount = params.userQuoteTokenAccount;
                        transaction = new Transaction();
                        if (!!userBaseTokenAccount) return [3 /*break*/, 2];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: wallet.publicKey,
                                mint: baseTokenMint,
                                amount: side === SIDE.ASK ? parseInt(outcomeAmount.toString(), 10) + TOKEN_ACCOUNT_RENT_LAMPORTS : undefined,
                            })];
                    case 1:
                        _e = _h.sent(), createAccountTransaction = _e.transaction, newAccountPubkey = _e.newAccountPubkey;
                        userBaseTokenAccount = newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        _h.label = 2;
                    case 2:
                        if (!!userQuoteTokenAccount) return [3 /*break*/, 4];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: wallet.publicKey,
                                mint: quoteTokenMint,
                                amount: side === SIDE.BID ? parseInt(outcomeAmount.toString(), 10) + TOKEN_ACCOUNT_RENT_LAMPORTS : undefined,
                            })];
                    case 3:
                        _f = _h.sent(), createAccountTransaction = _f.transaction, newAccountPubkey = _f.newAccountPubkey;
                        userQuoteTokenAccount = newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        _h.label = 4;
                    case 4:
                        programId = PoolClient.getPoolAddress(poolVersion);
                        return [4 /*yield*/, PublicKey.findProgramAddress([poolPublicKey.toBuffer()], programId)];
                    case 5:
                        poolSigner = (_h.sent())[0];
                        minIncomeAmount = params.minIncomeAmount.muln(1000 - slippage * 1000).divn(1000);
                        transaction.add(Pool.swapInstruction(__assign(__assign({}, params), { minIncomeAmount: minIncomeAmount, poolSigner: poolSigner, walletAuthority: wallet.publicKey, userBaseTokenAccount: userBaseTokenAccount, userQuoteTokenAccount: userQuoteTokenAccount, poolVersion: poolVersion })));
                        if (baseTokenMint.equals(SOL_MINT)) {
                            transaction.add(Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, userBaseTokenAccount, wallet.publicKey, wallet.publicKey, []));
                        }
                        if (quoteTokenMint.equals(SOL_MINT)) {
                            transaction.add(Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, userQuoteTokenAccount, wallet.publicKey, wallet.publicKey, []));
                        }
                        if (!referralParams) return [3 /*break*/, 9];
                        refFeeAmount = new u64(minIncomeAmount.mul(PRECISION_NOMINATOR.muln(referralParams.referralPercent).divn(100)).div(PRECISION_NOMINATOR));
                        incomeMint_1 = (side === SIDE.ASK ? params.pool.quoteTokenMint : params.pool.baseTokenMint).toString();
                        takeFeesFromAccount = side === SIDE.ASK ? userQuoteTokenAccount : userBaseTokenAccount;
                        return [4 /*yield*/, this.connection.getParsedTokenAccountsByOwner(referralParams.referralAccount, {
                                programId: TOKEN_PROGRAM_ID,
                            })];
                    case 6:
                        walletTokensResponse = _h.sent();
                        walletTokens = walletTokensResponse.value;
                        feesDestination = incomeMint_1 === SOL_MINT.toString() ? referralParams.referralAccount : (_a = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === incomeMint_1; })) === null || _a === void 0 ? void 0 : _a.pubkey;
                        if (!(!feesDestination && referralParams.createTokenAccounts)) return [3 /*break*/, 8];
                        return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                owner: referralParams.referralAccount,
                                mint: new PublicKey(incomeMint_1),
                                payer: wallet.publicKey,
                            })];
                    case 7:
                        _g = _h.sent(), createAccountTransaction = _g.transaction, newAccountPubkey = _g.newAccountPubkey;
                        transaction.add(createAccountTransaction);
                        feesDestination = newAccountPubkey;
                        _h.label = 8;
                    case 8:
                        if (!feesDestination) {
                            throw new Error('No token account for referral wallet!');
                        }
                        if (incomeMint_1 === SOL_MINT.toString()) {
                            transaction.add(SystemProgram.transfer({
                                fromPubkey: wallet.publicKey,
                                toPubkey: feesDestination,
                                lamports: parseInt(refFeeAmount.toString(), 10),
                            }));
                        }
                        else {
                            transaction.add(Token.createTransferInstruction(TOKEN_PROGRAM_ID, takeFeesFromAccount, feesDestination, wallet.publicKey, [], parseInt(refFeeAmount.toString(), 10)));
                        }
                        _h.label = 9;
                    case 9: return [2 /*return*/, sendTransaction({
                            wallet: wallet,
                            connection: this.connection,
                            transaction: transaction,
                        })];
                }
            });
        });
    };
    return PoolClient;
}());
export { PoolClient };
