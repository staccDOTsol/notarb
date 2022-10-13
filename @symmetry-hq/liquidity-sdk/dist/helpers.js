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
exports.findTokenId = exports.fetchTokenInfo = exports.asciiToString = exports.getFunds = exports.getPythPrices = void 0;
const client_1 = require("@pythnetwork/client");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("./types");
function getPythPrices(connection, tokenInfoData) {
    return __awaiter(this, void 0, void 0, function* () {
        let rawAccounts = yield connection.getMultipleAccountsInfo(tokenInfoData.map(x => new web3_js_1.PublicKey(x.pyth)));
        //@ts-ignore
        return rawAccounts.map(x => (0, client_1.parsePriceData)(x.data));
    });
}
exports.getPythPrices = getPythPrices;
function getFunds(connection, program) {
    return __awaiter(this, void 0, void 0, function* () {
        let rawAccounts = yield connection.getProgramAccounts(types_1.FUNDS_PROGRAM_ID, {
            commitment: connection.commitment,
            filters: [
                { dataSize: 10208 },
            ],
            encoding: 'base64'
        });
        return rawAccounts
            .map(x => {
            return {
                pubkey: x.pubkey,
                fund: program.coder.accounts.decode("fundState", x.account.data)
            };
        })
            .filter(fundData => fundData.fund.sellState.toNumber() == 0);
    });
}
exports.getFunds = getFunds;
function asciiToString(coingeckoIdAscii) {
    let coingeckoId = "";
    for (let i = 0; i < coingeckoIdAscii.length; i++)
        if (coingeckoIdAscii[i] != 0)
            coingeckoId += String.fromCharCode(coingeckoIdAscii[i]).toString();
    return coingeckoId;
}
exports.asciiToString = asciiToString;
function fetchTokenInfo(program, tokenInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        let solanaTokenList = [];
        let tokenMap = {};
        for (let i = 0; i < solanaTokenList.length; i++)
            tokenMap[solanaTokenList[i].address] = {
                symbol: solanaTokenList[i].symbol,
                name: solanaTokenList[i].name,
                decimals: solanaTokenList[i].decimals,
            };
        let state = yield program.account.tokenInfo.fetch(tokenInfo);
        let numTokens = state.numTokens.toNumber();
        let tokens = [];
        for (let i = 0; i < numTokens; i++) {
            tokens.push({
                id: i,
                symbol: tokenMap[state.tokenMint[i].toBase58()] ? tokenMap[state.tokenMint[i].toBase58()].symbol : undefined,
                name: tokenMap[state.tokenMint[i].toBase58()] ? tokenMap[state.tokenMint[i].toBase58()].name : undefined,
                mint: state.tokenMint[i].toBase58(),
                pdaAccount: state.pdaTokenAccount[i].toBase58(),
                pyth: state.pyth[i].toBase58(),
                decimals: state.decimals[i],
                //@ts-ignore
                coingeckoId: asciiToString(state.coingeckoIds[i]),
            });
        }
        return tokens;
    });
}
exports.fetchTokenInfo = fetchTokenInfo;
function findTokenId(tokenInfoData, tokenMint) {
    for (let i = 0; i < tokenInfoData.length; i++)
        if (tokenInfoData[i].mint == tokenMint.toBase58())
            return tokenInfoData[i].id;
    return undefined;
}
exports.findTokenId = findTokenId;
