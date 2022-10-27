"use strict";
/* Config file should be manually updated every time on-chain program updates */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Side = exports.SortBy = exports.WeightTime = exports.FilterTime = exports.WeightType = exports.FilterType = exports.SWAP_FEE_ACCOUNT = exports.REBALNCE_FEE_ACCOUNT = exports.BUY_FEE_ACCOUNT = exports.CREATE_FEE_ACCOUNT = exports.DATABASE_ADDRESS = exports.TOKEN_STATS_ADDRESS = exports.TOKEN_INFO_ADDRESS = exports.FUNDS_PROGRAM_PDA = exports.FUNDS_PROGRAM_ID = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.FUNDS_PROGRAM_ID = new web3_js_1.PublicKey("2KehYt3KsEQR53jYcxjbQp2d2kCp4AkuQW68atufRwSr");
exports.FUNDS_PROGRAM_PDA = new web3_js_1.PublicKey("BLBYiq48WcLQ5SxiftyKmPtmsZPUBEnDEjqEnKGAR4zx");
exports.TOKEN_INFO_ADDRESS = new web3_js_1.PublicKey("4Rn7pKKyiSNKZXKCoLqEpRznX1rhveV4dW1DCg6hRoVH");
exports.TOKEN_STATS_ADDRESS = new web3_js_1.PublicKey("5u1AuCafhCtWENUo3m2aLKtDuoQQfWzr2bb5bDJzD47q");
exports.DATABASE_ADDRESS = new web3_js_1.PublicKey("2FC4kaLTtyqSypK9rZiSMvsM3WkA6kz9CUmu57h9wecb");
exports.CREATE_FEE_ACCOUNT = new web3_js_1.PublicKey("AWfpfzA6FYbqx4JLz75PDgsjH7jtBnnmJ6MXW5zNY2Ei");
exports.BUY_FEE_ACCOUNT = new web3_js_1.PublicKey("CzzVkhXfB3ZpVVgw3Fv5iku1Vm6xHiDjVK58NbRN5jRo");
exports.REBALNCE_FEE_ACCOUNT = new web3_js_1.PublicKey("51BcLm14742i9Z3LNBf51u4UJZnURSkoGdd4cjwcTF7d");
exports.SWAP_FEE_ACCOUNT = new web3_js_1.PublicKey("48jWdAAChBznvLngKcRMBvJZ19VbuzU7WYgNtCaQgvK7");
var FilterType;
(function (FilterType) {
    FilterType[FilterType["Fixed"] = 0] = "Fixed";
    FilterType[FilterType["MarketCap"] = 1] = "MarketCap";
    FilterType[FilterType["Volume"] = 2] = "Volume";
    FilterType[FilterType["Performace"] = 3] = "Performace";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var WeightType;
(function (WeightType) {
    WeightType[WeightType["Fixed"] = 0] = "Fixed";
    WeightType[WeightType["MarketCap"] = 1] = "MarketCap";
    WeightType[WeightType["Volume"] = 2] = "Volume";
    WeightType[WeightType["Performace"] = 3] = "Performace";
})(WeightType = exports.WeightType || (exports.WeightType = {}));
var FilterTime;
(function (FilterTime) {
    FilterTime[FilterTime["Day"] = 0] = "Day";
    FilterTime[FilterTime["Week"] = 1] = "Week";
    FilterTime[FilterTime["Month"] = 2] = "Month";
    FilterTime[FilterTime["Quarter"] = 3] = "Quarter";
    FilterTime[FilterTime["HalfYear"] = 4] = "HalfYear";
    FilterTime[FilterTime["Year"] = 5] = "Year";
})(FilterTime = exports.FilterTime || (exports.FilterTime = {}));
var WeightTime;
(function (WeightTime) {
    WeightTime[WeightTime["Day"] = 0] = "Day";
    WeightTime[WeightTime["Week"] = 1] = "Week";
    WeightTime[WeightTime["Month"] = 2] = "Month";
    WeightTime[WeightTime["Quarter"] = 3] = "Quarter";
    WeightTime[WeightTime["HalfYear"] = 4] = "HalfYear";
    WeightTime[WeightTime["Year"] = 5] = "Year";
})(WeightTime = exports.WeightTime || (exports.WeightTime = {}));
var SortBy;
(function (SortBy) {
    SortBy[SortBy["DescendingOrder"] = 0] = "DescendingOrder";
    SortBy[SortBy["AscendingOrder"] = 1] = "AscendingOrder";
})(SortBy = exports.SortBy || (exports.SortBy = {}));
var Side;
(function (Side) {
    Side[Side["To"] = 0] = "To";
    Side[Side["From"] = 1] = "From";
})(Side = exports.Side || (exports.Side = {}));
