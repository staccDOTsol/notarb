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
exports.getSymmetryFunds = void 0;
const liquidity_sdk_1 = require("@symmetry-hq/liquidity-sdk");
function getSymmetryFunds(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenSwap = yield liquidity_sdk_1.TokenSwap.init(connection);
        const tokenList = yield tokenSwap.getTokenList();
        let pools = {};
        for (let i = 0; i < 1; i++) {
            for (let j = i + 1; j < tokenList.length; j++) {
                let swap = {
                    tokenSwap: tokenSwap,
                    provider: "symmetry",
                };
                let coinMint = tokenList[i].tokenMint;
                let pcMint = tokenList[j].tokenMint;
                (pools[coinMint] || (pools[coinMint] = [])).push(Object.assign(Object.assign({}, swap), { other: pcMint }));
                (pools[pcMint] || (pools[pcMint] = [])).push(Object.assign(Object.assign({}, swap), { other: coinMint }));
            }
        }
        return pools;
    });
}
exports.getSymmetryFunds = getSymmetryFunds;
