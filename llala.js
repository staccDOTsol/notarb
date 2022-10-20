// dont forget to tip jaregm.sol
/* nice. if >0 it transfers em out - this is key mafamilia, 
it allows you to recover anything (at least something) 
from your phrases that you may have things left over in - whether you forgot about this wallet or maybe it was compromised yet there are tokens of any kind there (including nfts) phrases that ppl haven't grabbed - even fraction sol from closin empty accounts (iteratlive, concurrently)
I started w 32 tokens and 0.05 sol, after doing this script a few times (and inbetween buying a bonfida name) I now have 267 token accounts, 0.45 sol :) nice :)
:)

*/ 


const solanaWeb3 = require("@solana/web3.js");
const bip39 = require("bip39");
const ed = require("ed25519-hd-key");
const nacl = require("tweetnacl");
const fs = require("fs");
const utils = require("@strata-foundation/spl-utils");
const splutils = require("@solana/spl-token");
const PromisePool = require("@supercharge/promise-pool").default;
const jaregm = solanaWeb3.Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      fs.readFileSync("/home/ubuntu/.config/solana/id.json").toString()
    )
  )
);
const mnemonics = JSON.parse(
  fs.readFileSync("/home/ubuntu/mem.ts").toString()
); //forgot n lol
const connection = new solanaWeb3.Connection(
  "https://solana--mainnet.datahub.figment.io/apikey/2", //hahalolhaha
  "confirmed"
);
let hydras: number[] = [];
for (var i = 0; i <= 350; i++) {
  hydras.push(i); // lol
}
setTimeout(async function () {
 await PromisePool.withConcurrency(mnemonics.length)
    .for(mnemonics)
    // @ts-ignore
    .handleError(async (err, asset) => {
      console.error(`\nError uploading or whatever`, err.message);
      console.log(err);
    })
    // @ts-ignore
    .process(async (mnemonic) => {
  await PromisePool.withConcurrency(hydras.length)
    .for(hydras)
    // @ts-ignore
    .handleError(async (err, asset) => {
      console.error(`\nError uploading or whatever`, err.message);
      console.log(err);
    })
    // @ts-ignore
    .process(async (i) => {
      var ran = i * 200 * mnemonics.lengthle
      await utils.sleep(ran);
      console.log(ran);
      const path = "m/44'/501'/" + i.toString() + "'/0'";
      for (var mnemonic of mnemonics) {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const derivedSeed = ed.derivePath(path, seed.toString("hex")).key;
        const account = new solanaWeb3.Account(
          nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        );
        const keypair = solanaWeb3.Keypair.fromSecretKey(account.secretKey);
        if (keypair.publicKey.toBase58() != "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm"){
        const hm = await connection.getSignaturesForAddress(keypair.publicKey);

        if (hm.length > 0) {
          const bal = await connection.getBalance(keypair.publicKey);
          //console.log(keypair.publicKey.toBase58());
          if (bal > 0) {
            console.log(bal / 10 ** 9);
            const transferTransaction = new solanaWeb3.Transaction().add(
              solanaWeb3.SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: jaregm.publicKey,
                lamports: bal - 0.000005 * 10 ** 9,
              })
            );
            await solanaWeb3.sendAndConfirmTransaction(
              connection,
              transferTransaction,
              [keypair]
            );
          }
        }

        const accounts = await connection.getParsedProgramAccounts(
          new solanaWeb3.PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
          {
            filters: [
              {
                dataSize: 165, // number of bytes
              },
              {
                memcmp: {
                  offset: 32, // number of bytes
                  bytes: keypair.publicKey.toBase58(), // base58 encoded string
                },
              },
            ],
          }
        );

        const accounts2 = await connection.getParsedProgramAccounts(
          new solanaWeb3.PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
          {
            filters: [
              {
                dataSize: 165, // number of bytes
              },
              {
                memcmp: {
                  offset: 32, // number of bytes
                  bytes: jaregm.publicKey.toBase58(), // base58 encoded string
                },
              },
            ],
          }
        );
        let c = 0;
        accounts.forEach(async (account: any, i: any) => {
          
         if (
            account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"] > 0
          ) {

            console.log(account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"] )
            let tokenMint = await splutils.getMint(connection,new solanaWeb3.PublicKey(account.account.data.parsed.info.mint))
           // console.log(tokenMint)

    let tokenAccount = solanaWeb3.Keypair.generate();
let feePayer = jaregm 
try {
    if (account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"] > 1){
    console.log(`ramdom token address: ${tokenAccount.publicKey.toBase58()}`);

    let tx = new solanaWeb3.Transaction();
    tx.feePayer = keypair.publicKey
    tx.add(
      // create account
      solanaWeb3.SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: tokenAccount.publicKey,
        space: splutils.ACCOUNT_SIZE,
        lamports: await splutils.getMinimumBalanceForRentExemptAccount(connection),
        programId: splutils.TOKEN_PROGRAM_ID,
      }),
      // init token account
      splutils.createInitializeAccountInstruction(tokenAccount.publicKey, new solanaWeb3.PublicKey(account.account.data.parsed.info.mint), keypair.publicKey)
    );

let hm1 = await solanaWeb3.sendAndConfirmTransaction(
              connection,
              tx,
              [keypair, tokenAccount, jaregm]
            );
console.log(hm)
  }

else {
  // 2. ATA
  let ata: any 


try {
 
  let ata = await splutils.createAssociatedTokenAccount(
    connection, // connection
    jaregm, // fee payer
     new solanaWeb3.PublicKey(account.account.data.parsed.info.mint), // mint
    jaregm.publicKey // owner,
  );
         let bla =   await splutils.transferChecked(
    connection, // connection
    jaregm, // payer
    new solanaWeb3.PublicKey(account.pubkey), // from (should be a token account)
    new solanaWeb3.PublicKey(account.account.data.parsed.info.mint), // mint
    ata.publicKey, // to (should be a token account)
    keypair, // from's owner
 account.account.data["parsed"]["info"]["tokenAmount"]["amount"] ,account.account.data["parsed"]["info"]["tokenAmount"]["decimals"] 
  );
          console.log(bla)
          { 
                let tx = new solanaWeb3.Transaction().add(
                  splutils.createCloseAccountInstruction(
                    account.pubkey, // token account which you want to close
                    jaregm.publicKey, // destination
                    keypair.publicKey // owner of token account
                  )
                ); 
                await solanaWeb3.sendAndConfirmTransaction(connection, tx, [
                  jaregm,
                  keypair,
                ]); 
              }
        }catch(err){
          let anacc: any

                  accounts2.forEach(async (account2: any, i: any) => {
if (account.account.data.parsed.info.mint == account2.account.data.parsed.info.mint){
anacc = account2
}
})
           ata = await splutils.getAccount(connection, new solanaWeb3.PublicKey(anacc.pubkey));

         let bla =   await splutils.transferChecked(
    connection, // connection
    jaregm, // payer
    new solanaWeb3.PublicKey(account.pubkey), // from (should be a token account)
    new solanaWeb3.PublicKey(account.account.data.parsed.info.mint), // mint
    ata.address, // to (should be a token account)
    keypair, // from's owner
    account.account.data["parsed"]["info"]["tokenAmount"]["amount"] ,account.account.data["parsed"]["info"]["tokenAmount"]["decimals"] 
  );
          console.log(bla)
          { 
                let tx = new solanaWeb3.Transaction().add(
                  splutils.createCloseAccountInstruction(
                    account.pubkey, // token account which you want to close
                    jaregm.publicKey, // destination
                    keypair.publicKey // owner of token account
                  )
                ); 
                await solanaWeb3.sendAndConfirmTransaction(connection, tx, [
                  jaregm,
                  keypair,
                ]); 
              }
        }

  
}
} catch (err){
  console.log(err)
  console.log('already have ata duh')
}
         



        }else if (
            account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"] ==
            0
          ) {
            c++;
            try {
              { 
                let tx = new solanaWeb3.Transaction().add(
                  splutils.createCloseAccountInstruction(
                    account.pubkey, // token account which you want to close
                    jaregm.publicKey, // destination
                    keypair.publicKey // owner of token account
                  )
                ); 
                await solanaWeb3.sendAndConfirmTransaction(connection, tx, [
                  jaregm,
                  keypair,
                ]); 
              }
            } catch (err) {
              console.log(err);
            }
          }
      })
    

        if (c > 0) {
          console.log(keypair.publicKey.toBase58() + ": " + c.toString());
          // 1) use build-in function
        }
      }
      }

})
})
  /*
     
  */
  /*
      for (var i in accounts.value){
      const balance = await connection.getTokenAccountBalance(accounts.value[i].pubkey)
      console.log(balance)

      if (balance.value.uiAmount){
      if (balance.value.uiAmount >= 0){
          if (!goodhs.includes(tasty.pubkey.toBase58())){
        goodhs.push(tasty.pubkey.toBase58())
        console.log(goodhs.length)
        console.log(fo.name.toLowerCase() + ' is ' + tasty.pubkey.toBase58() + ': ' + balance.value.uiAmountString)
        
          }
       fs.writeFileSync('./goodhs.json', JSON.stringify(goodhs))


  }

    } */
});