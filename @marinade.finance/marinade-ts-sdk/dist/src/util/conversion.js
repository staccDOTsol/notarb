"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solToLamports = exports.lamportsToSol = exports.tokenBalanceToNumber = exports.withDecimalPoint = void 0;
const anchor_1 = require("@project-serum/anchor");
const SOL_DECIMALS = 9;
function withDecimalPoint(bn, decimals) {
    const s = bn.toString().padStart(decimals + 1, '0');
    const l = s.length;
    return s.slice(0, l - decimals) + '.' + s.slice(-decimals);
}
exports.withDecimalPoint = withDecimalPoint;
function tokenBalanceToNumber(bn, decimals) {
    return Number(withDecimalPoint(bn, decimals));
}
exports.tokenBalanceToNumber = tokenBalanceToNumber;
function lamportsToSol(bn) {
    return tokenBalanceToNumber(bn, SOL_DECIMALS);
}
exports.lamportsToSol = lamportsToSol;
function solToLamports(amountSol) {
    return new anchor_1.BN(amountSol.toFixed(SOL_DECIMALS).replace('.', ''));
}
exports.solToLamports = solToLamports;
//# sourceMappingURL=conversion.js.map