# lifinity-sdk

## Installation
```bash
yarn install @lifinity/sdk
```

## Usage
- Get pools
```typescript
import { getPoolList } from '@lifinity/sdks';

const pools = getPoolList();

console.log("pools =", pools);
```

- Get swap amount
```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { getAmountOut, AmountOut } from '@lifinity/sdk';

const connection: Connection = new Connection("https://api.mainnet-beta.solana.com");
const amountIn: number = 1; // Input amount
const fromMint: PublicKey = new PublicKey("---Mint address of the input token---");
const toMint: PublicKey = new PublicKey("---Mint address of the output token---");
const slippage: number = 1; // Slippage (%)

const res : AmountOut = await getAmountOut(
    connection,
    amountIn,
    fromMint,
    toMint,
    slippage
);

console.log("amountIn: number =", res.amountIn);
console.log("amountOut: number =", res.amountOut);
console.log("amountOutWithSlippage: number =", res.amountOutWithSlippage);
console.log("priceImpact: number =", res.priceImpact);
console.log("fee: number =", res.fee);
console.log("feePercent: number =", res.feePercent);
```
  
- Breakdown of get swap amount<br>
Please use the SDK for calculating amount out (*getCurveAmount*) as the protocol is still in beta and the math may be updated
```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import Decimal from 'decimal'
import { getPool, getMultipleAccounts, getParsedData, getCurveAmount, TradeDirection } from '@lifinity/sdk'


const connection: Connection = new Connection("https://api.mainnet-beta.solana.com");
const amountIn: number = 1; // Input amount
const fromMint: PublicKey = new PublicKey("---Mint address of the intput token---");
const toMint: PublicKey = new PublicKey("---Mint address of the output token---");
const slippage: number = 1; // Slippage (%)

const poolInfo = getPool(fromMint.toString(), toMint.toString());
if (poolInfo) {

    let amount = new Decimal(amountIn);
    let tradeDirection: string;
    let inDecimal: number;
    let outDecimal: number;

    if (poolInfo.poolCoinMint === fromMint.toString()){
        amount = amount.times(new Decimal(10).pow(poolInfo.poolCoinDecimal));
        inDecimal = poolInfo.poolCoinDecimal;
        outDecimal = poolInfo.poolPcDecimal;
        tradeDirection = TradeDirection.AtoB;
    }else{
        amount = amount.times(new Decimal(10).pow(poolInfo.poolPcDecimal));
        inDecimal = poolInfo.poolPcDecimal;
        outDecimal = poolInfo.poolCoinDecimal
        tradeDirection = TradeDirection.BtoA;
    }

    const publicKeys = [
        new PublicKey(poolInfo.amm),
        new PublicKey(poolInfo.poolCoinTokenAccount),
        new PublicKey(poolInfo.poolPcTokenAccount),
        new PublicKey(poolInfo.configAccount),
        new PublicKey(poolInfo.pythAccount),
    ];

    if (poolInfo.pythAccount !== poolInfo.pythPcAccount){
        publicKeys.push(new PublicKey(poolInfo.pythPcAccount));
    }

    try {
        const multipleInfo = await getMultipleAccounts(connection, publicKeys);

        const data: IAmmData = getParsedData(
            multipleInfo,
            poolInfo
        );

        const slot = await connection.getSlot();

        const curveAmount: ICurveAmount = getCurveAmount(
            amount,
            slot,
            data.amm,
            data.fees,
            data.coinBalance,
            data.pcBalance,
            data.config,
            data.pyth,
            data.pythPc,
            tradeDirection,
        );
        console.log("amountSwapped: Decimal =", curveAmount.amountSwapped);
        console.log("priceImpact: Decimal =", curveAmount.priceImpact);
        console.log("fee: Decimal =", curveAmount.fee);
        console.log("feePercent: Decimal =", curveAmount.feePercent);

        const slippagePercent = new Decimal(slippage).div(100);
        const amountOutWithSlippage = new Decimal(Math.floor(curveAmount.amountSwapped.times(new Decimal(1).minus(slippagePercent)).toNumber()));
        const amountOutWithSlippageTokenAmount = amountOutWithSlippage.div(new Decimal(10).pow(outDecimal)).toNumber();
        const amountOutTokenAmount = curveAmount.amountSwapped.div(new Decimal(10).pow(outDecimal)).toNumber();
        const feeTokenAmount = curveAmount.fee.div(new Decimal(10).pow(inDecimal)).toNumber();

        console.log("slippagePercent: Decimal =", slippagePercent);
        console.log("amountOutWithSlippage: Decimal =", amountOutWithSlippage);
        console.log("amountOutWithSlippageTokenAmount: Decimal =", amountOutWithSlippageTokenAmount);
        console.log("amountOutTokenAmount: Decimal =", amountOutTokenAmount);
        console.log("feeTokenAmount: Decimal =", feeTokenAmount);

    }catch (error) {
        console.log(error)
        // Errors include failures to obtain accurate price feed from the oracle
    }
}
```
  
- Get swap instruction
```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { getSwapInstruction } from '@lifinity/sdk'

const connection: Connection = new Connection("https://api.mainnet-beta.solana.com");
const ownerAccount: PublicKey = new PublicKey("---User's Solana address---")
const amountIn: number = 1; // Input amount
const minimumOut: number = 100; // Output amount
const fromMint: PublicKey = new PublicKey("---Mint address of the input token---");
const toMint: PublicKey = new PublicKey("---Mint address of the output token---");
const fromUserAccount: PublicKey = new PublicKey("---User's input token account---");
const toUserAccount: PublicKey = new PublicKey("---User's output token account---");
const approve = true; // Set false to skip approve instruction

const { approveInstruction, swapInstruction, signers } = await getSwapInstruction(
    connection,
    ownerAccount,
    amountIn, 
    minimumOut,
    fromMint,
    toMint,
    fromUserAccount,
    toUserAccount,
    approve,
);

console.log("approveInstruction: TransactionInstruction =", approveInstruction);
console.log("swapInstruction: TransactionInstruction =", swapInstruction);
console.log("signers: any[] =", signers);
```
  
- Swap
```typescript
import { Lifinity } from '@lifinity/sdk'

const connection: Connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet: any = "---User wallet---"
const amountIn: number = 1; // Input amount
const minimumOut: number = 100; // Output amount
const fromMint: PublicKey = new PublicKey("---Mint address of the input token---");
const toMint: PublicKey = new PublicKey("---Mint address of the output token---");

const lifinitySdk = await Lifinity.build(
    connection,
    wallet
);

const transactionId: string = await lifinitySdk.swap(
    amountIn,
    minimumOut,
    fromMint,
    toMint
);

console.log("transactionId: string =",transactionId)
```

Copyright © 2022 LIFINITY FOUNDATION All Rights Reserved.