import dotenv from "dotenv";
import bs58 from "bs58";
import {
  borrowObligationLiquidityInstruction,
  flashBorrowReserveLiquidityInstruction,
  flashRepayReserveLiquidityInstruction,
  parseObligation,
  refreshObligationInstruction,
  refreshReserveInstruction,
  SolendAction,
  SolendMarket,
  SolendReserve,
  SOLEND_PRODUCTION_PROGRAM_ID,
} from "@solendprotocol/solend-sdk";
let baddies = JSON.parse(fs.readFileSync("./baddies.json").toString());
import {
  Connection,
  Keypair,
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  sendAndConfirmTransaction,
  AddressLookupTableProgram,
} from "@solana/web3.js";
import got from "got";
import { Wallet } from "@project-serum/anchor";
import promiseRetry from "promise-retry";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as Token from "@solana/spl-token";
import * as splToken from "@solana/spl-token";
process.on("SIGTERM", (signal) => {
  console.log(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

process.on("SIGINT", (signal) => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});
console.log({ dotenv });
dotenv.config();
import { PromisePool } from "@supercharge/promise-pool";

setInterval(async function () {
  try {
    let connection = new Connection(
      (process.env.NODE_ENV == "production"
        ? "http://localhost"
        : "http://localhost") + ":8899",
      { skipPreflight: false }
    );
    const connection2 = new Connection(
      "https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr",
      { skipPreflight: true }
    );
    connection = connection2;

    let luts = await connection.getProgramAccounts(
      AddressLookupTableProgram.programId
    );
    // console.log(luts)
    await PromisePool.withConcurrency(50)
      .for(luts)
      // @ts-ignore
      .handleError(async (err, asset) => {
        console.error(`\nError uploading or whatever`, err.message);
        console.log(err);
      })
      // @ts-ignore
      .process(async (lut) => {
        let maybemine = await connection2.getAddressLookupTable(lut.pubkey);
        if (
          maybemine.value?.state.authority?.toBase58() ==
          "5kqGoFPBGoYpFcxpa6BFRp3zfNormf52KCo5vQ8Qn5bx"
        ) {
          let temp = "";
          for (var abc of maybemine.value.state.addresses) {
            temp += abc.toBase58() + ",";
          }
          myluts[temp] = lut.pubkey;
        }
      });
    fs.writeFileSync("./luts.json", JSON.stringify(myluts));
  } catch (err) {}
}, 5 * 60000);
// This is a free Solana RPC endpoint. It may have ratelimit and sometimes
// invalid cache. I will recommend using a paid RPC endpoint.
let connection = new Connection(
  (process.env.NODE_ENV == "production"
    ? "http://localhost"
    : "http://localhost") + ":8899",
  { skipPreflight: false }
);
const connection2 = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr",
  { skipPreflight: true }
);
connection = connection2;

const wallet = new Wallet(
  Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(
        fs
          .readFileSync(
            (process.env.NODE_ENV == "production"
              ? "/home/ubuntu"
              : "/Users/jarettdunn") + "/notjaregm.json"
          )
          .toString()
      )
    )
  )
);
const payer = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      fs
        .readFileSync(
          (process.env.NODE_ENV == "production"
            ? "/home/ubuntu"
            : "/Users/jarettdunn") + "/notjaregm.json"
        )
        .toString()
    )
  )
);

import fs from "fs";
import { createTransferInstruction } from "@solana/spl-token";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let myluts = JSON.parse(fs.readFileSync("./luts.json").toString());

const somestuff3 = JSON.parse(fs.readFileSync("./stuff.json").toString());

const has = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
  "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
];

var mints = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
  "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
];
for (var amarket of configs) {
  if (!amarket.hidden && !amarket.isPermissionless) {
    try {
      await sleep(Math.random() * 200);
      let market = await SolendMarket.initialize(
        connection,

        "production", // optional environment argument'
        amarket.address
      );

      markets.push(market);
      console.log(markets.length);
    } catch (err) {}
  }
}

