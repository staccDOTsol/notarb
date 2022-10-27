"use strict";
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
exports.Prism = void 0;
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("./types/types");
const utils_1 = require("./utils/utils");
const axios_1 = __importDefault(require("axios"));
const liquidityProviders_1 = require("./liquidity/providers/liquidityProviders");
const liquidityInfos_1 = require("./liquidity/infos/liquidityInfos");
const aggregator_1 = require("./aggregator/aggregator");
const swap_1 = require("./swap/swap");
const anchor_1 = require("@project-serum/anchor");
class Prism {
    constructor(connection, user, publicKey, settings, userAccounts, tokenList, liquidityProviders, knownMarkets) {
        this.connection = connection;
        this.user = user;
        this.publicKey = publicKey;
        this.settings = settings;
        this.userAccounts = userAccounts;
        this.tokenList = tokenList;
        this.liquidityProviders = liquidityProviders;
        this.knownMarkets = knownMarkets;
        this.userOpenOrders = null;
        this.lastFromCoin = null;
        this.lastToCoin = null;
        (0, utils_1.fetchUserOpenOrders)(tokenList, connection, publicKey).then(result => {
            this.userOpenOrders = result;
        });
    }
    static init(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = {
                owner: {
                    publicKey: new web3_js_1.PublicKey(types_1.PRISM_OWNER),
                    fee: 5
                },
                host: params.host ? {
                    publicKey: new web3_js_1.PublicKey(params.host.publicKey),
                    fee: params.host.fee,
                } : {
                    publicKey: new web3_js_1.PublicKey(types_1.PRISM_OWNER),
                    fee: 0,
                },
                slippage: params.slippage ? params.slippage : 0.5
            };
            var connection =  params.connection ?
                params.connection :
                new web3_js_1.Connection(types_1.ENDPOINT);
            let user = params.user;
            //@ts-ignore
            let publicKey = params.user;
            //@ts-ignore
            if (user && user.publicKey) {
                //@ts-ignore
                publicKey = user.publicKey;
                //@ts-ignore
                try {
                    user = new anchor_1.Wallet(user);
                }
                catch (_a) { }
            }
            let userAccountsPromise = params.tokenList ?
                (0, utils_1.fetchUserAccountsAndTokenList)(params.tokenList, connection, publicKey) :
                axios_1.default.get(types_1.TOKEN_LIST_URI).then(result => (0, utils_1.fetchUserAccountsAndTokenList)(result.data, connection, publicKey));
            let liquidityProvidersPromise = (0, liquidityProviders_1.loadLiquidityProviders)(connection);
            let loadKnownMarkets = axios_1.default.get(types_1.KNOWN_PAIRS).catch(() => { return { data: [] }; }).then(result => result.data);
            return yield Promise.all([
                liquidityProvidersPromise,
                userAccountsPromise,
                loadKnownMarkets,
            ]).then(results => {
                return new Prism(connection, user, publicKey, settings, results[1].accounts, results[1].tokenList, results[0], results[2]);
            });
        });
    }
    setSigner(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            try {
                user = new anchor_1.Wallet(user);
            }
            catch (_a) { }
            let walletChange = true;
            //@ts-ignore
            try {
                if (user.publicKey.equals(this.user))
                    walletChange = false;
            }
            catch (_b) { }
            //@ts-ignore
            try {
                if (user.publicKey.equals(this.user.publicKey))
                    walletChange = false;
            }
            catch (_c) { }
            if (walletChange) {
                this.publicKey = user.publicKey;
                this.userAccounts = yield (0, utils_1.fetchUserAccounts)(this.tokenList, this.connection, user.publicKey);
                this.userOpenOrders = null;
                (0, utils_1.fetchUserOpenOrders)(this.tokenList, this.connection, user.publicKey).then(result => {
                    this.userOpenOrders = result;
                });
            }
            this.user = user;
        });
    }
    setSlippage(slippage) {
        this.settings = Object.assign(Object.assign({}, this.settings), { slippage: slippage });
    }
    getUserAccounts() {
        return this.userAccounts;
    }
    getUserOpenOrders() {
        return this.userOpenOrders;
    }
    closeOpenOrders(openOrders) {
        return __awaiter(this, void 0, void 0, function* () {
            let txIds = null;
            yield (0, utils_1.closeOpenOrdersForUser)(this, openOrders)
                .catch(() => { })
                .then(result => txIds = result);
            yield Promise.all([
                (0, utils_1.fetchUserAccounts)(this.tokenList, this.connection, 
                //@ts-ignore
                this.user.publicKey),
                (0, utils_1.fetchUserOpenOrders)(this.tokenList, this.connection, 
                //@ts-ignore
                this.user.publicKey)
            ]).then(results => {
                this.userAccounts = results[0];
                this.userOpenOrders = results[1];
            });
            return txIds;
        });
    }
    unwrapWSolAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            let txIds = null;
            yield (0, utils_1.unwrapWSolAccounts)(this)
                .catch(() => { })
                .then(result => txIds = result);
            yield (0, utils_1.fetchUserAccounts)(this.tokenList, this.connection, 
            //@ts-ignore
            this.user.publicKey).then(result => {
                this.userAccounts = result;
            });
            return txIds;
        });
    }
    static loadPrismStats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.getGlobalStats)().catch(() => null);
        });
    }
    loadPrismStats() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.getGlobalStats)().catch(() => null);
        });
    }
    static loadUserTradeHistory(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.getUserHistoty)(publicKey).catch(() => null);
        });
    }
    loadUserTradeHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, utils_1.getUserHistoty)(
            //@ts-ignore
            this.user.publicKey).catch(() => null);
        });
    }
    loadRoutes(from, to, direct = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fromCoin = (0, utils_1.findCoinFrom)(this.tokenList.tokens, from);
            this.toCoin = (0, utils_1.findCoinFrom)(this.tokenList.tokens, to);
            let tokenMap = {};
            for (let i = 0; i < this.tokenList.tokens.length; i++) {
                tokenMap[this.tokenList.tokens[i].address] = Object.assign(Object.assign({}, (0, utils_1.coinInfo)(this.tokenList.tokens[i])), this.tokenList.tokens[i]);
            }
            if (this.lastFromCoin && this.lastToCoin && this.fromCoin.address == this.lastToCoin.address && this.toCoin.address == this.lastFromCoin.address) {
                this.lastFromCoin = this.fromCoin;
                this.lastToCoin = this.toCoin;
                this.liquidityInfos.routes = yield (0, liquidityInfos_1.loadLiquidityInfos)(this.fromCoin, this.toCoin, this.liquidityProviders, this.connection, this.knownMarkets, tokenMap, direct, true);
                return;
            }
            this.lastFromCoin = this.fromCoin;
            this.lastToCoin = this.toCoin;
            this.liquidityInfos = yield (0, liquidityInfos_1.loadLiquidityInfos)(this.fromCoin, this.toCoin, this.liquidityProviders, this.connection, this.knownMarkets, tokenMap, direct, false);
        });
    }
    getRoutes(amount) {
        return (0, aggregator_1.findRoutes)(this.fromCoin, this.toCoin, amount, this.liquidityInfos, this.liquidityProviders, this.settings);
    }
    generateSwapTransactions(route) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield (0, swap_1.generateTransactions)(this, route).catch(() => null);
            return {
                preTransaction: result.preTransaction,
                preSigners: result.preSigners,
                mainTransaction: result.mainTransaction,
                postTransaction: result.postTransaction,
            };
        });
    }
    generateSymmetryTransaction(route, fromTokenAccount, toTokenAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, swap_1.generateSymmetryTransaction)(this, route, fromTokenAccount, toTokenAccount);
        });
    }
    swap(route) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            if (!this.user || !this.user.publicKey)
                throw new Error("Keypair or Wallet not provided. See setSigner function.");
            let result = yield (0, swap_1.executeSwap)(this, route).catch((e) => { console.log(e); });
            (0, utils_1.fetchUserAccounts)(this.tokenList, this.connection, 
            //@ts-ignore
            this.user.publicKey).then(result => {
                this.userAccounts = result;
            });
            (0, utils_1.fetchUserOpenOrders)(this.tokenList, this.connection, 
            //@ts-ignore
            this.user.publicKey).then(result => {
                this.userOpenOrders = result;
            });
            return result;
        });
    }
    /**
    * @deprecated Swap function already confirms transaction
    */
    confirmSwap(result) {
        return __awaiter(this, void 0, void 0, function* () {
            return result.response;
        });
    }
}
exports.Prism = Prism;
