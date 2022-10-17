import { AddressLookupTableProgram, Connection, GetProgramAccountsConfig, PublicKey } from "@solana/web3.js"
const PromisePool = require("@supercharge/promise-pool").default;

import fs from 'fs'
setTimeout(async function(){
  const connection2 = new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr");

var connection =  new Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr")
const configOrCommitment: GetProgramAccountsConfig = {
    commitment: 'confirmed',
    filters: [
     
    ],
  };
let myluts: any = {}
    let luts = await connection.getProgramAccounts(AddressLookupTableProgram.programId)
    console.log(luts)
    await PromisePool.withConcurrency(50)
    .for(luts)
    // @ts-ignore
    .handleError(async (err, asset) => {
      console.error(`\nError uploading or whatever`, err.message);
      console.log(err);
    })
    // @ts-ignore
    .process(async (lut: any) => {
      let maybemine = await connection2.getAddressLookupTable(lut.pubkey)
      if (maybemine.value?.state.authority?.toBase58()== ("5kqGoFPBGoYpFcxpa6BFRp3zfNormf52KCo5vQ8Qn5bx"))
      {

        let temp = ""
        for (var abc of maybemine.value.state.addresses){
          temp+=(abc.toBase58() + ",")
        }
     myluts[ temp ] = lut.pubkey
      }
    })
    fs.writeFileSync('./luts.json', 
JSON.stringify(myluts))
})
