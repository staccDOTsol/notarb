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
exports.getGooseFxPools = void 0;
// import { PAIR_LAYOUT } from "goosefx-ssl-sdk";
function getGooseFxPools(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
exports.getGooseFxPools = getGooseFxPools;
// export async function getGooseFxPools(connection: Connection) {
//     let programAccounts = await getFilteredProgramAccounts(
//         connection,
//         new PublicKey(GOOSEFX_PROGRAM),
//         [{dataSize: 1536}]
//     );
//     let pools: any = {};
//     for (let i=0; i<programAccounts.length; i++) {
//         let decoded = PAIR_LAYOUT.decode(programAccounts[i].accountInfo.data);
//         let pool = {...decoded, swapAccount: programAccounts[i].publicKey.toBase58(), provider: "gooseFx"}
//         if(pool.mints.length != 2)continue;
//         let coinMint = pool.mints[0].toBase58();
//         let pcMint = pool.mints[1].toBase58();
//         (pools[coinMint] || (pools[coinMint] = [])).push({...pool, other:pcMint});
//         (pools[pcMint] || (pools[pcMint] = [])).push({...pool, other:coinMint});
//     }
//     return pools;
// }
