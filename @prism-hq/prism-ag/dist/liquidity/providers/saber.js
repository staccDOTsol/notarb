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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaberPools = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../../types/types");
function getSaberPools(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let swaps = (yield axios_1.default.get(types_1.SABER_SWAPS).catch(() => { return { data: [] }; })).data;
        let pools = {};
        for (let i = 0; i < swaps.length; i++) {
            let swap = Object.assign(Object.assign({}, swaps[i]), { provider: "saber" });
            let coinMint = swap.underlyingTokens[0];
            let pcMint = swap.underlyingTokens[1];
            (pools[coinMint] || (pools[coinMint] = [])).push(Object.assign(Object.assign({}, swap), { other: pcMint }));
            (pools[pcMint] || (pools[pcMint] = [])).push(Object.assign(Object.assign({}, swap), { other: coinMint }));
        }
        return pools;
    });
}
exports.getSaberPools = getSaberPools;
