
import { ComputeBudgetProgram, Keypair, PublicKey } from '@solana/web3.js';
import { loans, web3, utils, BN } from '../forks/frakt-sdk/src';

const payer = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      process.env.PRIV_KEY as string
    )
  )
);

import { flashBorrowReserveLiquidityInstruction, flashRepayReserveLiquidityInstruction } from './src/instructions';
setTimeout(async function(){

    const  accountInfo  = await utils.findAssociatedTokenAddress(
        new web3.PublicKey('SBhPFtv7nxznkPGsCtPhTcDiAUiBCo4pbQe4FnEQJou'),
       new web3.PublicKey("4ZhRD9g5zbcdNgTsk458PC2okvUVT4CxJMSzyT3svciQ")
    );
let reserve =  {config:  {
    liquidityToken: {
      coingeckoID: "wrapped-solana",
      decimals: 9,
      logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      mint: "So11111111111111111111111111111111111111112",
      name: "Wrapped SOL",
      symbol: "SOL",
      volume24h: "5222014.145031683",
    },
    pythOracle: "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG",
    switchboardOracle: "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR",
    address: "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36",
    collateralMintAddress: "5h6ssFpeDeRbzsEHDbTQNH7nVGgsKrZydxdSTnLm6QdV",
    collateralSupplyAddress: "B1ATuYXNkacjjJS78MAmqu8Lu8PvEPt51u4oBasH1m1g",
    liquidityAddress: "8UviNr47S8eL6J3WfDxMRa3hvLta1VDJwNWqsDgtN3Cv",
    liquidityFeeReceiverAddress:
      "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
    userBorrowCap: 2000000,
    userSupplyCap: 1000000,
  }}
    const params = {
        units: 301517 + 301517 + 301517 + 101517 + 101517,
        additionalFee: 1,
      };
      const SOLEND_PRODUCTION_PROGRAM_ID = new PublicKey("E4AifNCQZzPjE1pTjAWS8ii4ovLNruSGsdWRMBSq2wBa")
    const ix =
    ComputeBudgetProgram.requestUnits(params);
    let tokenAccount = new web3.PublicKey("2LcoAo5UhzxTqhhhPGBVZ3YHeXUMeYgTveGzkXGF2nPd")
  let ixs = [
    ix,
    flashBorrowReserveLiquidityInstruction(
      Math.floor(119.31*10**9),
      new PublicKey(reserve.config.liquidityAddress),
      tokenAccount,
      new PublicKey(reserve.config.address),
      new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY"),
      SOLEND_PRODUCTION_PROGRAM_ID
    ),
  ];    let programId = new web3.PublicKey('FQzYycoqRjmZTgCcTTAkzceH2Ju8nzNLa5d78K3yAhVW')
    let admin = new web3.PublicKey("BRRkSNDQ9tGn22Mbex1gAF37V2wacKys6hdX548ZYdxu")
let pb = await loans.paybackLoan({programId, 
    connection: new web3.Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr"),
    user: new web3.PublicKey('SBhPFtv7nxznkPGsCtPhTcDiAUiBCo4pbQe4FnEQJou'),
    admin,
    loan: new PublicKey("GQjwXVyqFXu8g1ec2gngjFKKrDLL5U4A68HdQy5U9ncw"),
    nftMint:  new web3.PublicKey("4ZhRD9g5zbcdNgTsk458PC2okvUVT4CxJMSzyT3svciQ"),
    liquidityPool: new PublicKey("SBhPFtv7nxznkPGsCtPhTcDiAUiBCo4pbQe4FnEQJou"),
    collectionInfo: new PublicKey("6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr"),
    royaltyAddress:  new PublicKey("6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr"), paybackAmount : new BN(119.31*10**9)})
    ixs.push(pb)
    let ba = await loans.({programId, 
        connection: new web3.Connection("https://solana-mainnet.g.alchemy.com/v2/Zf8WbWIes5Ivksj_dLGL_txHMoRA7-Kr"),
        user: new web3.PublicKey('SBhPFtv7nxznkPGsCtPhTcDiAUiBCo4pbQe4FnEQJou'),
        admin,
        loan: new PublicKey("GQjwXVyqFXu8g1ec2gngjFKKrDLL5U4A68HdQy5U9ncw"),
        nftMint:  new web3.PublicKey("4ZhRD9g5zbcdNgTsk458PC2okvUVT4CxJMSzyT3svciQ"),
        liquidityPool: new PublicKey("SBhPFtv7nxznkPGsCtPhTcDiAUiBCo4pbQe4FnEQJou"),
        collectionInfo: new PublicKey("6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr"),
        royaltyAddress:  new PublicKey("6XxjKYFbcndh2gDcsUrmZgVEsoDxXMnfsaGY6fpTJzNr"), paybackAmount : new BN(119.31*10**9)})
        ixs.push(pb)

// borrow against it again

ixs.push(
    flashRepayReserveLiquidityInstruction(
        new BN(119.31*10**9),
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
      new PublicKey("4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY"),
      payer.publicKey,
      SOLEND_PRODUCTION_PROGRAM_ID
    )
  );

console.log(accountInfo)

;})