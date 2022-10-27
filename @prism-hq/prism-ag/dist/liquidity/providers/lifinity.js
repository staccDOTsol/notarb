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
exports.getLifinityPools = void 0;
const sdk_1 = require("@lifinity/sdk");
function getLifinityPools(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const lifinityPools = (0, sdk_1.getPoolList)();
        let pools = {};
        for (const [_, lifinityPool] of Object.entries(lifinityPools)) {
            let pool = Object.assign(Object.assign({}, lifinityPool), { provider: "lifinity" });
            let coinMint = pool.poolCoinMint;
            let pcMint = pool.poolPcMint;
            (pools[coinMint] || (pools[coinMint] = [])).push(Object.assign(Object.assign({}, pool), { other: pcMint }));
            (pools[pcMint] || (pools[pcMint] = [])).push(Object.assign(Object.assign({}, pool), { other: coinMint }));
        }
        return pools;
    });
}
exports.getLifinityPools = getLifinityPools;
