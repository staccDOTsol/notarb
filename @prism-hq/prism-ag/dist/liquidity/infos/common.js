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
exports.getMultipleAccounts = void 0;
function getMultipleAccounts(connection, publicKeys, commitment) {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = [];
        let tempKeys = [];
        publicKeys.forEach((k) => {
            if (tempKeys.length >= 100) {
                keys.push(tempKeys);
                tempKeys = [];
            }
            tempKeys.push(k);
        });
        if (tempKeys.length > 0) {
            keys.push(tempKeys);
        }
        const accounts = [];
        const resArray = {};
        let tempRes = [];
        for (let i = 0; i < keys.length; i++) {
            tempRes.push(connection.getMultipleAccountsInfo(keys[i], commitment));
        }
        let res = yield Promise.all(tempRes);
        for (let i = 0; i < keys.length; i++) {
            resArray[i] = res[i];
        }
        Object.keys(resArray)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .forEach((itemIndex) => {
            const res = resArray[parseInt(itemIndex)];
            for (const account of res) {
                accounts.push(account);
            }
        });
        return accounts.map((account, idx) => {
            if (account === null) {
                return null;
            }
            return {
                publicKey: publicKeys[idx],
                account
            };
        });
    });
}
exports.getMultipleAccounts = getMultipleAccounts;
