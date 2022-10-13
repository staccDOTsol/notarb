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
exports.TokenSwap = void 0;
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("./types");
const fundsIDL_1 = require("./fundsIDL");
const helpers_1 = require("./helpers");
const liquidity_1 = require("./liquidity");
const nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
class TokenSwap {
    constructor(connection, program, tokenInfoData, funds, pythPrices, wallet) {
        this.connection = connection;
        this.program = program;
        this.tokenInfoData = tokenInfoData;
        this.funds = funds;
        this.pythPrices = pythPrices;
        this.wallet = wallet;
    }
    static init(connection, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!wallet)
                wallet = new nodewallet_1.default(web3_js_1.Keypair.generate());
            let provider = new anchor_1.AnchorProvider(connection, wallet, {
                skipPreflight: true,
                preflightCommitment: "recent",
                commitment: "recent",
            });
            let program = new anchor_1.Program(fundsIDL_1.IDL, types_1.FUNDS_PROGRAM_ID, provider);
            let tokenInfoData = yield (0, helpers_1.fetchTokenInfo)(program, types_1.TOKEN_INFO_ADDRESS);
            let funds = yield (0, helpers_1.getFunds)(connection, program);
            let pythPrices = yield (0, helpers_1.getPythPrices)(connection, tokenInfoData);
            return new TokenSwap(connection, program, tokenInfoData, funds, pythPrices, wallet);
        });
    }
    setWallet(wallet) {
        this.wallet = wallet;
        let provider = new anchor_1.AnchorProvider(this.connection, wallet, {
            skipPreflight: true,
            preflightCommitment: "recent",
            commitment: "recent",
        });
        this.program = new anchor_1.Program(fundsIDL_1.IDL, types_1.FUNDS_PROGRAM_ID, provider);
    }
    getTokenList() {
        return this.tokenInfoData.map(x => {
            return {
                tokenId: x.id,
                tokenSymbol: x.symbol,
                tokenMint: x.mint,
            };
        });
    }
    updateLiquiditySources() {
        return __awaiter(this, void 0, void 0, function* () {
            this.funds = yield (0, helpers_1.getFunds)(this.connection, this.program);
            this.pythPrices = yield (0, helpers_1.getPythPrices)(this.connection, this.tokenInfoData);
        });
    }
    loadSwap(tokenFrom, tokenTo, fromAmount) {
        let tokenIdFrom = (0, helpers_1.findTokenId)(this.tokenInfoData, tokenFrom);
        let tokenIdTo = (0, helpers_1.findTokenId)(this.tokenInfoData, tokenTo);
        return (0, liquidity_1.loadRouteData)(this.tokenInfoData, this.funds, this.pythPrices, tokenIdFrom, tokenIdTo, fromAmount);
    }
    generateSwapInstruction(routeData, fromTokenAccount, toTokenAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet)
                throw new Error("Wallet not provided");
            return yield (0, liquidity_1.generateSwapInstruction)(this.program, this.wallet, this.tokenInfoData, routeData, fromTokenAccount, toTokenAccount);
        });
    }
}
exports.TokenSwap = TokenSwap;
