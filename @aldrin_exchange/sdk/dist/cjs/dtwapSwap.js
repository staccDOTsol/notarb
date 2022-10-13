"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTwapSwap = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
var _1 = require(".");
var swapBase_1 = require("./swapBase");
var types_1 = require("./types");
var DTwapSwap = /** @class */ (function (_super) {
    __extends(DTwapSwap, _super);
    function DTwapSwap(pairs, dtwapClient, tokenClient, connection, wallet) {
        if (connection === void 0) { connection = new web3_js_1.Connection(_1.SOLANA_RPC_ENDPOINT); }
        if (wallet === void 0) { wallet = null; }
        var _this = _super.call(this, tokenClient, connection) || this;
        _this.pairs = pairs;
        _this.dtwapClient = dtwapClient;
        _this.tokenClient = tokenClient;
        _this.connection = connection;
        _this.wallet = wallet;
        return _this;
    }
    DTwapSwap.prototype.getPrices = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, p, pair, isInverted, orders, baseMintDecimals, quoteMintDecimals, side, decimalsFrom, decimalsTo, ordersForSide, allAmounts, pricesWithAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error('Please provide wallet');
                        }
                        wallet = this.wallet;
                        p = this.findPair(params.mintFrom, params.mintTo);
                        if (!p) {
                            throw new Error('Pool not found');
                        }
                        pair = p.pair, isInverted = p.isInverted;
                        return [4 /*yield*/, this.dtwapClient.getOrders({
                                pairSettings: pair.pairSettings,
                            })];
                    case 1:
                        orders = _a.sent();
                        baseMintDecimals = pair.baseMintDecimals, quoteMintDecimals = pair.quoteMintDecimals;
                        side = isInverted ? types_1.SIDE.BID : types_1.SIDE.ASK;
                        decimalsFrom = new bn_js_1.default(10).pow(new bn_js_1.default(isInverted ? quoteMintDecimals : baseMintDecimals));
                        decimalsTo = new bn_js_1.default(10).pow(new bn_js_1.default(isInverted ? baseMintDecimals : quoteMintDecimals));
                        ordersForSide = orders.filter(function (o) { return o.side === side; });
                        return [4 /*yield*/, Promise.all(ordersForSide.map(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {
                                                order: order
                                            };
                                            return [4 /*yield*/, this.dtwapClient.getAvailableTokens({
                                                    pairSettings: pair.pairSettings,
                                                    pyth: pair.pyth,
                                                    orderArray: order.orderArray,
                                                    wallet: wallet,
                                                })];
                                        case 1: return [2 /*return*/, (_a.available = _b.sent(),
                                                _a)];
                                    }
                                });
                            }); }))];
                    case 2:
                        allAmounts = _a.sent();
                        pricesWithAmount = allAmounts
                            .filter(function (orderWithAvailable) { return orderWithAvailable.available.amountFrom.gtn(0); })
                            .map(function (orderWithAvailable) {
                            var price = orderWithAvailable.available.amountFrom
                                .mul(_1.PRECISION_NOMINATOR)
                                .mul(decimalsFrom)
                                .div(orderWithAvailable.available.amountTo)
                                .div(decimalsTo);
                            return __assign(__assign({}, orderWithAvailable), { price: price.toNumber() / _1.PRECISION_NOMINATOR.toNumber() });
                        })
                            .sort(function (a, b) { return a.price - b.price; });
                        console.log('allAmounts: ', allAmounts);
                        return [2 /*return*/, pricesWithAmount];
                }
            });
        });
    };
    DTwapSwap.prototype.getPrice = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var prices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPrices(params)];
                    case 1:
                        prices = _a.sent();
                        return [2 /*return*/, prices[0] ? prices[0].price : 0];
                }
            });
        });
    };
    DTwapSwap.prototype.findPair = function (mintFrom, mintTo) {
        var pair = this.pairs.find(function (p) {
            return (p.baseTokenMint.equals(mintFrom) && p.quoteTokenMint.equals(mintTo)) ||
                (p.baseTokenMint.equals(mintTo) && p.quoteTokenMint.equals(mintFrom));
        });
        if (!pair) {
            return null;
        }
        var isInverted = pair.quoteTokenMint.equals(mintTo);
        return { pair: pair, isInverted: isInverted };
    };
    DTwapSwap.initialize = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, connection, wallet, dtwapClient, tokenClient, pairs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = params.connection, connection = _a === void 0 ? new web3_js_1.Connection(_1.SOLANA_RPC_ENDPOINT) : _a, wallet = params.wallet;
                        dtwapClient = new _1.DTwapClient(connection);
                        tokenClient = new _1.TokenClient(connection);
                        return [4 /*yield*/, dtwapClient.getPairs()];
                    case 1:
                        pairs = _b.sent();
                        return [2 /*return*/, new DTwapSwap(pairs, dtwapClient, tokenClient, connection, wallet)];
                }
            });
        });
    };
    return DTwapSwap;
}(swapBase_1.SwapBase));
exports.DTwapSwap = DTwapSwap;
