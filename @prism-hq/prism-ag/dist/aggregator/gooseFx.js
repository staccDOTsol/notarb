"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gooseFxRoute = void 0;
// import { SSL } from "goosefx-ssl-sdk";
function gooseFxRoute(fromCoin, toCoin, fromCoinAmount, option, liquidityData, settings) {
    return { amountOut: 0 };
}
exports.gooseFxRoute = gooseFxRoute;
// export function gooseFxRoute(
//     fromCoin: TokenInfo,
//     toCoin: TokenInfo,
//     fromCoinAmount: number,
//     option: any,
//     liquidityData: any,
//     settings: any,
// ) {
//     let gooseFxInfo = liquidityData.gooseFxData[option.swapAccount];
//     let fromToken = SSL.findAddress(new PublicKey(GOOSEFX_CONTROLLER), new PublicKey(fromCoin.mintAddress), new PublicKey(GOOSEFX_PROGRAM));
//     let toToken = SSL.findAddress(new PublicKey(GOOSEFX_CONTROLLER), new PublicKey(toCoin.mintAddress), new PublicKey(GOOSEFX_PROGRAM));
//     let quoter: any;
//     quoter = gooseFxInfo.quoter0;
//     if (fromCoin.mintAddress != gooseFxInfo.mintA) {
//         [fromToken, toToken] = [toToken, fromToken];
//         quoter = gooseFxInfo.quoter1;
//     }
//     let {out: outAmount, impact} = quoter.quote(new BN(fromCoinAmount * 10 ** fromCoin.decimals));
//     let received = parseFloat(outAmount.toString()) / 10 ** toCoin.decimals;
//     let totalFees = (settings.owner.fee + settings.host.fee) / 100;
//     let fees: any = {}
//     fees[toCoin.symbol] = received * totalFees / 100;
//     let amountWithFees = received * (1 - totalFees / 100);
//     return {
//         from: fromCoin.symbol,
//         amountIn: fromCoinAmount,
//         to: toCoin.symbol,
//         amountOut: received,
//         amountWithFees: amountWithFees,
//         minimumReceived: amountWithFees * (1 - settings.slippage / 100),
//         provider: "gooseFx",
//         fees: fees,
//         priceImpact: impact,
//         routeData: {
//             gooseFxPool: {
//                 ...gooseFxInfo,
//                 fromToken: fromToken,
//                 toToken: toToken,
//             },
//             fromCoin: fromCoin,
//             toCoin: toCoin,
//         }
//     }
// }
