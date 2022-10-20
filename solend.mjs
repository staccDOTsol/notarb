import { Connection, PublicKey, Keypair, AddressLookupTableProgram, TransactionMessage, Transaction, sendAndConfirmTransaction, VersionedTransaction} from "@solana/web3.js";
import { borrowObligationLiquidityInstruction, flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction, parseObligation, refreshObligationInstruction, refreshReserveInstruction, SolendAction, SolendMarket, SolendReserve, SOLEND_PRODUCTION_PROGRAM_ID } from "@solendprotocol/solend-sdk";
import { FanoutClient , MembershipModel} from '@glasseaters/hydra-sdk'
import fs from 'fs'
import { findWhere, map } from 'underscore';

import got from "got";
import { Prism } from "@prism-hq/prism-ag";
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN, sleep } from "@blockworks-foundation/mango-client";
process.on('SIGTERM', function (signal) {
  console.log("Process ".concat(process.pid, " received a SIGTERM signal"));
  process.exit(0);
});
process.on('SIGINT', function (signal) {
  console.log("Process ".concat(process.pid, " has been interrupted"));
  process.exit(0);
});
const getTransaction = (route) => {
  return got
    .post("https://quote-api.jup.ag/v1/swap", {
      json: {
        route: route,
        userPublicKey: payer.publicKey.toString(),
        // to make sure it doesnt close the sol account
        wrapUnwrapSOL: false,
      },
    })
    .json();
};

const getCoinQuote2 = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=0.99&onlyDirectRoutes=true`
    )
    .json();

const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=0.99&onlyDirectRoutes=true`
    )
    .json();

let somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())

const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/notjaregm.json').toString()))));
// 1. Initalize market with parameters and metadata
let initial = 3  * 10 ** 6;
var connection2= new Connection("https://solana-mainnet.g.alchemy.com/v2/IWB_lF5cQVi-HfV19leFFMitqWKG2gp4", {skipPreflight: false});

var connection =  new Connection("http://localhost:8899", {skipPreflight: false});
const market = await SolendMarket.initialize(
  connection,
  "production", // optional environment argument
);
console.log(market.reserves.map((reserve) => reserve.config.loanToValueRatio));

// 2. Read on-chain accounts for reserve data and cache
await market.loadReserves();
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const sms = ["iJF17JCu78E51eAgwtCwvgULHh2ZqCeRrcFP7wgcc6w", "jLPrgumWu7RBkja5gnw9BYtYvMq5sKWZFqY5QqwPhnf"];
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

const delegate = Keypair.generate();

const token = new Token(connection2, new PublicKey(reserve.config.liquidityToken.mint), TOKEN_PROGRAM_ID, payer);
console.log(1)
// token.approve(tokenAccount, payer, [], initial );
console.log(2)

const slot = await connection.getSlot();

let [lookupTableInst, lookupTableAddress] =
  AddressLookupTableProgram.createLookupTable({
    authority: payer.publicKey,
    payer: payer.publicKey,
    recentSlot: slot,
  });
  lookupTableAddress = new PublicKey("DLAb59s835vSPmtYms4zSWMMh5QiwDS2AZyDZYBDdmqn")
while (true){
  for (var SOL_MINT of sms){
    try {
  const usdcToSol = await getCoinQuote(USDC_MINT, SOL_MINT, Math.floor(initial  ));
  let route = usdcToSol.data[0]
for (var data of usdcToSol.data){
route = data 

}
await sleep(1000)
  const solToUsdc = await getCoinQuote2(
    SOL_MINT,
    USDC_MINT,
    Math.floor(route.outAmount * 0.65)
  );
     // execute swap (sign, send and confirm transaction)
//console.log(swapTransaction)

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
  instructions = []
  console.log(solToUsdc.data[0].outAmount)
let signers2 = []
// when outAmount more than initial
if (true){//solToUsdc.data[0].outAmount > initial) {
  await Promise.all(
    [route, solToUsdc.data[0]].map(async (route) => {
      const { setupTransaction, swapTransaction, cleanupTransaction } =
        await getTransaction(route);
        try {
signers2.push(...swapTransaction.preSigners)
        } catch (err){

        }
      await Promise.all(
        [setupTransaction, swapTransaction, cleanupTransaction]
          .filter(Boolean)
          .map(async (serializedTransaction) => {
            // get transaction object from serialized transaction
            const transaction = Transaction.from(
              Buffer.from(serializedTransaction, "base64")
            );
            // perform the swap
            // Transaction might failed or dropped
            instructions.push(...transaction.instructions)
         
          })
      );
    })
  );
}
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
// Assumption:
// `payer` is a valid `Keypair` with enough SOL to pay for the execution
var blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);

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
let dg1 = false 
let dg2 = false 
let dg3 = false 
let ssa = []
if (!Object.keys(somestuff).includes(USDC_MINT+ " <-> " + SOL_MINT)){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT] = []
}
for (var bca of messageV0.staticAccountKeys){
if (aaa < messageV0.staticAccountKeys.length / 2){
  aaa++
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
ssa.push(bca)
fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))
  }
}
}
console.log(ssa.length)
if (ssa.length == 0){
  dg1 = true
}
const extendInstruction = AddressLookupTableProgram.extendLookupTable({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: ssa
  
});
ssa = []
aaa = 0
for (var bca of messageV0.staticAccountKeys){
  aaa++
  if (aaa >= messageV0.staticAccountKeys.length / 2){
    if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
  ssa.push(bca)
  fs.writeFileSync('./stuff.json', JSON.stringify(somestuff))
    }
  }
  }
  console.log(ssa.length)
  if (ssa.length == 0){
    dg1 = true
  }
  const extendInstruction2 = AddressLookupTableProgram.extendLookupTable({
    payer: payer.publicKey,
    authority: payer.publicKey,
    lookupTable: lookupTableAddress,
    addresses: ssa
    
  });
let ix2 =  [lookupTableInst,extendInstruction, extendInstruction2]


if (!true){
  let tx2 = new Transaction()
  tx2.add(ix2[0])
  console.log(1)
  blockhash = await connection
      .getLatestBlockhash()
      .then((res) => res.blockhash);
  tx2.recentBlockhash = blockhash
  tx2.sign(payer)
  try {
    
  sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
if (false){
try {
  
sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
if (false){
try {
  
sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
 let signers = [payer,...signers2]//, ...swapTransactionmm.preSigners, ...swapTransactionm.preSigners, ...swapTransactionp.preSigners

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
  }
catch (err){
  console.log(err)
}
await sleep(5000)
  }
}