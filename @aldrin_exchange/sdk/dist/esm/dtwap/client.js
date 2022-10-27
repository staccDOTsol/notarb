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
import { Connection, Transaction } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT, DTWAP_PROGRAM_ADDRESS } from '..';
import { DTWAP_PAIR_SETTINGS, DTWAP_ORDER_ARRAY } from './layout';
import { TwAmm, DTWAP_AVAILABLE_TOKENS, } from '.';
import { sendTransaction, simulateTransaction } from '../transactions';
import BN from 'bn.js';
import { SIDE } from '../types';
var DTwapClient = /** @class */ (function () {
    function DTwapClient(connection) {
        if (connection === void 0) { connection = new Connection(SOLANA_RPC_ENDPOINT); }
        this.connection = connection;
    }
    DTwapClient.prototype.getPairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchFilters, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchFilters = [
                            { dataSize: DTWAP_PAIR_SETTINGS.span },
                        ];
                        return [4 /*yield*/, this.connection.getProgramAccounts(DTWAP_PROGRAM_ADDRESS, {
                                filters: searchFilters,
                            })];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts.map(function (p) {
                                var data = p.account.data, pubkey = p.pubkey;
                                var account = DTWAP_PAIR_SETTINGS.decode(data);
                                return __assign(__assign({}, account), { pairSettings: pubkey });
                            })];
                }
            });
        });
    };
    DTwapClient.prototype.getOrders = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var userKey, pairSettings, searchFilters, offset, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userKey = params.userKey, pairSettings = params.pairSettings;
                        searchFilters = [
                            { dataSize: DTWAP_ORDER_ARRAY.span },
                        ];
                        if (pairSettings) {
                            offset = DTWAP_ORDER_ARRAY.offsetOf('pairSettings');
                            if (offset === undefined) {
                                throw new Error('No offset for pairSettings');
                            }
                            searchFilters.push({
                                memcmp: {
                                    offset: offset,
                                    bytes: pairSettings.toBase58(),
                                },
                            });
                        }
                        return [4 /*yield*/, this.connection.getProgramAccounts(DTWAP_PROGRAM_ADDRESS, {
                                filters: searchFilters,
                            })];
                    case 1:
                        accounts = _a.sent();
                        return [2 /*return*/, accounts.map(function (p) {
                                var data = p.account.data, pubkey = p.pubkey;
                                var account = DTWAP_ORDER_ARRAY.decode(data);
                                return __assign(__assign({}, account), { side: account.side.ask ? SIDE.ASK : SIDE.BID, orders: account.orders
                                        .filter(function (o) { return o.isInitialized; })
                                        .filter(function (o) { return userKey ? o.authority.equals(userKey) : true; }), orderArray: pubkey });
                            })];
                }
            });
        });
    };
    DTwapClient.prototype.getAvailableTokens = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, simulation, prefix_1, programLogs, lastRow, b64, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transaction = new Transaction().add(TwAmm.getAvailableTokensInstruction(params));
                        return [4 /*yield*/, simulateTransaction({
                                transaction: transaction,
                                wallet: params.wallet,
                                connection: this.connection,
                            })];
                    case 1:
                        simulation = _a.sent();
                        if (simulation.value.logs) {
                            prefix_1 = 'Program log: ';
                            programLogs = simulation.value.logs.filter(function (v) { return v.startsWith(prefix_1); });
                            lastRow = programLogs[programLogs.length - 1];
                            b64 = lastRow.replace(prefix_1, '');
                            data = Buffer.from(b64, 'base64');
                            return [2 /*return*/, DTWAP_AVAILABLE_TOKENS.decode(data)];
                        }
                        return [2 /*return*/, { amountFrom: new BN(0), amountTo: new BN(0) }];
                }
            });
        });
    };
    /**
     *
     * @param params
     * @returns Transaction Id
     */
    DTwapClient.prototype.executeSwap = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                transaction = new Transaction().add(TwAmm.executeSwapInstruction(params));
                return [2 /*return*/, sendTransaction({ transaction: transaction, wallet: params.wallet, connection: this.connection })];
            });
        });
    };
    return DTwapClient;
}());
export { DTwapClient };
