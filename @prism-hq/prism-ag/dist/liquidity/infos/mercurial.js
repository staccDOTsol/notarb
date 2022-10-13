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
exports.loadMercurial = void 0;
const sdk_1 = require("@orca-so/sdk");
const getMultInfo_1 = require("../../utils/getMultInfo");
function loadMercurial(liquidity, connection) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let mercurialPools = {};
        let accounts = [];
        for (let i = 0; i < liquidity.length; i++) {
            let pool = liquidity[i];
            for (let j = 0; j < pool.tokenAccountsLength; j++) {
                accounts.push(pool.tokenAccounts[j]);
            }
        }
        let results = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, accounts);
        let ind = 0;
        for (let i = 0; i < liquidity.length; i++) {
            let pool = liquidity[i];
            pool.tokenAmounts = [];
            for (let j = 0; j < pool.tokenAccountsLength; j++) {
                pool.tokenAmounts.push((_a = (0, sdk_1.deserializeAccount)(results[ind].data)) === null || _a === void 0 ? void 0 : _a.amount);
                ind++;
            }
            mercurialPools[pool.swapAccount] = pool;
        }
        return mercurialPools;
    });
}
exports.loadMercurial = loadMercurial;
