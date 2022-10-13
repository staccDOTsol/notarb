"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var PythConnection_1 = require("./PythConnection");
var cluster_1 = require("./cluster");
var _1 = require(".");
var SOLANA_CLUSTER_NAME = 'devnet';
var connection = new web3_js_1.Connection(cluster_1.getPythClusterApiUrl(SOLANA_CLUSTER_NAME));
var pythPublicKey = cluster_1.getPythProgramKeyForCluster(SOLANA_CLUSTER_NAME);
var pythConnection = new PythConnection_1.PythConnection(connection, pythPublicKey);
pythConnection.onPriceChangeVerbose(function (productAccount, priceAccount) {
    // The arguments to the callback include solana account information / the update slot if you need it.
    var product = productAccount.accountInfo.data.product;
    var price = priceAccount.accountInfo.data;
    // sample output:
    // SRM/USD: $8.68725 ±$0.0131
    if (price.price && price.confidence) {
        // tslint:disable-next-line:no-console
        console.log(product.symbol + ": $" + price.price + " \u00B1$" + price.confidence);
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(product.symbol + ": price currently unavailable. status is " + _1.PriceStatus[price.status]);
    }
});
// tslint:disable-next-line:no-console
console.log('Reading from Pyth price feed...');
pythConnection.start();
