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
exports.loadMarinade = exports.MSOL_MINT_AUTHORITY = exports.RESERVE_PDA = exports.LIQ_POOL_MSOL_LEG_AUTHORITY = exports.LIQ_POOL_MSOL_LEG = exports.LIQ_POOL_SOL_LEG_PDA = exports.MSOL_MINT = exports.MARINADE_STATE = exports.MARINADE_PROGRAM_ID = exports.SOL_MINT = void 0;
const sdk_1 = require("@orca-so/sdk");
const anchor_1 = require("@project-serum/anchor");
const nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
const web3_js_1 = require("@solana/web3.js");
const marinadeIDL_1 = require("./marinadeIDL");
exports.SOL_MINT = 'So11111111111111111111111111111111111111112';
exports.MARINADE_PROGRAM_ID = 'MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD';
exports.MARINADE_STATE = '8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC';
exports.MSOL_MINT = 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So';
exports.LIQ_POOL_SOL_LEG_PDA = 'UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q';
exports.LIQ_POOL_MSOL_LEG = '7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE';
exports.LIQ_POOL_MSOL_LEG_AUTHORITY = 'EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL';
exports.RESERVE_PDA = 'Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN';
exports.MSOL_MINT_AUTHORITY = '3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM';
function loadMarinade(liquidity, connection) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let marinadePools = {};
        let liqPoolSolLegPdaAmount = yield connection.getBalance(new web3_js_1.PublicKey(exports.LIQ_POOL_SOL_LEG_PDA));
        let msolLegInfo = yield connection.getAccountInfo(new web3_js_1.PublicKey(exports.LIQ_POOL_MSOL_LEG));
        let liqPoolMsolLegAmount = (_a = (0, sdk_1.deserializeAccount)(msolLegInfo === null || msolLegInfo === void 0 ? void 0 : msolLegInfo.data)) === null || _a === void 0 ? void 0 : _a.amount;
        let provider = new anchor_1.AnchorProvider(connection, new nodewallet_1.default(web3_js_1.Keypair.generate()), {
            skipPreflight: false,
            preflightCommitment: "recent",
            commitment: "recent",
        });
        let marinadeProgram = new anchor_1.Program(marinadeIDL_1.MarinadeIDL, exports.MARINADE_PROGRAM_ID, provider);
        let state = yield marinadeProgram.account.state.fetch(new web3_js_1.PublicKey(exports.MARINADE_STATE));
        let stakePool = {
            provider: "marinade",
            state: state,
            liqPoolMsolLegAmount: liqPoolMsolLegAmount,
            liqPoolSolLegPdaAmount: liqPoolSolLegPdaAmount,
            tokenA: new web3_js_1.PublicKey(exports.SOL_MINT),
            tokenB: new web3_js_1.PublicKey(exports.MSOL_MINT),
        };
        marinadePools["marinade"] = stakePool;
        return marinadePools;
    });
}
exports.loadMarinade = loadMarinade;
