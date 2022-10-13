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
exports.AccountLayout = void 0;
var BufferLayout = __importStar(require("@solana/buffer-layout"));
var common_1 = require("./common");
exports.AccountLayout = BufferLayout.struct([
    (0, common_1.publicKey)('mint'),
    (0, common_1.publicKey)('owner'),
    (0, common_1.uint64)('amount'),
    BufferLayout.u32('delegateOption'),
    (0, common_1.publicKey)('delegate'),
    BufferLayout.u8('state'),
    BufferLayout.u32('isNativeOption'),
    (0, common_1.uint64)('isNative'),
    (0, common_1.uint64)('delegatedAmount'),
    BufferLayout.u32('closeAuthorityOption'),
    (0, common_1.publicKey)('closeAuthority'),
]);
