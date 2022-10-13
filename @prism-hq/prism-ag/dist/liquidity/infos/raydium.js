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
exports.loadRaydium = exports.fetchItemLiquidity = exports.getAddressForWhat = void 0;
const sdk_1 = require("@orca-so/sdk");
const serum_1 = require("@project-serum/serum");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("../../types/types");
const safeMath_1 = require("../../utils/safeMath");
const utils_1 = require("../../utils/utils");
const common_1 = require("./common");
function getAddressForWhat(address, pools) {
    for (const pool of pools) {
        for (const [key, value] of Object.entries(pool)) {
            if (key === 'lp') {
                //@ts-ignore  
                if (value.mintAddress === address) {
                    return { key: 'lpMintAddress', ammId: pool.ammId, version: pool.version };
                }
            }
            else if (value === address) {
                return { key, ammId: pool.ammId, version: pool.version };
            }
        }
    }
    return {};
}
exports.getAddressForWhat = getAddressForWhat;
function fetchItemLiquidity(ammInfo) {
    if (ammInfo.pcMintAddress.toString() === ammInfo.serumMarket.toString() ||
        ammInfo.lpMintAddress.toString() === '11111111111111111111111111111111')
        return null;
    let coin = {
        mintAddress: ammInfo.coinMintAddress.toString(),
        decimals: (0, utils_1.getBigNumber)(ammInfo.coinDecimals),
    };
    let pc = {
        mintAddress: ammInfo.pcMintAddress.toString(),
        decimals: (0, utils_1.getBigNumber)(ammInfo.pcDecimals),
    };
    const lp = {
        coin,
        pc,
        mintAddress: ammInfo.lpMintAddress.toString(),
    };
    const itemLiquidity = {
        coin,
        pc,
        lp,
        version: 4,
        programId: types_1.LIQUIDITY_POOL_PROGRAM_ID_V4,
        ammId: ammInfo.ammId.toString(),
        ammOpenOrders: ammInfo.ammOpenOrders.toString(),
        ammTargetOrders: ammInfo.ammTargetOrders.toString(),
        ammQuantities: "So11111111111111111111111111111111111111112",
        poolCoinTokenAccount: ammInfo.poolCoinTokenAccount.toString(),
        poolPcTokenAccount: ammInfo.poolPcTokenAccount.toString(),
        poolWithdrawQueue: ammInfo.poolWithdrawQueue.toString(),
        poolTempLpTokenAccount: ammInfo.poolTempLpTokenAccount.toString(),
        serumProgramId: types_1.SERUM_PROGRAM_ID_V3,
        serumMarket: ammInfo.serumMarket.toString(),
    };
    return itemLiquidity;
}
exports.fetchItemLiquidity = fetchItemLiquidity;
function loadRaydium(liquidity, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let amms = [];
        for (let i = 0; i < liquidity.length; i++)
            amms.push(liquidity[i]);
        const { publicKey } = yield (0, utils_1.createAmmAuthority)(new web3_js_1.PublicKey(types_1.LIQUIDITY_POOL_PROGRAM_ID_V4));
        let pools = [];
        for (let i = 0; i < amms.length; i += 1)
            pools.push(Object.assign(Object.assign({}, fetchItemLiquidity(amms[i])), { ammAuthority: publicKey.toBase58() }));
        const raydiumPools = {};
        const publicKeys = [];
        const frozen = {};
        pools.forEach((pool) => {
            const { poolCoinTokenAccount, poolPcTokenAccount, ammOpenOrders, ammId, coin, pc, lp } = pool;
            publicKeys.push(new web3_js_1.PublicKey(poolCoinTokenAccount), new web3_js_1.PublicKey(poolPcTokenAccount), new web3_js_1.PublicKey(ammOpenOrders), new web3_js_1.PublicKey(ammId), new web3_js_1.PublicKey(lp.mintAddress));
            const poolInfo = pool;
            poolInfo.coin.balance = new safeMath_1.TokenAmount(0, coin.decimals);
            poolInfo.pc.balance = new safeMath_1.TokenAmount(0, pc.decimals);
            raydiumPools[ammId] = poolInfo;
        });
        const multipleInfo = yield (0, common_1.getMultipleAccounts)(connection, publicKeys, "processed");
        multipleInfo.forEach((info) => {
            if (info) {
                const address = info.publicKey.toBase58();
                const data = Buffer.from(info.account.data);
                const { key, ammId, version } = getAddressForWhat(address, pools);
                if (key && ammId && frozen[ammId] != 1) {
                    let poolInfo = raydiumPools[ammId];
                    switch (key) {
                        case 'poolCoinTokenAccount': {
                            const parsed = (0, sdk_1.deserializeAccount)(info.account.data);
                            if (parsed === null || parsed === void 0 ? void 0 : parsed.isFrozen) {
                                poolInfo = null;
                                frozen[ammId] = 1;
                                break;
                            }
                            // quick fix: Number can only safely store up to 53 bits
                            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus((0, utils_1.getBigNumber)(parsed === null || parsed === void 0 ? void 0 : parsed.amount));
                            break;
                        }
                        case 'poolPcTokenAccount': {
                            const parsed = (0, sdk_1.deserializeAccount)(info.account.data);
                            if (parsed === null || parsed === void 0 ? void 0 : parsed.isFrozen) {
                                poolInfo = null;
                                frozen[ammId] = 1;
                                break;
                            }
                            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus((0, utils_1.getBigNumber)(parsed === null || parsed === void 0 ? void 0 : parsed.amount));
                            break;
                        }
                        case 'ammOpenOrders': {
                            const OPEN_ORDERS_LAYOUT = serum_1.OpenOrders.getLayout(new web3_js_1.PublicKey(poolInfo.serumProgramId));
                            const parsed = OPEN_ORDERS_LAYOUT.decode(data);
                            const { baseTokenTotal, quoteTokenTotal } = parsed;
                            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus((0, utils_1.getBigNumber)(baseTokenTotal));
                            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus((0, utils_1.getBigNumber)(quoteTokenTotal));
                            break;
                        }
                        case 'ammId': {
                            let parsed;
                            if (version === 2) {
                                parsed = types_1.AMM_INFO_LAYOUT.decode(data);
                            }
                            else if (version === 3) {
                                parsed = types_1.AMM_INFO_LAYOUT_V3.decode(data);
                            }
                            else {
                                if (version === 5) {
                                    parsed = types_1.AMM_INFO_LAYOUT_STABLE.decode(data);
                                    poolInfo.currentK = (0, utils_1.getBigNumber)(parsed.currentK);
                                }
                                else {
                                    parsed = types_1.AMM_INFO_LAYOUT_V4.decode(data);
                                    if ((0, utils_1.getBigNumber)(parsed.status) === 7) {
                                        poolInfo.poolOpenTime = (0, utils_1.getBigNumber)(parsed.poolOpenTime);
                                    }
                                }
                                const { swapFeeNumerator, swapFeeDenominator } = parsed;
                                poolInfo.fees = {
                                    swapFeeNumerator: (0, utils_1.getBigNumber)(swapFeeNumerator),
                                    swapFeeDenominator: (0, utils_1.getBigNumber)(swapFeeDenominator)
                                };
                            }
                            const { status, needTakePnlCoin, needTakePnlPc } = parsed;
                            poolInfo.status = (0, utils_1.getBigNumber)(status);
                            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.minus((0, utils_1.getBigNumber)(needTakePnlCoin));
                            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.minus((0, utils_1.getBigNumber)(needTakePnlPc));
                            break;
                        }
                        // getLpSupply
                        case 'lpMintAddress': {
                            const parsed = types_1.MINT_LAYOUT.decode(data);
                            poolInfo.lp.totalSupply = new safeMath_1.TokenAmount((0, utils_1.getBigNumber)(parsed.supply), poolInfo.lp.decimals);
                            break;
                        }
                    }
                }
            }
        });
        return raydiumPools;
    });
}
exports.loadRaydium = loadRaydium;
