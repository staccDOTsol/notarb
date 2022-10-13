"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFarmingRewardsFromSnapshots = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
var pools_1 = require("../pools");
var getFarmingRewardsFromSnapshots = function (_a) {
    var ticket = _a.ticket, state = _a.state, stateAttached = _a.stateAttached, snapshots = _a.snapshots;
    var initialState = {
        tokensUnlocked: new bn_js_1.default(0),
        amount: new bn_js_1.default(0),
        unclaimedSnapshots: 0,
    };
    var lastClaimTime = (stateAttached === null || stateAttached === void 0 ? void 0 : stateAttached.lastWithdrawTime) || ticket.startTime.toNumber();
    var lastVestedClaimTime = (stateAttached === null || stateAttached === void 0 ? void 0 : stateAttached.lastVestedWithdrawTime) || ticket.startTime.toNumber();
    var rewardsState = snapshots
        .reduce(function (acc, snapshot) {
        var tokensUnlocked = acc.tokensUnlocked, amount = acc.amount, unclaimedSnapshots = acc.unclaimedSnapshots;
        var snapshotTime = new bn_js_1.default(snapshot.time);
        if (ticket.startTime.gte(snapshotTime) || ticket.endTime.lte(snapshotTime)) { // Filter by date
            return __assign(__assign({}, acc), { tokensUnlocked: snapshot.farmingTokens });
        }
        var poolReward = snapshot.farmingTokens.sub(tokensUnlocked);
        var ticketMaxReward = poolReward
            .mul(ticket.tokensFrozen)
            .div(snapshot.tokensFrozen);
        var currentTime = Date.now() / 1000;
        // Decrease reward on vesting period
        var preVestingReward = lastClaimTime < snapshot.time
            ? ticketMaxReward.mul(pools_1.PRE_VESTING_NUMERATOR).div(pools_1.PRE_VESTING_DENOMINATOR)
            : new bn_js_1.default(0);
        var vestingReward = lastVestedClaimTime < snapshot.time && snapshot.time + state.vestingPeriod > currentTime
            ? ticketMaxReward.mul(pools_1.VESTING_NUMERATOR).div(pools_1.VESTING_DENOMINATOR)
            : new bn_js_1.default(0);
        var finalReward = preVestingReward.add(vestingReward);
        return {
            tokensUnlocked: snapshot.farmingTokens,
            amount: amount.add(finalReward),
            unclaimedSnapshots: finalReward.gtn(0) ? unclaimedSnapshots + 1 : 0,
        };
    }, initialState);
    return { unclaimedTokens: rewardsState.amount, unclaimedSnapshots: rewardsState.unclaimedSnapshots };
};
exports.getFarmingRewardsFromSnapshots = getFarmingRewardsFromSnapshots;
