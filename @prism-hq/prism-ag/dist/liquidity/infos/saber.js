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
exports.loadSaber = exports.findSwapAuthorityKey = exports.loadSingle = void 0;
const stableswap_sdk_1 = require("@saberhq/stableswap-sdk");
const web3_js_1 = require("@solana/web3.js");
const common_1 = require("./common");
const getMultInfo_1 = require("../../utils/getMultInfo");
function loadSingle(stableSwap, reserveA, reserveB) {
    let state = stableSwap.state;
    let exchange = (0, stableswap_sdk_1.makeExchange)({
        swapAccount: stableSwap.config.swapAccount,
        lpToken: state.poolTokenMint,
        tokenA: {
            chainId: 101,
            address: state.tokenA.mint.toBase58(),
            name: 'A',
            decimals: 0,
            symbol: 'A'
        },
        tokenB: {
            chainId: 101,
            address: state.tokenB.mint.toBase58(),
            name: 'B',
            decimals: 0,
            symbol: 'B'
        }
    });
    if (!exchange || !(reserveA === null || reserveA === void 0 ? void 0 : reserveA.account) || !(reserveB === null || reserveB === void 0 ? void 0 : reserveB.account))
        return {};
    let exchangeInfo = (0, stableswap_sdk_1.makeExchangeInfo)({
        //@ts-ignore
        exchange: exchange,
        swap: stableSwap,
        accounts: {
            //@ts-ignore
            reserveA: reserveA.account.data,
            //@ts-ignore
            reserveB: reserveB.account.data,
        }
    });
    return {
        stableSwap: stableSwap,
        reserveA: reserveA,
        reserveB: reserveB,
        exchange: exchange,
        exchangeInfo: exchangeInfo,
    };
}
exports.loadSingle = loadSingle;
function findSwapAuthorityKey(swapAccount) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield web3_js_1.PublicKey.findProgramAddress([swapAccount.toBuffer()], stableswap_sdk_1.SWAP_PROGRAM_ID))[0];
    });
}
exports.findSwapAuthorityKey = findSwapAuthorityKey;
function loadSaber(liquidity, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let saberSwaps = {};
        let stableSwaps = [];
        //@ts-ignore
        let accountDatas = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, liquidity.map(swap => new web3_js_1.PublicKey(swap.addresses.swapAccount)));
        //@ts-ignore
        let authorities = yield Promise.all(liquidity.map(swap => findSwapAuthorityKey(new web3_js_1.PublicKey(swap.addresses.swapAccount))));
        for (let i = 0; i < liquidity.length; i++)
            stableSwaps.push(stableswap_sdk_1.StableSwap.loadWithData(new web3_js_1.PublicKey(liquidity[i].addresses.swapAccount), Buffer.from(accountDatas[i].data), authorities[i]));
        let accounts = [];
        for (let i = 0; i < stableSwaps.length; i++) {
            accounts.push(stableSwaps[i].state.tokenA.reserve);
            accounts.push(stableSwaps[i].state.tokenB.reserve);
        }
        let results = yield (0, common_1.getMultipleAccounts)(connection, accounts);
        for (let i = 0; i < stableSwaps.length; i++) {
            if (stableSwaps[i].state.isPaused == true)
                continue;
            saberSwaps[liquidity[i].addresses.swapAccount] = loadSingle(stableSwaps[i], results[2 * i], results[2 * i + 1]);
        }
        return saberSwaps;
    });
}
exports.loadSaber = loadSaber;
