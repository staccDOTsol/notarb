import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
var toFarmingStateInfo = function (response, pool) { return ({
    tokensPerPeriod: new BN("" + response.tokensPerPeriod),
    tokensUnlocked: new BN("" + response.tokensUnlocked),
    tokensTotal: new BN("" + response.tokensTotal),
    periodLength: response.periodLength,
    vestingPeriod: response.vestingPeriod,
    currentTime: response.currentTime,
    pool: pool,
    farmingTokenVault: new PublicKey(response.farmingTokenVault),
    farmingSnapshots: new PublicKey(response.farmingSnapshots),
    farmingStatePublicKey: new PublicKey(response.farmingState),
    farmingTokenMint: new PublicKey(response.farmingTokenMint),
    farmingTokenMintDecimals: response.farmingTokenMintDecimals,
}); };
export var poolResponseToModel = function (response, prices) {
    var _a = response.parsedName.split('_'), base = _a[0], quote = _a[1];
    var poolPublicKey = new PublicKey(response.swapToken);
    var baseTvl = new BN(response.tvl.tokenA);
    var quoteTvl = new BN(response.tvl.tokenB);
    var baseTvlUsd = baseTvl.muln(prices.get(base) || 0);
    var quoteTvlUsd = quoteTvl.muln(prices.get(quote) || 0);
    var totalTvlUsd = baseTvl.add(quoteTvl);
    var lpPrice = new BN(response.lpTokenFreezeVaultBalance).div(totalTvlUsd);
    return {
        poolPublicKey: poolPublicKey,
        poolMint: new PublicKey(response.poolTokenMint),
        baseTokenVault: new PublicKey(response.poolTokenAccountA),
        baseTokenMint: new PublicKey(response.tokenA),
        quoteTokenVault: new PublicKey(response.poolTokenAccountB),
        quoteTokenMint: new PublicKey(response.tokenA),
        name: response.parsedName,
        lpApr24h: response.apy24h,
        supply: new BN(response.supply),
        farmingStates: (response.farming || []).map(function (f) { return toFarmingStateInfo(f, poolPublicKey); }),
        tvl: {
            base: baseTvl,
            quote: quoteTvl,
            baseUsd: baseTvlUsd,
            quoteUsd: quoteTvlUsd,
            totalUsd: totalTvlUsd,
        },
    };
};
