
import dotenv from "dotenv";
import { IDS, MangoClient, Config, I80F48, makeWithdrawInstruction, makeDepositInstruction, getMarketIndexBySymbol  } from '@blockworks-foundation/mango-client';

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
const connection = new Connection("http://localhost:8899", {skipPreflight: false});
const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr", {skipPreflight: false});
const wallet = new Wallet(
  Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/notjaregm.json').toString()))));
  const payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/home/ubuntu/notjaregm.json').toString()))));
import { SolendAction, SolendMarket, SolendWallet, flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction, SOLEND_PRODUCTION_PROGRAM_ID } from "@solendprotocol/solend-sdk";
import * as anchor from '@project-serum/anchor';

import fs from 'fs'
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const somestuff2 = JSON.parse(fs.readFileSync("./hahapairs.json").toString())

const has = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
]
let somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())

let ss2 = JSON.parse(fs.readFileSync('./ss2.json').toString())
let ss3 = JSON.parse(fs.readFileSync('./ss3.json').toString())

let mints = [   
"mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"]

for (var add of somestuff2.data){
for (var address of add.tokens){
//mints.push(address.address)
}
}
console.log(mints.length)
const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=5&swapMode=ExactIn`
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
      feePayer: wallet.publicKey,
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
    const result = await connection.sendTransaction(transaction, [
      wallet.payer,
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
      cba++
      console.log(USDC_MINT+ " <-> " + SOL_MINT)
      try {
      const tokenAccount = (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(USDC_MINT)})).value[0].pubkey //new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
      let dec = ((await connection.getTokenAccountBalance(tokenAccount)).value.decimals)

      const tokenAccount2 =   (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(SOL_MINT)})).value[0].pubkey //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
      let dec2 = ((await connection.getTokenAccountBalance(tokenAccount2)).value.decimals)
   initial = 10_000_000 * 10 ** 6 //.floor(Math.random() * 40.38* 10 ** dec2 + 1.02666 * 10 ** dec2);
   //console.log(initial / 10 ** dec)
  // 0.1 SOL
  await prism.loadRoutes(SOL_MINT, USDC_MINT); 

let routes = prism.getRoutes(Math.floor(initial) / 10 ** dec2);
  let aa2 = Math.floor(Math.random()*2) 
  let aa1 = Math.floor(Math.random()*2)
const usdcToSol = await getCoinQuote(USDC_MINT, SOL_MINT, Math.floor(routes[aa2].amountOut  * 10 ** dec2));
console.log(routes[aa1].amountOut )
console.log(usdcToSol.data[aa2].outAmount)   
var returns = ((((usdcToSol.data[aa2].outAmount / 10  ** dec2 )/ (initial / 10 ** dec ))- 1))
console.log(returns)
  if (returns > -100.0){
  console.log(USDC_MINT+ " <-> " + SOL_MINT + "@ " + (initial / 10 ** dec).toString() + ": " + (Math.round(returns * 10000) / 10000) + '%')
  }
  // when outAmount more than initial
  if (returns >-100.0 ) {
  
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
  let lookupTableAddress2

//  lookupTableAddress = new PublicKey("7XH2JSueLJMTuDLE67Qw92KKwAdLjggszDSN5GVoK3qD")
//lookupTableAddress = new PublicKey("H3pPX8AYP2neyH6AL5mPZmcEWzCbKEU22gWUpY8JASu5")
console.log("lookup table address:", lookupTableAddress.toBase58());
let dontgo1 = false
let ranran = Math.random()
if (Object.keys(ss3).includes(USDC_MINT+ " <-> " + SOL_MINT )){
  lookupTableAddress = new PublicKey(ss3[USDC_MINT+ " <-> " + SOL_MINT] )
  dontgo1 = true
}if (Object.keys(ss2).includes(USDC_MINT+ " <-> " + SOL_MINT )){
  lookupTableAddress2 = new PublicKey( ss2[USDC_MINT+ " <-> " + SOL_MINT] )
  dontgo1 = true
}
else 
if (!Object.keys(ss3).includes(USDC_MINT+ " <-> " + SOL_MINT  ) && ranran < 0.5){
  
  ss3[USDC_MINT+ " <-> " + SOL_MINT] = lookupTableAddress
  console.log('blarg')

 ss2 = JSON.parse(fs.readFileSync('./ss2.json').toString())
 ss3 = JSON.parse(fs.readFileSync('./ss3.json').toString())
  fs.writeFileSync('./ss3.json', JSON.stringify(ss3))
}
else if  (!Object.keys(ss2).includes(USDC_MINT+ " <-> " + SOL_MINT ) && ranran >= 0.5){
  
  ss2[USDC_MINT+ " <-> " + SOL_MINT] = lookupTableAddress
  console.log('blarg2')

 ss2 = JSON.parse(fs.readFileSync('./ss2.json').toString())
 ss3 = JSON.parse(fs.readFileSync('./ss3.json').toString())
  fs.writeFileSync('./ss2.json', JSON.stringify(ss2))
}

    const token = new Token(connection, new PublicKey(reserve.config.liquidityToken.mint), TOKEN_PROGRAM_ID, payer);

    const delegate = Keypair.generate();
    try {
     token.approve(tokenAccount, delegate.publicKey, payer, [], initial * 1.01);
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
    instructions = []
let auxAccount = Keypair.generate()
  let signers = []

    
             // get routes based on from Token amount 10 USDC -> ? PRISM
             try {
              let swapTransaction = await prism.generateSwapTransactions(routes[aa1]);        // execute swap (sign, send and confirm transaction)
              //console.log(swapTransaction)
              await Promise.all(
                [swapTransaction.preTransaction, swapTransaction.mainTransaction, swapTransaction.postTransaction]
                  .filter(Boolean)
                  .map(async (serializedTransaction) => {
                    instructions.push(...serializedTransaction.instructions)
                  }))

                  const cluster = 'mainnet';
                  const group = 'mainnet.1';
                  
                  const config = new Config(IDS);
                  const groupConfig = config.getGroup(cluster, group);
                  if (!groupConfig) {
                      throw new Error("unable to get mango group config");
                    }
                  const mangoGroupKey = groupConfig.publicKey;
                  
                  const clusterData = IDS.groups.find((g) => {
                      return g.name == group && g.cluster == cluster;
                    });
                  const mangoProgramIdPk = new PublicKey(clusterData.mangoProgramId);
                  
                  const clusterUrl = IDS.cluster_urls[cluster];
                  const connection = new Connection(clusterUrl, 'singleGossip');
                  const client = new MangoClient(connection, mangoProgramIdPk);
                  const mangoGroup = await client.getMangoGroup(mangoGroupKey);
                let tokenIndex =  mangoGroup.getTokenIndex(new PublicKey(SOL_MINT) )
                let tokenIndex2 =  mangoGroup.getTokenIndex(new PublicKey(USDC_MINT) )

                const vault =
                mangoGroup.rootBankAccounts?.[tokenIndex]?.nodeBankAccounts[0].vault
            
                // fetch total deposits/borrows, deposit and borrow interest rates, as well as percent utilization of each token in the group

    const myMangoAccountAddress = '5LCvTB7XxJZ5VVjMdCujd2Qmq4Z76B7dkgjgQsbuc2rh';

    const serumProgramIdPk = new PublicKey(clusterData.serumProgramId);
    
    
    const myMangoAccountPubKey = new PublicKey(myMangoAccountAddress);
    const myMangoAccount = await client.getMangoAccount(myMangoAccountPubKey, serumProgramIdPk);
                  client
instructions.push(                  await  makeDepositInstruction(
                    mangoGroup,
                    myMangoAccount,
                    wallet.adapter,
                    mangoGroup.tokens[tokenIndex].rootBank,
                    myMangoAccountPubKey,
                    vault,
                    tokenAccount2.publicKey,
                    Number(((await connection.getTokenAccountBalance(tokenAccount2)).value.amount))
                  )
)/*            this.programId,
            mangoGroup.publicKey,
            mangoAccount.publicKey,
            payer.publicKey,
            mangoGroup.mangoCache,
            rootBank.publicKey,
            rootBank.nodeBanks[0],
            rootBank.nodeBankAccounts[0].vault,
            tokenAcc,
            mangoGroup.signerKey,
            mangoAccount.spotOpenOrders,
            U64_MAX_BN,
            false,
*/
for (const rootBank of mangoGroup.rootBankAccounts) {

console.log(rootBank)
}
console.log(rootBank)
              instructions.push(await makeWithdrawInstruction(
                new PublicKey("mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68"),
                //programId, mangoGroupPk, mangoAccountPk,
              // walletPk, mangoCachePk, rootBankPk, nodeBankPk, vaultPk, tokenAccPk, signerKey, openOrders, nativeQuantity, allowBorrow) {
                mangoGroup,
                myMangoAccount,
                wallet.publicKey,
                mangoGroup.mangoCache,
                mangoGroup.tokens[tokenIndex2].rootBank.publicKey,
                rootBank.nodeBanks[0],
                rootBank.nodeBankAccounts[0].vault,
                tokenAccount2,
                mangoGroup.signerKey,
                myMangoAccount.spotOpenOrders,
                Number(((await connection.getTokenAccountBalance(tokenAccount2)).value.amount) * 0.555 * 33),
           
                true
              ))
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
    
    //instructions.push(Token.createTransferInstruction(TOKEN_PROGRAM_ID,tokenAccount, tokenAccount, payer.publicKey, [], parseInt(initial * 1.00001)))
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
          console.log(instructions)
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
if (!Object.keys(somestuff).includes(USDC_MINT+ " <-> " + SOL_MINT)){
  somestuff[USDC_MINT+ " <-> " + SOL_MINT] = []
}
for (var bca of messageV0.staticAccountKeys){
if (aaa < messageV0.staticAccountKeys.length / 3){
  aaa++
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
ss.push(bca)
 somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())
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
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
    somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
  ss.push(bca)  
  somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())
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
  if (!somestuff[USDC_MINT+ " <-> " + SOL_MINT ].includes(bca.toBase58())){
    somestuff[USDC_MINT+ " <-> " + SOL_MINT ].push(bca)
   ss.push(bca) 
   somestuff = JSON.parse(fs.readFileSync('./stuff.json').toString())
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
  await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
  
let hm = await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
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
await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
  } catch (err){

  }
}
console.log(2)
await sleep(3000)
const lookupTableAccount = await connection
  .getAddressLookupTable(lookupTableAddress)
  .then((res) => res.value);
  let  lookupTableAccount2 =  lookupTableAccount
  
  try {
  lookupTableAccount2 = 
   await connection
    .getAddressLookupTable(lookupTableAddress2)
    .then((res) => res.value);
  }
  catch (err){}
console.log(lookupTableAccount)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
let messageV00 
try { messageV00 =  new TransactionMessage({
  payerKey: wallet.publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message([lookupTableAccount, lookupTableAccount2]);
} catch (err){
  try 
  {
  messageV00 =  new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message([lookupTableAccount]);
  }
  catch (err){
    try {

  messageV00 =  new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message([lookupTableAccount2]);

    }
    catch (err){

    }
  }
}
  const transaction = new VersionedTransaction(messageV00);
  // sign your transaction with the required `Signers`
 await transaction.sign([payer, ...swapTransaction.preSigners])
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
