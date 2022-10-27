"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmingClient = void 0;
var web3_js_1 = require("@solana/web3.js");
var _1 = require(".");
var __1 = require("..");
var transactions_1 = require("../transactions");
var farming_1 = require("./farming");
/**
 * Aldrin AMM Pools farming(staking) client
 */
var FarmingClient = /** @class */ (function () {
    function FarmingClient(connection) {
        if (connection === void 0) { connection = new web3_js_1.Connection(__1.SOLANA_RPC_ENDPOINT); }
        this.connection = connection;
    }
    /**
     * Get farming state for pool
     * @param params
     * @returns
     */
    FarmingClient.prototype.getFarmingState = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var programId, states;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        return [4 /*yield*/, this.connection.getProgramAccounts(programId, {
                                commitment: 'finalized',
                                filters: [
                                    { dataSize: _1.FARMING_STATE_LAYOUT.span },
                                    { memcmp: { offset: _1.FARMING_STATE_LAYOUT.offsetOf('pool') || 0, bytes: params.poolPublicKey.toBase58() } },
                                ],
                            })];
                    case 1:
                        states = _a.sent();
                        return [2 /*return*/, states.map(function (s) {
                                var snapshot = _1.FARMING_STATE_LAYOUT.decode(s.account.data);
                                return __assign(__assign({}, snapshot), { farmingStatePublicKey: s.pubkey });
                            })];
                }
            });
        });
    };
    /**
     * Get farming tickets for pool/user
     * @param params
     * @returns
     */
    FarmingClient.prototype.getFarmingTickets = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var programId, filters, tickets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        filters = [
                            { dataSize: _1.FARMING_TICKET_LAYOUT.span },
                        ];
                        if (params.pool) {
                            filters.push({ memcmp: { offset: _1.FARMING_TICKET_LAYOUT.offsetOf('pool') || 0, bytes: params.pool.toBase58() } });
                        }
                        if (params.userKey) {
                            filters.push({ memcmp: { offset: _1.FARMING_TICKET_LAYOUT.offsetOf('userKey') || 0, bytes: params.userKey.toBase58() } });
                        }
                        return [4 /*yield*/, this.connection.getProgramAccounts(programId, {
                                filters: filters,
                            })];
                    case 1:
                        tickets = _a.sent();
                        return [2 /*return*/, tickets.map(function (t) {
                                var data = _1.FARMING_TICKET_LAYOUT.decode(t.account.data);
                                return __assign(__assign({}, data), { farmingTicketPublicKey: t.pubkey });
                            })];
                }
            });
        });
    };
    /**
     * Get farming calc accounts for farming and/or user
     * @param params Search params (farming state, user)
     * @returns
     */
    FarmingClient.prototype.getFarmingCalcAccounts = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var programId, filters, farmingCalcs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        filters = [
                            { dataSize: _1.FARMING_CALC_LAYOUT.span },
                        ];
                        if (params.farmingState) {
                            filters.push({ memcmp: { offset: _1.FARMING_CALC_LAYOUT.offsetOf('farmingState') || 0, bytes: params.farmingState.toBase58() } });
                        }
                        if (params.userKey) {
                            filters.push({ memcmp: { offset: _1.FARMING_CALC_LAYOUT.offsetOf('userKey') || 0, bytes: params.userKey.toBase58() } });
                        }
                        return [4 /*yield*/, this.connection.getProgramAccounts(programId, {
                                filters: filters,
                            })];
                    case 1:
                        farmingCalcs = _a.sent();
                        return [2 /*return*/, farmingCalcs.map(function (ca) {
                                var data = _1.FARMING_CALC_LAYOUT.decode(ca.account.data);
                                return __assign(__assign({}, data), { farmingCalcPublicKey: ca.pubkey });
                            })];
                }
            });
        });
    };
    /**
     * Start farming, creates Farming Ticket
     * @param params
     * @returns Transaction Id
     */
    FarmingClient.prototype.startFarming = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var programId, wallet, farmingTicket, farmingTicketInstruction, startFarmingTransaction, transaction, states, calcForUser, statesWithoutCalc, createCalcInstructions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        wallet = params.wallet;
                        farmingTicket = web3_js_1.Keypair.generate();
                        return [4 /*yield*/, (0, transactions_1.createAccountInstruction)({
                                size: _1.FARMING_TICKET_LAYOUT.span,
                                connection: this.connection,
                                wallet: wallet,
                                programId: programId,
                                newAccountPubkey: farmingTicket.publicKey,
                            })];
                    case 1:
                        farmingTicketInstruction = _a.sent();
                        startFarmingTransaction = farming_1.Farming.startFarmingInstruction(__assign(__assign({}, params), { userKey: wallet.publicKey, farmingTicket: farmingTicket.publicKey, programId: programId }));
                        transaction = new web3_js_1.Transaction();
                        transaction.add(farmingTicketInstruction);
                        transaction.add(startFarmingTransaction);
                        return [4 /*yield*/, this.getFarmingState({
                                poolVersion: params.poolVersion,
                                poolPublicKey: params.poolPublicKey,
                            })];
                    case 2:
                        states = _a.sent();
                        return [4 /*yield*/, this.getFarmingCalcAccounts({
                                userKey: wallet.publicKey,
                                poolVersion: params.poolVersion,
                            })];
                    case 3:
                        calcForUser = (_a.sent()).map(function (ca) { return ca.farmingState.toBase58(); });
                        statesWithoutCalc = states
                            .filter(function (state) { return !state.tokensUnlocked.eq(state.tokensTotal); }) // Has locked tokens -> state not finished yet    
                            .filter(function (state) { return !calcForUser.includes(state.farmingStatePublicKey.toString()); });
                        return [4 /*yield*/, Promise.all(statesWithoutCalc.map(function (fs) { return __awaiter(_this, void 0, void 0, function () {
                                var farmingCalc, farmingCalcInstruction, calcInstruction;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            farmingCalc = web3_js_1.Keypair.generate();
                                            return [4 /*yield*/, (0, transactions_1.createAccountInstruction)({
                                                    size: _1.FARMING_CALC_LAYOUT.span,
                                                    connection: this.connection,
                                                    wallet: wallet,
                                                    programId: programId,
                                                    newAccountPubkey: farmingCalc.publicKey,
                                                })];
                                        case 1:
                                            farmingCalcInstruction = _a.sent();
                                            calcInstruction = farming_1.Farming.createCalcAccountInstruction({
                                                farmingCalc: farmingCalc.publicKey,
                                                farmingTicket: farmingTicket.publicKey,
                                                userKey: wallet.publicKey,
                                                farmingState: fs.farmingStatePublicKey,
                                                initializer: wallet.publicKey,
                                                programId: programId,
                                            });
                                            return [2 /*return*/, [farmingCalcInstruction, calcInstruction]];
                                    }
                                });
                            }); }))];
                    case 4:
                        createCalcInstructions = _a.sent();
                        transaction.add.apply(transaction, createCalcInstructions.flat());
                        return [2 /*return*/, (0, transactions_1.sendTransaction)({
                                transaction: transaction,
                                wallet: wallet,
                                connection: this.connection,
                                partialSigners: [farmingTicket],
                            })];
                }
            });
        });
    };
    /**
     * End farming
     */
    FarmingClient.prototype.endFarming = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var programId, poolPublicKey, wallet, poolSigner, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        poolPublicKey = params.poolPublicKey, wallet = params.wallet;
                        return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([poolPublicKey.toBuffer()], programId)];
                    case 1:
                        poolSigner = (_a.sent())[0];
                        transaction = new web3_js_1.Transaction();
                        transaction.add(farming_1.Farming.endFarmingInstruction(__assign(__assign({}, params), { poolSigner: poolSigner, userKey: wallet.publicKey, programId: programId })));
                        return [2 /*return*/, (0, transactions_1.sendTransaction)({
                                wallet: wallet,
                                connection: this.connection,
                                transaction: transaction,
                            })];
                }
            });
        });
    };
    /**
     * Claim staking rewards
     * @param params
     * @returns Transaction Id
     */
    FarmingClient.prototype.claimFarmed = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var programId, poolPublicKey, wallet, poolSigner, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        poolPublicKey = params.poolPublicKey, wallet = params.wallet;
                        return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([poolPublicKey.toBuffer()], programId)];
                    case 1:
                        poolSigner = (_a.sent())[0];
                        transaction = new web3_js_1.Transaction();
                        transaction.add(farming_1.Farming.withdrawFarmedInstruction(__assign(__assign({}, params), { poolSigner: poolSigner, userKey: wallet.publicKey, programId: programId })));
                        return [2 /*return*/, (0, transactions_1.sendTransaction)({
                                wallet: wallet,
                                connection: this.connection,
                                transaction: transaction,
                            })];
                }
            });
        });
    };
    /**
     * Get farming snapshots. Useful for reward calculations.
     * // TODO: add caching
     *
     */
    FarmingClient.prototype.getFarmingSnapshotsQueue = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var programId, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        programId = __1.PoolClient.getPoolAddress(params.poolVersion || 1);
                        return [4 /*yield*/, this.connection.getProgramAccounts(programId, {
                                filters: [
                                    { dataSize: _1.SNAPSHOT_QUEUE_LAYOUT.span },
                                ],
                            })];
                    case 1:
                        snapshots = _a.sent();
                        return [2 /*return*/, snapshots.map(function (s) {
                                var bucket = _1.SNAPSHOT_QUEUE_LAYOUT.decode(s.account.data);
                                return __assign(__assign({}, bucket), { queuePublicKey: s.pubkey });
                            })];
                }
            });
        });
    };
    return FarmingClient;
}());
exports.FarmingClient = FarmingClient;
