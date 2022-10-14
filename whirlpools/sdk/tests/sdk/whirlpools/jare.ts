import { AddressUtil, deriveATA, Percentage, ZERO } from "@orca-so/common-sdk";
import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, u64 } from "@solana/spl-token";
import * as assert from "assert";
import BN from "bn.js";
import {
    AccountFetcher,
  buildWhirlpoolClient,
  increaseLiquidityQuoteByInputToken,
  increaseLiquidityQuoteByInputTokenWithParams,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  PositionData,
  PriceMath,
  swapQuoteByInputToken,
  swapQuoteWithParams,
  SwapUtils,
  TickUtil,
  TICK_ARRAY_SIZE,
  toTx,
  WhirlpoolContext,
  WhirlpoolData,
} from "@orca-so/whirlpools-sdk";
import fs from 'fs'
import {
  AggregatorAccount,
  OracleQueueAccount,
  loadSwitchboardProgram,
} from "@switchboard-xyz/switchboard-v2";


import { Connection,Keypair, PublicKey  }from '@solana/web3.js'

import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import Decimal from "decimal.js";
import { collectFeesIx, collectRewardIx, decreaseLiquidityIx } from "../../../src/instructions";
import { decreaseLiquidityQuoteByLiquidity } from "../../../src";
import { fundPositions, withdrawPositions } from "../../utils/init-utils";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { sleep } from "../../utils";
// @ts-ignore
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
setTimeout(async function(){
    let connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
    let kp = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jarettdunn/notjaregm.json').toString())))
    let wallet = new NodeWallet(kp)

    // init switchboard
    const program = await loadSwitchboardProgram(
      "mainnet-beta",
      connection,
      kp
    );
    const aggs = [
      // jjfi jfi
      new PublicKey("BwMPjhes2abu8Z9i3PSYiSuHAcqGnJrEPpSd5R9eENHZ"),
      // usdc jfi
      new PublicKey("Egb1jei2YjgK4KELocwiqpsV2GeVpFmbZzmpCqGBYJ37"),
      new PublicKey("5MU8rNKRx779PGdv9XD6PHt3HubDQdWEzE9h3XFNGcaU")]//,
 //     new PublicKey("BptKRUwgbpdknMPjbu3RuVo11UN9BsfkKvPi6WbEsiiU")]
      const pools = [new PublicKey("EYh4771fqdF57MmC6UzjA6B41ttsZvSfhn4a4eNv959B"),
      new PublicKey("53izNbSmy63u7XqoyAVQEvRyuhYcMNphTtZEqxdgcxdF"),
      new PublicKey("GE3FFK5V76w7X1KyYMyP8cHQykkuav2tTBXjn9xiwcpq")]
//       new PublicKey("6mPWsaeCR4hEJGk9Kk6rDGGBSaTpMY3R5EA5gVwQ8zeX")]
      let acc = -1
  
// anchor is cool
const provider =new anchor.AnchorProvider(connection,wallet, {commitment: "confirmed"} );
// whirlpool context
const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
// whirlpool fetcher
const fetcher = new AccountFetcher(connection);


// my atas
while (true){
let abcabc = -1 
for (var agg of aggs){
  abcabc++
  try{

// dust / usdc
const pool: WhirlpoolData = await fetcher.getPool(pools[abcabc]) as WhirlpoolData;

console.log(pool)

// whirlpool client

const client = buildWhirlpoolClient(ctx);
    // load the switchboard aggregator
    const aggregator = new AggregatorAccount({
      program,
      publicKey: agg,
    });

    // get the result
    const result = await aggregator.getLatestValue();
    console.log((result.toNumber() * 100) / 100)

    
console.log(result.toNumber());
let atas = await connection.getParsedTokenAccountsByOwner(kp.publicKey, {programId: TOKEN_PROGRAM_ID})
var position: any
let good = false 

// pooldata
const poolData =await client.getPool(pools[abcabc])

for (var a of atas.value){
  try {
    // is this a whirlpool nft?
   position = await client.getPosition(
    PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, new PublicKey(a.account.data.parsed.info.mint)).publicKey
  )
  console.log(await position.getData())
// nothing to see here
// we need to konw various atas and junk
var positionTokenAccount = await deriveATA(provider.wallet.publicKey, position?.getAddress() as PublicKey);
var tokenOwnerAccountA = await deriveATA(provider.wallet.publicKey, pool.tokenMintA);
var tokenOwnerAccountB = await deriveATA(provider.wallet.publicKey, pool.tokenMintB);

// read our input range

let old 
try {
old = JSON.parse(fs.readFileSync("./" + pools[abcabc].toBase58() + "").toString())

console.log(pool.tickCurrentIndex)
console.log(pool.tickCurrentIndex < position.tickLowerIndex)
console.log(pool.tickCurrentIndex > position.tickUpperIndex)
console.log(position.getData().liquidity.toNumber())
console.log(old)
console.log(result.toNumber())
if (await position.getData().liquidity.toNumber()  == 0){

// always be collecting fees
let dafees = await  collectFeesIx(ctx.program, {
  whirlpool: pools[abcabc],
  positionAuthority: provider.wallet.publicKey,
  position: position?.getAddress() as PublicKey,
  positionTokenAccount: a.pubkey,
  tokenOwnerAccountA,
  tokenOwnerAccountB,
  tokenVaultA: pool.tokenVaultA,
  tokenVaultB: pool.tokenVaultB
})
let darewards = await collectRewardIx(ctx.program, {  
  whirlpool: pools[abcabc],
positionAuthority: provider.wallet.publicKey,
position: position?.getAddress() as PublicKey,
  positionTokenAccount: a.pubkey,
  rewardOwnerAccount: provider.wallet.publicKey,
  rewardVault: pool.rewardInfos[0].vault,
  rewardIndex: 0,
})
try{ await toTx(ctx, dafees).buildAndExecute();}
catch (err){
  console.log(err)
}

try {
await toTx(ctx, darewards).buildAndExecute();
}
catch (err){
  
  console.log(err)
}

  const tx = await poolData.closePosition(PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, new PublicKey(a.account.data.parsed.info.mint)).publicKey, Percentage.fromFraction(1, 100))
  await tx.buildAndExecute();

}
if ((result.toNumber() > parseFloat(old[0]) || result.toNumber() < parseFloat(old[1])) && await position.getData().liquidity.toNumber() != 0){//} < position.tickLowerIndex || pool.tickCurrentIndex > position.tickUpperIndex ){
  // withdraw all liq
  // need help here?
  // nvm
  try {
console.log('ahahjahoaahaou')
console.log('ahahjahoaahaou')
console.log('ahahjahoaahaou')
console.log('ahahjahoaahaou')
console.log('ahahjahoaahaou')
console.log('ahahjahoaahaou')
console.log(await position.getData().liquidity)
const decrease = await decreaseLiquidityQuoteByLiquidity(
  await position.getData().liquidity,
  Percentage.fromFraction(1, 100),
  position,
poolData
);
let eh =await (
  await position.decreaseLiquidity(decrease)
  ).buildAndExecute()
 good = false
 console.log(eh)
} catch (err){
  console.log(err)
}

  const tx = await poolData.closePosition(PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, new PublicKey(a.account.data.parsed.info.mint)).publicKey, Percentage.fromFraction(1, 100))
  await tx.buildAndExecute();

}
else if (await position.getData().liquidity.toNumber() > 0) {
  good = true 

// rebalance by adding and removing liq
  let aBal = (await connection.getTokenAccountBalance(tokenOwnerAccountA)).value.uiAmount

  let bBal = (await connection.getTokenAccountBalance(tokenOwnerAccountB)).value.uiAmount
  let diff = Math.round((aBal  as number* result.toNumber() - (bBal as number )) * 10 ** poolData.getTokenAInfo().decimals) / 10 ** poolData.getTokenAInfo().decimals
console.log(diff)

let ranran = 1

console.log(ranran )
const increase_quote = increaseLiquidityQuoteByInputToken(
  diff > 0 ? pool.tokenMintA : pool.tokenMintB,
  diff > 0 ? new Decimal( diff/ Math.random() * 1) : new Decimal(diff/ -1 * Math.random() * 1),
  await position.getData().tickLowerIndex,
  await position.getData().tickUpperIndex,
  Percentage.fromFraction(1, 100),
  poolData
);

if (diff < 0){
  diff = diff * -1
}
const decrease = await decreaseLiquidityQuoteByLiquidity(
  new BN(diff / Math.random() * 1),
  Percentage.fromFraction(0, 100),
  position,
poolData
);
try {
let eh2 =await ( 
  await position.increaseLiquidity(increase_quote)
  ).buildAndExecute()
  console.log(eh2)
} catch (err){
console.log(err)
}
try {
let eh =await ( 
  await position.decreaseLiquidity(decrease)
  ).buildAndExecute()

console.log(eh)

} catch (err){
  console.log(err)

}

}

} catch (err){
  // @ts-ignore
  if (err.toString().indexOf('Unable to fetch') == -1){
    console.log(err)
      }
      good = false
}
} catch (err){
  // @ts-ignore
  if (err.toString().indexOf('Unable to fetch') == -1){
console.log(err)
  }
}
}
if (!good){
  // open new positions sers

  const poolTokenAInfo = poolData.getTokenAInfo();
const poolTokenBInfo = poolData.getTokenBInfo();
const tokenADecimal = poolTokenAInfo.decimals;
const tokenBDecimal = poolTokenBInfo.decimals;
const myran = Math.ceil(result.toNumber() * 1010000) / 1000000
const myran2 = Math.floor(result.toNumber() * 990000) / 1000000
const tickLower = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran2), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
);
const tickUpper = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
);
console.log([myran, myran2])
try {
// Get a quote on the estimated liquidity and tokenIn (50 tokenA)
const quote = increaseLiquidityQuoteByInputToken(
  pool.tokenMintB,
  new Decimal(1 / result.toNumber()),
  tickLower,
  tickUpper,
  Percentage.fromFraction(1, 100),
  poolData
);
try {
  // Construct the open position & increase_liquidity ix and execute the transaction.
  const { positionMint, tx } = await poolData.openPosition(
    tickLower,
    tickUpper,
    quote
  
  );
  await tx.buildAndExecute()
  } catch (err){
    
  console.log(err)
  }
} catch 
(err){
  console.log(err)
}
try {
// Get a quote on the estimated liquidity and tokenIn (50 tokenA)
const quote2 = increaseLiquidityQuoteByInputToken(
  pool.tokenMintA,
  new Decimal( 1 ),
  tickLower,
  tickUpper,
  Percentage.fromFraction(1, 100),
  poolData
);

try {
  // Construct the open position & increase_liquidity ix and execute the transaction.
  const { positionMint, tx } = await poolData.openPosition(
    tickLower,
    tickUpper,
    quote2
  
  );
  await tx.buildAndExecute()
  } catch (err){
    console.log(err)
  
  }
} catch 
(err){

  console.log(err)
}

await sleep(10000)
await sleep(10000)
await sleep(10000)
await sleep(10000)

fs.writeFileSync("./" + pools[abcabc].toBase58() + "", JSON.stringify([myran, myran2, tickLower, tickUpper]))
}}
catch (err){
  console.log(err)
}
}}
})
