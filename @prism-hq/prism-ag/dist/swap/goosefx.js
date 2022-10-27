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
exports.gooseFxSwap = void 0;
// import { SSL } from "goosefx-ssl-sdk";
// import {findAssociatedTokenAddress} from "goosefx-ssl-sdk/dist/public/utils"
// import { swap } from "goosefx-ssl-sdk/dist/wasm/gfx_ssl_wasm";
function gooseFxSwap(user, program, route, fromTokenAccount, toTokenAccount, fees, hostFees, preTransaction, useT = null, disableFees = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return null;
    });
}
exports.gooseFxSwap = gooseFxSwap;
// export async function gooseFxSwap(
//     user: PublicKey,
//     program: Program<PrismAg>,
//     route: any,
//     fromTokenAccount: PublicKey,
//     toTokenAccount: PublicKey,
//     fees: any,
//     hostFees: number,
//     preTransaction: Transaction,
//     useT: any = null,
//     disableFees: any = false,
// ) {
//     let {fromCoin, toCoin, gooseFxPool} = route.routeData;
//     let amountIn = new BN(Math.floor(route.amountIn * 10 ** fromCoin.decimals));
//     let amountOut = new BN(Math.floor(route.minimumReceived * 10 ** toCoin.decimals));
//     const { oracles, nOracle, feeCollector } = gooseFxPool;
//     const n = Number(nOracle.toString());
//     const remainingAccounts = [];
//     for (const oracle of oracles.slice(0, n)) {
//       for (const elem of oracle.elements.slice(0, Number(oracle.n))) {
//         remainingAccounts.push({
//           isSigner: false,
//           isWritable: false,
//           pubkey: elem.address,
//         });
//       }
//     }
//     let fromToken = SSL.findAddress(new PublicKey(GOOSEFX_CONTROLLER), new PublicKey(fromCoin.mintAddress), new PublicKey(GOOSEFX_PROGRAM));
//     let toToken = SSL.findAddress(new PublicKey(GOOSEFX_CONTROLLER), new PublicKey(toCoin.mintAddress), new PublicKey(GOOSEFX_PROGRAM));
//     return program.instruction.goosefxSwap(
//         amountIn,
//         amountOut,
//         useT ? true : false,
//         new BN(hostFees),
//         {
//             accounts:{
//                 goosefxProgram: new PublicKey(GOOSEFX_PROGRAM),
//                 controller: new PublicKey(GOOSEFX_CONTROLLER),
//                 pair: gooseFxPool.swapAccount,
//                 sslIn: fromToken,
//                 sslOut: toToken,
//                 liabilityVaultIn: findAssociatedTokenAddress(fromToken, new PublicKey(fromCoin.mintAddress)),
//                 liabilityVaultOut: findAssociatedTokenAddress(fromToken, new PublicKey(toCoin.mintAddress)),
//                 swappedLiabilityVaultIn: findAssociatedTokenAddress(toToken, new PublicKey(toCoin.mintAddress)),
//                 swappedLiabilityVaultOut: findAssociatedTokenAddress(toToken, new PublicKey(fromCoin.mintAddress)),
//                 userSourceTokenAccount: fromTokenAccount,
//                 userDestinationTokenAccount: toTokenAccount,
//                 feeCollectorAta: findAssociatedTokenAddress(feeCollector, new PublicKey(fromCoin.mintAddress)),
//                 user: user,
//                 feeCollector: feeCollector,
//                 systemProgram: SystemProgram.programId,
//                 tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
//                 host: fees.host,
//                 feeSweeper: fees.owner,
//                 transitiveState: new PublicKey(TRANSITIVE_STATE),
//             },
//             remainingAccounts: remainingAccounts,
//         }
//     )
// }
