"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.getTokenBySymbol = exports.getTokenByMint = exports.getMarketByPublicKey = exports.getMarketByBaseSymbolAndKind = exports.getAllMarkets = exports.getSpotMarketByBaseSymbol = exports.getPerpMarketByIndex = exports.getPerpMarketByBaseSymbol = exports.getOracleBySymbol = exports.getMarketIndexBySymbol = exports.getOracleConfig = exports.getTokenConfig = exports.getPerpMarketConfig = exports.getSpotMarketConfig = exports.delistedOracles = exports.delistedTokens = exports.delistedPerpMarkets = exports.delistedSpotMarkets = exports.mngoMints = exports.msrmMints = void 0;
const web3_js_1 = require("@solana/web3.js");
const ids_json_1 = __importDefault(require("./ids.json"));
const utils_1 = require("./utils/utils");
exports.msrmMints = {
    devnet: new web3_js_1.PublicKey('8DJBo4bF4mHNxobjdax3BL9RMh5o71Jf8UiKsf5C5eVH'),
    mainnet: new web3_js_1.PublicKey('MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L'),
    localnet: utils_1.zeroKey,
    testnet: new web3_js_1.PublicKey('3Ho7PN3bYv9bp1JDErBD2FxsRepPkL88vju3oDX9c3Ez'),
};
exports.mngoMints = {
    devnet: new web3_js_1.PublicKey('Bb9bsTQa1bGEtQ5KagGkvSHyuLqDWumFUcRqFusFNJWC'),
    mainnet: new web3_js_1.PublicKey('MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac'),
    testnet: new web3_js_1.PublicKey('2hvukwp4UR9tqmCQhRzcsW9S2QBuU5Xcv5JJ5fUMmfvQ'),
};
exports.delistedSpotMarkets = [
    { publicKey: new web3_js_1.PublicKey('HBTu8hNaoT3VyiSSzJYa8jwt9sDGKtJviSwFa11iXdmE'), name: 'LUNA/USDC', baseSymbol: 'LUNA', baseDecimals: 6, marketIndex: 13 },
    { publicKey: new web3_js_1.PublicKey('6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk'), name: 'COPE/USDC', baseSymbol: 'COPE', baseDecimals: 6, marketIndex: 7 },
    { publicKey: new web3_js_1.PublicKey('3zzTxtDCt9PimwzGrgWJEbxZfSLetDMkdYegPanGNpMf'), name: 'BNB/USDC', baseSymbol: 'BNB', baseDecimals: 8, marketIndex: 11 }
];
exports.delistedPerpMarkets = [
    { publicKey: new web3_js_1.PublicKey('BCJrpvsB2BJtqiDgKVC4N6gyX1y24Jz96C6wMraYmXss'), name: 'LUNA-PERP', baseSymbol: 'LUNA', baseDecimals: 6, quoteDecimals: 6, marketIndex: 13 },
];
exports.delistedTokens = [
    { mintKey: new web3_js_1.PublicKey('F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W'), symbol: 'LUNA', decimals: 6 },
    { mintKey: new web3_js_1.PublicKey('8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh'), symbol: 'COPE', decimals: 6 },
];
exports.delistedOracles = [
    { publicKey: new web3_js_1.PublicKey('5bmWuR1dgP4avtGYMNKLuxumZTVKGgoN2BCMXWDNL9nY'), symbol: 'LUNA', marketIndex: 13 },
    { publicKey: new web3_js_1.PublicKey('9xYBiDWYsh2fHzpsz3aaCnNHCKWBNtfEDLtU6kS4aFD9'), symbol: 'COPE', marketIndex: 7 },
];
function oracleConfigFromJson(j) {
    return Object.assign(Object.assign({}, j), { publicKey: new web3_js_1.PublicKey(j.publicKey) });
}
function oracleConfigToJson(o) {
    return Object.assign(Object.assign({}, o), { publicKey: o.publicKey.toBase58() });
}
function spotMarketConfigFromJson(j) {
    return Object.assign(Object.assign({}, j), { publicKey: new web3_js_1.PublicKey(j.publicKey), bidsKey: new web3_js_1.PublicKey(j.bidsKey), asksKey: new web3_js_1.PublicKey(j.asksKey), eventsKey: new web3_js_1.PublicKey(j.eventsKey) });
}
function spotMarketConfigToJson(p) {
    return Object.assign(Object.assign({}, p), { publicKey: p.publicKey.toBase58(), bidsKey: p.bidsKey.toBase58(), asksKey: p.asksKey.toBase58(), eventsKey: p.eventsKey.toBase58() });
}
function perpMarketConfigFromJson(j) {
    return Object.assign(Object.assign({}, j), { publicKey: new web3_js_1.PublicKey(j.publicKey), bidsKey: new web3_js_1.PublicKey(j.bidsKey), asksKey: new web3_js_1.PublicKey(j.asksKey), eventsKey: new web3_js_1.PublicKey(j.eventsKey) });
}
function perpMarketConfigToJson(p) {
    return Object.assign(Object.assign({}, p), { publicKey: p.publicKey.toBase58(), bidsKey: p.bidsKey.toBase58(), asksKey: p.asksKey.toBase58(), eventsKey: p.eventsKey.toBase58() });
}
function tokenConfigFromJson(j) {
    return Object.assign(Object.assign({}, j), { mintKey: new web3_js_1.PublicKey(j.mintKey), rootKey: new web3_js_1.PublicKey(j.rootKey), nodeKeys: j.nodeKeys.map((k) => new web3_js_1.PublicKey(k)) });
}
function tokenConfigToJson(t) {
    return Object.assign(Object.assign({}, t), { mintKey: t.mintKey.toBase58(), rootKey: t.rootKey.toBase58(), nodeKeys: t.nodeKeys.map((k) => k.toBase58()) });
}
function getSpotMarketConfig(group, predicate) {
    let config = group.spotMarkets.find(predicate);
    if (!config) {
        config = (exports.delistedSpotMarkets.find(predicate));
    }
    return config;
}
exports.getSpotMarketConfig = getSpotMarketConfig;
function getPerpMarketConfig(group, predicate) {
    let config = group.perpMarkets.find(predicate);
    if (!config) {
        config = (exports.delistedPerpMarkets.find(predicate));
    }
    return config;
}
exports.getPerpMarketConfig = getPerpMarketConfig;
function getTokenConfig(group, predicate) {
    let config = group.tokens.find(predicate);
    if (!config) {
        config = (exports.delistedTokens.find(predicate));
    }
    return config;
}
exports.getTokenConfig = getTokenConfig;
function getOracleConfig(group, predicate) {
    let config = group.oracles.find(predicate);
    if (!config) {
        config = (exports.delistedOracles.find(predicate));
    }
    return config;
}
exports.getOracleConfig = getOracleConfig;
function getMarketIndexBySymbol(group, symbol) {
    let index = group.oracles.findIndex((o) => o.symbol === symbol);
    if (index === -1) {
        const delistedOracle = getOracleConfig(group, (o) => o.symbol === symbol);
        index = delistedOracle ? delistedOracle['marketIndex'] : -1;
    }
    return index;
}
exports.getMarketIndexBySymbol = getMarketIndexBySymbol;
function getOracleBySymbol(group, symbol) {
    return getOracleConfig(group, (o) => o.symbol === symbol);
}
exports.getOracleBySymbol = getOracleBySymbol;
function getPerpMarketByBaseSymbol(group, symbol) {
    return getPerpMarketConfig(group, (p) => p.baseSymbol === symbol);
}
exports.getPerpMarketByBaseSymbol = getPerpMarketByBaseSymbol;
function getPerpMarketByIndex(group, marketIndex) {
    return getPerpMarketConfig(group, (p) => p.marketIndex === marketIndex);
}
exports.getPerpMarketByIndex = getPerpMarketByIndex;
function getSpotMarketByBaseSymbol(group, symbol) {
    return getSpotMarketConfig(group, (p) => p.baseSymbol === symbol);
}
exports.getSpotMarketByBaseSymbol = getSpotMarketByBaseSymbol;
function getAllMarkets(group) {
    const spotMarkets = group.spotMarkets.map((m) => (Object.assign({ kind: 'spot' }, m)));
    const perpMarkets = group.perpMarkets.map((m) => (Object.assign({ kind: 'perp' }, m)));
    return spotMarkets.concat(perpMarkets);
}
exports.getAllMarkets = getAllMarkets;
function getMarketByBaseSymbolAndKind(group, symbol, kind) {
    const market = kind === 'spot'
        ? getSpotMarketByBaseSymbol(group, symbol)
        : getPerpMarketByBaseSymbol(group, symbol);
    return Object.assign({ kind }, market);
}
exports.getMarketByBaseSymbolAndKind = getMarketByBaseSymbolAndKind;
function getMarketByPublicKey(group, key) {
    if (!(key instanceof web3_js_1.PublicKey)) {
        key = new web3_js_1.PublicKey(key);
    }
    const spot = getSpotMarketConfig(group, (m) => m.publicKey.equals(key));
    if (spot) {
        return Object.assign({ kind: 'spot' }, spot);
    }
    const perp = getPerpMarketConfig(group, (m) => m.publicKey.equals(key));
    if (perp) {
        return Object.assign({ kind: 'perp' }, perp);
    }
}
exports.getMarketByPublicKey = getMarketByPublicKey;
function getTokenByMint(group, mint) {
    if (!(mint instanceof web3_js_1.PublicKey)) {
        mint = new web3_js_1.PublicKey(mint);
    }
    return getTokenConfig(group, (t) => t.mintKey.equals(mint));
}
exports.getTokenByMint = getTokenByMint;
function getTokenBySymbol(group, symbol) {
    const tokenConfig = getTokenConfig(group, (t) => t.symbol === symbol);
    if (tokenConfig === undefined) {
        throw new Error(`Unable to find symbol: ${symbol} in GroupConfig`);
    }
    return tokenConfig;
}
exports.getTokenBySymbol = getTokenBySymbol;
// export function getTokenBySymbol(group: GroupConfig, symbol: string) {
//   return group.tokens.find((t) => t.symbol === symbol);
// }
function groupConfigFromJson(j) {
    return Object.assign(Object.assign({}, j), { publicKey: new web3_js_1.PublicKey(j.publicKey), mangoProgramId: new web3_js_1.PublicKey(j.mangoProgramId), serumProgramId: new web3_js_1.PublicKey(j.serumProgramId), oracles: j.oracles.map((o) => oracleConfigFromJson(o)), perpMarkets: j.perpMarkets.map((p) => perpMarketConfigFromJson(p)), spotMarkets: j.spotMarkets.map((p) => spotMarketConfigFromJson(p)), tokens: j.tokens.map((t) => tokenConfigFromJson(t)) });
}
function groupConfigToJson(g) {
    return Object.assign(Object.assign({}, g), { publicKey: g.publicKey.toBase58(), mangoProgramId: g.mangoProgramId.toBase58(), serumProgramId: g.serumProgramId.toBase58(), oracles: g.oracles.map((o) => oracleConfigToJson(o)), perpMarkets: g.perpMarkets.map((p) => perpMarketConfigToJson(p)), spotMarkets: g.spotMarkets.map((p) => spotMarketConfigToJson(p)), tokens: g.tokens.map((t) => tokenConfigToJson(t)) });
}
class Config {
    constructor(json) {
        this.cluster_urls = json.cluster_urls;
        this.groups = json.groups.map((g) => groupConfigFromJson(g));
    }
    static ids() {
        return staticConfig;
    }
    toJson() {
        return Object.assign(Object.assign({}, this), { groups: this.groups.map((g) => groupConfigToJson(g)) });
    }
    getGroup(cluster, name) {
        return this.groups.find((g) => g.cluster === cluster && g.name === name);
    }
    getGroupWithName(name) {
        return this.groups.find((g) => g.name === name);
    }
    storeGroup(group) {
        const _group = this.getGroup(group.cluster, group.name);
        if (_group) {
            Object.assign(_group, group);
        }
        else {
            this.groups.unshift(group);
        }
    }
}
exports.Config = Config;
const staticConfig = new Config(ids_json_1.default);
//# sourceMappingURL=config.js.map