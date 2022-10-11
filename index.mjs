
import dotenv from "dotenv";
import bs58 from "bs58";
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
const connection = new Connection("http://69.46.29.78:8899", {skipPreflight: true});
const wallet = new Wallet(
  Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/validator-keypair.json').toString()))));
  const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/validator-keypair.json').toString()))));
import { SolendAction, SolendMarket, SolendWallet, flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction, SOLEND_PRODUCTION_PROGRAM_ID } from "@solendprotocol/solend-sdk";
import * as anchor from '@project-serum/anchor';

import fs from 'fs'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const atas = [
  "2PYVzDJ6Buks4yUVeDEhLwc14wKpxbehEsbeU6yM8J8d",
  "JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD",
"J2cL94QELJ9pt8L93e38pgqgHjzysKPWD9BoaE22HYmy",  "8SRg1faUaqwqRyt2pC8xTC9Sg2hBabTH2GAKdKB5DqMk","HEZTNc9u5evA3vndyLBUt5nXREtMmdYMPfRmF4hksdLu","Becp7pmpFcbXUBwArc92Jkk6iS61nnfB9ajweVnpy6VG",

]
const somestuff2 = JSON.parse(fs.readFileSync("./hahapairs.json").toString())

const has = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD
    "So11111111111111111111111111111111111111112", // WSOl
    "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
]
let somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())

let ss2 = JSON.parse(fs.readFileSync('./ss2.json').toString())

let mints = [    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD
"So11111111111111111111111111111111111111112", // WSOl
"SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
"7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj","DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
"4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
"orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",]

