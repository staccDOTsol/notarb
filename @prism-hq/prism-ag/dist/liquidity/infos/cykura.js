"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loadCykura = void 0;
const sdk_1 = require("@cykura/sdk");
const web3_js_1 = require("@solana/web3.js");
const getMultInfo_1 = require("../../utils/getMultInfo");
const anchor = __importStar(require("@project-serum/anchor"));
const types_1 = require("../../types/types");
const cykura_1 = require("../providers/cykura");
const nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
const anchor_1 = require("@project-serum/anchor");
const pubkey_1 = require("@project-serum/anchor/dist/cjs/utils/pubkey");
const spl_token_1 = require("@solana/spl-token");
const sdk_2 = require("@orca-so/sdk");
function loadCykura(liquidity, connection) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (liquidity.length == 0)
            return {};
        let provider = new anchor.AnchorProvider(connection, new nodewallet_1.default(web3_js_1.Keypair.generate()), {
            skipPreflight: false,
            preflightCommitment: "recent",
            commitment: "recent",
        });
        const cyclosCore = new anchor_1.Program(sdk_1.IDL, types_1.CYKURA_PROGRAM_ID, provider);
        let cykuraPools = {};
        let waitLoad = [];
        let tickProviders = [];
        let pools = [];
        for (let i = 0; i < liquidity.length; i++) {
            let pool = liquidity[i];
            pools.push(new web3_js_1.PublicKey(pool.poolAccount));
        }
        let res = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, pools);
        for (let i = 0; i < liquidity.length; i++) {
            let decoded = types_1.CYKURA_LAYOUT.decode(res[i].data);
            let pool = Object.assign(Object.assign({}, decoded), { poolAccount: pools[i].toBase58(), provider: "cykura" });
            pools[i] = pool;
            let tickProvider = new cykura_1.SolanaTickDataProvider(cyclosCore, {
                token0: pool.mintA,
                token1: pool.mintB,
                fee: pool.fee,
            });
            tickProviders.push(tickProvider);
            waitLoad.push(tickProviders[i].eagerLoadCache(pool.tick, sdk_1.TICK_SPACINGS[pool.fee]));
        }
        yield Promise.all(waitLoad);
        let accounts = [];
        for (let i = 0; i < liquidity.length; i++) {
            let pool = pools[i];
            let vault0 = (0, pubkey_1.findProgramAddressSync)([new web3_js_1.PublicKey(pool.poolAccount).toBuffer(), new web3_js_1.PublicKey(types_1.TOKEN_PROGRAM_ID).toBuffer(), pool.mintA.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)[0];
            let vault1 = (0, pubkey_1.findProgramAddressSync)([new web3_js_1.PublicKey(pool.poolAccount).toBuffer(), new web3_js_1.PublicKey(types_1.TOKEN_PROGRAM_ID).toBuffer(), pool.mintB.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)[0];
            accounts.push(vault0);
            accounts.push(vault1);
        }
        let result = yield (0, getMultInfo_1.customGetMultipleAccountInfos)(connection, accounts);
        for (let i = 0; i < liquidity.length; i++) {
            let pool = pools[i];
            let vault0 = (0, pubkey_1.findProgramAddressSync)([new web3_js_1.PublicKey(pool.poolAccount).toBuffer(), new web3_js_1.PublicKey(types_1.TOKEN_PROGRAM_ID).toBuffer(), pool.mintA.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)[0];
            let vault1 = (0, pubkey_1.findProgramAddressSync)([new web3_js_1.PublicKey(pool.poolAccount).toBuffer(), new web3_js_1.PublicKey(types_1.TOKEN_PROGRAM_ID).toBuffer(), pool.mintB.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)[0];
            if (result[2 * i] == null || result[2 * i + 1] == null)
                continue;
            cykuraPools[pool.poolAccount] = Object.assign(Object.assign({}, pool), { tickProvider: tickProviders[i], vault0: vault0, vault1: vault1, tokenAmount0: (_a = (0, sdk_2.deserializeAccount)(result[2 * i].data)) === null || _a === void 0 ? void 0 : _a.amount, tokenAmount1: (_b = (0, sdk_2.deserializeAccount)(result[2 * i + 1].data)) === null || _b === void 0 ? void 0 : _b.amount, cyclosCore: cyclosCore });
        }
        return cykuraPools;
    });
}
exports.loadCykura = loadCykura;
