import { Connection, PublicKey, Keypair, AddressLookupTableProgram, TransactionMessage, Transaction, sendAndConfirmTransaction, VersionedTransaction} from "@solana/web3.js";
import { borrowObligationLiquidityInstruction, flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction, parseObligation, refreshObligationInstruction, refreshReserveInstruction, SolendAction, SolendMarket, SolendReserve, SOLEND_PRODUCTION_PROGRAM_ID } from "@solendprotocol/solend-sdk";
import { FanoutClient , MembershipModel} from '@glasseaters/hydra-sdk'
import fs from 'fs'
import { findWhere, map } from 'underscore';

import { Prism } from "@prism-hq/prism-ag";
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN, sleep } from "@blockworks-foundation/mango-client";

let somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())
let ss = JSON.parse(fs.readFileSync('./ss.json').toString())
let SOL_MINT = "METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m"
const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jarettdunn/jaregm.json').toString()))));
// 1. Initalize market with parameters and metadata
let initial = 10000  * 10 ** 6;
const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr", {skipPreflight: true});
let prism = await Prism.init({
    // user executing swap

    
    user: payer,               // optional (if you don't provide upon init, then you'll need to call prism.setSigner() after user connects the wallet)
connection: new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
    // rpc connection
});
let connection = new Connection("http://69.46.29.78:8899")
const market = await SolendMarket.initialize(
  connection,
  "production", // optional environment argument
);
console.log(market.reserves.map((reserve) => reserve.config.loanToValueRatio));

// 2. Read on-chain accounts for reserve data and cache
await market.loadReserves();
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
let MSOL_MINT = USDC_MINT
const reserve = market.reserves.find(res => res.config.liquidityToken.mint ===USDC_MINT);
const reserve2 = market.reserves.find(res => res.config.liquidityToken.mint ===USDC_MINT);

//console.log(usdcReserve.stats.totalDepositsWads.toString());

// Read Solend liquidity mining stats
await market.loadRewards();
//console.log(reserve.stats.totalSupplyAPY().rewards); // {apy: 0.07, rewardMint: "SLND...

// Refresh all cached data
market.refreshAll();
const tokenAccount = (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(USDC_MINT)})).value[0].pubkey //new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
let dec = ((await connection.getTokenAccountBalance(tokenAccount)).value.decimals)
const tokenAccount2 =   (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(SOL_MINT)})).value[0].pubkey //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
let dec2 = ((await connection.getTokenAccountBalance(tokenAccount2)).value.decimals)

const delegate = Keypair.generate();

const token = new Token(connection2, new PublicKey(reserve.config.liquidityToken.mint), TOKEN_PROGRAM_ID, payer);
console.log(1)
 token.approve(tokenAccount, delegate.publicKey, payer, [], initial );
console.log(2)

let instructions =


[
  (
    flashBorrowReserveLiquidityInstruction(
      initial,
      new PublicKey(reserve.config.liquidityAddress),
      tokenAccount,
      new PublicKey(reserve.config.address),
      new PublicKey(market.config.address),
      SOLEND_PRODUCTION_PROGRAM_ID
    )
  )]
  await prism.loadRoutes(USDC_MINT, SOL_MINT); 

let routes = prism.getRoutes(Math.floor(initial ) / 10 ** 6);
var route 
var m  = 0
for (var r of routes.reverse()){
  if (!r.providers.includes('saros')){
    if (r.amountOut > m ){
      m = r.amountOut
      route = r 
    }
  }
}
console.log(routes)
let swapTransaction = await prism.generateSwapTransactions(route);    

await prism.loadRoutes(SOL_MINT, USDC_MINT); 
console.log(route.amountOut )
let routes2 = prism.getRoutes(Math.floor(route.amountOut * 0.99  + 129));
var route 
var m  = 0
for (var r of routes2.reverse()){
  if (!r.providers.includes('saros')){
    if (r.amountOut > m ){
      m = r.amountOut
      route = r 
    }
  }
}
console.log(routes2.length)
console.log(route.amountOut )
process.exit()
let swapTransaction2 = await prism.generateSwapTransactions(route);       // execute swap (sign, send and confirm transaction)
//console.log(swapTransaction)

