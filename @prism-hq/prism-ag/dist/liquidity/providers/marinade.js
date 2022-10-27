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
exports.getMarinadePools = void 0;
const types_1 = require("../../types/types");
const marinade_1 = require("../infos/marinade");
function getMarinadePools(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let pools = {};
        pools[marinade_1.SOL_MINT] = [{ other: types_1.MSOL_MINT, provider: "marinade" }];
        pools[types_1.MSOL_MINT] = [{ other: marinade_1.SOL_MINT, provider: "marinade" }];
        return pools;
    });
}
exports.getMarinadePools = getMarinadePools;
