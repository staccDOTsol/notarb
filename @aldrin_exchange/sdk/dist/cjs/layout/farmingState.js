"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmingStateLayout = void 0;
var BufferLayout = __importStar(require("@solana/buffer-layout"));
var common_1 = require("./common");
/**
 *
 * {

          {
            "name": "tokensTotal",
            "type": "u64"
          },
          {
            "name": "periodLength",
            "type": "u64"
          },
          {
            "name": "noWithdrawalTime",
            "type": "i64"
          },
          {
            "name": "vestingType",
            "type": "u8"
          },
          {
            "name": "vestingPeriod",
            "type": "i64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "currentTime",
            "type": "i64"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "farmingTokenVault",
            "type": "publicKey"
          },
          {
            "name": "farmingSnapshots",
            "type": "publicKey"
          }

 */
exports.FarmingStateLayout = BufferLayout.struct([
    (0, common_1.uint64)('tokensUnlocked'),
    (0, common_1.uint64)('tokensPerPeriod'),
    (0, common_1.uint64)('tokensTotal'),
    (0, common_1.uint64)('periodLength'),
    (0, common_1.uint64)('noWithdrawalTime'),
    (0, common_1.uint64)('startTime'),
    (0, common_1.uint64)('currentTime'),
    (0, common_1.publicKey)('pool'),
    (0, common_1.publicKey)('farmingTokenVault'),
    (0, common_1.publicKey)('farmingSnapshots'),
]);
