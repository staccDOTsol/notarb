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
exports.loadGooseFx = void 0;
// import { Swap } from "goosefx-ssl-sdk";
function loadGooseFx(liquidity, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
exports.loadGooseFx = loadGooseFx;
// export async function loadGooseFx(liquidity: any, connection: Connection) {
//     if (liquidity.length == 0)
//         return {};
//     let gooseFxPools: any = {};
//     let accounts: any = [];
//     let quotersUn: any = [];
//     let swap = new Swap(connection);
//     for (let i=0; i<liquidity.length; i++) {
//         let pool = liquidity[i];
//         quotersUn.push(
//             swap.getQuoter(
//                 pool.mints[0],
//                 pool.mints[1],
//             )
//         );
//         quotersUn.push(
//             swap.getQuoter(
//                 pool.mints[1],
//                 pool.mints[0],
//             )
//         )
//     }
//     quotersUn = await Promise.all(quotersUn);
//     let quoters: any = [];
//     for(let i=0; i<quotersUn.length; i++){
//         quoters.push(quotersUn[i].prepare());
//     }
//     await Promise.all(quoters);
//     let ind = 0;
//     for (let i=0; i<liquidity.length; i++) {
//         let pool = liquidity[i];
//         gooseFxPools[pool.swapAccount] = {
//             ...pool,
//             quoter0: quotersUn[2 * i],
//             quoter1: quotersUn[2 * i + 1],
//             mintA: pool.mints[0].toBase58(),
//             mintB: pool.mints[1].toBase58(),
//         }
//         ind = ind + 1;
//     }
//     return gooseFxPools;
// }
