"use strict";
// @ts-nocheck
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
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var web3_js_1 = require("@solana/web3.js");
var got_1 = require("got");
var anchor_1 = require("@project-serum/anchor");
var promise_retry_1 = require("promise-retry");
var spl_token_1 = require("@solana/spl-token");
process.on('SIGTERM', function (signal) {
    console.log("Process ".concat(process.pid, " received a SIGTERM signal"));
    process.exit(0);
});
process.on('SIGINT', function (signal) {
    console.log("Process ".concat(process.pid, " has been interrupted"));
    process.exit(0);
});
console.log({ dotenv: dotenv_1["default"] });
dotenv_1["default"].config();
// This is a free Solana RPC endpoint. It may have ratelimit and sometimes
// invalid cache. I will recommend using a paid RPC endpoint.
var connection = new web3_js_1.Connection("http://localhost:8899", { skipPreflight: true });
var wallet = new anchor_1.Wallet(web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs_1["default"].readFileSync('/Users/jarettdunn/jaregm.json').toString()))));
var payer = (web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs_1["default"].readFileSync('/Users/jarettdunn/jaregm.json').toString()))));
var solend_sdk_1 = require("@solendprotocol/solend-sdk");
var fs_1 = require("fs");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var atas = [
    "2PYVzDJ6Buks4yUVeDEhLwc14wKpxbehEsbeU6yM8J8d",
    "JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD",
    "J2cL94QELJ9pt8L93e38pgqgHjzysKPWD9BoaE22HYmy", "8SRg1faUaqwqRyt2pC8xTC9Sg2hBabTH2GAKdKB5DqMk", "HEZTNc9u5evA3vndyLBUt5nXREtMmdYMPfRmF4hksdLu", "Becp7pmpFcbXUBwArc92Jkk6iS61nnfB9ajweVnpy6VG",
];
var somestuff2 = JSON.parse(fs_1["default"].readFileSync("./hahapairs.json").toString());
var has = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "So11111111111111111111111111111111111111112",
    "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
];
var somestuff = JSON.parse(fs_1["default"].readFileSync('./stuff.json').toString());
var mints = ["DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh",
    "AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB",
    "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
    "kiGenopAScF8VF31Zbtx2Hg8qA5ArGqvnVtXb83sotc",
    "4SZjjNABoqhbd4hnapbvoEPEqT8mnNkfbEoAwALf1V8t"];
