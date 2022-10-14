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
  WhirlpoolIx,
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
   
  
// anchor is cool
const provider =new anchor.AnchorProvider(connection,wallet, {commitment: "confirmed"} );
// whirlpool context
const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
// whirlpool fetcher
const fetcher = new AccountFetcher(connection);
// sol dust, dust/usdc, sol/usdc
// irayusd
let prices = []
const aggs = [
// jjfi jfi
new PublicKey("BwMPjhes2abu8Z9i3PSYiSuHAcqGnJrEPpSd5R9eENHZ"),
// usdc jfi
new PublicKey("Egb1jei2YjgK4KELocwiqpsV2GeVpFmbZzmpCqGBYJ37"),
new PublicKey("5MU8rNKRx779PGdv9XD6PHt3HubDQdWEzE9h3XFNGcaU"),
new PublicKey("BptKRUwgbpdknMPjbu3RuVo11UN9BsfkKvPi6WbEsiiU")]
const pools = [new PublicKey("EYh4771fqdF57MmC6UzjA6B41ttsZvSfhn4a4eNv959B"),
new PublicKey("53izNbSmy63u7XqoyAVQEvRyuhYcMNphTtZEqxdgcxdF"),
new PublicKey("GE3FFK5V76w7X1KyYMyP8cHQykkuav2tTBXjn9xiwcpq"),
 new PublicKey("6mPWsaeCR4hEJGk9Kk6rDGGBSaTpMY3R5EA5gVwQ8zeX")]
let acc = -1

