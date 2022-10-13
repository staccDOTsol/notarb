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
exports.loadAldrin = void 0;
const sdk_1 = require("@orca-so/sdk");
const getMultInfo_1 = require("../../utils/getMultInfo");
function loadAldrin(liquidity, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let accounts = [];
        for (let i = 0; i < liquidity.length; i++) {
            accounts.push(liquidity[i].baseTokenVault);
            accounts.push(liquidity[i].quoteTokenVault);
        }
        let infos = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, accounts);
        let results = [];
        for (let i = 0; i < 2 * liquidity.length; i++) {
            let accountInfo = (0, sdk_1.deserializeAccount)(infos[i].data);
            results.push({
                mint: accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.mint,
                owner: accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.owner,
                amount: accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.amount,
                delegateOption: accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.delegatedAmount,
                delegate: accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.delegate,
            });
        }
        let aldrinPools = {};
        for (let i = 0; i < liquidity.length; i++)
            aldrinPools[liquidity[i].poolPublicKey.toString()] = Object.assign(Object.assign({}, liquidity[i]), { baseVaultInfo: results[i * 2], quoteVaultInfo: results[i * 2 + 1] });
        return aldrinPools;
    });
}
exports.loadAldrin = loadAldrin;