for (var _i = 0, _a = somestuff2.data; _i < _a.length; _i++) {
    var add = _a[_i];
    for (var _b = 0, _c = add.tokens; _b < _c.length; _b++) {
        var address = _c[_b];
        mints.push(address.address);
    }
}
console.log(mints.length);
var getCoinQuote = function (inputMint, outputMint, amount) {
    return got_1["default"]
        .get("https://quote-api.jup.ag/v1/quote?outputMint=".concat(outputMint, "&inputMint=").concat(inputMint, "&amount=").concat(amount, "&slippage=0.2"))
        .json();
};
var getTransaction = function (route) {
    return got_1["default"]
        .post("https://quote-api.jup.ag/v1/swap", {
        json: {
            route: route,
            userPublicKey: wallet.publicKey.toString(),
            // to make sure it doesnt close the sol account
            wrapUnwrapSOL: false
        }
    })
        .json();
};
var getConfirmTransaction = function (txid) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, promise_retry_1["default"])(function (retry, attempt) { return __awaiter(void 0, void 0, void 0, function () {
                    var txResult, error;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connection.getTransaction(txid, {
                                    commitment: "confirmed"
                                })];
                            case 1:
                                txResult = _a.sent();
                                if (!txResult) {
                                    error = new Error("Transaction was not confirmed");
                                    error.txid = txid;
                                    retry(error);
                                    return [2 /*return*/];
                                }
                                return [2 /*return*/, txResult];
                        }
                    });
                }); }, {
                    retries: 40,
                    minTimeout: 500,
                    maxTimeout: 1000
                })];
            case 1:
                res = _a.sent();
                if (res.meta.err) {
                    throw new Error("Transaction failed");
                }
                return [2 /*return*/, txid];
        }
    });
}); };
// require wsol to start trading, this function create your wsol account and fund 1 SOL to it
//await createWSolAccount();
// initial 20 USDC for quote
var initial = 20000000;
var prism_ag_1 = require("@prism-hq/prism-ag");
var spl_token_2 = require("@solana/spl-token");
var spl_token_3 = require("@solana/spl-token");
setTimeout(function () {
    return __awaiter(this, void 0, void 0, function () {
        var prism, abc, _i, has_1, USDC_MINT, _loop_1, returns, blockhash, blockhash, _a, mints_1, SOL_MINT;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prism_ag_1.Prism.init({
                        // user executing swap
                        user: payer
                    })];
                case 1:
                    prism = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 9];
                    fs_1["default"].writeFileSync('./somestuff.json', JSON.stringify(somestuff));
                    abc = -1;
                    _i = 0, has_1 = has;
                    _b.label = 3;
                case 3:
                    if (!(_i < has_1.length)) return [3 /*break*/, 8];
                    USDC_MINT = has_1[_i];
                    abc++;
                    _loop_1 = function () {
                        var tokenAccount, dec, usdcToSol, routes, market, reserve, slot, _c, lookupTableInst, lookupTableAddress, ttt, token, delegate, tx, instructions_1, auxAccount, signers_1, swapTransaction, messageV0, aaa, ss, _d, _e, bca, extendInstruction, _f, _g, bca, extendInstruction2, _h, _j, bca, extendInstruction3, ix2, tx2, err_1, err_2, err_3, err_4, lookupTableAccount, messageV00, transaction, err_5, err_6;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    _k.trys.push([0, 41, , 42]);
                                    tokenAccount = new web3_js_1.PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
                                    ;
                                    return [4 /*yield*/, connection.getTokenAccountBalance(tokenAccount)];
                                case 1:
                                    dec = ((_k.sent()).value.decimals);
                                    initial = Math.floor(Math.random() * 6.66 * Math.pow(10, dec) + 0.666 * Math.pow(10, dec));
                                    console.log(initial / Math.pow(10, dec));
                                    // 0.1 SOL
                                    return [4 /*yield*/, prism.loadRoutes(SOL_MINT, USDC_MINT)];
                                case 2:
                                    // 0.1 SOL
                                    _k.sent(); // load routes for tokens, tokenSymbol | tokenMint (base58 string)
                                    return [4 /*yield*/, getCoinQuote(USDC_MINT, SOL_MINT, initial)];
                                case 3:
                                    usdcToSol = _k.sent();
                                    routes = prism.getRoutes(usdcToSol.data[0].outAmount * 0.999);
                                    returns = (((routes[0].amountOut / initial * 0.999) - 1));
                                    console.log(returns);
                                    if (returns > -50) {
                                        console.log(USDC_MINT + " <-> " + SOL_MINT + ": " + (Math.round(returns * 10000) / 10000) + '%');
                                    }
                                    if (!(returns > -50)) return [3 /*break*/, 40];
                                    return [4 /*yield*/, solend_sdk_1.SolendMarket.initialize(connection, 'production')];
                                case 4:
                                    market = _k.sent();
                                    reserve = market.reserves.find(function (res) { return res.config.liquidityToken.mint === USDC_MINT; });
                                    if (reserve == null) {
                                        throw 'can\'t find reserve!';
                                    }
                                    console.log("reserve: ".concat(JSON.stringify(reserve === null || reserve === void 0 ? void 0 : reserve.config.liquidityToken.mint)));
                                    return [4 /*yield*/, connection.getSlot()];
                                case 5:
                                    slot = _k.sent();
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 6:
                                    // Assumption:
                                    // `payer` is a valid `Keypair` with enough SOL to pay for the execution
                                    blockhash = _k.sent();
                                    _c = web3_js_1.AddressLookupTableProgram.createLookupTable({
                                        authority: payer.publicKey,
                                        payer: payer.publicKey,
                                        recentSlot: slot
                                    }), lookupTableInst = _c[0], lookupTableAddress = _c[1];
                                    return [4 /*yield*/, connection
                                            .getAddressLookupTable(lookupTableAddress)
                                            .then(function (res) { return res.value; })];
                                case 7:
                                    ttt = _k.sent();
                                    console.log(ttt);
                                    //  lookupTableAddress = new PublicKey("7XH2JSueLJMTuDLE67Qw92KKwAdLjggszDSN5GVoK3qD")
                                    //lookupTableAddress = new PublicKey("H3pPX8AYP2neyH6AL5mPZmcEWzCbKEU22gWUpY8JASu5")
                                    console.log("lookup table address:", lookupTableAddress.toBase58());
                                    if (!Object.keys(somestuff).includes(USDC_MINT + " <-> " + SOL_MINT)) {
                                        somestuff[USDC_MINT + " <-> " + SOL_MINT] = [];
                                    }
                                    token = new spl_token_1.Token(connection, new web3_js_1.PublicKey(reserve.config.liquidityToken.mint), spl_token_1.TOKEN_PROGRAM_ID, payer);
                                    delegate = web3_js_1.Keypair.generate();
                                    try {
                                        token.approve(tokenAccount, delegate.publicKey, payer, [], 100000000);
                                    }
                                    catch (err) {
                                    }
                                    tx = new web3_js_1.Transaction();
                                    instructions_1 = [((0, solend_sdk_1.flashBorrowReserveLiquidityInstruction)(initial, new web3_js_1.PublicKey(reserve.config.liquidityAddress), tokenAccount, new web3_js_1.PublicKey(reserve.config.address), new web3_js_1.PublicKey(market.config.address), solend_sdk_1.SOLEND_PRODUCTION_PROGRAM_ID))];
                                    auxAccount = web3_js_1.Keypair.generate();
                                    instructions_1.push.apply(instructions_1, [web3_js_1.SystemProgram.createAccount({
                                            fromPubkey: payer.publicKey,
                                            newAccountPubkey: auxAccount.publicKey,
                                            space: spl_token_1.Token.ACCOUNT_SIZE,
                                            lamports: 100000 + 0,
                                            programId: spl_token_1.TOKEN_PROGRAM_ID
                                        }),
                                        // init token account
                                        (0, spl_token_2.createInitializeAccountInstruction)(auxAccount.publicKey, new web3_js_1.PublicKey(SOL_MINT), payer.publicKey),]);
                                    signers_1 = [];
                                    return [4 /*yield*/, Promise.all([usdcToSol.data[0]].map(function (route) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, setupTransaction, swapTransaction, cleanupTransaction;
                                            var _this = this;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, getTransaction(route)];
                                                    case 1:
                                                        _a = _b.sent(), setupTransaction = _a.setupTransaction, swapTransaction = _a.swapTransaction, cleanupTransaction = _a.cleanupTransaction;
                                                        return [4 /*yield*/, Promise.all([setupTransaction, swapTransaction, cleanupTransaction]
                                                                .filter(Boolean)
                                                                .map(function (serializedTransaction) { return __awaiter(_this, void 0, void 0, function () {
                                                                var transaction;
                                                                return __generator(this, function (_a) {
                                                                    transaction = web3_js_1.Transaction.from(Buffer.from(serializedTransaction, "base64"));
                                                                    try {
                                                                        instructions_1.push.apply(instructions_1, transaction.instructions);
                                                                        if (transaction.signers) {
                                                                            if (transaction.signers.length > 0) {
                                                                                signers_1.push.apply(signers_1, transaction.signers);
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (err) {
                                                                        console.log(err);
                                                                    }
                                                                    return [2 /*return*/];
                                                                });
                                                            }); }))];
                                                    case 2:
                                                        _b.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }))
                                        // get routes based on from Token amount 10 USDC -> ? PRISM
                                    ];
                                case 8:
                                    _k.sent();
                                    return [4 /*yield*/, prism.generateSwapTransactions(routes[0])];
                                case 9:
                                    swapTransaction = _k.sent();
                                    //console.log(swapTransaction)
                                    return [4 /*yield*/, Promise.all([swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
                                            .filter(Boolean)
                                            .map(function (serializedTransaction) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                instructions_1.push.apply(instructions_1, serializedTransaction.instructions);
                                                return [2 /*return*/];
                                            });
                                        }); }))];
                                case 10:
                                    //console.log(swapTransaction)
                                    _k.sent();
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 11:
                                    blockhash = _k.sent();
                                    instructions_1.push((0, solend_sdk_1.flashRepayReserveLiquidityInstruction)(initial, 0, tokenAccount, new web3_js_1.PublicKey(reserve.config.liquidityAddress), new web3_js_1.PublicKey(reserve.config.liquidityFeeReceiverAddress), tokenAccount, new web3_js_1.PublicKey(reserve.config.address), new web3_js_1.PublicKey(market.config.address), delegate.publicKey, solend_sdk_1.SOLEND_PRODUCTION_PROGRAM_ID));
                                    instructions_1.push((0, spl_token_3.createCloseAccountInstruction)(spl_token_1.TOKEN_PROGRAM_ID, // fixed
                                    auxAccount.publicKey, // to be closed token account
                                    payer.publicKey, // rent's destination
                                    payer.publicKey, // token account authority
                                    [] // multisig
                                    ));
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 12:
                                    blockhash = _k.sent();
                                    messageV0 = new web3_js_1.TransactionMessage({
                                        payerKey: wallet.publicKey,
                                        recentBlockhash: blockhash,
                                        instructions: instructions_1
                                    }).compileToV0Message();
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 13:
                                    blockhash = _k.sent();
                                    aaa = 0;
                                    ss = [];
                                    for (_d = 0, _e = messageV0.staticAccountKeys; _d < _e.length; _d++) {
                                        bca = _e[_d];
                                        if (aaa < messageV0.staticAccountKeys.length / 3) {
                                            aaa++;
                                            if (!somestuff[USDC_MINT + " <-> " + SOL_MINT].includes(bca)) {
                                                somestuff[USDC_MINT + " <-> " + SOL_MINT].push(bca);
                                                ss.push(bca);
                                                fs_1["default"].writeFileSync('./somestuff.json', JSON.stringify(somestuff));
                                            }
                                        }
                                    }
                                    extendInstruction = web3_js_1.AddressLookupTableProgram.extendLookupTable({
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss
                                    });
                                    ss = [];
                                    aaa = 0;
                                    for (_f = 0, _g = messageV0.staticAccountKeys; _f < _g.length; _f++) {
                                        bca = _g[_f];
                                        aaa++;
                                        if (aaa < messageV0.staticAccountKeys.length / 3 * 2 && (aaa >= messageV0.staticAccountKeys.length / 3)) {
                                            if (!somestuff[USDC_MINT + " <-> " + SOL_MINT].includes(bca)) {
                                                somestuff[USDC_MINT + " <-> " + SOL_MINT].push(bca);
                                                ss.push(bca);
                                            }
                                        }
                                    }
                                    extendInstruction2 = web3_js_1.AddressLookupTableProgram.extendLookupTable({
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss
                                    });
                                    aaa = 0;
                                    for (_h = 0, _j = messageV0.staticAccountKeys; _h < _j.length; _h++) {
                                        bca = _j[_h];
                                        aaa++;
                                        if (aaa >= messageV0.staticAccountKeys.length / 3 * 2) {
                                            if (!somestuff[USDC_MINT + " <-> " + SOL_MINT].includes(bca)) {
                                                somestuff[USDC_MINT + " <-> " + SOL_MINT].push(bca);
                                                ss.push(bca);
                                            }
                                        }
                                    }
                                    extendInstruction3 = web3_js_1.AddressLookupTableProgram.extendLookupTable({
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss
                                    });
                                    ix2 = [lookupTableInst, extendInstruction, extendInstruction2, extendInstruction3];
                                    tx2 = new web3_js_1.Transaction();
                                    tx2.add(ix2[0]);
                                    console.log(1);
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 14:
                                    blockhash = _k.sent();
                                    tx2.recentBlockhash = blockhash;
                                    tx2.sign(payer);
                                    if (!!ttt) return [3 /*break*/, 18];
                                    _k.label = 15;
                                case 15:
                                    _k.trys.push([15, 17, , 18]);
                                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx2, [payer], { skipPreflight: true })];
                                case 16:
                                    _k.sent();
                                    return [3 /*break*/, 18];
                                case 17:
                                    err_1 = _k.sent();
                                    return [3 /*break*/, 18];
                                case 18:
                                    tx2 = new web3_js_1.Transaction();
                                    tx2.add(ix2[1]);
                                    console.log(1);
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 19:
                                    blockhash = _k.sent();
                                    tx2.recentBlockhash = blockhash;
                                    tx2.sign(payer);
                                    if (!!ttt) return [3 /*break*/, 23];
                                    _k.label = 20;
                                case 20:
                                    _k.trys.push([20, 22, , 23]);
                                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx2, [payer], { skipPreflight: true })];
                                case 21:
                                    _k.sent();
                                    return [3 /*break*/, 23];
                                case 22:
                                    err_2 = _k.sent();
                                    return [3 /*break*/, 23];
                                case 23:
                                    tx2 = new web3_js_1.Transaction();
                                    tx2.add(ix2[2]);
                                    console.log(1);
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 24:
                                    blockhash = _k.sent();
                                    tx2.recentBlockhash = blockhash;
                                    tx2.sign(payer);
                                    if (!!ttt) return [3 /*break*/, 28];
                                    _k.label = 25;
                                case 25:
                                    _k.trys.push([25, 27, , 28]);
                                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx2, [payer], { skipPreflight: true })];
                                case 26:
                                    _k.sent();
                                    return [3 /*break*/, 28];
                                case 27:
                                    err_3 = _k.sent();
                                    return [3 /*break*/, 28];
                                case 28:
                                    tx2 = new web3_js_1.Transaction();
                                    tx2.add(ix2[3]);
                                    console.log(1);
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 29:
                                    blockhash = _k.sent();
                                    tx2.recentBlockhash = blockhash;
                                    tx2.sign(payer);
                                    if (!!ttt) return [3 /*break*/, 33];
                                    _k.label = 30;
                                case 30:
                                    _k.trys.push([30, 32, , 33]);
                                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx2, [payer], { skipPreflight: true })];
                                case 31:
                                    _k.sent();
                                    return [3 /*break*/, 33];
                                case 32:
                                    err_4 = _k.sent();
                                    return [3 /*break*/, 33];
                                case 33:
                                    console.log(2);
                                    return [4 /*yield*/, connection
                                            .getAddressLookupTable(lookupTableAddress)
                                            .then(function (res) { return res.value; })];
                                case 34:
                                    lookupTableAccount = _k.sent();
                                    console.log(lookupTableAccount);
                                    return [4 /*yield*/, connection
                                            .getLatestBlockhash()
                                            .then(function (res) { return res.blockhash; })];
                                case 35:
                                    blockhash = _k.sent();
                                    messageV00 = new web3_js_1.TransactionMessage({
                                        payerKey: wallet.publicKey,
                                        recentBlockhash: blockhash,
                                        instructions: instructions_1
                                    }).compileToV0Message([lookupTableAccount]);
                                    transaction = new web3_js_1.VersionedTransaction(messageV00);
                                    // sign your transaction with the required `Signers`
                                    return [4 /*yield*/, transaction.sign([payer, delegate, auxAccount])];
                                case 36:
                                    // sign your transaction with the required `Signers`
                                    _k.sent();
                                    console.log(transaction);
                                    _k.label = 37;
                                case 37:
                                    _k.trys.push([37, 39, , 40]);
                                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction)];
                                case 38:
                                    _k.sent();
                                    return [3 /*break*/, 40];
                                case 39:
                                    err_5 = _k.sent();
                                    console.log(err_5);
                                    return [3 /*break*/, 40];
                                case 40: return [3 /*break*/, 42];
                                case 41:
                                    err_6 = _k.sent();
                                    console.log(err_6);
                                    return [3 /*break*/, 42];
                                case 42: return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, mints_1 = mints;
                    _b.label = 4;
                case 4:
                    if (!(_a < mints_1.length)) return [3 /*break*/, 7];
                    SOL_MINT = mints_1[_a];
                    return [5 /*yield**/, _loop_1()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
});
