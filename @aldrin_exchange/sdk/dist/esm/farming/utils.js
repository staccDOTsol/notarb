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
import BN from 'bn.js';
import { PRE_VESTING_DENOMINATOR, PRE_VESTING_NUMERATOR, VESTING_DENOMINATOR, VESTING_NUMERATOR } from '../pools';
export var getFarmingRewardsFromSnapshots = function (_a) {
    var ticket = _a.ticket, state = _a.state, stateAttached = _a.stateAttached, snapshots = _a.snapshots;
    var initialState = {
        tokensUnlocked: new BN(0),
        amount: new BN(0),
        unclaimedSnapshots: 0,
    };
    var lastClaimTime = (stateAttached === null || stateAttached === void 0 ? void 0 : stateAttached.lastWithdrawTime) || ticket.startTime.toNumber();
    var lastVestedClaimTime = (stateAttached === null || stateAttached === void 0 ? void 0 : stateAttached.lastVestedWithdrawTime) || ticket.startTime.toNumber();
    var rewardsState = snapshots
        .reduce(function (acc, snapshot) {
        var tokensUnlocked = acc.tokensUnlocked, amount = acc.amount, unclaimedSnapshots = acc.unclaimedSnapshots;
        var snapshotTime = new BN(snapshot.time);
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
            ? ticketMaxReward.mul(PRE_VESTING_NUMERATOR).div(PRE_VESTING_DENOMINATOR)
            : new BN(0);
        var vestingReward = lastVestedClaimTime < snapshot.time && snapshot.time + state.vestingPeriod > currentTime
            ? ticketMaxReward.mul(VESTING_NUMERATOR).div(VESTING_DENOMINATOR)
            : new BN(0);
        var finalReward = preVestingReward.add(vestingReward);
        return {
            tokensUnlocked: snapshot.farmingTokens,
            amount: amount.add(finalReward),
            unclaimedSnapshots: finalReward.gtn(0) ? unclaimedSnapshots + 1 : 0,
        };
    }, initialState);
    return { unclaimedTokens: rewardsState.amount, unclaimedSnapshots: rewardsState.unclaimedSnapshots };
};
