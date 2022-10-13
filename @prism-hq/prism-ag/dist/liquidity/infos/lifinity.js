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
exports.loadLifinity = void 0;
const sdk_1 = require("@lifinity/sdk");
const web3_js_1 = require("@solana/web3.js");
function loadLifinity(liquidity, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let publicKeys = [];
        let allPublicKeys = [];
        for (let i = 0; i < liquidity.length; i++) {
            publicKeys.push([]);
            publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].amm));
            publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].poolCoinTokenAccount));
            publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].poolPcTokenAccount));
            publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].configAccount));
            publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].pythAccount));
            if (liquidity[i].pythAccount !== liquidity[i].pythPcAccount)
                publicKeys[i].push(new web3_js_1.PublicKey(liquidity[i].pythPcAccount));
            allPublicKeys.push(...publicKeys[i]);
        }
        let multipleInfo = yield (0, sdk_1.getMultipleAccounts)(connection, allPublicKeys);
        let slot = yield connection.getSlot();
        let lifinitySwaps = {};
        let accountsParsed = 0;
        for (let i = 0; i < liquidity.length; i++) {
            let parsedData = (0, sdk_1.getParsedData)(multipleInfo.slice(accountsParsed, accountsParsed + publicKeys[i].length), liquidity[i]);
            accountsParsed += publicKeys[i].length;
            lifinitySwaps[liquidity[i].amm] = Object.assign(Object.assign({}, liquidity[i]), { parsedData: parsedData, slot: slot });
        }
        return lifinitySwaps;
    });
}
exports.loadLifinity = loadLifinity;
