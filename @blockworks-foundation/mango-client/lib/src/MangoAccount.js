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
const serum_1 = require("@project-serum/serum");
const fixednum_1 = require("./utils/fixednum");
const layout_1 = require("./layout");
const utils_1 = require("./utils/utils");
const bn_js_1 = __importDefault(require("bn.js"));
const os_1 = require("os");
const book_1 = require("./book");
const config_1 = require("./config");
const utils_2 = require("./utils/utils");
const layout_2 = require("./layout");
const PerpMarket_1 = __importDefault(require("./PerpMarket"));
const ids_json_1 = __importDefault(require("./ids.json"));
class MangoAccount {
    constructor(publicKey, decoded) {
        this.publicKey = publicKey;
        this.spotOpenOrdersAccounts = new Array(layout_1.MAX_PAIRS).fill(undefined);
        this.advancedOrders = [];
        Object.assign(this, decoded);
    }
    get name() {
        return this.info
            ? String.fromCharCode(...this.info).replace(new RegExp(String.fromCharCode(0), 'g'), '')
            : '';
    }
    getLiquidationPrice(mangoGroup, mangoCache, oracleIndex) {
        const { spot, perps, quote } = this.getHealthComponents(mangoGroup, mangoCache);
        let partialHealth = quote;
        let weightedAsset = fixednum_1.ZERO_I80F48;
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const w = (0, utils_1.getWeights)(mangoGroup, i, 'Maint');
            if (i === oracleIndex) {
                const weightedSpot = spot[i].mul(spot[i].isPos() ? w.spotAssetWeight : w.spotLiabWeight);
                const weightedPerps = perps[i].mul(perps[i].isPos() ? w.perpAssetWeight : w.perpLiabWeight);
                weightedAsset = weightedSpot.add(weightedPerps).neg();
            }
            else {
                const price = mangoCache.priceCache[i].price;
                const spotHealth = spot[i]
                    .mul(price)
                    .mul(spot[i].isPos() ? w.spotAssetWeight : w.spotLiabWeight);
                const perpHealth = perps[i]
                    .mul(price)
                    .mul(perps[i].isPos() ? w.perpAssetWeight : w.perpLiabWeight);
                partialHealth = partialHealth.add(spotHealth).add(perpHealth);
            }
        }
        if (weightedAsset.isZero()) {
            return undefined;
        }
        const liqPrice = partialHealth.div(weightedAsset);
        if (liqPrice.isNeg()) {
            return undefined;
        }
        return liqPrice.mul(
        // adjust for decimals in the price
        fixednum_1.I80F48.fromNumber(Math.pow(10, mangoGroup.tokens[oracleIndex].decimals -
            mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals)));
    }
    hasAnySpotOrders() {
        return this.inMarginBasket.some((b) => b);
    }
    reload(connection, dexProgramId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield connection.getAccountInfo(this.publicKey);
            Object.assign(this, layout_1.MangoAccountLayout.decode(acc === null || acc === void 0 ? void 0 : acc.data));
            if (dexProgramId) {
                yield this.loadOpenOrders(connection, dexProgramId);
            }
            return this;
        });
    }
    reloadFromSlot(connection, lastSlot = 0, dexProgramId = undefined) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let slot = -1;
            let value = null;
            while (slot <= lastSlot) {
                const response = yield connection.getAccountInfoAndContext(this.publicKey);
                slot = (_a = response.context) === null || _a === void 0 ? void 0 : _a.slot;
                value = response.value;
                yield (0, utils_2.sleep)(250);
            }
            const decodedMangoAccount = layout_1.MangoAccountLayout.decode(value === null || value === void 0 ? void 0 : value.data);
            const newMangoAccount = new MangoAccount(this.publicKey, decodedMangoAccount);
            newMangoAccount.spotOpenOrdersAccounts = this.spotOpenOrdersAccounts;
            newMangoAccount.advancedOrders = this.advancedOrders;
            if (dexProgramId) {
                yield newMangoAccount.loadOpenOrders(connection, dexProgramId);
            }
            Object.assign(this, newMangoAccount);
            return [newMangoAccount, slot];
        });
    }
    loadSpotOrdersForMarket(connection, market, marketIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const [bidsInfo, asksInfo] = yield (0, utils_2.getMultipleAccounts)(connection, [
                market.bidsAddress,
                market.asksAddress,
            ]);
            const bids = serum_1.Orderbook.decode(market, bidsInfo.accountInfo.data);
            const asks = serum_1.Orderbook.decode(market, asksInfo.accountInfo.data);
            return [...bids, ...asks].filter((o) => o.openOrdersAddress.equals(this.spotOpenOrders[marketIndex]));
        });
    }
    loadOpenOrders(connection, serumDexPk) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield (0, utils_2.getMultipleAccounts)(connection, this.spotOpenOrders.filter((pk) => !pk.equals(utils_1.zeroKey)));
            this.spotOpenOrdersAccounts = this.spotOpenOrders.map((openOrderPk) => {
                if (openOrderPk.equals(utils_1.zeroKey)) {
                    return undefined;
                }
                const account = accounts.find((a) => a.publicKey.equals(openOrderPk));
                return account
                    ? serum_1.OpenOrders.fromAccountInfo(openOrderPk, account.accountInfo, serumDexPk)
                    : undefined;
            });
            return this.spotOpenOrdersAccounts;
        });
    }
    loadAdvancedOrders(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.advancedOrdersKey.equals(utils_1.zeroKey))
                return [];
            const acc = yield connection.getAccountInfo(this.advancedOrdersKey);
            const decoded = layout_2.AdvancedOrdersLayout.decode(acc === null || acc === void 0 ? void 0 : acc.data);
            this.advancedOrders = decoded.orders;
            return decoded.orders;
        });
    }
    getNativeDeposit(rootBank, tokenIndex) {
        return rootBank.depositIndex.mul(this.deposits[tokenIndex]);
    }
    getNativeBorrow(rootBank, tokenIndex) {
        return rootBank.borrowIndex.mul(this.borrows[tokenIndex]);
    }
    getUiDeposit(rootBank, mangoGroup, tokenIndex) {
        return (0, utils_1.nativeI80F48ToUi)(this.getNativeDeposit(rootBank, tokenIndex).floor(), mangoGroup.getTokenDecimals(tokenIndex));
    }
    getUiBorrow(rootBank, mangoGroup, tokenIndex) {
        return (0, utils_1.nativeI80F48ToUi)(this.getNativeBorrow(rootBank, tokenIndex).ceil(), mangoGroup.getTokenDecimals(tokenIndex));
    }
    getSpotVal(mangoGroup, mangoCache, index, assetWeight) {
        let assetsVal = fixednum_1.ZERO_I80F48;
        const price = mangoGroup.getPrice(index, mangoCache);
        const depositVal = this.getUiDeposit(mangoCache.rootBankCache[index], mangoGroup, index)
            .mul(price)
            .mul(assetWeight);
        assetsVal = assetsVal.add(depositVal);
        const openOrdersAccount = this.spotOpenOrdersAccounts[index];
        if (openOrdersAccount !== undefined) {
            assetsVal = assetsVal.add(fixednum_1.I80F48.fromNumber((0, utils_1.nativeToUi)(openOrdersAccount.baseTokenTotal.toNumber(), mangoGroup.tokens[index].decimals))
                .mul(price)
                .mul(assetWeight));
            assetsVal = assetsVal.add(fixednum_1.I80F48.fromNumber((0, utils_1.nativeToUi)(openOrdersAccount.quoteTokenTotal.toNumber() +
                openOrdersAccount['referrerRebatesAccrued'].toNumber(), mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals)));
        }
        return assetsVal;
    }
    getAssetsVal(mangoGroup, mangoCache, healthType) {
        let assetsVal = fixednum_1.ZERO_I80F48;
        // quote currency deposits
        assetsVal = assetsVal.add(this.getUiDeposit(mangoCache.rootBankCache[layout_1.QUOTE_INDEX], mangoGroup, layout_1.QUOTE_INDEX));
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            let assetWeight = fixednum_1.ONE_I80F48;
            if (healthType === 'Maint') {
                assetWeight = mangoGroup.spotMarkets[i].maintAssetWeight;
            }
            else if (healthType === 'Init') {
                assetWeight = mangoGroup.spotMarkets[i].initAssetWeight;
            }
            const spotVal = this.getSpotVal(mangoGroup, mangoCache, i, assetWeight);
            assetsVal = assetsVal.add(spotVal);
            const price = mangoCache.priceCache[i].price;
            const perpsUiAssetVal = (0, utils_1.nativeI80F48ToUi)(this.perpAccounts[i].getAssetVal(mangoGroup.perpMarkets[i], price, mangoCache.perpMarketCache[i].shortFunding, mangoCache.perpMarketCache[i].longFunding), mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals);
            assetsVal = assetsVal.add(perpsUiAssetVal);
        }
        return assetsVal;
    }
    getLiabsVal(mangoGroup, mangoCache, healthType) {
        let liabsVal = fixednum_1.ZERO_I80F48;
        liabsVal = liabsVal.add(this.getUiBorrow(mangoCache.rootBankCache[layout_1.QUOTE_INDEX], mangoGroup, layout_1.QUOTE_INDEX));
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            let liabWeight = fixednum_1.ONE_I80F48;
            const price = mangoGroup.getPrice(i, mangoCache);
            if (healthType === 'Maint') {
                liabWeight = mangoGroup.spotMarkets[i].maintLiabWeight;
            }
            else if (healthType === 'Init') {
                liabWeight = mangoGroup.spotMarkets[i].initLiabWeight;
            }
            liabsVal = liabsVal.add(this.getUiBorrow(mangoCache.rootBankCache[i], mangoGroup, i).mul(price.mul(liabWeight)));
            const perpsUiLiabsVal = (0, utils_1.nativeI80F48ToUi)(this.perpAccounts[i].getLiabsVal(mangoGroup.perpMarkets[i], mangoCache.priceCache[i].price, mangoCache.perpMarketCache[i].shortFunding, mangoCache.perpMarketCache[i].longFunding), mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals);
            liabsVal = liabsVal.add(perpsUiLiabsVal);
        }
        return liabsVal;
    }
    getNativeLiabsVal(mangoGroup, mangoCache, healthType) {
        let liabsVal = fixednum_1.ZERO_I80F48;
        liabsVal = liabsVal.add(this.getNativeBorrow(mangoCache.rootBankCache[layout_1.QUOTE_INDEX], layout_1.QUOTE_INDEX));
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const price = mangoCache.priceCache[i].price;
            let liabWeight = fixednum_1.ONE_I80F48;
            if (healthType === 'Maint') {
                liabWeight = mangoGroup.spotMarkets[i].maintLiabWeight;
            }
            else if (healthType === 'Init') {
                liabWeight = mangoGroup.spotMarkets[i].initLiabWeight;
            }
            liabsVal = liabsVal.add(this.getNativeBorrow(mangoCache.rootBankCache[i], i).mul(price.mul(liabWeight)));
            liabsVal = liabsVal.add(this.perpAccounts[i].getLiabsVal(mangoGroup.perpMarkets[i], price, mangoCache.perpMarketCache[i].shortFunding, mangoCache.perpMarketCache[i].longFunding));
        }
        return liabsVal;
    }
    /**
     * deposits - borrows in native terms
     */
    getNet(bankCache, tokenIndex) {
        return this.deposits[tokenIndex]
            .mul(bankCache.depositIndex)
            .sub(this.borrows[tokenIndex].mul(bankCache.borrowIndex));
    }
    /**
     * Take health components and return the assets and liabs weighted
     */
    getWeightedAssetsLiabsVals(mangoGroup, mangoCache, spot, perps, quote, healthType) {
        let assets = fixednum_1.ZERO_I80F48;
        let liabs = fixednum_1.ZERO_I80F48;
        if (quote.isPos()) {
            assets = assets.add(quote);
        }
        else {
            liabs = liabs.add(quote.neg());
        }
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const w = (0, utils_1.getWeights)(mangoGroup, i, healthType);
            const price = mangoCache.priceCache[i].price;
            if (spot[i].isPos()) {
                assets = spot[i].mul(price).mul(w.spotAssetWeight).add(assets);
            }
            else {
                liabs = spot[i].neg().mul(price).mul(w.spotLiabWeight).add(liabs);
            }
            if (perps[i].isPos()) {
                assets = perps[i].mul(price).mul(w.perpAssetWeight).add(assets);
            }
            else {
                liabs = perps[i].neg().mul(price).mul(w.perpLiabWeight).add(liabs);
            }
        }
        return { assets, liabs };
    }
    /**
     * Take health components and return the assets and liabs weighted using a price modifier
     */
    getModWeightedAssetsLiabsVals(mangoGroup, mangoCache, spot, perps, quote, modifier, healthType) {
        let assets = fixednum_1.ZERO_I80F48;
        let liabs = fixednum_1.ZERO_I80F48;
        if (quote.isPos()) {
            assets = assets.add(quote);
        }
        else {
            liabs = liabs.add(quote.neg());
        }
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            let priceModifier = fixednum_1.ONE_I80F48;
            if (i != layout_1.QUOTE_INDEX || i != 4) {
                priceModifier = modifier;
            }
            const w = (0, utils_1.getWeights)(mangoGroup, i, healthType);
            const price = mangoCache.priceCache[i].price.mul(priceModifier);
            if (spot[i].isPos()) {
                assets = spot[i].mul(price).mul(w.spotAssetWeight).add(assets);
            }
            else {
                liabs = spot[i].neg().mul(price).mul(w.spotLiabWeight).add(liabs);
            }
            if (perps[i].isPos()) {
                assets = perps[i].mul(price).mul(w.perpAssetWeight).add(assets);
            }
            else {
                liabs = perps[i].neg().mul(price).mul(w.perpLiabWeight).add(liabs);
            }
        }
        return { assets, liabs };
    }
    getHealthFromComponents(mangoGroup, mangoCache, spot, perps, quote, healthType) {
        const health = quote;
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const w = (0, utils_1.getWeights)(mangoGroup, i, healthType);
            const price = mangoCache.priceCache[i].price;
            const spotHealth = spot[i]
                .mul(price)
                .imul(spot[i].isPos() ? w.spotAssetWeight : w.spotLiabWeight);
            const perpHealth = perps[i]
                .mul(price)
                .imul(perps[i].isPos() ? w.perpAssetWeight : w.perpLiabWeight);
            health.iadd(spotHealth).iadd(perpHealth);
        }
        return health;
    }
    getHealthsFromComponents(mangoGroup, mangoCache, spot, perps, quote, healthType) {
        const spotHealth = quote;
        const perpHealth = quote;
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const w = (0, utils_1.getWeights)(mangoGroup, i, healthType);
            const price = mangoCache.priceCache[i].price;
            const _spotHealth = spot[i]
                .mul(price)
                .imul(spot[i].isPos() ? w.spotAssetWeight : w.spotLiabWeight);
            const _perpHealth = perps[i]
                .mul(price)
                .imul(perps[i].isPos() ? w.perpAssetWeight : w.perpLiabWeight);
            spotHealth.iadd(_spotHealth);
            perpHealth.iadd(_perpHealth);
        }
        return { spot: spotHealth, perp: perpHealth };
    }
    /**
     * Amount of native quote currency available to expand your position in this market
     */
    getMarketMarginAvailable(mangoGroup, mangoCache, marketIndex, marketType) {
        const health = this.getHealth(mangoGroup, mangoCache, 'Init');
        if (health.lte(fixednum_1.ZERO_I80F48)) {
            return fixednum_1.ZERO_I80F48;
        }
        const w = (0, utils_1.getWeights)(mangoGroup, marketIndex, 'Init');
        const weight = marketType === 'spot' ? w.spotAssetWeight : w.perpAssetWeight;
        if (weight.gte(fixednum_1.ONE_I80F48)) {
            // This is actually an error state and should not happen
            return health;
        }
        else {
            return health.div(fixednum_1.ONE_I80F48.sub(weight));
        }
    }
    /**
     * Get token amount available to withdraw without borrowing.
     */
    getAvailableBalance(mangoGroup, mangoCache, tokenIndex) {
        const health = this.getHealth(mangoGroup, mangoCache, 'Init');
        const net = this.getNet(mangoCache.rootBankCache[tokenIndex], tokenIndex);
        if (tokenIndex === layout_1.QUOTE_INDEX) {
            return health.min(net).max(fixednum_1.ZERO_I80F48);
        }
        else {
            const w = (0, utils_1.getWeights)(mangoGroup, tokenIndex, 'Init');
            return net
                .min(health
                .div(w.spotAssetWeight)
                .div(mangoCache.priceCache[tokenIndex].price))
                .max(fixednum_1.ZERO_I80F48);
        }
    }
    /**
     * Return the spot, perps and quote currency values after adjusting for
     * worst case open orders scenarios. These values are not adjusted for health
     * type
     * @param mangoGroup
     * @param mangoCache
     */
    getHealthComponents(mangoGroup, mangoCache) {
        const spot = Array(mangoGroup.numOracles).fill(fixednum_1.ZERO_I80F48);
        const perps = Array(mangoGroup.numOracles).fill(fixednum_1.ZERO_I80F48);
        const quote = this.getNet(mangoCache.rootBankCache[layout_1.QUOTE_INDEX], layout_1.QUOTE_INDEX);
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const bankCache = mangoCache.rootBankCache[i];
            const price = mangoCache.priceCache[i].price;
            const baseNet = this.getNet(bankCache, i);
            // Evaluate spot first
            const openOrders = this.spotOpenOrdersAccounts[i];
            if (this.inMarginBasket[i] && openOrders !== undefined) {
                const { quoteFree, quoteLocked, baseFree, baseLocked } = (0, utils_1.splitOpenOrders)(openOrders);
                // base total if all bids were executed
                const bidsBaseNet = baseNet
                    .add(quoteLocked.div(price))
                    .iadd(baseFree)
                    .iadd(baseLocked);
                // base total if all asks were executed
                const asksBaseNet = baseNet.add(baseFree);
                // bids case worse if it has a higher absolute position
                if (bidsBaseNet.abs().gt(asksBaseNet.abs())) {
                    spot[i] = bidsBaseNet;
                    quote.iadd(quoteFree);
                }
                else {
                    spot[i] = asksBaseNet;
                    quote.iadd(baseLocked.mul(price)).iadd(quoteFree).iadd(quoteLocked);
                }
            }
            else {
                spot[i] = baseNet;
            }
            // Evaluate perps
            if (!mangoGroup.perpMarkets[i].perpMarket.equals(utils_1.zeroKey)) {
                const perpMarketCache = mangoCache.perpMarketCache[i];
                const perpAccount = this.perpAccounts[i];
                const baseLotSize = mangoGroup.perpMarkets[i].baseLotSize;
                const quoteLotSize = mangoGroup.perpMarkets[i].quoteLotSize;
                const takerQuote = fixednum_1.I80F48.fromI64(perpAccount.takerQuote.mul(quoteLotSize));
                const basePos = fixednum_1.I80F48.fromI64(perpAccount.basePosition.add(perpAccount.takerBase).imul(baseLotSize));
                const bidsQuantity = fixednum_1.I80F48.fromI64(perpAccount.bidsQuantity.mul(baseLotSize));
                const asksQuantity = fixednum_1.I80F48.fromI64(perpAccount.asksQuantity.mul(baseLotSize));
                const bidsBaseNet = basePos.add(bidsQuantity);
                const asksBaseNet = basePos.sub(asksQuantity);
                if (bidsBaseNet.abs().gt(asksBaseNet.abs())) {
                    const quotePos = perpAccount
                        .getQuotePosition(perpMarketCache)
                        .add(takerQuote)
                        .isub(bidsQuantity.mul(price));
                    quote.iadd(quotePos);
                    perps[i] = bidsBaseNet;
                }
                else {
                    const quotePos = perpAccount
                        .getQuotePosition(perpMarketCache)
                        .add(takerQuote)
                        .iadd(asksQuantity.mul(price));
                    quote.iadd(quotePos);
                    perps[i] = asksBaseNet;
                }
            }
            else {
                perps[i] = fixednum_1.ZERO_I80F48;
            }
        }
        return { spot, perps, quote };
    }
    getHealth(mangoGroup, mangoCache, healthType) {
        const { spot, perps, quote } = this.getHealthComponents(mangoGroup, mangoCache);
        const health = this.getHealthFromComponents(mangoGroup, mangoCache, spot, perps, quote, healthType);
        return health;
    }
    getHealthRatio(mangoGroup, mangoCache, healthType) {
        const { spot, perps, quote } = this.getHealthComponents(mangoGroup, mangoCache);
        const { assets, liabs } = this.getWeightedAssetsLiabsVals(mangoGroup, mangoCache, spot, perps, quote, healthType);
        if (liabs.gt(fixednum_1.ZERO_I80F48)) {
            return assets.div(liabs).sub(fixednum_1.ONE_I80F48).mul(fixednum_1.I80F48.fromNumber(100));
        }
        else {
            return fixednum_1.I80F48.fromNumber(100);
        }
    }
    /**
     * Return the spot, perps and quote currency values after adjusting for
     * worst case open orders scenarios, using a price modifier.
     * These values are not adjusted for health type.
     */
    getModHealthComponents(mangoGroup, mangoCache, modifier) {
        const spot = Array(mangoGroup.numOracles).fill(fixednum_1.ZERO_I80F48);
        const perps = Array(mangoGroup.numOracles).fill(fixednum_1.ZERO_I80F48);
        const quote = this.getNet(mangoCache.rootBankCache[layout_1.QUOTE_INDEX], layout_1.QUOTE_INDEX);
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            let priceModifier = fixednum_1.ONE_I80F48;
            if (i != layout_1.QUOTE_INDEX || i != 4) {
                priceModifier = modifier;
            }
            const bankCache = mangoCache.rootBankCache[i];
            const price = mangoCache.priceCache[i].price.mul(priceModifier);
            const baseNet = this.getNet(bankCache, i);
            // Evaluate spot first
            const openOrders = this.spotOpenOrdersAccounts[i];
            if (this.inMarginBasket[i] && openOrders !== undefined) {
                const { quoteFree, quoteLocked, baseFree, baseLocked } = (0, utils_1.splitOpenOrders)(openOrders);
                // base total if all bids were executed
                const bidsBaseNet = baseNet
                    .add(quoteLocked.div(price))
                    .iadd(baseFree)
                    .iadd(baseLocked);
                // base total if all asks were executed
                const asksBaseNet = baseNet.add(baseFree);
                // bids case worse if it has a higher absolute position
                if (bidsBaseNet.abs().gt(asksBaseNet.abs())) {
                    spot[i] = bidsBaseNet;
                    quote.iadd(quoteFree);
                }
                else {
                    spot[i] = asksBaseNet;
                    quote.iadd(baseLocked.mul(price)).iadd(quoteFree).iadd(quoteLocked);
                }
            }
            else {
                spot[i] = baseNet;
            }
            // Evaluate perps
            if (!mangoGroup.perpMarkets[i].perpMarket.equals(utils_1.zeroKey)) {
                const perpMarketCache = mangoCache.perpMarketCache[i];
                const perpAccount = this.perpAccounts[i];
                const baseLotSize = mangoGroup.perpMarkets[i].baseLotSize;
                const quoteLotSize = mangoGroup.perpMarkets[i].quoteLotSize;
                const takerQuote = fixednum_1.I80F48.fromI64(perpAccount.takerQuote.mul(quoteLotSize));
                const basePos = fixednum_1.I80F48.fromI64(perpAccount.basePosition.add(perpAccount.takerBase).imul(baseLotSize));
                const bidsQuantity = fixednum_1.I80F48.fromI64(perpAccount.bidsQuantity.mul(baseLotSize));
                const asksQuantity = fixednum_1.I80F48.fromI64(perpAccount.asksQuantity.mul(baseLotSize));
                const bidsBaseNet = basePos.add(bidsQuantity);
                const asksBaseNet = basePos.sub(asksQuantity);
                if (bidsBaseNet.abs().gt(asksBaseNet.abs())) {
                    const quotePos = perpAccount
                        .getQuotePosition(perpMarketCache)
                        .add(takerQuote)
                        .isub(bidsQuantity.mul(price));
                    quote.iadd(quotePos);
                    perps[i] = bidsBaseNet;
                }
                else {
                    const quotePos = perpAccount
                        .getQuotePosition(perpMarketCache)
                        .add(takerQuote)
                        .iadd(asksQuantity.mul(price));
                    quote.iadd(quotePos);
                    perps[i] = asksBaseNet;
                }
            }
            else {
                perps[i] = fixednum_1.ZERO_I80F48;
            }
        }
        return { spot, perps, quote };
    }
    getPriceMoveToLiquidate(mangoGroup, mangoCache) {
        const scenarioBaseLine = this.getHealthComponents(mangoGroup, mangoCache);
        const scenarioBaseAssetsLiabs = this.getWeightedAssetsLiabsVals(mangoGroup, mangoCache, scenarioBaseLine.spot, scenarioBaseLine.perps, scenarioBaseLine.quote, 'Maint');
        const scenarioMod = this.getModHealthComponents(mangoGroup, mangoCache, fixednum_1.I80F48.fromNumber(1.01));
        const scenarioModAssetsLiabs = this.getModWeightedAssetsLiabsVals(mangoGroup, mangoCache, scenarioMod.spot, scenarioMod.perps, scenarioMod.quote, fixednum_1.I80F48.fromNumber(1.01), 'Maint');
        const maintEquity = scenarioBaseAssetsLiabs.assets.sub(scenarioBaseAssetsLiabs.liabs);
        const maintAssetsRateOfChange = scenarioModAssetsLiabs.assets.sub(scenarioBaseAssetsLiabs.assets);
        const maintLiabsRateOfChange = scenarioModAssetsLiabs.liabs.sub(scenarioBaseAssetsLiabs.liabs);
        const maintRateOfChange = maintLiabsRateOfChange.sub(maintAssetsRateOfChange);
        let priceMoveToLiquidate = fixednum_1.ZERO_I80F48;
        if (maintRateOfChange.isZero()) {
            priceMoveToLiquidate = fixednum_1.ZERO_I80F48;
        }
        else {
            priceMoveToLiquidate = maintEquity.div(maintRateOfChange);
        }
        return priceMoveToLiquidate;
    }
    computeValue(mangoGroup, mangoCache) {
        return this.getAssetsVal(mangoGroup, mangoCache).sub(this.getLiabsVal(mangoGroup, mangoCache));
    }
    /**
     * Get the value of unclaimed MNGO liquidity mining rewards
     */
    mgnoAccruedValue(mangoGroup, mangoCache) {
        const config = new config_1.Config(ids_json_1.default);
        const groupConfig = config.groups.find((g) => g.publicKey.equals(mangoGroup.publicKey));
        const mngoOracleIndex = groupConfig.oracles.findIndex((t) => t.symbol === 'MNGO');
        const mngoTokenIndex = groupConfig.tokens.findIndex((t) => t.symbol === 'MNGO');
        const mngoPrice = mangoCache.priceCache[mngoOracleIndex].price;
        const mngoDecimals = mangoGroup.tokens[mngoTokenIndex].decimals;
        let val = fixednum_1.ZERO_I80F48;
        for (let i = 0; i < mangoGroup.numOracles; i++) {
            const mgnoAccruedUiVal = (0, utils_1.nativeI80F48ToUi)(fixednum_1.I80F48.fromI64(this.perpAccounts[i].mngoAccrued).mul(mngoPrice), mngoDecimals);
            val = val.add(mgnoAccruedUiVal);
        }
        return val;
    }
    getLeverage(mangoGroup, mangoCache) {
        const liabs = this.getLiabsVal(mangoGroup, mangoCache);
        const assets = this.getAssetsVal(mangoGroup, mangoCache);
        if (assets.gt(fixednum_1.ZERO_I80F48)) {
            return liabs.div(assets.sub(liabs));
        }
        return fixednum_1.ZERO_I80F48;
    }
    calcTotalPerpUnsettledPnl(mangoGroup, mangoCache) {
        let pnl = fixednum_1.ZERO_I80F48;
        for (let i = 0; i < mangoGroup.perpMarkets.length; i++) {
            const perpMarketInfo = mangoGroup.perpMarkets[i];
            if (perpMarketInfo.isEmpty())
                continue;
            const price = mangoCache.getPrice(i);
            pnl = pnl.add(this.perpAccounts[i].getPnl(perpMarketInfo, mangoCache.perpMarketCache[i], price));
        }
        return pnl;
    }
    calcTotalPerpPosUnsettledPnl(mangoGroup, mangoCache) {
        let pnl = fixednum_1.ZERO_I80F48;
        for (let i = 0; i < mangoGroup.perpMarkets.length; i++) {
            const perpMarketInfo = mangoGroup.perpMarkets[i];
            if (perpMarketInfo.isEmpty())
                continue;
            const price = mangoCache.getPrice(i);
            const perpAccountPnl = this.perpAccounts[i].getPnl(perpMarketInfo, mangoCache.perpMarketCache[i], price);
            if (perpAccountPnl.isPos()) {
                pnl = pnl.add(perpAccountPnl);
            }
        }
        return pnl;
    }
    getMaxLeverageForMarket(mangoGroup, mangoCache, marketIndex, market, side, price) {
        const initHealth = this.getHealth(mangoGroup, mangoCache, 'Init');
        const healthDecimals = fixednum_1.I80F48.fromNumber(Math.pow(10, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals));
        const uiInitHealth = initHealth.div(healthDecimals);
        let uiDepositVal = fixednum_1.ZERO_I80F48;
        let uiBorrowVal = fixednum_1.ZERO_I80F48;
        let deposits = fixednum_1.ZERO_I80F48;
        let borrows = fixednum_1.ZERO_I80F48;
        let initLiabWeight, initAssetWeight;
        if (market instanceof PerpMarket_1.default) {
            ({ initLiabWeight, initAssetWeight } =
                mangoGroup.perpMarkets[marketIndex]);
            const basePos = this.perpAccounts[marketIndex].basePosition;
            if (basePos.gt(utils_2.ZERO_BN)) {
                deposits = fixednum_1.I80F48.fromNumber(market.baseLotsToNumber(basePos));
                uiDepositVal = deposits.mul(price);
            }
            else {
                borrows = fixednum_1.I80F48.fromNumber(market.baseLotsToNumber(basePos)).abs();
                uiBorrowVal = borrows.mul(price);
            }
        }
        else {
            ({ initLiabWeight, initAssetWeight } =
                mangoGroup.spotMarkets[marketIndex]);
            deposits = this.getUiDeposit(mangoCache.rootBankCache[marketIndex], mangoGroup, marketIndex);
            uiDepositVal = deposits.mul(price);
            borrows = this.getUiBorrow(mangoCache.rootBankCache[marketIndex], mangoGroup, marketIndex);
            uiBorrowVal = borrows.mul(price);
        }
        let max = fixednum_1.ZERO_I80F48;
        if (side === 'buy') {
            const uiHealthAtZero = uiInitHealth.add(uiBorrowVal.mul(initLiabWeight.sub(fixednum_1.ONE_I80F48)));
            max = uiHealthAtZero
                .div(fixednum_1.ONE_I80F48.sub(initAssetWeight))
                .add(uiBorrowVal);
        }
        else {
            const uiHealthAtZero = uiInitHealth.add(uiDepositVal.mul(fixednum_1.ONE_I80F48.sub(initAssetWeight)));
            max = uiHealthAtZero
                .div(initLiabWeight.sub(fixednum_1.ONE_I80F48))
                .add(uiDepositVal);
        }
        return { max, uiBorrowVal, uiDepositVal, deposits, borrows };
    }
    getMaxWithBorrowForToken(mangoGroup, mangoCache, tokenIndex) {
        const oldInitHealth = this.getHealth(mangoGroup, mangoCache, 'Init').floor();
        const tokenDeposits = this.getNativeDeposit(mangoCache.rootBankCache[tokenIndex], tokenIndex).floor();
        let liabWeight, assetWeight, nativePrice;
        if (tokenIndex === layout_1.QUOTE_INDEX) {
            liabWeight = assetWeight = nativePrice = fixednum_1.ONE_I80F48;
        }
        else {
            liabWeight = mangoGroup.spotMarkets[tokenIndex].initLiabWeight;
            assetWeight = mangoGroup.spotMarkets[tokenIndex].initAssetWeight;
            nativePrice = mangoCache.priceCache[tokenIndex].price;
        }
        const newInitHealth = oldInitHealth
            .sub(tokenDeposits.mul(nativePrice).mul(assetWeight))
            .floor();
        const price = mangoGroup.getPrice(tokenIndex, mangoCache);
        const healthDecimals = fixednum_1.I80F48.fromNumber(Math.pow(10, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals));
        return newInitHealth.div(healthDecimals).div(price.mul(liabWeight));
    }
    isLiquidatable(mangoGroup, mangoCache) {
        return ((this.beingLiquidated &&
            this.getHealth(mangoGroup, mangoCache, 'Init').isNeg()) ||
            this.getHealth(mangoGroup, mangoCache, 'Maint').isNeg());
    }
    toPrettyString(groupConfig, mangoGroup, cache) {
        const lines = [];
        lines.push('MangoAccount ' + this.publicKey.toBase58());
        lines.push('Owner: ' + this.owner.toBase58());
        if (!this.delegate.equals(utils_1.zeroKey)) {
            lines.push('Delegate: ' + this.delegate.toBase58());
        }
        lines.push('Maint Health Ratio: ' +
            this.getHealthRatio(mangoGroup, cache, 'Maint').toFixed(4));
        lines.push('Maint Health: ' + this.getHealth(mangoGroup, cache, 'Maint').toFixed(4));
        lines.push('Init Health: ' + this.getHealth(mangoGroup, cache, 'Init').toFixed(4));
        lines.push('Equity: ' + this.computeValue(mangoGroup, cache).toFixed(4));
        lines.push('isBankrupt: ' + this.isBankrupt);
        lines.push('beingLiquidated: ' + this.beingLiquidated);
        lines.push('Spot:');
        lines.push('Token: Net Balance / Base In Orders / Quote In Orders / Liq. Price');
        const quoteAdj = new bn_js_1.default(10).pow(new bn_js_1.default(mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals));
        for (let i = 0; i < mangoGroup.tokens.length; i++) {
            if (mangoGroup.tokens[i].mint.equals(utils_1.zeroKey)) {
                continue;
            }
            const token = (0, config_1.getTokenByMint)(groupConfig, mangoGroup.tokens[i].mint);
            let baseInOrders = utils_2.ZERO_BN;
            let quoteInOrders = utils_2.ZERO_BN;
            const openOrders = i !== layout_1.QUOTE_INDEX ? this.spotOpenOrdersAccounts[i] : undefined;
            if (openOrders) {
                const baseAdj = new bn_js_1.default(10).pow(new bn_js_1.default(mangoGroup.tokens[i].decimals));
                baseInOrders = openOrders.baseTokenTotal.div(baseAdj);
                quoteInOrders = openOrders.quoteTokenTotal
                    .add(openOrders['referrerRebatesAccrued'])
                    .div(quoteAdj);
            }
            const net = (0, utils_1.nativeI80F48ToUi)(this.getNet(cache.rootBankCache[i], i), mangoGroup.tokens[i].decimals);
            if (net.eq(fixednum_1.ZERO_I80F48) &&
                baseInOrders.isZero() &&
                quoteInOrders.isZero()) {
                continue;
            }
            const liqPrice = i !== layout_1.QUOTE_INDEX
                ? this.getLiquidationPrice(mangoGroup, cache, i)
                : undefined;
            const liqPriceStr = liqPrice !== undefined ? liqPrice.toFixed(4) : 'N/A';
            lines.push(`${token.symbol}: ${net.toFixed(4)} / ${baseInOrders
                .toNumber()
                .toFixed(4)} / ${quoteInOrders
                .toNumber()
                .toFixed(4)} / ${liqPriceStr}`);
        }
        lines.push('Perps:');
        lines.push('Market: Base Pos / Quote Pos / Unsettled Funding / Health / Liq. Price');
        for (let i = 0; i < this.perpAccounts.length; i++) {
            if (mangoGroup.perpMarkets[i].perpMarket.equals(utils_1.zeroKey)) {
                continue;
            }
            const market = (0, config_1.getMarketByPublicKey)(groupConfig, mangoGroup.perpMarkets[i].perpMarket);
            if (market === undefined) {
                continue;
            }
            const liqPrice = this.getLiquidationPrice(mangoGroup, cache, i);
            const liqPriceStr = liqPrice !== undefined ? liqPrice.toFixed(4) : 'N/A';
            const perpAccount = this.perpAccounts[i];
            const perpMarketInfo = mangoGroup.perpMarkets[i];
            lines.push(`${market.name}: ${this.getBasePositionUiWithGroup(i, mangoGroup).toFixed(4)} / ${(perpAccount.getQuotePosition(cache.perpMarketCache[i]).toNumber() /
                quoteAdj.toNumber()).toFixed(4)} / ${(perpAccount.getUnsettledFunding(cache.perpMarketCache[i]).toNumber() /
                quoteAdj.toNumber()).toFixed(4)} / ${perpAccount
                .getHealth(perpMarketInfo, cache.priceCache[i].price, perpMarketInfo.maintAssetWeight, perpMarketInfo.maintLiabWeight, cache.perpMarketCache[i].longFunding, cache.perpMarketCache[i].shortFunding)
                .toFixed(4)} / ${liqPriceStr}`);
        }
        return lines.join(os_1.EOL);
    }
    /**
     * Get all the open orders using only info in MangoAccount; Does not contain
     * information about the size of the order.
     */
    getPerpOpenOrders() {
        const perpOpenOrders = [];
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orderMarket[i] === layout_1.FREE_ORDER_SLOT) {
                continue;
            }
            perpOpenOrders.push({
                marketIndex: this.orderMarket[i],
                price: (0, book_1.getPriceFromKey)(this.orders[i]),
                side: this.orderSide[i],
            });
        }
        return perpOpenOrders;
    }
    /**
     * Return the open orders keys in basket and replace open orders not in basket with zero key
     */
    getOpenOrdersKeysInBasket() {
        return this.spotOpenOrders.map((pk, i) => this.inMarginBasket[i] ? pk : utils_1.zeroKey);
    }
    /**
     * Return the open orders keys in basket; no zero keys; useful for PlaceSpotOrder2 and PlacePerpOrder2
     */
    getOpenOrdersKeysInBasketPacked() {
        return this.spotOpenOrders.filter((pk, i) => this.inMarginBasket[i]);
    }
    /**
     *  Return the current position for the market at `marketIndex` in UI units
     *  e.g. if you buy 1 BTC in the UI, you're buying 1,000,000 native BTC,
     *  10,000 BTC-PERP contracts and exactly 1 BTC in UI
     *  Find the marketIndex in the ids.json list of perp markets
     */
    getPerpPositionUi(marketIndex, perpMarket) {
        return this.perpAccounts[marketIndex].getBasePositionUi(perpMarket);
    }
    /**
     *  Return the current position for the market at `marketIndex` in UI units
     *  e.g. if you buy 1 BTC in the UI, you're buying 1,000,000 native BTC,
     *  10,000 BTC-PERP contracts and exactly 1 BTC in UI
     *  Find the marketIndex in the ids.json list of perp markets
     */
    getBasePositionUiWithGroup(marketIndex, group) {
        return (this.perpAccounts[marketIndex].basePosition
            .mul(group.perpMarkets[marketIndex].baseLotSize)
            .toNumber() / Math.pow(10, group.tokens[marketIndex].decimals));
    }
    /**
     * Return the equity in standard UI numbers. E.g. if equity is $100, this returns 100
     */
    getEquityUi(mangoGroup, mangoCache) {
        return (this.computeValue(mangoGroup, mangoCache).toNumber() /
            Math.pow(10, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals));
    }
    /**
     * This is the init health divided by quote decimals
     */
    getCollateralValueUi(mangoGroup, mangoCache) {
        return (this.getHealth(mangoGroup, mangoCache, 'Init').toNumber() /
            Math.pow(10, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals));
    }
    /**
     * Calculates the exposure for each spot asset and perp contract
     * in standard UI numbers. E.g. if a user has net borrowed $100,
     * and is long 10,000 MNGO contracts this would return:
     * [{asset: "USDC", symbol: "USDC", amount: -100, value: -100},
     *  {asset: "MNGO-PERP", symbol: "MNGO", amount: 10000, value: 2000}]
     * All perp markets that are active for the mango group need to be
     * loaded before calling this method and can passed in arbitrary order.
     */
    getNetExposureByAsset(groupConfig, group, perpMarkets, cache) {
        // calculate quote balance first
        const quoteBalance = (0, utils_1.nativeToUi)(this.getNet(cache.rootBankCache[layout_1.QUOTE_INDEX], layout_1.QUOTE_INDEX).toNumber(), group.tokens[layout_1.QUOTE_INDEX].decimals);
        let result = [
            {
                asset: 'USDC',
                amount: quoteBalance,
                symbol: 'USDC',
                value: quoteBalance,
            },
        ];
        const quote = result[0];
        // then for each oracle
        for (let index = 0; index < group.numOracles; ++index) {
            const oracle = groupConfig.oracles[index];
            if (!oracle) {
                continue;
            }
            const price = group.getPrice(index, cache).toNumber();
            // calculate spot margin balance
            if (!group.spotMarkets[index].isEmpty()) {
                let amount = (0, utils_1.nativeToUi)(this.getNet(cache.rootBankCache[index], index).toNumber(), group.tokens[index].decimals);
                let value = amount * price;
                const openOrdersAccount = this.spotOpenOrdersAccounts[index];
                if (openOrdersAccount !== undefined) {
                    // include open orders unsettled base
                    const baseAmount = (0, utils_1.nativeToUi)(openOrdersAccount.baseTokenTotal.toNumber(), group.tokens[index].decimals);
                    amount += baseAmount;
                    value += baseAmount * price;
                    // adjust quote with open orders unsettled quote
                    const quoteAmount = (0, utils_1.nativeToUi)(openOrdersAccount.quoteTokenTotal.toNumber() +
                        openOrdersAccount['referrerRebatesAccrued'].toNumber(), group.tokens[layout_1.QUOTE_INDEX].decimals);
                    quote.amount += quoteAmount;
                    quote.value += quoteAmount;
                }
                result.push({
                    asset: oracle.symbol,
                    symbol: oracle.symbol,
                    amount,
                    value,
                });
            }
            // calculate perp balance
            if (!group.perpMarkets[index].isEmpty()) {
                const marketConfig = groupConfig.perpMarkets.find((p) => p.marketIndex == index);
                const market = perpMarkets.find((p) => p === null || p === void 0 ? void 0 : p.publicKey.equals(marketConfig === null || marketConfig === void 0 ? void 0 : marketConfig.publicKey));
                const amount = this.perpAccounts[index].getBasePositionUi(market);
                const value = price * amount;
                result.push({
                    asset: marketConfig.name,
                    symbol: oracle.symbol,
                    amount,
                    value,
                });
                // adjust quote w/ unsettled amount
                const unsettledAmount = (0, utils_1.nativeToUi)(this.perpAccounts[index]
                    .getPnl(group.perpMarkets[index], cache.perpMarketCache[index], fixednum_1.I80F48.fromNumber(price))
                    .toNumber(), group.tokens[layout_1.QUOTE_INDEX].decimals);
                quote.amount += unsettledAmount;
                quote.value += unsettledAmount;
            }
        }
        return result;
    }
}
exports.default = MangoAccount;
//# sourceMappingURL=MangoAccount.js.map