for (var add of somestuff2.data){
for (var address of add.tokens){
//mints.push(address.address)
}
}
console.log(mints.length)
const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}`
    )
    .json();

const getTransaction = (route) => {
  return got
    .post("https://quote-api.jup.ag/v1/swap", {
      json: {
        slippage: 99,
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
for (var USDC_MINT of has){
 // abc++
  for (var SOL_MINT of mints){
    console.log(USDC_MINT+ " <-> " + SOL_MINT)
        // load routes for tokens, tokenSymbol | tokenMint (base58 string)
    try 
   { 
   } catch (err){

   }
  }
}
console.log('')
console.log('')

console.log('')
while (true) {
  let abc = -1
  for (var USDC_MINT of has){
    let cba = -1
    abc++
    for (var SOL_MINT of has){
      cba++

      try {
      const tokenAccount =  new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
      let dec = ((await connection.getTokenAccountBalance(tokenAccount)).value.decimals)

      const tokenAccount2 =  new PublicKey(atas[cba]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
      let dec2 = ((await connection.getTokenAccountBalance(tokenAccount2)).value.decimals)
   initial = Math.floor(Math.random() * 5.66* 10 ** dec + 0.2666 * 10 ** dec);
   //console.log(initial / 10 ** dec)
  // 0.1 SOL
  const usdcToSol = await getCoinQuote(USDC_MINT, SOL_MINT, initial);
  await prism.loadRoutes(SOL_MINT, USDC_MINT); 

let routes = prism.getRoutes(Math.floor(usdcToSol.data[0].outAmount ) / 10 ** dec2);  
console.log(routes[0].amountOut)   
var returns = (((routes[0].amountOut / (initial / 10 ** dec))- 1))
console.log(returns)
  if (returns > 0){
  console.log(USDC_MINT+ " <-> " + SOL_MINT + "@ " + (initial / 10 ** dec).toString() + ": " + (Math.round(returns * 10000) / 10000) + '%')
  }
  // when outAmount more than initial
  if (returns >0 ) {
  
    const market = await SolendMarket.initialize(
      connection,
      'production',
    );

    const reserve = market.reserves.find(res => res.config.liquidityToken.mint === USDC_MINT);
    if (reserve == null) {
      throw 'can\'t find reserve!';
    }

    console.log(`reserve: ${JSON.stringify(reserve?.config.liquidityToken.mint)}`);
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

//  lookupTableAddress = new PublicKey("7XH2JSueLJMTuDLE67Qw92KKwAdLjggszDSN5GVoK3qD")
//lookupTableAddress = new PublicKey("H3pPX8AYP2neyH6AL5mPZmcEWzCbKEU22gWUpY8JASu5")
console.log("lookup table address:", lookupTableAddress.toBase58());
let dontgo1 = false
if (!Object.keys(ss2).includes(USDC_MINT+ " <-> " + SOL_MINT )){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT ] = []
  ss2[USDC_MINT+ " <-> " + SOL_MINT] = lookupTableAddress
  console.log('blarg')
  fs.writeFileSync('./ss2.json', JSON.stringify(ss2))
}
else {
  lookupTableAddress = new PublicKey(ss2[USDC_MINT+ " <-> " + SOL_MINT] )
  dontgo1 = true 
}
    const token = new Token(connection, new PublicKey(reserve.config.liquidityToken.mint), TOKEN_PROGRAM_ID, payer);

    const delegate = Keypair.generate();
    try {
     //token.approve(tokenAccount, delegate.publicKey, payer, [], 100000000);
    } catch (err){

    }
    let tx = new Transaction();
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
let auxAccount = Keypair.generate()
  let signers = []
    await Promise.all(
      [usdcToSol.data[0]].map(async (route) => {
        const { setupTransaction, swapTransaction, cleanupTransaction } =
          await getTransaction(route);
          


        await Promise.all(
          [setupTransaction, swapTransaction, cleanupTransaction]
            .filter(Boolean)
            .map(async (serializedTransaction) => {
              // get transaction object from serialized transaction
              const transaction = Transaction.from(
                Buffer.from(serializedTransaction, "base64")
              );
try {
instructions.push(...transaction.instructions)
if (transaction.signers){
if (transaction.signers.length > 0){
signers.push(...transaction.signers )
}
}
} catch (err){
console.log(err)
}  
// perform the swap
              // Transaction might failed or dropped
              
            })
            
        );
      
      })
      
    )
    
             // get routes based on from Token amount 10 USDC -> ? PRISM
             try {
let swapTransaction = await prism.generateSwapTransactions(routes[0]);        // execute swap (sign, send and confirm transaction)
//console.log(swapTransaction)
await Promise.all(
  [swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
    .filter(Boolean)
    .map(async (serializedTransaction) => {
      instructions.push(...serializedTransaction.instructions)
    }))

;  var blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
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
    blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
          // create v0 compatible message
  const messageV0 = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();
  blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let aaa = 0
let ss = []
let dg1 = false 
let dg2 = false 
let dg3 = false 
for (var bca of messageV0.staticAccountKeys){
if (aaa < messageV0.staticAccountKeys.length / 3){
  aaa++
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca)){
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
if (aaa < messageV0.staticAccountKeys.length / 3 * 2  && (aaa >= messageV0.staticAccountKeys.length / 3  )){
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca)){
    somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
  ss.push(bca)  
  fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))

  }

}
}
console.log(ss.length)
if (ss.length == 0){
  dg2 = true
}
const extendInstruction2 = AddressLookupTableProgram.extendLookupTable({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: ss
  
});
ss = []

aaa = 0
for (var bca of messageV0.staticAccountKeys){
  aaa++
if (aaa >= messageV0.staticAccountKeys.length / 3 * 2   ){
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca)){
    somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
   ss.push(bca) 
   fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))

  }}
}
console.log(ss.length)
if (ss.length == 0){
  dg3 = true
}
const extendInstruction3 = AddressLookupTableProgram.extendLookupTable({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: ss
  
});
let ix2 =  [lookupTableInst,extendInstruction, extendInstruction2, extendInstruction3]

let tx2 = new Transaction()
tx2.add(ix2[0])
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)

if (!dontgo1){
try{
  await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
} catch (err){
    
}
}
 tx2 = new Transaction()
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
    
}
}
tx2 = new Transaction()

tx2.add(ix2[2])
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)
if (!dg2){
try {
await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
} catch (err){
    
}
}
tx2 = new Transaction()
tx2.add(ix2[3])
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)
if (!dg3){
  try {
await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: true})
  } catch (err){

  }
}
console.log(2)
await sleep(3000)
const lookupTableAccount = await connection
  .getAddressLookupTable(lookupTableAddress)
  .then((res) => res.value);
console.log(lookupTableAccount)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
const messageV00 = new TransactionMessage({
  payerKey: wallet.publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message([lookupTableAccount]);
  const transaction = new VersionedTransaction(messageV00);
  // sign your transaction with the required `Signers`
 await transaction.sign([payer, delegate, ...swapTransaction.preSigners])
 console.log(transaction)
 try {
  await sendAndConfirmTransaction(connection, transaction)
 } catch (err){
  console.log(err)
 }
} catch (err){
console.log(err)
}
}
} catch (err){
  
console.log(err)
}
}
}
}
