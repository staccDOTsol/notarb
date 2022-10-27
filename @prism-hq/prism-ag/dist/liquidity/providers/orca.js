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
exports.getOrcaPools = void 0;
const sdk_1 = require("@orca-so/sdk");
function getOrcaPools(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        let orca = (0, sdk_1.getOrca)(connection);
        let pools = {};
        for (let [_, poolId] of Object.entries(sdk_1.OrcaPoolConfig)) {
            let pool = orca.getPool(poolId);
            let coinMint = pool.getTokenA().mint.toBase58();
            let pcMint = pool.getTokenB().mint.toBase58();
            (pools[coinMint] || (pools[coinMint] = []))
                .push({ pool: pool, other: pcMint, provider: "orca" });
            (pools[pcMint] || (pools[pcMint] = []))
                .push({ pool: pool, other: coinMint, provider: "orca" });
        }
        return pools;
    });
}
exports.getOrcaPools = getOrcaPools;
