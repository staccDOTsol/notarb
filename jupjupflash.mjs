import dotenv from "dotenv";
import bs58 from "bs58";
import fetch from 'node-fetch';
import { rando, randoSequence } from "@nastyox/rando.js";

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
  ComputeBudgetProgram,
  TransactionInstruction,
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
let SOLEND_PRODUCTION_PROGRAM_ID = new PublicKey("E4AifNCQZzPjE1pTjAWS8ii4ovLNruSGsdWRMBSq2wBa")
console.log({ dotenv });
dotenv.config();
import { PromisePool } from "@supercharge/promise-pool";
process.on("uncaughtException", (err) => {
  PromisePool.withConcurrency(5)
    .for(markets)
    // @ts-ignore
    .process(async (market) => {
      myluts = JSON.parse(fs.readFileSync("./luts.json").toString());
      //await createWSolAccount();

      market = markets[Math.floor(rando(0, 1, "float") * markets.length)];
      await market.loadReserves();
      market.refreshAll();

      await PromisePool.withConcurrency(2)
        .for(mints)
        // @ts-ignore
        .process(async (SOL_MINT) => {
          something(SOL_MINT, market, myluts);
        });
    });
});
process.on("unhandledRejection", (reason, promise) => {
  PromisePool.withConcurrency(2)
    .for(markets)
    // @ts-ignore
    .process(async (market) => {
      myluts = JSON.parse(fs.readFileSync("./luts.json").toString());
      //await createWSolAccount();

      market = markets[Math.floor(rando(0, 1, "float") * markets.length)];
      await market.loadReserves();
      market.refreshAll();

      await PromisePool.withConcurrency(2)
        .for(mints)
        // @ts-ignore
        .process(async (SOL_MINT) => {
          something(SOL_MINT, market, myluts);
        });
    });
});
// This is a free Solana RPC endpoint. It may have ratelimit and sometimes
// invalid cache. I will recommend using a paid RPC endpoint.
let connection = new Connection(
 
   process.env.RPC1,
  { commitment: "confirmed" }
);
var connection2 = new Connection(
 process.env.RPC2,
  { commitment: "confirmed" }
);

var skippy = new Connection(
 process.env.RPC3,
  { commitment: "singleGossip" }
);
process.env.SEARCHER
  ? (connection2 = new Connection(
      process.env.RPC1
    ))
  : (connection2 = connection2);

process.env.SEARCHER ? (connection = connection2) : (connection = connection);
const wallet = new Wallet(
  Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(
        process.env.PRIV_KEY
      )
    )
  )
);
const payer = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      process.env.PRIV_KEY
    )
  )
);

