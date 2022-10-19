import { AddressLookupTableProgram, Connection, GetProgramAccountsConfig, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js"
const PromisePool = require("@supercharge/promise-pool").default;

import fs from 'fs'
setTimeout(async function(){
  const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr");
  var payer = (
    Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync((process.env.NODE_ENV == 'production' ? '/home/ubuntu' : '/Users/jarettdunn') + '/notjaregm.json').toString()))));
  
      var connection =  new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
const configOrCommitment: GetProgramAccountsConfig = {
    commitment: 'confirmed',
    filters: [
     
    ],
  };

let myluts: any = {}
while (true){

    let luts = await connection.getProgramAccounts(AddressLookupTableProgram.programId)
    console.log(luts)
    await PromisePool.withConcurrency(25)
    .for(luts)
    // @ts-ignore
    .handleError(async (err, asset) => {
      console.error(`\nError uploading or whatever`, err.message);
      console.log(err);
    })
    // @ts-ignore
    .process(async (lut: any) => {
      let maybemine = await connection2.getAddressLookupTable(lut.pubkey)
      if (maybemine.value?.state.authority?.toBase58()== (payer.publicKey.toBase58()))
      {
        // `payer` is a valid `Keypair` with enough SOL to pay for the execution
var blockhash = await connection
.getLatestBlockhash()
.then((res) => res.blockhash);
/*
let lookupTableInst0 =
  await AddressLookupTableProgram.deactivateLookupTable({lookupTable:
    /** Address lookup table account to close. 
    lut.pubkey,
    /** Account which is the current authority.
    authority:
    payer.publicKey,}
);
let lookupTableInst =
  await AddressLookupTableProgram.closeLookupTable({lookupTable:
    /** Address lookup table account to close. 
    lut.pubkey,
    /** Account which is the current authority. 
    authority:
    payer.publicKey,
    /** Recipient of closed account lamports.
    recipient:
    payer.publicKey}
);

let tx2 = new Transaction()
tx2.add(lookupTableInst0)
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)

try{
  await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
} catch (err){
    
console.log(err)
}

 tx2 = new Transaction()
tx2.add(lookupTableInst)
console.log(1)
blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
tx2.recentBlockhash = blockhash
tx2.sign(payer)

try{
  await sendAndConfirmTransaction(connection, tx2,[payer], {skipPreflight: false})
} catch (err){
    
console.log(err)
}
 */

        let temp = ""
        for (var abc of maybemine.value.state.addresses){
          temp+=(abc.toBase58() + ",")
        }
     myluts[ temp ] = lut.pubkey
      }
    })
    fs.writeFileSync('./luts.json', 
JSON.stringify(myluts))
  }
})
