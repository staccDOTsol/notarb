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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSerum = exports.loadMarket = exports.getOrderBooks = void 0;
const serum_1 = require("@project-serum/serum");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("../../types/types");
const common_1 = require("./common");
function getOrderBooks(connection, markets) {
    return __awaiter(this, void 0, void 0, function* () {
        const asksAndBidsAddressToMarket = {};
        for (const [marketAddress, marketConfig] of Object.entries(markets)) {
            // @ts-ignore
            asksAndBidsAddressToMarket[marketConfig.market.asksAddress.toString()] = marketAddress;
            // @ts-ignore
            asksAndBidsAddressToMarket[marketConfig.market.bidsAddress.toString()] = marketAddress;
        }
        if (asksAndBidsAddressToMarket) {
            let infos = yield (0, common_1.getMultipleAccounts)(connection, Object.keys(asksAndBidsAddressToMarket).map((item) => new web3_js_1.PublicKey(item)), 'processed');
            infos.forEach((info) => {
                if (info === null)
                    return;
                const address = info.publicKey.toString();
                if (!asksAndBidsAddressToMarket[address])
                    return;
                const market = asksAndBidsAddressToMarket[address];
                const orderbook = serum_1.Orderbook.decode(markets[market].market, info.account.data);
                const { isBids, slab } = orderbook;
                if (isBids) {
                    markets[market].bids = slab;
                }
                else {
                    markets[market].asks = slab;
                }
            });
            return markets;
        }
        return markets;
    });
}
exports.getOrderBooks = getOrderBooks;
function loadMarket(decoded, programId, tokenMap) {
    const [baseMintDecimals, quoteMintDecimals] = [
        tokenMap[decoded.baseMint].decimals,
        tokenMap[decoded.quoteMint].decimals,
    ];
    return new serum_1.Market(decoded, baseMintDecimals, quoteMintDecimals, {}, programId, null);
}
exports.loadMarket = loadMarket;
function loadSerum(serumMarkets, connection, tokenList) {
    return __awaiter(this, void 0, void 0, function* () {
        let market = {};
        let marketList = [];
        serum_1.Market.load;
        for (let i = 0; i < serumMarkets.length; i++) {
            marketList.push(loadMarket(serumMarkets[i], new web3_js_1.PublicKey(types_1.SERUM_PROGRAM_ID_V3), tokenList));
        }
        marketList.forEach((itemMarket) => {
            if (itemMarket)
                market[itemMarket.address.toString()] = { market: itemMarket };
        });
        return yield getOrderBooks(connection, market);
    });
}
exports.loadSerum = loadSerum;
