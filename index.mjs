
import dotenv from "dotenv";
import bs58 from "bs58";
import { borrowObligationLiquidityInstruction, flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction, parseObligation, refreshObligationInstruction, refreshReserveInstruction, SolendAction, SolendMarket, SolendReserve, SOLEND_PRODUCTION_PROGRAM_ID } from "@solendprotocol/solend-sdk";

import {
  Connection,
  Keypair,
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  sendAndConfirmTransaction,
  AddressLookupTableProgram
} from "@solana/web3.js";
import got from "got";
import { Wallet } from "@project-serum/anchor";
import promiseRetry from "promise-retry";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
 
} from "@solana/spl-token";
import * as splToken from '@solana/spl-token'
process.on('SIGTERM', signal => {
  console.log(`Process ${process.pid} received a SIGTERM signal`)
  process.exit(0)
})

process.on('SIGINT', signal => {
  console.log(`Process ${process.pid} has been interrupted`)
  process.exit(0)
})
console.log({ dotenv });
dotenv.config();
// This is a free Solana RPC endpoint. It may have ratelimit and sometimes
// invalid cache. I will recommend using a paid RPC endpoint.
const connection = new Connection((process.env.NODE_ENV == 'production' ? 'http://localhost' : 'http://69.46.29.78') +":8899", {skipPreflight: true});
const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr", {skipPreflight: true});
const market = await SolendMarket.initialize(
  connection2,
  
  "production", // optional environment argument
 ("7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM")
);
await market.loadReserves();
market.refreshAll();
console.log(market.reserves[0].config)
const reserve = market.reserves.find(res => res.config.liquidityToken.mint ==="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
console.log(reserve)
const wallet = new Wallet(
  Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync((process.env.NODE_ENV == 'production' ? '/home/ubuntu' : '/Users/jarettdunn') + '/notjaregm.json').toString()))));
  const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync((process.env.NODE_ENV == 'production' ? '/home/ubuntu' : '/Users/jarettdunn') + '/notjaregm.json').toString()))));
    const payer2 = (
      Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync((process.env.NODE_ENV == 'production' ? '/home/ubuntu' : '/Users/jarettdunn') + '/jaregm.json').toString()))));


import fs from 'fs'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


let myluts = JSON.parse(fs.readFileSync("./luts.json").toString())

const somestuff2 = JSON.parse(fs.readFileSync("./hahapairs.json").toString())
const somestuff3= JSON.parse(fs.readFileSync("./stuff.json").toString())

const has = [
    //"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    //"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 
    //"USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
    //"Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
    //"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
]

var mints = [   
 "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 
  "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
  "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"]