// wsol account
const createWSolAccount = async (mint) => {
  try {
    const wsolAddress = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(mint),
      wallet.publicKey
    );

    let wsolAccount = await connection2.getAccountInfo(wsolAddress);

    if (!wsolAccount) {
      const transaction = new Transaction();
      const instructions = [];

      instructions.push(
        await Token.createAssociatedTokenAccountInstruction(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          new PublicKey(mint),
          wsolAddress,
          wallet.publicKey,
          wallet.publicKey
        )
      );

      transaction.add(...instructions);
      transaction.recentBlockhash = await (
        await connection2.getLatestBlockhash()
      ).blockhash;
      transaction.sign(payer);
      const result = await sendAndConfirmTransaction(connection2, transaction);
      console.log({ result });
    }
    wsolAccount = await connection2.getAccountInfo(wsolAddress);

    return wsolAddress;
  } catch (err) {
    console.log(err);
  }
};
let prev = new Date().getTime() / 1000;
let avgs = [];
while (true) {
  //await createWSolAccount();

  let abc = -1;
  for (var market of markets) {
    market = markets[Math.floor(Math.random() * markets.length)];
    await market.loadReserves();
    market.refreshAll();
    for (var reserve of market.reserves) {
      //["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "So11111111111111111111111111111111111111112"]){
      reserve =
        market.reserves[Math.floor(Math.random() * market.reserves.length)]; //market.reserves.find(res => res.config.liquidityToken.mint ===ç);
      var USDC_MINT = reserve.config.liquidityToken.mint;
      if (USDC_MINT != "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz") {
        //} && USDC_MINT != "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" ){
        try {
          var dec = reserve.config.liquidityToken.decimals;
          let min = reserve.stats.borrowFeePercentage * 100;

          let cba = -1;
          abc++;
          for (var SOL_MINT of mints) {
            SOL_MINT = mints[Math.floor(Math.random() * mints.length)];
            if (
              !baddies.includes(SOL_MINT + USDC_MINT) &&
              !baddies.includes(USDC_MINT + SOL_MINT)
            ) {
              let dothethings = [];
              cba++;
              try {
                const initial = Math.floor(
                  Math.random() *
                    (5 / reserve.stats.assetPriceUSD / min) *
                    10 ** dec
                );

                // 0.1 SOL
                try {
                  if (!baddies.includes(USDC_MINT + SOL_MINT)) {
                    let usdcToSol;
                    let solToUsdc;
                    try {
                      usdcToSol = await getCoinQuote(
                        USDC_MINT,
                        SOL_MINT,
                        initial
                      );
                      usdcToSol.data[0] = usdcToSol.data.find(
                        (res) => res.marketInfos.length <= 50
                      );
                      for (var mi of usdcToSol.data[0].marketInfos) {
                        try {
                          if (
                            !(
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.outputMint) }
                              )
                            ).value[0].pubkey
                          ) {
                            createWSolAccount(mi.outputMint);
                          }
                        } catch (err) {}
                      }
                    } catch (err) {
                      baddies.push(USDC_MINT + SOL_MINT);

                      let tbaddies = JSON.parse(
                        fs.readFileSync("./baddies.json").toString()
                      );
                      for (var b of baddies) {
                        if (!tbaddies.includes(b)) {
                          tbaddies.push(b);
                        }
                      }
                      fs.writeFileSync(
                        "./baddies.json",
                        JSON.stringify(tbaddies)
                      );
                    }
                    if (
                      usdcToSol.data[0] &&
                      !baddies.includes(SOL_MINT + USDC_MINT)
                    ) {
                      try {
                        solToUsdc = await getCoinQuote(
                          SOL_MINT,
                          USDC_MINT,
                          Math.floor(usdcToSol.data[0].outAmount * 0.997)
                        );

                        solToUsdc.data[0] = solToUsdc.data.find(
                          (res) => res.marketInfos.length <= 50
                        );
                        for (var mi of solToUsdc.data[0].marketInfos) {
                          try {
                            if (
                              !(
                                await connection2.getTokenAccountsByOwner(
                                  payer.publicKey,
                                  { mint: new PublicKey(mi.outputMint) }
                                )
                              ).value[0].pubkey
                            ) {
                              createWSolAccount(mi.outputMint);
                            }
                          } catch (err) {}
                        }
                      } catch (err) {
                        baddies.push(SOL_MINT + USC_MINT);

                        let tbaddies = JSON.parse(
                          fs.readFileSync("./baddies.json").toString()
                        );
                        for (var b of baddies) {
                          if (!tbaddies.includes(b)) {
                            tbaddies.push(b);
                          }
                        }
                        fs.writeFileSync(
                          "./baddies.json",
                          JSON.stringify(tbaddies)
                        );
                      }
                      try {
                        let returns =
                          (solToUsdc.data[0].outAmount / initial - 1) * 100;

                        let now = new Date().getTime() / 1000;
                        let diff = now - prev;
                        prev = now;
                        avgs.push(diff);
                        if (avgs.length > 60) {
                          avgs.slice(0);
                        }
                        let t = 0;
                        for (var avg of avgs) {
                          t += avg;
                        }
                        let nowavg = t / avgs.length;
                        if (new Date().getTime() % 100 <= 33)
                          console.log(
                            (
                              (initial / 10 ** dec) *
                              reserve.stats.assetPriceUSD
                            ).toString() +
                              " initial, " +
                              returns.toString() +
                              "% yield on badboi " +
                              USDC_MINT +
                              " <-> " +
                              SOL_MINT +
                              ", time since last arb checked: " +
                              diff.toString() +
                              "s, avg last 60 diffs: " +
                              nowavg.toString() +
                              ", lendiffs: " +
                              avgs.length.toString() +
                              ", lenbaddies: " +
                              baddies.length.toString()
                          );
                        //console.log(initial / 10 ** dec)
                        let gogo = true;
                        for (var maybego of dothethings) {
                          gogo = maybego;
                        }
                        if (returns > -5.15 && gogo) {
                          if (true) {
                            // when outAmount more than initial
                            if (true) {
                              //false){//returns >11111.000 ) {
                              console.log(
                                USDC_MINT +
                                  " <-> " +
                                  SOL_MINT +
                                  "@ " +
                                  (initial / 10 ** dec).toString() +
                                  ": " +
                                  Math.round(returns * 10000) / 10000 +
                                  "%"
                              );

                              const delegate = Keypair.generate();
                              let tokenAccount;
                              try {
                                tokenAccount = (
                                  await connection.getTokenAccountsByOwner(
                                    payer.publicKey,
                                    { mint: new PublicKey(USDC_MINT) }
                                  )
                                ).value[0].pubkey;
                              } catch (err) {
                                tokenAccount = await createWSolAccount(
                                  USDC_MINT
                                );
                              } // (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(USDC_MINT)})).value[0].pubkey //new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
                              let myshit = (
                                await connection.getTokenAccountBalance(
                                  tokenAccount
                                )
                              ).value.amount;

                              let instructions = [
                                Token.createApproveInstruction(
                                  tokenAccount,
                                  delegate.publicKey,
                                  payer.publicKey,
                                  initial
                                ),
                                flashBorrowReserveLiquidityInstruction(
                                  initial,
                                  new PublicKey(
                                    reserve.config.liquidityAddress
                                  ),
                                  tokenAccount,
                                  new PublicKey(reserve.config.address),
                                  new PublicKey(market.config.address),
                                  SOLEND_PRODUCTION_PROGRAM_ID
                                ),
                              ];
                              //let instructions = []
                              let signers = [];

                              // get routes based on from Token amount 10 USDC -> ? PRISM
                              try {
                                if (true) {
                                  await Promise.all(
                                    [usdcToSol.data[0], solToUsdc.data[0]].map(
                                      async (route) => {
                                        const {
                                          setupTransaction,
                                          swapTransaction,
                                          cleanupTransaction,
                                        } = await getTransaction(route);

                                        await Promise.all(
                                          [
                                            setupTransaction,
                                            swapTransaction,
                                            cleanupTransaction,
                                          ]
                                            .filter(Boolean)
                                            .map(
                                              async (serializedTransaction) => {
                                                // get transaction object from serialized transaction
                                                const transaction =
                                                  Transaction.from(
                                                    Buffer.from(
                                                      serializedTransaction,
                                                      "base64"
                                                    )
                                                  );
                                                instructions.push(
                                                  ...transaction.instructions
                                                );
                                                // perform the swap
                                                // Transaction might failed or dropped
                                              }
                                            )
                                        );
                                      }
                                    )
                                  );
                                }
                                // (connection, payer, tokenAccount, delegate.publicKey, payer, Math.floor(initial*1.1))
                                instructions.push(
                                  flashRepayReserveLiquidityInstruction(
                                    initial,
                                    1,
                                    tokenAccount,
                                    new PublicKey(
                                      reserve.config.liquidityAddress
                                    ),
                                    new PublicKey(
                                      reserve.config.liquidityFeeReceiverAddress
                                    ),
                                    tokenAccount,
                                    new PublicKey(reserve.config.address),
                                    new PublicKey(market.config.address),
                                    delegate.publicKey,
                                    SOLEND_PRODUCTION_PROGRAM_ID
                                  )
                                );

                                instructions.push(
                                  createTransferInstruction(
                                    tokenAccount,
                                    tokenAccount,
                                    payer.publicKey,
                                    myshit
                                  )
                                );

                                console.log(...instructions);
                                var blockhash = await connection
                                  .getLatestBlockhash()
                                  .then((res) => res.blockhash);

                                console.log(blockhash);
                                // create v0 compatible message
                                const messageV0 = new TransactionMessage({
                                  payerKey: payer.publicKey,
                                  recentBlockhash: blockhash,
                                  instructions,
                                }).compileToV0Message();
                                let w = -1;
                                let c = -1;
                                let winners = [];
                                let vbb = -1;
                                for (var key of Object.keys(myluts)) {
                                  vbb++;

                                  c = -1;
                                  for (var bca of messageV0.staticAccountKeys) {
                                    let want = bca.toBase58();

                                    if (key.split(",").includes(want)) {
                                      c++;
                                      if (c > w) {
                                        if (
                                          !winners.includes(
                                            new PublicKey(
                                              Object.values(myluts)[vbb]
                                            )
                                          )
                                        ) {
                                          winners.push(
                                            new PublicKey(
                                              Object.values(myluts)[vbb]
                                            )
                                          );
                                        }
                                        w = c;
                                      }
                                    }
                                  }
                                }

                                console.log(w);
                                console.log(messageV0.staticAccountKeys.length);
                                let goaccs = [];
                                for (var winner of winners) {
                                  goaccs.push(
                                    (
                                      await connection.getAddressLookupTable(
                                        winner
                                      )
                                    ).value
                                  );
                                }
                                console.log(goaccs[0].state.addresses.length);
                                if (
                                  messageV0.staticAccountKeys.length >
                                  w - 1
                                ) {
                                  const slot = await connection.getSlot();

                                  // Assumption:
                                  // `payer` is a valid `Keypair` with enough SOL to pay for the execution
                                  var blockhash = await connection
                                    .getLatestBlockhash()
                                    .then((res) => res.blockhash);
                                  //let lookupTableAddress = new PublicKey(winner)

                                  let [lookupTableInst, lookupTableAddress] =
                                    AddressLookupTableProgram.createLookupTable(
                                      {
                                        authority: payer.publicKey,
                                        payer: payer.publicKey,
                                        recentSlot: slot,
                                      }
                                    );
                                  let ttt = await connection
                                    .getAddressLookupTable(lookupTableAddress)
                                    .then((res) => res.value);
                                  console.log(ttt);

                                  //  lookupTableAddress = new PublicKey("7XH2JSueLJMTuDLE67Qw92KKwAdLjggszDSN5GVoK3qD")
                                  //lookupTableAddress = new PublicKey("H3pPX8AYP2neyH6AL5mPZmcEWzCbKEU22gWUpY8JASu5")

                                  console.log("lookup table address:", winner);
                                  let dg1 = false;
                                  let dg2 = false;
                                  let dg3 = false;
                                  let ss = [];
                                  let aaa = 0;
                                  let somestuff = {};
                                  for (var bca of messageV0.staticAccountKeys) {
                                    aaa++;
                                    if (
                                      aaa <
                                        (messageV0.staticAccountKeys.length /
                                          3) *
                                          2 &&
                                      aaa >=
                                        messageV0.staticAccountKeys.length / 3
                                    ) {
                                      if (
                                        !goaccs[0].state.addresses.includes(bca)
                                      ) {
                                        ss.push(bca);
                                      }
                                    }
                                  }

                                  //console.log(ss.length)
                                  if (ss.length == 0) {
                                    dg1 = true;
                                  }
                                  const extendInstruction =
                                    AddressLookupTableProgram.extendLookupTable(
                                      {
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss,
                                      }
                                    );
                                  ss = [];
                                  aaa = 0;
                                  for (var bca of messageV0.staticAccountKeys) {
                                    aaa++;
                                    if (
                                      aaa <
                                        (messageV0.staticAccountKeys.length /
                                          3) *
                                          2 &&
                                      aaa >=
                                        messageV0.staticAccountKeys.length / 3
                                    ) {
                                      if (
                                        !goaccs[0].state.addresses.includes(bca)
                                      ) {
                                        ss.push(bca);
                                      }
                                    }
                                  }
                                  //console.log(ss.length)
                                  if (ss.length == 0) {
                                    dg2 = true;
                                  }
                                  const extendInstruction2 =
                                    AddressLookupTableProgram.extendLookupTable(
                                      {
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss,
                                      }
                                    );
                                  ss = [];

                                  aaa = 0;
                                  for (var bca of messageV0.staticAccountKeys) {
                                    aaa++;
                                    if (
                                      aaa >=
                                      (messageV0.staticAccountKeys.length / 3) *
                                        2
                                    ) {
                                      if (
                                        !goaccs[0].state.addresses.includes(bca)
                                      ) {
                                        ss.push(bca);
                                      }
                                    }
                                  }
                                  //console.log(ss.length)
                                  if (ss.length == 0) {
                                    dg3 = true;
                                  }
                                  const extendInstruction3 =
                                    AddressLookupTableProgram.extendLookupTable(
                                      {
                                        payer: payer.publicKey,
                                        authority: payer.publicKey,
                                        lookupTable: lookupTableAddress,
                                        addresses: ss,
                                      }
                                    );
                                  let ix2 = [
                                    lookupTableInst,
                                    extendInstruction,
                                    extendInstruction2,
                                    extendInstruction3,
                                  ];

                                  let tx2 = new Transaction();
                                  tx2.add(ix2[0]);
                                  //console.log(1)
                                  blockhash = await connection
                                    .getLatestBlockhash()
                                    .then((res) => res.blockhash);
                                  tx2.recentBlockhash = blockhash;
                                  tx2.sign(payer);

                                  if (true) {
                                    //ontgo1){
                                    try {
                                      await sendAndConfirmTransaction(
                                        connection,
                                        tx2,
                                        [payer, payer],
                                        { skipPreflight: true }
                                      );
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                  tx2 = new Transaction();
                                  tx2.add(ix2[1]);
                                  //console.log(1)
                                  blockhash = await connection
                                    .getLatestBlockhash()
                                    .then((res) => res.blockhash);
                                  tx2.recentBlockhash = blockhash;
                                  tx2.sign(payer);
                                  if (!dg1) {
                                    try {
                                      let hm = await sendAndConfirmTransaction(
                                        connection,
                                        tx2,
                                        [payer, payer],
                                        { skipPreflight: true }
                                      );
                                      console.log(hm);
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                  tx2 = new Transaction();

                                  tx2.add(ix2[2]);
                                  //console.log(1)
                                  blockhash = await connection
                                    .getLatestBlockhash()
                                    .then((res) => res.blockhash);
                                  tx2.recentBlockhash = blockhash;
                                  tx2.sign(payer);
                                  if (!dg2) {
                                    try {
                                      await sendAndConfirmTransaction(
                                        connection,
                                        tx2,
                                        [payer, payer],
                                        { skipPreflight: true }
                                      );
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                  tx2 = new Transaction();
                                  tx2.add(ix2[3]);
                                  //console.log(1)
                                  blockhash = await connection
                                    .getLatestBlockhash()
                                    .then((res) => res.blockhash);
                                  tx2.recentBlockhash = blockhash;
                                  tx2.sign(payer);
                                  if (!dg3) {
                                    try {
                                      await sendAndConfirmTransaction(
                                        connection,
                                        tx2,
                                        [payer, payer],
                                        { skipPreflight: true }
                                      );
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                  await sleep(50000);
                                  goaccs = [
                                    (
                                      await connection.getAddressLookupTable(
                                        lookupTableAddress
                                      )
                                    ).value,
                                  ];
                                }
                                blockhash = await connection
                                  .getLatestBlockhash()
                                  .then((res) => res.blockhash);
                                let messageV00;
                                //console.log(goaccs)
                                try {
                                  messageV00 = new TransactionMessage({
                                    payerKey: payer.publicKey,
                                    recentBlockhash: blockhash,
                                    instructions,
                                  }).compileToV0Message(goaccs);
                                } catch (err) {
                                  console.log(err);
                                }
                                const transaction = new VersionedTransaction(
                                  messageV00
                                );
                                // sign your transaction with the required `Signers`
                                await transaction.sign([payer, delegate]); //, delegate])//, ...swapTransaction.preSigners, ...swapTransaction2.preSigners])
                                try {
                                  await sendAndConfirmTransaction(
                                    connection,
                                    transaction
                                  );
                                } catch (err) {
                                  console.log(err);
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }
                          }
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }
                } catch (err) {}
              } catch (err) {}
            }
          }
        } catch (err) {}
      }
    }
  }
}
