"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolResponseToModel = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
var toFarmingStateInfo = function (response, pool) { return ({
    tokensPerPeriod: new bn_js_1.default("" + response.tokensPerPeriod),
    tokensUnlocked: new bn_js_1.default("" + response.tokensUnlocked),
    tokensTotal: new bn_js_1.default("" + response.tokensTotal),
    periodLength: response.periodLength,
    vestingPeriod: response.vestingPeriod,
    currentTime: response.currentTime,
    pool: pool,
    farmingTokenVault: new web3_js_1.PublicKey(response.farmingTokenVault),
    farmingSnapshots: new web3_js_1.PublicKey(response.farmingSnapshots),
    farmingStatePublicKey: new web3_js_1.PublicKey(response.farmingState),
    farmingTokenMint: new web3_js_1.PublicKey(response.farmingTokenMint),
    farmingTokenMintDecimals: response.farmingTokenMintDecimals,
}); };
var poolResponseToModel = function (response, prices) {
    var _a = response.parsedName.split('_'), base = _a[0], quote = _a[1];
    var poolPublicKey = new web3_js_1.PublicKey(response.swapToken);
    var baseTvl = new bn_js_1.default(response.tvl.tokenA);
    var quoteTvl = new bn_js_1.default(response.tvl.tokenB);
    var baseTvlUsd = baseTvl.muln(prices.get(base) || 0);
    var quoteTvlUsd = quoteTvl.muln(prices.get(quote) || 0);
    var totalTvlUsd = baseTvl.add(quoteTvl);
    var lpPrice = new bn_js_1.default(response.lpTokenFreezeVaultBalance).div(totalTvlUsd);
    return {
        poolPublicKey: poolPublicKey,
        poolMint: new web3_js_1.PublicKey(response.poolTokenMint),
        baseTokenVault: new web3_js_1.PublicKey(response.poolTokenAccountA),
        baseTokenMint: new web3_js_1.PublicKey(response.tokenA),
        quoteTokenVault: new web3_js_1.PublicKey(response.poolTokenAccountB),
        quoteTokenMint: new web3_js_1.PublicKey(response.tokenA),
        name: response.parsedName,
        lpApr24h: response.apy24h,
        supply: new bn_js_1.default(response.supply),
        farmingStates: (response.farming || []).map(function (f) { return toFarmingStateInfo(f, poolPublicKey); }),
        tvl: {
            base: baseTvl,
            quote: quoteTvl,
            baseUsd: baseTvlUsd,
            quoteUsd: quoteTvlUsd,
            totalUsd: totalTvlUsd,
        },
    };
};
exports.poolResponseToModel = poolResponseToModel;
