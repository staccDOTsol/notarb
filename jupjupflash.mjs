import dotenv from "dotenv";
import bs58 from "bs58";
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
 process.env.RPC2,
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


const getCoinQuoteold = (inputMint, outputMint, amount) =>
  got
    .get(
      `https://quote-api.jup.ag/v1/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=99&swapMode=ExactIn`
    )
    .json();

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
var markets = [
  await SolendMarket.initialize(
    connection,

    "production" // optional environment argument
,"7AvvBmbTuEXdNwi6NeCteAEwaBULPseKJ5x6TemGzPGt"
  ),
  await SolendMarket.initialize(
    connection,

    "production", // optional environment argument
    "Epa6Sy5rhxCxEdmYu6iKKoFjJamJUJw8myjxuhfX2YJi"
  ),
  await SolendMarket.initialize(
    connection,

    "production", // optional environment argument
    "GktVYgkstojYd8nVXGXKJHi7SstvgZ6pkQqQhUPD7y7Q"
  )
];
let configs = [
  {
    name: "main",
    isPrimary: true,
    description: "",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz/icon.png",
          mint: "SoLEao8wTzSfqhuou8rcYsVoLjthVmiXuEjzdNPMnCz",
          name: "Saber mSOL-SOL LP",
          symbol: "mSOL-SOL",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "6ZuSuX14mxyZQ8JgjAC9PoDcbAU9sr1umUoyYVseVaNF",
        address: "6ve8XyELbecPdbzSTsyhYKiWr7wg3JpjfxE1cqoN9qhN",
        collateralMintAddress: "4icXEpFVMrcqob6fnd3jZ6KjKrc6cqre6do1f8kKAC1u",
        collateralSupplyAddress: "3nfgTBPf1N1NPNTTYk2HpJABaL59db3XKnjgJ8JGwtHJ",
        liquidityAddress: "ETnpmAETSfzmfevgUxzaHGTdDrTofHGZgCdccCHkA6nM",
        liquidityFeeReceiverAddress:
          "2TWjqvWCjMFBWJSx42AZYbDyihBrQqCo6URDpLhWA8L6",
        userBorrowCap: 0,
        userSupplyCap: 5000,
      },
      {
        liquidityToken: {
          coingeckoID: "socean-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm/logo.png",
          mint: "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
          name: "Socean staked SOL",
          symbol: "scnSOL",
          volume24h: "321784.2476841212",
        },
        pythOracle: "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG",
        switchboardOracle: "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR",
        address: "DUExYJG5sc1SQdMMdq6LdUYW9ULXbo2fFFTbedywgjNN",
        collateralMintAddress: "AFq1sSdevxfqWGcmcz7XpPbfjHevcJY7baZf9RkyrzoR",
        collateralSupplyAddress: "7NJCWoLDngquvYcCPzUBLYfpS9F3eox4ibgivEGxXweU",
        liquidityAddress: "5Ynq25D3t124WkQZaaWHBXkWkMGJchVg2sCRgfu1PYbs",
        liquidityFeeReceiverAddress:
          "6SytVt3JLkB5VdLPxTBd5zZFGGVDXsMhf6AdcajdZTBV",
        userSupplyCap: 200000,
      },
      {
        liquidityToken: {
          coingeckoID: "ftx-wormhole",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv/logo.png",
          mint: "EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv",
          name: "FTX Token (Portal)",
          symbol: "FTT",
          volume24h: "753.2405787902624",
        },
        pythOracle: "8JPJJkmDScpcNmBRKGZuPuG2GYAveQgP3t5gFuMymwvF",
        switchboardOracle: "57EF89YgEUUcxtm8upPFmi7rHVzfJDMVsm2BHgtVM3yR",
        address: "8bDyV3N7ctLKoaSVqUoEwUzw6msS2F65yyNPgAVUisKm",
        collateralMintAddress: "DiMx1n2dJmxqFtENRPhYWsqi8Mhg2p39MpTzsm6phzMP",
        collateralSupplyAddress: "EPNB8NiL3vFDYQhSZY5LQAoW6AJYLdwFXezXeyqiPvEM",
        liquidityAddress: "ByYuFLvwVW9NSKnGbnKSMToy3Ea9StJ4t7HjAmcTjk7w",
        liquidityFeeReceiverAddress:
          "2C2aefnxUSAMQrfey1hC6yHLh18BpjkwL1zAJCS9YqDG",
        userBorrowCap: 150000,
        userSupplyCap: 50000,
      },
      {
        liquidityToken: {
          coingeckoID: "terrausd-wormhole",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i/logo.png",
          mint: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
          name: "UST (Portal)",
          symbol: "UST",
          volume24h: "146384.60062934877",
        },
        pythOracle: "H8DvrfSaRfUyP1Ytse1exGf7VSinLWtmKNNaBhA4as9P",
        switchboardOracle: "8o8gN6VnW45R8pPfQzUJUwJi2adFmsWwfGcFNmicWt61",
        address: "Ab48bKsiEzdm481mGaNVmv9m9DmXsWWxcYHM588M59Yd",
        collateralMintAddress: "nZtL8HKX3aQtk3VpdvtdwPpXF2uMia522Pnan2meqdf",
        collateralSupplyAddress: "4HXDioboWL85gQocYNkWM62AB5ctrf8jVykSVco67Lzx",
        liquidityAddress: "5LyHdTXh1MSbRzE7xfTtfpV8W5eaySJnSiTs6FdHhrSo",
        liquidityFeeReceiverAddress:
          "4GctGML68E1kDcvskGTXRPY9ngxmxVnJXjpsJ68YBXPR",
        userSupplyCap: 10000000,
      },
      {
        liquidityToken: {
          coingeckoID: "lido-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
          mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
          name: "Lido Staked SOL",
          symbol: "stSOL",
          volume24h: "2118630.215250539",
        },
        pythOracle: "Bt1hEbY62aMriY1SyQqbeZbm8VmSbQVGBFzSzMuVNWzN",
        switchboardOracle: "9r2p6vyF8Wp5YB2DASK95yuXEakQth6wmUmV2DpH91WX",
        address: "5sjkv6HD8wycocJ4tC4U36HHbvgcXYqcyiPRUkncnwWs",
        collateralMintAddress: "QQ6WK86aUCBvNPkGeYBKikk15sUg6aMUEi5PTL6eB4i",
        collateralSupplyAddress: "9MBrzWjgw1sbca6X2M6YoUCQgN6udVeKp9oLFwuzPY2p",
        liquidityAddress: "7ma18yBbX37RbFHQXiq1XhP6c561nDnYSmF84mwiY7Wo",
        liquidityFeeReceiverAddress:
          "6N5JTX3hXRwudgbVxbAbMvnrW1GB4QdpFGQgYonaWj4C",
        userBorrowCap: 200000,
        userSupplyCap: 300000,
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw",
        collateralMintAddress: "993dVFL2uXWYeoXuEBFXR4BijeXdTv4s6BzsCjJZuwqk",
        collateralSupplyAddress: "UtRy8gcEu9fCkDuUrU8EmC7Uc6FZy5NCwttzG7i6nkw",
        liquidityAddress: "8SheGtsopRUDzdiD6v6BR9a6bqZ9QwywYQY99Fp5meNf",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userBorrowCap: 50000000,
        userSupplyCap: 30000000,
      },
      {
        liquidityToken: {
          coingeckoID: "raydium",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
          mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
          name: "Raydium",
          symbol: "RAY",
          volume24h: "4464371.28248323",
        },
        pythOracle: "AnLf8tVYCM816gmBjiy8n53eXKKEDydT5piYjjQDPgTB",
        switchboardOracle: "2oALNZVi5czyHvKbnjE4Jf2gR7dNp1FBpEGaq4PzVAf7",
        address: "9n2exoMQwMTzfw6NFoFFujxYPndWVLtKREJePssrKb36",
        collateralMintAddress: "2d95ZC8L5XP6xCnaKx8D5U5eX6rKbboBBAwuBLxaFmmJ",
        collateralSupplyAddress: "6uEjo58ecepRyYnKRLdAMRn8ic3oJJxnwMBH96ufMSXN",
        liquidityAddress: "5JT6EK5wLEYGpAXMY2BXvhoeuQCp93eo4os2EtXwnPG1",
        liquidityFeeReceiverAddress:
          "2E15BsCyBeAu9TwhWKQ9yWj9a4TKoPkv7B1JjNxFF7v7",
        userBorrowCap: 500000,
        userSupplyCap: 250000,
      },
      {
        liquidityToken: {
          coingeckoID: "mercurial",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K/logo.png",
          mint: "MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K",
          name: "Mercurial",
          symbol: "MER",
          volume24h: "35844.26052415748",
        },
        pythOracle: "G4AQpTYKH1Fmg38VpFQbv6uKYQMpRhJzNPALhp7hqdrs",
        switchboardOracle: "CdznYotJgeszFkEy3p22JtX49EnZaFGZLqLoUgVzHHuh",
        address: "5Sb6wDpweg6mtYksPJ2pfGbSyikrhR8Ut8GszcULQ83A",
        collateralMintAddress: "BsWLxf6hRJnyytKR52kKBiz7qU7BB3SH77mrBxNnYU1G",
        collateralSupplyAddress: "FeWc3QLKQBYS3RbrzEzj4ADsdNtQStomNepajeubY9cW",
        liquidityAddress: "CNREdzCSa2X5HQ6xjDZ1jd2XN3nmwTHfQkYj9pWAZuXs",
        liquidityFeeReceiverAddress:
          "8hWXJ8jY6WrnbRM47hJZbstfBz3eX9HtsPTHvv2RJH2D",
        userSupplyCap: 8000000,
      },
      {
        liquidityToken: {
          coingeckoID: "wrapped-ethereum-sollet",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png",
          mint: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
          name: "Wrapped Ethereum (Sollet)",
          symbol: "soETH",
          volume24h: "40248.72044404469",
        },
        pythOracle: "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        switchboardOracle: "HNStfhaLnqwF2ZtJUizaA9uHDAVB976r2AgTUx9LrdEo",
        address: "3PArRsZQ6SLkr1WERZWyC6AqsajtALMq4C66ZMYz4dKQ",
        collateralMintAddress: "AppJPZka33cu4DyUenFe9Dc1ZmZ3oQju6mBn9k37bNAa",
        collateralSupplyAddress: "2Yv6ZgZ9ccV8bCYD7T5t2kcAQYRbukMKha6NiPQ8cFAT",
        liquidityAddress: "B7Lg4cJZHPLFaGdqfaAWG35KFFaEtBMmRAGf98kNaogt",
        liquidityFeeReceiverAddress:
          "8RS6VQM1RcuVUrQmfHgF3RAUPCbsbmejgbvTLvr8ZgrV",
        userSupplyCap: 5000,
      },
      {
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
      },
      {
        liquidityToken: {
          coingeckoID: "ethereum-wormhole",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
          mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
          name: "Ether (Portal)",
          symbol: "ETH",
          volume24h: "186409.23539400203",
        },
        pythOracle: "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        switchboardOracle: "HNStfhaLnqwF2ZtJUizaA9uHDAVB976r2AgTUx9LrdEo",
        address: "CPDiKagfozERtJ33p7HHhEfJERjvfk1VAjMXAFLrvrKP",
        collateralMintAddress: "FbKvdbx5h6F86h1pZuEqv7FxwmsVhJ88cDuSqHvLm6Xf",
        collateralSupplyAddress: "BtGoQiwEWUZQfNaxSxzBgRikfT1rx3hSkzjQEWvktEMe",
        liquidityAddress: "8HAaZSiCbVqrLDQHxg3yey8JWuGbeyC2tNTEmzgmt4C4",
        liquidityFeeReceiverAddress:
          "86FvZEpX1y6pK5E6JPLbhoBvp6P2n1givZiikFGgi6Lj",
        userBorrowCap: 1500,
        userSupplyCap: 5000,
      },
      {
        liquidityToken: {
          coingeckoID: "saber",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1/logo.svg",
          mint: "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1",
          name: "Saber Protocol Token",
          symbol: "SBR",
          volume24h: "105989.75373942903",
        },
        pythOracle: "8Td9VML1nHxQK6M8VVyzsHo32D7VBk72jSpa9U861z2A",
        switchboardOracle: "HFDJtPwJSn2kv96mn5wYUKVhA2QHbphfNtjGeKuyfXnm",
        address: "Hthrt4Lab21Yz1Dx9Q4sFW4WVihdBUTtWRQBjPsYHCor",
        collateralMintAddress: "Bpm2aBL57uqVhgxutfRVrbtnjDpZLV8PZrRrytV1LgeT",
        collateralSupplyAddress: "9wSy4XV4XN1hzp9nuC8TbCc78zDkWgu8tGNABH4cpBG5",
        liquidityAddress: "86hiF77ktrdVFU9xFqxsYChRirgs9KCvQDD9g4jT64bJ",
        liquidityFeeReceiverAddress:
          "7mjo1oAYVcAQmysfS64LTYi2ZkKJFveymmhYVasEc1nh",
        userSupplyCap: 20000000,
      },
      {
        liquidityToken: {
          coingeckoID: "serum",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
          mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
          name: "Serum",
          symbol: "SRM",
          volume24h: "9919688.647507345",
        },
        pythOracle: "3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym",
        switchboardOracle: "CUgoqwiQ4wCt6Tthkrgx5saAEpLBjPCdHshVa4Pbfcx2",
        address: "5suXmvdbKQ98VonxGCXqViuWRu8k4zgZRxndYKsH2fJg",
        collateralMintAddress: "4CxGuD2NMr6zM8f18gr6kRhgd748pnmkAhkY1YJtkup1",
        collateralSupplyAddress: "D52HyVBEMWy2WBptV5zsPuYS8W8C62gYjYKuVzaK1ruM",
        liquidityAddress: "4JHVBtmMPFyRpidxHtM8gVjGuLBXhaXCF4jNFFKBdGpb",
        liquidityFeeReceiverAddress:
          "AkwRd7hZ35BmnYvj9S5PgVpiBQfuzxaapshJe9PCN5hh",
        userBorrowCap: 300000,
        userSupplyCap: 150000,
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf/icon.png",
          mint: "2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf",
          name: "Saber USDT-USDC LP",
          symbol: "USDT-USDC",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "GnTHvhe4opQXHL4JGgDpfQKk2JY1ugmVLWvJocTH639q",
        address: "9mZsd1b9cN7JyqJvkbqhVuTfg8PAuKjuhPxpcsVNjYoC",
        collateralMintAddress: "6XrbsKScacEwpEW5DVNko9t5vW3cim9wktAeT9mmiYHS",
        collateralSupplyAddress: "fh6Bv7k29VBYTnXBRNJX9Gqk9pZVRxwj1vjcg6M2R3M",
        liquidityAddress: "AZkoTbjXJubLng1MSa5beFks93KpArVu3f3efGvNB6CH",
        liquidityFeeReceiverAddress:
          "2Us5qmLmBx6rCXMg7mJGQFwvG1kq1opTvVwPKt5G8oHi",
        userBorrowCap: 0,
        userSupplyCap: 100000,
      },
      {
        liquidityToken: {
          coingeckoID: "wrapped-bitcoin-sollet",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
          mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
          name: "Wrapped Bitcoin (Sollet)",
          symbol: "BTC",
          volume24h: "161093.31333291187",
        },
        pythOracle: "GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU",
        switchboardOracle: "8SXvChNYFhRq4EZuZvnhjrB3jJRQCv4k3P4W6hesH3Ee",
        address: "GYzjMCXTDue12eUGKKWAqtF5jcBYNmewr6Db6LaguEaX",
        collateralMintAddress: "Gqu3TFmJXfnfSX84kqbZ5u9JjSBVoesaHjfTsaPjRSnZ",
        collateralSupplyAddress: "9HrQ9RuRsHjKXuAbZzMHMrYuyq62LjY3B7EBWkM4Uyke",
        liquidityAddress: "4jkyJVWQm8NUkiJFJQx6ZJQhfKLGpeZsNrXoT4bAPrRv",
        liquidityFeeReceiverAddress:
          "9CjhBpwiQbP2zYnj7PqHTxPPp2BCR4Y4rP4ZPWkqrCQk",
        userBorrowCap: 500,
        userSupplyCap: 500,
      },
      {
        liquidityToken: {
          coingeckoID: "tether",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          name: "USDT",
          symbol: "USDT",
          volume24h: "18517276678.369102",
        },
        pythOracle: "3vxLXJqLqF3JG5TCbYycbKWRBbCJQLxQmBGCkyqEEefL",
        switchboardOracle: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
        address: "8K9WC8xoh2rtQNY7iEGXtPvfbDCi563SdWhCAhuMP2xE",
        collateralMintAddress: "BTsbZDV7aCMRJ3VNy9ygV4Q2UeEo9GpR8D6VvmMZzNr8",
        collateralSupplyAddress: "CXDxj6cepVv9nWh4QYqWS2MpeoVKBLKJkMfo3c6Y1Lud",
        liquidityAddress: "3CdpSW5dxM7RTxBgxeyt8nnnjqoDbZe48tsBs9QUrmuN",
        liquidityFeeReceiverAddress:
          "Cpyk5WRGmdK2yFGTJCrmgyABPiNEF5eCyCMMZLxpdkXu",
        userBorrowCap: 10000000,
        userSupplyCap: 5000000,
      },
      {
        liquidityToken: {
          coingeckoID: "solend",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png",
          mint: "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
          name: "Solend",
          symbol: "SLND",
          volume24h: "66488.6493849056",
        },
        pythOracle: "HkGEau5xY1e8REXUFbwvWWvyJGywkgiAZZFpryyraWqJ",
        switchboardOracle: "7QKyBR3zLRhoEH5UMjcG8emDD2J2CCDmkxv3qsa2Mqif",
        address: "CviGNzD2C9ZCMmjDt5DKCce5cLV4Emrcm3NFvwudBFKA",
        collateralMintAddress: "D3Cu5urZJhkKyNZQQq2ne6xSfzbXLU4RrywVErMA2vf8",
        collateralSupplyAddress: "Cc8DRe9wagmkVBeeeLsjgkAk7fkpyZt7XF8Ts3ddyYXd",
        liquidityAddress: "5pHGhh9pjzHP6fWQF4wQ3CKWpZM3YaerRJYN6RLTtZ5m",
        liquidityFeeReceiverAddress:
          "FtsXfVZWLgMWJH1owUmLhtET5KW1Ck8oykYXyPMkxFcE",
        userBorrowCap: "250000",
        userSupplyCap: 500000,
      },
      {
        liquidityToken: {
          coingeckoID: "orca",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
          mint: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
          name: "Orca",
          symbol: "ORCA",
          volume24h: "55416.4382377343",
        },
        pythOracle: "4ivThkX8uRxBpHsdWSqyXYihzKF3zpRGAUCqyuagnLoV",
        switchboardOracle: "7ySvXU4NSxBuuQZj3pG5qwqNTepMFa8XQNLGivM4qkEy",
        address: "FKZTsydxPShJ8baThobis6qFxTjALMkVC49EA88wqvm7",
        collateralMintAddress: "E9LAZYxBVhJr9Cdfi9Tn4GSiJHDWSZDsew5tfgJja6Cu",
        collateralSupplyAddress: "FELidXszawDEujYLV7A5u7XXFCsPCNvTHm1heJbnh36G",
        liquidityAddress: "5grnVTzYxhhhbiSdbkznMff721ZPMP3SzYhy2Yzd37jt",
        liquidityFeeReceiverAddress:
          "GHoC6JumDEw5CB35wqMwZK2G6NmrhjynKAdNnVNUP9ie",
        userBorrowCap: 250000,
        userSupplyCap: 150000,
      },
      {
        liquidityToken: {
          coingeckoID: "msol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          name: "Marinade staked SOL (mSOL)",
          symbol: "mSOL",
          volume24h: "1207000.2672476112",
        },
        pythOracle: "E4v1BBgoso9s64TQvmyownAVJbhbEPGyzA3qn4n46qj9",
        switchboardOracle: "CEPVH2t11KS4CaL3w4YxT9tRiijoGA4VEbnQ97cEpDmQ",
        address: "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",
        collateralMintAddress: "3JFC4cB56Er45nWVe29Bhnn5GnwQzSmHVf6eUq9ac91h",
        collateralSupplyAddress: "FG7yuhS6udX8v2LQYxqwpcsdC2J1pUREoGrRYsQjr1uh",
        liquidityAddress: "3R5SVe3qABRUYozgeMNVkSotVoa4HhTFFgWgx2G2QMov",
        liquidityFeeReceiverAddress:
          "83r2poRUiqaghyymPtfhhRtHdReFAKbgGGCQajkczW5w",
        userBorrowCap: 500000,
        userSupplyCap: 500000,
      },
      {
        liquidityToken: {
          coingeckoID: "ftx-token",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3/logo.png",
          mint: "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3",
          name: "Wrapped FTT (Sollet)",
          symbol: "soFTT",
          volume24h: "23097697.036991008",
        },
        pythOracle: "8JPJJkmDScpcNmBRKGZuPuG2GYAveQgP3t5gFuMymwvF",
        switchboardOracle: "57EF89YgEUUcxtm8upPFmi7rHVzfJDMVsm2BHgtVM3yR",
        address: "2dC4V23zJxuv521iYQj8c471jrxYLNQFaGS6YPwtTHMd",
        collateralMintAddress: "A38TjtcYrfutXT6nfRxhqwoGiXyzwJsGPmekoZYYmfgP",
        collateralSupplyAddress: "HbMugfk2UDNoCiBUqgXdPu75ksMZHvkJjRZ8YKrcPwz2",
        liquidityAddress: "9ZdwVAZsqFWtzNNGZhmQJttYQxTCVPRnaXMgA2KrQpLK",
        liquidityFeeReceiverAddress:
          "J4Zttvtnt2ECLyyEaxQRywAQEN4xcbHsgMF1Fhgdyow9",
        userSupplyCap: 50000,
      },
    ],
  },
  {
    name: "Coin98",
    isPrimary: false,
    description: "",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "7tiNvRHSjYDfc6usrWnSNPyuN68xQfKs1ZG2oqtR5F46",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "8web9hJK4TQJBV23WQpBw9jMvn3YE1EV3PEcnXJvgwQa",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "Lj3y2beRYhCaQQH9SYjmMJv3uuTcqpCJjQYe4829FAL",
        address: "46Lh1P2XmTNG8Gnt4zkTdG1BXi2V18NggfYTbXpSzAYy",
        collateralMintAddress: "ErJswCkk3oRS9poFdRxJHt6j9yQisTB8YQAqJkE7iC5U",
        collateralSupplyAddress: "BdjGeJQNEZhCLyW89RNWgxkn3hwRMsAxncc29QNuHvRf",
        liquidityAddress: "Fr3A2agcj8G8jEVPhE1rYUQsGF85meEN5fDQ4etFp5Wi",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
        userSupplyCap: 400000,
      },
      {
        liquidityToken: {
          coingeckoID: "usdh",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
          mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          name: "USDH Hubble Stablecoin",
          symbol: "USDH",
          volume24h: "564264.4409187818",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "37NFcKPTgqUVx3gwTQ4c2Q94oJWk2xZy3NQUXtDixReb",
        address: "3eDDvVgyxZ7aWLjLmKDYpeGHidCH7jkfHXcCXtpGqNKg",
        collateralMintAddress: "AGhAmBTQGHhDWSwmBCL91GRyv7FP3HRZarmRK6XccnM7",
        collateralSupplyAddress: "CeuaEJwGcLrAbUGaf3U3pyGpWyWujCTbVxc7bWJwBZnw",
        liquidityAddress: "BwJcKTcekXM59ML7p4gnjQEQ4p9hp5MBg4FeUS3DSdCr",
        liquidityFeeReceiverAddress:
          "5ZBZ37C9BiEHarAcnWeCyLwp8E1YnVQ7AWHRZwhhtTpR",
        userSupplyCap: 400000,
      },
      {
        liquidityToken: {
          coingeckoID: "parrot-usd",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS/logo.svg",
          mint: "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
          name: "PAI (Parrot USD)",
          symbol: "PAI",
          volume24h: "8914.25271221871",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "G26LmGqGvoggYQm2zEKD15rL4LutkZFrtP8mRPd6gPjk",
        address: "A3cQwWXzsaC5nfLDf7cbakZeBAJFGf1qMxvnf4yDRUUJ",
        collateralMintAddress: "CKUk55h1JcyK7DsvSYjYVw5XiEgrB2LgXMfyuBBnRmHT",
        collateralSupplyAddress: "97AFq1qdq5rWyyaQFybFCt2bkLSk5VWuC15LPbeFZZKV",
        liquidityAddress: "7bcdN2XJBhaDuQpH7vtS6dC1spQYEogQRQyCpXKiPJir",
        liquidityFeeReceiverAddress:
          "8fXGHJ6ArM9cyaZkaBFsLDM4W5HdPofjMFoHgX3Bb7K7",
        userSupplyCap: 400000,
      },
      {
        liquidityToken: {
          coingeckoID: "terrausd-wormhole",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i/logo.png",
          mint: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
          name: "UST (Portal)",
          symbol: "UST",
          volume24h: "146384.60062934877",
        },
        pythOracle: "H8DvrfSaRfUyP1Ytse1exGf7VSinLWtmKNNaBhA4as9P",
        switchboardOracle: "8o8gN6VnW45R8pPfQzUJUwJi2adFmsWwfGcFNmicWt61",
        address: "B5513y5wt161CxLX5U2o5cGFHYbcGMuTKc6yu1ni3AbC",
        collateralMintAddress: "DWYPVVz79kAbbiL42rWtmWoyvDX9M7aGLyf9Cu7Ewvds",
        collateralSupplyAddress: "9LgyN4yyT7gYWm9MCFrRX7uapcqQ1v4CBUYcaeqU9eP2",
        liquidityAddress: "F98wY9aiUnQL24ecXMRDptvhnmF4dkPccQdAZRhnKNrp",
        liquidityFeeReceiverAddress:
          "4GctGML68E1kDcvskGTXRPY9ngxmxVnJXjpsJ68YBXPR",
        userSupplyCap: 400000,
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "GdJd6a8ZWQVjQFhoKpCJKrrG7dU3ov2MNQ8rj4EARCmw",
        collateralMintAddress: "6WDm8BdBwF7pas1R8L7WRpznL9TgmUjnw3AoQszr9cJ4",
        collateralSupplyAddress: "BmY62w3HydkSuWX62X9znJ2iUwDU2VST3D8VNeQ9kx5T",
        liquidityAddress: "3WRMWh6BAB5H3nSbkaRYpC1C8pE86JF184Tdf5F9vw2s",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userSupplyCap: 400000,
      },
      {
        liquidityToken: {
          coingeckoID: "hedge-usd",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png",
          mint: "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
          name: "Hedge USD",
          symbol: "USH",
          volume24h: "733015.0960043964",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "8iMLNqCjJmXoYWxjh41cr2w8EGqN2QwLx6h21EgFQnfe",
        address: "5twXA9pwa6P3pmKz5NRiviffgGT1bqmf5d1dXVxJL895",
        collateralMintAddress: "3D3QV1tyMaAoFqvjivBTZbqvat59B7nRSZwtgvwx3HWV",
        collateralSupplyAddress: "6EtKSz1BbkWEmeocBHHyF2eetXN8N9z8JtAfL3UECAoX",
        liquidityAddress: "3gAcqYe7xJkAeVU6gceFbLfzhH8enyAgeRvX3Y1S78Ta",
        liquidityFeeReceiverAddress:
          "A1Q7rKGLHu4NoVuLPP3iKjctMRci8ydxWt1nykG5kLBU",
        userSupplyCap: "400000",
      },
      {
        liquidityToken: {
          coingeckoID: "coin98",
          decimals: 6,
          logo: "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/c98-512.svg",
          mint: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
          name: "Coin98",
          symbol: "C98",
          volume24h: "5732779.807303032",
        },
        pythOracle: "45rTB9ezDcTX5tMZx2uJUBbBEqAWDhXykYbBfaSWUXvD",
        switchboardOracle: "6Lh96cq8JN9VuzRcRa6u27GXKi6P4f2SvSYJ41TqhsnZ",
        address: "9bVRrxPjXBxM6rEyTLcR2opvdA2UGhdDwL8CLLm1b8KP",
        collateralMintAddress: "VTyR5PvnbNAp7uAg7kr9cfAhNZEodoJrCTRGC67pAjP",
        collateralSupplyAddress: "5gurmwpjQTgcFAh8xR6ZePe2jNC6qnp4Y3EkY4Dm8iNm",
        liquidityAddress: "5w4MvZvso7Shbr9Fd1mVd5nKUuRPHQ98Jxwz7wkFqVSt",
        liquidityFeeReceiverAddress:
          "CcizC7YGvroMgk6zhW5MoCt2CQtF1NXxtWhAv53Q7VFe",
        userSupplyCap: 200000,
      },
    ],
  },
  {
    name: "AMM",
    isPrimary: false,
    description:
      "The AMM pool allows users to deposit or borrow governance tokens belonging to various AMM protocols in the Solana ecosystem. You can use this pool to conduct interesting pair trades.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "Au3S1ZSkGwm1fo7g3WFhkD1rcPoUXj7h5ubsGsUFqbLX",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "4JjjbmnUEQY9P9CUdax9F8LQnVCkykkCVdRM2yJLc6PN",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "serum",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
          mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
          name: "Serum",
          symbol: "SRM",
          volume24h: "9919688.647507345",
        },
        pythOracle: "3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym",
        switchboardOracle: "CUgoqwiQ4wCt6Tthkrgx5saAEpLBjPCdHshVa4Pbfcx2",
        address: "3LE48upFRQZ7YtpG7Cn5BHCQkV5T9CdrsZNxzfGMMvJE",
        collateralMintAddress: "9igUyqu9HdVqG4pLg8QkwVWRaFEeTvdhXQr7Dsjmz1zx",
        collateralSupplyAddress: "qFxBrvhJGnn925SSZaewYdhw91gDmAtF8MsHE684yw3",
        liquidityAddress: "BN1UqE38GS6jmKgWPTHPgz7mQwbDZ9SukH9juaChHUMZ",
        liquidityFeeReceiverAddress:
          "AkwRd7hZ35BmnYvj9S5PgVpiBQfuzxaapshJe9PCN5hh",
      },
      {
        liquidityToken: {
          coingeckoID: "raydium",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
          mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
          name: "Raydium",
          symbol: "RAY",
          volume24h: "4464371.28248323",
        },
        pythOracle: "AnLf8tVYCM816gmBjiy8n53eXKKEDydT5piYjjQDPgTB",
        switchboardOracle: "2oALNZVi5czyHvKbnjE4Jf2gR7dNp1FBpEGaq4PzVAf7",
        address: "2ToiSp1DBwwmsjFkSgvpf25gKAYV2Cn4ij2U4YVMuYzZ",
        collateralMintAddress: "91BnWsAEjZxVeif9ukvisTzsaVQY1dgFv611X1sKAjzN",
        collateralSupplyAddress: "7as19VMQg179qMrrjYdoWv8Z4zN2qNCQq4kCi8mchKmv",
        liquidityAddress: "43AxiJi7ZJ3eCa7wiFzJq7gdgmaMKsKVDHHVFXDAyKET",
        liquidityFeeReceiverAddress:
          "2E15BsCyBeAu9TwhWKQ9yWj9a4TKoPkv7B1JjNxFF7v7",
      },
      {
        liquidityToken: {
          coingeckoID: "aldrin",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp/logo.png",
          mint: "E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp",
          name: "Aldrin",
          symbol: "RIN",
          volume24h: "38232.517335357545",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "C3uxt2XLm6jtmMQPN5HrtJ9yVaT4SrSLn7fqiZqR6JV8",
        address: "6nb1odSYHutVAxoaQyiwPhQNTFn3nBNFdQdNCm5v9Jbp",
        collateralMintAddress: "7i7dsv8srRcERzd8EtUb6sZJoE4zVG49mH675QkAFJdX",
        collateralSupplyAddress: "3ZyXPjoawGfCG29iUtQsmcR1fivy65m8d5hdYWHPfivg",
        liquidityAddress: "5L2uRxWByUPp3nD95JDot9WMYhqW6Zc88Tek33Jjft6Q",
        liquidityFeeReceiverAddress:
          "BMZymdcDBmKvE9AaShXK292N7WUnxgtVurGPH1ZHZm96",
      },
      {
        liquidityToken: {
          coingeckoID: "step-finance",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png",
          mint: "StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT",
          name: "Step",
          symbol: "STEP",
          volume24h: "83322.10332353642",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "CdvmFaR2m3cL2YuDg9cSb2m3nKZX26vyVoBbB8aNMWaj",
        address: "4UvekRzs3Qn8sXfi9MhdzsjGAY8F1hBnMmB7SRmN6ZE4",
        collateralMintAddress: "EU6GmG99qnmKRUdkcQf6CdSAT2RFPXhpEgz49EhBry89",
        collateralSupplyAddress: "2rMCDgDNN3eKaFJKw7wsMUqoG63LtCU8yh924Vvs2DtU",
        liquidityAddress: "5cDUJAKSFbcijJnLfhqcT14Q2yqWgjDxg3C76hPwtbsk",
        liquidityFeeReceiverAddress:
          "Fzbt2QWmMsK7YW7AAF4nwkJMARpviPXo8CgfBX1oLD4u",
      },
      {
        liquidityToken: {
          coingeckoID: "lifinity",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp/logo.svg",
          mint: "LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp",
          name: "Lifinity",
          symbol: "LFNTY",
          volume24h: "690.5115023503153",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "APaudjcBM3h4hCvBbvnsz4KBsDpJdoGMtwM4tUYTSpoY",
        address: "2iTv6eAq1BUyUQA8jYu5iE39eepBcsPoSj43F1ZkXMoM",
        collateralMintAddress: "C9zCHrVXXzk5MRRz4qjLA7imNvKKGuj8T9hFMBKLMy8n",
        collateralSupplyAddress: "GfoQcMBfNWbE5BnBd8zS7UoJia2VnLhpmWza3XVzkWJv",
        liquidityAddress: "7gAxXSoC3hvpt6ssomyPFZRnerfExJYdGqfGH5jt25KM",
        liquidityFeeReceiverAddress:
          "8nXCVZgsskrzDCLDY9dg6TyFyx64JtgbfJ46ZCguF2WA",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "HmH5kEnwouZn6eWa9R7TxSG416tUrdrFUT2mZmgbzoNN",
        collateralMintAddress: "Gze1JDi6Ao6stVHYCWDuy3VN8Tsj9v4DJLdN6LRoT3Zj",
        collateralSupplyAddress: "3i6qK3hJyCXiLjMrwz5CUdLxphno1uPkwYFoihwqHV7h",
        liquidityAddress: "BfytjQv65qrweaeVYiQZCZJXFaFJVRwm4JGoQ7tmKcr9",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "orca",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
          mint: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
          name: "Orca",
          symbol: "ORCA",
          volume24h: "55416.4382377343",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "EHwSRkm2ErRjWxCxrTxrmC7sT2kGb5jJcsiindUHAX7W",
        address: "2xydNZJz9XE2ccEfD9eT2TGndFpe5sUdrr5VXmuuRgXQ",
        collateralMintAddress: "6TnqWYR7nfRTYBsNHK9UiqrogeW2WJnrxotsRRzq7BSB",
        collateralSupplyAddress: "34XVTZ3WmREXWWZyjJHLyZt3kLXdMjVZwXp9DYt5ofiv",
        liquidityAddress: "Guq9CYb5hP2Pi1Vtfr5BzYJc3D8v2n43DhMdD1wRNJ4z",
        liquidityFeeReceiverAddress:
          "GHoC6JumDEw5CB35wqMwZK2G6NmrhjynKAdNnVNUP9ie",
      },
    ],
  },
  {
    name: "BlazeStake",
    isPrimary: false,
    description:
      "BlazeStake is a liquid staking protocol, stake your SOL with them to receive bSOL. The BlazeStake Pool is part of their push for DeFi utility for bSOL, and contains bSOL and bSOL related LP tokens from Raydium and Saber. This pool allows you to leverage stake bSOL, or leverage yield farm with additional rewards!",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "8cG5U7tcQcnArWVqKnR324o3WakTpbs7ycXfVTMW9CvL",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "8zPeDyQWr8RQr3Y9rkH1bQS1fBAJbWKnScXgHewCFxW6",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
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
        address: "7iAKJQu7t8jMDEvfzfwvvxyvXiMmHVr5ourazJc1yB5s",
        collateralMintAddress: "14XycWQNFqk6s84bPvtL2CBd2bu3R9JzXo7Fgm6YATLP",
        collateralSupplyAddress: "CpjSpgHutRVQJt6AxaAewvo8NwhG1Q1Y9VPE2ka5DXhr",
        liquidityAddress: "6fX8HcemDkMLTjwKH8CnUjL8gNg1RLRomaRNkUqZ4p6s",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "blazestake-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
          mint: "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
          name: "BlazeStake Staked SOL (bSOL)",
          symbol: "bSOL",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "GE9mNqDGgL1SNt3QigswxmMNmnmjCsDYLowB6NEGAWbf",
        address: "B8BNfHzmddroz5MAmpZCJnSBpD6rWpdwdDVi6jmfs4Zy",
        collateralMintAddress: "2PGRmp9iDjAyPavcKJoNNUesc3vEXcTMvTE97fNibeUd",
        collateralSupplyAddress: "7ny2yD1gc4QRaZyQkUbcfAn1PrTvLZd4yyvC2RyLaRiw",
        liquidityAddress: "7tTyWUYrYxNXET9XonDg2tGAWUiK1tdwVmDogVekoHCL",
        liquidityFeeReceiverAddress:
          "AiTxuQoUyy4Rk9edTfrhezMkix4bTmCNvM8uBXEjcaoo",
      },
    ],
  },
  {
    name: "Atadia ",
    isPrimary: false,
    description:
      "This is an uncollateralized pool, Atadia can borrow USDC from this pool without putting up collateral.   Atadia is a team of veteran data analytics experts, who use a new machine learning model to assign PFPScore to different wallet addresses. Atadia will borrow USDC from this pool to lend to borrowers based on the PFPScore.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "7zxBGBQTgcYZb5x1C8GTTaK48pLsfxw52tpYtVmYTQ6E",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "GFXEXfupH1u8XEgNPDk4H7dTCnC2f8dqgZR1mTEitCFL",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "4UVEzyUY5wmDSSG6sXFPBSMbRT233LW2jxUhhiHS8Cw2",
        collateralMintAddress: "85i6oBadAyJQfBxeRvBJm5Sj61RbLwSonRsg1CsVBhaS",
        collateralSupplyAddress: "DWidrdTwDXoAU3pDMmpPGqZqnn3L1ncEcQ9S6UNzcPmG",
        liquidityAddress: "8HpNbhxy3SupNJV1Ycs2SpAhqv68y3k2zX8XvzsC1Pdd",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://www.arweave.net/BhqFFespziD6gfxSykFwqrnQdHAjNjr3abFOdw-CQb0?ext=jpeg",
          mint: "6C5tFBtLtJKNwLqgnE4RAE6xvZsaFyPh4WcBaYdA2bDT",
          name: "Potato",
          symbol: "CDT",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "5qV4LAQcxjESJ6cbdRnKFHtYejczYUtGxsc6PoMuyNSd",
        collateralMintAddress: "BbL8LiZoshPCGLGknrCRuKV3aS6yNLUeCpWG6P9zoQzq",
        collateralSupplyAddress: "AXEAdp7ggrEy6jZtQNSnCGxz1232YxEyQqvqQsXhmjER",
        liquidityAddress: "4NMUYJoUAomwWDt7Eosvp9N5XoXRwwX5girhM2fEEi2E",
        liquidityFeeReceiverAddress:
          "8EYsTfXc3pMZ5WSHGFwsVsaFB4dgYK3ocavTPLaWCPuR",
      },
    ],
  },
  {
    name: "Hedge",
    isPrimary: false,
    description:
      "The Hedge pool let's you borrow USH against LP tokens and other assets, while being rewarded in HDG tokens for doing so. Deposit tokens here to borrow USH, before deploying them in the rest of the ecosystem! ",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "AQWuUZyhUQsUNRcw5GqhKSzQZNSNd3jwteS1X1A9C5g5",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "DroVY6f7FPKt9XtXPAGSTukEQL3R2fjT49ZT9GwtWWut",
    owner: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    reserves: [],
  },
  {
    name: "MAI",
    isPrimary: false,
    description:
      "MAI is a leading stablecoin on EVM chains, governed by the QiDao Protocol. This MAI pool enables users to deposit top crypto assets such as Bitcoin, Ethereum and Solana, to borrow MAI against. Users can then use MAI around the Solana ecosystem. ",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "CbJYYQnKnDwzvEFiPuHyxUaajDgcaLgMz7EADK6j8etC",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "GFivMn46HAeuxRLGfC4kS8q1km3JcLm6ekeexoCRUpc9",
    owner: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "wrapped-bitcoin-sollet",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
          mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
          name: "Wrapped Bitcoin (Sollet)",
          symbol: "BTC",
          volume24h: "161093.31333291187",
        },
        pythOracle: "GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU",
        switchboardOracle: "8SXvChNYFhRq4EZuZvnhjrB3jJRQCv4k3P4W6hesH3Ee",
        address: "2QUkvQMhi9ZQbF6rCKnoFCB7n2matvEzZqyUDofoGL4E",
        collateralMintAddress: "6PxcpCGiYdfepkG5ZyPWoFEA7dMdpof55g1meiWCDRdD",
        collateralSupplyAddress: "3ZYB4hbEsveBKBYXdLA6p5oV9Xyhc7hz4dj8ytz8T3Ra",
        liquidityAddress: "HWRNESMDyKZ6Br2ybkmb6VG4xh8xzbj9YstP2zhVYnib",
        liquidityFeeReceiverAddress:
          "9CjhBpwiQbP2zYnj7PqHTxPPp2BCR4Y4rP4ZPWkqrCQk",
      },
      {
        liquidityToken: {
          coingeckoID: "ethereum-wormhole",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
          mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
          name: "Ether (Portal)",
          symbol: "ETH",
          volume24h: "186409.23539400203",
        },
        pythOracle: "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        switchboardOracle: "HNStfhaLnqwF2ZtJUizaA9uHDAVB976r2AgTUx9LrdEo",
        address: "2K1zE2KkrBEY23tPWMRZUXHiGzohLvJy2syiYqv2a99H",
        collateralMintAddress: "uPn3VtC5pqPghDyngkq16V8btMCfMPC4H5WtZKHCNGf",
        collateralSupplyAddress: "9Kmj4ArtkhVkid2Mz2Gmn2o34Roi8qWhn3UH4tzGau3f",
        liquidityAddress: "8tPGqS7hk3wvXe3h1rAxAKYrs6Z34UZcA17dBUHsy36L",
        liquidityFeeReceiverAddress:
          "86FvZEpX1y6pK5E6JPLbhoBvp6P2n1givZiikFGgi6Lj",
      },
      {
        liquidityToken: {
          coingeckoID: "lido-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
          mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
          name: "Lido Staked SOL",
          symbol: "stSOL",
          volume24h: "2118630.215250539",
        },
        pythOracle: "Bt1hEbY62aMriY1SyQqbeZbm8VmSbQVGBFzSzMuVNWzN",
        switchboardOracle: "9LNYQZLJG5DAyeACCTzBFG6H3sDhehP5xtYLdhrZtQkA",
        address: "VkDtG5iaPRiegLzfiEJx1sNo9boayhraESyQ1gcBBkB",
        collateralMintAddress: "HgwyRGrENCu8NytGpdporgJQckH5VyxdeKAMrEc6xKVC",
        collateralSupplyAddress: "FjKAxaSCFvmwA262pZ844ZP8vCYLAEDVAP85U484YZXp",
        liquidityAddress: "6Qr3Qaz6gAePNpCKsJMaTfFJrJ53ruPW1gqWi2nao9J",
        liquidityFeeReceiverAddress:
          "6N5JTX3hXRwudgbVxbAbMvnrW1GB4QdpFGQgYonaWj4C",
      },
      {
        liquidityToken: {
          coingeckoID: "mimatic",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/0xlaozi/qidao/main/images/mimatic-red.png",
          mint: "9mWRABuz2x6koTPCWiCPM49WUbcrNqGTHBV9T9k7y1o7",
          name: "MAI Stablecoin",
          symbol: "MAI",
          volume24h: "1296203.4272216226",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "2p5nL8UM2X4MMjg3GqNBxGURaGGUwH2vUbt7t2VcQhLq",
        collateralMintAddress: "82FvjxDmvDoGFeB1PnWAX8vec81BWFxUeHdWDqUjrGSW",
        collateralSupplyAddress: "8MKCmYb9nNoQTYJGdh2YLW2L3b2yjzqmZcqbXYapL14E",
        liquidityAddress: "GfMyL2RnJsPL1iJnEDJHygfvBrkaqfL6bL6QMAwNsEdn",
        liquidityFeeReceiverAddress:
          "AzCYV1L1LHJrknG9Q3ob16N5dwQ5Ct9KR9NWeFQFvVy6",
      },
    ],
  },
  {
    name: "Nazare Stablecoin",
    isPrimary: false,
    description:
      "Nazare LPs (nLPs) are automated vault strategies that manage Orca whirlpool positions to maximize return and reduce impermanent loss. Deposit Stablecoin nLP tokens as collateral to borrow stablecoins and lever up on your LP positions. ",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "3HGyDbSY5JJRcx1ZXJ2xqxqXJHcKEjBhLmks8th36fQ9",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "29XZFcXFNqv8pfMMswRkXLWUTTmVosDFX9ipB3rAVZcY",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://www.nazare.so/coin-logos/usdc-usdt.png",
          mint: "5rMWS2wTiW9dcv4WpXt3jNfn6uHgGSELfsa2ftkQA7Zw",
          name: "Nazare USDC/USDT",
          symbol: "nUSDC/USDT",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "7or1bhoEUuYSuFNLbw6RXEdEbo43LXe127LsVAv1xdRV",
        address: "FbvxxBovZDyLuTgcuAoYoVY55evgKq3wRRPagyteUhiS",
        collateralMintAddress: "Ei8c5vgGue9jLDQxAB61yabj92xEWEk78jKqCSJjBYkj",
        collateralSupplyAddress: "C9UNmVdnV8vL2p8b39GNUdwaCYgkAXYVMkrorcw2YgC",
        liquidityAddress: "6fo6iHTt7qRf8dxpepfJX95Q27X6azrwMudoR9m3vvse",
        liquidityFeeReceiverAddress:
          "4LdmzKAj2BarNSN3ZL5yj4d6nEEe4CJPndLDWFKpvk4S",
      },
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "FcSmdsdWks75YdyCGegRqXdt5BiNGQKxZywyzb8ckD7D",
        address: "GFBRLDrscdQt6Kx5sjEmKrSnzBvQvecWDhsWKVekN5G1",
        collateralMintAddress: "AJPgGq9bqSW1BQFjnmn6qopmW4ktWJN1oA6yWPmEvpBS",
        collateralSupplyAddress: "GiCYm5su62HUJUkpMyny7PNDe68hB4pBGKEL5W4pKh4a",
        liquidityAddress: "DTu6vWmdzdLemqBBRFML3djHUjqwjbwLrqZUai5C83dk",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://www.nazare.so/coin-logos/uxd-usdc.png",
          mint: "9z2a5zNvipEQxjyFfZf3gV4nw9NCr73FdRs1iq3VjTXc",
          name: "Nazare UXD / USDC",
          symbol: "nUXD/USDC",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "9aNNzf1EyuLQ9EGU1UKxJkusjGsQ9HxH71cHAty4Kjb8",
        address: "GojC8BTCCWH6DhJqHP4WBUjNYLXuz47hZNzprL4NqCh5",
        collateralMintAddress: "Eni1eBYUzTBwuRkqFfBA1QhG8uE2wbwHXQY4xtF1Bvrj",
        collateralSupplyAddress: "DCXkjNmhn8KFXHinE81ZmVjVQoEiE8xUFLLzwwfLTvFP",
        liquidityAddress: "zJcU4APNi32CaYpZGj7p8vBxT4PyMjDHUN9TA8tTy3i",
        liquidityFeeReceiverAddress:
          "2JwCUcaGFWHAxebm5M9Zo5ahJEQnrWaq2HNR6ZzT7mL7",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "ACXQ2Jk9JSXp3Fe4Umbf9m2DShtUJzgY1oPNeLS32z54",
        collateralMintAddress: "HraCyHKU3V2zGEyFFLp2D8cJecRAPYUGBYStGwa13nDJ",
        collateralSupplyAddress: "6jiE8jfymvrHKVnphSQhPy4HCK9qq2MUbpaQB8KHQCNb",
        liquidityAddress: "5FvFHgxdf4zf1uCfZ2snsuiDPJ895BLzAV3FreK1zHTu",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "tether",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          name: "USDT",
          symbol: "USDT",
          volume24h: "18517276678.369102",
        },
        pythOracle: "3vxLXJqLqF3JG5TCbYycbKWRBbCJQLxQmBGCkyqEEefL",
        switchboardOracle: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
        address: "CtVcJLg9dxmJU3br4fdiTe8hNPcVXjAnGTRJ9XzdEnpU",
        collateralMintAddress: "59s34VEBDT891fxYH4CgSRAQLGTamsfCq7UcnoAKm1D9",
        collateralSupplyAddress: "BEKC33gwGTwJEM3m7pHb5DfUGN7RM8F5SvA2dqwpLjxh",
        liquidityAddress: "4uqjC4fyF682PC2y7pCG5fCGo8RfAcvJMtfg8dsRfErU",
        liquidityFeeReceiverAddress:
          "Cpyk5WRGmdK2yFGTJCrmgyABPiNEF5eCyCMMZLxpdkXu",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://www.nazare.so/coin-logos/ush-ush.png",
          mint: "Grwu1bWQ6HNqbY225EuYf3C4kL3835WQPgnff2a89vPw",
          name: "Nazare USH / USDC",
          symbol: "nUSH/USDC",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "E84zPU7Ms2n2pV7GWStmup2FZrxPz1qurXXjrWRQx56v",
        address: "B7mhAMjbu87TG8CbFCwgEcV8Kcfw8H6rEZcoyB32evFA",
        collateralMintAddress: "573L4VLz8a41sdo6AD1hW44zSxxyiPo8qUgJv141Fwei",
        collateralSupplyAddress: "B8M4TGpsomVenYzivHQT5mQxo7MUqUSBV6AcdUFzg2f4",
        liquidityAddress: "GsxjiGCNgFjQVSdZq8Uk8MRoc2fH6fm4VP62qaEH7M1p",
        liquidityFeeReceiverAddress:
          "CC31DZ6vwuEEKHjWevF654G4XjAPv8XZQALYMnz8qpAb",
      },
      {
        liquidityToken: {
          coingeckoID: "hedge-usd",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png",
          mint: "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
          name: "Hedge USD",
          symbol: "USH",
          volume24h: "733015.0960043964",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "8iMLNqCjJmXoYWxjh41cr2w8EGqN2QwLx6h21EgFQnfe",
        address: "F8vkeEm3uoZJoystwW3bQDWKcmmMxdvasEFYHATFb7WZ",
        collateralMintAddress: "BYDUMwfWx1bTnhPjHkvAt7WhrFB32RzkB9ggKDuKfDTD",
        collateralSupplyAddress: "GKdnVYutejtYkhaGDf9cVrPcH4RySB491J1fZ2ei68qx",
        liquidityAddress: "BTkGxsBxythQmAymgUcdxXxAUCs8kxLShqjUUheYmcUk",
        liquidityFeeReceiverAddress:
          "A1Q7rKGLHu4NoVuLPP3iKjctMRci8ydxWt1nykG5kLBU",
      },
    ],
  },
  {
    name: "TURBO SOL",
    isPrimary: false,
    description:
      "The TURBO SOL pool offers increased LTV to allow a leveraged SOL position up to 10x. Higher leverage comes at the cost of increased liquidation risk so proceed with caution.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "55YceCDfyvdcPPozDiMeNp9TpwmL1hdoTEFw5BMNWbpf",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "EjUgEaPpKMg2nqex9obb46gZQ6Ar9mWSdVKbw9A6PyXA",
        collateralMintAddress: "HKijBKC2zKcV2BXA9CuNemmWUhTuFkPLLgvQBP7zrQjL",
        collateralSupplyAddress: "8YGu5iFMKHau2XjVBwKiyPjY2rYpbaLMyxfVhM916jPd",
        liquidityAddress: "49mYvAcRHFYnHt3guRPsxecFqBAY8frkGSFuXRL3cqfC",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
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
        address: "UTABCRXirrbpCNDogCoqEECtM3V44jXGCsK23ZepV3Z",
        collateralMintAddress: "AVxnqyCameKsKTCGVKeyJMA7vjHnxJit6afC8AM9MdMj",
        collateralSupplyAddress: "9QqRewoWbePkSH919xXn826h67ea1EFAVXhTdiJArDnx",
        liquidityAddress: "5cSfC32xBUYqGfkURLGfANuK64naHmMp27jUT7LQSujY",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
    ],
  },
  {
    name: "Bonfida",
    isPrimary: false,
    description: "",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "91taAt3bocVZwcChVgZTTaQYt2WpBVE3M9PkWekFQx4J",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "76Asux4XZYqrP61G52eRZRQ6GCUPQUmYme3hTCaNgmxv",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "EBRtjgHJiEBYnQ5QzTGcBxTwbapEQ3bvh1BrgaGzhX9e",
        collateralMintAddress: "7ziVqwra9BTyzXwFTL6JBMY4LtHdQZeQ9cqLkTKeYvoq",
        collateralSupplyAddress: "CoAKRsiTBt9vQK5irMS3HmLLRKEtSNuGLmb8RaxKnK7P",
        liquidityAddress: "HG9yB9xfeqxy4ZntKkLt8mzJ71ZsAf5cpsvybszZJ6Ni",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userSupplyCap: "400000",
      },
      {
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
        address: "3WPYWiZtc2uJq1JiF3Z3KswicFAp5VrFgEHwP3CkuDUn",
        collateralMintAddress: "2fHFudEbottFSbpe8oX5KyCDrnx8tfgL8PFj67iz9Y2h",
        collateralSupplyAddress: "AmVdrQeciRQiuisGKuuQrno6ZpygGimBvqFUwBTdrAZn",
        liquidityAddress: "urW2JA3FeBHjug7ingkuWh4rWJv3X8k2fnbQg2g8bNx",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
        userSupplyCap: "10000",
      },
      {
        liquidityToken: {
          coingeckoID: "bonfida",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp/logo.svg",
          mint: "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp",
          name: "Bonfida",
          symbol: "FIDA",
          volume24h: "9197953.606603334",
        },
        pythOracle: "ETp9eKXVv1dWwHSpsXRUuXHmw24PwRkttCGVgpZEY9zF",
        switchboardOracle: "GyiFJtWLYGGTCNTpnHCVKinzWpwLJN3PnscsRdqypFAL",
        address: "A3ZhKMuwHygRqjXiMDqM2PyeT35Z1LiDUqwrtjiHn89M",
        collateralMintAddress: "ArohPh341JrQsWk7paiUwJKDe4MjvhtE5XxjYUoiM2fH",
        collateralSupplyAddress: "FuFEvCPuCkCPn9rW3uZ7bcmLERxFzFJPRfSSyAyZNLzb",
        liquidityAddress: "CaVSnSWA1Tpbm79YY2SVtkkKp89AiDxifgdxoWyZLSom",
        liquidityFeeReceiverAddress:
          "61bnpU4YGZe6iHrg44HT1B3v4bPyvxwfqRixwP2ft6t6",
        userSupplyCap: "200000",
      },
    ],
  },
  {
    name: "Step",
    isPrimary: false,
    description:
      "Step Finance is a transaction aggregation and portfolio management platform that enables users to transact and monitor the entire Solana ecosystem in one easy to use location. The Step pool allows STEP and xSTEP tokens to be deposited and borrowed.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "DxdnNmdWHcW6RGTYiD5ms5f7LNZBaA7Kd1nMfASnzwdY",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "csotR9rcbLV3bCzBKxNJ3GjYhzH9cXffZX3TAQpw4oG",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G/logo.svg",
          mint: "xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G",
          name: "Staked Step",
          symbol: "xSTEP",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "7whYKCH5zQVQeLqgnWW6qXME3sxQozByaFbhbVwhYMkP",
        address: "HH9Aig5MAvMNcivGfAbWU5Da9nfiTwBaYJBK2KZyZppn",
        collateralMintAddress: "E1hgwtGqjT4po2vg1LFGvf5XiZgUZBQeabcstQympPPa",
        collateralSupplyAddress: "B4Gsh8FpAuxvVknRny2xSvdt3T1N15RAuDrt3Yg4FDVC",
        liquidityAddress: "38xTjUm1egfkDojm8jesRWtpy9j3fepPAwBgAHZFQMuD",
        liquidityFeeReceiverAddress:
          "8nzMDB9bp2BNpkL3QSgPEmCpevEhFrb8vigvLqxAzecv",
        userSupplyCap: 5000000,
      },
      {
        liquidityToken: {
          coingeckoID: "step-finance",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png",
          mint: "StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT",
          name: "Step",
          symbol: "STEP",
          volume24h: "83322.10332353642",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "CdvmFaR2m3cL2YuDg9cSb2m3nKZX26vyVoBbB8aNMWaj",
        address: "C5ozcRb4PJeJvakPeGgm9bgwcL6rPcKPfV95d2owW86C",
        collateralMintAddress: "9XtoqcLnc1psQuTPTGjfEwwabzBeUeFihvyZptcALwph",
        collateralSupplyAddress: "9PJCVs62fyRiQ1v9DqxD83TXDXqHabVeAUW2sHpsG13t",
        liquidityAddress: "CCfF5XivAg682CbZkHw4oMYj9wSTnEUeFLcn4pUjZJ8F",
        liquidityFeeReceiverAddress:
          "Fzbt2QWmMsK7YW7AAF4nwkJMARpviPXo8CgfBX1oLD4u",
        userSupplyCap: 5000000,
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "FCU2wpx3ED1dY7bKszzcyxUVNTduLurUEmCGGv2w3Lfm",
        collateralMintAddress: "7tBwN1tWTNsepwJcuD46zPBu6FuivWMvN2J5zP6HoPYg",
        collateralSupplyAddress: "BPhX4N7r9z9HQTAVDyfvVcYWbjsWiL476vsWAYYFh5Lg",
        liquidityAddress: "E4g9gNiwtxUcdaP8C7Sx99YVArWCceSkTSErpXGCnMuB",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
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
        address: "7trBAMkVU8dcPQVdScz7VNywZwqnD1rwXkwkVPQJ95bT",
        collateralMintAddress: "7criSZai4hqKukScLUa5W2UV6Q9pjFMdJjQphKavBqur",
        collateralSupplyAddress: "Cw43LkrYXWQUufbP11DKBJBikkxtXeseCuH1WMQDh6q",
        liquidityAddress: "FR1tYTYEcMhBiuETNs1b5DZft2pT6oEJBixDZ1Qe1WHw",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
    ],
  },
  {
    name: "Star Atlas",
    isPrimary: false,
    description:
      "Star Atlas is a blockchain-based, space-themed, grand strategy video game built on the Solana blockchain. With ATLAS pool, holders of the ATLAS and POLIS tokens will gain additional lending/borrowing utility.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "99S4iReDsyxKDViKdXQKWDcB6C3waDmfPWWyb5HAbcZF",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "2vhoVMQWEc12dUEEcJ6w8j3ZnrA4Tk6w8pPFhoWfVsUy",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "star-atlas",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png",
          mint: "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
          name: "Star Atlas",
          symbol: "ATLAS",
          volume24h: "757988.7311554682",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "63TGehKbqbaQUowgLudRybxQmT7p41NJxHEfkqUtyQRt",
        address: "8RX5oDxnydPPsA92epWnyXrrM26w7JgAQoVVt9kbiZwq",
        collateralMintAddress: "EHFzasjYT1VmeKtvPtPCytJugQFBoYdhXXBt2WazinfY",
        collateralSupplyAddress: "GCagCmPq1uUV43DtWSd4rKh3eP8JdxE2XSKCUBJzyK2X",
        liquidityAddress: "DGMYGHmQiCs9H1MUxe57H78Ea1jwkAynzEfDKXUkF6ZT",
        liquidityFeeReceiverAddress:
          "3iyLRAJyLS6QMkVs4aD5KiUBDizjxtqHv4RbX3hGCrRz",
        userSupplyCap: 40000000,
      },
      {
        liquidityToken: {
          coingeckoID: "star-atlas-dao",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk/logo.png",
          mint: "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
          name: "Star Atlas DAO",
          symbol: "POLIS",
          volume24h: "402200.66656951944",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "3wFcT6hG5RYarNS3Z8FwoanBRm4PN4MBhkCiJGKWBa3v",
        address: "29Znf6g5qmRfTdnbyRQUWvMt94Gzn2KPCzY2ixxY9Mnt",
        collateralMintAddress: "ZeTubq2tcT9s8sPGKihum5scLGoQDqtYd6BYAy15y2P",
        collateralSupplyAddress: "3E1Cinh4vYhqNKQmSBDTK8k6pxbLSr94eXWVDGvbatRP",
        liquidityAddress: "BnooBAnfoqbixXd7xJwiYBn3vU4UyE8G4uHAsfinCg3D",
        liquidityFeeReceiverAddress:
          "913RkijsY8rQxyuuoHs5hd4YETdhXBNwwd648ABEqXT4",
        userSupplyCap: 600000,
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "5hVVs474TRejwwfqsecNp97riQGDtSmhTV6jiWSxJfWR",
        collateralMintAddress: "HwdCShcytebyeLaU79FB5cD4RDJVWnN7vs5kCJr6nKf7",
        collateralSupplyAddress: "49HFHN2waPusSTK6dib6Pr8gjgGGkTjziwNczq7kDeRx",
        liquidityAddress: "3wKtbpbm5KnG3xUp51gP5MbCynPJtYvn4ZUwmm2KHBeR",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "Stable",
    isPrimary: false,
    description:
      "The Stable pool contains only stablecoins, and allows for leverage through high loan-to-value ratios. This enables better price discovery since it allows for leveraged basis trades.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "GktVYgkstojYd8nVXGXKJHi7SstvgZ6pkQqQhUPD7y7Q",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "Ej4KxxUz73edQzjfsPVWvYxT5eyhQoWoXpo7BYm2Ejhj",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "tether",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          name: "USDT",
          symbol: "USDT",
          volume24h: "18517276678.369102",
        },
        pythOracle: "3vxLXJqLqF3JG5TCbYycbKWRBbCJQLxQmBGCkyqEEefL",
        switchboardOracle: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
        address: "aMyCaGf7MwsqpgoeioVGXZytadsjFZ6euuYSadLcXbY",
        collateralMintAddress: "9wCxum1oB9JpgPUuVmsPTqDDvKeQqP3rnGFg3GEMrUGT",
        collateralSupplyAddress: "8MaWP9fsX9FrzPGLsxvUfNu8Sr5rR3M8rerwHAQpFxsn",
        liquidityAddress: "E2cfK7KdG5NRzsFzD8o3pib7af7DmFLrfP6WbU44H3Cw",
        liquidityFeeReceiverAddress:
          "Cpyk5WRGmdK2yFGTJCrmgyABPiNEF5eCyCMMZLxpdkXu",
      },
      {
        liquidityToken: {
          coingeckoID: "parrot-usd",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS/logo.svg",
          mint: "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
          name: "PAI (Parrot USD)",
          symbol: "PAI",
          volume24h: "8914.25271221871",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "G26LmGqGvoggYQm2zEKD15rL4LutkZFrtP8mRPd6gPjk",
        address: "DyJZX45rgh9nADa19tsFeSV69ZwvX4UqPoPP39mdBiDq",
        collateralMintAddress: "Bd5pFCJf9AafuXZkfkU6SDZVpeE5xAqX69bs8nDSxd2J",
        collateralSupplyAddress: "4xRmRbur3HAc4nNLaAYKgZDXiEtCVc2a9wA5TSsmS1qP",
        liquidityAddress: "9RZi6AMPGmBZ9isLkQikvLwANNQ6UWZsyv9537KLo8EV",
        liquidityFeeReceiverAddress:
          "8fXGHJ6ArM9cyaZkaBFsLDM4W5HdPofjMFoHgX3Bb7K7",
      },
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "Lj3y2beRYhCaQQH9SYjmMJv3uuTcqpCJjQYe4829FAL",
        address: "27YJsVpHWvjS8BKaz7Gd8unSFJAMrh6gPEFjqhYxn9AE",
        collateralMintAddress: "3R3mzc8o9oXCsBX2dKG7Bzc3ov1m7t4UHtb81ktAeCxY",
        collateralSupplyAddress: "6RTTJkwZ7NuK4JaJnnaUgqU78gaW3A8McDTfiGsBBbLX",
        liquidityAddress: "9v6c1QVoyQxX6hWKGCYLwcunc3JfMWQLcMS3KWR5Kqhf",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
      },
      {
        liquidityToken: {
          coingeckoID: "usdh",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
          mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          name: "USDH Hubble Stablecoin",
          symbol: "USDH",
          volume24h: "564264.4409187818",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "37NFcKPTgqUVx3gwTQ4c2Q94oJWk2xZy3NQUXtDixReb",
        address: "NoTf6a9khWa5cCh6v5RRronH7YuatY7gDWmdKUPoBhM",
        collateralMintAddress: "DE9WN39kGuqZwsBpmd8Fs8F7b4T38nzpiNo8DseznLBU",
        collateralSupplyAddress: "3WKotLKSFoNjPAymuP3HdkkRmoQE7cY1JrL7vnTCMWRW",
        liquidityAddress: "BMgsTqMrAYg2mvpqWYYkzUDjhVmipZjVMGRFE9z5y8GF",
        liquidityFeeReceiverAddress:
          "5ZBZ37C9BiEHarAcnWeCyLwp8E1YnVQ7AWHRZwhhtTpR",
      },
      {
        liquidityToken: {
          coingeckoID: "hedge-usd",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png",
          mint: "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
          name: "Hedge USD",
          symbol: "USH",
          volume24h: "733015.0960043964",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "8iMLNqCjJmXoYWxjh41cr2w8EGqN2QwLx6h21EgFQnfe",
        address: "HZ75yaVXYA4buymgZhzkLoPPyWyRGskg6hWTgkcnsWwL",
        collateralMintAddress: "4qaGhetVQoCYiwzrvPHx2SkraHugECzLmsNwUqVCLqfY",
        collateralSupplyAddress: "7YCzReVwt9W6X3hX2Hq8w9cZeVeNBkjtP6FioA4gjkt2",
        liquidityAddress: "6avyFU7rPxH2Pv6eD8tNhfqHE5jGEnodGWcXPtYvsEWQ",
        liquidityFeeReceiverAddress:
          "A1Q7rKGLHu4NoVuLPP3iKjctMRci8ydxWt1nykG5kLBU",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "JCRDg9T5mUUxazdJ2nGWDN2pdcXVQc5VM8XDp1DW6Aoa",
        collateralMintAddress: "4JZ6PXqRDp8jQxXUYX9cbAzHi6uzZk856aoAqPGdV5Da",
        collateralSupplyAddress: "7JF8e93t52SGFUHzMt5cD7vte4b8gWZHY99GLziAUeiP",
        liquidityAddress: "z7yTesDCUkvheHnULMjS6dggiiVczpX5JjfTx5atRgQ",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o/logo.png",
          mint: "EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o",
          name: "Dai Stablecoin (Portal)",
          symbol: "DAI",
          volume24h: "",
        },
        pythOracle: "CtJ8EkqLmeYyGB8s4jevpeNsvmD4dxVR2krfsDLcvV8Y",
        switchboardOracle: "8fsomfuZvQHeVCNeVHUQReCSDAfoodTiYL2xsk72LNGg",
        address: "3M4dCjjzu822JShmzpATSm57Fo1oUHysYTh1D7WrLHbP",
        collateralMintAddress: "FKpLMBfqQiidaSyJP5wzy4jttmgvnLQSgUEbgydM39FF",
        collateralSupplyAddress: "8YHzeNHediRH7wm8Xh8j4CVemmfhjUoonAyA4bWKG4f1",
        liquidityAddress: "BJAodbhH6dACjZG33Q4DCVzrVC6oQ66jNSXmNDsJ9Gqa",
        liquidityFeeReceiverAddress:
          "6ScJ4HaSven2hAYhcS7oSeaADNZbc1vnbJ9itCGv8Jhw",
      },
      {
        liquidityToken: {
          coingeckoID: "terrausd-wormhole",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i/logo.png",
          mint: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
          name: "UST (Portal)",
          symbol: "UST",
          volume24h: "146384.60062934877",
        },
        pythOracle: "H8DvrfSaRfUyP1Ytse1exGf7VSinLWtmKNNaBhA4as9P",
        switchboardOracle: "8o8gN6VnW45R8pPfQzUJUwJi2adFmsWwfGcFNmicWt61",
        address: "A57FVdDgcyz1NserCSMSWaWDyfWZw77ikfXvE2cwPF18",
        collateralMintAddress: "5czXDWSVFjH16hJGvwZTE8sMbh4vQggZ1gMhyVE4RWgx",
        collateralSupplyAddress: "4VDZMvxihqGggUYGiDbce2WTgsKDBeN47128Bkv72vsc",
        liquidityAddress: "GRcfCPgSMBKuJicp76qRRdpFQnPnZ5KzHB2wD5nbJ3Wx",
        liquidityFeeReceiverAddress:
          "4GctGML68E1kDcvskGTXRPY9ngxmxVnJXjpsJ68YBXPR",
      },
    ],
  },
  {
    name: "Dog",
    isPrimary: false,
    description:
      "The Dog pool currently contains SAMO, the premier community token and symbol of the Solana ecosystem. Over time, this pool will grow to contain your favourite dog-themed meme coins. Earn interest and borrow while holding your favourite dog coins.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "HASr6hiYVoRcVXk3GttC4PjBBPQ3sGYDzE7HSPJdcke6",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "DLokPHis2W5f3jQ4Kgv5PQHebkun2KQtsXcFidhR19Za",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "5VuBkDYXcV1svRm1BKShA2wqKsszYWjPwoT4Q32YXcp3",
        collateralMintAddress: "9zCPUDEF5oGymtihmPQL6bUUxarno7w6qzM7Amiyh9bw",
        collateralSupplyAddress: "5YjjhzNHQoBdisyMrxhmt2nwy8yoQ9zA7o2ruUZg894g",
        liquidityAddress: "yumozQYL4ddiEDLhpUqa7o4UpUg46pkbmGsEF5cJibs",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "samoyedcoin",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png",
          mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
          name: "Samoyed Coin",
          symbol: "SAMO",
          volume24h: "768684.4022159586",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "DCXJ2dhdfh6UZH5zgMMHmzXTa52kbnXU3R7eDWD7jLH5",
        address: "HwZSKqyo2QQ2YCzF282ZrpH4JRQWf3Qad1fWHtKCDZjx",
        collateralMintAddress: "E9qQ9pdZjk9zvm7Qp3UUynddJMadK85F8ZNqWyeUHcjV",
        collateralSupplyAddress: "DzERiPrzkwRi4pG5SsWaevVr2jSNhRkwNCibx5eP5K1g",
        liquidityAddress: "GHnH17QEJvVv7bqzqrhPMrLpTvdbZW4e1jxn8ZnbgUFF",
        liquidityFeeReceiverAddress:
          "Ag3ZHEVDZPUkTQSeCs6BMmh7xweakVvUuef76tT7Syt9",
        userSupplyCap: 50000000,
      },
    ],
  },
  {
    name: "NFT",
    isPrimary: false,
    description:
      "The NFT pool contains Solvent droplets, which are tokens that track the floor price of a collection and can always be redeemed for any NFT in the bucket at a 100:1 ratio. This pool unlocks borrowing against NFT price exposure, also enabling leverage longing and shorting.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "29yTiqjGdoNiRLMVc7ZoqFpbW3gkmefwMG9SUiMMD4J9",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "BtDeXoN6L5s5Nodvny3qvwK55b3YLcFkL7KqvKD7bFNz",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "8WpwDA1qs28vrkS3q1B8pfEXNP5MMkAc9qhiQZeYBK9N",
        collateralMintAddress: "Awi5FDTwSH5XKH11kDLynccJPQbvKgkGFaekExSRk5QM",
        collateralSupplyAddress: "H4Z2n1wamM8Q3tmyimLn62VwFzjWu6CesnQqE12ZVNWA",
        liquidityAddress: "6HiP2psv16ddfPmnc5mTxxKyKuFNdB3a6ZrNBihSt5hH",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userSupplyCap: 2000000,
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/smbdJcLBrtKPhjrWCpDv5ABdJwz2vYo3mm6ojmePL3t/logo.png",
          mint: "smbdJcLBrtKPhjrWCpDv5ABdJwz2vYo3mm6ojmePL3t",
          name: "Solana Monkey Business Droplet",
          symbol: "SMBD",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "3VxjTPfkngSYkrATdeS1sgZxzkhNePhkczquUNxb44jm",
        address: "EpZipddM7X7TofTzypVaz9GkjBziWgZZCgPz9HhGAB1t",
        collateralMintAddress: "5NBAYi6ELmNCvxy1QQ3iLaNRidRSBM9R8DN4bVK6kXM2",
        collateralSupplyAddress: "GwGEZ7iuookTDMzq3gWmboEmvrRCTYGJGimKTxefy12D",
        liquidityAddress: "7QWfEYXGDDFabUGRXkQXmNHgEfmMBZPjEhCECzJFG8EL",
        liquidityFeeReceiverAddress:
          "37iSf9SzU8P3JVvHNYUg22JHfWCysvtR9bneYB2h9rBb",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ca5eaXbfQQ6gjZ5zPVfybtDpqWndNdACtKVtxxNHsgcz/logo.png",
          mint: "Ca5eaXbfQQ6gjZ5zPVfybtDpqWndNdACtKVtxxNHsgcz",
          name: "Solana Monkey Business Solvent Droplet",
          symbol: "svtSMB",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "VVV8RKuJ7aAQuyEnnBrRSAGHjkehfPxNKqiB1u5w6Kh",
        address: "5jcT4WkHE3JCXD5GjZ8hjvXgWd8DmwEHLSf9BjZqkp1z",
        collateralMintAddress: "9HFTho1sZJ4xS57HkHrMcFP1vyWcywaPN1XZ18vLdZiP",
        collateralSupplyAddress: "2bPz3mbDR57ycNiM5iEFCVy45wggV9rJLkSyNBcuYn4s",
        liquidityAddress: "HB2r2sSz8EV3No5BMMijj5QCw5unwiYW7boVnaMrBimM",
        liquidityFeeReceiverAddress:
          "B8D2LWQrTmXFKGWYM4EhgSwEb8Q11bwvGbCA112729jr",
        userBorrowCap: "150",
        userSupplyCap: "300",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/dapeM1DJj3xf2rC5o3Gcz1Cg3Rdu2ayZae9nGcsRRZT/logo.png",
          mint: "dapeM1DJj3xf2rC5o3Gcz1Cg3Rdu2ayZae9nGcsRRZT",
          name: "Degenerate Ape Academy Droplet",
          symbol: "DAPE",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BTWdcU1yxn3CFnhcoVngcLNQwCcNbJhf8KqhDx5LuLFS",
        address: "5mrrZ1rZmKZtzNdoCojfHqQzzf89k3PdJnkiq1ano7ti",
        collateralMintAddress: "EJUNzHVka2MWnTA81Jp1NjUNhvGb8Lb1SDevHR4Eqn4r",
        collateralSupplyAddress: "GBaPd92TrRj9RjmnkH7WaBajD5Kea8CHngBgNV8TuvkK",
        liquidityAddress: "37rjRZ2Y6eWY4k58WgPvHmv6JjKwBSUjhigyNDVQDisj",
        liquidityFeeReceiverAddress:
          "Co76cu45Y2eiCCiktXsgACgH4f9muHWv8JFpY2Nyk3no",
      },
      {
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
        address: "8xogd14bBxBdGKDfkDciPPp6pZ3Cw4Yj5USRbGJDbZpA",
        collateralMintAddress: "83xjxt6wQzci6zgEukhswGVwesHC94D6C7q6fUZaAThb",
        collateralSupplyAddress: "ECJtpWhPfG8R6qQVrps5cm9NqyNZPk1iE5wN8Cj3H6RG",
        liquidityAddress: "Czx5rru4gktqTdiheTyT9TPCQ8A677ykXyKFeVxJDm1U",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
        userSupplyCap: 20000,
      },
    ],
  },
  {
    name: "Invictus",
    isPrimary: false,
    description:
      "The Invictus pool contains the Locked Staked IN (lsIN) token which allows you to earn lsIN staking yields while using it as collateral.",
    creator: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    address: "5i8SzwX2LjpGUxLZRJ8EiYohpuKgW2FYDFhVjhGj66P1",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "6N6tqnemGoR5pUdtKKp3FvdD94Gi98f2ySEo1dzZ2Uqv",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LsinpBtQH68hzHqrvWw4PYbH7wMoAobQAzcvxVHwTLv/logo.png",
          mint: "LsinpBtQH68hzHqrvWw4PYbH7wMoAobQAzcvxVHwTLv",
          name: "Locked Staked Sol Invictus",
          symbol: "lsIN",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "3YUHvezfoeY8JxLB624bnk3mamLDnJZ6VTUs9ezwJTDo",
        address: "4XYbgZJirfnwjmpJKQgMQEvjncYFi2CsPTFzBguCjCjG",
        collateralMintAddress: "5Jk2vER2x9WGAZmVGEafBtkEzjYB4mcvvVHbxMcbprhJ",
        collateralSupplyAddress: "734df6ZLSzQhyDyqwk8YaKdG2rWPMP6fdsBfxDREZ1nf",
        liquidityAddress: "BQHcDqbe9SC5yXcxwNGozD17CPfUvq6q95Lvfv8ZhRU1",
        liquidityFeeReceiverAddress:
          "FaWVdXqVxcZqW3vdiAouAPxhyK29vWR78ec5GmfayJzc",
        userSupplyCap: 60000,
      },
      {
        liquidityToken: {
          coingeckoID: "terrausd-wormhole",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i/logo.png",
          mint: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
          name: "UST (Portal)",
          symbol: "UST",
          volume24h: "146384.60062934877",
        },
        pythOracle: "H8DvrfSaRfUyP1Ytse1exGf7VSinLWtmKNNaBhA4as9P",
        switchboardOracle: "8o8gN6VnW45R8pPfQzUJUwJi2adFmsWwfGcFNmicWt61",
        address: "7MymBKwTPPMC4A9Ktwc1F2V5Xw7Kj3DqvRYUvLk2SF4h",
        collateralMintAddress: "5vxqpDHcHhhJBwNdgeFjfJ814qL36S4fJneSihYccZNg",
        collateralSupplyAddress: "EKnFN4ehqwdu8RDmZ2hKnsEMJvA2Jnaszbydae8axbMu",
        liquidityAddress: "9DboZFVjGtPtzXKg8dy7RMDGr1hmk43BkhVF9Nz8atFc",
        liquidityFeeReceiverAddress:
          "4GctGML68E1kDcvskGTXRPY9ngxmxVnJXjpsJ68YBXPR",
        userSupplyCap: 1000000,
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "AuT5vA4bScsaJBiyNHnAttKToTCHj4Kwi4sg8bCyPPr8",
        collateralMintAddress: "DR1b9VzSe8o658UVJL9b6XzqkRmurcmLujpZRaBL3yDU",
        collateralSupplyAddress: "2877K885jCdVts6X5Kn7gPbezNPhXufEbheUbVwoZmAi",
        liquidityAddress: "GwRqjjkj7JhB4Tqi8PDLKTnESCtBRJwJsGZzg5NQb38W",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userSupplyCap: 1000000,
      },
    ],
  },
  {
    name: "UXD",
    isPrimary: false,
    description:
      "The UXD Pool contains the UXP governance token and the UXD stablecoin. Deposit UXD & UXP to earn supply yields or borrow SOL/USDC against them.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "HCuEqcXaGeioiJf5vNMTyQC7HMPqJm5aZPkSjA2qceDS",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "AwT1ixXdQcjQMgDWpzyNQhMyuU3z2hbMGcEYT9sHBAsU",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "Br6ucRrPNrJXPMa31FGBqS9WH86YGMQvu8Lv4dma8R5k",
        collateralMintAddress: "5vsr61rdgfeCtWTZHv54y7jkJ4xKg9WQDT4UusBsnePf",
        collateralSupplyAddress: "3TmYkdfGeeNtjRNoDdXXaTH2dFJseyREMuB6xDNZ6bnq",
        liquidityAddress: "T9WZyVsbL2Jvn9H9tenx2rQyi2dUtdRtGiLDvNU984p",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userSupplyCap: "250000",
      },
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "Lj3y2beRYhCaQQH9SYjmMJv3uuTcqpCJjQYe4829FAL",
        address: "GseYnT313pSLAVidDwKWzo48QRFMmaoF2QLk3fK8DpZU",
        collateralMintAddress: "GDkx8oKUf5rHx1UNCaMfvjwEGa8uZy6ECYmzGh3Pkxef",
        collateralSupplyAddress: "DyNMTn6V7pFmWHR4uUDgCbmiDSFp2rwSBcgEUTxW7C83",
        liquidityAddress: "GfNYgNM5rJrCXYVGnVvfgcucmsyoGTBoJZgdqAviUSqe",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
        userSupplyCap: "25000",
      },
      {
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
        address: "3x4swTGLgBkCDmxXYQRP96J1evCgy3ZsnUf9YJzVPtNy",
        collateralMintAddress: "29icHQwfhSgSo3MYjtAgCXKyfFn6RETz2sREEtgfaXy4",
        collateralSupplyAddress: "7GeuioxrRAthYL2YPJDubA3jgLQWwTLexh7Ds6hqX99m",
        liquidityAddress: "8jVVXXxzC9N5FeHUxKBgXLM8xARzLpnzXz8dqZHzpykY",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
        userSupplyCap: "2500",
      },
      {
        liquidityToken: {
          coingeckoID: "uxd-protocol-token",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M/uxp-icon-black.png",
          mint: "UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M",
          name: "UXP Governance Token",
          symbol: "UXP",
          volume24h: "232.96888743248442",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "EsQkrtuJdRnDp6JvAcmRiYGoQbWL668TEZDW8VmrNcm3",
        address: "BvZwsK3v8gqHqhNMDnGsD7z2V83bGzw82o2vrqU3kvBC",
        collateralMintAddress: "Gqi3AojEduDqgyNuKzTwW3QPwUD55J2WzbCuYaqCDMiU",
        collateralSupplyAddress: "2WHngM1w2PzwFrhofmZBjgkUpTiXH9prfUGa396YiLk8",
        liquidityAddress: "Fz5gcq7Z8kYRc4QkuKh46EuFjpFrpwbuZJAhkca2d1rX",
        liquidityFeeReceiverAddress:
          "D2RWgT3kstRwNhED76mDT9PuXRZeEP3jQ6wyJdgaf5YR",
        userSupplyCap: "3000000",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/UXDgmqLd1roNYkC4TmJzok61qcM9oKs5foDADiFoCiJ/icon.png",
          mint: "UXDgmqLd1roNYkC4TmJzok61qcM9oKs5foDADiFoCiJ",
          name: "Saber UXD-USDC LP",
          symbol: "UXD-USDC",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "EeuaqXm4tY331ipWVHRY8foboWPehzBGAwHBs362MMJV",
        address: "DG7SEMDmEv1HqaUvMebf7D7xCAk1e6j5UJiTJqVGzBoY",
        collateralMintAddress: "3V1xM5V4zKWdHZsqL3pyNg5cVeMwJimHvUzBgazsjJEu",
        collateralSupplyAddress: "HgYeFvfBYi87triHtvqqTkazx8uZe5uiMYbgXafDaiQE",
        liquidityAddress: "3fpgLPbmgJQJ2bZ93ni11QutNBBCD5mUP5pSsToEkQRA",
        liquidityFeeReceiverAddress:
          "6yUrP7AfAPJfywMYsd1eM8Z4Ah7Zwur7GRrUKTsGzcwy",
        userSupplyCap: "500000",
      },
    ],
  },
  {
    name: "STEPN",
    isPrimary: false,
    description:
      "The STEPN pool allows users to deposit or borrow GST, GMT, and USDC. This pool can be used to hedge or gain leveraged exposure. For example, a user could borrow GST to fix or upgrade their shoes, then pay it off by walking.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "BjsAGLZzAgBUsiaTTDQv7PWDUDL9dQfKvYwb4q6FoDuD",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "CqEyTyxQDSwqFcrp7GXqEhhyeDNGvYrhyDkWtUcaa9oG",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "green-satoshi-token",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB/logo.png",
          mint: "AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB",
          name: "GST",
          symbol: "GST",
          volume24h: "3147979.8788740723",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "JA1GQW8ta1LjNn3h1vZmhL3fWEdZ6F9QfZHvPB4y7fLm",
        address: "CaacWq72hHubpwi92UUVsoE4xDNKqr1MhRwYeqH3YPAU",
        collateralMintAddress: "GHuZTLtRqFH6s6nkRBaaHFrVuVpepuvHsNApX4zvP3Hg",
        collateralSupplyAddress: "AJSkG29hrcLB6omKbzGknLNJd9wGnABdcvcj6Jbeb5ti",
        liquidityAddress: "7jVwZVTJijefxy2uFv63MGXrM9xsXeoizKh5kBBuDjb8",
        liquidityFeeReceiverAddress:
          "EHbPN4aP2y9WAYY5Xmnsyy8dUtBWwQ17gSfNrTBgLgvd",
      },
      {
        liquidityToken: {
          coingeckoID: "stepn",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx/logo.png",
          mint: "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
          name: "GMT",
          symbol: "GMT",
          volume24h: "48575750.815010555",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "Bys1SNouEqVdbUWj93GfpqwY1bsWjYVYtNZG1QdV5Y1B",
        address: "BqYvhari2P9mXYLqcgJv41kRUvLhBfGoQXGWHnw26UJw",
        collateralMintAddress: "C8Pm2aMMdvHHBV1QDFzTGMrTs5k6MdDjxBwJEXX3aJ5U",
        collateralSupplyAddress: "Gh9ueJbjei9L5ZRGs3JqqhMkbDL6BfeJt9JkVx2YC7z1",
        liquidityAddress: "Fth8CM3Vj3vPgioTZqXPvfZz44coUsfr8fkMgS2x7zUt",
        liquidityFeeReceiverAddress:
          "EFZRzYzb3iFjjt2iPgPRCA2etwNu9VwzWpQ8mxvTHZkG",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "DxdbG2YwFFJeePbNFZRXuF2Sx34B1NTxWNbeEHdo4rzb",
        collateralMintAddress: "9E4YoiXauf22frwmioB7WFkQ2XAaTgKV7J7YsvM4TAN",
        collateralSupplyAddress: "CKzzNHHJhtva2aZkj3YNFU1X9N3zEBMGqjG7Ay3yUVdX",
        liquidityAddress: "7yYA4taed8iZknuQSnERwmygCTQiR1HEoQAdURgxBGTw",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "Shadow",
    isPrimary: false,
    description:
      "The Shadow pool offers SHDW, the governance token of the Shadow Network and Shadowy Super Coder DAO NFT. Deposit SHDW to earn supply yields or borrow USDC against them.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "Foo9vqN6fj1NyymHmD1gwZkgVgEqzNSrwyeqyoLYGe7j",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "79X5SSdcWcs9cFFByhSX2TBnoYmaU7BkJ6ajrpJPwxqe",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "4JvgJDxBmXrrYzdLAN4sAbyGYVWVw6mGjJwnaHFVTNWY",
        collateralMintAddress: "A7CsM2A83J1z7hGec45MGsRyqSLULdcLtxvrvPvvUoo6",
        collateralSupplyAddress: "Fa9kujq845ygegvezeGdvHJyiQW7rf1ZBiN9BLxyr7Wt",
        liquidityAddress: "3DzDkAU3uX9BsBS2PcdWwWSHwTaGUReSL3DDQxxWEr6B",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "genesysgo-shadow",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y/logo.png",
          mint: "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
          name: "Shadow Token",
          symbol: "SHDW",
          volume24h: "19744.578910971686",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BvgzRgwPanJcGoAzYrZAjSEGt2uWLpcweowkdRYfzBSV",
        address: "27wbnZxrA8Gq7UMYaRFJPP4ijr6HuWZZNXAovEHrG6Pn",
        collateralMintAddress: "Bk2fPSoxvvm6bS1C5M6HSMrgofLCQmjoFDM9StTXJo4R",
        collateralSupplyAddress: "5169uJFQg6UttxizDAmCXTumivvmWnmVApBkmFuCum3r",
        liquidityAddress: "EGmpMAQjNvcDSgdeRrrRWqdqejL7aVCWyqegKzkjN5F1",
        liquidityFeeReceiverAddress:
          "6Twof5d9b2ei7kvg1yJhD4Zo5b7HtPQMjFZXb7BkH6to",
      },
    ],
  },
  {
    name: "Lending",
    isPrimary: false,
    description:
      "The Lending pool allows users to deposit or borrow governance tokens belonging to the lending protocols in the Solana ecosystem. You can use this pool to conduct interesting pair trades.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "C3VQi4sKNXVsG36zhUnvNasXPhzGmWWVpaeSPv5Tf2AB",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "BrDSAVHoo2ybEdvXawetWfZ64yA727TuACxnsE8Na7Ly",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "larix",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC/logo.jpg",
          mint: "Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC",
          name: "Larix",
          symbol: "LARIX",
          volume24h: "45553.82542582351",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "4puRw78QsrsFmWZvoxKXNcb2WtfU7MnsYL9pC3oRrkr6",
        address: "42RuM1MaCoRAnYz2oonS7qiBvgBb9MBkJSp2Hu4ZHMHm",
        collateralMintAddress: "9Ku5VeEF3F2m4GZXzYUMMeXTHTmBYW4ysm7Er3ZzHGHW",
        collateralSupplyAddress: "PC2HzDAgoHZXgiyPg4zPuHHr3yecEPTELvmk6hLyNE6",
        liquidityAddress: "EKi5K4KjX5vdPf5PC4mV64nzbuPycRQAnvN3C584pTAd",
        liquidityFeeReceiverAddress:
          "5Vhw4Hz3karV8TDrmeoomAmcdoxCMskXT9AVvKmy2i2Q",
      },
      {
        liquidityToken: {
          coingeckoID: "solend",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png",
          mint: "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
          name: "Solend",
          symbol: "SLND",
          volume24h: "66488.6493849056",
        },
        pythOracle: "HkGEau5xY1e8REXUFbwvWWvyJGywkgiAZZFpryyraWqJ",
        switchboardOracle: "7QKyBR3zLRhoEH5UMjcG8emDD2J2CCDmkxv3qsa2Mqif",
        address: "7vm1J3CFRahCRP6jrEffocWS27XFJLC6hXRcZEBj9g1x",
        collateralMintAddress: "87qUj9NhUbhRSt7agbU24yhmcuLoEDw1vR7gQMPaxacP",
        collateralSupplyAddress: "CpW1huMqpuLGyNv8oCKMFe29qA7gmUW5HMPvW4K4HVBz",
        liquidityAddress: "Bk4t4aKMCAgUJjvRcndULth16UNXprYXrK7Y5iErZgMT",
        liquidityFeeReceiverAddress:
          "FtsXfVZWLgMWJH1owUmLhtET5KW1Ck8oykYXyPMkxFcE",
        userBorrowCap: "250000",
      },
      {
        liquidityToken: {
          coingeckoID: "solfarm",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/sol-farm/token-logos/main/tulip.png",
          mint: "TuLipcqtGVXP9XR62wM8WWCm6a9vhLs7T1uoWBk6FDs",
          name: "Tulip",
          symbol: "TULIP",
          volume24h: "89361.09134126197",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "3JA2Mo3EHpvLNZrciTZHiLAshzv5brHhYmqTxtCMmG4N",
        address: "86LCGMKTjDLhZsGcZjFAG8NeLwYF2xtWX2mMi75NKng1",
        collateralMintAddress: "DiJq1WkioDG6ygsN99sA7uFjVJgVr7pUXbvyAJZxgSPC",
        collateralSupplyAddress: "FzxqRogc1vDP4351FzmUPMyheMvMEgsUZbfwhMuwue3H",
        liquidityAddress: "8W2x9QCV5DS16GrQyoE39V1hCrRvpotH2frxryAhU27P",
        liquidityFeeReceiverAddress:
          "Dpd2a1gYQ2nzen1C6VZYNLsbmQAeTKZk1LSh5JFLNzYj",
      },
      {
        liquidityToken: {
          coingeckoID: "port-finance",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y/PORT.png",
          mint: "PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y",
          name: "Port Finance Token",
          symbol: "PORT",
          volume24h: "145397.94437097525",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BnT7954eT3UT4XX5zf9Zwfdrag5h3YmzG8LBRwmXo5Bi",
        address: "3CVBpNtXxvq41G4PR5YERXub7aBBusB9yd8NPk1W49Zk",
        collateralMintAddress: "BaGZG4Yae257XTNMqAHzuLL2bXgirePd7ePK32q8Enas",
        collateralSupplyAddress: "28u8y7A95Us59XmFxGPeLCojrtRvWKHtJuuXD8ypZUx4",
        liquidityAddress: "2MbLiJbKkuyJWNvEaw5EqrCVw5cTY9BhhYgSePEe5Csz",
        liquidityFeeReceiverAddress:
          "Hjnaap262kouVG2M7GS3a34qYmuCxHVhsRrRDLAAXd46",
      },
      {
        liquidityToken: {
          coingeckoID: "jet",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz/logo.png",
          mint: "JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz",
          name: "Jet Protocol",
          symbol: "JET",
          volume24h: "134975.5529950039",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "4VUFxa6GSLbYdrekvCN6ptiziLT1Z12SpkcCDP9TiBB7",
        address: "EbkWi1t68PtDe4MLHcnzo28RBdY8GNMLkUoYLt9gNzaz",
        collateralMintAddress: "3VeTjhDRBuQyaerVcn85AsJeD9hUGNdzQi66U3EjtTbj",
        collateralSupplyAddress: "DvD3VS38ao6RMQUbj3txbBMdC6jsNzXubLJMjw8xyzgv",
        liquidityAddress: "HrewGJ2JR1CJkJ4YPzvRx98ieai8YSWpurSpWkP8Wbo3",
        liquidityFeeReceiverAddress:
          "HVHtR11xGZyCnsvunrm2m7RZVo6XUTVi4h2xng9grKc6",
      },
      {
        liquidityToken: {
          coingeckoID: "apricot",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt/logo.svg",
          mint: "APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt",
          name: "Apricot",
          symbol: "APT",
          volume24h: "75373.44928444871",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "C1zLTQb7pQ11LLKfkfaZjZ5UQrbLP6MWrLGngRJMiZJS",
        address: "Eb1zsacwpPdyJNz6VN6VKL387nMSHQ3QY9nhGChrHxNB",
        collateralMintAddress: "3PVD5987cLVDVCfy6u3znoJ3TpWcCzogcLsv5ZJFzgaG",
        collateralSupplyAddress: "637Sg5j5S2JcnNc58wDmby2iWmHdYQjMvqQYTgmuFK4Y",
        liquidityAddress: "jyHHcgn47GB4rkgPSyYqygYiRdACPajQZpmQhYrkpF9",
        liquidityFeeReceiverAddress:
          "HxHo9umx9Z59ULgaMuQ7F2npx9aDGe9aDYWXQZJgyZXk",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "HD9guSF4MrNM9qJWmmQhRgcxRVnxuh6z1mzCHHhLVdPs",
        collateralMintAddress: "GxR61U4WQ67igLWLXqqtb2YuE4VmGzaXjpHia4rXzvFG",
        collateralSupplyAddress: "EJ7GSUV1ZpdUvEHFXSFzMQdP3J3H1xprZvtLjZSPjyb",
        liquidityAddress: "EzJRFPK9f9tJ1s1KtAvjqr8ridj5VhTpDygHhjtRCrNH",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "mango-markets",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png",
          mint: "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
          name: "Mango",
          symbol: "MNGO",
          volume24h: "445079.95665885496",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "AmQunu75SLZjDQS9KkRNjAUWHp2ReSzfNiWVDURzeZTi",
        address: "EXw94GGEMGj2YLfGY3wTixVXkDWoTF9vytB3Ly26yCTN",
        collateralMintAddress: "GnQc5HtH3kwVwrrxaMujQBqdH3kgc1SJnQVTTJ1ZkKuR",
        collateralSupplyAddress: "6LM7SCbwSyUa51PrpXwSzgBP2xmnAywURG8EPxJRY3d7",
        liquidityAddress: "GaM3GUwH69Pqks5E9UXrJxSnvVp2Gk1hBgAuDM2sabDX",
        liquidityFeeReceiverAddress:
          "7UDxpHHH4sRScEibd78k2RgJc2DeWxjwXSS1RCyTdQf6",
      },
    ],
  },
  {
    name: "Aurory",
    isPrimary: false,
    description:
      "The Aurory Pool offers AURY, a Solana-based blockchain gaming project. Deposit AURY or USDC to earn interest, or borrow AURY to use in the game!",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "7Sy8M8cXZFyyyHRDyiLi1WumPcgpnYUviuPm1Dp3XFmb",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "2bJTrqGsweyMDh33vQeYyzAYUxK7ibtNYq7RxfywdT2U",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "2ZzkFjFj2y1irs6JqPDUK2F2B2fdkiY9dazd8SaZ4tRK",
        collateralMintAddress: "7LAHoHznPG2ej26eHSRweXqGT3a7PXQDB3r17joxzh6B",
        collateralSupplyAddress: "4rvM2KttjDewbPg7A2Wk1xhjuDWWwtjhtU4wXRdFMwMe",
        liquidityAddress: "4DtxdPMrM9VhPk3PhCK3kPKpGKTSxepGpyaqafcoD9wy",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "aurory",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP/logo.png",
          mint: "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP",
          name: "Aurory",
          symbol: "AURY",
          volume24h: "752444.8021047766",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "2tt1wNhYCP2d4XVh9VoyWU85UTsQxGsjFNrZac9sxE9b",
        address: "H1hpwRQsWXpx18D7uCFgnqj1oAesgLC8H1cDu5oYdrpa",
        collateralMintAddress: "CMB4wwAXaoxpC6wwdstLonmjxsjAxsrP8dsoyM835DBr",
        collateralSupplyAddress: "2Hn98Yby15Eqy8r8Xr6a26bkrHccRPLvqsN8dNTgboYL",
        liquidityAddress: "9anzeeEjGCyegVXKn9pnkETpvHbT8QXGpy5CgX8QdkGa",
        liquidityFeeReceiverAddress:
          "8xPgg8eUEVPcYPu3RTggqKGY3vwktEs5jBh3ktDcSTrC",
      },
    ],
  },
  {
    name: "Basis",
    isPrimary: false,
    description:
      "The Basis pool contains BASIS, the governance token of Basis Markets (basis.markets) and rBASIS, the staked version. Deposit them to earn interest or borrow USDC against it. Leverage stake rBASIS by borrowing BASIS then swapping to and depositing rBASIS.",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "93fqxupYFmvXWWB9ptSp5pyAV9b7kgUpooqc5hWtaXYz",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "9FgJKUZhbbAQ9VYpaQcRiRJSTLJzK3JRFMCv5djm2EoS",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "3WvnsQF3KipMh3crWL8j9iY6V4x7ALFB7wQNMsDJiimj",
        collateralMintAddress: "G9gaq1B6ENo93U4KxKzHc6WkHwxrs7VVApNM5Wvjk8Fu",
        collateralSupplyAddress: "JAwDW6CPsi3YhVSo4cJWqMEvC3GZzjV6VDeUykM2EzuW",
        liquidityAddress: "3HEQ1nyS1v2oGKo5Lj6G77jiw4tP5LqXZmrzcHWkYtx1",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "basis-markets",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa/logo.png",
          mint: "Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa",
          name: "basis",
          symbol: "BASIS",
          volume24h: "169.2506972971384",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "7LU1Gc96WLoLKqBDqkp5PALzTRzKNctFVcuqMGwqiRfm",
        address: "2MtLN8tZdwsN9iuXW2sJyJGtvh2G6frFFdf6MWYKPBYk",
        collateralMintAddress: "BdA68Y5W892UxtJM8mtn2vB3zoGerqcRtmS3WtUr8jdd",
        collateralSupplyAddress: "EngQh4qKyFnw7n54iTdKw3hDkzgAewS1CSNBffVbMAKz",
        liquidityAddress: "D5og4sztcqfaVeLTW9158rG9XWrY3RYbUWZjVjZX37uw",
        liquidityFeeReceiverAddress:
          "4HSeYt8ay83fSwgwnTCp2VvTTtgX14bphY8sERcRHBxy",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rBsH9ME52axhqSjAVXY3t1xcCrmntVNvP3X16pRjVdM/logo.png",
          mint: "rBsH9ME52axhqSjAVXY3t1xcCrmntVNvP3X16pRjVdM",
          name: "rBasis",
          symbol: "rBASIS",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "974zYbzQnM3fFHUEWStPcrpQSsUoEtza1jFMHHpQCnGZ",
        address: "7ij8ELbdvbgmJo6ibFVvME9cUJe3JTBc1SaUH4QHrSvE",
        collateralMintAddress: "3gDyMELZ1apMKefdXR1cpkTve2rdXsSkRhByBgThxAU2",
        collateralSupplyAddress: "BqRjT9J7JCNYBrArb5czvercS7sfVdPkARofCC6j2cKA",
        liquidityAddress: "Djks9b7GAYd57Z5ZRgHMJtW22CHY96FytnF5Mezenc2J",
        liquidityFeeReceiverAddress:
          "5eU4yNZx4onAQgNCwdoWGA5vu4YnmBc9D4pFkpytJ4W5",
      },
    ],
  },
  {
    name: "USDH",
    isPrimary: false,
    description:
      "The USDH pool brings a selection of top crypto assets together with USDH, a Solana-native stablecoin by Hubble. Use USDH to leverage your long crypto positions, or deposit USDH to borrow another asset for shorting, hedging, or yield farming. Get creative with USDH!",
    creator: "81KTtWjRndxGQbJHGJq6EaJWL8JfXbyywVvZReVPQd1X",
    address: "Epa6Sy5rhxCxEdmYu6iKKoFjJamJUJw8myjxuhfX2YJi",
    hidden: false,
    isPermissionless: false,
    authorityAddress: "GG57xotCyFU2BtBwJ8SwnAzsSroHoZME841f7dmrZVsx",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "wrapped-bitcoin-sollet",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
          mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
          name: "Wrapped Bitcoin (Sollet)",
          symbol: "BTC",
          volume24h: "161093.31333291187",
        },
        pythOracle: "GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU",
        switchboardOracle: "8SXvChNYFhRq4EZuZvnhjrB3jJRQCv4k3P4W6hesH3Ee",
        address: "FF7aibncMqk4SFGgDck2uQ5Y5gJAmYjqTD4Ardw4Pjiv",
        collateralMintAddress: "929befhtN9VU9kdzsBHcvWwmrTDWNepisjq2aApX6ywG",
        collateralSupplyAddress: "E6rsp99Fw7Y8zwibn3ebVWEeTxpeAiNut2jMVTgPdhf2",
        liquidityAddress: "3q1ehnYu46zawnsVHpxeeh3MS7thgtEQXSambFcbsGvQ",
        liquidityFeeReceiverAddress:
          "9CjhBpwiQbP2zYnj7PqHTxPPp2BCR4Y4rP4ZPWkqrCQk",
      },
      {
        liquidityToken: {
          coingeckoID: "usdh",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
          mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          name: "USDH Hubble Stablecoin",
          symbol: "USDH",
          volume24h: "564264.4409187818",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "37NFcKPTgqUVx3gwTQ4c2Q94oJWk2xZy3NQUXtDixReb",
        address: "6e72R9KbYrc1RZiXd6ToF7fMyjGLrAf2itqApQyWGWWn",
        collateralMintAddress: "3aJBtxvxRDaWh42fg2QDmvFNFPTWAYFX7yj5rNXxbK2N",
        collateralSupplyAddress: "91myGX8zgP8LzbSaJoywoG8f1gyAeDSNAJKjkH3ouXbq",
        liquidityAddress: "CD1Yj1d4RrcnPaNt1XAAWPaLJ9x8xx2cMiZFYbXUb5XM",
        liquidityFeeReceiverAddress:
          "5ZBZ37C9BiEHarAcnWeCyLwp8E1YnVQ7AWHRZwhhtTpR",
      },
      {
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
        address: "FcMXW4jYR2SPDGhkSQ8zYTqWdYXMQR3yqyMLpEbt1wrs",
        collateralMintAddress: "9Nsd3RjDkK1JLaqz3HKGwXuNhgmU7MG5Pv2KGB6vuDZo",
        collateralSupplyAddress: "2NBT7CJNAVTnTFmzvh6tbGCEPaZSNETwQtAtnUhXVtdd",
        liquidityAddress: "9wyWAgg91rsVe3xjibFdvKgSw4c8FCLDZfYgFWWTnA5w",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "3i9Vjr7uCg5Pmcc1Myy5ucoe1kg1JhoDyGBvWZx4JGXj",
        collateralMintAddress: "BPPMjGUmQmsscGH7Avn968Y5VzRDEdbERuf63FkocS9a",
        collateralSupplyAddress: "5Xai7Eam7UHkgrok2Gsp2NC8NNeHJNnqGZJ3V66brn4",
        liquidityAddress: "5zBNTx1Terw4RF9otaDWh7WhLecaupoeeSYjow78CoXj",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://api.kamino.finance/ktokens/CHdEG9MWBVT1aveiFSMMUDWvo3D42EBdHxT9q9BNZWLu/metadata/image.svg",
          mint: "CHdEG9MWBVT1aveiFSMMUDWvo3D42EBdHxT9q9BNZWLu",
          name: "Kamino USDC-USDT (Orca)",
          symbol: "kUSDC-USDT",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "EwwB6cSF5zgYPMLsSZDQ7YcMF8wGksEw38mmiUgT1jAh",
        address: "8VsVMnhLQoELpCbu5zJN8yosahsEZefQ9mSnoywmzqtE",
        collateralMintAddress: "99EGYkfj4mtRttxDW71owd59zHsUTBN6FmL7qMLaqEC1",
        collateralSupplyAddress: "7WPZ6ccnCdL2T8BMXrpu5DNy2MbnP2wZCCHf85hdr9bi",
        liquidityAddress: "3Zdz88vAo7KzUei1ZeP5e1Pav3aowDg3ubATHtq5x3Cn",
        liquidityFeeReceiverAddress:
          "Hxjn8hBgmaVTWk73yZfsD7sWb8KnLVPheK4iJkbB8SWm",
      },
      {
        liquidityToken: {
          coingeckoID: "msol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          name: "Marinade staked SOL (mSOL)",
          symbol: "mSOL",
          volume24h: "1207000.2672476112",
        },
        pythOracle: "E4v1BBgoso9s64TQvmyownAVJbhbEPGyzA3qn4n46qj9",
        switchboardOracle: "CEPVH2t11KS4CaL3w4YxT9tRiijoGA4VEbnQ97cEpDmQ",
        address: "GvRfzwYy258s3NExuar6PaT88oyFch3PuTTFQesY77br",
        collateralMintAddress: "FFcd7AM2BW5gANjX8YjtVYag52koDkvJsYP4na75s4C7",
        collateralSupplyAddress: "Bx1knoCMkWrm3K59QefL9XNFRtWs3mhVWTgQZZ2GDT9u",
        liquidityAddress: "DoGWLzTa5Xnu7t63ct7A4JVn6waFjmZiTEaM9i9vo7jk",
        liquidityFeeReceiverAddress:
          "83r2poRUiqaghyymPtfhhRtHdReFAKbgGGCQajkczW5w",
      },
      {
        liquidityToken: {
          coingeckoID: "ethereum-wormhole",
          decimals: 8,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
          mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
          name: "Ether (Portal)",
          symbol: "ETH",
          volume24h: "186409.23539400203",
        },
        pythOracle: "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
        switchboardOracle: "HNStfhaLnqwF2ZtJUizaA9uHDAVB976r2AgTUx9LrdEo",
        address: "8UNK5B1yDj12vFm9Y3SqhHhc7frXoZCwjYyJAL2NEFrj",
        collateralMintAddress: "5hEiYamTzYCREFBwA3QGC3E8uDn92Ezsz3sct3NakwcW",
        collateralSupplyAddress: "CEshUdNq4FLjjGuAXW1UT9eRvtt53w13mwWxXMtvTAnZ",
        liquidityAddress: "EVSDTswdbmE36xgPTizt6Ps7sr2dphQPP6vFe5XwYzu9",
        liquidityFeeReceiverAddress:
          "86FvZEpX1y6pK5E6JPLbhoBvp6P2n1givZiikFGgi6Lj",
      },
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://api.kamino.finance/ktokens/5BmZgW7dk1kximGfn7MPvDigp3yRmgT64jS9Skdq4nPY/metadata/image.svg",
          mint: "5BmZgW7dk1kximGfn7MPvDigp3yRmgT64jS9Skdq4nPY",
          name: "Kamino USDH-USDC (Orca)",
          symbol: "kUSDH-USDC",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "GeKKsopLtKy6dUWfJTHJSSjFTuMagFmKyuq2FHUWDkhU",
        address: "3aj1pmAjWcSPEbkUDrZn7hotrZeQSfW1VVN5ULMTuCot",
        collateralMintAddress: "EPxdKP6bLA5TJRpg1tMoor1DtZUGDzxts1UgNMUJWWBR",
        collateralSupplyAddress: "HeNatLYe3gXZ6TYck6Xu9CDQWg9LcBTTUS3n6uWkEh3y",
        liquidityAddress: "3b86kCcttsxSqVrrZiot2TirqKuiPgZv3X2nsfsTd84i",
        liquidityFeeReceiverAddress:
          "UfYso8QzTP6HHmmyYB4DZjwcXwsm5RUMKicuemMpiaH",
      },
    ],
  },
  {
    name: "Cropper",
    isPrimary: false,
    description:
      "The Cropper pool allows users to deposit or borrow CRP, SOL, and USDC. This pool can be used to hedge or gain leveraged exposure. For example, a user could borrow CRP to participate in an IDO on Cropper.",
    creator: "AMMAE3eViwHuH25gWHfLpsVqtwmBSksGohE53oEmYrG2",
    address: "MAf6kDoQ4Gfj9m7zHhABPifFiXQhFHGaDLGaNXMZkQ4",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "9NFJagdmaH1Ud23QbN4wDyrTuWNJs3GQJ2dgAK8hxggW",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
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
        address: "4Uzuzwuh1CAV4y6cg9BeQc6U3GU8dHPSJN6dfjmBwuu8",
        collateralMintAddress: "56YhBhya6Ngt21PCMjxBxQEtomvx3bLhmUvsDW9E6FJp",
        collateralSupplyAddress: "9Q8ByQw4DgpGftdEpLt4JWdWPu9xFRLByyM6MeAoW2VA",
        liquidityAddress: "4RiW3X4k7ppoinmLWn1JHab6iYME4GbNWGZGervsqkQ1",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "cropperfinance",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz/logo.png",
          mint: "DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz",
          name: "CropperFinance",
          symbol: "CRP",
          volume24h: "25280.68790180544",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "AhmY4z7M6vscxyhUZfuZtuPZ3VqqAV5fieqjREZXt7uJ",
        address: "CiS2rat4VVCwe8QEVaXm1T5LqbKx6var4mazBrxwg7iE",
        collateralMintAddress: "5ZGPLy13dXa4FoduvVd9XroWvemsuA9nyW7XoDNRYbw4",
        collateralSupplyAddress: "79nrG41BqmncnZDQ4sZo4aE8asu8EiJjRhsQfoGQUxfr",
        liquidityAddress: "GnWiqWvWh1W3oqP5g8LVBhXXPT6cAQKv8hLXvsr3GKZG",
        liquidityFeeReceiverAddress:
          "5fPgFyrx4QC7UH73XfUmaS1bkFmPEQexKaGSkjtg5p1H",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "7xW8MBuRgys1bxaS6sLzUdAQhrrfw6QpLmT1ikmEUF1B",
        collateralMintAddress: "J7FVB8dYfS6NkjmZ8p6KSddPFCqb9dYqxJVAMVj5U1Zv",
        collateralSupplyAddress: "7K3vMM6KvXX6Y8Q4YEMurb4D3QweMUW3s68w9r5RmKXt",
        liquidityAddress: "66rhWHqsTguhJu4zwXCEe5kuU8SRMmQpgzzaFyGLDMao",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "DePool",
    isPrimary: false,
    description:
      "DePool allows users to deposit or borrow DUST protocol tokens.",
    creator: "HgdNdWQRv1AYn2Gq1YtTdNS92HBx9uFcVnyUtfUBNMQ9",
    address: "5BoNV2bbsZFcA13se73EuF8tBfkCFbsMnW5q18TD4Mzn",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "9n6oRXAEsQ3ndRyioBDowom22L6QSaUmd94DsdXw8GnR",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "H2d9j9CHZRXUQE2cHpkvnfgg7vMw8ysyALX5dTeT6CQk",
        collateralMintAddress: "DqM19es9kHsx9AWsZrFvBzDmDqN4YcNrWfjDzTSu8p4T",
        collateralSupplyAddress: "CWQ7bFWm8m4TiMQmL45mnALXpFXBGKokoxbF2dC4jza8",
        liquidityAddress: "6eHJRaLARj3nGaDEZCpXGz64NirtFLYMXvHaZcZZtyeB",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "dust-protocol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
          mint: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
          name: "DUST Protocol",
          symbol: "DUST",
          volume24h: "242735.36531968982",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "C5tuUPi7xJHBHZGZX6wWYf1Svm6jtTVwYrYrBCiEVejK",
        address: "R1MGtytnkZqHVJFKwG6HzhUuDbhgLorojGRcdyrGoEL",
        collateralMintAddress: "B29VY2gHArHjWdzgqMiNqMo8KAboPHkB3TWxxjtE99YC",
        collateralSupplyAddress: "5Jy5hKpzY9NtJGEPv5AC2ofu4M9DLnYzU3VkPq2T85cg",
        liquidityAddress: "8jS71jjnT5mUp9dffeS3CTiofFo6S83uDhCeXbWRjYSg",
        liquidityFeeReceiverAddress:
          "6aM4YAZ2zcwSb7S6m41Gvz5mTRRiSYqGfhzGLhA43p6c",
      },
    ],
  },
  {
    name: "Turbo mSOL/SOL",
    isPrimary: false,
    description:
      "The purpose of this pool is to allow users to leverage various mSOL/SOL liquid staking strategies. For example, users can borrow SOL and deposit it on Marinade to earn yield. This pool is highly leveraged, proceed with caution.",
    creator: "6VTeSdEf5FZ6TKMo9V7JFDNjrUUqgq23fgg46WXydGKL",
    address: "7x3hNWGPNjSZMH54rGWpx74hdVgZZJY2u3XqdL42G4b6",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "23P27Yy46c2V3vaFfQEu1sj5LX9TmnQyh1rhivnEWiH9",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
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
        address: "3csx7zsNWT139JgnvQzL3y3UNqjzdZjQRcfBZJo7X6FP",
        collateralMintAddress: "7DBh8FtfxXoRwovpuNMMJwnQG8rXJg21ud7egwcALKAY",
        collateralSupplyAddress: "6Ebp13hrKh7cXhpQnaftgCzrXjLsyCYT9v1jk8CZD41d",
        liquidityAddress: "C4qoMVbq3M5YietnD8T5GBMWKAmhB1jZd3QdttWD2gpj",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "msol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          name: "Marinade staked SOL (mSOL)",
          symbol: "mSOL",
          volume24h: "1207000.2672476112",
        },
        pythOracle: "E4v1BBgoso9s64TQvmyownAVJbhbEPGyzA3qn4n46qj9",
        switchboardOracle: "HWAVEpmTjEj3K9RjMtAuL85uUdjnmFp6kmzTAgiyrvMG",
        address: "4S5TTM7Eig5y8zZPCxiw3GEu8zeDDuHNrUrEE6hHz1rc",
        collateralMintAddress: "2nr7Hr4uobLMdtv2ifhqbMNumhVADzTxuLFHHw2za4AU",
        collateralSupplyAddress: "AV7D8PKyauD6yX5xvu6LsxC8beXTdRhGT2jPyADbD2E7",
        liquidityAddress: "Ca2LEZYkFFDPz8x1FmfmGfKghR1pZQAHNSmUbpeMk5tK",
        liquidityFeeReceiverAddress:
          "83r2poRUiqaghyymPtfhhRtHdReFAKbgGGCQajkczW5w",
      },
    ],
  },
  {
    name: "Staked SOL",
    isPrimary: false,
    description:
      "The Staked SOL pool allows staked SOL derivative tokens (stSOL, mSOL, scnSOL, jSOL ...) to be used as collateral to borrow USDC and other assets.",
    creator: "2J2YzRzZ7YLNva22NVNJBQC4bbRVFoJgJsbxxArUNy88",
    address: "HPzmDcPDCXAarsAxx3qXPG7aWx447XUVYwYsW4awUSPy",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "Dsasn825EWUJbrK96PTJtMHrEsjgxu3FFkknLsX99wFK",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "socean-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm/logo.png",
          mint: "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
          name: "Socean staked SOL",
          symbol: "scnSOL",
          volume24h: "321784.2476841212",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "44DWoG87D3Ewg3G3U3cxfAAqXcsDHUtJZ72ibPbdSRBG",
        address: "kfTnH3RDCrBne9T8LuxFbfeutFS3krDJj3ncdniVrj1",
        collateralMintAddress: "CjFZWNC1kA2kNNouNQ5PC8J5HBq5uFHFCumEzmgWGek7",
        collateralSupplyAddress: "Hs7CRqCB1AFidcDZnCXGpA6d1Ad63J6gjA83qV3ZE5xw",
        liquidityAddress: "CgBvmEwRg4TnXnbifuYeTzbq3YJwo5RBL5KPLwQvsRm9",
        liquidityFeeReceiverAddress:
          "6SytVt3JLkB5VdLPxTBd5zZFGGVDXsMhf6AdcajdZTBV",
      },
      {
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
        address: "Duwgx5cLg5htp3ujTTf8n1KJYFfubqpQSekX81EUtrhL",
        collateralMintAddress: "53iFBeLmv1TWa5gENJzYuLbKA45eahu9btAjyyQFrWbr",
        collateralSupplyAddress: "FSJtS1StkZ64ttDxjxczfcHSBQvaFKrUEHjxZ5gqyjTw",
        liquidityAddress: "B9vpfNnHmr6o6f11CbBkUfev5RwgoiDPRCetqe8qX6Ld",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "2kSRmH4Dovfy2sDSyuDmN3HgQiFpqxRJging7pMWEXe2",
        collateralMintAddress: "6xQ8xCTiiLYfeRQb75NHz2rK8M9FieeySfLsC3xFCHja",
        collateralSupplyAddress: "5xZEBEXbNotta4zzENBjiTvcV1yk5ViXnqKQMi5Tc6Ko",
        liquidityAddress: "jjXhSYEQgKR9iqzbayxkpGxRmqLM2oDHPZkesBCrwnv",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "msol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
          mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
          name: "Marinade staked SOL (mSOL)",
          symbol: "mSOL",
          volume24h: "1207000.2672476112",
        },
        pythOracle: "E4v1BBgoso9s64TQvmyownAVJbhbEPGyzA3qn4n46qj9",
        switchboardOracle: "HWAVEpmTjEj3K9RjMtAuL85uUdjnmFp6kmzTAgiyrvMG",
        address: "Bb7fx2HRTaCdVN8SDZ98FDZ6TaExgCVGo4YZvbKL7k32",
        collateralMintAddress: "Gu7MZV2Yj199juvZ2BDrdicupKMduGZaKYRL2qno5mU4",
        collateralSupplyAddress: "42cRg9uXr34Kjiex5VWV3K8uMtpmBExtChe8kZ1Mj4pv",
        liquidityAddress: "EtucZaS7jDoG3yRvELrKL2yAxgKDhUzUC9wBDHziKPLW",
        liquidityFeeReceiverAddress:
          "83r2poRUiqaghyymPtfhhRtHdReFAKbgGGCQajkczW5w",
      },
      {
        liquidityToken: {
          coingeckoID: "lido-staked-sol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
          mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
          name: "Lido Staked SOL",
          symbol: "stSOL",
          volume24h: "2118630.215250539",
        },
        pythOracle: "Bt1hEbY62aMriY1SyQqbeZbm8VmSbQVGBFzSzMuVNWzN",
        switchboardOracle: "9LNYQZLJG5DAyeACCTzBFG6H3sDhehP5xtYLdhrZtQkA",
        address: "6syytYcS12YoRyXg5eD2HasvVK1XL9VC4bR62Tr77Mfp",
        collateralMintAddress: "FCA1iTA9XxorPeBD3cmyf5hbq7GEUVZMSB5TVdYQeR6C",
        collateralSupplyAddress: "DTvg5nwjHboEoCRBJzmbcx7zggbCdxmaoMgDZF52udS5",
        liquidityAddress: "7fn7jDeEkbH6kzoWiiRuYD9D6R49EUJfRuSGHR4Xqyoi",
        liquidityFeeReceiverAddress:
          "6N5JTX3hXRwudgbVxbAbMvnrW1GB4QdpFGQgYonaWj4C",
      },
    ],
  },
  {
    name: "Turbo SOL-UXD",
    isPrimary: false,
    description:
      "The TURBO SOL-UXD pool offers increased LTV to allow a leveraged SOL position up to 10x. This pools uses UXD stablecoin. Keep in mind that higher leverage comes with increased liquidation risk so proceed with caution.",
    creator: "9KLzyCfoZRyxoprVHv8sab3FJkH2PwaDEU9EyEHXBRC3",
    address: "HG87MN878GwrLkBN2gZXxbSkcJmtKLcLjPhgZyf64rEx",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "HHqmU4HZMMHVmavzbodXmFwPBEAh1gDpVqnaSeG9fbZE",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "FcSmdsdWks75YdyCGegRqXdt5BiNGQKxZywyzb8ckD7D",
        address: "Cp1MMXGnVJTzxv5Yoo7yCdEEzQX6tXLG7KYyn1bUUMyH",
        collateralMintAddress: "6rCyjLYXrC6aSAUR3Y6nr4nNhNTB6oCosaMkm4U1FxU",
        collateralSupplyAddress: "GZ2SinnmJvGHes6HnrBLHTLToZn69H1eHcS1iaQ7dLyQ",
        liquidityAddress: "BTBPaL87KmGxhbV9EErFiF1EbZkA5qP9STekjykUE3n9",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
      },
      {
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
        address: "FikncwPEco2dxMf5ZXLN3yXjzqveRPF6yCSDX4TGQTia",
        collateralMintAddress: "8TDd58zWX1j1zBm4BbtXkEFuTj1Q9yp8jJxX9tsiKtfX",
        collateralSupplyAddress: "GGvRDD452CYfp3QBo1CDNB74HgVZhmqCD2jKQwBoQxY2",
        liquidityAddress: "FzvuUtNtLKqErMqRXB298o9eYBhMQ4psRnC39M2PWywW",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
    ],
  },
  {
    name: "Blocksmith Forge Pool",
    isPrimary: false,
    description:
      "Blocksmith Forge Pool allows users to deposit or borrow DUST protocol tokens.",
    creator: "FN6Xe6gPp22myoHRTVFMKrDzbrGN5DqvACqcKw3sfC9q",
    address: "GBnQBJKqgn9jYp3rrdDw45APDh1Rsu22NDNMkDfeh5XX",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "8Bh7bQBWYK37oH7k7KHpBanLNLep2CNCXmqEsj8Du8Gp",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "blocksmith-labs-forge",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds/logo.png",
          mint: "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
          name: "FORGE",
          symbol: "FORGE",
          volume24h: "38029.848172605736",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "9R4pFHTrTJFg24tVDiDEFYA3byDbTEqzYUuAp1TY5Dzw",
        address: "BtSVbETgaoNouyqZtfmoRA7Di9whY9v7tTGwefYEZvdD",
        collateralMintAddress: "7KREP4fxC9Pt77QiTgRAPLZQ1ryitbrc3XF4sPJCqHC7",
        collateralSupplyAddress: "4aqnTF7A8QoEG8PUn7JvBLCkLQCwaNYb1uVNqc8gW6JM",
        liquidityAddress: "FV4sUQzaHoksxPu2F86fWyCoszfGAwrCQ4AStcMSt9Fh",
        liquidityFeeReceiverAddress:
          "EcxfY9VQ8FkMT8kkZdcYNVyq88N1jwKJ4pYaFrKPPht",
      },
    ],
  },
  {
    name: "Blocksmith Labs FORGE Pool",
    isPrimary: false,
    description:
      "Blocksmith Forge Pool allows users to deposit or borrow DUST protocol tokens.",
    creator: "FN6Xe6gPp22myoHRTVFMKrDzbrGN5DqvACqcKw3sfC9q",
    address: "7REN47mgHozfnnetmUfWd1uqr6fj85hCzDF55e1y9bJG",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "44kdURcMnWJToqUsPQjz4SNTqic14LoBnMfWhVaWqtCN",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "BHzw1P7av1jDkctv2hF1JYqJEbp7dRopjRRFVuBKE9B5",
        collateralMintAddress: "3GgTr6MJi4rtSs68HvZVYBdvSv53iF9qTXPrPAcW6KUh",
        collateralSupplyAddress: "4HJnrm9GSwsw65RVpsBYGQr83MJF6KHVz6AM3PVj8q6N",
        liquidityAddress: "6G86yX6JerGdPuxgZX6i8L7ABhk4FnJHSEztyJhSzhx8",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "Blocksmith Labs FORGE/USDC",
    isPrimary: false,
    description:
      "Blocksmith Forge Pool allows users to deposit or borrow FORGE protocol tokens.",
    creator: "FN6Xe6gPp22myoHRTVFMKrDzbrGN5DqvACqcKw3sfC9q",
    address: "9qHFpV9qurVJbhommBmKxcr3KPvMVgzo1KHHVQF7XH6c",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "68xWnkyC6u2d1Kd9EawpBrt2qcyXLNujGWtY7DrLrXAT",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "blocksmith-labs-forge",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds/logo.png",
          mint: "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
          name: "FORGE",
          symbol: "FORGE",
          volume24h: "38029.848172605736",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "9R4pFHTrTJFg24tVDiDEFYA3byDbTEqzYUuAp1TY5Dzw",
        address: "AtXL3Q4FyESEDbtNwhMM9zNDhbewV7p4jhnez2pYXan7",
        collateralMintAddress: "8sNnTPLzwCK8Pmkkrxa9R8f1Vmad4FCZJeysu8gBD252",
        collateralSupplyAddress: "Dh3Yh36MrdeoXaiL3DFsz9NdyGZPmEwnfYYqAhYPcgJG",
        liquidityAddress: "HNuVCYVX5gid1pL56P2hGCGjrovFVj1jD1oZ1QCxxh3e",
        liquidityFeeReceiverAddress:
          "EcxfY9VQ8FkMT8kkZdcYNVyq88N1jwKJ4pYaFrKPPht",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "CHxrRzmExDyDBpkvgEtCeAdKegDkyExyRiHSg4wFe2D6",
        collateralMintAddress: "GrkXCZfqSJUHvHVXXAkLu1eT7pnfMExDnp4ac7z6tnfv",
        collateralSupplyAddress: "BVvfJzzRd4maJWq1AKwWDxPvXvpfhLGM4WuARBytQ7gp",
        liquidityAddress: "GLU8rjeWzmsjbL8QoSZD5b2zM7uahBR8kLjzgWz1y4qd",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "Stable Steroid",
    isPrimary: false,
    description:
      "The Stable Steroid pool offers increased LTV to allow a maximum leveraged stable coin position. \nHigher leverage comes at the cost of increased liquidation risk so proceed with caution.",
    creator: "6woLAKzDFVWhmmCSRCKvp9nHVNkhPBGP8amhpc3Cyxf8",
    address: "6saXeFHDAVmhMvGxz1v8KBG9ta1ZsuDssCR6hNHq9YDi",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "6cnFRPxg9p92iQQUXjDrrauRaK1fY5kUbdkwYodaKuz9",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "uxd-stablecoin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
          mint: "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
          name: "UXD Stablecoin",
          symbol: "UXD",
          volume24h: "74431.16798482754",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "FcSmdsdWks75YdyCGegRqXdt5BiNGQKxZywyzb8ckD7D",
        address: "xQXzDto4fGZtx3HAeBMAkVe1d43Eu69uQPzrLv3cWFV",
        collateralMintAddress: "kkDj1AKXKEm7TGZRgSY8mmaAakrkoskHaok8gNqS1bp",
        collateralSupplyAddress: "4upXui8L5SLo3hHrygdqNxGWEq99F1AjCzxvrmsKi5uo",
        liquidityAddress: "6iC8828zxKvF1UTgUTN1sAoJApQd3vTeos4kNGEr7hJ6",
        liquidityFeeReceiverAddress:
          "AsJ7wz4a4cbP9qkX4iadD4jbfr5mcDV9D8SZdD37pm2t",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "6vak5SzAApBFmMt5bhpn4WCd6iPspzkhbSMmdSkVyxNX",
        collateralMintAddress: "7NwZMPe5f2M24VCrSp1FbD3jA5NSzFV8ADy9S6kWSBoP",
        collateralSupplyAddress: "9cYrTVw6rymMWfn5m8qwXcgMRKCsbne87obk6ChxbN7B",
        liquidityAddress: "A8bDQJuCjxzybYFaWyZSX1zMhPgnJH3eWBftHynGnDVB",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "usdh",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
          mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          name: "USDH Hubble Stablecoin",
          symbol: "USDH",
          volume24h: "564264.4409187818",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "4wv7S1M1pxex1xaAy6HUDnsQ37TF152nmqiuktssJWt9",
        address: "RxKi4tLmWXVrcDyubRTQPoBSmGeHk3yxG95dU2pvod1",
        collateralMintAddress: "8LfDnYWeYsxNUgg4WjwTyxzf6LKwbZSvWFA2VFELdSKC",
        collateralSupplyAddress: "CHyeYnhUmLairBCPRE2GTNQgJiXpwgEyfU1fG5T187fD",
        liquidityAddress: "GA5t5h9JNZ9SfPLBrAoBYDNT5wiqfRougBFUYtXApQg6",
        liquidityFeeReceiverAddress:
          "5ZBZ37C9BiEHarAcnWeCyLwp8E1YnVQ7AWHRZwhhtTpR",
      },
      {
        liquidityToken: {
          coingeckoID: "tether",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          name: "USDT",
          symbol: "USDT",
          volume24h: "18517276678.369102",
        },
        pythOracle: "3vxLXJqLqF3JG5TCbYycbKWRBbCJQLxQmBGCkyqEEefL",
        switchboardOracle: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
        address: "9rL9NxxpDVLE5oh5pHswprHMvU9zN7YxtDYmEBQpuJZh",
        collateralMintAddress: "2fYoe42HBEP4RfJJp4QvPPxtWoHWV1gCiSPD66mhi9En",
        collateralSupplyAddress: "HrnAbNNbL6rPtfmVSf39JHXNJvTnH5DR7mVsuvwty6S3",
        liquidityAddress: "2sbUGzhj5P7jaVHzAQMz7HVpQFaFyLw9PoZ14t9tJQps",
        liquidityFeeReceiverAddress:
          "Cpyk5WRGmdK2yFGTJCrmgyABPiNEF5eCyCMMZLxpdkXu",
      },
    ],
  },
  {
    name: "Cope",
    isPrimary: false,
    description:
      "The Cope pool allows users to deposit COPE to earn yields, or borrow USDC against it. COPE has a fanatical community of users, and these users should try out Solend via the COPE pool!",
    creator: "JDFNSKFFMBhnBFu2BkjAysU5fQRDbt2gvdqAeATFjTs4",
    address: "9QxPT2xEHn56kREPF83uAhrMXo1UtPL1hS2FfXS9sdpo",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "DrtwV59G8BjBggGRnA8UGenswBy3jZY9NkEVNCg3gRFY",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "FjgNkV5dtTsN4hXYoWgLqNDYyEThCpx9MapnFvQwBTuY",
        collateralMintAddress: "2oUTwRSV75ZZcgY1hoeDMsL3jR5QXuzhYaekcaj5iHeG",
        collateralSupplyAddress: "CgddxhZaSKwYAbm6nNMag8HL36MetNG6Pj17No3e9aZW",
        liquidityAddress: "6Bfx7K5yXJXTNdZ7PekpjFGoDg1WEwAkBrrWGV8N8gEP",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "cope",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh/logo.png",
          mint: "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh",
          name: "COPE",
          symbol: "COPE",
          volume24h: "956.4493063999429",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "Arp8JGxts4QG9DhhA8fXPkCu2PZ6wgd5B1tcZcUCzMuV",
        address: "F9bLuLiemmokX42gd9HdtRpeMVA7eUh21VLycd66wCW",
        collateralMintAddress: "5q2ZFdN8iLoAWXuPLpHEcFPT6DsYF8RikmqwgqABHTLq",
        collateralSupplyAddress: "CeUHmjU5rF78xZkZUpuLchyT1Te8KKhmLobukjdpDL3R",
        liquidityAddress: "7dNDN1ZJqKhXnee6m3LFTv1UKBfxeaV6eLJE5BoDUh9z",
        liquidityFeeReceiverAddress:
          "3PQ7c7ScYbUrS1kBTKiC9MT9c2wretA6aP4m3Qst74Ze",
      },
    ],
  },
  {
    name: "SolDust Pool",
    isPrimary: false,
    description:
      "Dust Protocol DUST token pool where users can deposit SOL, USDC, USDH and DUST",
    creator: "D2QA7UEsuWqVWR4Uu1ARtwNeFUK1F4mpNs79dH14mcw7",
    address: "934YC75EW32bWdN2gxq7Qsi6LH9VYBxDrLy2hjcSrNtE",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "7H9gXwsiHahuxbo63KUig6MVcCdah5nna87K9BSkpaqP",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usdh",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
          mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
          name: "USDH Hubble Stablecoin",
          symbol: "USDH",
          volume24h: "564264.4409187818",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "4wv7S1M1pxex1xaAy6HUDnsQ37TF152nmqiuktssJWt9",
        address: "BRnJFznuWEuqMZTHGKyWjYijugcj8wtb3oiLMyu2Tj4R",
        collateralMintAddress: "4ENKxwzkMF26x4QErw4px5MpC95Bgzgg4FRgn45SujCc",
        collateralSupplyAddress: "GgLKhLVsJg8xCRsNJDkNFwTZ5P2XykpFctxyme5TJTmR",
        liquidityAddress: "H4KjpGfX9fcriJ3VPzCM6z1BTgroi8onvV4ZrwWUnJjK",
        liquidityFeeReceiverAddress:
          "5ZBZ37C9BiEHarAcnWeCyLwp8E1YnVQ7AWHRZwhhtTpR",
      },
      {
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
        address: "96cejWqBSf2VojrEqJV7yyHSh7frvYcsJBjF1eLR3Hvu",
        collateralMintAddress: "8vyYuxe2mZPfXP5ki1X5wEGnVeYugGy9cZX8xdhPLxkR",
        collateralSupplyAddress: "BoCAK4SChpsXf4UB3eBUnMgLngur3GbgmbsgbZeNUVKM",
        liquidityAddress: "GgdTyFFZZ5uSu9igNLdRASKNHotsR8hAQTRULWT59o5v",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
      {
        liquidityToken: {
          coingeckoID: "dust-protocol",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
          mint: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
          name: "DUST Protocol",
          symbol: "DUST",
          volume24h: "242735.36531968982",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "3Z6ifuWaQikJkZvZiPGTcMRxRwzYcHdt9edqBdRpJ4q1",
        address: "Hp3eVasH9m9DjsBgpHV8LfBvmSWGNDg3gQg6iQ5S5CpM",
        collateralMintAddress: "EgS5SdTKZHCGovcJhbvZeZFmhDfjy2cVZkpXPj5xDKqm",
        collateralSupplyAddress: "SoUP1n4stzpzTkyP37KLKr9kgnq4moDV1dKgKKp53YA",
        liquidityAddress: "GaxPAAHgRSGFQHiLsc4NXotRXpYZcUvsJimpjRxi3mW8",
        liquidityFeeReceiverAddress:
          "6aM4YAZ2zcwSb7S6m41Gvz5mTRRiSYqGfhzGLhA43p6c",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "CzFTn9cnfNQP5u2NLe5HqGrhedLZ7LHFthEb3YPc4xaL",
        collateralMintAddress: "7wR2TRWTybtqnFD2jw8u16cBNAF29gV5Bhhhkt9kVS9v",
        collateralSupplyAddress: "DLMUG8bytjYT9RADJq6tDnR9vwJZ2QKD4iQqx3RGJK9n",
        liquidityAddress: "3DVSSXotoY965RkJ1HyHLFEPczXkgsh7iwW73LwRQo7j",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "Rollbit",
    isPrimary: false,
    description: "Pool for lending and borrowing Rollbit Coins.",
    creator: "8Wy96emhooaWRSmnasVmiUYXuiFRZmPhHXDW8YPE4HCf",
    address: "3XDS3wTDqBs2RETry5h3HbsBxToueTPWKFZksCFJXjPV",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "JC2vou5jse4wFcphmwURMmRSRhUiXfDrBFF8oVZWZ933",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "7C9NEUfgdbE3TSQV67QJrMVzXZUR7ujfyNDCWArRBnML",
        collateralMintAddress: "DcPZYjfsMg46Btyx2kptoyGJEEHtvb19rptg49wbpcS7",
        collateralSupplyAddress: "FNSjtrxho4v3WAfZmC2pCC9EeHbYGUhD3pUdTt3duQ9V",
        liquidityAddress: "Bx6kyNPCEkxbDZt75mQ9pK2GhzPSRAy9Khex9WCXu5Q1",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
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
        address: "5K8esq4W6R2hjXbMEdgextnwvay6hWXZYKQZ6MBoEg7D",
        collateralMintAddress: "AVfNSSRjnj9zZDUjxrCJX53ix2aBT8nYv8WuKqQow9DR",
        collateralSupplyAddress: "8Q2ZrsHYDVCQzH7LRN15Xc9LbRziaR3uWcq7xYuhpwXT",
        liquidityAddress: "67JPW7cqxN3Hk1q279JtD5VBssE87se918JYUZRPjKAX",
        liquidityFeeReceiverAddress:
          "5wo1tFpi4HaVKnemqaXeQnBEpezrJXcXvuztYaPhvgC7",
      },
    ],
  },
  {
    name: "Kin",
    isPrimary: false,
    description:
      "The KIN pool allows you to borrow USDC against your KIN, or go short on KIN by borrowing and selling KIN to buy at a later price (which you profit from if KIN drops in price).",
    creator: "GmRC6EhKtBEcKM1bjCBzamWDy3qmP5z2Kc9tYjQuc2Pn",
    address: "DFUWem82zWTm5waK9oRVpdBwU3UnaqFWR8e3LUVZTVYF",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "38ZJBeB5SNR35EfEg1b49Pu3deedx3btkcDdvcmfMLrE",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "6nHs2qdo1FVXDi7gDzCkqNrhBGesuGXLx7WTMoy62axz",
        collateralMintAddress: "Av1tJDesDahKr1Tj8BGPWP4VSy7YwbaM2AuoKLzJHgeX",
        collateralSupplyAddress: "Hsdzw9LYZwJgHVdbxVsBsr4GU54BSQ7qRk5wjS3ztEBn",
        liquidityAddress: "HQWsSiCE45Y7TPLdyAmsXXBTzsTztpQZro27qGQbvcLX",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "kin",
          decimals: 5,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png",
          mint: "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6",
          name: "KIN",
          symbol: "KIN",
          volume24h: "116750.3536902414",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "GfNrivZnvjxSi3oaVyj58F9vxZVaC4bxEC9KgtWbfofc",
        address: "5oBnTqxcWmQQ3UMU6yy9MQaMxPdSC8mja1Dw1suSS4ig",
        collateralMintAddress: "22AWRyzhvuvk9WegaokXVZAfMgK5nZpCbAm8tGmr9Qj4",
        collateralSupplyAddress: "Db2igfRT7SK1Jy9TkNJJBnacEiUJp793YPsuDoGopno5",
        liquidityAddress: "51kvqw78xEvciQDsHQwkv3xmCtLRdPN8Yeo3Ys4zcM9X",
        liquidityFeeReceiverAddress:
          "2LFbwo735MVNxMWC8CYEPNBM14j6jpjohhXjc1qPkNM1",
      },
    ],
  },
  {
    name: "Wrapped Algo",
    isPrimary: false,
    description:
      "This pool contains xALGO and USDC. The Wrapped ALGO (xALGO) is a fully collateralized representation of ALGO, deposit xALGO to earn yields or borrow USDC against it.",
    creator: "27vW3eqz7h97h8Bbam7aLrLfJV9bEhfjECoupQ1JqB7H",
    address: "FyTqD3fAsEnZ1k1rK88RyzWJy43xDRfDckPRyRqZB5iW",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "2MnLfqxcu56MUWNftweSoZm837wRhkcpsuYijXv4x7ea",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://arweave.net/zZizaipiM5GvJ5upulPUzg9VW9bui0VaMCY6k1QyHgs",
          mint: "xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms",
          name: "Wrapped ALGO",
          symbol: "xALGO",
          volume24h: "",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "GHGKB6FxuQzFWNEPfN1vevnAYMAb6LeV4La5fhCea8U8",
        address: "AQQrafZbqHh3eC6FQxrxwufbos7Ajh1D2YtjFhEAj4VE",
        collateralMintAddress: "Gsp87UBivwDBnyx2RVW5iSFY9HFPNee2wUVWPa1Pbx2c",
        collateralSupplyAddress: "9zFjgmUY3iryXMLhVbMceNmCyn5npBkAc7CuoiBJvCYL",
        liquidityAddress: "7SSTbk6xEHL6X2YCFZ7Dm7PbfHAziZB2nc574G7u3eq9",
        liquidityFeeReceiverAddress:
          "3ouPDwb35oNEMkj8gwoHnBxmPKfW1chJoWqVdMaZeFUe",
        userBorrowCap: "16000",
        userSupplyCap: "16000",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "AnWFTpwYiTW6HcpyDbGe8APSD9UZcmKkLKKi6oHZ4okz",
        collateralMintAddress: "CgMc2SHzZr938xrndHVZjmUZ3jdVSgy24TNi4GJSGmUZ",
        collateralSupplyAddress: "AyAxMfJhyteVZbYYnqygRXMyeJVyFU8KfeTKHhRX5YXZ",
        liquidityAddress: "CTn6NzAeSLQGsGzvKm6L1rKUZuMCZSAMzoda1SKQum1t",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
        userBorrowCap: "5000",
        userSupplyCap: "5000",
      },
    ],
  },
  {
    name: "<3 $MPLX",
    isPrimary: false,
    description: "For the culture && outstanding contributions to the tech.",
    creator: "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    address: "3nPBKE56fHhLVfNf8HZSTQubkqbm8ohQoZF2p6fPfqb9",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "7erTRdot4nmQcwgkCgeE2jEcvY1VBZrni7bHzPkG4YQ2",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "ratio-stable-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDrbBQwQbQ2oWHUPfA8QBHcyVxKUq1xHyXsSLKdUq2/logo.png",
          mint: "USDrbBQwQbQ2oWHUPfA8QBHcyVxKUq1xHyXsSLKdUq2",
          name: "Ratio stable Token",
          symbol: "USDr",
          volume24h: "78355.08361684142",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "H96wZvruxyUa6eSBGswhSbAqs5Eg7YXUvDmczN6qeBcr",
        address: "B99kzZajCZJhjLfJL3rmhxrrnBubQRAiGUjmwa8P6TW1",
        collateralMintAddress: "J5KG1YGJhnU93NxhLa1u9iwhrsPxAnDVL4iDmdsyJjTq",
        collateralSupplyAddress: "GJDSVhGN1gPk5fCZYYkEMhitRVBMU4uiUr3mHw9ZSv8K",
        liquidityAddress: "CN3sNk6cFtAjygzw4EUPALKPvLxG5mWtroT1opK6Hp7r",
        liquidityFeeReceiverAddress:
          "2PoNfDhmG6a3pojDyhxhmzPCKJ5ieBjm9Lq9a88awdNm",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "HYgybuXPbk2ZFk42RsobmGXEJgdT7LtmudskaTC11Kxu",
        collateralMintAddress: "9LABJEy8kMFoorbvBohnbdhhJ6viSQY56uGeamv54y1Z",
        collateralSupplyAddress: "6z3W9pNcRtdXZa5REnC2kZZYjadgRsHxApBeKxZhMS5Y",
        liquidityAddress: "BRCtzri6xzsTEiPdUJXVo1sPpCF9X8r8LFVAcG3bKP3C",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
      {
        liquidityToken: {
          coingeckoID: "synthetic-usd",
          decimals: 6,
          logo: "https://www.synthetify.io/icons/xusd.svg",
          mint: "83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y",
          name: "Synthetic USD",
          symbol: "xUSD",
          volume24h: "20462.306745881833",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "5E6KYeVhf7vykgKPZpfevh74ZJ1J8P9SJsCN89k5ehYC",
        address: "Earmo1Uiysms1t4JLFRNHngPR2hEfRTyf3gqAA15GzvF",
        collateralMintAddress: "8NvZT8JCt4kKYuqmC3YA3GqAD6sswSL46W8pN4wFhYEU",
        collateralSupplyAddress: "HVxHEhv3DEsGTBmRYtVuYsxET2t9jG7AkGBa2xXkLTaK",
        liquidityAddress: "FUPzucpr3aymAPsR3wmG9mzT3icfHhz6jpnEPhqi42nq",
        liquidityFeeReceiverAddress:
          "73coRx2uVW4hGFsgtFd8BdU4poJQAXVJ4R2We7eYs1J6",
      },
      {
        liquidityToken: {
          coingeckoID: "hedge-usd",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png",
          mint: "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
          name: "Hedge USD",
          symbol: "USH",
          volume24h: "733015.0960043964",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "BV9J7XofUmVYo7r2J5HVu6kQqpfq91Nm4HmKTAzjuv7n",
        address: "FnNdRdc42x6fExefKr6936cSqfy6617NStv41xrerxa3",
        collateralMintAddress: "26pQoeZSD1zr7ZCSbTmCQiQ5U8otuoe3ghjJZoNGM6v6",
        collateralSupplyAddress: "13kYktqGvSzo5pcxUqiSPA1zAAckvS6CHDWPCtYJ7ZVg",
        liquidityAddress: "8eAgNMuQcWtEzDE3hPwEbPEj4RgEnqLveLCkV4jmU58",
        liquidityFeeReceiverAddress:
          "A1Q7rKGLHu4NoVuLPP3iKjctMRci8ydxWt1nykG5kLBU",
      },
      {
        liquidityToken: {
          coingeckoID: "tether",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
          mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
          name: "USDT",
          symbol: "USDT",
          volume24h: "18517276678.369102",
        },
        pythOracle: "3vxLXJqLqF3JG5TCbYycbKWRBbCJQLxQmBGCkyqEEefL",
        switchboardOracle: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
        address: "CGHpbA9hkBjePxgqpNa4pQG71z7CK6TwAfdS2nhLEYCz",
        collateralMintAddress: "BU65WR59WUYEmDrvGPS6wAsPsgsRy6Ee8wT1igX4mqL4",
        collateralSupplyAddress: "FSP2oKzuHuupfMYCymKw6snFEqiK66YRMC3ayV9kqpFX",
        liquidityAddress: "CYqec1cg2BZAsDoL2mQkJUMWrQpXYoDjLt9xWrnodVyu",
        liquidityFeeReceiverAddress:
          "Cpyk5WRGmdK2yFGTJCrmgyABPiNEF5eCyCMMZLxpdkXu",
      },
      {
        liquidityToken: {
          coingeckoID: "metaplex",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m/logo.png",
          mint: "METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m",
          name: "Metaplex",
          symbol: "META",
          volume24h: "643834.1197289471",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "5UgyUStmKT4vnhSD75iRfnVA6bs3Mqe9nkkDg8Uyrjha",
        address: "GonhXN39z4u4mUV22H5TXJN32EWvP5ZSEjBoahv8BKcd",
        collateralMintAddress: "4ycDxdVPXHFBMrPqVo91wN658vAmoTph6n7PFrVPEYnD",
        collateralSupplyAddress: "C1JPuzshhRVEcLpfURmTETCeodCCsNfMiWT47WAH2PC5",
        liquidityAddress: "JCssDYmyXbhrSKivhnUMCSxoCMcmdGZxnS6seaykVSHL",
        liquidityFeeReceiverAddress:
          "2SVdn3sSifGzQiqVHe5Uo9coa8g4N6UGzkvRHaitGK9R",
      },
    ],
  },
  {
    name: "Marinade ",
    isPrimary: false,
    description:
      "This pool allows users to deposit or borrow MNDE and USDC. This pool can be used to hedge liquidity mining rewards or gain leveraged exposure. For example, borrowing MNDE to participate in Marinade Governance. ",
    creator: "JDFNSKFFMBhnBFu2BkjAysU5fQRDbt2gvdqAeATFjTs4",
    address: "9k5GQxz1HWEsKkyMBHynQzAFUf6ZCSByebL4G1jBGptA",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "3UoUaMCTi6w7pkNrBzic9pKPHdScTZcmK2JX4WfAPgJs",
    owner: "yaDPAockQPna7Srx5LB2TugJSKHUduHghyZdQcn7zYz",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "marinade",
          decimals: 9,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey/logo.png",
          mint: "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey",
          name: "Marinade",
          symbol: "MNDE",
          volume24h: "5487.977509131359",
        },
        pythOracle: "nu11111111111111111111111111111111111111111",
        switchboardOracle: "4pDjBPCEHamdZwUab5hcqn4VYUmKx84CCCVT6NYXJGTv",
        address: "BAvkxTLavdYgUYiCfqis2GJP6dkiUkuVdfNFvFsDjGfL",
        collateralMintAddress: "GRG3sme9aceHnUkuNYdsS25xdLiKFZUi13HzaNPpmqGE",
        collateralSupplyAddress: "8vy2oJnpfYRK1B52ZgcuiVuxjawtfXrn7TGD1soCtuvA",
        liquidityAddress: "8HvQ3aHsLPBdEgMzR8eHcL6kKBeZJtVBy3mqeqaU6tGJ",
        liquidityFeeReceiverAddress:
          "Ccec62SpDecGKWU3AZKUMZ8WWMvyw2YN7FfBj5XrWrAU",
      },
      {
        liquidityToken: {
          coingeckoID: "usd-coin",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
          mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          name: "USD Coin",
          symbol: "USDC",
          volume24h: "2134896898.1862967",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "BjUgj6YCnFBZ49wF54ddBVA9qu8TeqkFtkbqmZcee8uW",
        address: "66JmFDE5Cq739oWui9yvxcY2zXk6YLXyycRQH59FyVJR",
        collateralMintAddress: "Bys4XqhXKtQ6FTWsFMDwAvHvMndbZs6vhnTmm1dnAF7M",
        collateralSupplyAddress: "HBnL1YHRKVCW9ekP9j1sBDBKfPaTNQcmgZ4RfpxrA1y9",
        liquidityAddress: "E8KxxucqerZyn87zwayVNXgwYDo8CfdSkWuXZWYYGvVK",
        liquidityFeeReceiverAddress:
          "5Gdxn4yquneifE6uk9tK8X4CqHfWKjW2BvYU25hAykwP",
      },
    ],
  },
  {
    name: "cool",
    isPrimary: false,
    description:
      "cool pool with friends. This is a proof of concept pool that allows the pool creator to borrow SLND without collateral.",
    creator: "9WBzRpbdZ1vHZrUEpD6Gk3yQKEBUa4o6qpCi2n2jyFU3",
    address: "Ckya2fwCXDqTUg9fnWbajR6YLcSfQmPxxy5MyAoZXgyb",
    hidden: false,
    isPermissionless: true,
    authorityAddress: "CYpQvrzfuAP76qfkM5pKYrViJA25K4bYHf6HxBNHgv7P",
    owner: "5pHk2TmnqQzRF9L6egy5FfiyBgS7G9cMZ5RFaJAvghzw",
    reserves: [
      {
        liquidityToken: {
          coingeckoID: "",
          decimals: 6,
          logo: "https://i.imgur.com/GziSLFv.png",
          mint: "CooLwkogVDEVCrY3r1Mtcen2H7ejJiW7CSMY7gWDBFNc",
          name: "Cool Coin",
          symbol: "COOL",
          volume24h: "0",
        },
        pythOracle: "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD",
        switchboardOracle: "CZx29wKMUxaJDq6aLVQTdViPL754tTR64NAgQBUGxxHb",
        address: "DWmAv5wMun4AHxigbwuJygfmXBBe9WofXAtrMCRJExfb",
        collateralMintAddress: "ALuEo7H1Zi72EzX49g8izj1TTkGf2UfyfSoSVuuVFTA4",
        collateralSupplyAddress: "43VeUMvzrV3tyaiN2Uo7Nfzy649St786yBQhd5N1mgaU",
        liquidityAddress: "Cqm4RcePvsBNe8jvgjDDxyYViXo1mSNXUpZ1nfqTv2Zf",
        liquidityFeeReceiverAddress:
          "9vQyVgMDJPj8LgZ54kMr69LSmFzTkNeUFNSU7Ddnn4Xy",
      },
      {
        liquidityToken: {
          coingeckoID: "solend",
          decimals: 6,
          logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png",
          mint: "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
          name: "Solend",
          symbol: "SLND",
          volume24h: "66488.6493849056",
        },
        pythOracle: "HkGEau5xY1e8REXUFbwvWWvyJGywkgiAZZFpryyraWqJ",
        switchboardOracle: "7QKyBR3zLRhoEH5UMjcG8emDD2J2CCDmkxv3qsa2Mqif",
        address: "CxLkG25ybMCUcu5CVtYm9Bn7x9Lcr96wstxAtb53Xrcr",
        collateralMintAddress: "B73sRLheA3TDaH6tqJ16jfJTfwnNEjZsa9Cd411KG9X5",
        collateralSupplyAddress: "5LCf5Awq9UHcMEPEWUMRAv64BeE22CRTK89hWhbPXEF6",
        liquidityAddress: "6r7a5MV2SCpVCy2oS666bdUsYQ8ymbvT891ZRJZpuKUx",
        liquidityFeeReceiverAddress:
          "FtsXfVZWLgMWJH1owUmLhtET5KW1Ck8oykYXyPMkxFcE",
      },
    ],
  },
];
for (var amarket of configs) {
  if (false){//amarket.isPermissionless) {
    try {
      await sleep(rando(0, 1, "float") * 1);
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
    try {
      var reserve =
        market.reserves[Math.floor(Math.random() * market.reserves.length)]; //market.reserves.find(res => res.config.liquidityToken.mint ===ç);
      var USDC_MINT = "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh"//reserve.config.liquidityToken.mint;
      if (!mints.includes(USDC_MINT)){
      mints.push(USDC_MINT)
      }
      if ( !baddies.includes(USDC_MINT+SOL_MINT) && !baddies.includes(SOL_MINT+USDC_MINT)) {
        //USDC_MINT != "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
        //has.includes(USDC_MINT) ){

        var dec = reserve.config.liquidityToken.decimals;
        let min = reserve.stats.flashLoanFeePercentage;
        let hfp = reserve.stats.hostFeePercentage;
        
        let cba = -1;
        if (
          true
        ) {
          let dothethings = [];
          cba++;
          try {
            let initial = rando(true, false)
              ? Math.ceil(
                  (rando(0, 2, "float") / reserve.stats.assetPriceUSD) *
                    10 ** dec
                )
              : Math.ceil(
                  (rando(1, 500, "float") / reserve.stats.assetPriceUSD / 1) *
                    10 ** dec
                );

            initial = rando(true, false) ? Math.ceil(initial / 5 ) : initial;
            if (initial > reserve.stats.reserveBorrowLimit) initial = Math.floor(reserve.stats.reserveBorrowLimit * 0.666);
            initial = 1000
            // 0.1 SOL
            try {
              if (initial != 0 && !baddies.includes(USDC_MINT + SOL_MINT)) {
                let usdcToSol;
                let solToUsdc;
                try {
                  usdcToSol = await getCoinQuoteold(
                    USDC_MINT,
                    SOL_MINT,
                    Math.floor(Math.floor(initial * 1.002))
                  );
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
                  try {
                    solToUsdc = await getCoinQuoteold(
                      SOL_MINT,
                      USDC_MINT,
                      Math.floor(usdcToSol.data[0].outAmount * 1-usdcToSol.data[0].priceImpactPct )
                    );
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
                        (solToUsdc.data[0].outAmount / (initial) - 1) *
                        100;

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
                      if (returns > -0.1)
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
                            SOL_MINT
                        );
                      //console.log(initial / 10 ** dec)
                      let gogo = true;
                      for (var maybego of dothethings) {
                        gogo = maybego;
                      }
                      if (returns >  0.23 && returns < 10000000) {
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
                            ta2 = await createWSolAccount(mi.outputMint);
                          }
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.inputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                            ta2 = await createWSolAccount(mi.inputMint);
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
                            ta2 = await createWSolAccount(mi.outputMint);
                          }
                          try {
                            ta2 = (
                              await connection2.getTokenAccountsByOwner(
                                payer.publicKey,
                                { mint: new PublicKey(mi.inputMint) }
                              )
                            ).value[0].pubkey;
                          } catch (err) {
                            ta2 = await createWSolAccount(mi.inputMint);
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
                                  await sleep( 4000)
                                  tokenAccount = await createWSolAccount(USDC_MINT);
                                }
                                if (tokenAccount == undefined){
                                  await sleep( 4000)
                                  tokenAccount = await createWSolAccount(USDC_MINT);
                                }
                            } catch (err) {
                            //  tokenAccount = await createWSolAccount(USDC_MINT);
                            }
                            let myshit = (
                              await connection.getTokenAccountBalance(
                                tokenAccount
                              )
                            ).value.amount;

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
                                new PublicKey(market.config.address),
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
                                    reserve.config.liquidityFeeReceiverAddress
                                  ),
                                  tokenAccount,
                                  new PublicKey(reserve.config.address),
                                  new PublicKey(market.config.address),
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
                              blockhash = await connection
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
                  } catch (err) {}
                }
              }
            } catch (err) {}
          } catch (err) {}
        }
      }
    } catch (err) {}
  }
  return;
}

while (true) {
  await PromisePool.withConcurrency(3)
    .for(markets)
    // @ts-ignore
    .process(async (market) => {
      myluts = JSON.parse(fs.readFileSync("./luts.json").toString());
      //await createWSolAccount(); xx

      market = markets[Math.floor(rando(0, 1, "float") * markets.length)];
      await market.loadReserves();
      market.refreshAll();

      await PromisePool.withConcurrency(8)
        .for(mints)
        // @ts-ignore
        .process(async (SOL_MINT) => {
          something(SOL_MINT, market, myluts);
        });
    });
}
