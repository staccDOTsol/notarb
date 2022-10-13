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
exports.loadPenguin = void 0;
const sdk_1 = require("@orca-so/sdk");
const web3_js_1 = require("@solana/web3.js");
const getMultInfo_1 = require("../../utils/getMultInfo");
function loadPenguin(liquidity, connection) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let penguinPools = {};
        let promises = [];
        let accounts = [];
        for (let i = 0; i < liquidity.length; i++) {
            let pool = liquidity[i];
            const tokenA = new web3_js_1.PublicKey(pool.tokenAccountA);
            const tokenB = new web3_js_1.PublicKey(pool.tokenAccountB);
            accounts.push(tokenA);
            accounts.push(tokenB);
        }
        let results = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, accounts);
        let ind = 0;
        for (let i = 0; i < liquidity.length; i++) {
            let pool = liquidity[i];
            const tokenA = new web3_js_1.PublicKey(pool.tokenAccountA);
            const tokenB = new web3_js_1.PublicKey(pool.tokenAccountB);
            let accountInfos = [results[2 * ind], results[2 * ind + 1]];
            let aTokenAmount = (_a = (0, sdk_1.deserializeAccount)(accountInfos[0].data)) === null || _a === void 0 ? void 0 : _a.amount;
            let bTokenAmount = (_b = (0, sdk_1.deserializeAccount)(accountInfos[1].data)) === null || _b === void 0 ? void 0 : _b.amount;
            aTokenAmount = parseFloat(aTokenAmount === null || aTokenAmount === void 0 ? void 0 : aTokenAmount.toString());
            bTokenAmount = parseFloat(bTokenAmount === null || bTokenAmount === void 0 ? void 0 : bTokenAmount.toString());
            penguinPools[pool.swapAccount] = Object.assign(Object.assign({}, pool), { tokenA: tokenA, tokenB: tokenB, aTokenAmount: aTokenAmount, bTokenAmount: bTokenAmount });
            ind = ind + 1;
        }
        return penguinPools;
    });
}
exports.loadPenguin = loadPenguin;
