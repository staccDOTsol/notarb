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
describe('conversion', () => {
    describe('withDecimalPoint', () => {
        [
            { bn: 0, decimals: 4, expectedResult: '0.0000' },
            { bn: 30, decimals: 4, expectedResult: '0.0030' },
            { bn: 3141592, decimals: 6, expectedResult: '3.141592' },
        ].forEach(({ bn, decimals, expectedResult }) => it(`converts ${bn} with ${decimals} decimals to ${expectedResult}`, () => {
            const actualResult = withDecimalPoint(new anchor_1.BN(bn), decimals);
            expect(actualResult).toBe(expectedResult);
        }));
    });
    describe('tokenBalanceToNumber', () => {
        [
            { bn: 1, decimals: 6, expectedResult: 1e-6 },
            { bn: 1000000, decimals: 6, expectedResult: 1 },
            { bn: 1000001, decimals: 6, expectedResult: 1.000001 },
        ].forEach(({ bn, decimals, expectedResult }) => it(`converts ${bn} with ${decimals} decimals to ${expectedResult}`, () => {
            const actualResult = tokenBalanceToNumber(new anchor_1.BN(bn), decimals);
            expect(actualResult).toBe(expectedResult);
        }));
    });
    describe('lamportsToSol', () => {
        it('converts the value correctly', () => {
            const actualResult = lamportsToSol(new anchor_1.BN('331727544677'));
            expect(actualResult).toBe(331.727544677);
        });
    });
    describe('solToLamports', () => {
        [
            { amountSol: 0, expectedResult: new anchor_1.BN(0) },
            { amountSol: 0.1, expectedResult: new anchor_1.BN(1e8) },
            { amountSol: 1000.123456789, expectedResult: new anchor_1.BN('1000123456789') },
            { amountSol: 10.123456789012, expectedResult: new anchor_1.BN('10123456789') },
        ].forEach(({ amountSol, expectedResult }) => it(`converts ${amountSol} to ${expectedResult.toString()} lamports`, () => {
            const actualResult = solToLamports(amountSol);
            expect(actualResult.toString()).toBe(expectedResult.toString());
        }));
    });
});
//# sourceMappingURL=conversion.spec.js.map