for (var add of somestuff2.data){
mints.push(add.token)

}
for (var ohsa of Object.keys(somestuff3)){
  let twotoks = ohsa.split(' <-> ')
  for (var atok of twotoks){
    if (!mints.includes(atok)){
      mints.push(atok)
    }
  }
}
console.log(mints.length)
const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&swapMode=ExactIn`
    )
    .json();

const getTransaction = (route) => {
  return got
    .post("https://quote-api.jup.ag/v1/swap", {
      json: {
        route: route,
        userPublicKey: wallet.publicKey.toString(),
        // to make sure it doesnt close the sol account
        wrapUnwrapSOL: false,
      },
    })
    .json();
};

const getConfirmTransaction = async (txid) => {
  const res = await promiseRetry(
    async (retry, attempt) => {
      let txResult = await connection.getTransaction(txid, {
        commitment: "confirmed",
      });

      if (!txResult) {
        const error = new Error("Transaction was not confirmed");
        error.txid = txid;

        retry(error);
        return;
      }
      return txResult;
    },
    {
      retries: 40,
      minTimeout: 500,
      maxTimeout: 1000,
    }
  );
  if (res.meta.err) {
    throw new Error("Transaction failed");
  }
  return txid;
};

// require wsol to start trading, this function create your wsol account and fund 1 SOL to it
//await createWSolAccount();

// initial 20 USDC for quote
let initial = 20_000_000;
import { Prism } from "@prism-hq/prism-ag";
let prism = await Prism.init({
    // user executing swap
    user: payer,               // optional (if you don't provide upon init, then you'll need to call prism.setSigner() after user connects the wallet)
connection: new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
    // rpc connection
});
console.log('')
console.log('')

console.log('')

// wsol account
const createWSolAccount = async () => {
  try {
  const wsolAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    new PublicKey(SOL_MINT),
    wallet.publicKey
  );

  const wsolAccount = await connection.getAccountInfo(wsolAddress);

  if (!wsolAccount) {
    const transaction = new Transaction({
      feePayer: payer2.publicKey,
    });
    let instructions = [(
      flashBorrowReserveLiquidityInstruction(
        initial,
        new PublicKey(reserve.config.liquidityAddress),
        tokenAccount,
        new PublicKey(reserve.config.address),
        new PublicKey(market.config.address),
        SOLEND_PRODUCTION_PROGRAM_ID
      )
    )]
    instructions.push(
      await Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey(SOL_MINT),
        wsolAddress,
        wallet.publicKey,
        wallet.publicKey
      )
    );

    // fund 1 sol to the account
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wsolAddress,
        lamports: 1_00_000_000, // 1 sol
      })
    );

    instructions.push(
      // This is not exposed by the types, but indeed it exists
      Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, wsolAddress)
    );

    transaction.add(...instructions);
    transaction.recentBlockhash = await (
      await connection.getRecentBlockhash()
    ).blockhash;
    transaction.partialSign(wallet.payer);
    transaction.partialSign(payer2);
    const result = await connection.sendTransaction(transaction, [
      wallet.payer,payer2
    ]);
    console.log({ result });
  }

  return wsolAccount;
}
catch (err){

}
};
while (true) {
//  await createWSolAccount();

  let abc = -1
  for (var USDC_MINT of has){
    let cba = -1
    abc++
    for (var SOL_MINT of mints){
      let dothethings = []
      SOL_MINT = mints[Math.floor(Math.random() * mints.length)]
      cba++
      try {
let dec = 6

   initial = Math.floor(Math.random() * (Math.random() * 40)* 10 ** dec + 1.02666 * 10 ** dec);
   //console.log(initial / 10 ** dec)
  // 0.1 SOL
  await prism.loadRoutes(USDC_MINT, SOL_MINT); 

let routes = prism.getRoutes(Math.floor(initial) / 10 ** dec);
let route 
var m  = 0
var dec2 = 0
var toArr = []
var fromArr = []
if (true){
let  r = routes[0]
route = routes[0]
    var tos = {}
  var froms = {}
  if (r.type != "direct"){
    tos[Object.values(r.routeData)[0].to] =0
    froms[Object.values(r.routeData)[0].from] = 0
    tos[Object.values(r.routeData)[1].to] =0
    froms[Object.values(r.routeData)[1].from] = 0
    for (var i =  0; i < r.providers.length; i++){

      tos[Object.values(r.routeData)[i].to] += Object.values(r.routeData)[i].amountOut
      froms[Object.values(r.routeData)[i].from] += Object.values(r.routeData)[i].amountIn

      
    }
    toArr.push(tos)
    fromArr.push(froms)
  }
 
else {
  route = routes[0]
  dothethings.push(true)
  }}  

if (fromArr.length > 0){
if (Object.keys(fromArr[0]).length > 0){
for (var i in Object.keys(fromArr[0])){
  var abc2 = Object.keys(fromArr[0])[i]
if (abc2 != "USDC"){
var nnn = Object.values(fromArr[0])[i]

for (var b in Object.keys(toArr[0])){
  var qqq = Object.keys(toArr[0])[b]
  if (qqq == abc2){
    var nnn2 = Object.values(toArr[0])[b]

    if(nnn2 - nnn >= 0){
      dothethings.push(true)
    }
    else {
      dothethings.push(false)
    }

  }
}
}
}
}
}

//console.log(initial / 10 ** dec)
// 0.1 SOL
await prism.loadRoutes( SOL_MINT, USDC_MINT ); 

let routes2 = prism.getRoutes(Math.floor(routes[0].amountOut * 0.999) );
let route2 
var m  = 0
var dec2 = 0
var toArr = []
var fromArr = []
if (true){
let  r = routes2[0]
 var tos = {}
var froms = {}
if (r.type != "direct"){
 tos[Object.values(r.routeData)[0].to] =0
 froms[Object.values(r.routeData)[0].from] = 0
 tos[Object.values(r.routeData)[1].to] =0
 froms[Object.values(r.routeData)[1].from] = 0
 for (var i =  0; i < r.providers.length; i++){

   tos[Object.values(r.routeData)[i].to] += Object.values(r.routeData)[i].amountOut
   froms[Object.values(r.routeData)[i].from] += Object.values(r.routeData)[i].amountIn

   
 }
 toArr.push(tos)
 fromArr.push(froms)
}
else {
route2 = routes2[0]
dothethings.push(true)
}}  
if (fromArr.length > 0){
if (Object.keys(fromArr[0]).length > 0){
for (var i in Object.keys(fromArr[0])){
var abc2 = Object.keys(fromArr[0])[i]
if (abc2 != "USDC"){
var nnn = Object.values(fromArr[0])[i]

for (var b in Object.keys(toArr[0])){
var qqq = Object.keys(toArr[0])[b]
if (qqq == abc2){
 var nnn2 = Object.values(toArr[0])[b]

 if(nnn2 - nnn >= 0){
   dothethings.push(true)
   route2 = routes2[0]
 }
 else {
   dothethings.push(false)
 }

}
}
}
}
}
}
let returns = ((routes2[0].amountOut / (initial / 10 ** dec)) - 1) * 100
let gogo = true 
for (var maybego of  dothethings){
  gogo = maybego
}
if (returns > 0.1 && gogo){
  
  if (true){
  // when outAmount more than initial
  if (true){//false){//returns >11111.000 ) {
    console.log(USDC_MINT+ " <-> " + SOL_MINT + "@ " + (initial / 10 ** dec).toString() + ": " + (Math.round(returns * 10000) / 10000) + '%')

 let   instructions = []
  let signers = []

    /*
const delegate = Keypair.generate();
const tokenAccount = (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(USDC_MINT)})).value[0].pubkey //new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);

const token = new Token(connection2, new PublicKey(reserve.config.liquidityToken.mint), TOKEN_PROGRAM_ID, payer);
*/
             // get routes based on from Token amount 10 USDC -> ? PRISM
             try {
              var swapTransaction = await prism.generateSwapTransactions(routes[0]);        // execute swap (sign, send and confirm transaction)
              //console.log(swapTransaction)
              await Promise.all(
                [swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
                  .filter(Boolean)
                  .map(async (serializedTransaction) => {
                    instructions.push(...serializedTransaction.instructions)
                  }))
              
                  var swapTransaction2 = await prism.generateSwapTransactions(routes2[0]);        // execute swap (sign, send and confirm transaction)
                  //console.log(swapTransaction)
                  await Promise.all(
                    [swapTransaction2.preTransaction, swapTransaction2.mainTransaction, swapTransaction2.postTransaction]
                      .filter(Boolean)
                      .map(async (serializedTransaction) => {
                        instructions.push(...serializedTransaction.instructions)
                      }))
                      /*
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
                        )) */
    
  var blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
    

          // create v0 compatible message
  const messageV0 = new TransactionMessage({
    payerKey: payer2.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();
let w = -1
let c = -1
let winner = ""
let vbb = -1
for (var key of Object.keys(myluts)){
  vbb++
   c = -1
for (var bca of messageV0.staticAccountKeys){
  let want = bca.toBase58()
    
    if (key.split(',').includes(want)){
      c++
      if (c > w){
        w = c 
        winner = Object.values(myluts)[vbb] 
      }  
    }
}
}
let goaccs = [(await connection.getAddressLookupTable(new PublicKey(winner))).value]
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let messageV00 
try { messageV00 =  new TransactionMessage({
  payerKey: payer2.publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message(goaccs);
} catch (err){
console.log(err)
}
  const transaction = new VersionedTransaction(messageV00);
  // sign your transaction with the required `Signers`
 await transaction.sign([payer,payer2, ...swapTransaction.preSigners, ...swapTransaction2.preSigners])
 try {
  try {
 // await  token.approve(tokenAccount, delegate.publicKey, payer, [], initial * 1.01);
   } catch (err){
  
   }

   
  await sendAndConfirmTransaction(connection, transaction)

 } catch (err){
  console.log(err)
 }
} catch (err){
console.log(err)
}
}
}}} catch (err){
  
console.log(err)
}
}
}
}

