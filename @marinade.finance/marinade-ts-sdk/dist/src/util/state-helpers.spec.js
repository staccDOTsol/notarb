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
const anchor_1 = require("@project-serum/anchor");
const marinade_config_1 = require("../config/marinade-config");
const marinade_1 = require("../marinade");
const TestWorld = __importStar(require("../../test/test-world"));
const state_helpers_1 = require("./state-helpers");
describe('state-helpers', () => {
    describe('unstakeNowFeeBp', () => {
        [
            // 0.3 % -> 3 %, obtaining more than available
            { lpMinFeeBasisPoints: 30, lpMaxFeeBasisPoints: 300, lpLiquidityTarget: 100, lamportsAvailable: 50, lamportsToObtain: 60, expectedResult: 300 },
            // 0.3 % -> 3 %, obtaining such amount that available lamports remain greater than liquidity target
            { lpMinFeeBasisPoints: 30, lpMaxFeeBasisPoints: 300, lpLiquidityTarget: 100, lamportsAvailable: 150, lamportsToObtain: 20, expectedResult: 30 },
            // 0.3 % -> 3 %, obtaining such amount that available lamports are less than liquidity target
            { lpMinFeeBasisPoints: 30, lpMaxFeeBasisPoints: 300, lpLiquidityTarget: 100, lamportsAvailable: 150, lamportsToObtain: 70, expectedResult: 84 },
        ].forEach((args, testNo) => it(`calculates the fee correctly (#${testNo})`, () => {
            const { lpMinFeeBasisPoints, lpMaxFeeBasisPoints, lpLiquidityTarget, lamportsAvailable, lamportsToObtain, expectedResult, } = args;
            const actualResult = (0, state_helpers_1.unstakeNowFeeBp)(lpMinFeeBasisPoints, lpMaxFeeBasisPoints, new anchor_1.BN(lpLiquidityTarget), new anchor_1.BN(lamportsAvailable), new anchor_1.BN(lamportsToObtain));
            expect(actualResult).toBe(expectedResult);
        }));
    });
    describe('proportionalBN', () => {
        [
            { amount: 10, numerator: 1, denominator: 2, expectedResult: 5 },
            { amount: 10, numerator: 2, denominator: 3, expectedResult: 6 },
            { amount: 10, numerator: 1, denominator: 0, expectedResult: 10 },
            { amount: 10230883291, numerator: 6978646921208343, denominator: 7428453065883502, expectedResult: 9611384974 },
        ].forEach(({ amount, numerator, denominator, expectedResult }) => it(`calculates the proportional amount (${amount} * ${numerator} / ${denominator} ~ ${expectedResult})`, () => {
            const actualResult = (0, state_helpers_1.proportionalBN)(new anchor_1.BN(amount), new anchor_1.BN(numerator), new anchor_1.BN(denominator)).toNumber();
            expect(actualResult).toBe(expectedResult);
        }));
    });
    describe('computeMsolAmount', () => {
        it('apply napkin math', () => __awaiter(void 0, void 0, void 0, function* () {
            const config = new marinade_config_1.MarinadeConfig({
                connection: TestWorld.CONNECTION,
                publicKey: TestWorld.SDK_USER.publicKey,
            });
            const marinade = new marinade_1.Marinade(config);
            const marinadeState = yield marinade.getMarinadeState();
            marinadeState.state.stakeSystem.delayedUnstakeCoolingDown = new anchor_1.BN(0);
            marinadeState.state.emergencyCoolingDown = new anchor_1.BN(0);
            marinadeState.state.validatorSystem.totalActiveBalance = new anchor_1.BN(7127287605604809);
            marinadeState.state.availableReserveBalance = new anchor_1.BN(314928893290695);
            marinadeState.state.circulatingTicketBalance = new anchor_1.BN(14301681747495);
            marinadeState.state.msolSupply = new anchor_1.BN(6978141264398309);
            const actualResult = (0, state_helpers_1.computeMsolAmount)(new anchor_1.BN('10230883291'), marinadeState);
            expect(actualResult.toString()).toBe('9611384974');
        }));
    });
});
//# sourceMappingURL=state-helpers.spec.js.map