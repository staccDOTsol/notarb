# liquidity-sdk
Exchange functionality using symmetry funds liquidity

Documentation:
https://docs.symmetry.fi/sdks/liquidity-sdk

Initialization
```typescript
import { TokenSwap } from "@symmetry-hq/liquidity-sdk";

let tokenSwap = await TokenSwap.init(
    // rpc connection
    connection: Connection,
    // wallet (optional | can be provided later, using tokenSwap.setWallet
    wallet: Wallet,
);
```
Executing swap
```typescript
// load routeData based on tokenFrom, tokenTo and fromAmount
let routeData: RouteData = tokenSwap.loadSwap(
    tokenFrom: PublicKey, 
    tokenTo: PublicKey,
    fromAmount: number,
);
type RouteData = {
    fromAmount: number,
    toAmount: number,
    minimumReceived: number,
    fromTokenId: number,
    toTokenId: number,
    feeUSDC: number,
    swapAccounts: {
        program: PublicKey,
        fundState: PublicKey,
        authority: PublicKey,
        source: PublicKey,
        destination: PublicKey,
        fees: PublicKey,
        tokenInfo: PublicKey,
        remainingAccounts: AccountMeta[],
    }
}

// generate swap instruction
let ix: TransactionInstruction = await tokenSwap
    .generateSwapInstruction(
        routeData: RouteData,
        fromTokenAccount: PublicKey,
        toTokenAccount: PublicKey,
    );

// for sol swap, wSol token accounts should be provided.
```
Tools
```typescript
// get available tokens for swap
let tokenList: {
    tokenId: number,
    coingeckoId: string,
    tokenMint: string,
}[] = tokenSwap.getTokenList();

// update liquidity sources(liquidity info isn't updated after TokenSwap.init())
await tokenSwap.updateLiquiditySources();

// check liquidity in a specific fund
let liquidityInfos: {
    tokenMint: string
    coingeckoId: string,
    userCanSellToFund: number,
    userCanBuyFromFund: number,
}[] = await tokenSwap.getLiquidityInfo(fundPubkey: PublicKey);

```