// dust / usdc
let bbb = -1
for (var poolin of pools){
  bbb++
const pool: WhirlpoolData = await fetcher.getPool(poolin) as WhirlpoolData;

    // load the switchboard aggregator
    const aggregator = new AggregatorAccount({
      program,
      publicKey: aggs[bbb],
    });
    
console.log(pool)

// whirlpool client

const client = buildWhirlpoolClient(ctx);

// my atas
while (true){
  try{

    // get the result
    const result = await aggregator.getLatestValue();
    console.log((result.toNumber() * 100) / 100)

    
console.log(result.toNumber());
let atas = await connection.getParsedTokenAccountsByOwner(kp.publicKey, {programId: TOKEN_PROGRAM_ID})
var position: any
let good = false 

// pooldata
const poolData =await client.getPool(poolin)

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

let old = JSON.parse(fs.readFileSync("./CpbNcvqxXdQyQ3SRPDPSwLfzd9sgzBm8TjRFsfJL7Pf4.json").toString())
if (pool.tickCurrentIndex < position.tickLowerIndex && pool.tickCurrentIndex > position.tickUpperIndex && await position.getData().liquidity.toNumber()!= 0){
  // withdraw all liq
  // need help here?
  // nvm

const decrease = await decreaseLiquidityQuoteByLiquidity(
  position.liquidity,
  Percentage.fromFraction(0, 100),
  position,
poolData
);
let eh =await (
  await position.decreaseLiquidity(decrease)
  ).buildAndExecute()
 good = false
 
}
else {
  good = true 
console.log(await position.getData())
// rebalance by adding and removing liq
  let aBal = (await connection.getTokenAccountBalance(position.tokenVaultA)).value.uiAmount as number/ result.toNumber()
console.log(aBal)
console.log((await connection.getTokenAccountBalance(position.tokenVaultB)))
  let bBal = (await connection.getTokenAccountBalance(position.tokenVaultB)).value.uiAmount
  console.log(await position.getData())
  console.log(bBal)
  let diff = Math.round((aBal  as number - (bBal as number )) * 10 ** poolData.getTokenAInfo().decimals)
console.log(diff)

let ranran = 1

console.log(ranran )
const increase_quote = increaseLiquidityQuoteByInputToken(
  diff > 0 ? pool.tokenMintA : pool.tokenMintB,
  diff > 0 ? new Decimal( (diff )/ Math.random() * 10) : new Decimal(diff * result.toNumber()/ -1 * Math.random() * 10),
  await position.getData().tickLowerIndex,
  await position.getData().tickUpperIndex,
  Percentage.fromFraction(1, 100),
  poolData
);

if (diff < 0){
  diff = diff * -1
}
const decrease = await decreaseLiquidityQuoteByLiquidity(
  new BN(diff / Math.random() * 10),
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
// always be collecting fees
let dafees = await  collectFeesIx(ctx.program, {
  whirlpool: poolin,
  positionAuthority: provider.wallet.publicKey,
  position: position?.getAddress() as PublicKey,
  positionTokenAccount,
  tokenOwnerAccountA: new PublicKey("3668r5Aea8XqP3YiYGNoeGLf6FeTrEUvsK2UrZPDUzmK"),
  tokenOwnerAccountB: new PublicKey("2wpYeJQmQAPaQFpB8jZPPbPuJPXgVLNPir2ohwGBCFD1"),
  tokenVaultA: pool.tokenVaultA,
  tokenVaultB: pool.tokenVaultB
})
let darewards = await collectRewardIx(ctx.program, {  
  whirlpool: poolin,
positionAuthority: provider.wallet.publicKey,
position: position?.getAddress() as PublicKey,
  positionTokenAccount,
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
const myran = Math.ceil(result.toNumber() * 100) / 100
const myran2 = Math.floor(result.toNumber() * 99) / 100
const tickLower = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran2), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
);
const tickUpper = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
);
console.log([myran, myran2])
// Get a quote on the estimated liquidity and tokenIn (50 tokenA)
const quote = increaseLiquidityQuoteByInputToken(
  pool.tokenMintA,
  new Decimal(1  / result.toNumber()),
  tickLower,
  tickUpper,
  Percentage.fromFraction(1, 100),
  poolData
);
// Construct the open position & increase_liquidity ix and execute the transaction.
const { positionMint, tx } = await poolData.openPosition(
  tickLower,
  tickUpper,
  quote

);
const positionMintKeypair = Keypair.generate();
const positionPda = position.getPositionPda(ORCA_WHIRLPOOL_PROGRAM_ID, positionMintKeypair.publicKey);
const metadataPda = position.getPositionMetadataPda(positionMintKeypair.publicKey);
const positionTokenAccount = await deriveATA(
  provider.wallet.publicKey,
  positionMintKeypair.publicKey
);
/*

    owner: PublicKey;
    positionPda: PDA;
    positionMintAddress: PublicKey;
    positionTokenAccount: PublicKey;
    tickLowerIndex: number;
    tickUpperIndex: number;
    funder: PublicKey;
*/
const myran3 = Math.ceil(0.9382 * 1010000) / 1000000
const myran22 = Math.floor(0.9382 * 990000) / 1000000
const tickLowerIndex = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran22), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
);
const tickUpperIndex = TickUtil.getInitializableTickIndex(
  PriceMath.priceToTickIndex(new Decimal(myran3), tokenADecimal, tokenBDecimal),
  pool.tickSpacing
  
);

//J-JFI / JFI
//Prices in JFI per J-JFI
//0.91934
//EYh4771fqdF57MmC6UzjA6B41ttsZvSfhn4a4eNv959B
//100% jfi rewards 0.01% fee rate
// agg BwMPjhes2abu8Z9i3PSYiSuHAcqGnJrEPpSd5R9eENHZ

//I-JFI-Q4 / USDC
//Prices in USDC per I-J  FI-Q4
//0.05924
//53izNbSmy63u7XqoyAVQEvRyuhYcMNphTtZEqxdgcxdF
// 10% trade fees, 0.3%, 90% jfi
//Egb1jei2YjgK4KELocwiqpsV2GeVpFmbZzmpCqGBYJ37


//USDC / JFI
//Prices in JFI per USDC`
//1.1483
//GE3FFK5V76w7X1KyYMyP8cHQykkuav2tTBXjn9xiwcpq
//19% trade, 81% jfi, 0.3% fees
//5MU8rNKRx779PGdv9XD6PHt3HubDQdWEzE9h3XFNGcaU

//I-RAY-Q4 / USDC
//Prices in USDC per I-RAY-Q4
//0.030567
//6mPWsaeCR4hEJGk9Kk6rDGGBSaTpMY3R5EA5gVwQ8zeX
// 8% trade fees, 0.3%, 92% jfi, 
// BptKRUwgbpdknMPjbu3RuVo11UN9BsfkKvPi6WbEsiiU

const positionIx =  WhirlpoolIx.openPositionWithMetadataIx(ctx.program, {
    funder: provider.wallet.publicKey,
    positionPda,
    metadataPda,
    positionTokenAccount,
    owner: provider.wallet.publicKey,
    whirlpool: new PublicKey("2AEWSvUds1wsufnsDPCXjFsJCMJH5SNNm7fSF4kxys9a"),
    positionMintAddress: positionMintKeypair.publicKey,
    tickLowerIndex,
    tickUpperIndex,
  })
  const theQuote = increaseLiquidityQuoteByInputToken(
    pool.tokenMintA,
    new Decimal(1 / result.toNumber()),
    tickLower,
    tickUpper,
    Percentage.fromFraction(1, 100),
    poolData
  );
  var tokenOwnerAccountA = await deriveATA(provider.wallet.publicKey, pool.tokenMintA);
var tokenOwnerAccountB = await deriveATA(provider.wallet.publicKey, pool.tokenMintB);

  const increaseIx = WhirlpoolIx.increaseLiquidityIx(ctx.program, {
    ...theQuote,
    whirlpool: new PublicKey("2AEWSvUds1wsufnsDPCXjFsJCMJH5SNNm7fSF4kxys9a"),
    positionAuthority: provider.wallet.publicKey,
    position: positionMintKeypair.publicKey,
    positionTokenAccount,
    tokenOwnerAccountA,
    tokenOwnerAccountB,
    tokenVaultA: pool.tokenVaultA,
    tokenVaultB: pool.tokenVaultB,
    tickArrayLower: position.tickArrayLower,
    tickArrayUpper: position.tickArrayUpper,
})



console.log(positionMint)
console.log(tx)
await tx.buildAndExecute()
await sleep(10000)
await sleep(10000)
await sleep(10000)
await sleep(10000)

fs.writeFileSync("./CpbNcvqxXdQyQ3SRPDPSwLfzd9sgzBm8TjRFsfJL7Pf4.json", JSON.stringify([myran, myran2, tickLower, tickUpper]))
}}
catch (err){
  console.log(err)
}
}}
})