await Promise.all(
  [swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
    .filter(Boolean)
    .map(async (serializedTransaction) => {
      instructions.push(...serializedTransaction.instructions)
    }))

   let fanoutSdk = new FanoutClient(
      connection,
payer
  );

  var {instructions: i, signers: s} = await fanoutSdk.initializeFanoutInstructions({
    totalShares: 100,
    name: `Test${Date.now()}`,
    membershipModel: MembershipModel.Wallet,
});

instructions.push(...i)
    var {instructions: i, signers: s} = await fanoutSdk.initializeFanoutInstructions({
      totalShares: 100,
      name: `Test${Date.now()}`,
      membershipModel: MembershipModel.Wallet,
  });
  
instructions.push(...i)


    var {instructions: i, signers: s} = await fanoutSdk.initializeFanoutInstructions({
      totalShares: 100,
      name: `Test${Date.now()}`,
      membershipModel: MembershipModel.Wallet,
  });
  
instructions.push(...i)

            
    await Promise.all(
      [swapTransaction2.preTransaction, swapTransaction2.mainTransaction, swapTransaction2.postTransaction]
        .filter(Boolean)
        .map(async (serializedTransaction) => {
          instructions.push(...serializedTransaction.instructions)
        }))

    //99999
    
    
//instructions.push(...solendAction2.setupIxs)
//instructions.push(...solendAction2.lendingIxs)

instructions.push(
    flashRepayReserveLiquidityInstruction(
      initial,
      0,
      tokenAccount,
      new PublicKey(reserve.config.liquidityAddress),
      new PublicKey(reserve.config.liquidityFeeReceiverAddress),
      tokenAccount,
      new PublicKey(reserve.config.address),
      new PublicKey(market.config.address),
      delegate.publicKey,
      SOLEND_PRODUCTION_PROGRAM_ID
    ))
const slot = await connection.getSlot();

// Assumption:
// `payer` is a valid `Keypair` with enough SOL to pay for the execution
var blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let [lookupTableInst, lookupTableAddress] =
  AddressLookupTableProgram.createLookupTable({
    authority: payer.publicKey,
    payer: payer.publicKey,
    recentSlot: slot,
  });
  let ttt = await connection
  .getAddressLookupTable(lookupTableAddress)
  .then((res) => res.value);
  console.log(ttt)
  let lookupTableAddress2 = lookupTableAddress
  let lookupTableAddress3= lookupTableAddress
//  lookupTableAddress = new PublicKey("7XH2JSueLJMTuDLE67Qw92KKwAdLjggszDSN5GVoK3qD")
//lookupTableAddress = new PublicKey("H3pPX8AYP2neyH6AL5mPZmcEWzCbKEU22gWUpY8JASu5")
console.log("lookup table address:", lookupTableAddress.toBase58());
let dontgo1 = false
let ranran = Math.random()
if (Object.keys(ss).includes(USDC_MINT+ " <-> " + SOL_MINT )){
 lookupTableAddress = new PublicKey(ss[USDC_MINT+ " <-> " + SOL_MINT] )
  dontgo1 = true
}
if (!dontgo1){ if  (!Object.keys(ss).includes(USDC_MINT+ " <-> " + SOL_MINT ) ){
  
  ss[USDC_MINT+ " <-> " + SOL_MINT] = lookupTableAddress
  console.log('blarg2')
fs.writeFileSync("./ss.json", JSON.stringify(ss))

}
}

console.log("lookup table address:", lookupTableAddress.toBase58());
    blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
          // create v0 compatible message

  const messageV0 = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let aaa = 0
 ss = []
let dg1 = false 
let dg2 = false 
let dg3 = false 
if (!Object.keys(somestuff).includes(USDC_MINT+ " <-> " + SOL_MINT)){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT] = []
}
for (var bca of messageV0.staticAccountKeys){
if (aaa < messageV0.staticAccountKeys.length / 2){
  aaa++
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
ss.push(bca)
fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))
  }
}
}
console.log(ss.length)
if (ss.length == 0){
  dg1 = true
}
const extendInstruction = AddressLookupTableProgram.extendLookupTable({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: ss
  
});
ss = []
aaa = 0
for (var bca of messageV0.staticAccountKeys){
  aaa++
  if (aaa >= messageV0.staticAccountKeys.length / 2){
    if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
  ss.push(bca)
  fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))
    }
  }
  }
  console.log(ss.length)
  if (ss.length == 0){
    dg1 = true
  }
  const extendInstruction2 = AddressLookupTableProgram.extendLookupTable({
    payer: payer.publicKey,
    authority: payer.publicKey,
    lookupTable: lookupTableAddress,
    addresses: ss
    
  });
let ix2 =  [lookupTableInst,extendInstruction, extendInstruction2]


if (!dontgo1){
  let tx2 = new Transaction()
  tx2.add(ix2[0])
  console.log(1)
  blockhash = await connection
      .getLatestBlockhash()
      .then((res) => res.blockhash);
  tx2.recentBlockhash = blockhash
  tx2.sign(payer)
  try {
    
  let hm = await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
  console.log(hm)
  } catch (err){
      console.log(err)
      
  }
}

var tx2 = new Transaction()
tx2.add(ix2[1])
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)
if (!dg1){
try {
  
let hm = await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
console.log(hm)
} catch (err){
    console.log(err)
    
}
}

var tx2 = new Transaction()
tx2.add(ix2[2])
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)
if (!dg1){
try {
  
let hm = await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
console.log(hm)
} catch (err){
    console.log(err)
    
}
}
const lookupTableAccount = await connection
  .getAddressLookupTable(lookupTableAddress)
  .then((res) => res.value);
  
console.log(lookupTableAccount)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let messageV00 
 try {

  messageV00 =  new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message([lookupTableAccount]);

    }
    catch (err){

    }
console.log(messageV00)
  const transaction = new VersionedTransaction(messageV00);
  // sign your transaction with the required `Signers`
 console.log(transaction)
 let signers = [...s,payer, delegate,...swapTransaction.preSigners,...swapTransaction2.preSigners]//, ...swapTransactionmm.preSigners, ...swapTransactionm.preSigners, ...swapTransactionp.preSigners

 transaction.sign(signers)
 await sleep(100)
 try {
await    reserve.load()
await reserve2.load()// .refreshAll()

console.log('aaa')
try {
 await sendAndConfirmTransaction(connection, transaction)
} catch (err){
  console.log(err)
  console.log(...err.logs)
}
 } catch (err){
    console.log(...err.logs)
  console.log(err)
 }