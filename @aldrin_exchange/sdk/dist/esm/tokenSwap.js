var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Connection, PublicKey, Transaction, } from '@solana/web3.js';
import { computeOutputAmount } from '@orca-so/stablecurve';
import { Farming, FarmingClient, PRECISION_NOMINATOR, TokenClient } from '.';
import { CURVE, PoolClient, SIDE, SOLANA_RPC_ENDPOINT, SWAP_FEE_DENOMINATOR, SWAP_FEE_NUMERATOR, } from './pools';
import { SwapBase } from './swapBase';
import { sendTransaction } from './transactions';
import BN from 'bn.js';
/**
 * High-level API for Aldrin AMM Pools
 */
var TokenSwap = /** @class */ (function (_super) {
    __extends(TokenSwap, _super);
    function TokenSwap(pools, poolClient, tokenClient, farmingClient, connection, wallet, referralParams) {
        if (connection === void 0) { connection = new Connection(SOLANA_RPC_ENDPOINT); }
        if (wallet === void 0) { wallet = null; }
        if (referralParams === void 0) { referralParams = undefined; }
        var _this = _super.call(this, tokenClient, connection) || this;
        _this.pools = pools;
        _this.poolClient = poolClient;
        _this.tokenClient = tokenClient;
        _this.farmingClient = farmingClient;
        _this.connection = connection;
        _this.wallet = wallet;
        _this.referralParams = referralParams;
        return _this;
    }
    TokenSwap.prototype.findPool = function (mintFrom, mintTo) {
        var pool = this.pools.find(function (p) {
            return (p.baseTokenMint.equals(mintFrom) && p.quoteTokenMint.equals(mintTo)) ||
                (p.baseTokenMint.equals(mintTo) && p.quoteTokenMint.equals(mintFrom));
        });
        if (!pool) {
            return null;
        }
        var isInverted = pool.quoteTokenMint.equals(mintTo);
        return { pool: pool, isInverted: isInverted };
    };
    TokenSwap.prototype.swap = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var resolvedInputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveSwapInputs(params)];
                    case 1:
                        resolvedInputs = _a.sent();
                        return [2 /*return*/, this.poolClient.swap(__assign(__assign({}, resolvedInputs), { slippage: params.slippage, referralParams: this.referralParams }))];
                }
            });
        });
    };
    /**
     * Make tokens swap
     * @returns Transaction Id
     */
    TokenSwap.prototype.resolveSwapInputs = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wallet, mintFrom, mintTo, minIncomeAmount, outcomeAmount, poolSearch, pool, isInverted, baseTokenVault, quoteTokenVault, curveType, _b, baseVaultAccount, quoteVaultAccount, X, Y, B, A, walletTokens, baseMint, quoteMint, userBaseTokenAccount, userQuoteTokenAccount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.wallet, wallet = _a === void 0 ? this.wallet : _a, mintFrom = params.mintFrom, mintTo = params.mintTo;
                        minIncomeAmount = params.minIncomeAmount, outcomeAmount = params.outcomeAmount;
                        if (!wallet) {
                            throw new Error('Wallet not provided');
                        }
                        poolSearch = this.findPool(mintFrom, mintTo);
                        if (!poolSearch) {
                            throw new Error('Pool for mints not found'); // TODO: pools routing
                        }
                        pool = poolSearch.pool, isInverted = poolSearch.isInverted;
                        baseTokenVault = pool.baseTokenVault, quoteTokenVault = pool.quoteTokenVault, curveType = pool.curveType;
                        return [4 /*yield*/, Promise.all([
                                this.tokenClient.getTokenAccount(baseTokenVault),
                                this.tokenClient.getTokenAccount(quoteTokenVault),
                            ])
                            /**
                            *
                            * Buy BASE on B QUOTE
                            *
                            * Calculate exact buy price & amount
                            * Calculation does not consider any fees, please check {PoolRpcResponse#fees}
                            *
                            * X - Base token amount in pool
                            * Y - Quote token amount in pool
                            * A - Token amount to buy
                            * B - Quote token amount
                            *
                            * X * Y = (X - A) * (Y + B)
                            *
                            * X - A = (X * Y) / (Y + B)
                            *
                            * A = X - (X * Y) / (Y + B)
                            *
                            *
                            *
                            * Y + B = (X * Y)  / (X - A)
                            *
                            * B = (X * Y)  / (X - A) - Y
                            *
                            * */
                        ];
                    case 1:
                        _b = _c.sent(), baseVaultAccount = _b[0], quoteVaultAccount = _b[1];
                        X = isInverted ? quoteVaultAccount.amount : baseVaultAccount.amount;
                        Y = isInverted ? baseVaultAccount.amount : quoteVaultAccount.amount;
                        if (!minIncomeAmount) {
                            if (!outcomeAmount) {
                                throw new Error('No amounts defined'); // Type-check hack
                            }
                            B = outcomeAmount;
                            minIncomeAmount = curveType === CURVE.STABLE
                                ? outcomeAmount
                                : X
                                    .sub(X.mul(Y)
                                    .div(Y.add(B)));
                        }
                        if (!outcomeAmount) {
                            A = minIncomeAmount;
                            outcomeAmount = curveType === CURVE.STABLE
                                ? minIncomeAmount
                                : X
                                    .mul(Y)
                                    .div(X.sub(A))
                                    .sub(Y);
                        }
                        return [4 /*yield*/, this.getWalletTokens(wallet)];
                    case 2:
                        walletTokens = _c.sent();
                        baseMint = baseVaultAccount.mint.toBase58();
                        quoteMint = quoteVaultAccount.mint.toBase58();
                        userBaseTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === baseMint; });
                        userQuoteTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === quoteMint; });
                        return [2 /*return*/, {
                                pool: pool,
                                minIncomeAmount: minIncomeAmount,
                                outcomeAmount: outcomeAmount,
                                userBaseTokenAccount: userBaseTokenAccount === null || userBaseTokenAccount === void 0 ? void 0 : userBaseTokenAccount.pubkey,
                                userQuoteTokenAccount: userQuoteTokenAccount === null || userQuoteTokenAccount === void 0 ? void 0 : userQuoteTokenAccount.pubkey,
                                side: isInverted ? SIDE.ASK : SIDE.BID,
                                isInverted: isInverted,
                                wallet: wallet,
                            }];
                }
            });
        });
    };
    TokenSwap.prototype.getSwapImpact = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pool, minIncomeAmount, outcomeAmount, isInverted, baseTokenVault, baseVaultAccount, poolsAmountDiff, priceImpact, fee;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.resolveSwapInputs(params)];
                    case 1:
                        _a = _b.sent(), pool = _a.pool, minIncomeAmount = _a.minIncomeAmount, outcomeAmount = _a.outcomeAmount, isInverted = _a.isInverted;
                        baseTokenVault = pool.baseTokenVault;
                        return [4 /*yield*/, this.tokenClient.getTokenAccount(baseTokenVault)];
                    case 2:
                        baseVaultAccount = _b.sent();
                        poolsAmountDiff = !isInverted
                            ? baseVaultAccount.amount.div(minIncomeAmount)
                            : baseVaultAccount.amount.div(outcomeAmount);
                        priceImpact = 100 / (poolsAmountDiff.toNumber() + 1);
                        fee = outcomeAmount.mul(SWAP_FEE_NUMERATOR).div(SWAP_FEE_DENOMINATOR);
                        return [2 /*return*/, {
                                minIncomeAmount: minIncomeAmount,
                                outcomeAmount: outcomeAmount,
                                priceImpact: priceImpact,
                                isInverted: isInverted,
                                fee: fee,
                            }];
                }
            });
        });
    };
    /**
     * Add liquidity to Aldrin's AMM pool
     * @param params
     * @returns Transaction Id
     */
    TokenSwap.prototype.depositLiquidity = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var poolMint, _a, wallet, maxBase, maxQuote, pool, baseTokenVault, quoteTokenVault, baseTokenMint, quoteTokenMint, _b, baseVaultAccount, quoteVaultAccount, price, walletTokens, baseMint, quoteMint, userBaseTokenAccount, userQuoteTokenAccount, poolTokenAccount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        poolMint = params.poolMint, _a = params.wallet, wallet = _a === void 0 ? this.wallet : _a;
                        maxBase = params.maxBase, maxQuote = params.maxQuote;
                        if (!wallet) {
                            throw new Error('Wallet not provided');
                        }
                        pool = this.pools.find(function (p) { return p.poolMint.equals(poolMint); });
                        if (!pool) {
                            throw new Error("Pool with mint " + poolMint.toBase58() + " not found");
                        }
                        baseTokenVault = pool.baseTokenVault, quoteTokenVault = pool.quoteTokenVault, baseTokenMint = pool.baseTokenMint, quoteTokenMint = pool.quoteTokenMint;
                        return [4 /*yield*/, Promise.all([
                                this.tokenClient.getTokenAccount(baseTokenVault),
                                this.tokenClient.getTokenAccount(quoteTokenVault),
                            ])];
                    case 1:
                        _b = _c.sent(), baseVaultAccount = _b[0], quoteVaultAccount = _b[1];
                        price = quoteVaultAccount.amount.mul(PRECISION_NOMINATOR).div(baseVaultAccount.amount);
                        return [4 /*yield*/, this.getWalletTokens(wallet)];
                    case 2:
                        walletTokens = _c.sent();
                        baseMint = baseTokenMint.toBase58();
                        quoteMint = quoteTokenMint.toBase58();
                        userBaseTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === baseMint; });
                        userQuoteTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === quoteMint; });
                        if (!userBaseTokenAccount) {
                            throw new Error('Unable to add liquidity: base token account not found');
                        }
                        if (!userQuoteTokenAccount) {
                            throw new Error('Unable to add liquidity: quote token account not found');
                        }
                        if (!maxBase) {
                            if (!maxQuote) {
                                throw new Error('Neither base nor quote amounts does not provided!'); // TODO: max?
                            }
                            maxBase = maxQuote.mul(PRECISION_NOMINATOR).div(price);
                        }
                        if (!maxQuote) {
                            maxQuote = maxBase.mul(price).div(PRECISION_NOMINATOR);
                        }
                        poolTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === pool.poolMint.toBase58(); });
                        return [2 /*return*/, this.poolClient.depositLiquidity({
                                pool: pool,
                                userPoolTokenAccount: poolTokenAccount ? poolTokenAccount.pubkey : null,
                                maxBaseTokenAmount: maxBase,
                                maxQuoteTokenAmount: maxQuote,
                                userBaseTokenAccount: userBaseTokenAccount.pubkey,
                                userQuoteTokenAccount: userQuoteTokenAccount.pubkey,
                                wallet: wallet,
                            })];
                }
            });
        });
    };
    /**
     * Withdraw liquidity from Aldrin's AMM pool
     * @param params
     * @returns Transaction Id
     */
    TokenSwap.prototype.withdrawLiquidity = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var poolMint, _a, wallet, poolTokenAmount, pool, baseTokenMint, quoteTokenMint, walletTokens, baseMint, quoteMint, userBaseTokenAccount, userQuoteTokenAccount, poolTokenAccount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        poolMint = params.poolMint, _a = params.wallet, wallet = _a === void 0 ? this.wallet : _a, poolTokenAmount = params.poolTokenAmount;
                        if (!wallet) {
                            throw new Error('Wallet not provided');
                        }
                        pool = this.pools.find(function (p) { return p.poolMint.equals(poolMint); });
                        if (!pool) {
                            throw new Error("Pool with mint " + poolMint.toBase58() + " not found");
                        }
                        baseTokenMint = pool.baseTokenMint, quoteTokenMint = pool.quoteTokenMint;
                        return [4 /*yield*/, this.getWalletTokens(wallet)];
                    case 1:
                        walletTokens = _b.sent();
                        baseMint = baseTokenMint.toBase58();
                        quoteMint = quoteTokenMint.toBase58();
                        userBaseTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === baseMint; });
                        userQuoteTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === quoteMint; });
                        poolTokenAccount = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === pool.poolMint.toBase58(); });
                        if (!poolTokenAccount) {
                            throw new Error('Unable to withdraw liquidity: pool token account not found');
                        }
                        return [2 /*return*/, this.poolClient.withdrawLiquidity({
                                pool: pool,
                                userPoolTokenAccount: poolTokenAccount.pubkey,
                                userBaseTokenAccount: userBaseTokenAccount === null || userBaseTokenAccount === void 0 ? void 0 : userBaseTokenAccount.pubkey,
                                userQuoteTokenAccount: userQuoteTokenAccount === null || userQuoteTokenAccount === void 0 ? void 0 : userQuoteTokenAccount.pubkey,
                                poolTokenAmount: poolTokenAmount,
                                slippage: params.slippage,
                                wallet: wallet,
                                baseTokenReturnedMin: params.minBase,
                                quoteTokenReturnedMin: params.minQuote,
                            })];
                }
            });
        });
    };
    /**
     * Calculate price of mintForm/mintTo tokens
     * @param params
     * @returns
     */
    TokenSwap.prototype.getPrice = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var mintFrom, mintTo, poolSearch, pool, isInverted, baseTokenMint, baseTokenVault, quoteTokenMint, quoteTokenVault, poolVersion, _a, baseMintInfo, quoteMintInfo, baseVaultAccount, quoteVaultAccount, curveType, amountToSwap, poolInputAmount, poolOutputAmount, outputAmount, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mintFrom = params.mintFrom, mintTo = params.mintTo;
                        poolSearch = this.findPool(mintFrom, mintTo);
                        if (!poolSearch) {
                            throw new Error('Pool for mints not found'); // TODO: pools routing
                        }
                        pool = poolSearch.pool, isInverted = poolSearch.isInverted;
                        baseTokenMint = pool.baseTokenMint, baseTokenVault = pool.baseTokenVault, quoteTokenMint = pool.quoteTokenMint, quoteTokenVault = pool.quoteTokenVault, poolVersion = pool.poolVersion;
                        return [4 /*yield*/, Promise.all([
                                this.getMintInfo(baseTokenMint),
                                this.getMintInfo(quoteTokenMint),
                                this.tokenClient.getTokenAccount(baseTokenVault),
                                this.tokenClient.getTokenAccount(quoteTokenVault),
                            ])];
                    case 1:
                        _a = _b.sent(), baseMintInfo = _a[0], quoteMintInfo = _a[1], baseVaultAccount = _a[2], quoteVaultAccount = _a[3];
                        if (poolVersion === 2) {
                            curveType = pool.curveType;
                            if (curveType === 1) {
                                amountToSwap = isInverted ? baseVaultAccount.amount.divn(2) : quoteVaultAccount.amount.divn(2);
                                poolInputAmount = isInverted ? quoteVaultAccount.amount : baseVaultAccount.amount;
                                poolOutputAmount = isInverted ? baseVaultAccount.amount : quoteVaultAccount.amount;
                                outputAmount = computeOutputAmount(amountToSwap, poolInputAmount, poolOutputAmount, new BN(170));
                                return [2 /*return*/, parseFloat(outputAmount
                                        .mul(PRECISION_NOMINATOR)
                                        .mul(baseMintInfo.decimalDenominator)
                                        .div(quoteMintInfo.decimalDenominator)
                                        .toString()) / parseFloat(amountToSwap.toString()) / PRECISION_NOMINATOR.toNumber()];
                            }
                        }
                        price = quoteVaultAccount.amount
                            .mul(PRECISION_NOMINATOR)
                            .mul(baseMintInfo.decimalDenominator)
                            .div(quoteMintInfo.decimalDenominator)
                            .div(baseVaultAccount.amount);
                        if (isInverted) {
                            return [2 /*return*/, PRECISION_NOMINATOR.toNumber() / price.toNumber()];
                        }
                        return [2 /*return*/, price.toNumber() / PRECISION_NOMINATOR.toNumber()];
                }
            });
        });
    };
    /**
     * Auto-initialize Tokenswap
     */
    TokenSwap.initialize = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, wallet, poolClient, tokenClient, farmingClient, _b, pools, v2Pools;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.connection, connection = _a === void 0 ? new Connection(SOLANA_RPC_ENDPOINT) : _a, wallet = params.wallet;
                        poolClient = new PoolClient(connection);
                        tokenClient = new TokenClient(connection);
                        farmingClient = new FarmingClient(connection);
                        return [4 /*yield*/, Promise.all([
                                poolClient.getPools(),
                                poolClient.getV2Pools(),
                            ])];
                    case 1:
                        _b = _c.sent(), pools = _b[0], v2Pools = _b[1];
                        return [2 /*return*/, new TokenSwap(__spreadArray(__spreadArray([], pools, true), v2Pools, true), poolClient, tokenClient, farmingClient, connection, wallet, params.referralParams)];
                }
            });
        });
    };
    TokenSwap.prototype.getFarmed = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var poolMint, _a, wallet, pool, tickets, states, stateKeys, stateVaults, calcAccounts, calcAccountsForStates;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        poolMint = params.poolMint, _a = params.wallet, wallet = _a === void 0 ? this.wallet : _a;
                        if (!wallet) {
                            throw new Error('Wallet not provided');
                        }
                        pool = this.pools.find(function (p) { return p.poolMint.equals(poolMint); });
                        if (!pool) {
                            throw new Error('Pool not found!');
                        }
                        return [4 /*yield*/, this.farmingClient.getFarmingTickets({ userKey: wallet.publicKey, pool: pool.poolPublicKey })];
                    case 1:
                        tickets = _b.sent();
                        if (tickets.length === 0) {
                            throw new Error('No tickets, nothing to check');
                        }
                        return [4 /*yield*/, this.farmingClient.getFarmingState({ poolPublicKey: pool.poolPublicKey, poolVersion: pool.poolVersion })];
                    case 2:
                        states = _b.sent();
                        stateKeys = states.map(function (state) { return state.farmingStatePublicKey.toBase58(); });
                        return [4 /*yield*/, Promise.all(states.map(function (state) { return __awaiter(_this, void 0, void 0, function () {
                                var tokenInfo;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.tokenClient.getTokenAccount(state.farmingTokenVault)];
                                        case 1:
                                            tokenInfo = _a.sent();
                                            return [2 /*return*/, {
                                                    tokenInfo: tokenInfo,
                                                    state: state,
                                                }];
                                    }
                                });
                            }); }))];
                    case 3:
                        stateVaults = _b.sent();
                        return [4 /*yield*/, this.farmingClient.getFarmingCalcAccounts({
                                poolVersion: pool.poolVersion,
                                userKey: wallet.publicKey,
                            })];
                    case 4:
                        calcAccounts = _b.sent();
                        calcAccountsForStates = calcAccounts.filter(function (ca) { return stateKeys.includes(ca.farmingState.toBase58()); });
                        return [2 /*return*/, stateVaults.map(function (sv) {
                                var calcAccount = calcAccountsForStates.find(function (ca) { return ca.farmingState.equals(sv.state.farmingStatePublicKey); });
                                return __assign(__assign({}, sv), { calcAccount: calcAccount });
                            }).filter(function (sv) { var _a; return (_a = sv.calcAccount) === null || _a === void 0 ? void 0 : _a.tokenAmount.gtn(0); })];
                }
            });
        });
    };
    TokenSwap.prototype.claimFarmed = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wallet, poolMint, farmed, pool, programId, poolSigner, walletTokens, transactions;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = params.wallet, wallet = _a === void 0 ? this.wallet : _a, poolMint = params.poolMint;
                        if (!wallet) {
                            throw new Error('Wallet not provided');
                        }
                        return [4 /*yield*/, this.getFarmed(params)];
                    case 1:
                        farmed = _b.sent();
                        pool = this.pools.find(function (p) { return p.poolMint.equals(poolMint); });
                        if (!pool) {
                            throw new Error('Pool not found!');
                        }
                        programId = PoolClient.getPoolAddress(pool.poolVersion);
                        return [4 /*yield*/, PublicKey.findProgramAddress([pool === null || pool === void 0 ? void 0 : pool.poolPublicKey.toBuffer()], programId)];
                    case 2:
                        poolSigner = (_b.sent())[0];
                        return [4 /*yield*/, this.getWalletTokens(wallet)];
                    case 3:
                        walletTokens = _b.sent();
                        return [4 /*yield*/, Promise.all(farmed
                                .flatMap(function (state) { return __awaiter(_this, void 0, void 0, function () {
                                var farmingToken, instructions, userFarmingTokenAccount, _a, createAccountTransaction, newAccountPubkey, withdrawInstruction;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.tokenClient.getTokenAccount(state.state.farmingTokenVault)];
                                        case 1:
                                            farmingToken = _c.sent();
                                            instructions = [];
                                            userFarmingTokenAccount = (_b = walletTokens.find(function (wt) { return wt.account.data.parsed.info.mint === farmingToken.mint.toBase58(); })) === null || _b === void 0 ? void 0 : _b.pubkey;
                                            if (!!userFarmingTokenAccount) return [3 /*break*/, 3];
                                            return [4 /*yield*/, TokenClient.createTokenAccountTransaction({
                                                    owner: wallet.publicKey,
                                                    mint: farmingToken.mint,
                                                })];
                                        case 2:
                                            _a = _c.sent(), createAccountTransaction = _a.transaction, newAccountPubkey = _a.newAccountPubkey;
                                            userFarmingTokenAccount = newAccountPubkey;
                                            instructions.push.apply(instructions, createAccountTransaction.instructions);
                                            _c.label = 3;
                                        case 3:
                                            if (state.calcAccount) {
                                                withdrawInstruction = Farming.withdrawFarmedInstruction({
                                                    farmingState: state.state.farmingStatePublicKey,
                                                    farmingCalc: state.calcAccount.farmingCalcPublicKey,
                                                    farmingTokenVault: state.state.farmingTokenVault,
                                                    userFarmingTokenAccount: userFarmingTokenAccount,
                                                    userKey: wallet.publicKey,
                                                    poolPublicKey: pool.poolPublicKey,
                                                    poolSigner: poolSigner,
                                                    programId: programId,
                                                });
                                                instructions.push(withdrawInstruction);
                                            }
                                            return [2 /*return*/, instructions];
                                    }
                                });
                            }); }))];
                    case 4:
                        transactions = _b.sent();
                        return [2 /*return*/, Promise.all(transactions
                                .flat()
                                .map(function (_) { return new Transaction().add(_); })
                                .map(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, sendTransaction({
                                            transaction: transaction,
                                            wallet: wallet,
                                            connection: this.connection,
                                        })];
                                });
                            }); }))];
                }
            });
        });
    };
    return TokenSwap;
}(SwapBase));
export { TokenSwap };
