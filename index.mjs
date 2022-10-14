
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
const connection = new Connection("http://localhost:8899", {skipPreflight: true});
const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr", {skipPreflight: true});
const wallet = new Wallet(
  Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/notjaregm.json').toString()))));
  const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/notjaregm.json').toString()))));
    const payer2 = (
      Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/jaregm.json').toString()))));


import fs from 'fs'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


let myluts = JSON.parse(fs.readFileSync("./luts.json").toString())

const somestuff2 = JSON.parse(fs.readFileSync("./hahapairs.json").toString())

const has = [
    //"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    //"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 
    //"USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
    //"Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
    //"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
]

var mints = [   
 "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"]
 // "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 
 // "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
 // "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
  //"7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",]

 mints = [   //"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
  "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT"]
for (var add of somestuff2.data){
for (var address of add.token){
mints.push(address.address)
}
}
console.log(mints.length)
const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=5&swapMode=ExactIn&onlyDirectRoutes=true`
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
    slippage:5,
    user: payer,               // optional (if you don't provide upon init, then you'll need to call prism.setSigner() after user connects the wallet)
connection: new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
    // rpc connection
});
for (var USDC_MINT of has){
 // abc++
  for (var SOL_MINT of mints){
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
    const instructions = [];

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
  await sleep(Math.random() * 5000)
//  await createWSolAccount();

  let abc = -1
  for (var USDC_MINT of has){
    let cba = -1
    abc++
    for (var SOL_MINT of mints){
      cba++
      console.log(USDC_MINT+ " <-> " + SOL_MINT)
      try {
let dec = 6

   initial = Math.floor(Math.random() * 80* 10 ** dec + 20.02666 * 10 ** dec);
   //console.log(initial / 10 ** dec)
  // 0.1 SOL
  await prism.loadRoutes(USDC_MINT, SOL_MINT, true); 

let routes = prism.getRoutes(Math.floor(initial) / 10 ** dec);
let route 
var m  = 0
for (var r of routes.reverse()){
  if (r.type != "direct"){
  //  console.log(r)
  }
//  console.log(r.providers.length)
  if (r.amountWithFees > m ){
      
      m = r.amountOut
      route = r 
    }
}
  let aa2 = Math.floor(Math.random()*0.5) 
  let aa1 = Math.floor(Math.random()*0.5)
const usdcToSol = await getCoinQuote( SOL_MINT, USDC_MINT, Math.floor(route.amountOut * 0.99 * 10 ** route.routeData.toCoin.decimals)); // goddamn slippage
console.log(usdcToSol.data[aa2])
console.log(usdcToSol.data[aa2].outAmount)   
console.log(route.amountOut)
var returns = ((((usdcToSol.data[aa2].outAmount * 1.01 )/ (initial  ))- 1))
console.log(returns)
  if (returns > 0.00025){
  console.log(USDC_MINT+ " <-> " + SOL_MINT + "@ " + (initial / 10 ** dec).toString() + ": " + (Math.round(returns * 10000) / 10000) + '%')
  }
  // when outAmount more than initial
  if (returns >.00025 ) {

 let   instructions = []
  let signers = []

    
             // get routes based on from Token amount 10 USDC -> ? PRISM
             try {
              let swapTransaction = await prism.generateSwapTransactions(route);        // execute swap (sign, send and confirm transaction)
              //console.log(swapTransaction)
              await Promise.all(
                [swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
                  .filter(Boolean)
                  .map(async (serializedTransaction) => {
                    instructions.push(...serializedTransaction.instructions)
                  }))
              
    await Promise.all(
      [usdcToSol.data[aa2]].map(async (route) => {
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
;  var blockhash = await connection
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
 await transaction.sign([payer,payer2, ...swapTransaction.preSigners])
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

