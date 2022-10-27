"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTWAP_PROGRAM_ADDRESS = exports.POOLS_V2_PROGRAM_ADDRESS = exports.POOLS_PROGRAM_ADDRESS = exports.PRECISION_NOMINATOR = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
var POOLS_PROGRAM_ADDRESS = new web3_js_1.PublicKey('AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6');
exports.POOLS_PROGRAM_ADDRESS = POOLS_PROGRAM_ADDRESS;
var POOLS_V2_PROGRAM_ADDRESS = new web3_js_1.PublicKey('CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4');
exports.POOLS_V2_PROGRAM_ADDRESS = POOLS_V2_PROGRAM_ADDRESS;
var DTWAP_PROGRAM_ADDRESS = new web3_js_1.PublicKey('TWAPR9s1DEhrr8tuFbwEPws5moHXebMotqU85wwVmvU');
exports.DTWAP_PROGRAM_ADDRESS = DTWAP_PROGRAM_ADDRESS;
exports.PRECISION_NOMINATOR = new bn_js_1.default(1000000); // BN precision