import fs from "fs";
import { createTransferInstruction } from "@solana/spl-token";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { createTokenAccountInstructions } from "@blockworks-foundation/mango-client";
import { createApproveCheckedInstruction } from "@solana/spl-token";
import { lookup } from "dns";
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
let arg = {
  data: [
    {
      tokens: [
        {
          address: "7eJCLyW5KkvzdzkVXs1ukA1WfFjCcocXjVit64tYcown",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/SolanaLite/SolanaLite-Brand-Kit/main/SolanaLite%20(SLITE)%20Logo%20Solana%20Blockchain.svg",
          symbol: "SLITE",
        },
        {
          address: "So11111111111111111111111111111111111111112",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          symbol: "SOL",
        },
      ],
      address: "oFhShTA1SbKzXHTiXQTe66vu5umVsuSt7d6ZfA7sYFZ",
      base: {
        address: "7eJCLyW5KkvzdzkVXs1ukA1WfFjCcocXjVit64tYcown",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/SolanaLite/SolanaLite-Brand-Kit/main/SolanaLite%20(SLITE)%20Logo%20Solana%20Blockchain.svg",
        symbol: "SLITE",
      },
      createdAt: "2022-10-15T00:54:57.910Z",
      name: "SLITE-SOL",
      quote: {
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        symbol: "SOL",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "pongYbfL2m2dWhqX4543kSwRHMU9DsxyHKrgmhTwvTQ",
          decimals: 9,
          symbol: "PONG",
          icon: "https://gateway.pinata.cloud/ipfs/QmSMnAVBvZgsoNGFgdi3wfvhN84GWtKLi5eHKXwukbQWR7",
        },
        {
          address: "So11111111111111111111111111111111111111112",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          symbol: "SOL",
        },
      ],
      address: "6FzJWqvMZ8TU2ovBecfoLn2ZM1rhSF8zSVJkRPtamv3J",
      base: {
        address: "pongYbfL2m2dWhqX4543kSwRHMU9DsxyHKrgmhTwvTQ",
        decimals: 9,
        symbol: "PONG",
        icon: "https://gateway.pinata.cloud/ipfs/QmSMnAVBvZgsoNGFgdi3wfvhN84GWtKLi5eHKXwukbQWR7",
      },
      createdAt: "2022-10-15T00:05:03.597Z",
      name: "PONG-SOL",
      quote: {
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        symbol: "SOL",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "pongYbfL2m2dWhqX4543kSwRHMU9DsxyHKrgmhTwvTQ",
          decimals: 9,
          symbol: "PONG",
          icon: "https://gateway.pinata.cloud/ipfs/QmSMnAVBvZgsoNGFgdi3wfvhN84GWtKLi5eHKXwukbQWR7",
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "BaoDTpUMrA1pGceAzxcEDdqFrLjhDvf4NvxZWRr7jAjK",
      base: {
        address: "pongYbfL2m2dWhqX4543kSwRHMU9DsxyHKrgmhTwvTQ",
        decimals: 9,
        symbol: "PONG",
        icon: "https://gateway.pinata.cloud/ipfs/QmSMnAVBvZgsoNGFgdi3wfvhN84GWtKLi5eHKXwukbQWR7",
      },
      createdAt: "2022-10-14T23:50:04.143Z",
      name: "PONG-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "isktkk27QaTpoRUhwwS5n9YUoYf8ydCuoTz5R2tFEKu",
          decimals: 2,
          symbol: "ISKT",
          icon: "https://rafmyntasjodur.github.io/iskt-metadata/logo.png",
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "7z8GbNK3vZsAo8JfL7u4RbE3L4GW5Uu5t4RZF4Lo9H21",
      base: {
        address: "isktkk27QaTpoRUhwwS5n9YUoYf8ydCuoTz5R2tFEKu",
        decimals: 2,
        symbol: "ISKT",
        icon: "https://rafmyntasjodur.github.io/iskt-metadata/logo.png",
      },
      createdAt: "2022-10-14T23:08:02.934Z",
      name: "ISKT-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "raydium",
      liquidity: 1966.8548517115232,
      liquidityChangePercentage24h: null,
      price: 0.006690638881630519,
      volume24h: 65.376648,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "isktkk27QaTpoRUhwwS5n9YUoYf8ydCuoTz5R2tFEKu",
          decimals: 2,
          symbol: "ISKT",
          icon: "https://rafmyntasjodur.github.io/iskt-metadata/logo.png",
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "5yvejAHfLjQLuFp2mCPBGnKbSzE1NbeXF6ko9gkMwoAC",
      base: {
        address: "isktkk27QaTpoRUhwwS5n9YUoYf8ydCuoTz5R2tFEKu",
        decimals: 2,
        symbol: "ISKT",
        icon: "https://rafmyntasjodur.github.io/iskt-metadata/logo.png",
      },
      createdAt: "2022-10-14T21:57:03.927Z",
      name: "ISKT-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "4t5wBE1Urg4wCB4jRJ7fdW2XZ3ohrDNUZhmhmNpAuqRm",
          decimals: 2,
          symbol: "VULA",
          icon: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/vulasociety_pfp_1664310044055.jpeg",
        },
        {
          address: "So11111111111111111111111111111111111111112",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          symbol: "SOL",
        },
      ],
      address: "FJu4MZArqCKUwbMnDpemW6kZorvA36ncMg7C2PKExTxM",
      base: {
        address: "4t5wBE1Urg4wCB4jRJ7fdW2XZ3ohrDNUZhmhmNpAuqRm",
        decimals: 2,
        symbol: "VULA",
        icon: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/vulasociety_pfp_1664310044055.jpeg",
      },
      createdAt: "2022-10-14T21:07:41.198Z",
      name: "VULA-SOL",
      quote: {
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        symbol: "SOL",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          symbol: "mSOL",
        },
        {
          address: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
          symbol: "stSOL",
        },
      ],
      address: "DvgSQJyx6JNaPzmhBwzWw6rntGBQCr5fmNnV2AfyEfCg",
      base: {
        address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
        symbol: "mSOL",
      },
      createdAt: "2022-10-14T12:16:01.861Z",
      name: "mSOL-stSOL",
      quote: {
        address: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
        symbol: "stSOL",
      },
      source: "whirlpool",
      liquidity: 1273.5143192220369,
      liquidityChangePercentage24h: null,
      price: 1.0071158357330454,
      volume24h: 1803.614265710206,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "So11111111111111111111111111111111111111112",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
          symbol: "SOL",
        },
        {
          address: "AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh",
          decimals: 8,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh/logo.png",
          symbol: "svtOKAY",
        },
      ],
      address: "Fq48tf4mBsjPcG9bLxCoWCwqaeeAwbSrV7DmcWccHEZN",
      base: {
        address: "So11111111111111111111111111111111111111112",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        symbol: "SOL",
      },
      createdAt: "2022-10-14T09:54:41.614Z",
      name: "SOL-svtOKAY",
      quote: {
        address: "AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh",
        decimals: 8,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh/logo.png",
        symbol: "svtOKAY",
      },
      source: "whirlpool",
      liquidity: 3866.3312574168613,
      liquidityChangePercentage24h: null,
      price: 2.2387245109104184,
      volume24h: 2.9122952487517875,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "DRHfqSitdGSb2NRZj2zp622NHUYhgRYNQmVxaJgRFkSp",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "Fb1Kbkvb3W1TZPNq9G7rhAemBBVLvW8pRZPwJ4dTpHHU",
      base: {
        address: "DRHfqSitdGSb2NRZj2zp622NHUYhgRYNQmVxaJgRFkSp",
        decimals: 4,
      },
      createdAt: "2022-10-14T09:37:57.334Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.788384,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "6CmdzpTmNyKBUN1RNNwJjm1UYLcJD7Ata6zUjCSv6ouP",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "HaqxZ3WheMcRr2MbvgznehfeJFxwnzrGrrRpHTU4hAkU",
      base: {
        address: "6CmdzpTmNyKBUN1RNNwJjm1UYLcJD7Ata6zUjCSv6ouP",
        decimals: 4,
      },
      createdAt: "2022-10-14T09:37:56.296Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.518272,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "98DHRi1b4Jit14ecXzLRf8DfWiNPeM9uWyTqAKYDxhJu",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "78eHg7fmCc7nQkJAJ6AJdYga3RNBB6cnid1umZiMb8Ve",
      base: {
        address: "98DHRi1b4Jit14ecXzLRf8DfWiNPeM9uWyTqAKYDxhJu",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:51:30.182Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.024632,
      liquidityChangePercentage24h: null,
      price: 0.051000000000000004,
      volume24h: 76.9743,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "8sWeUqMSEiFFNMUM6iXiGJnMq3XcjtDAMcN7rjh4sdfp",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "7EhZF8WF5hGy1HuJoDSsfDiL82dnetd2fwGd9yMXvCn",
      base: {
        address: "8sWeUqMSEiFFNMUM6iXiGJnMq3XcjtDAMcN7rjh4sdfp",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:51:12.991Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "B9TMNYo2Roc3f4kw7iPMw74eJWH8vTSTzFemBWZyeUa2",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "3VZ8fg4KbSw8cZBZUHwwRFx8j8xwsjXHCp1L4Bykxyt4",
      base: {
        address: "B9TMNYo2Roc3f4kw7iPMw74eJWH8vTSTzFemBWZyeUa2",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:51:06.522Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.084917,
      liquidityChangePercentage24h: null,
      price: 0.05099999999999999,
      volume24h: 265.36319999999995,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "9KDmKqToqaQT2GKjxndVo8SyuzCdePHfRoMbC69JyDdQ",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "2bFpGz6NvWrgNNWEpzzWnTqHrh8jS7gpGcYmFYzMMC7K",
      base: {
        address: "9KDmKqToqaQT2GKjxndVo8SyuzCdePHfRoMbC69JyDdQ",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:50:43.237Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.08061,
      liquidityChangePercentage24h: null,
      price: 0.123,
      volume24h: 251.904,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "GknNAfZpfgheLRqM3StCvvMf1htruqgsrgrMDjFoyZ8M",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "C8tiHnBA5XAcLfcBbLnLAVgH6j463HdEHi9nZn3Hoss2",
      base: {
        address: "GknNAfZpfgheLRqM3StCvvMf1htruqgsrgrMDjFoyZ8M",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:50:26.696Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.20789,
      liquidityChangePercentage24h: null,
      price: 0.051,
      volume24h: 649.6533,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "75LV2nQ9PczH3aNm185QRufeapVTasRs17NdbKvTD3dK",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "HHhXbzraf7Gva1wM4BmQaeaXtPwHZm2Q2GxP65aDQK5A",
      base: {
        address: "75LV2nQ9PczH3aNm185QRufeapVTasRs17NdbKvTD3dK",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:50:13.897Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 2908.80172,
      liquidityChangePercentage24h: null,
      price: 13.219999999999999,
      volume24h: 2907.8712,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "715F3K2Mqwscuz7jz8cEkbqV5CyDCo7Nwsc4QjoLSFYD",
          decimals: 4,
        },
        {
          address: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
          decimals: 9,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
          symbol: "DUST",
        },
      ],
      address: "7HQ5ZPD7RZdQ2yic4K15AbKfq6xjE3VjhTuYtTLRGpQM",
      base: {
        address: "715F3K2Mqwscuz7jz8cEkbqV5CyDCo7Nwsc4QjoLSFYD",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:49:49.375Z",
      name: "Unknown-DUST",
      quote: {
        address: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
        decimals: 9,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
        symbol: "DUST",
      },
      source: "serum",
      liquidity: 0.03374723064071707,
      liquidityChangePercentage24h: null,
      price: 0.0045,
      volume24h: 90.12420143370043,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "AyWeStsX5W31Jf868NdrD4mtTTiHsQ8tpMvyck9MJiDb",
          decimals: 4,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "ADLzvHhQFjDSxQmqhfGcDm2BrtSKNhY2otjkJLaR2bra",
      base: {
        address: "AyWeStsX5W31Jf868NdrD4mtTTiHsQ8tpMvyck9MJiDb",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:49:38.689Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.44076,
      liquidityChangePercentage24h: null,
      price: 57.8,
      volume24h: 1377.3739999999998,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        { address: "pNsYFwRfEFWJM86ZiozPVxDF3pxkvWn9Fn11aoWDLjE", decimals: 4 },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "H9ZaoHDmfMXNUxBXiPMx79KtRVzvMWL7agTgHxvuoVyi",
      base: {
        address: "pNsYFwRfEFWJM86ZiozPVxDF3pxkvWn9Fn11aoWDLjE",
        decimals: 4,
      },
      createdAt: "2022-10-14T08:49:34.667Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 105.575734,
      liquidityChangePercentage24h: null,
      price: 15.2,
      volume24h: 130.416,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "6R5fT1s5dLEAkZcCnF28Wew912aKje34Fq9cjRDqrcDY",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "5mMe98kWfEVmcK7gRpg2ekY87nF8sWQNvdQ6NCusL2Bn",
      base: {
        address: "6R5fT1s5dLEAkZcCnF28Wew912aKje34Fq9cjRDqrcDY",
        decimals: 0,
      },
      createdAt: "2022-10-14T05:26:53.593Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "7CnckC1pEB1H9eau6t464YhMUUJJacrrJLWZodvNbXhF",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "2hQQ2J73edhV8HpdHakHbphq4bx98q7ghQPzmknKpgqi",
      base: {
        address: "7CnckC1pEB1H9eau6t464YhMUUJJacrrJLWZodvNbXhF",
        decimals: 0,
      },
      createdAt: "2022-10-14T05:11:34.955Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "H3wesw6ycAzGYZvpPHWsPUJABcaPpvGNbf51Qs7ManaH",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "Fbg8rUtNpfUXAgaPPoBQTL9xV2tNitWJrBDRyLB7TVfE",
      base: {
        address: "H3wesw6ycAzGYZvpPHWsPUJABcaPpvGNbf51Qs7ManaH",
        decimals: 0,
      },
      createdAt: "2022-10-14T05:05:37.045Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "444B4d1BNR8LqKuS316yv5TpMQQLXZBpmAK1CpBEfFq2",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "AHDbvyHDNoiDkV4XXdyR7iQCXmb8RiaZ3iuJDcMBNzTJ",
      base: {
        address: "444B4d1BNR8LqKuS316yv5TpMQQLXZBpmAK1CpBEfFq2",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:35:15.325Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 8920.403712,
      liquidityChangePercentage24h: null,
      price: 0.62,
      volume24h: 11435.28,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "FjAimNK5WCk8HnqdyZHbGZaQVozicxMgiaqqsTfARisD",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "BqJpwqns3vLrUFhTcBupAFU6daAFg14h4eZYSRJrnLhT",
      base: {
        address: "FjAimNK5WCk8HnqdyZHbGZaQVozicxMgiaqqsTfARisD",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:35:15.325Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 52474.18,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "6z6QEXth7PhvKQzkMkFoLoFJKVTASp4ecgeKbzZWmTDk",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "C2ahKAEghuMYCjCbMgMbYy6hGFMdY1hfyVtQnLjM1RCX",
      base: {
        address: "6z6QEXth7PhvKQzkMkFoLoFJKVTASp4ecgeKbzZWmTDk",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:13.145Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 332.420499,
      liquidityChangePercentage24h: null,
      price: 0.019,
      volume24h: 232.997,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "ARSNiYJxBVH5TGRC5d4hz8nLwQWRNq4JnmQUYNheKdq3",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "5aTHnv1cX2A83A9tAqitfCBDNdZ8HwRnaXWHf9Qjo37B",
      base: {
        address: "ARSNiYJxBVH5TGRC5d4hz8nLwQWRNq4JnmQUYNheKdq3",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:13.145Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 1921.3928050000002,
      liquidityChangePercentage24h: null,
      price: 0.08400000000000002,
      volume24h: 1146.0120000000002,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "EpNsdRySp4hV6j8YU46m4hgZCeEX48HBt4FJV1ePEDXF",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "HFYJ5P6S3yWYr2nE4Wo1pSQpFuRwSEHcsFLvPMVRsKCW",
      base: {
        address: "EpNsdRySp4hV6j8YU46m4hgZCeEX48HBt4FJV1ePEDXF",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:13.145Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 125.732464,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "27RVixyGtp8Lvyu1oxGMNVgbKvKxQn5otk4kjDVsa78q",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "qkmi6F7JeCUMH871T34Xn3PdySdoGCYX9pHMrm2KoR9",
      base: {
        address: "27RVixyGtp8Lvyu1oxGMNVgbKvKxQn5otk4kjDVsa78q",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:12.145Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 9635.67664,
      liquidityChangePercentage24h: null,
      price: 0.05,
      volume24h: 8289.3,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "6aStidxRFGNVJu8EVLJoVp931hhCecbicWeawmjYm4sD",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "6Zn7QsWKMBycYEBzRy12thadMkjhj8zqDkcaanp1tdvh",
      base: {
        address: "6aStidxRFGNVJu8EVLJoVp931hhCecbicWeawmjYm4sD",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:11.447Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 15519.2576,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "ELdU5FMU8bqZZANp6WY3eyYVAX3MocANR6RivPPwaCU5",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "HSbME3oXs6riHvmqQVjYHQUKJ2uVrfKxX8Y5sRQbDuha",
      base: {
        address: "ELdU5FMU8bqZZANp6WY3eyYVAX3MocANR6RivPPwaCU5",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:11.447Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 12501.998795000003,
      liquidityChangePercentage24h: null,
      price: 0.003000000000000001,
      volume24h: 11340.737000000003,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "9K9327tBMsHFsQYLE2NLWRj57Z8CRDNGSdbK3oKzJFds",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "G8xSkEmtzaG6yF3NoySxr5Uef9c3tmZNy4GX434chhbA",
      base: {
        address: "9K9327tBMsHFsQYLE2NLWRj57Z8CRDNGSdbK3oKzJFds",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:11.259Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 1673.812864,
      liquidityChangePercentage24h: null,
      price: 0.33,
      volume24h: 2665.4100000000003,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "94UwepTKoEcqWrCd3cPopjdpaXxasaayeGQQaJYTrgZ4",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "Ao5ovvCiZNDCnWT1Q8i26h6oya7b85qhUNfeYacHmQ2q",
      base: {
        address: "94UwepTKoEcqWrCd3cPopjdpaXxasaayeGQQaJYTrgZ4",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:11.259Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 10852.25966,
      liquidityChangePercentage24h: null,
      price: 0.09,
      volume24h: 5664.15,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "58Ur6JymiD7gHrQFqQvf9bKRf6yGVN47oGrwy8FvAdUN",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "8ZETXiTx9yjB5r3qhJw1VDAot8wHTzCRACoFp5EK69pm",
      base: {
        address: "58Ur6JymiD7gHrQFqQvf9bKRf6yGVN47oGrwy8FvAdUN",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:11.259Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 3649.211633,
      liquidityChangePercentage24h: null,
      price: 0.0769,
      volume24h: 3073.5822,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "GDcEqojjM6qyWWVLXGtCDHgLASZDtxxcxPtDrrmrRkXq",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "J5dCynuhq5M7is6YZA2CvamjathxWvmByiEyTfZq2MTq",
      base: {
        address: "GDcEqojjM6qyWWVLXGtCDHgLASZDtxxcxPtDrrmrRkXq",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:32:10.303Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 6574.024352,
      liquidityChangePercentage24h: null,
      price: 0.44,
      volume24h: 3751.88,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "FqEBDe2aHPZzsagXhZsX2xXvc2CpQsvCnCVMDaBmPkfQ",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "5362stxHt2GN3Cch6bD9TJhekXZrYrZpavHumcs5YYyQ",
      base: {
        address: "FqEBDe2aHPZzsagXhZsX2xXvc2CpQsvCnCVMDaBmPkfQ",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:59.848Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.136016,
      liquidityChangePercentage24h: null,
      price: 0.2296,
      volume24h: 340.0376,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "H3wesw6ycAzGYZvpPHWsPUJABcaPpvGNbf51Qs7ManaH",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "Es7WyFP5QFuBtZg1J2iS4dKBbuhEoWqrvCnP1yBEaBYw",
      base: {
        address: "H3wesw6ycAzGYZvpPHWsPUJABcaPpvGNbf51Qs7ManaH",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:59.848Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 860.668128,
      liquidityChangePercentage24h: null,
      price: 0.26,
      volume24h: 580.32,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "3Vtm3zxG9n5DZMaUCpeN9YPL9K767UZhrQKvzepVRqyp",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "BF1XWuAVSKiRHAc7wVt7RCU48N2C1aDFjKTqthBdWQip",
      base: {
        address: "3Vtm3zxG9n5DZMaUCpeN9YPL9K767UZhrQKvzepVRqyp",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:59.240Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 4467.236,
      liquidityChangePercentage24h: null,
      price: 0.077,
      volume24h: 770,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "9KXv8nr9xNXixgDnG5CTosjQ1a8yK7iqVqnH5TRKXzwN",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "RGH6qQ6XF7eSZaV5JsCYDJaHL738eq9EUjwWS152KD9",
      base: {
        address: "9KXv8nr9xNXixgDnG5CTosjQ1a8yK7iqVqnH5TRKXzwN",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:53.764Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 0.348938,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "9CPuxdwWFhw4cssscrF6XY7h9H57nLtWEthgp1FrwDhu",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "5RVBHmqHmDdoEm74L2x51bFEe8YvqYYYy1rdcxeeyXSV",
      base: {
        address: "9CPuxdwWFhw4cssscrF6XY7h9H57nLtWEthgp1FrwDhu",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:53.764Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 2492.60532,
      liquidityChangePercentage24h: null,
      price: null,
      volume24h: null,
      volume24hChangePercentage24h: null,
    },
    {
      tokens: [
        {
          address: "27LsnkmTfYcmJB4xpXPj3HBng1LSZC6YQbfHWZf2P5Zi",
          decimals: 0,
        },
        {
          address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          decimals: 6,
          icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          symbol: "USDC",
        },
      ],
      address: "8ry7pMeLa7hWyNyHbtYD1nJecuC4u43hGeuJXcAyHL3g",
      base: {
        address: "27LsnkmTfYcmJB4xpXPj3HBng1LSZC6YQbfHWZf2P5Zi",
        decimals: 0,
      },
      createdAt: "2022-10-14T04:28:53.764Z",
      name: "Unknown-USDC",
      quote: {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        decimals: 6,
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        symbol: "USDC",
      },
      source: "serum",
      liquidity: 151.965162,
      liquidityChangePercentage24h: null,
      price: 0.0012,
      volume24h: 151.90439999999998,
      volume24hChangePercentage24h: null,
    },
  ],
  success: true,
};

for (var add of arg.data) {
  for (var tok of add.tokens) {
    if (!mints.includes(tok.address)) {
     mints.push(tok.address);
    }
  }
}
console.log(mints.length);
//mints = []
//https://quote-api.jup.ag/v1/quote


const getTransactionold = (route) => {
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
const getCoinQuote = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v3/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=99&swapMode=ExactIn`
    )
    .json();

const getTransaction = (route) => {
  return got
    .post("https://quote-api.jup.ag/v3/swap", {
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
      let txResult = await connection2.getTransaction(txid, {
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

// initial 20 USDC for quote
let initial = 20_000_000;

console.log("");
console.log("");

console.log(""); //cool
let configs = 
{
  "programID": "DLendnZuSiCK4kBRtX126ogq1uRnb1TGGsjW6Tnw1vMJ",
  "assets": [
    {
      "name": "Solana",
      "symbol": "SOL",
      "decimals": 9,
      "mintAddress": "So11111111111111111111111111111111111111112"
    },
    {
      "name": "USDC",
      "symbol": "USDC",
      "decimals": 6,
      "mintAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    },
    {
      "name": "COPE",
      "symbol": "COPEE",
      "decimals": 6,
      "mintAddress": "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"
    }
  ],
  "markets": [
    {
      "name": "main",
      "address": "F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1",
      "authorityAddress": "HECVhRpddhzhkn6n1vdiqhQe1Y65yjXuwb45jKspD1VV",
      "reserves": [
        {
          "asset": "SOL",
          "address": "fuSA8HSSku7BwRsVFWotGcVpwH3QrGtnhqWRS4orhXG",
          "collateralMintAddress": "44PeAshzRSmhzQ3Da9z22YXYRN18PfsTHVXZpcQ7p7TH",
          "jareMint": "7yN93TFSCZqseppJyxXjnAnps7wH1wRtvgemFXksc25t",
          "collateralSupplyAddress": "A8aUS1MBosuSLXwfP16iYL3VgJvPKhLGwGzvpuieRTvJ",
          "liquidityAddress": "CBH6VFEhBatZ265jrfKDMey5NQgMZhedk7piu5BCDYfW",
          "liquidityFeeReceiverAddress": "wwQZH2vvWqiqwudoQYQ5RydW2CkgD5FApgD6f92KqHb",
          "userSupplyCap": 4,
          "reserveSupplyCap": 40000
        },
        {
          "asset": "USDC",
          "address": "5guv5xt2we2FpPXkSPN8oaz6C876NjiV62Np5RxghDnb",
          "collateralMintAddress": "CnwtgyFcTyuQMKDSU1KCXVS4jPksjJUVQaMkgZ2WU3ny",
          "jareMint": "2DvSLHu3HDTDEdWnYETdTtuywTvenmVQpsvn5ybEbKpA",
          "collateralSupplyAddress": "HxL7nx79BLBwjGKAmnSYPhxdbPCpzHqj7UVb1ni3iUFC",
          "liquidityAddress": "Ho9gUv6Y5KKZzxat5pbnf2skppcVpniss6zrabhWwi1n",
          "liquidityFeeReceiverAddress": "8c5tAQAobrRyHgtLZJyaprLjv4yyL5YPEqS2S4wqD9UR",
          "userSupplyCap": 10000,
          "reserveSupplyCap": 1000000
        },
        {
          "asset": "SRM",
          "address": "CoQgPXDKkBo84K14uFbGqkNmXHjKLYXt6d4BvLY6LWpu",
          "collateralMintAddress": "EHSug7WuXkoPDaeF2Cog4mcZ6SKZ5iJ1rkXFoczrXWqL",
          "jareMint": "kALzvjmLZSWMJMQj1bgdKT9hb3VLCKbnZ8uiPyjU4FJ",
          "collateralSupplyAddress": "4RjkXaYqrKX8pd5t9RvPt4UmhyzuXjKT25ysXWQD2V56",
          "liquidityAddress": "6q7eZ2XBkgrwRpWnaVct6aRTKV9zmiGgXYuCQs4BQsjh",
          "liquidityFeeReceiverAddress": "47AV9KQgT8MxFrBnQC5uGK56NLQRMZPgze4G4i4sgGzJ",
          "userSupplyCap": 2500,
          "reserveSupplyCap": 300000
        }
      ]
    }
  ],
  "oracles": {
    "pythProgramID": "gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s",
    "switchboardProgramID": "7azgmy1pFXHikv36q1zZASvFq5vFa39TT9NweVugKKTU",
    "assets": [
      {
        "asset": "SOL",
        "oracleAddress": "8GWTTbNiXdmyZREXbjsZBmCRuzdPrW55dnZGDkTRjWvb",
        "priceAddress": "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        "switchboardFeedAddress": "nu11111111111111111111111111111111111111111"
      },
      {
        "asset": "USDC",
        "oracleAddress": "EMkxjGC1CQ7JLiutDbfYb7UKb3zm9SJcUmr1YicBsdpZ",
        "priceAddress": "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        "switchboardFeedAddress": "nu11111111111111111111111111111111111111111"
      },
      {
        "asset": "SRM",
        "oracleAddress": "2nBBaJ2WozeqyDGaVXAqm3d5YqCjeDhoqpfTjyLNykxe",
        "priceAddress": "9xYBiDWYsh2fHzpsz3aaCnNHCKWBNtfEDLtU6kS4aFD9",
        "switchboardFeedAddress": "nu11111111111111111111111111111111111111111"
      }
    ]
  }
}
configs = configs.markets

// wsol account
const createWSolAccount = async (mint) => {
  const wsolAddress = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    new PublicKey(mint),
    wallet.publicKey
  );
  try {
    let wsolAccount = await connection2.getAccountInfo(wsolAddress);

    if (!wsolAccount) {
      const transaction = new Transaction();
      const instructions = [];
      const ha = Keypair.generate();
      instructions.push(
        ...(await createTokenAccountInstructions(
          connection,
          payer.publicKey,
          ha.publicKey,
          new PublicKey(mint),
          payer.publicKey
        ))
      );

      transaction.add(...instructions);
      transaction.recentBlockhash = await (
        await connection2.getLatestBlockhash()
      ).blockhash;
      try {
        const result = await sendAndConfirmTransaction(
          connection,
          transaction,
          [payer, ha]
        );
        await sleep(10000)
      } catch (err) {}
      wsolAccount = await connection2.getAccountInfo(wsolAddress);
    }
  } catch (err) {}

  return wsolAddress;
};
let prev = new Date().getTime() / 1000;
let avgs = [];
async function something(SOL_MINT, market, myluts) {
  let jares = [];

  SOL_MINT = mints[rando(0, mints.length)];
  if (true) {
    //["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "So11111111111111111111111111111111111111112"]){
      var reserve =
       market.reserves[Math.floor(Math.random() * market.reserves.length)]; //market.reserves.find(res => res.config.liquidityToken.mint ===ç);
    var USDC_MINT =    reserve.config.mint
   /* var   reserve=  {config:  {
        "asset": "COPE",
        "address": "33PwUsFLE8niD3PwjQEkn2XhDZj8WrW7chKvKxb2cnx6",
        "collateralMintAddress": "2oXfx9V2xVNQpgixXC9dzEdQgY6KmDQCjDC2sxPRQJpY",
        "liquidityAddress": "BBrbJEnehsjxxGD8GddbkuNhjwLMGYvan7HsuWgXy8cz",
        "liquidityFeeReceiverAddress": "BBrbJEnehsjxxGD8GddbkuNhjwLMGYvan7HsuWgXy8cz"
      }} */
      if (!mints.includes(USDC_MINT)){
    mints.push(USDC_MINT)
     console.log(mints.length)
      }     
     // var USDC_MINT =reserve.config.liquidityToken.mint;

      if (!baddies.includes(USDC_MINT+SOL_MINT) && !baddies.includes(SOL_MINT+USDC_MINT)) {
        //USDC_MINT != "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
        //has.includes(USDC_MINT) ){

        var dec = reserve.config.dec
      //  let min = reserve.stats.flashLoanFeePercentage;
     //   let hfp = reserve.stats.hostFeePercentage;
        
        let cba = -1;
        if (
          true
        ) {
          let dothethings = [];
          cba++;
            let initial =  Math.ceil(
                  (rando(0, 5, "float") / reserve.config.assetPriceUSD) *
                    10 ** dec
                )
           initial = rando(true, false) ? Math.ceil(initial / 5 ) : initial;
      
          //  let initial = Math.random() * 129 * 10 ** 6
            // 0.1 SOL
              if (true){//initial != 0 && !baddies.includes(USDC_MINT + SOL_MINT)) {
                let usdcToSol;
                let solToUsdc;
               
                try { 
                  usdcToSol = await( await fetch(
                    `https://quote-api.jup.ag/v1/quote?outputMint=${SOL_MINT}&inputMint=${USDC_MINT}&amount=${ (Math.floor(Math.floor(initial * 1.002))).toString()}&slippage=99&swapMode=ExactIn`
                  ))
                  .json()
                  usdcToSol.data[0] = usdcToSol.data.find(
                    (res) => res.marketInfos.length <= 2
                  );
              
                } catch (err) {
                  baddies.push(USDC_MINT + SOL_MINT);
                  console.log(baddies.length);
                  let tbaddies = JSON.parse(
                    fs.readFileSync("./baddies.json").toString()
                  );
                  for (var b of baddies) {
                    if (!tbaddies.includes(b)) {
                      tbaddies.push(b);
                    }
                  }
                  fs.writeFileSync("./baddies.json", JSON.stringify(tbaddies));
                }
                if (usdcToSol && !baddies.includes(SOL_MINT + USDC_MINT)) {
                  try {//( Math.floor(usdcToSol.data[0].outAmount * 0.9998)).toString()
                    solToUsdc =  await( await fetch(
                      `https://quote-api.jup.ag/v1/quote?outputMint=${USDC_MINT}&inputMint=${SOL_MINT}&amount=${ (( Math.floor(usdcToSol.data[0].outAmount * 0.998)).toString())}&slippage=99&swapMode=ExactIn`
                    ))
                    .json()
                    solToUsdc.data[0] = solToUsdc.data.find(
                      (res) => res.marketInfos.length <= 2
                    );
                  } catch (err) {
                    baddies.push(SOL_MINT + USDC_MINT);
                    console.log(baddies.length);

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
                    if (solToUsdc) {
                      let returns = // 100 / (100 * 0.995)
                        ((solToUsdc.data[0].outAmount ) / (initial) - 1) *
                        100;
console.log(1)
                        console.log(returns)

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
                      if (returns > 0)
                        console.log(
                          (
                            (initial / 10 ** dec) *
                           0.05// reserve.config.assetPriceUSD
                          ).toString() +
                            " initial, " +
                            returns.toString() +
                            "% yield on badboi " +
                            USDC_MINT +
                            " <-> " +
                            SOL_MINT
                        );
                      //console.log(initial / 10 ** dec)
                      let gogo = true;
                      for (var maybego of dothethings) {
                        gogo = maybego;
                      }
                      if (returns >  0.08 && returns < 10000000) {
                        let goaccs = [];
                        for (var mi of solToUsdc.data[0].marketInfos) {
                          var ta2;
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.outputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                           // ta2 = await createWSolAccount(mi.outputMint);
                          }
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.inputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                          //  ta2 = await createWSolAccount(mi.inputMint);
                          }
                        }

                        for (var mi of usdcToSol.data[0].marketInfos) {
                          var ta2;
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.outputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                        ///    ta2 = await createWSolAccount(mi.outputMint);
                          }
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.inputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                         //  ta2 = await createWSolAccount(mi.inputMint);
                          }
                        }
                        if (true) {
                          // when outAmount more than initial
                          if (!false) {
                            //returns >11111.000 ) {
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
                              let arg = (
                                await connection2.getTokenAccountsByOwner(
                                  payer.publicKey,
                                  { mint: new PublicKey(USDC_MINT) }
                                )
                              ).value
                              let w = -1
                              for (var args of arg){
                                let amt = (await connection.getTokenAccountBalance(
                                  args.pubkey
                                )).value.amount
                                if (amt > w){
                                  w = amt
                                  tokenAccount = args.pubkey
                                }
                              } 
                                if (!tokenAccount){
                                //  await sleep( 4000)
                                //  tokenAccount = await createWSolAccount(USDC_MINT);
                                }
                                if (tokenAccount == undefined){
                                 // await sleep( 4000)
                                 // tokenAccount = await createWSolAccount(USDC_MINT);
                                }
                            } catch (err) {
                            //  tokenAccount = await createWSolAccount(USDC_MINT);
                            }

                            // (await connection2.getTokenAccountsByOwner(payer.publicKey, {mint: new PublicKey(USDC_MINT)})).value[0].pubkey //new PublicKey(atas[abc]) //new PublicKey("JCJtFvMZTmdH9pLgKdMLyJdpRUgScAtnBNB4GptuvxSD")// await token.createAccount(payer.publicKey);
                            var ta2;
                            try {
                              ta2 = (
                                await connection2.getTokenAccountsByOwner(
                                  payer.publicKey,
                                  { mint: new PublicKey(SOL_MINT) }
                                )
                              ).value[0].pubkey;
                            } catch (err) {
                              //  ta2 = await createWSolAccount(SOL_MINT);
                            }
                            const params = {
                              units: 301517 + 301517 + 301517 + 101517 + 101517,
                              additionalFee: 1,
                            };
                            const ix =
                              ComputeBudgetProgram.requestUnits(params);
                            let instructions = [
                              ix,
                              flashBorrowReserveLiquidityInstruction(
                                Math.floor(initial * 1.002),
                                new PublicKey(reserve.config.liquidityAddress),
                                tokenAccount,
                                new PublicKey(reserve.config.address),
                                new PublicKey("F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1"),
                                SOLEND_PRODUCTION_PROGRAM_ID
                              ),
                            ];
                            //let instructions = []
                            let signers = [];

                            // get routes based on from Token amount 10 USDC -> ? PRISM
                            try {
                              if (true) {
                              
                              }
                              let index = USDC_MINT+","+SOL_MINT
                              for (var mi of usdcToSol.data[0].marketInfos) {
index+=","+mi.id
                              }
                              for (var mi of solToUsdc.data[0].marketInfos) {
                                  index+=","+mi.id
                              }
                              console.log(index)
                              let argh = JSON.parse(fs.readFileSync('./answers2.json').toString())
                              var mematey = -1
                              let blargs = []
                             
                              for (var arg of Object.keys(argh)){
                                mematey++
                                for (var blarg of index.split(',')){
                                  if (arg.split(',').includes(blarg) && !blargs.includes(blarg)){
                                    for (var hmph of Object.values(argh)[mematey]){
                                      let test = (await connection.getAddressLookupTable(new PublicKey(hmph))).value
                                        if ( !goaccs.includes(test)){
                                          goaccs.push(test)
                                          blargs.push(blarg)
                                      
                                      
                                    
                                  }
            
                                    }

                                  }
                                }
                              }

                              console.log(goaccs.length)

                              console.log(goaccs.length)

                              console.log(goaccs.length)

                              console.log(goaccs.length)
                              let tgoaccs = []
                              let takens = []
                              
                              var blockhash = await connection
                                .getLatestBlockhash()
                                .then((res) => res.blockhash);
let                              messageV0 = new TransactionMessage({
                                payerKey: payer.publicKey,
                                recentBlockhash: blockhash,
                                instructions,
                              }).compileToV0Message();
                              let w = 0
                              let winner 
                              let winner2 
                              let winner3 
                              for (var bca of messageV0.staticAccountKeys){
                              let c =  0
                                for (var lut of goaccs){
                                if (lut.state.addresses.includes(bca)){
                                  c++
                                  if (c > w ){
                                    c = w 
                                    winner3 = winner2
                                    winner2 = winner 
                                    winner = lut 
                                  }
                                }


                              }
                            }
                        //    goaccs = [goaccs[0], goaccs[1], goaccs[2]]
                              if (true) {
                                jares = [];
                                await Promise.all(
                                  [usdcToSol.data[0], solToUsdc.data[0]].map(
                                    async (route) => {
                                      const {
                                        setupTransaction,
                                        swapTransaction,
                                        cleanupTransaction,
                                      } = await getTransactionold(route);

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
                                               // goaccs.push(...transaction.message.addressTableLookups)
                                              //  console.log(transaction)
                                              ///  const messageV0 = TransactionMessage.decompile(transaction.message)
                                              //  console.log(messageV0)

                                              //  let hmmm = (transaction.message.compileToV0Message())
                                                
                                                  instructions.push(...transaction.instructions)
                                         
                                              // perform the swap
                                              // Transaction might failed or dropped
                                            }
                                          )
                                      );
                                    }
                                  )
                                );
                              }
                              console.log(instructions.length)
                              console.log(instructions.length)

                              let jjs = [];
                             
                              // (connection, payer, tokenAccount, delegate.publicKey, payer, Math.floor(initial*1.1))
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              console.log(tokenAccount.toBase58());
                              instructions.push(
                                flashRepayReserveLiquidityInstruction(
                                  Math.floor(initial * 1.002),
                                  1,
                                  tokenAccount,
                                  new PublicKey(
                                    reserve.config.liquidityAddress
                                  ),
                                  new PublicKey(
                                    reserve.config.liquidityAddress
                                  ),
                                  tokenAccount,
                                  new PublicKey(reserve.config.address),
                                  new PublicKey("F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1"),
                                  payer.publicKey,
                                  SOLEND_PRODUCTION_PROGRAM_ID
                                )
                              );

                let myshit = (
                  await connection.getTokenAccountBalance(
                    tokenAccount
                  )
                ).value.amount;
                              instructions.push(
                                createTransferInstruction(
                                  tokenAccount,
                                  tokenAccount,
                                  payer.publicKey,
                                  Math.floor(myshit * 1.0000)
                                )
                              );

                              var blockhash = await connection
                                .getLatestBlockhash()
                                .then((res) => res.blockhash);

                              console.log(blockhash);
                              console.log(instructions.length);
                              blockhash = await skippy
                                .getLatestBlockhash()
                                .then((res) => res.blockhash);
                              let messageV00;
                              console.log(instructions.length);

                              console.log(goaccs.length);
                              let goaccst = []
                              for (var goacc in goaccs){
                                if (goacc.addresses){
                                  goaccst.push(goacc)
                                }
                              }
                              try {
                                messageV00 = new TransactionMessage({
                                  payerKey: payer.publicKey,
                                  recentBlockhash: blockhash,
                                  instructions,
                                }).compileToV0Message(goaccs);
                                console.log(123);
                                const transaction = new VersionedTransaction(
                                  messageV00
                                );
                                // sign your transaction with the required `Signers`
                                console.log(123);

                                await transaction.sign([payer]); //, delegate])//, ...swapTransaction.preSigners, ...swapTransaction2.preSigners])
                                skippy.sendTransaction(transaction)
                                skippy.sendTransaction(transaction)
                                skippy.sendTransaction(transaction)
                                skippy.sendTransaction(transaction)
                                
                              let m = await  skippy.sendTransaction(transaction)
                              console.log(m)
                              } catch (err) {
                                console.log(err);
                              }
                            } catch (err) {
                              console.log(err);
                            }
                          }
                        }
                      }
                    }
                  } catch (err) {console.log(err)}
                }
              }
        }
      }
  }
}
let markets = []

while (true) {
   markets = [await SolendMarket.initialize(
    connection,
  
    "production", // optional environment argument'
    "F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1"
  )]
  await PromisePool.withConcurrency(1)
    .for(markets)
    // @ts-ignore
    .process(async (market) => {
      myluts = JSON.parse(fs.readFileSync("./luts.json").toString());
      //await createWSolAccount(); xx

      market = markets[Math.floor(rando(0, 1, "float") * markets.length)];

      await PromisePool.withConcurrency(20)
        .for(mints)
        // @ts-ignore
        .process(async (SOL_MINT) => {
        await  something(SOL_MINT, market, myluts);
        });
    });
}