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
  process.env.NODE_ENV == "production"
    ? process.env.RPC1
    : process.env.RPC1,
  { commitment: "confirmed" }
);
var connection2 = new Connection(
 process.env.RPC2,
  { commitment: "confirmed" }
);

var skippy = new Connection(
  process.env.RPC1,
  { commitment: "confirmed", skipPreflight: true }
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
let arg = [
  {
    "chainId": 101,
    "address": "NGK3iHqqQkyRZUj4uhJDQqEyKKcZ7mdawWpqwMffM3s",
    "symbol": "YAKU",
    "name": "Yaku",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EK58dp4mxsKwwuySWQW826i3fwcvUK69jPph22VUcd2H/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1",
    "symbol": "agEUR",
    "name": "agEUR (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CbNYA9n3927uXUukee2Hf4tm3xxkffJPPZvGazc2EAH1/logo.png",
    "tags": [
      "ethereum",
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
      "assetContract": "https://etherscan.io/address/0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "ageur",
      "description": "Angle is the first decentralized, capital efficient and over-collateralized stablecoin protocol",
      "discord": "https://discord.gg/z3kCpTaKMh",
      "twitter": "https://twitter.com/AngleProtocol",
      "website": "https://www.angle.money"
    }
  },
  {
    "chainId": 101,
    "address": "Fm9rHUTF5v3hwMLbStjZXqNBBoZyGriQaFM6sTFz3K8A",
    "symbol": "MBS",
    "name": "MonkeyBucks",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Fm9rHUTF5v3hwMLbStjZXqNBBoZyGriQaFM6sTFz3K8A/logo.png",
    "tags": [
      "utility-token",
      "game-token",
      "game-currency",
      "GameFi",
      "Gaming"
    ],
    "extensions": {
      "coingeckoId": "monkeyball",
      "description": "MonkeyLeague is the next-gen esports metaverse empowering players to create, play, compete, and earn.",
      "discord": "https://discord.gg/monkeyleague",
      "facebook": "https://www.facebook.com/TheMonkeyLeague",
      "instagram": "https://www.instagram.com/themonkeyleague/",
      "medium": "https://medium.com/@MonkeyLeague",
      "reddit": "https://www.reddit.com/r/MonkeyBallGame",
      "telegram": "https://t.me/MonkeyLeague_Official",
      "twitter": "https://twitter.com/TheMonkeyLeague",
      "website": "https://www.monkeyleague.io/"
    }
  },
  {
    "chainId": 101,
    "address": "HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo",
    "symbol": "CWAR",
    "name": "Cryowar Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HfYFjMKNZygfMC8LsQ8LtpPsPxEJoXJx4M6tqi75Hajo/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/cryowar",
      "telegram": "https://t.me/cryowar",
      "twitter": "https://twitter.com/CryowarDevs",
      "website": "https://cryowar.com"
    }
  },
  {
    "chainId": 101,
    "address": "CgbJxXyaHeU8VsquBpySuFXA94b6LWXxioZ28wRr8fs9",
    "symbol": "VINU",
    "name": "Viral Inu",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CgbJxXyaHeU8VsquBpySuFXA94b6LWXxioZ28wRr8fs9/logo.png",
    "tags": [
      "stake-pool-token",
      "utility-token",
      "meme-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/zpJ7zADRZ5",
      "telegram": "https://t.me/viralinu",
      "twitter": "https://twitter.com/ViralInu",
      "website": "https://viralinu.com"
    }
  },
  {
    "chainId": 101,
    "address": "FaiPGacTM7YBmacumbg4ZnDx7sKtGcG3LkcVoqfddEA7",
    "symbol": "BULL",
    "name": "theBULL Coin",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FaiPGacTM7YBmacumbg4ZnDx7sKtGcG3LkcVoqfddEA7/logo.png",
    "tags": [
      "community-token",
      "meme-token",
      "NFT"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/B6sd88UVmD",
      "twitter": "https://twitter.com/theBULL_NFT"
    }
  },
  {
    "chainId": 101,
    "address": "BiDB55p4G3n1fGhwKFpxsokBMqgctL4qnZpDH1bVQxMD",
    "symbol": "DIO",
    "name": "Decimated",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BiDB55p4G3n1fGhwKFpxsokBMqgctL4qnZpDH1bVQxMD/logo.png",
    "tags": [
      "decimated",
      "DIO",
      "videogame",
      "utility-token",
      "virtual-currency"
    ],
    "extensions": {
      "twitter": "https://twitter.com/decimated_game",
      "website": "https://www.decimated.net"
    }
  },
  {
    "chainId": 101,
    "address": "BYLotMdQmq579hhP9xDcuCJky9kmMrbp77eoktmm7a5Y",
    "symbol": "CKG",
    "name": "CryptoKnight's Gold",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BYLotMdQmq579hhP9xDcuCJky9kmMrbp77eoktmm7a5Y/logo.png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/SYpnu7pTPS",
      "twitter": "https://twitter.com/CryptoKnightSOL",
      "website": "https://www.cryptoknights.me/"
    }
  },
  {
    "chainId": 101,
    "address": "7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn",
    "symbol": "JSOL",
    "name": "JPOOL Solana Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn/logo.svg",
    "tags": [
      "stake-pool-token",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/qR4BA9QXVR",
      "telegram": "https://t.me/jpoolsolana",
      "twitter": "https://twitter.com/JPoolSolana",
      "website": "https://jpool.one/"
    }
  },
  {
    "chainId": 101,
    "address": "5jFnsfx36DyGk8uVGrbXnVUMTsBkPXGpx6e69BiGFzko",
    "symbol": "INU",
    "name": "Solana INU",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5jFnsfx36DyGk8uVGrbXnVUMTsBkPXGpx6e69BiGFzko/logo.png",
    "tags": [
      "Meme-token"
    ],
    "extensions": {
      "coingeckoId": "solana-inu",
      "discord": "https://discord.gg/solanainu",
      "serumV3Usdc": "G3Bss3a2tif6eHNzWCh14g5k2H4rwBAmE42tbckUWG5T",
      "twitter": "https://twitter.com/solanainu",
      "website": "http://solanainu.org"
    }
  },
  {
    "chainId": 101,
    "address": "9ae76zqD3cgzR9gvf5Thc2NN3ACF7rqqnrLqxNzgcre6",
    "symbol": "WIPE",
    "name": "WipeMyAss",
    "decimals": 9,
    "logoURI": "https://cdn.jsdelivr.net/gh/rxrxrxrx/WipeMyAss/wipemyass.jpg",
    "tags": [
      "community-token",
      "meme-token",
      "doge",
      "dogecoin",
      "solcum",
      "monkey",
      "woof",
      "soldoge",
      "samo",
      "smb"
    ],
    "extensions": {
      "coingeckoId": "wipemyass",
      "serumV3Usdc": "3kuUc5eTZyi7qajuFfDMMUUkqreEkUKtxQbVCjdriKVz",
      "twitter": "https://twitter.com/WipeMyAssNFT",
      "website": "https://wipemyass.io/"
    }
  },
  {
    "chainId": 101,
    "address": "FTkj421DxbS1wajE74J34BJ5a1o9ccA97PkK6mYq9hNQ",
    "symbol": "MINECRAFT",
    "name": "Synex Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FTkj421DxbS1wajE74J34BJ5a1o9ccA97PkK6mYq9hNQ/logo.png",
    "tags": [
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/N3BE44234A",
      "telegram": "https://t.me/synexcoin",
      "website": "https://synexcoin.dev"
    }
  },
  {
    "chainId": 101,
    "address": "Hj4sTP4L4rvR9WBR6KyK99sxPptBQQczNWe4y15mxhRD",
    "symbol": "SNJ",
    "name": "Sola Ninja",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/SolaToken/token-list/ninja/assets/mainnet/Hj4sTP4L4rvR9WBR6KyK99sxPptBQQczNWe4y15mxhRD/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "serumV3Usdc": "FyVdsZs15c38b6vBjiYYfq9fPrcrZJjvMgjHtEB2T9Sa",
      "telegram": "https://t.me/solatokennet",
      "twitter": "https://twitter.com/EcoSolana",
      "website": "https://solatoken.net/"
    }
  },
  {
    "chainId": 101,
    "address": "ALKiRVrfLgzeAV2mCT7cJHKg3ZoPvsCRSV7VCRWnE8zQ",
    "symbol": "NEKI",
    "name": "Maneki-neko",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ALKiRVrfLgzeAV2mCT7cJHKg3ZoPvsCRSV7VCRWnE8zQ/logo.png",
    "tags": [
      "utility-token",
      "meme-token",
      "neki"
    ],
    "extensions": {
      "coingeckoId": "maneki-neko",
      "twitter": "https://twitter.com/ManekiNekoLabs"
    }
  },
  {
    "chainId": 101,
    "address": "4BzxVoBQzwKoqm1dQc78r42Yby3EzAeZmMiYFdCjeu5Z",
    "symbol": "SWOLE",
    "name": "Swole Doge",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4BzxVoBQzwKoqm1dQc78r42Yby3EzAeZmMiYFdCjeu5Z/logo.png",
    "extensions": {
      "coingeckoId": "swole-doge",
      "discord": "https://discord.gg/HfdHnhQkpB",
      "serumV3Usdc": "3SGeuz8EXsyFo4HHWXQsoo8r4r5RdZkt7TuuTZiVbKc8",
      "twitter": "https://twitter.com/swoledoge",
      "website": "https://swoledogecoin.org"
    }
  },
  {
    "chainId": 101,
    "address": "CN7qFa5iYkHz99PTctvT4xXUHnxwjQ5MHxCuTJtPN5uS",
    "symbol": "BOKU",
    "name": "Boryoku Dragonz",
    "decimals": 9,
    "logoURI": "https://boryoku-dragonz-public.s3.us-east-2.amazonaws.com/BokuBrew.png",
    "extensions": {
      "coingeckoId": "boryoku-dragonz",
      "coinmarketcap": "https://coinmarketcap.com/currencies/boku/",
      "serumV3Usdc": "Dvm8jjdAy8uyXn9WXjS2p1mcPeFTuYS6yW2eUL9SJE8p",
      "twitter": "https://twitter.com/BoryokuDragonz",
      "website": "https://boryokudragonz.io"
    }
  },
  {
    "chainId": 101,
    "address": "H7Qc9APCWWGDVxGD5fJHmLTmdEgT9GFatAKFNg6sHh8A",
    "symbol": "OOGI",
    "name": "OOGI",
    "decimals": 9,
    "logoURI": "https://oogi.com/icon.png",
    "extensions": {
      "coingeckoId": "oogi",
      "discord": "https://discord.gg/oogi",
      "serumV3Usdc": "ANUCohkG9gamUn6ofZEbnzGkjtyMexDhnjCwbLDmQ8Ub",
      "telegram": "https://t.me/oogicoin",
      "twitter": "https://twitter.com/oogicoin",
      "website": "https://oogi.com/"
    }
  },
  {
    "chainId": 101,
    "address": "q4bpaRKw3fJB1AJBeeBaKv3TjYzWsmntLgnSB275YUb",
    "symbol": "TRTLS",
    "name": "Turtles Token",
    "decimals": 9,
    "logoURI": "https://www.arweave.net/hMuF_E20rYQZYL566XC3T3ZgKmAcg5sPzHREOErjtgE?ext=png",
    "extensions": {
      "coingeckoId": "turtles-token",
      "serumV3Usdc": "2dKHkfJGKNxmtwdLcsqXFGcb8Xppw5RP6YVWEWjSfAHm",
      "website": "https://www.turtles.com/"
    }
  },
  {
    "chainId": 101,
    "address": "EFqYVEitSUpUTj2d9LSqun4eZ4BzouFuTPqQzU4hNtsS",
    "symbol": "MMaps",
    "name": "MapMetrics",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EFqYVEitSUpUTj2d9LSqun4eZ4BzouFuTPqQzU4hNtsS/logo.png",
    "tags": [
      "utility-token",
      "Community",
      "NFT"
    ],
    "extensions": {
      "website": "https://mapmetrics.org/"
    }
  },
  {
    "chainId": 101,
    "address": "3CaBxqxWsP5oqS84Pkja4wLxyZYsHzMivQbnfwFJQeL1",
    "symbol": "SOLFI",
    "name": "SOLFI",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3CaBxqxWsP5oqS84Pkja4wLxyZYsHzMivQbnfwFJQeL1/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/solfina_io",
      "website": "https://solfina.io/"
    }
  },
  {
    "chainId": 101,
    "address": "AASdD9rAefJ4PP7iM89MYUsQEyCQwvBofhceZUGDh5HZ",
    "symbol": "SLX",
    "name": "Solex Finance",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solexfin/token-list/main/assets/mainnet/AASdD9rAefJ4PP7iM89MYUsQEyCQwvBofhceZUGDh5HZ/logo.png",
    "tags": [
      "Exchange",
      "DApp"
    ],
    "extensions": {
      "coingeckoId": "solex-finance",
      "serumV3Usdc": "7xy4r55rLu2QYeSGwTGDCBKEYERDX98f6kQLn9Zre6S3",
      "twitter": "https://twitter.com/SolexFinance",
      "website": "https://solex.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "5sM9xxcBTM9rWza6nEgq2cShA87JjTBx1Cu82LjgmaEg",
    "symbol": "BMBO",
    "name": "Bamboo",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/rishkumaria/bamboo/main/bamboo.png",
    "extensions": {
      "coingeckoId": "bamboo-coin"
    }
  },
  {
    "chainId": 101,
    "address": "EZF2sPJRe26e8iyXaCrmEefrGVBkqqNGv9UPGG9EnTQz",
    "symbol": "FUM",
    "name": "FUMoney",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/FUMoney801/token-list/main/assets/mainnet/EZF2sPJRe26e8iyXaCrmEefrGVBkqqNGv9UPGG9EnTQz/logo.png",
    "tags": [
      "social-token",
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/FUMindset",
      "website": "https://FUMoney.io/"
    }
  },
  {
    "chainId": 101,
    "address": "2uRFEWRBQLEKpLmF8mohFZGDcFQmrkQEEZmHQvMUBvY7",
    "symbol": "SLB",
    "name": "Solberg",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2uRFEWRBQLEKpLmF8mohFZGDcFQmrkQEEZmHQvMUBvY7/logo.svg",
    "extensions": {
      "coingeckoId": "solberg",
      "discord": "https://discord.gg/2w7J25Xgce",
      "instagram": "https://www.instagram.com/solbergtoken/",
      "serumV3Usdc": "4MUhHF5K9simSLXuaUKMaU8nMHSCRPzPMe7UtJRXi4HZ",
      "serumV3Usdt": "46jD4hpmvUAbhKaoAjdzFkY82VW1j9SMTEYFGcTor8Ww",
      "telegram": "https://t.me/solbergofficial",
      "twitter": "https://twitter.com/SolbergToken",
      "website": "https://www.solbergtoken.com/"
    }
  },
  {
    "chainId": 101,
    "address": "FYfQ9uaRaYvRiaEGUmct45F9WKam3BYXArTrotnTNFXF",
    "symbol": "SOLA",
    "name": "Sola Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYfQ9uaRaYvRiaEGUmct45F9WKam3BYXArTrotnTNFXF/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "sola-token",
      "serumV3Usdc": "4RZ27tjRnSwrtRqsJxDEgsERnDKFs7yx6Ra3HsJvkboy",
      "telegram": "https://t.me/solatokennet",
      "twitter": "https://twitter.com/EcoSolana",
      "website": "https://solatoken.net/"
    }
  },
  {
    "chainId": 101,
    "address": "So11111111111111111111111111111111111111112",
    "symbol": "SOL",
    "name": "Wrapped SOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    "extensions": {
      "coingeckoId": "solana",
      "serumV3Usdc": "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT",
      "serumV3Usdt": "HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1",
      "website": "https://solana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "symbol": "USDC",
    "name": "USD Coin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin",
      "serumV3Usdt": "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
      "website": "https://www.centre.io/"
    }
  },
  {
    "chainId": 101,
    "address": "GkDg1ZfoFkroLAwLqtJNXhxCDg8gmKxHAGxSUZagYFfE",
    "symbol": "SOL100",
    "name": "SOL100",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GkDg1ZfoFkroLAwLqtJNXhxCDg8gmKxHAGxSUZagYFfE/logo.png",
    "extensions": {
      "website": "https://github.com/teampurity"
    }
  },
  {
    "chainId": 101,
    "address": "iVNcrNE9BRZBC9Aqf753iZiZfbszeAVUoikgT9yvr2a",
    "symbol": "IVN",
    "name": "Investin Protocol",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/iVNcrNE9BRZBC9Aqf753iZiZfbszeAVUoikgT9yvr2a/logo.png",
    "tags": [
      "defi",
      "fund-management"
    ],
    "extensions": {
      "coingeckoId": "investin",
      "discord": "https://discord.com/invite/Yf54h9B",
      "medium": "https://medium.com/investin-pro",
      "serumV3Usdc": "AdmfUBJ64BTsjaZdtu1iQHAtxJ4Ge7Zw5bNMsrLGdZu7",
      "telegram": "https://t.me/Investin_pro1",
      "twitter": "https://twitter.com/Investin_pro",
      "website": "https://www.investin.pro/"
    }
  },
  {
    "chainId": 101,
    "address": "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    "symbol": "BTC",
    "name": "Wrapped Bitcoin (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "bitcoin",
      "serumV3Usdc": "A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw",
      "serumV3Usdt": "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4"
    }
  },
  {
    "chainId": 101,
    "address": "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    "symbol": "soETH",
    "name": "Wrapped Ethereum (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "ethereum",
      "serumV3Usdc": "4tSvZvnbyzHXLMTiFonMyxZoHmFqau1XArcRCVHLZ5gX",
      "serumV3Usdt": "7dLVkUfBVfCGkFhSXDCq1ukM9usathSgS716t643iFGF"
    }
  },
  {
    "chainId": 101,
    "address": "3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB",
    "symbol": "soYFI",
    "name": "Wrapped YFI (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "yearn-finance",
      "serumV3Usdc": "7qcCo8jqepnjjvB5swP4Afsr3keVBs6gNpBTNubd1Kr2",
      "serumV3Usdt": "3Xg9Q4VtZhD4bVYJbTfgGWFV5zjE3U7ztSHa938zizte"
    }
  },
  {
    "chainId": 101,
    "address": "CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG",
    "symbol": "soLINK",
    "name": "Wrapped Chainlink (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "chainlink",
      "serumV3Usdc": "3hwH1txjJVS8qv588tWrjHfRxdqNjBykM1kMcit484up",
      "serumV3Usdt": "3yEZ9ZpXSQapmKjLAGKZEzUNA1rcupJtsDp5mPBWmGZR"
    }
  },
  {
    "chainId": 101,
    "address": "BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4",
    "symbol": "soUSDT",
    "name": "Wrapped USDT (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4/logo.png",
    "tags": [
      "stablecoin",
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy",
    "symbol": "soSUSHI",
    "name": "Wrapped SUSHI (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "sushi",
      "serumV3Usdc": "A1Q9iJDVVS8Wsswr9ajeZugmj64bQVCYLZQLra2TMBMo",
      "serumV3Usdt": "6DgQRTpJTnAYBSShngAVZZDq7j9ogRN1GfSQ3cq9tubW",
      "waterfallbot": "https://bit.ly/SUSHIwaterfall",
      "website": "https://www.sushi.com"
    }
  },
  {
    "chainId": 101,
    "address": "CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K",
    "symbol": "soALEPH",
    "name": "Wrapped ALEPH (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "aleph",
      "serumV3Usdc": "GcoKtAmTy5QyuijXSmJKBtFdt99e6Buza18Js7j9AJ6e",
      "serumV3Usdt": "Gyp1UGRgbrb6z8t7fpssxEKQgEmcJ4pVnWW3ds2p6ZPY"
    }
  },
  {
    "chainId": 101,
    "address": "SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX",
    "symbol": "soSXP",
    "name": "Wrapped SXP (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "swipe",
      "serumV3Usdc": "4LUro5jaPaTurXK737QAxgJywdhABnFAMQkXX4ZyqqaZ",
      "serumV3Usdt": "8afKwzHR3wJE7W7Y5hvQkngXh6iTepSZuutRMMy96MjR"
    }
  },
  {
    "chainId": 101,
    "address": "BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN",
    "symbol": "soHGET",
    "name": "Wrapped Hedget (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN/logo.svg",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "hedget",
      "serumV3Usdc": "88vztw7RTN6yJQchVvxrs6oXUDryvpv9iJaFa1EEmg87",
      "serumV3Usdt": "ErQXxiNfJgd4fqQ58PuEw5xY35TZG84tHT6FXf5s4UxY",
      "website": "https://www.hedget.com/"
    }
  },
  {
    "chainId": 101,
    "address": "5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv",
    "symbol": "soCREAM",
    "name": "Wrapped Cream Finance (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "cream-2",
      "serumV3Usdc": "7nZP6feE94eAz9jmfakNJWPwEKaeezuKKC5D1vrnqyo2",
      "serumV3Usdt": "4ztJEvQyryoYagj2uieep3dyPwG2pyEwb2dKXTwmXe82"
    }
  },
  {
    "chainId": 101,
    "address": "HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e",
    "symbol": "soHNT",
    "name": "Wrapped Helium (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "helium",
      "serumV3Usdc": "CnUV42ZykoKUnMDdyefv5kP6nDSJf7jFd7WXAecC6LYr",
      "serumV3Usdt": "8FpuMGLtMZ7Wt9ZvyTGuTVwTwwzLYfS5NZWcHxbP1Wuh"
    }
  },
  {
    "chainId": 101,
    "address": "6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF",
    "symbol": "soAKRO",
    "name": "Wrapped AKRO (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "akropolis",
      "serumV3Usdc": "5CZXTTgVZKSzgSA3AFMN5a2f3hmwmmJ6hU8BHTEJ3PX8",
      "serumV3Usdt": "HLvRdctRB48F9yLnu9E24LUTRt89D48Z35yi1HcxayDf"
    }
  },
  {
    "chainId": 101,
    "address": "DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc",
    "symbol": "soHXRO",
    "name": "Wrapped HXRO (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "hxro",
      "serumV3Usdc": "6Pn1cSiRos3qhBf54uBP9ZQg8x3JTardm1dL3n4p29tA",
      "serumV3Usdt": "4absuMsgemvdjfkgdLQq1zKEjw3dHBoCWkzKoctndyqd"
    }
  },
  {
    "chainId": 101,
    "address": "DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw",
    "symbol": "soUNI",
    "name": "Wrapped UNI (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "uniswap",
      "serumV3Usdc": "6JYHjaQBx6AtKSSsizDMwozAEDEZ5KBsSUzH7kRjGJon",
      "serumV3Usdt": "2SSnWNrc83otLpfRo792P6P3PESZpdr8cu2r8zCE6bMD"
    }
  },
  {
    "chainId": 101,
    "address": "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    "symbol": "SRM",
    "name": "Serum",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
    "extensions": {
      "coingeckoId": "serum",
      "serumV3Usdc": "ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA",
      "serumV3Usdt": "AtNnsY1AyRERWJ8xCskfz38YdvruWVJQUVXgScC1iPb",
      "waterfallbot": "https://bit.ly/SRMwaterfall",
      "website": "https://projectserum.com/"
    }
  },
  {
    "chainId": 101,
    "address": "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3",
    "symbol": "soFTT",
    "name": "Wrapped FTT (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "assetContract": "https://etherscan.io/address/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "ftx-token",
      "serumV3Usdc": "2Pbh1CvRVku1TgewMfycemghf6sU9EyuFDcNXqvRmSxc",
      "serumV3Usdt": "Hr3wzG8mZXNHV7TuL6YqtgfVUesCqMxGYCEyP3otywZE",
      "waterfallbot": "https://bit.ly/FTTwaterfall"
    }
  },
  {
    "chainId": 101,
    "address": "GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd",
    "symbol": "soTOMO",
    "name": "Wrapped TOMO (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "tomochain",
      "serumV3Usdc": "8BdpjpSD5n3nk8DQLqPUyTZvVqFu6kcff5bzUX5dqDpy",
      "serumV3Usdt": "GnKPri4thaGipzTbp8hhSGSrHgG4F8MFiZVrbRn16iG2",
      "waterfallbot": "https://t.me/TOMOwaterfall"
    }
  },
  {
    "chainId": 101,
    "address": "EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX",
    "symbol": "soLUA",
    "name": "Wrapped LUA (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "lua-token",
      "serumV3Usdc": "4xyWjQ74Eifq17vbue5Ut9xfFNfuVB116tZLEpiZuAn8",
      "serumV3Usdt": "35tV8UsHH8FnSAi3YFRrgCu4K9tb883wKnAXpnihot5r",
      "waterfallbot": "https://t.me/LUAwaterfall"
    }
  },
  {
    "chainId": 101,
    "address": "DgHK9mfhMtUwwv54GChRrU54T2Em5cuszq2uMuen1ZVE",
    "symbol": "soCEL",
    "name": "Wrapped Celsius (Sollet)",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DgHK9mfhMtUwwv54GChRrU54T2Em5cuszq2uMuen1ZVE/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "celsius-degree-token",
      "serumV3Usdt": "cgani53cMZgYfRMgSrNekJTMaLmccRfspsfTbXWRg7u"
    }
  },
  {
    "chainId": 101,
    "address": "7ncCLJpP3MNww17LW8bRvx8odQQnubNtfNZBL5BgAEHW",
    "symbol": "soRSR",
    "name": "Wrapped Reserve Rights (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7ncCLJpP3MNww17LW8bRvx8odQQnubNtfNZBL5BgAEHW/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "reserve-rights-token",
      "serumV3Usdt": "FcPet5fz9NLdbXwVM6kw2WTHzRAD7mT78UjwTpawd7hJ"
    }
  },
  {
    "chainId": 101,
    "address": "5wihEYGca7X4gSe97C5mVcqNsfxBzhdTwpv72HKs25US",
    "symbol": "so1INCH",
    "name": "Wrapped 1INCH (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5wihEYGca7X4gSe97C5mVcqNsfxBzhdTwpv72HKs25US/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "1inch"
    }
  },
  {
    "chainId": 101,
    "address": "38i2NQxjp5rt5B3KogqrxmBxgrAwaB3W1f1GmiKqh9MS",
    "symbol": "soGRT",
    "name": "Wrapped GRT (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/38i2NQxjp5rt5B3KogqrxmBxgrAwaB3W1f1GmiKqh9MS/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "the-graph"
    }
  },
  {
    "chainId": 101,
    "address": "Avz2fmevhhu87WYtWQCFj9UjKRjF9Z9QWwN2ih9yF95G",
    "symbol": "soCOMP",
    "name": "Wrapped Compound (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Avz2fmevhhu87WYtWQCFj9UjKRjF9Z9QWwN2ih9yF95G/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "compound-coin"
    }
  },
  {
    "chainId": 101,
    "address": "9wRD14AhdZ3qV8et3eBQVsrb3UoBZDUbJGyFckpTg8sj",
    "symbol": "soPAXG",
    "name": "Wrapped Paxos Gold (Sollet)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9wRD14AhdZ3qV8et3eBQVsrb3UoBZDUbJGyFckpTg8sj/logo.png",
    "tags": [
      "wrapped-sollet",
      "ethereum"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "pax-gold"
    }
  },
  {
    "chainId": 101,
    "address": "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp",
    "symbol": "FIDA",
    "name": "Bonfida",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp/logo.svg",
    "extensions": {
      "coingeckoId": "bonfida",
      "serumV3Usdc": "E14BKBhDWD4EuTkWj1ooZezesGxMW8LPCps4W5PuzZJo",
      "serumV3Usdt": "EbV7pPpEvheLizuYX3gUCvWM8iySbSRAhu2mQ5Vz2Mxf",
      "waterfallbot": "https://bit.ly/FIDAwaterfall",
      "website": "https://bonfida.com/"
    }
  },
  {
    "chainId": 101,
    "address": "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6",
    "symbol": "KIN",
    "name": "KIN",
    "decimals": 5,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6/logo.png",
    "extensions": {
      "coingeckoId": "kin",
      "serumV3Usdc": "Bn6NPyr6UzrFAwC4WmvPvDr2Vm8XSUnFykM2aQroedgn",
      "serumV3Usdt": "4nCFQr8sahhhL4XJ7kngGFBmpkmyf3xLzemuMhn6mWTm",
      "waterfallbot": "https://bit.ly/KINwaterfall"
    }
  },
  {
    "chainId": 101,
    "address": "MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb",
    "symbol": "MAPS",
    "name": "MAPS",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb/logo.svg",
    "extensions": {
      "coingeckoId": "maps",
      "serumV3Usdc": "3A8XQRWXC7BjLpgLDDBhQJLT5yPCzS16cGYRKHkKxvYo",
      "serumV3Usdt": "7cknqHAuGpfVXPtFoJpFvUjJ8wkmyEfbFusmwMfNy3FE",
      "website": "https://maps.me/"
    }
  },
  {
    "chainId": 101,
    "address": "z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M",
    "symbol": "OXY",
    "name": "Oxygen Protocol",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M/logo.svg",
    "extensions": {
      "coingeckoId": "oxygen",
      "serumV3Usdc": "GZ3WBFsqntmERPwumFEYgrX2B7J7G11MzNZAy7Hje27X",
      "serumV3Usdt": "GKLev6UHeX1KSDCyo2bzyG6wqhByEzDBkmYTxEdmYJgB",
      "waterfallbot": "https://bit.ly/OXYwaterfall",
      "website": "https://www.oxygen.org/"
    }
  },
  {
    "chainId": 101,
    "address": "FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD",
    "symbol": "BRZ",
    "name": "BRZ",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FtgGSFADXBtroxq8VCausXRr2of47QBf5AS1NtZCu4GD/logo.png",
    "extensions": {
      "coingeckoId": "brz",
      "website": "https://brztoken.io/"
    }
  },
  {
    "chainId": 101,
    "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "symbol": "USDT",
    "name": "USDT",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "tether",
      "serumV3Usdc": "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
      "website": "https://tether.to/"
    }
  },
  {
    "chainId": 101,
    "address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    "symbol": "RAY",
    "name": "Raydium",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    "extensions": {
      "coingeckoId": "raydium",
      "serumV3Usdc": "2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep",
      "serumV3Usdt": "teE55QrL4a4QSfydR9dnHF97jgCfptpuigbb53Lo95g",
      "waterfallbot": "https://bit.ly/RAYwaterfall",
      "website": "https://raydium.io/"
    }
  },
  {
    "chainId": 101,
    "address": "A6aY2ceogBz1VaXBxm1j2eJuNZMRqrWUAnKecrMH85zj",
    "symbol": "LQID",
    "name": "LQID",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/A6aY2ceogBz1VaXBxm1j2eJuNZMRqrWUAnKecrMH85zj/logo.svg"
  },
  {
    "chainId": 101,
    "address": "D68NB5JkzvyNCZAvi6EGtEcGvSoRNPanU9heYTAUFFRa",
    "symbol": "PERP",
    "name": "PERP",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D68NB5JkzvyNCZAvi6EGtEcGvSoRNPanU9heYTAUFFRa/logo.png",
    "extensions": {
      "coingeckoId": "perpetual-protocol"
    }
  },
  {
    "chainId": 101,
    "address": "FeLoyXk8ac2AYVmDhAWEKNWWT63Z9TczeidYbpDvxF3T",
    "symbol": "wCAPS_v1",
    "name": "Wrapped Capsule Coin (Wormhole v1)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeLoyXk8ac2AYVmDhAWEKNWWT63Z9TczeidYbpDvxF3T/logo.svg",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2",
      "assetContract": "https://etherscan.io/address/0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "coin-capsule",
      "website": "https://www.ternoa.com/en"
    }
  },
  {
    "chainId": 101,
    "address": "GbBWwtYTMPis4VHb8MrBbdibPhn28TSrLB53KvUmb7Gi",
    "symbol": "wFTT_v1",
    "name": "FTT (Wormhole v1)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GbBWwtYTMPis4VHb8MrBbdibPhn28TSrLB53KvUmb7Gi/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "assetContract": "https://etherscan.io/address/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "ftx-token"
    }
  },
  {
    "chainId": 101,
    "address": "AjkPkq3nsyDe1yKcbyZT7N4aK4Evv9om9tzhQD3wsRC",
    "symbol": "1INCH",
    "name": "1INCH Token (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AjkPkq3nsyDe1yKcbyZT7N4aK4Evv9om9tzhQD3wsRC/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x111111111117dC0aa78b770fA6A738034120C302",
      "assetContract": "https://etherscan.io/address/0x111111111117dC0aa78b770fA6A738034120C302",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "1inch",
      "serumV3Usdc": "EQcNRGwogvYJDizG9Ek1qf6syi5UghkYDcUwgmycawYU",
      "serumV3Usdt": "B3UpqhaGZc9yXhELknAAXuAoKzCk4QAoqaiVUffgMQBH"
    }
  },
  {
    "chainId": 101,
    "address": "9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM",
    "symbol": "AUDIO",
    "name": "Audius (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998",
      "assetContract": "https://etherscan.io/address/0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "audius",
      "serumV3Usdc": "FxquLRmVMPXiS84FFSp8q5fbVExhLkX85yiXucyu7xSC"
    }
  },
  {
    "chainId": 101,
    "address": "ELSnGFd5XnSdYFFSgYQp7n89FEbDqxN4npuRLW4PPPLv",
    "symbol": "wHEX_v1",
    "name": "HEX (Wormhole v1)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ELSnGFd5XnSdYFFSgYQp7n89FEbDqxN4npuRLW4PPPLv/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
      "assetContract": "https://etherscan.io/address/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "hex"
    }
  },
  {
    "chainId": 101,
    "address": "FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1",
    "symbol": "wDAI_v1",
    "name": "Dai Stablecoin (Wormhole v1)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "assetContract": "https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "dai"
    }
  },
  {
    "chainId": 101,
    "address": "yPRTUpLDftNej7p6QofNYgRArRXsm6Mvkzohj4bh4WM",
    "symbol": "yPRT",
    "name": "yPRT (Parrot Yield Token)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/yPRTUpLDftNej7p6QofNYgRArRXsm6Mvkzohj4bh4WM/logo.svg",
    "extensions": {
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "8L8pDf3jutdpdr4m3np68CL9ZroLActrqwxi6s9Ah5xU",
    "symbol": "wFRAX_v1",
    "name": "Frax (Wormhole v1)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8L8pDf3jutdpdr4m3np68CL9ZroLActrqwxi6s9Ah5xU/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x853d955aCEf822Db058eb8505911ED77F175b99e",
      "assetContract": "https://etherscan.io/address/0x853d955aCEf822Db058eb8505911ED77F175b99e",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "frax"
    }
  },
  {
    "chainId": 101,
    "address": "9w97GdWUYYaamGwdKMKZgGzPduZJkiFizq4rz5CPXRv2",
    "symbol": "wUSDT_v1",
    "name": "Tether USD (Wormhole v1)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9w97GdWUYYaamGwdKMKZgGzPduZJkiFizq4rz5CPXRv2/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "assetContract": "https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "AJ1W9A9N9dEMdVyoDiam2rV44gnBm2csrPDP7xqcapgX",
    "symbol": "wBUSD_v1",
    "name": "Binance USD (Wormhole v1)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AJ1W9A9N9dEMdVyoDiam2rV44gnBm2csrPDP7xqcapgX/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
      "assetContract": "https://etherscan.io/address/0x4Fabb145d64652a948d72533023f6E7A623C7C53",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "binance-usd"
    }
  },
  {
    "chainId": 101,
    "address": "4pk3pf9nJDN1im1kNwWJN1ThjE8pCYCTexXYGyFjqKVf",
    "symbol": "oDOP",
    "name": "Dominican Pesos",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4pk3pf9nJDN1im1kNwWJN1ThjE8pCYCTexXYGyFjqKVf/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "website": "https://Odop.io/"
    }
  },
  {
    "chainId": 101,
    "address": "8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh",
    "symbol": "COPE",
    "name": "COPE",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh/logo.png",
    "tags": [
      "trading",
      "index",
      "Algos"
    ],
    "extensions": {
      "coingeckoId": "cope",
      "serumV3Usdc": "6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk",
      "website": "https://www.unlimitedcope.com/"
    }
  },
  {
    "chainId": 101,
    "address": "8PMHT4swUMtBzgHnh5U564N5sjPSiUz2cjEQzFnnP1Fo",
    "symbol": "ROPE",
    "name": "Rope Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8PMHT4swUMtBzgHnh5U564N5sjPSiUz2cjEQzFnnP1Fo/logo.svg",
    "extensions": {
      "coingeckoId": "rope-token",
      "serumV3Usdc": "4Sg1g8U2ZuGnGYxAhc6MmX9MX7yZbrrraPkCQ9MdCPtF",
      "waterfallbot": "https://bit.ly/ROPEwaterfall",
      "website": "https://ropesolana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs",
    "symbol": "MEDIA",
    "name": "Media Network",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "media-network",
      "serumV3Usdc": "FfiqqvJcVL7oCCu8WQUMHLUC2dnHQPAPjTdSzsERFWjb",
      "waterfallbot": "https://bit.ly/MEDIAwaterfall",
      "website": "https://media.network/"
    }
  },
  {
    "chainId": 101,
    "address": "StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT",
    "symbol": "STEP",
    "name": "Step",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "step-finance",
      "serumV3Usdc": "97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S",
      "twitter": "https://twitter.com/StepFinance_",
      "waterfallbot": "https://bit.ly/STEPwaterfall",
      "website": "https://step.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G",
    "symbol": "xSTEP",
    "name": "Staked Step",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xStpgUCss9piqeFUk2iLVcvJEGhAdJxJQuwLkXP555G/logo.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/StepFinance_",
      "waterfallbot": "https://bit.ly/STEPwaterfall",
      "website": "https://step.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "4UuGQgkD3rSeoXatXRWwRfRd21G87d5LiCfkVzNNv1Tt",
    "symbol": "XSB",
    "name": "Solareum",
    "decimals": 9,
    "logoURI": "https://solareum.app/icons/XSB-G.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "telegram": "https://t.me/solareum_wallet",
      "twitter": "https://twitter.com/solareum_wallet",
      "website": "https://solareum.app"
    }
  },
  {
    "chainId": 101,
    "address": "7udMmYXh6cuWVY6qQVCd9b429wDVn2J71r5BdxHkQADY",
    "symbol": "COBAN",
    "name": "COBAN",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7udMmYXh6cuWVY6qQVCd9b429wDVn2J71r5BdxHkQADY/logo.png",
    "extensions": {
      "website": "https://coban.io"
    }
  },
  {
    "chainId": 101,
    "address": "6ybxMQpMgQhtsTLhvHZqk8uqao7kvoexY6e8JmCTqAB1",
    "symbol": "QUEST",
    "name": "QUEST",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6ybxMQpMgQhtsTLhvHZqk8uqao7kvoexY6e8JmCTqAB1/logo.png",
    "tags": [
      "DeFi",
      "GameFi",
      "NFT",
      "Metaverse"
    ],
    "extensions": {
      "description": "Questland metaverse token",
      "website": "https://questland.io"
    }
  },
  {
    "chainId": 101,
    "address": "xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW",
    "symbol": "SLIM",
    "name": "Solanium",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xxxxa1sKNGwFtw2kFn8XauW9xq8hBZ5kVtcSesTT9fW/logo.png",
    "extensions": {
      "coingeckoId": "solanium",
      "telegram": "https://t.me/solanium_io",
      "twitter": "https://twitter.com/solanium_io",
      "website": "https://www.solanium.io/"
    }
  },
  {
    "chainId": 101,
    "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "symbol": "SAMO",
    "name": "Samoyed Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png",
    "extensions": {
      "coingeckoId": "samoyedcoin",
      "serumV3Usdc": "FR3SPJmgfRSKKQ2ysUZBu7vJLpzTixXnjzb84bY3Diif",
      "website": "https://samoyedcoin.com/"
    }
  },
  {
    "chainId": 101,
    "address": "Aw8qLRHGhMcKq7rxs5XBNCd9oe3BvoAhpNMVz7AdGmty",
    "symbol": "PANDA",
    "name": "Panda Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Aw8qLRHGhMcKq7rxs5XBNCd9oe3BvoAhpNMVz7AdGmty/logo.png",
    "tags": [
      "meme-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "panda-coin",
      "discord": "https://discord.gg/nPSXvdJpvz",
      "telegram": "https://t.me/pandacoin_announcements",
      "twitter": "https://twitter.com/pandacoin_fi",
      "website": "https://pandacrypto.org/"
    }
  },
  {
    "chainId": 101,
    "address": "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
    "symbol": "ATLAS",
    "name": "Star Atlas",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "star-atlas",
      "description": "Star Atlas Token",
      "serumV3Usdc": "Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K",
      "waterfallbot": "https://bit.ly/ATLASwaterfall",
      "website": "https://staratlas.com"
    }
  },
  {
    "chainId": 101,
    "address": "poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk",
    "symbol": "POLIS",
    "name": "Star Atlas DAO",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "star-atlas-dao",
      "description": "Star Atlas DAO Token",
      "serumV3Usdc": "HxFLKUAmAMLz1jtT3hbvCMELwH5H9tpM2QugP8sKyfhW",
      "waterfallbot": "https://bit.ly/POLISwaterfall",
      "website": "https://staratlas.com"
    }
  },
  {
    "chainId": 101,
    "address": "36s6AFRXzE9KVdUyoJQ5y6mwxXw21LawYqqwNiQUMD8s",
    "symbol": "TCW",
    "name": "The Convergence War",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/36s6AFRXzE9KVdUyoJQ5y6mwxXw21LawYqqwNiQUMD8s/logo.png",
    "tags": [
      "nft"
    ],
    "extensions": {
      "description": "All three factions, thinking they were the sole owners of the cataclysmic data drop, converge to settle the area. A devastating war breaks out across the galaxy after their inability to settle the disputed territory.",
      "imageUrl": "https://storage.googleapis.com/nft-assets/ReBirth/poster-3/the-convergence-war.jpg",
      "serumV3Usdc": "DXPv2ZyMD6Y2mDenqYkAhkvGSjNahkuMkm4zv6DqB7RF",
      "website": "https://www.staratlas.com"
    }
  },
  {
    "chainId": 101,
    "address": "8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s",
    "symbol": "SDOGE",
    "name": "SolDoge",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s/logo.png",
    "extensions": {
      "coingeckoId": "soldoge",
      "discord": "https://bit.ly/SDOGEDiscord",
      "serumV3Usdc": "9aruV2p8cRWxybx6wMsJwPFqeN7eQVPR74RrxdM3DNdu",
      "twitter": "https://twitter.com/SolanaDoge",
      "website": "https://www.soldoge.io"
    }
  },
  {
    "chainId": 101,
    "address": "8RYSc3rrS4X4bvBCtSJnhcpPpMaAJkXnVKZPzANxQHgz",
    "symbol": "YARD",
    "name": "SolYard Finance",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8RYSc3rrS4X4bvBCtSJnhcpPpMaAJkXnVKZPzANxQHgz/logo.png",
    "extensions": {
      "website": "https://solyard.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y",
    "symbol": "SNY",
    "name": "Synthetify",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png",
    "extensions": {
      "coingeckoId": "synthetify-token",
      "serumV3Usdc": "DPfj2jYwPaezkCmUNm5SSYfkrkz8WFqwGLcxDDUsN3gA",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "AMdnw9H5DFtQwZowVFr4kUgSXJzLokKSinvgGiUoLSps",
    "symbol": "MOLA",
    "name": "MOONLANA",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AMdnw9H5DFtQwZowVFr4kUgSXJzLokKSinvgGiUoLSps/logo.png",
    "extensions": {
      "coingeckoId": "moonlana",
      "medium": "https://moonlana.medium.com/",
      "twitter": "https://twitter.com/xMoonLana",
      "website": "https://moonlana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "GHvFFSZ9BctWsEc5nujR1MTmmJWY7tgQz2AXE6WVFtGN",
    "symbol": "SOLAPE",
    "name": "SolAPE Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GHvFFSZ9BctWsEc5nujR1MTmmJWY7tgQz2AXE6WVFtGN/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "solape-token",
      "serumV3Usdc": "4zffJaPyeXZ2wr4whHgP39QyTfurqZ2BEd4M5W6SEuon",
      "twitter": "https://twitter.com/SolApeFinance",
      "website": "https://solape.io"
    }
  },
  {
    "chainId": 101,
    "address": "9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE",
    "symbol": "WOOF",
    "name": "WOOF",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE/logo.png",
    "tags": [
      "community-token",
      "meme-token"
    ],
    "extensions": {
      "coingeckoId": "woof-token",
      "serumV3Usdc": "CwK9brJ43MR4BJz2dwnDM7EXCNyHhGqCJDrAdsEts8n5",
      "website": "https://woofsolana.com"
    }
  },
  {
    "chainId": 101,
    "address": "MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K",
    "symbol": "MER",
    "name": "Mercurial",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K/logo.png",
    "extensions": {
      "coingeckoId": "mercurial",
      "serumV3Usdc": "G4LcexdCzzJUKZfqyVDQFzpkjhB1JoCNL8Kooxi9nJz5",
      "waterfallbot": "https://bit.ly/MERwaterfall",
      "website": "https://www.mercurial.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "5JnZ667P3VcjDinkJFysWh2K2KtViy63FZ3oL5YghEhW",
    "symbol": "APYS",
    "name": "APYSwap",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5JnZ667P3VcjDinkJFysWh2K2KtViy63FZ3oL5YghEhW/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "coingeckoId": "apyswap",
      "website": "https://apyswap.com"
    }
  },
  {
    "chainId": 101,
    "address": "GfJ3Vq2eSTYf1hJP6kKLE9RT6u7jF9gNszJhZwo5VPZp",
    "symbol": "SOLPAD",
    "name": "Solpad Finance",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GfJ3Vq2eSTYf1hJP6kKLE9RT6u7jF9gNszJhZwo5VPZp/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "github": "https://github.com/solpad-finance",
      "telegram": "https://t.me/solpadfinance_chat",
      "telegramAnnouncements": "https://t.me/solpadfinance",
      "twitter": "https://twitter.com/FinanceSolpad",
      "website": "https://www.solpad.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "7fCzz6ZDHm4UWC9Se1RPLmiyeuQ6kStxpcAP696EuE1E",
    "symbol": "SHBL",
    "name": "Shoebill Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7fCzz6ZDHm4UWC9Se1RPLmiyeuQ6kStxpcAP696EuE1E/logo.png",
    "extensions": {
      "website": "https://shoebillco.in/"
    }
  },
  {
    "chainId": 101,
    "address": "TuLipcqtGVXP9XR62wM8WWCm6a9vhLs7T1uoWBk6FDs",
    "symbol": "TULIP",
    "name": "Tulip",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/sol-farm/token-logos/main/tulip.png",
    "tags": [
      "tulip",
      "tulip-protocol",
      "vaults"
    ],
    "extensions": {
      "coingeckoId": "solfarm",
      "serumV3Usdc": "8GufnKq7YnXKhnB3WNhgy5PzU9uvHbaaRrZWQK6ixPxW",
      "twitter": "https://twitter.com/TulipProtocol",
      "waterfallbot": "https://bit.ly/TULIPwaterfall",
      "website": "https://tulip.garden"
    }
  },
  {
    "chainId": 101,
    "address": "3QuAYThYKFXSmrTcSHsdd7sAxaFBobaCkLy2DBYJLMDs",
    "symbol": "TYNA",
    "name": "wTYNA",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3QuAYThYKFXSmrTcSHsdd7sAxaFBobaCkLy2DBYJLMDs/logo.png",
    "tags": [
      "ERC20",
      "ethereum"
    ],
    "extensions": {
      "address": "0x4ae54790c130B21E8CbaCAB011C6170e079e6eF5",
      "assetContract": "https://etherscan.io/address/0x4ae54790c130B21E8CbaCAB011C6170e079e6eF5",
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "twitter": "https://twitter.com/btc_AP",
      "website": "http://lendingbot.s3-website-us-east-1.amazonaws.com/whitepaper.html"
    }
  },
  {
    "chainId": 101,
    "address": "4MRVPdN41888CwKSpY37K8HtN2FM9Bc3xTnhf9EDdcou",
    "symbol": "MGT",
    "name": "Mofogasy Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4MRVPdN41888CwKSpY37K8HtN2FM9Bc3xTnhf9EDdcou/logo.png",
    "tags": [
      "social-token",
      "MGT"
    ]
  },
  {
    "chainId": 101,
    "address": "3FoUAsGDbvTD6YZ4wVKJgTB76onJUKz7GPEBNiR5b8wc",
    "symbol": "CHEEMS",
    "name": "Cheems",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3FoUAsGDbvTD6YZ4wVKJgTB76onJUKz7GPEBNiR5b8wc/logo.png",
    "extensions": {
      "coingeckoId": "cheems",
      "serumV3Usdc": "5WVBCaUPZF4HP3io9Z56N71cPMJt8qh3c4ZwSjRDeuut",
      "twitter": "https://twitter.com/theCheemsToken",
      "website": "https://cheems.co/"
    }
  },
  {
    "chainId": 101,
    "address": "AWW5UQfMBnPsTaaxCK7cSEmkj1kbX2zUrqvgKXStjBKx",
    "symbol": "SBFC",
    "name": "SBF Coin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AWW5UQfMBnPsTaaxCK7cSEmkj1kbX2zUrqvgKXStjBKx/logo.png",
    "tags": [
      "utility-token",
      "SBF",
      "sbfcoin",
      "SBFC"
    ],
    "extensions": {
      "twitter": "https://twitter.com/sbfcoin",
      "website": "https://www.sbfcoin.org/"
    }
  },
  {
    "chainId": 101,
    "address": "5p2zjqCd1WJzAVgcEnjhb9zWDU7b9XVhFhx4usiyN7jB",
    "symbol": "CATO",
    "name": "CATO",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5p2zjqCd1WJzAVgcEnjhb9zWDU7b9XVhFhx4usiyN7jB/logo.png",
    "tags": [
      "Meme-Token"
    ],
    "extensions": {
      "coingeckoId": "cato",
      "serumV3Usdc": "9fe1MWiKqUdwift3dEpxuRHWftG72rysCRHbxDy6i9xB",
      "telegram": "https://t.me/SolanaCATO",
      "twitter": "https://twitter.com/SolanaCATO",
      "website": "https://official.catodex.com"
    }
  },
  {
    "chainId": 101,
    "address": "FgX1WD9WzMU3yLwXaFSarPfkgzjLb2DZCqmkx9ExpuvJ",
    "symbol": "NINJA",
    "name": "NINJA",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FgX1WD9WzMU3yLwXaFSarPfkgzjLb2DZCqmkx9ExpuvJ/logo.png",
    "extensions": {
      "coingeckoId": "ninja-protocol",
      "serumV3Usdc": "J4oPt5Q3FYxrznkXLkbosAWrJ4rZLqJpGqz7vZUL4eMM",
      "website": "https://www.ninjaprotocol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3",
    "symbol": "BOP",
    "name": "Boring Protocol",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/boringprotocol/brand-assets/main/boplogo.png",
    "tags": [
      "security-token",
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "boring-protocol",
      "serumV3Usdc": "7MmPwD1K56DthW14P1PnWZ4zPCbPWemGs3YggcT1KzsM",
      "twitter": "https://twitter.com/BoringProtocol",
      "website": "https://boringprotocol.io"
    }
  },
  {
    "chainId": 101,
    "address": "GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z",
    "symbol": "DXL",
    "name": "Dexlab",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/dexlab-project/assets/master/dexlab/dexlab_symbol_logo.svg",
    "extensions": {
      "coingeckoId": "dexlab",
      "serumV3Usdc": "DYfigimKWc5VhavR4moPBibx9sMcWYVSjVdWvPztBPTa",
      "twitter": "https://twitter.com/dexlab_official",
      "website": "https://www.dexlab.space/"
    }
  },
  {
    "chainId": 101,
    "address": "8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA",
    "symbol": "GRAPE",
    "name": "Grape",
    "decimals": 6,
    "logoURI": "https://lh3.googleusercontent.com/y7Wsemw9UVBc9dtjtRfVilnS1cgpDt356PPAjne5NvMXIwWz9_x7WKMPH99teyv8vXDmpZinsJdgiFQ16_OAda1dNcsUxlpw9DyMkUk=s0",
    "extensions": {
      "coingeckoId": "grape-2",
      "website": "https://grapes.network"
    }
  },
  {
    "chainId": 101,
    "address": "8s9FCz99Wcr3dHpiauFRi6bLXzshXfcGTfgQE7UEopVx",
    "symbol": "CKC",
    "name": "ChikinCoin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8s9FCz99Wcr3dHpiauFRi6bLXzshXfcGTfgQE7UEopVx/logo.svg",
    "extensions": {
      "discord": "https://discord.gg/rsQQsAcAn7",
      "facebook": "https://www.facebook.com/Chikin-114453524487432",
      "github": "https://github.com/ChikinDeveloper",
      "instagram": "https://www.instagram.com/chikintuttut",
      "telegram": "https://t.me/+BG1HI84WGdwyMmU0",
      "tiktok": "https://www.tiktok.com/@chikintuttut",
      "twitter": "https://twitter.com/ChikinDev",
      "website": "https://chikin.run"
    }
  },
  {
    "chainId": 101,
    "address": "51tMb3zBKDiQhNwGqpgwbavaGH54mk8fXFzxTc1xnasg",
    "symbol": "APEX",
    "name": "APEX",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/51tMb3zBKDiQhNwGqpgwbavaGH54mk8fXFzxTc1xnasg/logo.png",
    "extensions": {
      "coingeckoId": "apexit-finance",
      "discord": "https://discord.gg/aASQy2dWsN",
      "telegram": "https://t.me/apexit_finance",
      "twitter": "https://twitter.com/apeXit_finance",
      "website": "https://apexit.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "5v6tZ1SiAi7G8Qg4rBF1ZdAn4cn6aeQtefewMr1NLy61",
    "symbol": "SOLD",
    "name": "Solanax",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5v6tZ1SiAi7G8Qg4rBF1ZdAn4cn6aeQtefewMr1NLy61/logo.png",
    "extensions": {
      "telegram": "https://t.me/solanaxcommunity",
      "twitter": "https://twitter.com/Solanaxorg",
      "website": "https://solanax.org"
    }
  },
  {
    "chainId": 101,
    "address": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    "symbol": "ORCA",
    "name": "Orca",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png",
    "extensions": {
      "coingeckoId": "orca",
      "discord": "https://discord.com/invite/nSwGWn5KSG",
      "medium": "https://orca-so.medium.com",
      "serumV3Usdc": "8N1KkhaCYDpj3awD58d85n973EwkpeYnRp84y1kdZpMX",
      "telegram": "https://t.me/orca_so",
      "twitter": "https://twitter.com/orca_so",
      "website": "https://orca.so"
    }
  },
  {
    "chainId": 101,
    "address": "METAewgxyPbgwsseH8T16a39CQ5VyVxZi9zXiDPY18m",
    "symbol": "MPLX",
    "name": "Metaplex Token",
    "decimals": 6,
    "logoURI": "https://arweave.net/VRKOcXIvCxqp35RZ9I0-bDGk5qNfT46OTho-2oP9iGc",
    "extensions": {
      "github": "https://github.com/metaplex-foundation/metaplex",
      "twitter": "https://twitter.com/metaplex",
      "website": "https://metaplex.com"
    }
  },
  {
    "chainId": 101,
    "address": "6cVgJUqo4nmvQpbgrDZwyfd6RwWw5bfnCamS3M9N1fd",
    "symbol": "SHILL",
    "name": "Project SEED Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6cVgJUqo4nmvQpbgrDZwyfd6RwWw5bfnCamS3M9N1fd/logo.png",
    "tags": [
      "projectseedtoken"
    ],
    "extensions": {
      "website": "https://projectseed.io"
    }
  },
  {
    "chainId": 101,
    "address": "HEhMLvpSdPviukafKwVN8BnBUTamirptsQ6Wxo5Cyv8s",
    "symbol": "FTR",
    "name": "Future",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HEhMLvpSdPviukafKwVN8BnBUTamirptsQ6Wxo5Cyv8s/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/ftr_finance",
      "website": "https://future-ftr.io"
    }
  },
  {
    "chainId": 101,
    "address": "CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5",
    "symbol": "renBTC",
    "name": "renBTC",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5/logo.png",
    "extensions": {
      "coingeckoId": "renbtc",
      "serumV3Usdc": "74Ciu5yRzhe8TFTHvQuEVbFZJrbnCMRoohBK33NNiPtv",
      "website": "https://renproject.io/"
    }
  },
  {
    "chainId": 101,
    "address": "ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU",
    "symbol": "renDOGE",
    "name": "renDOGE",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png",
    "extensions": {
      "coingeckoId": "rendoge",
      "serumV3Usdc": "5FpKCWYXgHWZ9CdDMHjwxAfqxJLdw2PRXuAmtECkzADk",
      "website": "https://renproject.io/"
    }
  },
  {
    "chainId": 101,
    "address": "8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE",
    "symbol": "renLUNA",
    "name": "renLUNA",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8wv2KAykQstNAj2oW6AHANGBiFKVFhvMiyyzzjhkmGvE/logo.png",
    "extensions": {
      "serumV3Usdc": "CxDhLbbM9uAA2AXfSPar5qmyfmC69NLj3vgJXYAsSVBT",
      "website": "https://renproject.io/"
    }
  },
  {
    "chainId": 101,
    "address": "6kwTqmdQkJd8qRr9RjSnUX9XJ24RmJRSrU1rsragP97Y",
    "symbol": "SAIL",
    "name": "SAIL",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6kwTqmdQkJd8qRr9RjSnUX9XJ24RmJRSrU1rsragP97Y/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "sail",
      "serumV3Usdc": "6hwK66FfUdyhncdQVxWFPRqY8y6usEvzekUaqtpKEKLr",
      "twitter": "https://twitter.com/SolanaSail",
      "website": "https://www.solanasail.com"
    }
  },
  {
    "chainId": 101,
    "address": "E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp",
    "symbol": "RIN",
    "name": "Aldrin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp/logo.png",
    "extensions": {
      "coingeckoId": "aldrin",
      "serumV3Usdc": "7gZNLDbWE73ueAoHuAeFoSu7JqmorwCLpNTBXHtYSFTa",
      "twitter": "https://twitter.com/Aldrin_Exchange",
      "website": "https://rin.aldrin.com/"
    }
  },
  {
    "chainId": 101,
    "address": "SCYfrGCw8aDiqdgcpdGjV6jp4UVVQLuphxTDLNWu36f",
    "symbol": "SCY",
    "name": "Synchrony",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SCYfrGCw8aDiqdgcpdGjV6jp4UVVQLuphxTDLNWu36f/logo.png",
    "extensions": {
      "serumV3Usdc": "DR8V2wUCSFKCGjML6AZvUB2eYWDPVQ5xju3DeXGgpSaB",
      "twitter": "https://twitter.com/SynchronyFi",
      "website": "https://synchrony.fi"
    }
  },
  {
    "chainId": 101,
    "address": "FZgL5motNWEDEa24xgfSdBDfXkB9Ru9KxfEsey9S58bb",
    "symbol": "VCC",
    "name": "VentureCapital",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FZgL5motNWEDEa24xgfSdBDfXkB9Ru9KxfEsey9S58bb/logo.svg",
    "tags": [
      "liquidator",
      "IDO",
      "incubator"
    ],
    "extensions": {
      "twitter": "https://twitter.com/vcc_finance",
      "website": "https://www.vcc.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "4TGxgCSJQx2GQk9oHZ8dC5m3JNXTYZHjXumKAW3vLnNx",
    "symbol": "OXS",
    "name": "Oxbull Sol",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4TGxgCSJQx2GQk9oHZ8dC5m3JNXTYZHjXumKAW3vLnNx/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "oxbull-solana",
      "github": "https://github.com/OxBull",
      "medium": "https://medium.com/@oxbull",
      "telegramAnnouncements": "https://t.me/Oxbull_tech",
      "twitter": "https://twitter.com/OxBull5",
      "website": "https://www.oxbull.tech"
    }
  },
  {
    "chainId": 101,
    "address": "EdAhkbj5nF9sRM7XN7ewuW8C9XEUMs8P7cnoQ57SYE96",
    "symbol": "FAB",
    "name": "FABRIC",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EdAhkbj5nF9sRM7XN7ewuW8C9XEUMs8P7cnoQ57SYE96/logo.png",
    "extensions": {
      "coingeckoId": "fabric",
      "serumV3Usdc": "Cud48DK2qoxsWNzQeTL5D8sAiHsGwG8Ev1VMNcYLayxt",
      "twitter": "https://twitter.com/official_fabric",
      "website": "https://fsynth.io/"
    }
  },
  {
    "chainId": 101,
    "address": "GEYrotdkRitGUK5UMv3aMttEhVAZLhRJMcG82zKYsaWB",
    "symbol": "POTATO",
    "name": "POTATO",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GEYrotdkRitGUK5UMv3aMttEhVAZLhRJMcG82zKYsaWB/logo.png",
    "extensions": {
      "serumV3Usdc": "6dn7tgTHe5rZEAscMWWY3xmPGVEKVkM9s7YRV11z399z",
      "website": "https://potatocoinspl.com/"
    }
  },
  {
    "chainId": 101,
    "address": "9zoqdwEBKWEi9G5Ze8BSkdmppxGgVv1Kw4LuigDiNr9m",
    "symbol": "STR",
    "name": "Solster",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9zoqdwEBKWEi9G5Ze8BSkdmppxGgVv1Kw4LuigDiNr9m/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/solster_finance",
      "website": "https://solster.finance"
    }
  },
  {
    "chainId": 101,
    "address": "qXu8Tj65H5XR8KHuaKKoyLCWj592KbTG3YWJwsuFrPS",
    "symbol": "STVA",
    "name": "SOLtiva",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qXu8Tj65H5XR8KHuaKKoyLCWj592KbTG3YWJwsuFrPS/logo.svg",
    "extensions": {
      "serumV3Usdc": "8srnqriKDYXQNSiNh3F5qhkEt8USwWcJyeR65TxavoAf",
      "website": "https://soltiva.co"
    }
  },
  {
    "chainId": 101,
    "address": "5KV2W2XPdSo97wQWcuAVi6G4PaCoieg4Lhhi61PAMaMJ",
    "symbol": "GU",
    "name": "Kugle GU",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5KV2W2XPdSo97wQWcuAVi6G4PaCoieg4Lhhi61PAMaMJ/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "gu",
      "description": "GU token for the Kugle play to earn game.",
      "twitter": "https://twitter.com/Kuglesworld",
      "website": "https://kugle.org"
    }
  },
  {
    "chainId": 101,
    "address": "Bx1fDtvTN6NvE4kjdPHQXtmGSg582bZx9fGy4DQNMmAT",
    "symbol": "SOLC",
    "name": "Solcubator",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Bx1fDtvTN6NvE4kjdPHQXtmGSg582bZx9fGy4DQNMmAT/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/Solcubator",
      "website": "http://solcubator.io"
    }
  },
  {
    "chainId": 101,
    "address": "7a4cXVvVT7kF6hS5q5LDqtzWfHfys4a9PoK6pf87RKwf",
    "symbol": "LUNY",
    "name": "Luna Yield",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7a4cXVvVT7kF6hS5q5LDqtzWfHfys4a9PoK6pf87RKwf/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/Luna_Yield",
      "website": "https://www.lunayield.com"
    }
  },
  {
    "chainId": 101,
    "address": "6Y7LbYB3tfGBG6CSkyssoxdtHb77AEMTRVXe8JUJRwZ7",
    "symbol": "DINO",
    "name": "DINO",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6Y7LbYB3tfGBG6CSkyssoxdtHb77AEMTRVXe8JUJRwZ7/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/solanadino",
      "website": "https://www.solanadino.com"
    }
  },
  {
    "chainId": 101,
    "address": "4wjPQJ6PrkC4dHhYghwJzGBVP78DkBzA2U3kHoFNBuhj",
    "symbol": "LIQ",
    "name": "LIQ Protocol",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4wjPQJ6PrkC4dHhYghwJzGBVP78DkBzA2U3kHoFNBuhj/logo.png",
    "extensions": {
      "coingeckoId": "liq-protocol",
      "discord": "https://discord.gg/MkfjambeU7",
      "serumV3Usdc": "D7p7PebNjpkH6VNHJhmiDFNmpz9XE7UaTv9RouxJMrwb",
      "twitter": "https://twitter.com/liqsolana",
      "website": "https://liqsolana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz",
    "symbol": "CRP",
    "name": "CropperFinance",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz/logo.png",
    "extensions": {
      "coingeckoId": "cropperfinance",
      "serumV3Usdc": "93mtNf4qzvytwp5sWrSC7JNUccPAomEE39ztErUq5V3F",
      "twitter": "https://twitter.com/cropperfinance",
      "website": "https://cropper.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr",
    "symbol": "SLRS",
    "name": "Solrise Finance",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr/logo.png",
    "extensions": {
      "coingeckoId": "solrise-finance",
      "discord": "https://discord.gg/xNbGgMUJfU",
      "medium": "https://blog.solrise.finance",
      "serumV3Usdc": "2Gx3UfV831BAh8uQv1FKSPKS9yajfeeD8GJ4ZNb2o2YP",
      "telegram": "https://t.me/solrisefinance",
      "twitter": "https://twitter.com/SolriseFinance",
      "website": "https://solrise.finance"
    }
  },
  {
    "chainId": 101,
    "address": "JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz",
    "symbol": "JET",
    "name": "Jet Protocol",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz/logo.png",
    "extensions": {
      "coingeckoId": "jet",
      "serumV3Usdc": "6pQMoHDC2o8eeFxyTKtfnsr8d48hKFWsRpLHAqVHH2ZP",
      "website": "https://jetprotocol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy",
    "symbol": "WOO",
    "name": "Wootrade Network",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/wootraderS",
      "website": "https://woo.network"
    }
  },
  {
    "chainId": 101,
    "address": "3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR",
    "symbol": "LIKE",
    "name": "Only1 (LIKE)",
    "decimals": 9,
    "logoURI": "https://only1.io/like-token.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "only1",
      "discord": "https://discord.gg/SrsKwTFA",
      "medium": "https://only1nft.medium.com/",
      "telegram": "https://t.me/only1nft",
      "twitter": "https://twitter.com/only1nft",
      "website": "https://only1.io/"
    }
  },
  {
    "chainId": 101,
    "address": "CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm",
    "symbol": "wUST_v1",
    "name": "Wrapped UST (Wormhole v1)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
      "assetContract": "https://etherscan.io/address/0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "terrausd",
      "website": "https://terra.money"
    }
  },
  {
    "chainId": 101,
    "address": "3Ztt53vwGhQGoEp3n1RjSu4CFnGRfqzwo6L8KN8gmXfd",
    "symbol": "METAS",
    "name": "METASEER",
    "decimals": 9,
    "logoURI": "https://metaseer.io/img/home-one/logo256.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/MSEERofficial",
      "website": "https://metaseer.io/"
    }
  },
  {
    "chainId": 101,
    "address": "7JnHPPJBBKSTJ7iEmsiGSBcPJgbcKw28uCRXtQgimncp",
    "symbol": "Orbs",
    "name": "Orbs",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7JnHPPJBBKSTJ7iEmsiGSBcPJgbcKw28uCRXtQgimncp/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "orbs",
      "twitter": "https://twitter.com/orbs_network",
      "website": "https://www.orbs.com"
    }
  },
  {
    "chainId": 101,
    "address": "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
    "symbol": "C98",
    "name": "Coin98",
    "decimals": 6,
    "logoURI": "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/c98-512.svg",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "coingeckoId": "coin98",
      "github": "https://github.com/coin98",
      "telegram": "https://t.me/coin98_finance",
      "twitter": "https://twitter.com/coin98_finance",
      "waterfallbot": "https://bit.ly/C98waterfall",
      "website": "https://coin98.com"
    }
  },
  {
    "chainId": 101,
    "address": "Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1",
    "symbol": "SBR",
    "name": "Saber Protocol Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1/logo.svg",
    "extensions": {
      "coingeckoId": "saber",
      "discord": "https://chat.saber.so",
      "github": "https://github.com/saber-hq",
      "medium": "https://blog.saber.so",
      "serumV3Usdc": "HXBi8YBwbh4TXF6PjVw81m8Z3Cc4WBofvauj5SBFdgUs",
      "twitter": "https://twitter.com/saber_hq",
      "waterfallbot": "https://bit.ly/SBRwaterfall",
      "website": "https://saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "FMJotGUW16AzexRD3vXJQ94AL71cwrhtFaCTGtK1QHXm",
    "symbol": "LRA",
    "name": "Lumos Rewards",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FMJotGUW16AzexRD3vXJQ94AL71cwrhtFaCTGtK1QHXm/logo.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "website": "https://lumos.exchange"
    }
  },
  {
    "chainId": 101,
    "address": "BybpSTBoZHsmKnfxYG47GDhVPKrnEKX31CScShbrzUhX",
    "symbol": "wHUSD_v1",
    "name": "HUSD Stablecoin (Wormhole v1)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BybpSTBoZHsmKnfxYG47GDhVPKrnEKX31CScShbrzUhX/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "assetContract": "https://etherscan.io/address/0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "bridgeContract": "https://etherscan.io/address/0xf92cD566Ea4864356C5491c177A430C222d7e678",
      "coingeckoId": "husd",
      "website": "https://www.stcoins.com/"
    }
  },
  {
    "chainId": 101,
    "address": "6VNKqgz9hk7zRShTFdg5AnkfKwZUcojzwAkzxSH3bnUm",
    "symbol": "wHAPI",
    "name": "Wrapped HAPI",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6VNKqgz9hk7zRShTFdg5AnkfKwZUcojzwAkzxSH3bnUm/logo.png",
    "tags": [
      "wrapped",
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "hapi",
      "github": "https://github.com/HAPIprotocol/HAPI/",
      "medium": "https://medium.com/i-am-hapi",
      "telegram": "https://t.me/hapiHF",
      "twitter": "https://twitter.com/i_am_hapi_one",
      "website": "https://hapi.one"
    }
  },
  {
    "chainId": 101,
    "address": "Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC",
    "symbol": "LARIX",
    "name": "Larix",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC/logo.jpg",
    "extensions": {
      "coingeckoId": "larix",
      "discord": "https://discord.gg/hfnRFV9Ngt",
      "github": "https://github.com/ProjectLarix/Larix-Lending-Project-Rep",
      "medium": "http://projectlarix.medium.com",
      "telegram": "https://t.me/projectlarix",
      "twitter": "https://twitter.com/ProjectLarix",
      "website": "https://projectlarix.com"
    }
  },
  {
    "chainId": 101,
    "address": "AGkFkKgXUEP7ZXazza5a25bSKbz5dDpgafPhqywuQnpf",
    "symbol": "SSU",
    "name": "SunnySideUp Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGkFkKgXUEP7ZXazza5a25bSKbz5dDpgafPhqywuQnpf/logo.png",
    "extensions": {
      "github": "https://github.com/sunnysideup72",
      "medium": "https://medium.com/official-sunnysideup",
      "twitter": "https://twitter.com/SSU_SunnySideUp",
      "website": "https://www.sunnysideup.finance"
    }
  },
  {
    "chainId": 101,
    "address": "8EDaoeBqpcVACwvkYXh1vAcU29HiBiNhqoF4pRsuUsZS",
    "symbol": "sSOL",
    "name": "SunnySideUp staked SOL (sSOL)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8EDaoeBqpcVACwvkYXh1vAcU29HiBiNhqoF4pRsuUsZS/logo.png",
    "extensions": {
      "github": "https://github.com/sunnysideup72",
      "medium": "https://medium.com/official-sunnysideup",
      "twitter": "https://twitter.com/SSU_SunnySideUp",
      "website": "https://www.sunnysideup.finance"
    }
  },
  {
    "chainId": 101,
    "address": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    "symbol": "mSOL",
    "name": "Marinade staked SOL (mSOL)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
    "extensions": {
      "coingeckoId": "msol",
      "discord": "https://discord.gg/mGqZA5pjRN",
      "github": "https://github.com/marinade-finance",
      "medium": "https://medium.com/marinade-finance",
      "serumV3Usdc": "6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy",
      "serumV3Usdt": "HxkQdUnrPdHwXP5T9kewEXs3ApgvbufuTfdw9v1nApFd",
      "twitter": "https://twitter.com/MarinadeFinance",
      "website": "https://marinade.finance"
    }
  },
  {
    "chainId": 101,
    "address": "Hmatmu1ktLbobSvim94mfpZmjL5iiyoM1zidtXJRAdLZ",
    "symbol": "PSOL",
    "name": "Parasol",
    "decimals": 7,
    "logoURI": "https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "parasol-finance",
      "discord": "https://discord.gg/WTwm2V45UZ",
      "github": "https://github.com/parasol-finance",
      "medium": "https://medium.com/@parasol.finance",
      "serumV3Usdc": "DukWnNjNS1qQYUNGYj5NJViEfQW793mHwxij3wi9dazM",
      "telegram": "https://t.me/parasolfinance",
      "twitter": "https://twitter.com/parasol_finance",
      "website": "https://parasol.finance"
    }
  },
  {
    "chainId": 101,
    "address": "PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y",
    "symbol": "PORT",
    "name": "Port Finance Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y/PORT.png",
    "extensions": {
      "coingeckoId": "port-finance",
      "discord": "https://discord.gg/nAMXAYhTb2",
      "github": "https://github.com/port-finance/",
      "medium": "https://medium.com/port-finance",
      "serumV3Usdc": "8x8jf7ikJwgP9UthadtiGFgfFuyyyYPHL3obJAuxFWko",
      "telegram": "https://t.me/port_finance",
      "twitter": "https://twitter.com/port_finance",
      "waterfallbot": "https://bit.ly/PORTwaterfall",
      "website": "https://port.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
    "symbol": "MNGO",
    "name": "Mango",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png",
    "extensions": {
      "coingeckoId": "mango-markets",
      "discord": "https://discord.gg/67jySBhxrg",
      "serumV3Usdc": "3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc",
      "twitter": "https://twitter.com/mangomarkets",
      "website": "https://mango.markets/"
    }
  },
  {
    "chainId": 101,
    "address": "EwJN2GqUGXXzYmoAciwuABtorHczTA5LqbukKXV1viH7",
    "symbol": "UPS",
    "name": "UPS token (UPFI Network)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EwJN2GqUGXXzYmoAciwuABtorHczTA5LqbukKXV1viH7/logo.png",
    "extensions": {
      "discord": "https://discord.gg/nHMDdyAggx",
      "facebook": "https://www.facebook.com/UPFInetwork",
      "medium": "https://upfinetwork.medium.com",
      "serumV3Usdc": "DByPstQRx18RU2A8DH6S9mT7bpT6xuLgD2TTFiZJTKZP",
      "telegram": "https://t.me/upfinetworkchannel",
      "twitter": "https://twitter.com/upfi_network",
      "website": "https://upfi.network/"
    }
  },
  {
    "chainId": 101,
    "address": "Gsai2KN28MTGcSZ1gKYFswUpFpS7EM9mvdR9c8f6iVXJ",
    "symbol": "gSAIL",
    "name": "SolanaSail Governance Token V2",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solanasail/token-list/main/assets/mainnet/Gsai2KN28MTGcSZ1gKYFswUpFpS7EM9mvdR9c8f6iVXJ/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "solanasail-governance-token",
      "serumV3Usdc": "2zkPyHgQkKG6qJED6MTbjfCfUbZeT9VFwLm1Ld9nKxRp",
      "twitter": "https://twitter.com/SolanaSail",
      "website": "https://www.solanasail.com"
    }
  },
  {
    "chainId": 101,
    "address": "Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS",
    "symbol": "PAI",
    "name": "PAI (Parrot USD)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS/logo.svg",
    "tags": [
      "utility-token",
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "parrot-usd",
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "PRT88RkA4Kg5z7pKnezeNH4mafTvtQdfFgpQTGRjz44",
    "symbol": "PRT",
    "name": "PRT (Parrot Protocol)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PRT88RkA4Kg5z7pKnezeNH4mafTvtQdfFgpQTGRjz44/logo.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "parrot-protocol",
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun",
    "symbol": "pBTC",
    "name": "pBTC (Parrot BTC)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DYDWu4hE4MN3aH897xQ3sRTs5EAjJDmQsKLNhbpUiKun/logo.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX",
    "symbol": "pSOL",
    "name": "pSOL (Parrot SOL)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9EaLkQrbjmbbuZG9Wdpo8qfNUEjHATJFSycEmw6f1rGX/logo.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "EwHqbMUMX33JjWAhxSg9vsX3miWqncsgpnAbqn9nhJwZ",
    "symbol": "ULA",
    "name": "Solana Mobile App UlaPay Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EwHqbMUMX33JjWAhxSg9vsX3miWqncsgpnAbqn9nhJwZ/logo.png",
    "extensions": {
      "website": "http://kikenn.com/"
    }
  },
  {
    "chainId": 101,
    "address": "SUNNYWgPQmFxe9wTZzNK7iPnJ3vYDrkgnxJRJm1s3ag",
    "symbol": "SUNNY",
    "name": "Sunny Governance Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SUNNYWgPQmFxe9wTZzNK7iPnJ3vYDrkgnxJRJm1s3ag/logo.svg",
    "extensions": {
      "coingeckoId": "sunny-aggregator",
      "discord": "https://chat.sunny.ag",
      "github": "https://github.com/SunnyAggregator",
      "medium": "https://medium.com/sunny-aggregator",
      "serumV3Usdc": "Aubv1QBFh4bwB2wbP1DaPW21YyQBLfgjg8L4PHTaPzRc",
      "twitter": "https://twitter.com/SunnyAggregator",
      "waterfallbot": "https://bit.ly/SUNNYwaterfall",
      "website": "https://sunny.ag/"
    }
  },
  {
    "chainId": 101,
    "address": "BRLsMczKuaR5w9vSubF4j8HwEGGprVAyyVgS4EX7DKEg",
    "symbol": "CYS",
    "name": "Cykura",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BRLsMczKuaR5w9vSubF4j8HwEGGprVAyyVgS4EX7DKEg/logo.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "cykura",
      "coinmarketcap": "https://coinmarketcap.com/currencies/cyclos/",
      "discord": "https://discord.gg/gyaK56UreX",
      "github": "https://github.com/cykura",
      "medium": "https://cykura.medium.com/",
      "serumV3Usdc": "6V6y6QFi17QZC9qNRpVp7SaPiHpCTp2skbRQkUyZZXPW",
      "solanium": "https://www.solanium.io/project/cyclos/",
      "telegram": "https://t.me/cykuraofficialchat",
      "twitter": "https://twitter.com/cykurafi",
      "website": "https://cykura.io/"
    }
  },
  {
    "chainId": 101,
    "address": "FxjbQMfvQYMtZZK7WGEJwWfsDcdMuuaee8uPxDFFShWh",
    "symbol": "UPFI",
    "name": "UPFI stablecoin (UPFI Network)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FxjbQMfvQYMtZZK7WGEJwWfsDcdMuuaee8uPxDFFShWh/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/nHMDdyAggx",
      "facebook": "https://www.facebook.com/UPFInetwork",
      "medium": "https://upfinetwork.medium.com",
      "serumV3Usdc": "SyQ4KyF5Y1MPPkkf9LGNA6JpkVmis53HrpPvJ1ZUFwK",
      "telegram": "https://t.me/upfinetworkchannel",
      "twitter": "https://twitter.com/upfi_network",
      "website": "https://upfi.network/"
    }
  },
  {
    "chainId": 101,
    "address": "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
    "symbol": "stSOL",
    "name": "Lido Staked SOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png",
    "extensions": {
      "coingeckoId": "lido-staked-sol",
      "coinmarketcap": "https://coinmarketcap.com/currencies/lido-for-solana/",
      "discord": "https://discord.gg/w9pXXgQPu8",
      "github": "https://github.com/ChorusOne/solido",
      "serumV3Usdc": "5F7LGsP1LPtaRV7vVKgxwNYX4Vf22xvuzyXjyar7jJqp",
      "twitter": "https://twitter.com/LidoFinance",
      "website": "https://solana.lido.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo",
    "symbol": "wstETH",
    "name": "Lido Wrapped Staked ETH",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ZScHuTtqZukUrtZS43teTKGs2VqkKL8k4QCouR2n6Uo/logo.png",
    "tags": [
      "stake",
      "wrapped"
    ],
    "extensions": {
      "discord": "https://discord.gg/WhhnWwsFXz",
      "github": "https://github.com/lidofinance",
      "telegram": "https://t.me/lidofinance",
      "twitter": "https://twitter.com/LidoFinance",
      "website": "https://lido.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "2Kc38rfQ49DFaKHQaWbijkE7fcymUMLY5guUiUsDmFfn",
    "symbol": "KURO",
    "name": "Kurobi",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2Kc38rfQ49DFaKHQaWbijkE7fcymUMLY5guUiUsDmFfn/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "kurobi",
      "github": "https://github.com/KurobiHq/",
      "medium": "https://kurobi.medium.com/",
      "telegram": "https://t.me/kurobi_io",
      "twitter": "https://twitter.com/kurobi_io",
      "website": "https://kurobi.io/"
    }
  },
  {
    "chainId": 101,
    "address": "2PoF4gqWg97yjJk276yUYaGVkkASE7tqAU7H5faEBkeC",
    "symbol": "MM",
    "name": "Million",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2PoF4gqWg97yjJk276yUYaGVkkASE7tqAU7H5faEBkeC/logo.svg",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "coingeckoId": "million",
      "discord": "http://app.milliontoken.org/discord",
      "reddit": "https://www.reddit.com/r/milliontoken/",
      "twitter": "https://twitter.com/Million__Token",
      "website": "https://www.milliontoken.org/"
    }
  },
  {
    "chainId": 101,
    "address": "FnKE9n6aGjQoNWRBZXy4RW6LZVao7qwBonUbiD7edUmZ",
    "symbol": "SYP",
    "name": "Sypool",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/b0e47e39f84cffb655f406eb569c57a88b5211cc/assets/mainnet/FnKE9n6aGjQoNWRBZXy4RW6LZVao7qwBonUbiD7edUmZ/logo.png",
    "tags": [
      "platform"
    ],
    "extensions": {
      "coingeckoId": "sypool",
      "website": "https://www.sypool.io/"
    }
  },
  {
    "chainId": 101,
    "address": "HbrmyoumgcK6sDFBi6EZQDi4i4ZgoN16eRB2JseKc7Hi",
    "symbol": "CRY",
    "name": "Crystal",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HbrmyoumgcK6sDFBi6EZQDi4i4ZgoN16eRB2JseKc7Hi/logo.png",
    "tags": [
      "crystal-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/ghnnPvQNgS",
      "github": "https://github.com/sol-crystal",
      "medium": "https://solcrystal.medium.com/",
      "serumV3Usdc": "H3e7YziokpHJfFAMAy2PK6sNph72f38P1ELd5TUQaocv",
      "serumV3Usdt": "ESmbZckdRFv1F8aJ9CfcAsQ9JQchCVgXMEd2UimcujHU",
      "telegram": "https://t.me/sol_cry",
      "twitter": "https://twitter.com/Crystal80955369",
      "website": "http://solcry.io/"
    }
  },
  {
    "chainId": 101,
    "address": "2TxM6S3ZozrBHZGHEPh9CtM74a9SVXbr7NQ7UxkRvQij",
    "symbol": "DINOEGG",
    "name": "DINOEGG",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2TxM6S3ZozrBHZGHEPh9CtM74a9SVXbr7NQ7UxkRvQij/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/solanadino",
      "website": "https://www.solanadino.com"
    }
  },
  {
    "chainId": 101,
    "address": "95KN8q3qubEVjPf9trgyur2nHx8T5RCmztRbLuQ5E5i",
    "symbol": "SMRT",
    "name": "Solminter",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/95KN8q3qubEVjPf9trgyur2nHx8T5RCmztRbLuQ5E5i/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "solminter",
      "github": "https://github.com/solminter",
      "medium": "https://solminter.medium.com",
      "twitter": "https://twitter.com/solminter",
      "website": "https://solminter.com"
    }
  },
  {
    "chainId": 101,
    "address": "Ce3PSQfkxT5ua4r2JqCoWYrMwKWC5hEzwsrT9Hb7mAz9",
    "symbol": "DATE",
    "name": "SolDate(DATE) Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ce3PSQfkxT5ua4r2JqCoWYrMwKWC5hEzwsrT9Hb7mAz9/DATE.svg",
    "tags": [
      "social-token",
      "dating-token",
      "metaverse"
    ],
    "extensions": {
      "discord": "https://discord.gg/soldate",
      "medium": "https://soldate.medium.com",
      "telegram": "https://t.me/soldate_org",
      "twitter": "https://twitter.com/SolDate_org",
      "website": "https://soldate.org/"
    }
  },
  {
    "chainId": 101,
    "address": "G7uYedVqFy97mzjygebnmmaMUVxWHFhNZotY6Zzsprvf",
    "symbol": "CSTR",
    "name": "CoreStarter",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/CoreStarter/token-logo/main/corestarter_logo.png",
    "extensions": {
      "github": "https://github.com/CoreStarter/",
      "linkedin": "https://www.linkedin.com/company/core-starter",
      "medium": "https://corestarter.medium.com",
      "telegram": "https://t.me/corestarter_chat",
      "twitter": "https://twitter.com/CoreStarter",
      "website": "https://corestarter.com/"
    }
  },
  {
    "chainId": 101,
    "address": "DNhZkUaxHXYvpxZ7LNnHtss8sQgdAfd1ZYS1fB7LKWUZ",
    "symbol": "apUSDT",
    "name": "Wrapped USDT (Allbridge from Polygon)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "eqKJTf1Do4MDPyKisMYqVaUFpkEFAs3riGF3ceDH2Ca",
    "symbol": "apUSDC",
    "name": "Wrapped USDC (Allbridge from Polygon)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "7j7H7sgsnNDeCngAPjpaCN4aaaru4HS7NAFYSEUyzJ3k",
    "symbol": "SOLR",
    "name": "SolRazr",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7j7H7sgsnNDeCngAPjpaCN4aaaru4HS7NAFYSEUyzJ3k/SOLR.png",
    "extensions": {
      "discord": "https://discord.gg/HXa3qAYe",
      "github": "https://github.com/solrazr-app/",
      "medium": "https://medium.com/@SolRazr_App",
      "telegram": "https://t.me/solrazr_app",
      "twitter": "https://twitter.com/Solrazr_App",
      "website": "https://solrazr.com/"
    }
  },
  {
    "chainId": 101,
    "address": "25Vu6457o2gdZRGVVt5K8NbAvaP3esYaQNHbNDitVtw1",
    "symbol": "XVC",
    "name": "Xverse Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/25Vu6457o2gdZRGVVt5K8NbAvaP3esYaQNHbNDitVtw1/logo.png",
    "extensions": {
      "website": "https://xverse.ai/"
    }
  },
  {
    "chainId": 101,
    "address": "5U9QqCPhqXAJcEv9uyzFJd5zhN93vuPk1aNNkXnUfPnt",
    "symbol": "SPWN",
    "name": "Bitspawn Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5U9QqCPhqXAJcEv9uyzFJd5zhN93vuPk1aNNkXnUfPnt/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "bitspawn",
      "discord": "https://discord.gg/EAtfCq9",
      "medium": "https://bitspawnprotocol.medium.com",
      "telegram": "https://t.me/bitspawnprotocol",
      "twitter": "https://twitter.com/bitspawngg",
      "website": "https://bitspawn.io"
    }
  },
  {
    "chainId": 101,
    "address": "SNSNkV9zfG5ZKWQs6x4hxvBRV6s8SqMfSGCtECDvdMd",
    "symbol": "SNS",
    "name": "SynesisOne",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/Synesis-One/spl-token/main/icon.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "synesis-one",
      "twitter": "https://twitter.com/synesis_one",
      "website": "https://www.synesis.one/"
    }
  },
  {
    "chainId": 101,
    "address": "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm",
    "symbol": "scnSOL",
    "name": "Socean staked SOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm/logo.png",
    "tags": [
      "stake-pool"
    ],
    "extensions": {
      "coingeckoId": "socean-staked-sol",
      "discord": "https://discord.gg/k8ZcW27bq9",
      "medium": "https://medium.com/@soceanfinance",
      "serumV3Usdc": "D52sefGCWho2nd5UGxWd7wCftAzeNEMNYZkdEPGEdQTb",
      "twitter": "https://twitter.com/soceanfinance",
      "website": "https://socean.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "CH74tuRLTYcxG7qNJCsV9rghfLXJCQJbsu7i52a8F1Gn",
    "symbol": "SOLX",
    "name": "Soldex",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CH74tuRLTYcxG7qNJCsV9rghfLXJCQJbsu7i52a8F1Gn/logo.png",
    "extensions": {
      "linkedin": "https://www.linkedin.com/company/soldex",
      "medium": "https://soldex.medium.com/",
      "serumV3Usdc": "97tCGtxWywJXkudCtderXZoQpTWXyWDQoLq13dqexScH",
      "twitter": "https://twitter.com/soldexai",
      "website": "https://soldex.ai/"
    }
  },
  {
    "chainId": 101,
    "address": "a11bdAAuV8iB2fu7X6AxAvDTo1QZ8FXB3kk5eecdasp",
    "symbol": "ABR",
    "name": "Allbridge",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/allbridge-io/media/main/token.svg",
    "extensions": {
      "coingeckoId": "allbridge",
      "medium": "https://allbridge.medium.com/",
      "telegram": "https://t.me/allbridge_announcements",
      "twitter": "https://twitter.com/Allbridge_io",
      "website": "https://allbridge.io/"
    }
  },
  {
    "chainId": 101,
    "address": "6nuaX3ogrr2CaoAPjtaKHAoBNWok32BMcRozuf32s2QF",
    "symbol": "abBUSD",
    "name": "Wrapped BUSD (Allbridge from BSC)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AJ1W9A9N9dEMdVyoDiam2rV44gnBm2csrPDP7xqcapgX/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "binance-usd"
    }
  },
  {
    "chainId": 101,
    "address": "AaAEw2VCw1XzgvKB8Rj2DyK2ZVau9fbt2bE8hZFWsMyE",
    "symbol": "aeWETH",
    "name": "Wrapped ETH (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "weth"
    }
  },
  {
    "chainId": 101,
    "address": "Bn113WT6rbdgwrm12UJtnmNqGqZjY4it2WoUQuQopFVn",
    "symbol": "aeUSDT",
    "name": "Wrapped USDT (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "DdFPRnccQqLD4zCHrBqdY95D6hvw6PLWp9DEXj1fLCL9",
    "symbol": "aeUSDC",
    "name": "Wrapped USDC (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "9w6LpS7RU1DKftiwH3NgShtXbkMM1ke9iNU4g3MBXSUs",
    "symbol": "aeDAI",
    "name": "Wrapped DAI (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "multi-collateral-dai"
    }
  },
  {
    "chainId": 101,
    "address": "EwxNF8g9UfmsJVcZFTpL9Hx5MCkoQFoJi6XNWzKf1j8e",
    "symbol": "acUSD",
    "name": "Wrapped CUSD (Allbridge from Celo)",
    "decimals": 9,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/7236.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "celo-dollar"
    }
  },
  {
    "chainId": 101,
    "address": "HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p",
    "symbol": "LDO",
    "name": "Lido DAO Token (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
      "assetContract": "https://etherscan.io/address/0x5a98fcbea516cf06857215779fd812ca3bef1b32",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "lido-dao",
      "twitter": "https://twitter.com/LidoFinance",
      "website": "https://lido.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "7hUdUTkJLwdcmt3jSEeqx4ep91sm1XwBxMDaJae6bD5D",
    "symbol": "rSOL",
    "name": "StaFi rSOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7hUdUTkJLwdcmt3jSEeqx4ep91sm1XwBxMDaJae6bD5D/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/jB77etn",
      "medium": "https://stafi-protocol.medium.com",
      "telegram": "https://t.me/stafi_protocol",
      "twitter": "https://twitter.com/StaFi_Protocol",
      "website": "https://stafi.io"
    }
  },
  {
    "chainId": 101,
    "address": "7R7rZ7SsLDXkYAfJyRCBScLuZwizeMWaTWrwFhSZU2Jq",
    "symbol": "WET",
    "name": "Weble Ecosystem Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7R7rZ7SsLDXkYAfJyRCBScLuZwizeMWaTWrwFhSZU2Jq/logo.png",
    "extensions": {
      "website": "https://wet.weble.ch/"
    }
  },
  {
    "chainId": 101,
    "address": "BFsCwfk8VsEbSfLkkgmoKsAPk2N6FMJjeTsuxfGa9VEf",
    "symbol": "aeFTT",
    "name": "Wrapped FTT (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3/logo.png",
    "extensions": {
      "coingeckoId": "ftx-token"
    }
  },
  {
    "chainId": 101,
    "address": "ALQ9KMWjFmxVbew3vMkJj3ypbAKuorSgGst6svCHEe2z",
    "symbol": "MDF",
    "name": "MatrixETF DAO Finance",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ALQ9KMWjFmxVbew3vMkJj3ypbAKuorSgGst6svCHEe2z/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "matrixetf",
      "telegram": "https://t.me/MatrixETF",
      "twitter": "https://twitter.com/MatrixETF",
      "website": "https://www.matrixetf.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "5tN42n9vMi6ubp67Uy4NnmM5DMZYN8aS8GeB3bEDHr6E",
    "symbol": "WAG",
    "name": "Waggle Network",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5tN42n9vMi6ubp67Uy4NnmM5DMZYN8aS8GeB3bEDHr6E/logo.png",
    "extensions": {
      "medium": "https://medium.com/@wagglenetwork",
      "telegram": "https://t.me/waggle_network",
      "twitter": "https://twitter.com/wagglenetwork",
      "website": "https://waggle.network/"
    }
  },
  {
    "chainId": 101,
    "address": "uNrix3Q5g51MCEUrYBUEBDdQ96RQDQspQJJnnQ4T3Vc",
    "symbol": "SBNK",
    "name": "Solbank",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/uNrix3Q5g51MCEUrYBUEBDdQ96RQDQspQJJnnQ4T3Vc/logo.png",
    "extensions": {
      "coingeckoId": "solblank",
      "twitter": "https://twitter.com/solbankapp",
      "website": "http://solbank.app/"
    }
  },
  {
    "chainId": 101,
    "address": "MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey",
    "symbol": "MNDE",
    "name": "Marinade",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey/logo.png",
    "extensions": {
      "coingeckoId": "marinade",
      "discord": "https://discord.gg/mGqZA5pjRN",
      "github": "https://github.com/marinade-finance",
      "medium": "https://medium.com/marinade-finance",
      "twitter": "https://twitter.com/MarinadeFinance",
      "website": "https://marinade.finance"
    }
  },
  {
    "chainId": 101,
    "address": "E6UU5M1z4CvSAAF99d9wRoXsasWMEXsvHrz3JQRXtm2X",
    "symbol": "DGLN",
    "name": "Dogelana",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E6UU5M1z4CvSAAF99d9wRoXsasWMEXsvHrz3JQRXtm2X/logo.png",
    "tags": [
      "dogecoin",
      "dogelana",
      "doge",
      "solana",
      "meme",
      "dgln"
    ],
    "extensions": {
      "blog": "https://dogelana.com/blog",
      "coingeckoId": "dogelana",
      "coinmarketcap": "https://coinmarketcap.com/currencies/dogelana/",
      "discord": "https://discord.gg/UNjbTguY5x",
      "facebook": "https://facebook.com/dogelana",
      "instagram": "https://www.instagram.com/realdogelana/",
      "reddit": "https://www.reddit.com/r/dogelana",
      "telegram": "https://t.me/realdogelana",
      "twitter": "https://twitter.com/realdogelana",
      "website": "https://www.dogelana.com",
      "youtube": "https://www.youtube.com/channel/UCkUS4exbXFaEVx5wBypMKaQ"
    }
  },
  {
    "chainId": 101,
    "address": "83LGLCm7QKpYZbX8q4W2kYWbtt8NJBwbVwEepzkVnJ9y",
    "symbol": "xUSD",
    "name": "Synthetic USD",
    "decimals": 6,
    "logoURI": "https://www.synthetify.io/icons/xusd.svg",
    "extensions": {
      "coingeckoId": "usd-coin",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "HWxpSV3QAGzLQzGAtvhSYAEr7sTQugQygnni1gnUGh1D",
    "symbol": "xBTC",
    "name": "Synthetic BTC",
    "decimals": 10,
    "logoURI": "https://www.synthetify.io/icons/xbtc.svg",
    "extensions": {
      "coingeckoId": "bitcoin",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BdUJucPJyjkHxLMv6ipKNUhSeY3DWrVtgxAES1iSBAov",
    "symbol": "xSOL",
    "name": "Synthetic SOL",
    "decimals": 9,
    "logoURI": "https://www.synthetify.io/icons/xsol.svg",
    "extensions": {
      "coingeckoId": "solana",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "Fr3W7NPVvdVbwMcHgA7Gx2wUxP43txdsn3iULJGFbKz9",
    "symbol": "xFTT",
    "name": "Synthetic FTT",
    "decimals": 8,
    "logoURI": "https://www.synthetify.io/icons/xftt.svg",
    "extensions": {
      "coingeckoId": "ftx-token",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "8bqjz8DeSuim1sEAsQatjJN4zseyxSPdhHQcuuhL8PCK",
    "symbol": "xETH",
    "name": "Synthetic ETH",
    "decimals": 9,
    "logoURI": "https://www.synthetify.io/icons/xeth.svg",
    "extensions": {
      "coingeckoId": "ethereum",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "6MeoZEcUMhAB788YXTQN4x7K8MnwSt6RHWsLkuq9GJb2",
    "symbol": "xLUNA",
    "name": "Synthetic LUNA",
    "decimals": 6,
    "logoURI": "https://www.synthetify.io/icons/xluna.svg",
    "extensions": {
      "coingeckoId": "terra-luna",
      "twitter": "https://twitter.com/synthetify",
      "website": "https://synthetify.io/"
    }
  },
  {
    "chainId": 101,
    "address": "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
    "symbol": "UXD",
    "name": "UXD Stablecoin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "uxd-stablecoin",
      "discord": "https://discord.com/invite/BHfpYmjsBM",
      "medium": "https://uxdprotocol.medium.com/",
      "twitter": "https://twitter.com/UXDProtocol",
      "website": "https://uxd.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM",
    "symbol": "USDCet",
    "name": "USD Coin (Portal from Ethereum)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "assetContract": "https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "E2VmbootbVCBkMNNxKQgCLMS1X3NoGMaYAsufaAsf7M",
    "symbol": "USDCpo",
    "name": "USD Coin (Portal from Polygon)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E2VmbootbVCBkMNNxKQgCLMS1X3NoGMaYAsufaAsf7M/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      "assetContract": "https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      "bridgeContract": "https://polygonscan.com/address/0x5a58505a96d1dbf8df91cb21b54419fc36e93fde",
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1",
    "symbol": "USDTet",
    "name": "Tether USD (Portal from Ethereum)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "assetContract": "https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "5goWRao6a3yNC4d6UjMdQxonkCMvKBwdpubU3qhfcdf1",
    "symbol": "USDTpo",
    "name": "Tether USD (Portal from Polygon)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5goWRao6a3yNC4d6UjMdQxonkCMvKBwdpubU3qhfcdf1/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      "assetContract": "https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      "bridgeContract": "https://polygonscan.com/address/0x5a58505a96d1dbf8df91cb21b54419fc36e93fde",
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o",
    "symbol": "DAI",
    "name": "Dai Stablecoin (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "assetContract": "https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "dai"
    }
  },
  {
    "chainId": 101,
    "address": "ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj",
    "symbol": "FRKT",
    "name": "FRAKT Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "frakt-token",
      "coinmarketcap": "https://coinmarketcap.com/currencies/frakt-token/",
      "twitter": "https://twitter.com/FraktArt",
      "website": "https://frakt.art"
    }
  },
  {
    "chainId": 101,
    "address": "FwEHs3kJEdMa2qZHv7SgzCiFXUQPEycEXksfBkwmS8gj",
    "symbol": "aaUSDT",
    "name": "Wrapped USDT (Allbridge from Avalanche)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "8Yv9Jz4z7BUHP68dz8E8m3tMe6NKgpMUKn8KVqrPA6Fr",
    "symbol": "aaUSDC",
    "name": "Wrapped USDC (Allbridge from Avalanche)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "EgQ3yNtVhdHz7g1ZhjfGbxhFKMPPaFkz8QHXM5RBZBgi",
    "symbol": "aaDAI",
    "name": "Wrapped DAI (Allbridge from Avalanche)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "multi-collateral-dai"
    }
  },
  {
    "chainId": 101,
    "address": "Fd8xyHHRjTvxfZrBirb6MaxSmrZYw99gRSqFUKdFwFvw",
    "symbol": "aaWBTC",
    "name": "Wrapped BTC (Allbridge from Avalanche)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png",
    "extensions": {
      "coingeckoId": "wrapped-bitcoin"
    }
  },
  {
    "chainId": 101,
    "address": "AUrMpCDYYcPuHhyNX8gEEqbmDPFUpBpHrNW3vPeCFn5Z",
    "symbol": "AVAX",
    "name": "AVAX (Allbridge from Avalanche)",
    "decimals": 9,
    "logoURI": "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
    "extensions": {
      "coingeckoId": "avalanche-2"
    }
  },
  {
    "chainId": 101,
    "address": "FriCEbw1V99GwrJRXPnSQ6su2TabHabNxiZ3VNsVFPPN",
    "symbol": "FRIES",
    "name": "Soltato FRIES",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FriCEbw1V99GwrJRXPnSQ6su2TabHabNxiZ3VNsVFPPN/logo.png",
    "tags": [
      "nft",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/Wkgh9Fvy84",
      "serumV3Usdc": "8DKD5dKmmwparxCkpV2BQFTxt164rfadK8kX3at6hWUB",
      "twitter": "https://twitter.com/Soltato_NFT",
      "website": "https://soltato.io/"
    }
  },
  {
    "chainId": 101,
    "address": "AKxR1NLTtPnsVcWwPSEGat1TC9da3Z2vX7sY4G7ZLj1r",
    "symbol": "PNT",
    "name": "PHANT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AKxR1NLTtPnsVcWwPSEGat1TC9da3Z2vX7sY4G7ZLj1r/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "phant",
      "coinmarketcap": "https://coinmarketcap.com/currencies/phant/",
      "discord": "https://discord.gg/HsHwWGtuaz",
      "serumV3Usdc": "9GWz5exH52JAHhe4MyKmo96SRAJy96ZKhEpqrnbVzYqU",
      "twitter": "https://twitter.com/wecap_io",
      "website": "https://wecap.io/"
    }
  },
  {
    "chainId": 101,
    "address": "3vHSsV6mgvpa1JVuuDZVB72vYbeUNzW4mBxiBftwzHEA",
    "symbol": "FRNT",
    "name": "Final Frontier",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3vHSsV6mgvpa1JVuuDZVB72vYbeUNzW4mBxiBftwzHEA/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "instagram": "https://instagram.com/finalfrontiersa",
      "twitter": "https://twitter.com/FinalFrontierSA",
      "website": "https://finalfrontiersa.com/"
    }
  },
  {
    "chainId": 101,
    "address": "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP",
    "symbol": "AURY",
    "name": "Aurory",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "aurory",
      "description": "Aurory Token",
      "website": "https://aurory.io"
    }
  },
  {
    "chainId": 101,
    "address": "5LSFpvLDkcdV2a3Kiyzmg5YmJsj2XDLySaXvnfP1cgLT",
    "symbol": "DOGO",
    "name": "Dogemon",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5LSFpvLDkcdV2a3Kiyzmg5YmJsj2XDLySaXvnfP1cgLT/logo.png",
    "tags": [
      "GameFi",
      "NFT",
      "DogemonGo"
    ],
    "extensions": {
      "website": "https://dogemongo.com/"
    }
  },
  {
    "chainId": 101,
    "address": "zwqe1Nd4eiWyCcqdo4FgCq7LYZHdSeGKKudv6RwiAEn",
    "symbol": "SOLPAY",
    "name": "SOLPAY",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/nguilbaud/token-list/main/assets/mainnet/zwqe1Nd4eiWyCcqdo4FgCq7LYZHdSeGKKudv6RwiAEn/logo.png",
    "tags": [
      "DeFi",
      "technology",
      "utility-token"
    ],
    "extensions": {
      "telegram": "https://t.me/solpayfinance",
      "twitter": "https://twitter.com/SolPayDeFi",
      "website": "https://solpay.finance"
    }
  },
  {
    "chainId": 101,
    "address": "2e7yNwrmTgXp9ABUmcPXvFJTSrEVLj4YMyrb4GUM4Pdd",
    "symbol": "MSI",
    "name": "Matrix Solana Index",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2e7yNwrmTgXp9ABUmcPXvFJTSrEVLj4YMyrb4GUM4Pdd/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "matrix-solana-index",
      "telegram": "https://t.me/MatrixETF",
      "twitter": "https://twitter.com/MatrixETF",
      "website": "https://www.matrixetf.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "2HeykdKjzHKGm2LKHw8pDYwjKPiFEoXAz74dirhUgQvq",
    "symbol": "SAO",
    "name": "Sator",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2HeykdKjzHKGm2LKHw8pDYwjKPiFEoXAz74dirhUgQvq/Sator_Logo.png",
    "tags": [
      "NFT",
      "soical-token",
      "utility-token",
      "meta-verse"
    ],
    "extensions": {
      "coingeckoId": "sator",
      "github": "https://github.com/SatorNetwork",
      "medium": "https://satortoken.medium.com",
      "telegram": "https://t.me/SatorSAO",
      "twitter": "https://twitter.com/SatorSAO",
      "website": "https://sator.io"
    }
  },
  {
    "chainId": 101,
    "address": "4SZjjNABoqhbd4hnapbvoEPEqT8mnNkfbEoAwALf1V8t",
    "symbol": "CAVE",
    "name": "Crypto Cavemen",
    "decimals": 6,
    "logoURI": "https://ftoblquxiunjey7bu4eevlz2u7kwg5s3yvou7adgge2jbihcu7qq.arweave.net/LNwVwpdFGpJj4acISq86p9VjdlvFXU-AZjE0kKDip-E/?ext=png",
    "tags": [
      "utility-token",
      "game",
      "play2earn"
    ],
    "extensions": {
      "coingeckoId": "cave",
      "discord": "https://discord.com/invite/cryptocavemen",
      "twitter": "https://twitter.com/TheCavemenClub",
      "website": "https://cryptocavemen.io"
    }
  },
  {
    "chainId": 101,
    "address": "GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD",
    "symbol": "GOFX",
    "name": "GooseFX",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GFX1ZjR2P15tmrSwow6FjyDYcEkoFb4p4gJCpLBjaxHD/logo.png",
    "tags": [
      "NFT",
      "utility-token",
      "dao",
      "governance"
    ],
    "extensions": {
      "coingeckoId": "goosefx",
      "coinmarketcap": "https://coinmarketcap.com/currencies/goosefx/",
      "discord": "https://discord.gg/cDEPXpY26q",
      "serumV3Usdc": "2wgi2FabNsSDdb8dke9mHFB67QtMYjYa318HpSqyJLDD",
      "telegram": "https://t.me/goosefx",
      "twitter": "https://twitter.com/GooseFX1",
      "website": "https://goosefx.io"
    }
  },
  {
    "chainId": 101,
    "address": "EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv",
    "symbol": "FTT",
    "name": "FTX Token (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EzfgjvkSwthhgHaceR3LnKXUoRkP6NUhfghdaHAj1tUv/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "assetContract": "https://etherscan.io/address/0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "ftx-token",
      "serumV3Usdc": "2wteg25ch227n4Rh1CN4WNrDZXBpRBpWJ48mEC2K7f4r",
      "serumV3Usdt": "BoHojHESAv4McZx9gXd1bWTZMq25JYyGz4qL1m5C3nvk"
    }
  },
  {
    "chainId": 101,
    "address": "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
    "symbol": "UST",
    "name": "UST (Portal)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i/logo.png",
    "tags": [
      "wrapped",
      "wormhole",
      "stablecoin"
    ],
    "extensions": {
      "address": "uusd",
      "bridgeContract": "https://finder.terra.money/columbus-5/address/terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf",
      "coingeckoId": "terrausd",
      "serumV3Usdc": "8WmckvEoVGZvtN8knjdzFGbWJ3Sr4BcWdyzSYuCrD4YK"
    }
  },
  {
    "chainId": 101,
    "address": "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    "symbol": "ETH",
    "name": "Ether (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "assetContract": "https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "ethereum",
      "serumV3Usdc": "8Gmi2HhZmwQPVdCwzS7CM66MGstMXPcTVHA7jF19cLZz",
      "serumV3Usdt": "ch7kmPrtoQUSEPBggcNAvLGiMQkJagVwd3gDYfd8m7Q"
    }
  },
  {
    "chainId": 101,
    "address": "xnorPhAzWXUczCP3KjU5yDxmKKZi5cSbxytQ1LgE3kG",
    "symbol": "SRMet",
    "name": "Serum (Portal from Ethereum)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xnorPhAzWXUczCP3KjU5yDxmKKZi5cSbxytQ1LgE3kG/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
      "assetContract": "https://etherscan.io/address/0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "serum"
    }
  },
  {
    "chainId": 101,
    "address": "F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W",
    "symbol": "LUNA",
    "name": "LUNA (Portal)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/F6v4wfAdJB8D8p77bMXZgYt8TDKsYxLYxH5AFhUkYx9W/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "uluna",
      "bridgeContract": "https://finder.terra.money/columbus-5/address/terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf",
      "coingeckoId": "terra-luna",
      "serumV3Usdc": "HBTu8hNaoT3VyiSSzJYa8jwt9sDGKtJviSwFa11iXdmE"
    }
  },
  {
    "chainId": 101,
    "address": "KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE",
    "symbol": "AVAX",
    "name": "AVAX (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KgV1GvrHQmRBY8sHQQeUKwTm2r2h8t4C8qt12Cw1HVE/logo.png",
    "tags": [
      "wrapped"
    ],
    "extensions": {
      "address": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
      "assetContract": "https://snowtrace.io/token/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
      "bridgeContract": "https://snowtrace.io/address/0x0e082f06ff657d94310cb8ce8b0d9a04541d8052",
      "coingeckoId": "avalanche-2",
      "serumV3Usdc": "E8JQstcwjuqN5kdMyUJLNuaectymnhffkvfg1j286UCr"
    }
  },
  {
    "chainId": 101,
    "address": "7VQo3HFLNH5QqGtM8eC3XQbPkJUu7nS9LeGWjerRh5Sw",
    "symbol": "HUSD",
    "name": "HUSD (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7VQo3HFLNH5QqGtM8eC3XQbPkJUu7nS9LeGWjerRh5Sw/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "assetContract": "https://etherscan.io/address/0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "husd"
    }
  },
  {
    "chainId": 101,
    "address": "33fsBLA8djQm82RpHmE3SuVrPGtZBWNYExsEUeKX1HXX",
    "symbol": "BUSDet",
    "name": "Binance USD (Portal from Ethereum)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/33fsBLA8djQm82RpHmE3SuVrPGtZBWNYExsEUeKX1HXX/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "assetContract": "https://etherscan.io/address/0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "binance-usd"
    }
  },
  {
    "chainId": 101,
    "address": "FR87nWEUxVgerFGhZM8Y4AggKGLnaXswr1Pd8wZ4kZcp",
    "symbol": "FRAX",
    "name": "Frax (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FR87nWEUxVgerFGhZM8Y4AggKGLnaXswr1Pd8wZ4kZcp/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x853d955acef822db058eb8505911ed77f175b99e",
      "assetContract": "https://etherscan.io/address/0x853d955acef822db058eb8505911ed77f175b99e",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "frax"
    }
  },
  {
    "chainId": 101,
    "address": "7dVH61ChzgmN9BwG4PkzwRP8PbYwPJ7ZPNF2vamKT2H8",
    "symbol": "HBTC",
    "name": "Huobi BTC (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dVH61ChzgmN9BwG4PkzwRP8PbYwPJ7ZPNF2vamKT2H8/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x0316eb71485b0ab14103307bf65a021042c6d380",
      "assetContract": "https://etherscan.io/address/0x0316eb71485b0ab14103307bf65a021042c6d380",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "huobi-btc"
    }
  },
  {
    "chainId": 101,
    "address": "43m2ewFV5nDepieFjT9EmAQnc1HRtAF247RBpLGFem5F",
    "symbol": "USDK",
    "name": "USDK (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/43m2ewFV5nDepieFjT9EmAQnc1HRtAF247RBpLGFem5F/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x1c48f86ae57291f7686349f12601910bd8d470bb",
      "assetContract": "https://etherscan.io/address/0x1c48f86ae57291f7686349f12601910bd8d470bb",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "usdk"
    }
  },
  {
    "chainId": 101,
    "address": "ChVzxWRmrTeSgwd3Ui3UumcN8KX7VK3WaD4KGeSKpypj",
    "symbol": "SUSHI",
    "name": "SushiToken (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ChVzxWRmrTeSgwd3Ui3UumcN8KX7VK3WaD4KGeSKpypj/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      "assetContract": "https://etherscan.io/address/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "sushi",
      "serumV3Usdc": "3uWVMWu7cwMnYMAAdtsZNwaaqeeeZHARGZwcExnQiFay",
      "serumV3Usdt": "T3aC6qcPAJtX1gqkckfSxBPdPWziz5fLYRt5Dz3Nafq"
    }
  },
  {
    "chainId": 101,
    "address": "8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36",
    "symbol": "UNI",
    "name": "Uniswap (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "assetContract": "https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "uniswap",
      "serumV3Usdc": "B7b5rjQuqQCuGqmUBWmcCTqaL3Z1462mo4NArqty6QFR",
      "serumV3Usdt": "FrKM6kJtAjXknHPEpkrQtJSXZwUxV5dq26wDpc4YjQST"
    }
  },
  {
    "chainId": 101,
    "address": "9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa",
    "symbol": "BNB",
    "name": "Binance Coin (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      "assetContract": "https://bscscan.com/address/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      "bridgeContract": "https://bscscan.com/address/0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7",
      "coingeckoId": "binance-coin",
      "serumV3Usdc": "4UPUurKveNEJgBqJzqHPyi8DhedvpYsMXi7d43CjAg2f",
      "serumV3Usdt": "FjbKNZME5yVSC1R3HJM99kB3yir3q3frS5MteMFD72sV"
    }
  },
  {
    "chainId": 101,
    "address": "2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX",
    "symbol": "LINK",
    "name": "ChainLink Token (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "assetContract": "https://etherscan.io/address/0x514910771af9ca656af840dff83e8264ecf986ca",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "chainlink",
      "serumV3Usdc": "FJMjxMCiDKn16TLhXUdEbVDH5wC6k9EHYJTcrH6NcbDE",
      "serumV3Usdt": "Gr2KmhK7Upr4uW56B1QQrJuhhgmot6zAHJeZALTMStiX"
    }
  },
  {
    "chainId": 101,
    "address": "C6oFsE8nXRDThzrMEQ5SxaNFGKoyyfWDDVPw37JKvPTe",
    "symbol": "PAXG",
    "name": "Paxos Gold (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/C6oFsE8nXRDThzrMEQ5SxaNFGKoyyfWDDVPw37JKvPTe/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x45804880de22913dafe09f4980848ece6ecbaf78",
      "assetContract": "https://etherscan.io/address/0x45804880de22913dafe09f4980848ece6ecbaf78",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "pax-gold",
      "serumV3Usdc": "BeyB6W2iNsH9qSfb7icLTmSPDu8oUGkarMZed4Unrnsr",
      "serumV3Usdt": "9SQcpBFAs6ZiLAGUC9azYCN1kv89uTRmFR83sX1FTeh4"
    }
  },
  {
    "chainId": 101,
    "address": "HxhWkVpk5NS4Ltg5nij2G671CKXFRKPK8vy271Ub4uEK",
    "symbol": "HXRO",
    "name": "Hxro (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HxhWkVpk5NS4Ltg5nij2G671CKXFRKPK8vy271Ub4uEK/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3",
      "assetContract": "https://etherscan.io/address/0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "hxro",
      "serumV3Usdc": "CBb5zXwNRB73WVjs2m21P5prcEZa6SWmej74Vzxh8dRm",
      "serumV3Usdt": "3BScwNxtMrEcQ5VTHyXHYQR98dTaxfyXGaLkuSjBY1dW"
    }
  },
  {
    "chainId": 101,
    "address": "3CyiEDRehaGufzkpXJitCP5tvh7cNhRqd9rPBxZrgK5z",
    "symbol": "SXP",
    "name": "Swipe (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3CyiEDRehaGufzkpXJitCP5tvh7cNhRqd9rPBxZrgK5z/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9",
      "assetContract": "https://etherscan.io/address/0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "swipe",
      "serumV3Usdc": "G5F84rfqmWqzZv5GBpSn8mMwW8zJ2B4Y1GpGupiwjHNM",
      "serumV3Usdt": "2FQbPW1ticJz2SMMbEXxbKWJKmw1wLc6ggSP2HyzdMen"
    }
  },
  {
    "chainId": 101,
    "address": "8oiPhiFrmXS93iC98M4ATev8emQ6XGtf8pz8sntbbqGt",
    "symbol": "OASIS",
    "name": "Oasis",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8oiPhiFrmXS93iC98M4ATev8emQ6XGtf8pz8sntbbqGt/logo.png",
    "tags": [
      "Utility-token",
      "game",
      "NFTs"
    ],
    "extensions": {
      "website": "https://wonderwall.finance"
    }
  },
  {
    "chainId": 101,
    "address": "SAMUmmSvrE8yqtcG94oyP1Zu2P9t8PSRSV3vewsGtPM",
    "symbol": "SAMU",
    "name": "Samusky Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SAMUmmSvrE8yqtcG94oyP1Zu2P9t8PSRSV3vewsGtPM/logo.png",
    "tags": [
      "social-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "samusky-token",
      "coinmarketcap": "https://coinmarketcap.com/currencies/samusky/",
      "discord": "https://discord.gg/samuskyio",
      "github": "https://github.com/samuskyio",
      "serumV3Usdc": "7PX2k66ecaUJHJweNbdCocR4kvPotvDn2FPu69svCsnu",
      "telegram": "https://t.me/samuskyio",
      "twitter": "https://twitter.com/samuskyio",
      "website": "https://samusky.io"
    }
  },
  {
    "chainId": 101,
    "address": "DHpoYejUDqzByb6HAdaLWF7KZvwUv2vWYDY9cTENNZui",
    "symbol": "acUSDC",
    "name": "Wrapped USDC (Allbridge from Celo)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "Bo4ehCeRcRj2wp5tQpjfCJxYFn4KyRacfDzSa4Aj27tH",
    "symbol": "ahBTC",
    "name": "Wrapped BTC (Allbridge from HECO)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Bo4ehCeRcRj2wp5tQpjfCJxYFn4KyRacfDzSa4Aj27tH/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "wrapped-bitcoin"
    }
  },
  {
    "chainId": 101,
    "address": "3jzdrXXKxwkBk82u2eCWASZLCKoZs1LQTg87HBEAmBJw",
    "symbol": "FLOOF",
    "name": "FLOOF",
    "decimals": 1,
    "logoURI": "https://raw.githubusercontent.com/GreenFailure/Floof/main/OkyT9kpz_400x400.png",
    "extensions": {
      "coingeckoId": "floof",
      "discord": "https://discord.gg/Gr5Z8DZ67X",
      "serumV3Usdc": "BxcuT1p8FK9cFak4Uuf5nmoAZ7nQGu7FerCMESGqxF7b",
      "twitter": "https://twitter.com/FLOOF_SOLANA",
      "website": "https://www.floofsolana.com"
    }
  },
  {
    "chainId": 101,
    "address": "Uuc6hiKT9Y6ASoqs2phonGGw2LAtecfJu9yEohppzWH",
    "symbol": "BABY",
    "name": "Baby Samo Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Uuc6hiKT9Y6ASoqs2phonGGw2LAtecfJu9yEohppzWH/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "baby-samo-coin",
      "discord": "https://discord.gg/RhQTNhRk2X",
      "twitter": "https://twitter.com/BabySamoCoin",
      "website": "https://www.babysamocoin.com/"
    }
  },
  {
    "chainId": 101,
    "address": "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
    "symbol": "SLND",
    "name": "Solend",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png",
    "tags": [
      "solend",
      "lending"
    ],
    "extensions": {
      "coingeckoId": "solend",
      "serumV3Usdc": "F9y9NM83kBMzBmMvNT18mkcFuNAPhNRhx7pnz9EDWwfv",
      "twitter": "https://twitter.com/solendprotocol",
      "website": "https://solend.fi"
    }
  },
  {
    "chainId": 101,
    "address": "H6JocWxg5g1Lcs4oPnBecmjQ4Y1bkZhGJHtjMunmjyrp",
    "symbol": "SPX",
    "name": "Sphinxel",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/H6JocWxg5g1Lcs4oPnBecmjQ4Y1bkZhGJHtjMunmjyrp/logo.png",
    "tags": [
      "meme-token",
      "community-token",
      "trading-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SphinxelSPX",
      "website": "https://sphinxel.com"
    }
  },
  {
    "chainId": 101,
    "address": "Dhg9XnzJWzSQqH2aAnhPTEJHGQAkALDfD98MA499A7pa",
    "symbol": "SHIBA",
    "name": "Shibalana",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Dhg9XnzJWzSQqH2aAnhPTEJHGQAkALDfD98MA499A7pa/logo.png",
    "extensions": {
      "coingeckoId": "shibalana",
      "discord": "https://discord.gg/UaK3ZMkkmH",
      "serumV3Usdc": "3M8uZhLZMxFUedsEgPzywZr9qbGTv3kKNMCEfAmg8iyK",
      "telegram": "https://t.me/shibalana",
      "twitter": "https://twitter.com/shibalana",
      "website": "https://shibalana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M",
    "symbol": "UXP",
    "name": "UXP Governance Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/UXPhBoR3qG4UCiGNJfV7MqhHyFqKN68g45GoYvAeL2M/uxp-icon-black.png",
    "extensions": {
      "coingeckoId": "uxd-protocol-token",
      "coinmarketcap": "https://coinmarketcap.com/currencies/uxd-protocol/",
      "discord": "https://discord.com/invite/BHfpYmjsBM",
      "medium": "https://uxdprotocol.medium.com/",
      "serumV3Usdc": "7KQpsp914VYnh62yV6AGfoG9hprfA14SgzEyqr6u9NY1",
      "twitter": "https://twitter.com/UXDProtocol",
      "website": "https://uxd.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "DYbRXaQcnj44SH9woxvyFdtcKkSoPoCEshRTQDZSjsBm",
    "symbol": "MARIJUANA",
    "name": "Marijuana Joint",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DYbRXaQcnj44SH9woxvyFdtcKkSoPoCEshRTQDZSjsBm/logo.png",
    "tags": [
      "Meme",
      "Social"
    ]
  },
  {
    "chainId": 101,
    "address": "FCqfQSujuPxy6V42UvafBhsysWtEq1vhjfMN1PUbgaxA",
    "symbol": "USDCbs",
    "name": "USD Coin (Portal from BSC)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FCqfQSujuPxy6V42UvafBhsysWtEq1vhjfMN1PUbgaxA/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      "assetContract": "https://bscscan.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      "bridgeContract": "https://bscscan.com/address/0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7",
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "ASoLXbfe7cd6igh5yiEsU8M7FW64QRxPKkxk7sjAfond",
    "symbol": "aSOL",
    "name": "aSOL Aggregate Solana Stake Pool",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ASoLXbfe7cd6igh5yiEsU8M7FW64QRxPKkxk7sjAfond/logo.svg",
    "extensions": {
      "coingeckoId": "solana",
      "description": "aSOL is the standard for transacting with staked SOL tokens.",
      "github": "https://github.com/aSolHQ",
      "twitter": "https://twitter.com/aSOLprotocol",
      "website": "https://asol.so"
    }
  },
  {
    "chainId": 101,
    "address": "8qJSyQprMC57TWKaYEmetUR3UUiTP2M3hXdcvFhkZdmv",
    "symbol": "USDTbs",
    "name": "Tether USD (Portal from BSC)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8qJSyQprMC57TWKaYEmetUR3UUiTP2M3hXdcvFhkZdmv/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x55d398326f99059ff775485246999027b3197955",
      "assetContract": "https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955",
      "bridgeContract": "https://bscscan.com/address/0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7",
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "HNpdP2rL6FR6jM3bDxFX2Zo32D1YG2ZCztf9zzCrKMEX",
    "symbol": "SER",
    "name": "Secretum",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HNpdP2rL6FR6jM3bDxFX2Zo32D1YG2ZCztf9zzCrKMEX/logo.svg",
    "extensions": {
      "telegram": "https://t.me/joinchat/ZTXM0J9pOMozOGY0",
      "twitter": "https://twitter.com/appsecretum",
      "website": "https://secretum.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BjTUmZjNUUAPKHVdTs8yZsCmecW5isSK4AbuFihXoUwa",
    "symbol": "PUSSY",
    "name": "Pussy",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BjTUmZjNUUAPKHVdTs8yZsCmecW5isSK4AbuFihXoUwa/logo.png",
    "tags": [
      "Meme",
      "Social",
      "Metaverse"
    ],
    "extensions": {
      "serumV3Usdc": "ALgq4dHm4bypcsg1JRDc6VPurwDtUsdsbpYB8kDxyZ9o",
      "website": "https://pussy.samoymeme.com"
    }
  },
  {
    "chainId": 101,
    "address": "AMNoi4727tzy7adu4wnx3cN2VQbQdG71DqaPoSm7isJ3",
    "symbol": "BITCH",
    "name": "Bitch Of Solana",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AMNoi4727tzy7adu4wnx3cN2VQbQdG71DqaPoSm7isJ3/logo.png",
    "tags": [
      "Meme",
      "community",
      "utility-token"
    ],
    "extensions": {
      "serumV3Usdc": "2N78M8HZj2R9rSHxVXx6QWSvFvvnmhoEbsNPfrBdtdGo",
      "website": "https://bitch.samoymeme.com"
    }
  },
  {
    "chainId": 101,
    "address": "3in9a9yHtdjDFRjDyGTTpGUwJpT9zZBcyjQ8J7nqqNtq",
    "symbol": "DoggyStyle",
    "name": "Doggy Style",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3in9a9yHtdjDFRjDyGTTpGUwJpT9zZBcyjQ8J7nqqNtq/logo.png",
    "tags": [
      "Meme",
      "community",
      "utility-token"
    ],
    "extensions": {
      "serumV3Usdc": "yzKcpbgRmwE5ULL72C4JPUZYQ2S8ZHRFJnrXgQrKyvB",
      "website": "https://doggystyle.samoymeme.com"
    }
  },
  {
    "chainId": 101,
    "address": "AymKzSDznoLT7Vhsb4wSRnCj1gjcG3zkgYFY8fxsHHer",
    "symbol": "TICKET",
    "name": "The Ticket Finance",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AymKzSDznoLT7Vhsb4wSRnCj1gjcG3zkgYFY8fxsHHer/logo.png",
    "tags": [
      "launchpad",
      "dex",
      "defi",
      "exchange",
      "utility-token"
    ],
    "extensions": {
      "serumV3Usdc": "HBfdGEMeQQpGogC3Li4uhRqZxGZAVLM9zimt31vdtSdA",
      "telegram": "https://t.me/theticketfinance",
      "twitter": "https://twitter.com/TheTicketSol",
      "website": "https://theticket.finance"
    }
  },
  {
    "chainId": 101,
    "address": "AVKnbqNQgXDY8kbnno9eSGfwpVz5idimBnDKiz1vbWAh",
    "symbol": "PART",
    "name": "Particle",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AVKnbqNQgXDY8kbnno9eSGfwpVz5idimBnDKiz1vbWAh/logo.png",
    "tags": [
      "DeFi",
      "NFT",
      "Gaming"
    ],
    "extensions": {
      "coingeckoId": "particle-technology",
      "twitter": "https://twitter.com/particle_techno",
      "website": "https://particle.technology/"
    }
  },
  {
    "chainId": 101,
    "address": "7zhbkbKpGaUsJW7AD4yyAfGGoy53Xx2H3Ai5BKcwGKHw",
    "symbol": "NOM",
    "name": "nom",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7zhbkbKpGaUsJW7AD4yyAfGGoy53Xx2H3Ai5BKcwGKHw/logo.png",
    "tags": [
      "dao",
      "meme-token",
      "Defi",
      "Gamefi"
    ],
    "extensions": {
      "discord": "https://discord.gg/h7CZnKCb",
      "twitter": "https://twitter.com/TheNomDAO",
      "website": "https://www.nomdao.com"
    }
  },
  {
    "chainId": 101,
    "address": "6XWfkyg5mzGtKNftSDgYjyoPyUsLRf2rafj95XSFSFrr",
    "symbol": "KITTY",
    "name": "Kitty Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6XWfkyg5mzGtKNftSDgYjyoPyUsLRf2rafj95XSFSFrr/logo.png",
    "tags": [
      "meme-token",
      "kitty",
      "cat"
    ],
    "extensions": {
      "coingeckoId": "kitty-coin-solana",
      "coinmarketcap": "https://coinmarketcap.com/currencies/kitty-coin-solana/",
      "discord": "https://discord.gg/kittycoinsolana",
      "serumV3Usdc": "FAHa34qbNbvtEBHgjuALk4WLJMwxJTtV6Z3V3p79XLWG",
      "serumV3Usdt": "H8VLs7VYaBg3rg1NvVNJKb1QWMf3kzieTPkgPmVffXTx",
      "telegram": "https://t.me/kittycoinsolana_off",
      "twitter": "https://twitter.com/KittyCoinSolana",
      "website": "https://kittycoinsolana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "Ch9NFVk5sqEPQHtw2gJVgnHfTm7FW1JspYwc7SxLi6q3",
    "symbol": "MEND",
    "name": "Mend",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ch9NFVk5sqEPQHtw2gJVgnHfTm7FW1JspYwc7SxLi6q3/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/mendappinc",
      "website": "https://mend.house"
    }
  },
  {
    "chainId": 101,
    "address": "inL8PMVd6iiW3RCBJnr5AsrRN6nqr4BTrcNuQWQSkvY",
    "symbol": "IN",
    "name": "Sol Invictus",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/inL8PMVd6iiW3RCBJnr5AsrRN6nqr4BTrcNuQWQSkvY/logo-owl.png",
    "tags": [
      "decentralizedreserve",
      "utility-token",
      "DeFi",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "invictus",
      "discord": "https://discord.gg/invictusdao",
      "serumV3Usdc": "49vwM54DX3JPXpey2daePZPmimxA4CrkXLZ6E1fGxx2Z",
      "twitter": "https://twitter.com/InvictusDAO",
      "website": "https://invictusdao.fi/"
    }
  },
  {
    "chainId": 101,
    "address": "CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z",
    "symbol": "SHIB",
    "name": "SHIBA INU (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CiKu4eHsVrc1eueVQeHn7qhXTcVu95gSQmBpX4utjL9z/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      "assetContract": "https://etherscan.io/address/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "shiba-inu",
      "serumV3Usdc": "Er7Jp4PADPVHifykFwbVoHdkL1RtZSsx9zGJrPJTrCgW"
    }
  },
  {
    "chainId": 101,
    "address": "HysWcbHiYY9888pHbaqhwLYZQeZrcQMXKQWRqS7zcPK5",
    "symbol": "AXSet",
    "name": "Axie Infinity Shard (Portal from Ethereum)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HysWcbHiYY9888pHbaqhwLYZQeZrcQMXKQWRqS7zcPK5/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
      "assetContract": "https://etherscan.io/address/0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "axie-infinity",
      "serumV3Usdc": "HZCheduA4nsSuQpVww1TiyKZpXSAitqaXxjBD2ymg22X"
    }
  },
  {
    "chainId": 101,
    "address": "4Hx6Bj56eGyw8EJrrheM6LBQAvVYRikYCWsALeTrwyRU",
    "symbol": "DYDX",
    "name": "dYdX (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4Hx6Bj56eGyw8EJrrheM6LBQAvVYRikYCWsALeTrwyRU/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x92d6c1e31e14520e676a687f0a93788b716beff5",
      "assetContract": "https://etherscan.io/address/0x92d6c1e31e14520e676a687f0a93788b716beff5",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "dydx",
      "serumV3Usdc": "GNmTGd6iQvQApXgsyvHepDpCnvdRPiWzRr8kzFEMMNKN"
    }
  },
  {
    "chainId": 101,
    "address": "Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG",
    "symbol": "MATICpo",
    "name": "Matic (Portal from Polygon)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      "assetContract": "https://polygonscan.com/address/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      "bridgeContract": "https://polygonscan.com/address/0x5a58505a96d1dbf8df91cb21b54419fc36e93fde",
      "coingeckoId": "matic-network",
      "serumV3Usdc": "5WRoQxE59966N2XfD2wYy1uhuyKeoVJ9NBMH6r6RNYEF"
    }
  },
  {
    "chainId": 101,
    "address": "5RpUwQ8wtdPCZHhu6MERp2RGrpobsbZ6MH5dDHkUjs2",
    "symbol": "BUSDbs",
    "name": "BUSD Token (Portal from BSC)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5RpUwQ8wtdPCZHhu6MERp2RGrpobsbZ6MH5dDHkUjs2/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      "assetContract": "https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56",
      "bridgeContract": "https://bscscan.com/address/0xB6F6D86a8f9879A9c87f643768d9efc38c1Da6E7",
      "coingeckoId": "binance-usd"
    }
  },
  {
    "chainId": 101,
    "address": "kiNeKo77w1WBEzFFCXrTDRWGRWGP8yHvKC9rX6dqjQh",
    "symbol": "KKO",
    "name": "KKO Protocol",
    "decimals": 9,
    "logoURI": "https://www.arweave.net/lxCJWYgYzilFtAEzqbdvS9xN98-9cG4EvizAkgx1dCY?ext=png",
    "tags": [
      "DeFi",
      "Gaming",
      "Gambling"
    ]
  },
  {
    "chainId": 101,
    "address": "7osS84AkAG2TCrUvrE1wfKwfAqWTCrHnaCsrsyVJd5pY",
    "symbol": "THUG",
    "name": "Fraktionalized THUG 2856",
    "decimals": 3,
    "logoURI": "https://arweave.net/q4h6GvG6MQfhXXNJTbLILbZY1OIgLqkJNHzNLClHDiw",
    "tags": [
      "fractionalized-nft"
    ],
    "extensions": {
      "vault": "https://fraktion.art/vault/Hug8MsePSvyFcnKbkchnDdDQTJbWo2GZNchr3DE6vqrV",
      "vaultPubkey": "Hug8MsePSvyFcnKbkchnDdDQTJbWo2GZNchr3DE6vqrV"
    }
  },
  {
    "chainId": 101,
    "address": "4Te4KJgjtnZe4aE2zne8G4NPfrPjCwDmaiEx9rKnyDVZ",
    "symbol": "SCT",
    "name": "SolClout",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4Te4KJgjtnZe4aE2zne8G4NPfrPjCwDmaiEx9rKnyDVZ/logo.png",
    "tags": [
      "social-defi"
    ],
    "extensions": {
      "twitter": "https://twitter.com/solclout",
      "website": "https://www.solclout.com/"
    }
  },
  {
    "chainId": 101,
    "address": "A98UDy7z8MfmWnTQt6cKjje7UfqV3pTLf4yEbuwL2HrH",
    "symbol": "MODUL",
    "name": "Modul",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/parametrise/ParametriseLogo/main/Modul_Logomark_White_Pinky_Background.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "http://discord.gg/SyqUrzSGEC",
      "twitter": "https://twitter.com/Moduluc",
      "website": "https://moduluc.com/"
    }
  },
  {
    "chainId": 101,
    "address": "6StzwSrFeQEkF2xwADqdoz63RXR8dftf9BZnk91o52rm",
    "symbol": "PEACH",
    "name": "PEACHO TOKEN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6StzwSrFeQEkF2xwADqdoz63RXR8dftf9BZnk91o52rm/peach.png",
    "tags": [
      "community-token",
      "meme-token"
    ]
  },
  {
    "chainId": 101,
    "address": "7dgHoN8wBZCc5wbnQ2C47TDnBMAxG4Q5L3KjP67z8kNi",
    "symbol": "MANA",
    "name": "Decentraland (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dgHoN8wBZCc5wbnQ2C47TDnBMAxG4Q5L3KjP67z8kNi/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      "assetContract": "https://etherscan.io/address/0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "decentraland",
      "serumV3Usdc": "7GSn6KQRasgPQCHwCbuDjDCsyZ3cxVHKWFmBXzJUUW8P"
    }
  },
  {
    "chainId": 101,
    "address": "49c7WuCZkQgc3M4qH8WuEUNXfgwupZf1xqWkDQ7gjRGt",
    "symbol": "SAND",
    "name": "Sandbox (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/49c7WuCZkQgc3M4qH8WuEUNXfgwupZf1xqWkDQ7gjRGt/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x3845badade8e6dff049820680d1f14bd3903a5d0",
      "assetContract": "https://etherscan.io/address/0x3845badade8e6dff049820680d1f14bd3903a5d0",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "the-sandbox",
      "serumV3Usdc": "3FE2g3cadTJjN3C7gNRavwnv7Yh9Midq7h9KgTVUE7tR"
    }
  },
  {
    "chainId": 101,
    "address": "DktNJUJAWJyeLw3ykCkFNpGohE24SoEhevKBskRi6P1y",
    "symbol": "SOLBEAR",
    "name": "Solar Bear",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DktNJUJAWJyeLw3ykCkFNpGohE24SoEhevKBskRi6P1y/logo.png",
    "tags": [
      "utility-token",
      "meme-token",
      "dex"
    ],
    "extensions": {
      "discord": "https://discord.io/solarbear",
      "telegram": "https://t.me/solar_bear_official",
      "twitter": "https://twitter.com/solarbear_sol",
      "website": "https://solar-bear.com"
    }
  },
  {
    "chainId": 101,
    "address": "7aohFKctcbgaSzNTtfL1999hUy4tgDeUC7wLU1ozNmxc",
    "symbol": "CRAT",
    "name": "CRAT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7aohFKctcbgaSzNTtfL1999hUy4tgDeUC7wLU1ozNmxc/logo.png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/corporatslab",
      "serumV3Usdc": "8VD5vFACkFyR5G1Nz7xievERN4bjQE7YdLhiDKBMTFxV",
      "twitter": "https://twitter.com/RatataNFTs"
    }
  },
  {
    "chainId": 101,
    "address": "GV6n9Uow3XzMWSs8vwTCML8SvMA6ozbidaEfdPoSoraQ",
    "symbol": "SVIZ",
    "name": "Space Vizsla",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GV6n9Uow3XzMWSs8vwTCML8SvMA6ozbidaEfdPoSoraQ/VizslaMoonLogo100x100.png",
    "tags": [
      "meme-token",
      "community-token",
      "space-vizsla",
      "vizsla"
    ],
    "extensions": {
      "telegram": "https://t.me/VizslaToken",
      "website": "https://vizslatoken.org"
    }
  },
  {
    "chainId": 101,
    "address": "GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz",
    "symbol": "GENE",
    "name": "Genopets",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GENEtH5amGSi8kHAtQoezp1XEXwZJ8vcuePYnXdKrMYz/logo.png",
    "tags": [
      "genopets",
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "genopets",
      "discord": "https://discord.gg/genopets",
      "serumV3Usdc": "FwZ2GLyNNrFqXrmR8Sdkm9DQ61YnQmxS6oobeH3rrLUM",
      "twitter": "https://twitter.com/genopets",
      "website": "https://genopets.me"
    }
  },
  {
    "chainId": 101,
    "address": "sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE",
    "symbol": "SONAR",
    "name": "Sonar Watch",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "sonarwatch",
      "discord": "https://discord.gg/sonarwatch",
      "twitter": "https://twitter.com/Sonarwatch",
      "website": "https://sonar.watch/"
    }
  },
  {
    "chainId": 101,
    "address": "FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq",
    "symbol": "FOXY",
    "name": "Famous Fox Federation",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq/logo.png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/famousfoxes",
      "twitter": "https://twitter.com/famousfoxfed",
      "website": "https://famousfoxes.com/"
    }
  },
  {
    "chainId": 101,
    "address": "DK6PWMyuZ4NMjsm9AWNCTMKrajQYrtfMjMJ3QauX2UH5",
    "symbol": "BITXBIT",
    "name": "BITXBIT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DK6PWMyuZ4NMjsm9AWNCTMKrajQYrtfMjMJ3QauX2UH5/logo.png",
    "tags": [
      "social-token",
      "technology",
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/bitXbit_aus",
      "website": "https://bitxbit.com.au"
    }
  },
  {
    "chainId": 101,
    "address": "gmdu3snwW28DmmxCseChp9owWLUhamH9eS3hWfHG8Vg",
    "symbol": "GMSOL",
    "name": "We Say gm",
    "decimals": 9,
    "logoURI": "https://github.com/icnivadmai/gm-logo/blob/master/logo.png",
    "tags": [
      "community-token",
      "meme-token",
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/3KYEhaHFN5",
      "twitter": "https://twitter.com/officialwesaygm",
      "website": "https://www.wesaygm.com/"
    }
  },
  {
    "chainId": 101,
    "address": "CBPfSGeSf76o3r4628k7BcZ5YBNxHh7hkCzu4AmVgk2Q",
    "symbol": "KSOL",
    "name": "KITTYCOIN SOL",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CBPfSGeSf76o3r4628k7BcZ5YBNxHh7hkCzu4AmVgk2Q/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "facebook": "https://facebook.com/KittycoinSOL",
      "telegram": "https://t.me/KittycoinSOL",
      "twitter": "https://twitter.com/KittycoinSOL",
      "website": "https://kittycoinsol.com/",
      "youtube": "https://www.youtube.com/channel/UCRn6xC1Gmr6enUia-mg2rIA"
    }
  },
  {
    "chainId": 101,
    "address": "GLmaRDRmYd4u3YLfnj9eq1mrwxa1YfSweZYYZXZLTRdK",
    "symbol": "SOLAB",
    "name": "Solabrador",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GLmaRDRmYd4u3YLfnj9eq1mrwxa1YfSweZYYZXZLTRdK/solabradon250x250.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "coingeckoId": "solabrador",
      "discord": "https://discord.gg/8HJK4apjd7",
      "serumV3Usdc": "5m7CdEhV6Tq5KnSCy5Cg4w6ug5DFCcHrUJ8JMzKVDdav",
      "twitter": "https://twitter.com/Solabrador",
      "website": "https://solabrador.com"
    }
  },
  {
    "chainId": 101,
    "address": "EswgBj2hZKdgovX2ihWSUDnuBg9VNbGmSGoH5yjNsPRa",
    "symbol": "PHY",
    "name": "Physis",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EswgBj2hZKdgovX2ihWSUDnuBg9VNbGmSGoH5yjNsPRa/logo.png",
    "tags": [
      "utility-token",
      "metaverse",
      "multiverse",
      "wellness",
      "extended-reality",
      "augmented-reality",
      "virtual-reality",
      "mixed-reality",
      "physis"
    ],
    "extensions": {
      "coingeckoId": "physis",
      "discord": "https://discord.gg/jQ4fXyD6cz",
      "telegram": "https://t.me/PhysisVerse",
      "twitter": "https://twitter.com/PhysisVerse",
      "website": "https://phys.is/"
    }
  },
  {
    "chainId": 101,
    "address": "E9bjYSAqabYAd2Zaev4qAMVNAiX7Z2Dp4Sn1JgsTn2b6",
    "symbol": "CCC",
    "name": "Chairman Chow",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E9bjYSAqabYAd2Zaev4qAMVNAiX7Z2Dp4Sn1JgsTn2b6/logo.png",
    "tags": [
      "meme-token",
      "community-token",
      "doge-token",
      "doge"
    ],
    "extensions": {
      "discord": "https://discord.gg/8twDmsWega",
      "telegram": "https://t.me/joinchat/1XaURMrPqOBjNWVk",
      "twitter": "https://twitter.com/chairmanofdoge",
      "website": "https://www.chairmanchowtoken.com"
    }
  },
  {
    "chainId": 101,
    "address": "4tJZhSdGePuMEfZQ3h5LaHjTPsw1iWTRFTojnZcwsAU6",
    "symbol": "ELU",
    "name": "Elumia Crowns",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4tJZhSdGePuMEfZQ3h5LaHjTPsw1iWTRFTojnZcwsAU6/logo.png",
    "tags": [
      "governance-token",
      "elumia",
      "LOE",
      "elumia-crowns"
    ],
    "extensions": {
      "twitter": "https://twitter.com/PlayElumia"
    }
  },
  {
    "chainId": 101,
    "address": "GDsVXtyt2CBwieKSYMEsjjZXXvqz2G2VwudD7EvXzoEU",
    "symbol": "HIRAM",
    "name": "Hiram Coin",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GDsVXtyt2CBwieKSYMEsjjZXXvqz2G2VwudD7EvXzoEU/logo.png",
    "tags": [
      "community-token",
      "meme-token"
    ],
    "extensions": {
      "coingeckoId": "hiram-coin",
      "website": "https://freemason-coin.io"
    }
  },
  {
    "chainId": 101,
    "address": "EzL6LLmv4vgfF7irkjG7ZxM92bTJ9f6nFopDXJTow7zj",
    "symbol": "CONDOMS",
    "name": "Solana Condoms",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EzL6LLmv4vgfF7irkjG7ZxM92bTJ9f6nFopDXJTow7zj/logo.png",
    "tags": [
      "Meme",
      "community",
      "utility-token",
      "nft"
    ],
    "extensions": {
      "twitter": "https://twitter.com/solcondoms",
      "website": "http://solcondoms.xyz/"
    }
  },
  {
    "chainId": 101,
    "address": "CmSryDa4mnDYUicq7qSESsTKAdgBP26jSYcg8zavVoJd",
    "symbol": "GM",
    "name": "GM Solana",
    "decimals": 7,
    "logoURI": "https://cdn.jsdelivr.net/gh/brendanhernou/gm/GMSolana.jpg",
    "tags": [
      "social-token",
      "GM-Solana",
      "Goodmorning",
      "GM"
    ],
    "extensions": {
      "website": "https://gmsol.io"
    }
  },
  {
    "chainId": 101,
    "address": "icex2Fy2KtXjfiAAUEHLPHu7XKDLvwiyVUPP9PNpSkF",
    "symbol": "ICE",
    "name": "Infinity Diamonds ICE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/icex2Fy2KtXjfiAAUEHLPHu7XKDLvwiyVUPP9PNpSkF/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "NFTs"
    ],
    "extensions": {
      "discord": "https://discord.gg/fancydiamondsol/",
      "twitter": "https://twitter.com/fancydiamondsol",
      "website": "https://holdfancy.diamonds/"
    }
  },
  {
    "chainId": 101,
    "address": "Aogv6j1wWiBAZcqRNN1Y89eozda2ke6rkc4CYy7c4iCi",
    "symbol": "JUNGLE",
    "name": "Jungle",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Aogv6j1wWiBAZcqRNN1Y89eozda2ke6rkc4CYy7c4iCi/logo.png",
    "extensions": {
      "coingeckoId": "jungle",
      "discord": "https://discord.gg/7qjTkEkUuu",
      "twitter": "https://twitter.com/thugmonkez",
      "website": "https://thugmonkez.com/"
    }
  },
  {
    "chainId": 101,
    "address": "AD27ov5fVU2XzwsbvnFvb1JpCBaCB5dRXrczV9CqSVGb",
    "symbol": "REAL",
    "name": "Realy Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AD27ov5fVU2XzwsbvnFvb1JpCBaCB5dRXrczV9CqSVGb/logo.svg",
    "tags": [
      "Metaverse",
      "Governance-token"
    ],
    "extensions": {
      "serumV3Usdc": "AU8VGwd4NGRbcMz9LT6Fu2LP69LPAbWUJ6gEfEgeYM33",
      "telegram": "https://t.me/realyofficial",
      "twitter": "https://twitter.com/RealyOfficial",
      "website": "https://realy.pro/"
    }
  },
  {
    "chainId": 101,
    "address": "APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt",
    "symbol": "APT",
    "name": "Apricot",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/APTtJyaRX5yGTsJU522N4VYWg3vCvSb65eam5GrPT5Rt/logo.svg",
    "tags": [
      "apricot",
      "lending",
      "x-farm"
    ],
    "extensions": {
      "coingeckoId": "apricot",
      "discord": "https://discord.gg/Aw6MEUue",
      "medium": "https://apricotfinance.medium.com/",
      "twitter": "https://twitter.com/ApricotFinance",
      "website": "https://apricot.one"
    }
  },
  {
    "chainId": 101,
    "address": "D3cm6WRnyBct3p7vFqyTt2CaynsGPuVQT2zW6WHSTX6q",
    "symbol": "THECA",
    "name": "Theca",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3cm6WRnyBct3p7vFqyTt2CaynsGPuVQT2zW6WHSTX6q/logo.png",
    "tags": [
      "utility-token",
      "Application"
    ],
    "extensions": {
      "address": "D3cm6WRnyBct3p7vFqyTt2CaynsGPuVQT2zW6WHSTX6q",
      "coingeckoId": "theca",
      "coinmarketcap": "https://coinmarketcap.com/currencies/theca/",
      "description": "Theca has the mission to protect, spread and promote knowledge through blockchain technology, making the works of authors accessible to anyone. Theca: the first blockchain library",
      "discord": "https://discord.com/invite/YfbVenPbvq",
      "instagram": "https://www.instagram.com/theca_org",
      "medium": "https://theca.medium.com/",
      "serumV3Usdc": "6uH2rvVUySwnVFw7CMNV4HTzuxHTUNC7pK22pXcqgSey",
      "twitter": "https://twitter.com/Theca_org",
      "website": "https://theca.org"
    }
  },
  {
    "chainId": 101,
    "address": "3xXMjiMyu4hthrVWmsxvBrKtehBWFgSKRnGB9Je4mmdA",
    "symbol": "SINGULARITY",
    "name": "Singularity",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3xXMjiMyu4hthrVWmsxvBrKtehBWFgSKRnGB9Je4mmdA/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "blog": "https://blog.singularityonline.app",
      "description": "Singularity Online in-game currency Token",
      "twitter": "https://twitter.com/SingularityMeta",
      "website": "https://singularityonline.app",
      "whitepaper": "https://whitepaper.singularityonline.app"
    }
  },
  {
    "chainId": 101,
    "address": "DhfF81uahANRYQ4rn8VZKSGVmLE4k2nzccgfZMazmLJ2",
    "symbol": "TIPZ",
    "name": "Tipzcoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DhfF81uahANRYQ4rn8VZKSGVmLE4k2nzccgfZMazmLJ2/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/tipzcoin"
    }
  },
  {
    "chainId": 101,
    "address": "4ThReWAbAVZjNVgs5Ui9Pk3cZ5TYaD9u6Y89fp6EFzoF",
    "symbol": "1SOL",
    "name": "1sol.io Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4ThReWAbAVZjNVgs5Ui9Pk3cZ5TYaD9u6Y89fp6EFzoF/logo.png",
    "tags": [
      "wrapped",
      "utility-token",
      "aggregator"
    ],
    "extensions": {
      "coinmarketcap": "https://coinmarketcap.com/currencies/1sol/",
      "description": "1Sol aggregates DEX(s), lending, yield-farming, and cross-chain trading.",
      "discord": "https://discord.gg/juvVBKnvkj",
      "github": "https://github.com/1sol-io",
      "medium": "https://medium.com/@1solProtocol",
      "telegram": "https://t.me/onesolcommunity",
      "twitter": "https://twitter.com/1solProtocol",
      "website": "https://app.1sol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "DmXfDUeyRJqnpvdjssGgUXwZrRFPXvu2DfMq4jfTTC9C",
    "symbol": "WEENS",
    "name": "Ween",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DmXfDUeyRJqnpvdjssGgUXwZrRFPXvu2DfMq4jfTTC9C/logo.png",
    "tags": [
      "meme-token"
    ],
    "extensions": {
      "coingeckoId": "ween-token",
      "description": "Ween Token, a meme coin for people who love wiener dogs.",
      "discord": "https://discord.gg/longweenclub",
      "twitter": "https://twitter.com/weentoken",
      "website": "https://weentoken.com"
    }
  },
  {
    "chainId": 101,
    "address": "CAPYD6Lrm7bTZ6C7t7JvSxvpEcfKQ9YNB7kUjh6p6XBN",
    "symbol": "CAPY",
    "name": "Capybara",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CAPYD6Lrm7bTZ6C7t7JvSxvpEcfKQ9YNB7kUjh6p6XBN/logo.png",
    "tags": [
      "meme",
      "Nft"
    ],
    "extensions": {
      "website": "http://www.capybaraworld.com/"
    }
  },
  {
    "chainId": 101,
    "address": "9TE7ebz1dsFo1uQ2T4oYAKSm39Y6fWuHrd6Uk6XaiD16",
    "symbol": "MIMO",
    "name": "Million Monke",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9TE7ebz1dsFo1uQ2T4oYAKSm39Y6fWuHrd6Uk6XaiD16/logo.png",
    "extensions": {
      "discord": "https://discord.com/invite/rznuTnenPJ",
      "medium": "https://medium.com/@mimo_3408",
      "twitter": "https://twitter.com/MillionMonke",
      "website": "https://millionmonke.com/"
    }
  },
  {
    "chainId": 101,
    "address": "2946ofy854iifvXCQmHX2AJgxRBoQcchy1gfD26RtkHp",
    "symbol": "SHIBT",
    "name": "SHIBA LIGHT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2946ofy854iifvXCQmHX2AJgxRBoQcchy1gfD26RtkHp/logo.png",
    "tags": [
      "DEX",
      "MEME"
    ],
    "extensions": {
      "discord": "https://discord.gg/aWcp7uRe",
      "telegram": "https://t.me/shiba_light",
      "website": "https://shibalight.com"
    }
  },
  {
    "chainId": 101,
    "address": "PoLEXM5xikzieXENFvP7WwHJPorcFiCUVuMo9BAGZT3",
    "symbol": "POLE",
    "name": "Pole Aggregator Governance Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PoLEXM5xikzieXENFvP7WwHJPorcFiCUVuMo9BAGZT3/logo.svg",
    "extensions": {
      "discord": "https://discord.gg/RASngHfHhS",
      "github": "https://github.com/pole-finance",
      "medium": "https://medium.com/pole-aggregator",
      "serumV3Usdc": "Ak1UDskYAjztX5YkxW8dmERjLwS9fYmk1b3G6fpWDxp6",
      "twitter": "https://twitter.com/Pole_Finance",
      "website": "https://pole.finance"
    }
  },
  {
    "chainId": 101,
    "address": "seedEDBqu63tJ7PFqvcbwvThrYUkQeqT6NLf81kLibs",
    "symbol": "SEEDED",
    "name": "Seeded Network",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/seedEDBqu63tJ7PFqvcbwvThrYUkQeqT6NLf81kLibs/logo.png",
    "tags": [
      "lending",
      "defi"
    ],
    "extensions": {
      "discord": "https://seeded.network/discord",
      "medium": "https://blog.seeded.network/",
      "reddit": "https://reddit.com/r/SeededNetwork",
      "twitter": "https://twitter.com/SeededNetwork",
      "website": "https://seeded.network"
    }
  },
  {
    "chainId": 101,
    "address": "CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT",
    "symbol": "CASH",
    "name": "Cashio Dollar",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT/icon.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "cashio-dollar",
      "discord": "https://discord.com/invite/GmkRRKJkuh",
      "medium": "https://medium.com/@cashioapp",
      "twitter": "https://twitter.com/CashioApp",
      "website": "https://cashio.app"
    }
  },
  {
    "chainId": 101,
    "address": "DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh",
    "symbol": "DFL",
    "name": "DeFi Land",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "defi-land",
      "coinmarketcap": "https://coinmarketcap.com/currencies/defi-land",
      "discord": "https://discord.com/invite/defiland",
      "medium": "https://defiland.medium.com/",
      "serumV3Usdc": "9UBuWgKN8ZYXcZWN67Spfp3Yp67DKBq1t31WLrVrPjTR",
      "telegram": "https://t.me/defiland_official",
      "twitter": "https://twitter.com/DeFi_Land",
      "website": "https://defiland.app/"
    }
  },
  {
    "chainId": 101,
    "address": "HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW",
    "symbol": "STARS",
    "name": "StarLaunch",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HCgybxq5Upy8Mccihrp7EsmwwFqYZtrHrsmsKwtGXLgW/logo.png",
    "extensions": {
      "coingeckoId": "starlaunch",
      "telegram": "https://t.me/StarLaunchOfficial",
      "twitter": "https://twitter.com/StarLaunchSOL",
      "website": "https://www.starlaunch.com/"
    }
  },
  {
    "chainId": 101,
    "address": "88881Hu2jGMfCs9tMu5Rr7Ah7WBNBuXqde4nR5ZmKYYy",
    "symbol": "sUSDC-8",
    "name": "Saber Wrapped USD Coin (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/88881Hu2jGMfCs9tMu5Rr7Ah7WBNBuXqde4nR5ZmKYYy/icon.png",
    "tags": [
      "stablecoin",
      "saber-market-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "usd-coin",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "9999j2A8sXUtHtDoQdk528oVzhaKBsXyRGZ67FKGoi7H",
    "symbol": "sBTC-9",
    "name": "Saber Wrapped Bitcoin (Sollet) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9999j2A8sXUtHtDoQdk528oVzhaKBsXyRGZ67FKGoi7H/icon.png",
    "tags": [
      "wrapped-sollet",
      "ethereum",
      "saber-market-btc",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "bitcoin",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "AEUT5uFm1D575FVCoQd5Yq891FJEqkncZUbBFoFcAhTV",
    "symbol": "sUSDT-9",
    "name": "Saber Wrapped USDT (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AEUT5uFm1D575FVCoQd5Yq891FJEqkncZUbBFoFcAhTV/icon.png",
    "tags": [
      "stablecoin",
      "saber-market-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "tether",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "BtX7AfzEJLnU8KQR1AgHrhGH5s2AHUTbfjhUQP8BhPvi",
    "symbol": "srenBTC-10",
    "name": "Saber Wrapped renBTC (10 decimals)",
    "decimals": 10,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BtX7AfzEJLnU8KQR1AgHrhGH5s2AHUTbfjhUQP8BhPvi/icon.png",
    "tags": [
      "saber-market-btc",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "renbtc",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "C9xqJe3gMTUDKidZsZ6jJ7tL9zSLimDUKVpgUbLZnNbi",
    "symbol": "sCASH-9",
    "name": "Saber Wrapped CASH (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/C9xqJe3gMTUDKidZsZ6jJ7tL9zSLimDUKVpgUbLZnNbi/icon.png",
    "tags": [
      "stablecoin",
      "saber-market-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "usd-coin",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "FACTQhZBfRzC7A76antnpAoZtiwYmUfdAN8wz7e8rxC5",
    "symbol": "srenBTC-9",
    "name": "Saber Wrapped renBTC (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FACTQhZBfRzC7A76antnpAoZtiwYmUfdAN8wz7e8rxC5/icon.png",
    "tags": [
      "saber-market-btc",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "renbtc",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "FTT9GrHBVHvDeUTgLU8FxVJouGqg9uiWGmmjETdm32Sx",
    "symbol": "swFTT-9",
    "name": "Saber Wrapped FTT (Portal) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FTT9GrHBVHvDeUTgLU8FxVJouGqg9uiWGmmjETdm32Sx/icon.png",
    "tags": [
      "saber-market-ftt",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "ftx-token",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "FTT9rBBrYwcHam4qLvkzzzhrsihYMbZ3k6wJbdoahxAt",
    "symbol": "sFTT-9",
    "name": "Saber Wrapped Wrapped FTT (Sollet) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FTT9rBBrYwcHam4qLvkzzzhrsihYMbZ3k6wJbdoahxAt/icon.png",
    "tags": [
      "wrapped-sollet",
      "ethereum",
      "saber-market-ftt",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "ftx-token",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "JEFFSQ3s8T3wKsvp4tnRAsUBW7Cqgnf8ukBZC4C8XBm1",
    "symbol": "sUSDC-9",
    "name": "Saber Wrapped USD Coin (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JEFFSQ3s8T3wKsvp4tnRAsUBW7Cqgnf8ukBZC4C8XBm1/icon.png",
    "tags": [
      "stablecoin",
      "saber-market-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "usd-coin",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "KNVfdSJyq1pRQk9AKKv1g5uyGuk6wpm4WG16Bjuwdma",
    "symbol": "swhETH-9",
    "name": "Saber Wrapped Ether (Portal) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KNVfdSJyq1pRQk9AKKv1g5uyGuk6wpm4WG16Bjuwdma/icon.png",
    "tags": [
      "saber-market-eth",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "ethereum",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "KUANeD8EQvwpT1W7QZDtDqctLEh2FfSTy5pThE9CogT",
    "symbol": "srenLUNA-9",
    "name": "Saber Wrapped renLUNA (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KUANeD8EQvwpT1W7QZDtDqctLEh2FfSTy5pThE9CogT/icon.png",
    "tags": [
      "saber-market-luna",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "SBTCB6pWqeDo6zGi9WVRMLCsKsN6JiR1RMUqvLtgSRv",
    "symbol": "sBTC-8",
    "name": "Saber Wrapped Bitcoin (Sollet) (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SBTCB6pWqeDo6zGi9WVRMLCsKsN6JiR1RMUqvLtgSRv/icon.png",
    "tags": [
      "wrapped-sollet",
      "ethereum",
      "saber-market-btc",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "bitcoin",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "SL819j8K9FuFPL84UepVcFkEZqDUUvVzwDmJjCHySYj",
    "symbol": "sETH-8",
    "name": "Saber Wrapped Ethereum (Sollet) (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SL819j8K9FuFPL84UepVcFkEZqDUUvVzwDmJjCHySYj/icon.png",
    "tags": [
      "wrapped-sollet",
      "ethereum",
      "saber-market-eth",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "ethereum",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "6uZ7MRGGf3FJhzk9TUk3QRMR2fz83WY9BEVBukRvMRVX",
    "symbol": "NANA",
    "name": "NANA",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6uZ7MRGGf3FJhzk9TUk3QRMR2fz83WY9BEVBukRvMRVX/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "chimp-fight",
      "discord": "https://discord.gg/zJ9wQYzBsB",
      "medium": "https://medium.com/@chimpfight",
      "twitter": "https://twitter.com/chimpfightgame",
      "website": "https://chimpfight.io"
    }
  },
  {
    "chainId": 101,
    "address": "Qikhhhg9Ta3Jg7WoDFbSYuCAE14hx9hPvdz1zVp3zUw",
    "symbol": "BURD",
    "name": "tudaBirds Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Qikhhhg9Ta3Jg7WoDFbSYuCAE14hx9hPvdz1zVp3zUw/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "tudabirds metaNest",
      "discord": "https://discord.gg/tudabirds",
      "facebook": "https://business.facebook.com/tudabirds",
      "instagram": "https://www.instagram.com/tudabirds",
      "medium": "https://tudabirds.medium.com",
      "telegram": "https://t.me/tudabirdsgroup",
      "website": "https://tudabirds.io"
    }
  },
  {
    "chainId": 101,
    "address": "6naWDMGNWwqffJnnXFLBCLaYu1y5U9Rohe5wwJPHvf1p",
    "symbol": "SCRAP",
    "name": "SCRAP",
    "decimals": 3,
    "logoURI": "https://art.pixilart.com/bd1b1275fdc0ac1.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/taiyorobotics",
      "website": "https://taiyorobotics.com/"
    }
  },
  {
    "chainId": 101,
    "address": "FNFKRV3V8DtA3gVJN6UshMiLGYA8izxFwkNWmJbFjmRj",
    "symbol": "TTT",
    "name": "TabTrader Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FNFKRV3V8DtA3gVJN6UshMiLGYA8izxFwkNWmJbFjmRj/logo.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "tabtrader",
      "description": "TabTrader allows users to trade anywhere and anytime from their mobile device with all the main crypto exchanges accessible through a unified interface.",
      "discord": "https://discord.gg/pSMjEh7paU",
      "medium": "https://medium.com/@tabtraderbtc",
      "telegram": "https://t.me/tabtrader_token_en",
      "twitter": "https://twitter.com/tabtraderpro",
      "website": "https://tab-trader.com/",
      "youtube": "https://www.youtube.com/c/TabTrader"
    }
  },
  {
    "chainId": 101,
    "address": "E77cpQ4VncGmcAXX16LHFFzNBEBb2U7Ar7LBmZNfCgwL",
    "symbol": "abUSDT",
    "name": "Wrapped USDT (Allbridge from BSC)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "tether"
    }
  },
  {
    "chainId": 101,
    "address": "8XSsNvaKU9FDhYWAv7Yc7qSNwuJSzVrXBNEk7AFiWF69",
    "symbol": "abUSDC",
    "name": "Wrapped USDC (Allbridge from BSC)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "3os2M3bX9qta154PRbU9rzaPUYAKAqVpaMMS8u2hoUQu",
    "symbol": "abBTCB",
    "name": "Wrapped BTC (Allbridge from BSC)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png",
    "extensions": {
      "coingeckoId": "wrapped-bitcoin"
    }
  },
  {
    "chainId": 101,
    "address": "EyrnrbE5ujd3HQG5PZd9MbECN9yaQrqc8pRwGtaLoyC",
    "symbol": "abETH",
    "name": "Wrapped ETH (Allbridge from BSC)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png",
    "extensions": {
      "coingeckoId": "weth"
    }
  },
  {
    "chainId": 101,
    "address": "3DHPqxdMXogNNnpqBMF8N4Zs4dn1WR31H7UjWq6FExwG",
    "symbol": "DAWG",
    "name": "DAWG",
    "decimals": 9,
    "logoURI": "https://user-images.githubusercontent.com/15795037/143055147-72513c02-be9b-4639-bb30-3c1c037cb030.png",
    "tags": [
      "doge-capital",
      "meme-token"
    ],
    "extensions": {
      "coingeckoId": "dawg",
      "discord": "https://discord.com/invite/DeM5VFF29v",
      "twitter": "https://twitter.com/thedogecapital",
      "website": "https://www.thedogecapital.com/"
    }
  },
  {
    "chainId": 101,
    "address": "RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a",
    "symbol": "RLB",
    "name": "Rollbit Coin",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "stake-pool-token",
      "lottery"
    ],
    "extensions": {
      "description": "Stake your RLB on rollbit.com to participate in a profit share distribution every 100 Bitcoin blocks",
      "discord": "https://discord.gg/Mwx3zqH",
      "facebook": "https://facebook.com/Rollbit",
      "instagram": "https://instagram.com/rollbitcom",
      "serumV3Usdc": "DFdcGFcAVWZ3UgVgpbBChFKen3URZdZ8dmju8GTXQgCE",
      "twitter": "https://twitter.com/rollbitcom",
      "website": "https://www.rollbit.com"
    }
  },
  {
    "chainId": 101,
    "address": "88YqDBWxYhhwPbExF966EdaCYBKP51xVm1oGBcbWzcf2",
    "symbol": "GRLC",
    "name": "Garlic",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/88YqDBWxYhhwPbExF966EdaCYBKP51xVm1oGBcbWzcf2/logo.png",
    "tags": [
      "utility-token",
      "nfts"
    ],
    "extensions": {
      "description": "The Ivy Vampires Garlic Token",
      "discord": "https://discord.gg/X6rgFCSQ",
      "twitter": "https://twitter.com/IvyVampires",
      "website": "https://www.ivyvampires.com/"
    }
  },
  {
    "chainId": 101,
    "address": "T8KdT8hDzNhbGx5sjpEUxepnbDB1TZoCa7vtC5JjsMw",
    "symbol": "sUSDT-8",
    "name": "Saber Wrapped USDT (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/T8KdT8hDzNhbGx5sjpEUxepnbDB1TZoCa7vtC5JjsMw/icon.png",
    "tags": [
      "stablecoin",
      "saber-mkt-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "tether",
      "serumV3Usdc": "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "5gs8nf4wojB5EXgDUWNLwXpknzgV2YWDhveAeBZpVLbp",
    "symbol": "XTAG",
    "name": "xHashtag Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5gs8nf4wojB5EXgDUWNLwXpknzgV2YWDhveAeBZpVLbp/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/xhashtagio",
      "website": "https://www.xhashtag.io/"
    }
  },
  {
    "chainId": 101,
    "address": "5K1JtWpdSksVKaL6R2DuLpCDAjzxK6sq2CpXaXDWHVLg",
    "symbol": "YORK",
    "name": "Yorkipoo",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5K1JtWpdSksVKaL6R2DuLpCDAjzxK6sq2CpXaXDWHVLg/logo.png",
    "tags": [
      "community-token",
      "meme-token",
      "social-token"
    ],
    "extensions": {
      "telegram": "https://t.me/yorkipoocoin",
      "twitter": "https://twitter.com/yorkipoocoin",
      "website": "https://yorkipoocoin.com"
    }
  },
  {
    "chainId": 101,
    "address": "HZNpqL7RT9gxf9eWoWsWzC5DfjzQ41XTQgEA7p3VzaaD",
    "symbol": "TWT",
    "name": "Trust Wallet (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZNpqL7RT9gxf9eWoWsWzC5DfjzQ41XTQgEA7p3VzaaD/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
      "assetContract": "https://bscscan.com/address/0x4B0F1812e5Df2A09796481Ff14017e6005508003",
      "bridgeContract": "https://bscscan.com/address/0x4B0F1812e5Df2A09796481Ff14017e6005508003",
      "coingeckoId": "trust-wallet-token",
      "twitter": "https://twitter.com/trustwallet",
      "website": "https://trustwallet.com"
    }
  },
  {
    "chainId": 101,
    "address": "SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M",
    "symbol": "SNTR",
    "name": "Sentre",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "sentre",
      "discord": "https://discord.gg/FyHJgQ7W",
      "medium": "https://sentre.medium.com",
      "telegram": "https://t.me/Sentre",
      "twitter": "https://twitter.com/SentreProtocol",
      "website": "https://sentre.io"
    }
  },
  {
    "chainId": 101,
    "address": "56tNQ29XBrbovm5K5SThuQatjCy92w2wKUaUeQ8WCD9g",
    "symbol": "CRYY",
    "name": "CRY Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/56tNQ29XBrbovm5K5SThuQatjCy92w2wKUaUeQ8WCD9g/logo.png",
    "tags": [
      "meme-token"
    ],
    "extensions": {
      "coingeckoId": "cry-coin",
      "discord": "https://discord.gg/kkY6dT4ARX",
      "twitter": "https://twitter.com/crycoinofficial",
      "website": "https://crycoin.io"
    }
  },
  {
    "chainId": 101,
    "address": "45wdSjpSqZCk9mkqmq5Nh7beCEqqUJMJcVduwYCip5eq",
    "symbol": "BOFB",
    "name": "BofB",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/45wdSjpSqZCk9mkqmq5Nh7beCEqqUJMJcVduwYCip5eq/logo.svg",
    "tags": [
      "utility-token",
      "social-token",
      "community-token",
      "BankOfBitcoin",
      "bofb",
      "metaverse"
    ],
    "extensions": {
      "description": "BofB is where Bank meets Bitcoin. BofB's vision is to become a transitional platform that will help connect the old banking system with how everyone will bank in the future. Our mission is to help achieve the right to bank to everyone by allowing the entire world to be able to access our platform as long as they can meet the most simple requirement which is wanting to join our platform. KYC and AML will be mandatory but banking should be easy and for everyone in the world. Our main strategy will be to have the strongest presence in the Metaverse.",
      "discord": "https://discord.gg/7kcg2rxDxb",
      "instagram": "https://www.instagram.com/bofbdc",
      "telegram": "https://t.me/bofbdc",
      "twitter": "https://twitter.com/bofbdc",
      "website": "https://bofb.com"
    }
  },
  {
    "chainId": 101,
    "address": "2ASbApnFVSTp2RJvMLgLVfbDwJvu1FRXdhJWrGs89Lhj",
    "symbol": "aeMIM",
    "name": "Wrapped MIM (Allbridge from Ethereum)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2ASbApnFVSTp2RJvMLgLVfbDwJvu1FRXdhJWrGs89Lhj/logo.png",
    "extensions": {
      "coingeckoId": "magic-internet-money"
    }
  },
  {
    "chainId": 101,
    "address": "FdvkkCbCgYht1xTR1W9MBJhEF1JEPVhHtW1NXBYRzZts",
    "symbol": "afBTC",
    "name": "Wrapped BTC (Allbridge from Fantom)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png",
    "extensions": {
      "coingeckoId": "wrapped-bitcoin"
    }
  },
  {
    "chainId": 101,
    "address": "BiryxNvVTABRs3pEE4fvVuu4d17aAYEsNmcPnJ8E8WeT",
    "symbol": "afETH",
    "name": "Wrapped ETH (Allbridge from Fantom)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png",
    "extensions": {
      "coingeckoId": "weth"
    }
  },
  {
    "chainId": 101,
    "address": "Grk6b4UMRWkgyq4Y6S1BnNRF4hRgtnMFp7Sorkv6Ez4u",
    "symbol": "afUSDC",
    "name": "Wrapped USDC (Allbridge from Fantom)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usd-coin"
    }
  },
  {
    "chainId": 101,
    "address": "HjUhUzi6fVkY1BndaSc4Dcg2mCzvnqzXjVJtXsj78ver",
    "symbol": "afDAI",
    "name": "Wrapped DAI (Allbridge from Fantom)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FYpdBuyAHSbdaAyD1sKkxyLWbAP8uUW9h6uvdhK74ij1/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "dai"
    }
  },
  {
    "chainId": 101,
    "address": "Frog8vt6gmuuUuuerd7ispP6yavssBUtMpEP5DCEuUgD",
    "symbol": "$FROG",
    "name": "Frog",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Frog8vt6gmuuUuuerd7ispP6yavssBUtMpEP5DCEuUgD/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/pepepunksnft",
      "website": "https://pepepunks.net"
    }
  },
  {
    "chainId": 101,
    "address": "6j14WyX1Ag2pLWvn99euK4xp2VcZD62VeJv2iwCrYmT8",
    "symbol": "$KSH",
    "name": "Keeshond Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6j14WyX1Ag2pLWvn99euK4xp2VcZD62VeJv2iwCrYmT8/logo.png",
    "tags": [
      "Meme-Token",
      "NFT"
    ],
    "extensions": {
      "twitter": "https://twitter.com/KeeshondC",
      "website": "https://keeshondcoin.com/"
    }
  },
  {
    "chainId": 101,
    "address": "5L2YboFbHAUpBDDJjvDB5M6pu9CW2FRjyDB2asZyvjtE",
    "symbol": "PIXL",
    "name": "Pixels.so Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5L2YboFbHAUpBDDJjvDB5M6pu9CW2FRjyDB2asZyvjtE/logo.png",
    "tags": [
      "utility-token",
      "NFT",
      "DeFi"
    ],
    "extensions": {
      "description": "Borrow Against Your NFTs - Deposit NFTs to Earn Yield.",
      "discord": "https://discord.gg/rMdRdhTQ",
      "telegram": "https://t.me/pixels_official",
      "twitter": "https://twitter.com/pixels_so",
      "website": "https://www.pixels.so"
    }
  },
  {
    "chainId": 101,
    "address": "G7eETAaUzmsBPKhokZyfbaT4tD9igdZSmfQGEYWem8Sw",
    "symbol": "EYE",
    "name": "NftEyez Coin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/NftEyez/assets/main/assets/eye-coin.png",
    "tags": [
      "nfteyez"
    ],
    "extensions": {
      "discord": "https://discord.gg/mfAvPq9v",
      "twitter": "https://twitter.com/eyeznft",
      "website": "https://nfteyez.global"
    }
  },
  {
    "chainId": 101,
    "address": "7xd71KP4HwQ4sM936xL8JQZCwE4amUko1AdCCf6Znjrt",
    "symbol": "FREN",
    "name": "SOL Frens",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xd71KP4HwQ4sM936xL8JQZCwE4amUko1AdCCf6Znjrt/logo.png",
    "tags": [
      "community-token",
      "meme-token"
    ]
  },
  {
    "chainId": 101,
    "address": "cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2",
    "symbol": "CHICKS",
    "name": "SolChicks",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2/logo.png",
    "tags": [
      "gaming",
      "nfts",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "solchicks-token",
      "description": "The Leading Play-to-Earn Fantasy Game on Solana",
      "discord": "https://discord.gg/solchicks",
      "telegram": "https://t.me/solchicksnft",
      "twitter": "https://twitter.com/SolChicksNFT",
      "website": "https://www.solchicks.io/"
    }
  },
  {
    "chainId": 101,
    "address": "8j3hXRK5rdoZ2vSpGLRmXtWmW6iYaRUw5xVk4Kzmc9Hp",
    "symbol": "SHARDS",
    "name": "SolChicks Shards",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8j3hXRK5rdoZ2vSpGLRmXtWmW6iYaRUw5xVk4Kzmc9Hp/logo.png",
    "tags": [
      "gaming",
      "nfts",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "solchicks-shards",
      "description": "SHARDS is the utility token for SolChicks, the leading play-to-earn fantasy game on Solana",
      "discord": "https://discord.gg/solchicks",
      "telegram": "https://t.me/solchicksnft",
      "twitter": "https://twitter.com/SolChicksNFT",
      "website": "https://www.solchicks.io/"
    }
  },
  {
    "chainId": 101,
    "address": "7rmV64vLfbrbS5rTFvojYWzCVEn8dnJ9RfSRx3nD6C5E",
    "symbol": "MARIO",
    "name": "Super Mario",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7rmV64vLfbrbS5rTFvojYWzCVEn8dnJ9RfSRx3nD6C5E/logo.png",
    "tags": [
      "Community-token",
      "Meme",
      "NFT"
    ],
    "extensions": {
      "serumV3Usdc": "GN2TTgnWm7WyMEFZjbtzZL2d7NxhBk4QMZtDdLZUkcqv"
    }
  },
  {
    "chainId": 101,
    "address": "G9tt98aYSznRk7jWsfuz9FnTdokxS6Brohdo9hSmjTRB",
    "symbol": "PUFF",
    "name": "PUFF",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/G9tt98aYSznRk7jWsfuz9FnTdokxS6Brohdo9hSmjTRB/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "puff",
      "discord": "https://discord.gg/stonedapecrew",
      "serumV3Usdc": "FjkwTi1nxCa1S2LtgDwCU8QjrbGuiqpJvYWu3SWUHdrV",
      "twitter": "https://twitter.com/stonedapecrew",
      "website": "https://www.stonedapecrew.com/"
    }
  },
  {
    "chainId": 101,
    "address": "BhPXDQio8xtNC6k5Bg5fnUVL9kGN8uvRDNwW8MZBu8DL",
    "symbol": "BANA",
    "name": "Shibana",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BhPXDQio8xtNC6k5Bg5fnUVL9kGN8uvRDNwW8MZBu8DL/Shibana.png",
    "tags": [
      "DeFi",
      "meme-token",
      "Meta",
      "solana",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "shibana",
      "discord": "https://discord.com/invite/X8tKR52E32",
      "twitter": "https://twitter.com/ShibanaCoin",
      "website": "https://www.shibana.io/"
    }
  },
  {
    "chainId": 101,
    "address": "AAmGoPDFLG6bE82BgZWjVi8k95tj9Tf3vUN7WvtUm2BU",
    "symbol": "RACEFI",
    "name": "RaceFi Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AAmGoPDFLG6bE82BgZWjVi8k95tj9Tf3vUN7WvtUm2BU/logo.png",
    "tags": [
      "RaceFi",
      "Metaverse",
      "GameFi",
      "solana",
      "NFT",
      "NFT-Gaming"
    ],
    "extensions": {
      "coingeckoId": "racefi",
      "description": "The fist AI/ML Play-to-Earn Racing Game on Solana",
      "discord": "https://discord.com/invite/rDX8uwd2sg",
      "telegram": "https://t.me/racefi_io",
      "website": "https://racefi.io/"
    }
  },
  {
    "chainId": 101,
    "address": "AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB",
    "symbol": "GST",
    "name": "GST",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB/logo.png",
    "extensions": {
      "website": "https://stepn.com/"
    }
  },
  {
    "chainId": 101,
    "address": "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
    "symbol": "GMT",
    "name": "GMT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx/logo.png",
    "extensions": {
      "website": "https://stepn.com/"
    }
  },
  {
    "chainId": 101,
    "address": "HnZiKrSKYQkEfzjQs6qkvuGbBmrBP9YzjB1SMM7tiGZ1",
    "symbol": "SUCH",
    "name": "Such Shiba",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HnZiKrSKYQkEfzjQs6qkvuGbBmrBP9YzjB1SMM7tiGZ1/logo.png",
    "tags": [
      "community-token",
      "social-token",
      "meme-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SuchShibas"
    }
  },
  {
    "chainId": 101,
    "address": "UNQtEecZ5Zb4gSSVHCAWUQEoNnSVEbWiKCi1v9kdUJJ",
    "symbol": "UNQ",
    "name": "Unique Venture Clubs",
    "decimals": 6,
    "logoURI": "https://www.arweave.net/X58AnJYdgZRbTNyf5HzavUD7daqAtuPnz0JcUACU70Y?ext=jpg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "unq",
      "coinmarketcap": "https://coinmarketcap.com/currencies/unqclub",
      "discord": "https://discord.com/invite/unqnetwork",
      "twitter": "https://twitter.com/clubunq",
      "website": "https://unq.club/"
    }
  },
  {
    "chainId": 101,
    "address": "HHjoYwUp5aU6pnrvN4s2pwEErwXNZKhxKGYjRJMoBjLw",
    "symbol": "PIP",
    "name": "PIP",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HHjoYwUp5aU6pnrvN4s2pwEErwXNZKhxKGYjRJMoBjLw/logo.svg",
    "tags": [
      "web3",
      "social-token",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/P2AU78UB3e",
      "linkedin": "https://www.linkedin.com/company/getpip",
      "medium": "https://medium.com/@getpip",
      "reddit": "https://www.reddit.com/r/getpip",
      "telegram": "https://t.me/getpip",
      "twitter": "https://twitter.com/getpipcom",
      "website": "https://www.getpip.com",
      "youtube": "https://www.youtube.com/channel/UCB0bXqJZTq9li7_3ZOkEwdQ"
    }
  },
  {
    "chainId": 101,
    "address": "ForaXiBD8K3a7C1PwxV1xqDHs5aV8y8nWRmHebafdkes",
    "symbol": "FORA",
    "name": "Fora",
    "decimals": 9,
    "logoURI": "imagepng",
    "tags": [
      "fora",
      "utility-token"
    ],
    "extensions": {
      "description": "Co-founders hmu -> ryan@kanelabs.com",
      "discord": "https://discord.gg/6erTzYChXh",
      "website": "https://fora.co"
    }
  },
  {
    "chainId": 101,
    "address": "5WWRMYPchxgh3VmYGPqoq2kfzCtBLxXB9vFH2TeFeR9m",
    "symbol": "TPC",
    "name": "TOYPOODLE COIN",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5WWRMYPchxgh3VmYGPqoq2kfzCtBLxXB9vFH2TeFeR9m/logo.png",
    "tags": [
      "meme-token"
    ]
  },
  {
    "chainId": 101,
    "address": "6F9XriABHfWhit6zmMUYAQBSy6XK5VF1cHXuW5LDpRtC",
    "symbol": "RUN",
    "name": "Run Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6F9XriABHfWhit6zmMUYAQBSy6XK5VF1cHXuW5LDpRtC/RunGear.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "run",
      "discord": "https://discord.com/invite/V2f74X8Zrt",
      "telegram": "https://t.me/RunNode",
      "twitter": "https://twitter.com/runnode",
      "website": "https://runnode.com"
    }
  },
  {
    "chainId": 101,
    "address": "pskJRUNzJbVu4RaZSUJYfvaTNXmFdRCutegL6P2Y9tG",
    "symbol": "PSK",
    "name": "Pesky Penguins Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/pskJRUNzJbVu4RaZSUJYfvaTNXmFdRCutegL6P2Y9tG/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "3XRsg7YRVcvZme9rHpATL55WPHrnGXvVL8E7ycNNFu4f",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "7tE99RKS4RwQxEjvZfh4CQMoQMMTRdL5KQbugsfhNYPg",
    "symbol": "FLW",
    "name": "Flow Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7tE99RKS4RwQxEjvZfh4CQMoQMMTRdL5KQbugsfhNYPg/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "serumV3Usdc": "Cc2K7Ao4FtgoquT2ua7zvRuYnQMBSz2s83A5zTyR8h2z",
      "website": "https://moveflow.tech"
    }
  },
  {
    "chainId": 101,
    "address": "GWsZd8k85q2ie9SNycVSLeKkX7HLZfSsgx6Jdat9cjY1",
    "symbol": "PCN",
    "name": "Pollen Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GWsZd8k85q2ie9SNycVSLeKkX7HLZfSsgx6Jdat9cjY1/logo.svg",
    "tags": [
      "utility-token",
      "gaming",
      "play-to-earn",
      "solana-ecosystem",
      "network"
    ],
    "extensions": {
      "description": "Pollen Coin is an SPL Token designed to help proliferate the Pollen Network"
    }
  },
  {
    "chainId": 101,
    "address": "FZxUbyQ9oeFiSDaabw8KfAWACsDMQhbuxR9vm2Rh7Ewm",
    "symbol": "PHASE",
    "name": "PHASE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FZxUbyQ9oeFiSDaabw8KfAWACsDMQhbuxR9vm2Rh7Ewm/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/jVwHMvXfp9",
      "twitter": "https://twitter.com/phase_trade",
      "website": "https://phase.trade/"
    }
  },
  {
    "chainId": 101,
    "address": "NFTUkR4u7wKxy9QLaX2TGvd9oZSWoMo4jqSJqdMb7Nk",
    "symbol": "BLOCK",
    "name": "Blockasset",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/NFTUkR4u7wKxy9QLaX2TGvd9oZSWoMo4jqSJqdMb7Nk/logo.png",
    "extensions": {
      "coingeckoId": "blockasset",
      "discord": "https://discord.com/invite/mynn9p6uNw",
      "telegram": "https://t.me/blockassetupdates",
      "twitter": "https://twitter.com/Blockassetco",
      "website": "https://blockasset.co"
    }
  },
  {
    "chainId": 101,
    "address": "r8nuuzXCchjtqsmQZVZDPXXq928tuk7KVH479GsKVpy",
    "symbol": "DAOJONES",
    "name": "fSMB2367",
    "decimals": 2,
    "logoURI": "https://arweave.net/ncRp795w-ca_Xb5zkUBtBmxSQ_bcYA49E03NtMoHJMg",
    "tags": [
      "bridgesplit-fraction",
      "smb",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/fjrFpbweAP",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/markets/r8nuuzXCchjtqsmQZVZDPXXq928tuk7KVH479GsKVpy"
    }
  },
  {
    "chainId": 101,
    "address": "4q5UBXJxE91BZKX548qhU8i5QBWvZdXzS3RZwfTgLQda",
    "symbol": "N2H4",
    "name": "Hydrazine",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4q5UBXJxE91BZKX548qhU8i5QBWvZdXzS3RZwfTgLQda/logo.png",
    "extensions": {
      "telegram": "https://t.me/StarLaunchOfficial",
      "twitter": "https://twitter.com/StarLaunchSOL",
      "website": "https://www.starlaunch.com/"
    }
  },
  {
    "chainId": 101,
    "address": "9kt93AW5QMjFL6ZxomnSq3FbWiU5ibNeTSgBz9UDFSB6",
    "symbol": "GOD",
    "name": "GOD",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9kt93AW5QMjFL6ZxomnSq3FbWiU5ibNeTSgBz9UDFSB6/logo.png",
    "extensions": {
      "discord": "https://discord.gg/4wvSFbkFqY",
      "twitter": "https://twitter.com/gods_sol",
      "website": "https://gods.so/"
    }
  },
  {
    "chainId": 101,
    "address": "YtfMZ4jg2ubdz4GasY86iuGjHdo5rCPJnFqgSf8gxAz",
    "symbol": "CHB",
    "name": "Charactbit",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6D4aGWykMymkFaeVzDS6MiH6QEujsHUze2pPGbJEyh7y/logo.png",
    "tags": [
      "MetaVerse",
      "nft-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/charactbit",
      "website": "https://www.charactbit.com/"
    }
  },
  {
    "chainId": 101,
    "address": "6c4L5nTH2sBKkfeuP3WhGp6Vq1tE4Suh4ezRp5KSu8Z7",
    "symbol": "FANI",
    "name": "FANITRADE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6c4L5nTH2sBKkfeuP3WhGp6Vq1tE4Suh4ezRp5KSu8Z7/logo.svg",
    "tags": [
      "fanitrade",
      "faniswap",
      "fanipool",
      "fanidex",
      "faniverse"
    ],
    "extensions": {
      "coingeckoId": "fanitrade",
      "coinmarketcap": "https://coinmarketcap.com/currencies/fanitrade",
      "instagram": "https://www.instagram.com/fanitrade/",
      "website": "https://fanitrade.com/"
    }
  },
  {
    "chainId": 101,
    "address": "GEJpt3Wjmr628FqXxTgxMce1pLntcPV4uFi8ksxMyPQh",
    "symbol": "daoSOL",
    "name": "daoSOL Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GEJpt3Wjmr628FqXxTgxMce1pLntcPV4uFi8ksxMyPQh/logo.png",
    "tags": [
      "stake-pool-token"
    ],
    "extensions": {
      "description": "daoSOL is the staking token issued by the MonkeDAO staking pool",
      "twitter": "https://twitter.com/MonkeDAO",
      "website": "https://monkedao.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BABYsocP6cB95xvBDXnjXKX96VBNC37dmNWUtaV9Jk6v",
    "symbol": "SBABYDOGE",
    "name": "SOL BABAY DOGE COIN",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BABYsocP6cB95xvBDXnjXKX96VBNC37dmNWUtaV9Jk6v/logo.png",
    "tags": [
      "MEME",
      "dogecoin",
      "meme-coin",
      "DOGE"
    ],
    "extensions": {
      "coingeckoId": "sol-baby-doge",
      "serumV3Usdc": "GCmfmqvNbY9LXWJ39fD8wNDn1HLj4sF2m9WAoNVVYaFt",
      "twitter": "https://twitter.com/sbabydogecoin",
      "website": "http://solbabydoge.com/"
    }
  },
  {
    "chainId": 101,
    "address": "FANTafPFBAt93BNJVpdu25pGPmca3RfwdsDsRrT3LX1r",
    "symbol": "FANT",
    "name": "Phantasia",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FANTafPFBAt93BNJVpdu25pGPmca3RfwdsDsRrT3LX1r/logo.png",
    "tags": [
      "utility-token",
      "governance-token"
    ],
    "extensions": {
      "coingeckoId": "phantasia",
      "coinmarketcap": "https://coinmarketcap.com/currencies/phantasia/",
      "discord": "https://t.co/Vskz9PkBBC?amp=1",
      "github": "https://github.com/Phantasia-Sports",
      "medium": "https://medium.com/@phantasia",
      "twitter": "https://twitter.com/PhantasiaSports",
      "website": "https://phantasia.app/"
    }
  },
  {
    "chainId": 101,
    "address": "3WV4fTWGvtWNvQb8oVU4t99By8KztDLtExqHnkPfHAA9",
    "symbol": "PAW",
    "name": "CopyCats token",
    "decimals": 9,
    "logoURI": "https://imagedelivery.net/aAmca-Po70V1nH4n9cT-uA/98c9b68b-1494-43d1-0c2c-31e5d0129a00/public",
    "extensions": {
      "discord": "http://discord.copycats.digital/",
      "twitter": "https://twitter.com/copycatssol",
      "website": "https://www.copycats.digital/"
    }
  },
  {
    "chainId": 101,
    "address": "AkhdZGVbJXPuQZ53u2LrimCjkRP6ZyxG1SoM85T98eE1",
    "symbol": "BOT",
    "name": "Starbots Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AkhdZGVbJXPuQZ53u2LrimCjkRP6ZyxG1SoM85T98eE1/logo.png",
    "tags": [
      "utility-token",
      "governance-token",
      "game-token"
    ],
    "extensions": {
      "coingeckoId": "starbots",
      "twitter": "https://twitter.com/Starbots_game",
      "website": "https://starbots.net"
    }
  },
  {
    "chainId": 101,
    "address": "AxXoJZhSfeVUe3qgFZTt4NwQRJB61pBQAHTdWTN9PNms",
    "symbol": "KAYAC",
    "name": "Kayac",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AxXoJZhSfeVUe3qgFZTt4NwQRJB61pBQAHTdWTN9PNms/KAYAC_LOGO.png",
    "tags": [
      "utility-token",
      "governance-token",
      "game-token"
    ],
    "extensions": {
      "github": "https://github.com/GlyphBound",
      "twitter": "https://twitter.com/GlyphBound",
      "website": "https://www.glyph-bound.com/"
    }
  },
  {
    "chainId": 101,
    "address": "CRWNYkqdgvhGGae9CKfNka58j6QQkaD5bLhKXvUYqnc1",
    "symbol": "CRWNY",
    "name": "Crowny token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CRWNYkqdgvhGGae9CKfNka58j6QQkaD5bLhKXvUYqnc1/logo.png",
    "extensions": {
      "coingeckoId": "crowny-token",
      "discord": "https://www.discord.gg/4JvMHrgNvv",
      "medium": "https://crowny.medium.com/",
      "serumV3Usdc": "H8GSFzSZmPNs4ANW9dPd5XTgrzWkta3CaT57TgWYs7SV",
      "telegram": "https://t.me/crownyofficial",
      "twitter": "https://twitter.com/crownyio",
      "website": "https://crowny.io/"
    }
  },
  {
    "chainId": 101,
    "address": "Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa",
    "symbol": "BASIS",
    "name": "basis",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Basis9oJw9j8cw53oMV7iqsgo6ihi9ALw4QR31rcjUJa/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "basis-markets",
      "description": "BASIS is basis.markets' fee-sharing token. Holders are able to stake their BASIS tokens to receive a proportional share of trading fee rewards generated by the basis.markets Decentralised Basis Liquidity Pool (DBLP). BASIS tokens also give access to a high-reward liquidity mining programme, as well as, discounted future deposits into the basis.markets DBLP.",
      "discord": "https://discord.gg/basismarkets",
      "medium": "https://basismarkets.medium.com/",
      "serumV3Usdc": "HsUNWR7ghHSumwDW3MNgs2HSh94yrDuZFVR1XpykA9or",
      "twitter": "https://twitter.com/basismarkets",
      "website": "https://basis.markets"
    }
  },
  {
    "chainId": 101,
    "address": "DjPt6xxMoZx1DyyWUHGs4mwqWWX48Fwf6ZJgqv2F9qwc",
    "symbol": "VOID",
    "name": "VOID Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DjPt6xxMoZx1DyyWUHGs4mwqWWX48Fwf6ZJgqv2F9qwc/logo.png",
    "tags": [
      "utility-token",
      "game-token",
      "game-currency",
      "GameFi",
      "Gaming"
    ],
    "extensions": {
      "coingeckoId": "void-games",
      "description": "VOID is a multiplayer online game with a strong focus on personalizing your character. Fight solo or in a small teams on epic on field battlegrounds.",
      "discord": "https://discord.gg/rzfe6k39aU",
      "facebook": "https://facebook.com/monkeyballgames",
      "instagram": "https://www.instagram.com/void_dot_games",
      "medium": "https://void-dot-games.medium.com",
      "telegram": "https://t.me/voidcommunitychat",
      "twitter": "https://twitter.com/void_dot_games",
      "website": "https://www.void.games"
    }
  },
  {
    "chainId": 101,
    "address": "UST98bfV6EASdTFQrRwCBczpehdMFwYCUdLT5tEbhpW",
    "symbol": "swtUST-9",
    "name": "Saber Wrapped UST (Portal) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/UST98bfV6EASdTFQrRwCBczpehdMFwYCUdLT5tEbhpW/icon.png",
    "tags": [
      "wrapped",
      "wormhole",
      "saber-mkt-usd",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "address": "uusd",
      "bridgeContract": "https://finder.terra.money/columbus-5/address/terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf",
      "coingeckoId": "terra-usd",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "6cKnRJskSTonD6kZiWt2Fy3NB6ZND6CbgA3vHiZ1kHEU",
    "symbol": "ppUSDC",
    "name": "Port Finance 2022 March Principal USDC",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FgSsGV8GByPaMERxeQJPvZRZHf7zCBhrdYtztKorJS58/USDC.svg",
    "tags": [
      "port",
      "lending"
    ],
    "extensions": {
      "website": "https://port.finance"
    }
  },
  {
    "chainId": 101,
    "address": "A7rqejP8LKN8syXMr4tvcKjs2iJ4WtZjXNs1e6qP3m9g",
    "symbol": "Zion",
    "name": "Zion",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/LousyNFTs/token-list/main/assets/mainnet/A7rqejP8LKN8syXMr4tvcKjs2iJ4WtZjXNs1e6qP3m9g/Ziontoken_2_84.png",
    "tags": [
      "social-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "zion",
      "discord": "http://discord.gg/catcartel",
      "twitter": "https://twitter.com/SolanaCatCartel",
      "website": "https://catcartel.io/"
    }
  },
  {
    "chainId": 101,
    "address": "GD57bW3qQaqk8HkbWrFV3t4tSAeJsjngFRtYwbF1wZhZ",
    "symbol": "KLUB",
    "name": "Koala Klubhouse",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GD57bW3qQaqk8HkbWrFV3t4tSAeJsjngFRtYwbF1wZhZ/logo.png",
    "tags": [
      "NFT-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/koalaklubhouse",
      "website": "https://www.koalaklubhouse.art/"
    }
  },
  {
    "chainId": 101,
    "address": "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
    "symbol": "SHDW",
    "name": "Shadow Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "genesysgo-shadow",
      "coinmarketcap": "https://coinmarketcap.com/currencies/genesysgo-shadow/",
      "discord": "https://discord.gg/y86HPCkk",
      "serumV3Usdc": "CVJVpXU9xksCt2uSduVDrrqVw6fLZCAtNusuqLKc5DhW",
      "website": "https://www.shadowysupercoderdao.com"
    }
  },
  {
    "chainId": 101,
    "address": "3KTkQJEMJXP741EJBFcAS34Lx9t8GsBYaW2BUUWkeyDH",
    "symbol": "CC",
    "name": "Castle Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3KTkQJEMJXP741EJBFcAS34Lx9t8GsBYaW2BUUWkeyDH/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "meme-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/4jNRF9zfCV",
      "twitter": "https://twitter.com/Castle_Clique",
      "youtube": "https://www.youtube.com/c/CastleClique"
    }
  },
  {
    "chainId": 101,
    "address": "97ner9bBhnmbg1yZXMh85WNYsYSLTqUb4RvyMttD57fh",
    "symbol": "FJBT",
    "name": "Fuck Joe Biden Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/Texaglo/-fjb/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "HkNokfCXG33eu5vCcS49mq3jZcKZeQSQCyta964YxxYg",
    "symbol": "CRRT",
    "name": "Breezy Bunnies Carrot",
    "decimals": 0,
    "logoURI": "https://breezybunnies.com/images/3-p-500.png",
    "tags": [
      "nft"
    ],
    "extensions": {
      "twitter": "https://twitter.com/Breezybunniess",
      "website": "https://breezybunnies.com/"
    }
  },
  {
    "chainId": 101,
    "address": "9MjAmgHXbu5drkNa9XpzfozgsM5Dcq6bSnKZzdNrwscC",
    "symbol": "$FORCE",
    "name": "Force",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9MjAmgHXbu5drkNa9XpzfozgsM5Dcq6bSnKZzdNrwscC/logo.png",
    "tags": [
      "community-token",
      "social-token",
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/solenforcers",
      "website": "https://solenforcers.io/"
    }
  },
  {
    "chainId": 101,
    "address": "6VYF5jXq6rfq4QRgGMG6co7b1Ev1Lj7KSbHBxfQ9e1L3",
    "symbol": "wDingocoin",
    "name": "Wrapped Dingocoin",
    "decimals": 8,
    "logoURI": "https://wrap.dingocoin.org/wDingocoin.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/y3J946HFQM",
      "facebook": "https://www.facebook.com/Dingocoin.org",
      "instagram": "https://www.instagram.com/dingocoin",
      "reddit": "https://www.reddit.com/r/dingocoin",
      "telegram": "https://t.me/DingoCoinTalk",
      "twitter": "https://twitter.com/dingocoincrypto",
      "website": "https://dingocoin.org"
    }
  },
  {
    "chainId": 101,
    "address": "EctmRn2jMAdTDvQdG7mxadyiTvhGZiGYNrt9PWe6zioG",
    "symbol": "SANTA",
    "name": "Santaclaus",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EctmRn2jMAdTDvQdG7mxadyiTvhGZiGYNrt9PWe6zioG/logo.png",
    "tags": [
      "community-token",
      "utility-token",
      "meme-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/3vjNGAPF",
      "twitter": "https://twitter.com/SolSantaclaus",
      "website": "https://www.santaclaus-sol.com/"
    }
  },
  {
    "chainId": 101,
    "address": "MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD",
    "symbol": "MEAN",
    "name": "MEAN",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD/logo.svg",
    "extensions": {
      "coingeckoId": "meanfi",
      "discord": "https://discord.meanfi.com/",
      "medium": "https://meandao.medium.com",
      "serumV3Usdc": "3WXrxhrj4PXYUwW4ozBjxdSxwEp9ELKf3vETxXTqdiQJ",
      "twitter": "https://twitter.com/meanfinance",
      "website": "https://www.meanfi.com/"
    }
  },
  {
    "chainId": 101,
    "address": "dapeM1DJj3xf2rC5o3Gcz1Cg3Rdu2ayZae9nGcsRRZT",
    "symbol": "DAPE",
    "name": "Degenerate Ape Academy Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/dapeM1DJj3xf2rC5o3Gcz1Cg3Rdu2ayZae9nGcsRRZT/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "CQQAHgfsu5uFTPzwewZ7QrLLSPk1K9MmqnuxiwmPDBzN",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "BygDd5LURoqztD3xETc99WCxLUbTi6WYSht9XiBgZ4HW",
    "symbol": "WMP",
    "name": "Whalemap",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/ssi91/crypto/main/logo.svg",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "coingeckoId": "whalemap",
      "website": "https://whalemap.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BDrL8huis6S5tpmozaAaT5zhE5A7ZBAB2jMMvpKEeF8A",
    "symbol": "NOVA",
    "name": "NOVA FINANCE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BDrL8huis6S5tpmozaAaT5zhE5A7ZBAB2jMMvpKEeF8A/logo.svg",
    "extensions": {
      "twitter": "https://twitter.com/NovaFinance_"
    }
  },
  {
    "chainId": 101,
    "address": "FatneQg39zhrG6XdwYb8fzM4VgybpgqjisJYESSBD7FV",
    "symbol": "MKD",
    "name": "Musk Doge",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FatneQg39zhrG6XdwYb8fzM4VgybpgqjisJYESSBD7FV/logo.png",
    "tags": [
      "utility-token",
      "meme"
    ],
    "extensions": {
      "discord": "https://discord.io/muskdoge_sol",
      "telegram": "https://t.me/muskdoge_sol",
      "twitter": "https://twitter.com/muskdoge_sol",
      "website": "https://musk-doge.net"
    }
  },
  {
    "chainId": 101,
    "address": "FLWRna1gxehQ9pSyZMzxfp4UhewvLPwuKfdUTgdZuMBY",
    "symbol": "FLWR",
    "name": "Flower Token",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/Neurologist/brains-token/main/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/solflowersnft",
      "twitter": "https://twitter.com/solflowers_io",
      "website": "https://solflowers.io"
    }
  },
  {
    "chainId": 101,
    "address": "CRkwd2QedqDi5u6W2w6jeAViAUd1pR4AXs2aKvh7GW7M",
    "symbol": "SEI",
    "name": "Solanium Ecosystem Index",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CRkwd2QedqDi5u6W2w6jeAViAUd1pR4AXs2aKvh7GW7M/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "telegram": "https://t.me/MatrixETF",
      "twitter": "https://twitter.com/MatrixETF",
      "website": "https://www.matrixetf.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "2ZLYEWypSrQhruqsTDqWNWuzFXe5G75dX9PoHQWtKZ31",
    "symbol": "PTN",
    "name": "Photon",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2ZLYEWypSrQhruqsTDqWNWuzFXe5G75dX9PoHQWtKZ31/logo.png",
    "tags": [
      "DeFi"
    ]
  },
  {
    "chainId": 101,
    "address": "48AEwauAHsJibyt3WqjQ6EoHnFBcnyHASfo7vB2eCXPS",
    "symbol": "DRAW",
    "name": "DragonWar",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/48AEwauAHsJibyt3WqjQ6EoHnFBcnyHASfo7vB2eCXPS/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Dragon War Token",
      "discord": "https://discord.gg/kFUmzU6nCH",
      "facebook": "https://fb.com/dragonwar.io",
      "medium": "https://medium.com/@dragonwar",
      "telegram": "https://t.me/dragonwarglobal",
      "twitter": "https://twitter.com/io_dragonwar",
      "website": "https://dragonwar.io",
      "youtube": "https://youtube.com/channel/UCzl9Gsl58YR9MyL2650tg8w"
    }
  },
  {
    "chainId": 101,
    "address": "3e9pHUxa2nvAqso2Kr2KqJxYvZaz9qZLjoLaG77uQwB1",
    "symbol": "BAIL",
    "name": "BAIL COIN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/ApeLabsNFT/solpatrol/main/hammer.png",
    "tags": [
      "NFT",
      "Utility-Token"
    ]
  },
  {
    "chainId": 101,
    "address": "DHVUoxNqv3D7EgktBxUsxFF2Wx83hVDmD2wBBpUaw3jn",
    "symbol": "CHP",
    "name": "Crypto Health Plus",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DHVUoxNqv3D7EgktBxUsxFF2Wx83hVDmD2wBBpUaw3jn/logo.png",
    "tags": [
      "health",
      "utility-token"
    ],
    "extensions": {
      "facebook": "https://www.facebook.com/Crypto-Health-Plus-226283872703673/",
      "twitter": "https://twitter.com/CryptoHealthPls",
      "website": "https://cryptohealthplus.com/"
    }
  },
  {
    "chainId": 101,
    "address": "A96PoNcxa9LMxcF9HhKAfA1p3M1dGbubPMWf19gHAkgJ",
    "symbol": "atUST",
    "name": "Wrapped UST (Allbridge from Terra)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CXLBjMMcwkc17GfJtBos6rQCo1ypeH6eDbB82Kby4MRm/logo.png",
    "tags": [
      "stablecoin"
    ]
  },
  {
    "chainId": 101,
    "address": "7g166TuBmnoHKvS2PEkZx6kREZtbfjUxCHGWjCqoDXZv",
    "symbol": "acEUR",
    "name": "Wrapped CEUR (Allbridge from Celo)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7g166TuBmnoHKvS2PEkZx6kREZtbfjUxCHGWjCqoDXZv/logo.png",
    "tags": [
      "stablecoin"
    ]
  },
  {
    "chainId": 101,
    "address": "FkBRohZpqx2c7zxe5cDhNq3AoFo2nPJus3xtdz9CvQmQ",
    "symbol": "$MINERAL",
    "name": "Mineral Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FkBRohZpqx2c7zxe5cDhNq3AoFo2nPJus3xtdz9CvQmQ/Mineral.png",
    "tags": [
      "Energy",
      "social-token"
    ],
    "extensions": {
      "website": "https://afloat.eco"
    }
  },
  {
    "chainId": 101,
    "address": "smbdJcLBrtKPhjrWCpDv5ABdJwz2vYo3mm6ojmePL3t",
    "symbol": "SMBD",
    "name": "Solana Monkey Business Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/smbdJcLBrtKPhjrWCpDv5ABdJwz2vYo3mm6ojmePL3t/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "6KtErANtAw4oXGhF1LJhKk2f8xomCwo4bwLcntZYJBVt",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "At5j3zhbEj8mfFsSy1MPbjVhrX2uNmRMPEDZiyFcETNX",
    "symbol": "BRWNDO",
    "name": "BRAWNDO",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/At5j3zhbEj8mfFsSy1MPbjVhrX2uNmRMPEDZiyFcETNX/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "Gz3u6eJaKEviYpPC5AwUziz891kNX76PNdsmJrnaNNY4",
    "symbol": "SOULO",
    "name": "SouloCoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Gz3u6eJaKEviYpPC5AwUziz891kNX76PNdsmJrnaNNY4/logo.png",
    "tags": [
      "utility-token",
      "NFT",
      "game-token",
      "GameFi"
    ],
    "extensions": {
      "discord": "https://discord.gg/soulofox",
      "twitter": "https://twitter.com/soulofoxnft",
      "website": "https://app.soulofox.com"
    }
  },
  {
    "chainId": 101,
    "address": "FmpqmVcT4hSUfNhach31YUpf6M75bBYaC59JLMyCVNHH",
    "symbol": "GOOSE",
    "name": "Mongoose",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FmpqmVcT4hSUfNhach31YUpf6M75bBYaC59JLMyCVNHH/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x",
    "symbol": "PRISM",
    "name": "PRISM",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x/logo.svg",
    "tags": [
      "utility-token",
      "DeFi",
      "aggregator",
      "governance-token"
    ],
    "extensions": {
      "coingeckoId": "prism",
      "description": "Solana's DEX Aggregator",
      "discord": "https://discord.gg/prism-ag",
      "serumV3Usdc": "2MvXnxngd1gKp6gE8Q63wiPHSpveWcx8x4wf43VpyiA6",
      "twitter": "https://twitter.com/prism_ag",
      "website": "https://prism.ag"
    }
  },
  {
    "chainId": 101,
    "address": "EcFyPDjqpnyMvh1LhACtC6rrCZ41DMez7RZYocjhmUVS",
    "symbol": "NOCH",
    "name": "NodeBunch",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EcFyPDjqpnyMvh1LhACtC6rrCZ41DMez7RZYocjhmUVS/logo.png",
    "tags": [
      "dex",
      "farming",
      "swap",
      "pool",
      "nft",
      "trade",
      "staking",
      "nft-staking",
      "amm",
      "launchpad"
    ],
    "extensions": {
      "description": "Extend the boundaries of earning with nodebunch, a futuristic AMM Dex with the power of DEFi",
      "discord": "https://discord.gg/C4dC2grHAj",
      "medium": "https://nodebunch.medium.com/",
      "reddit": "https://www.reddit.com/user/nodebunch",
      "twitter": "https://twitter.com/BunchNode",
      "website": "https://nodebunch.finance"
    }
  },
  {
    "chainId": 101,
    "address": "EjSwAfwi4F6uYtoi2WuCSYSWPVUPJCdemmShZ9tdy65P",
    "symbol": "KZN",
    "name": "Kartazion",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EjSwAfwi4F6uYtoi2WuCSYSWPVUPJCdemmShZ9tdy65P/logo.png",
    "tags": [
      "kartazion",
      "kzn",
      "science",
      "quantum",
      "physics"
    ],
    "extensions": {
      "description": "Universal Theory of Physics and Quantum Mechanics - Research",
      "website": "https://www.kartazion.com"
    }
  },
  {
    "chainId": 101,
    "address": "B6aJ3TGfme3SMnLSouHXqWXjVFqYyqj7czzhzr8WJFAi",
    "symbol": "RAD",
    "name": "RAD",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/NFTBrickLayer/zillaz-assets/main/RAD-logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/zillaz",
      "twitter": "https://twitter.com/ZillazNFT"
    }
  },
  {
    "chainId": 101,
    "address": "FDKBUXKxCdNQnDrqP7DLe8Kri3hzFRxcXyoskoPa74rk",
    "symbol": "$YETI",
    "name": "YETI",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/yet777/tokenlogo/main/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/solyetis",
      "website": "https://solyetis.io/"
    }
  },
  {
    "chainId": 101,
    "address": "4NGNdLiQ1KG8GgqZimKku4WCLdXbNw6UQJvqax3fE6CJ",
    "symbol": "WAV",
    "name": "fWAVE999",
    "decimals": 2,
    "logoURI": "https://www.arweave.net/qV0rFkGG-cTdtgRu7le-k8DstT8_-pzG2MWsceSlXjQ?ext=png",
    "tags": [
      "bridgesplit-fraction",
      "playground-wave",
      "wave-999",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/fjrFpbweAP",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/vault/4NGNdLiQ1KG8GgqZimKku4WCLdXbNw6UQJvqax3fE6CJ"
    }
  },
  {
    "chainId": 101,
    "address": "ggsgHDoX6tACq25XhQPUmbza8Fzwp9WdAzTU1voTwDi",
    "symbol": "GGSG",
    "name": "Galactic Geckos Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ggsgHDoX6tACq25XhQPUmbza8Fzwp9WdAzTU1voTwDi/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "2x6dmFevT3MGCZYPE2eagautjyQFVq4YwHsKow5bCVCs",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "GWgwUUrgai3BFeEJZp7bdsBSYiuDqNmHf9uRusWsf3Yi",
    "symbol": "SAFU",
    "name": "1SAFU",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GWgwUUrgai3BFeEJZp7bdsBSYiuDqNmHf9uRusWsf3Yi/logo.png",
    "tags": [
      "DeFi"
    ],
    "extensions": {
      "coingeckoId": "1safu",
      "discord": "https://discord.gg/avdNF9s4CF",
      "serumV3Usdc": "H8sjxDJWVxC3kP5uZ3p9eZncc4Czn9pTWEA6bH2XX7rM",
      "telegram": "https://t.me/sol1safu",
      "twitter": "https://twitter.com/1safu_sol",
      "website": "https://www.1safu.com/"
    }
  },
  {
    "chainId": 101,
    "address": "3vAs4D1WE6Na4tCgt4BApgFfENbm8WY7q4cSPD1yM4Cg",
    "symbol": "AAVE",
    "name": "Aave Token (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3vAs4D1WE6Na4tCgt4BApgFfENbm8WY7q4cSPD1yM4Cg/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "assetContract": "https://etherscan.io/address/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "aave",
      "serumV3Usdc": "8WZrmdpLckptiVKd2fPHPjewRVYQGQkjxi9vzRYG1sfs",
      "serumV3Usdt": "LghsMERQWQFK3zWMTrUkoyAJARQw2wSmcYZjexeN3zy"
    }
  },
  {
    "chainId": 101,
    "address": "3UCMiSnkcnkPE1pgQ5ggPCBv6dXgVUy16TmMUe1WpG9x",
    "symbol": "ALEPH",
    "name": "Aleph.im (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3UCMiSnkcnkPE1pgQ5ggPCBv6dXgVUy16TmMUe1WpG9x/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x27702a26126e0B3702af63Ee09aC4d1A084EF628",
      "assetContract": "https://etherscan.io/address/0x27702a26126e0B3702af63Ee09aC4d1A084EF628",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "aleph-im",
      "serumV3Usdc": "Fw4mvuE7KZmTjQPxP2sRpHwPDfRMWnKBupFZGyW9CAQH",
      "serumV3Usdt": "GZeHR8uCTVoHVDZFRVXTgm386DK1EKehy9yMS3BFChcL"
    }
  },
  {
    "chainId": 101,
    "address": "AwEauVaTMQRB71WeDnwf1DWSBxaMKjEPuxyLr1uixFom",
    "symbol": "COMP",
    "name": "Compound (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AwEauVaTMQRB71WeDnwf1DWSBxaMKjEPuxyLr1uixFom/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0xc00e94Cb662C3520282E6f5717214004A7f26888",
      "assetContract": "https://etherscan.io/address/0xc00e94Cb662C3520282E6f5717214004A7f26888",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "compound-governance-token",
      "serumV3Usdc": "CU5L8JC83hyYZdf1phzy6a7X58eTtPjs7mHL3QKCcLfh",
      "serumV3Usdt": "9gA6T3HRCMTVTULte5pJsXjMDUGRtygTKLbMny6eRcyM"
    }
  },
  {
    "chainId": 101,
    "address": "BXZX2JRJFjvKazM1ibeDFxgAngKExb74MRXzXKvgikxX",
    "symbol": "YFI",
    "name": "yearn.finance (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXZX2JRJFjvKazM1ibeDFxgAngKExb74MRXzXKvgikxX/logo.png",
    "tags": [
      "wrapped",
      "wormhole"
    ],
    "extensions": {
      "address": "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
      "assetContract": "https://etherscan.io/address/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "yearn-finance",
      "serumV3Usdc": "BiJXGFc1c4gyPpv9HLRJoKbZewWQrTCHGuxYKjYMQJpC",
      "serumV3Usdt": "9sue9TZAeUhNtNAPPGb9dke7rkJeXktGD3u8ZC37GWnQ"
    }
  },
  {
    "chainId": 101,
    "address": "HJbNXx2YMRxgfUJ6K4qeWtjatMK5KYQT1QnsCdDWywNv",
    "symbol": "ATS",
    "name": "Atlas Dex",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HJbNXx2YMRxgfUJ6K4qeWtjatMK5KYQT1QnsCdDWywNv/logo.png",
    "tags": [
      "utility-token",
      "dex",
      "swap"
    ],
    "extensions": {
      "coingeckoId": "atlas-dex",
      "coinmarketcap": "https://coinmarketcap.com/currencies/atlas-dex/",
      "medium": "https://atlasdex.medium.com/",
      "twitter": "https://twitter.com/atlas_dex",
      "website": "https://atlasdex.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "CobcsUrt3p91FwvULYKorQejgsm5HoQdv5T8RUZ6PnLA",
    "symbol": "PEOPLE",
    "name": "ConstitutionDAO (Portal)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CobcsUrt3p91FwvULYKorQejgsm5HoQdv5T8RUZ6PnLA/logo.png",
    "tags": [
      "wrapped",
      "ethereum"
    ],
    "extensions": {
      "address": "0x7a58c0be72be218b41c608b7fe7c5bb630736c71",
      "assetContract": "https://etherscan.io/address/0x7a58c0be72be218b41c608b7fe7c5bb630736c71",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "constitutiondao",
      "serumV3Usdc": "GsWEL352sYgQC3uAVKgEQz2TtA1RA5cgNwUQahyzwJyz"
    }
  },
  {
    "chainId": 101,
    "address": "8TQdiAzdZZEtkWUR8Zj1tqDYGPv9TR1XjPqrew39Vq9V",
    "symbol": "HYPE",
    "name": "HypeProxy",
    "decimals": 7,
    "logoURI": "https://raw.githubusercontent.com/hypeproxy/hypeproxy/main/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/HYyGPe7",
      "github": "https://github.com/hypeproxy",
      "medium": "https://medium.com/@HypeProxy",
      "telegram": "https://t.me/hypeproxy_org",
      "twitter": "https://twitter.com/hypeproxyio",
      "website": "http://hypeproxy.org"
    }
  },
  {
    "chainId": 101,
    "address": "2zjmVX4KDWtNWQyJhbNXgpMmsAoXwftB7sGV4qvV18xa",
    "symbol": "EGO",
    "name": "Shear Ego Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/jcards26/sol/main/new-new.png",
    "tags": [
      "social-token",
      "community-token"
    ],
    "extensions": {
      "website": "https://shearego.com"
    }
  },
  {
    "chainId": 101,
    "address": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
    "symbol": "bSOL",
    "name": "BlazeStake Staked SOL (bSOL)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
    "tags": [
      "utility-token",
      "stake-pool",
      "stake-pool-token"
    ],
    "extensions": {
      "github": "https://github.com/SolBlazeOrg",
      "twitter": "https://twitter.com/solblaze_org",
      "website": "https://stake.solblaze.org/"
    }
  },
  {
    "chainId": 101,
    "address": "GzpRsvnKXKz586kRLkjdppR4dUCFwHa2qaszKkPUQx6g",
    "symbol": "LOOT",
    "name": "LOOT",
    "decimals": 6,
    "logoURI": "https://arttest12312321.s3.us-west-1.amazonaws.com/pics/Bag_Open+(3).png",
    "tags": [
      "community-token",
      "social-token",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/copsgame",
      "twitter": "https://twitter.com/copsdotgame",
      "website": "https://cops.game/"
    }
  },
  {
    "chainId": 101,
    "address": "BgeRyFWWGHeVouqfHfcXUxmvfkgekhrXYVqQWf63kpJB",
    "symbol": "BAPE",
    "name": "BAPE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BgeRyFWWGHeVouqfHfcXUxmvfkgekhrXYVqQWf63kpJB/logo.png",
    "extensions": {
      "coingeckoId": "bored-ape-social-club",
      "twitter": "https://twitter.com/BAPESocialClub",
      "website": "https://boredapesocial.club"
    }
  },
  {
    "chainId": 101,
    "address": "cwmkTPCxDkYpBjLQRNhcCKxuxnAQW6ahS7JQLeXrsXt",
    "symbol": "CWM",
    "name": "Catalina Whale Mixer Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cwmkTPCxDkYpBjLQRNhcCKxuxnAQW6ahS7JQLeXrsXt/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "E8CLGjBzJD7TPgjfcWm8dvpXhz5pvdjcPxhG7qi7Y5un",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "7SZUnH7H9KptyJkUhJ5L4Kee5fFAbqVgCHvt7B6wg4Xc",
    "symbol": "SDO",
    "name": "TheSolanDAO",
    "decimals": 5,
    "logoURI": "https://thesolandao.com/logohero.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "coingeckoId": "thesolandao",
      "discord": "https://discord.gg/d8z7TAz5WB",
      "reddit": "https://www.reddit.com/r/TheSolanDAO",
      "twitter": "https://twitter.com/TheSolanDAO",
      "website": "https://thesolandao.com"
    }
  },
  {
    "chainId": 101,
    "address": "SuperbZyz7TsSdSoFAZ6RYHfAWe9NmjXBLVQpS8hqdx",
    "symbol": "SB",
    "name": "SuperBonds Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SuperbZyz7TsSdSoFAZ6RYHfAWe9NmjXBLVQpS8hqdx/logo.svg",
    "tags": [
      "defi-token"
    ],
    "extensions": {
      "website": "https://superbonds.finance"
    }
  },
  {
    "chainId": 101,
    "address": "F3nefJBcejYbtdREjui1T9DPh5dBgpkKq7u2GAAMXs5B",
    "symbol": "AART",
    "name": "ALL ART",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/allartprotocol/token-list/main/assets/mainnet/F3nefJBcejYbtdREjui1T9DPh5dBgpkKq7u2GAAMXs5B/logo.jpg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/allart",
      "github": "https://github.com/allartprotocol",
      "medium": "https://allart.medium.com",
      "telegram": "https://t.me/allartprotocol",
      "twitter": "https://twitter.com/AllArtProtocol",
      "website": "https://all.art"
    }
  },
  {
    "chainId": 101,
    "address": "METAmTMXwdb8gYzyCPfXXFmZZw4rUsXX58PNsDg7zjL",
    "symbol": "SLC",
    "name": "Solice",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/METAmTMXwdb8gYzyCPfXXFmZZw4rUsXX58PNsDg7zjL/logo.png",
    "extensions": {
      "coingeckoId": "solice",
      "discord": "https://discord.gg/solice",
      "serumV3Usdc": "DvmDTjsdnN77q7SST7gngLydP1ASNNpUVi4cNfU95oCr",
      "telegram": "https://t.me/solice_io",
      "twitter": "https://twitter.com/solice_io",
      "website": "https://www.solice.io/"
    }
  },
  {
    "chainId": 101,
    "address": "boomh1LQnwDnHtKxWTFgxcbdRjPypRSjdwxkAEJkFSH",
    "symbol": "BMA",
    "name": "Boom Army",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/boomh1LQnwDnHtKxWTFgxcbdRjPypRSjdwxkAEJkFSH/logo.svg",
    "tags": [
      "utility-token",
      "community-token",
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "94jMUy411XNUw1CnkFr2514fq6KRc49W3kAmrjJiuZLx",
    "symbol": "SYXT",
    "name": "SolanyxToken",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/94jMUy411XNUw1CnkFr2514fq6KRc49W3kAmrjJiuZLx/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "solanyx",
      "coinmarketcap": "https://coinmarketcap.com/currencies/solanyx/",
      "discord": "https://discord.gg/solanyx",
      "telegram": "https://t.me/solanyxofficial",
      "twitter": "https://twitter.com/solanyxnft",
      "website": "https://solanyx.com"
    }
  },
  {
    "chainId": 101,
    "address": "HKfs24UEDQpHS5hUyKYkHd9q7GY5UQ679q2bokeL2whu",
    "symbol": "TINY",
    "name": "TinyBits",
    "decimals": 6,
    "logoURI": "https://tinycolony.io/tinycolonytoken.png",
    "tags": [
      "NFT",
      "social-token",
      "utility-token",
      "meta-verse",
      "Game-Token",
      "Game-Fi"
    ],
    "extensions": {
      "coingeckoId": "tiny-colony",
      "description": "An expansive pixelated ecosystem on the Solana Blockchain.",
      "discord": "https://discord.gg/AT9caAbY",
      "github": "https://github.com/TinyColonyGame",
      "instagram": "https://www.instagram.com/tinycolonygame",
      "medium": "https://medium.com/@TinyColonyGame",
      "twitter": "https://twitter.com/TinyColonyGame",
      "website": "http://tinycolony.io/"
    }
  },
  {
    "chainId": 101,
    "address": "D5YJf7nqSp9JtQpMcZCthdEpMghK2gKmkLMLi2RhKSJt",
    "symbol": "$KAIDO",
    "name": "Kaidos Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D5YJf7nqSp9JtQpMcZCthdEpMghK2gKmkLMLi2RhKSJt/Kaido.jpg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://kaidostempest.com"
    }
  },
  {
    "chainId": 101,
    "address": "674PmuiDtgKx3uKuJ1B16f9m5L84eFvNwj3xDMvHcbo7",
    "symbol": "$WOOD",
    "name": "Mindfolk Wood",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/Alfred-builder/Alfred-builder/main/wood.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "mindfolk-wood",
      "discord": "https://discord.gg/mindfolk",
      "twitter": "https://twitter.com/mindfolkART",
      "website": "https://www.mindfolk.art/"
    }
  },
  {
    "chainId": 101,
    "address": "CCKDRAd4Xwjoovtf2s1duu3d4TPTmFRyh1hfrb3ZUGR2",
    "symbol": "MILK",
    "name": "Tiddy Juice Coin",
    "decimals": 9,
    "logoURI": "https://arweave.net/S71DNASA5TYlrK9giRy7QgqFNw1m4mxqY6OdtgY1E7k",
    "tags": [
      "meme-coin"
    ],
    "extensions": {
      "discord": "https://discord.gg/saPvZHEQm4",
      "twitter": "https://twitter.com/tiddyjuicecoin",
      "website": "https://tiddyjuice.com"
    }
  },
  {
    "chainId": 101,
    "address": "AAXng5czWLNtTXHdWEn9Ef7kXMXEaraHj2JQKo7ZoLux",
    "symbol": "DGE",
    "name": "DarleyGo Essence",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/DarleyGo/token-list/main/assets/mainnet/AAXng5czWLNtTXHdWEn9Ef7kXMXEaraHj2JQKo7ZoLux/icon.png",
    "tags": [
      "game-token",
      "game-currency",
      "Gaming"
    ],
    "extensions": {
      "website": "https://darleygo.io"
    }
  },
  {
    "chainId": 101,
    "address": "DsVPH4mAppxKrmdzcizGfPtLYEBAkQGK4eUch32wgaHY",
    "symbol": "GXE",
    "name": "Galaxy Essential",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/DarleyGo/token-list/main/assets/mainnet/DsVPH4mAppxKrmdzcizGfPtLYEBAkQGK4eUch32wgaHY/icon.png",
    "tags": [
      "game-token",
      "game-currency",
      "Gaming"
    ],
    "extensions": {
      "website": "https://darleygo.io"
    }
  },
  {
    "chainId": 101,
    "address": "HMYxhA2ZeSpFjitzP58K7MMJKbKkBuj4P5PHbsmo3rTF",
    "symbol": "TFBK",
    "name": "Fineblock",
    "decimals": 9,
    "logoURI": "logofineblock (1).jpeg",
    "extensions": {
      "assetContract": "https://explorer.solana.com/address/HMYxhA2ZeSpFjitzP58K7MMJKbKkBuj4P5PHbsmo3rTF/largest",
      "description": "TFBK is A token to unlock the loyalty potential of businesses",
      "website": "https://fineblock.eu/"
    }
  },
  {
    "chainId": 101,
    "address": "5Wsd311hY8NXQhkt9cWHwTnqafk7BGEbLu8Py3DSnPAr",
    "symbol": "CMFI",
    "name": "Compendium Finance",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5Wsd311hY8NXQhkt9cWHwTnqafk7BGEbLu8Py3DSnPAr/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "DeFi",
      "Exchange",
      "Application"
    ],
    "extensions": {
      "coingeckoId": "compendium-fi",
      "discord": "https://discord.gg/64r2xtqczs",
      "medium": "https://compendiumfi.medium.com/",
      "serumV3Usdc": "3Mf3bxVS2zLW3bbr9BNbqdiizaUwCGwoi3xhrAXfbFnW",
      "twitter": "https://twitter.com/CompendiumFi",
      "website": "https://compendium.finance/",
      "whitepaper": "https://compendium.finance/litepaper"
    }
  },
  {
    "chainId": 101,
    "address": "2maDvG9nXGVstjdnsCZoSsNtjoda1SsZTLrHBVRgLR5F",
    "symbol": "CORE",
    "name": "CORE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2x4fH7kWNgSLpBjCuFBKKKiNHMcJb6fHs8ahQZUWJj1p/Core.png",
    "tags": [
      "utility"
    ]
  },
  {
    "chainId": 101,
    "address": "Gm6szibJfB1ZzUxNYf85nXwFchugqTqNyE5fDwWfBc7K",
    "symbol": "ILU",
    "name": "ILoveU Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/rjdrar/crypto/main/symbol-1.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7",
    "symbol": "NOS",
    "name": "Nosana",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/nosXBVoaCTtYdLvKY6Csb4AC8JCdQKKAaWYtx2ZMoo7/logo.png",
    "extensions": {
      "coingeckoId": "nosana",
      "discord": "https://discord.gg/nosana",
      "github": "https://github.com/nosana-ci",
      "medium": "https://nosana.medium.com/",
      "telegram": "https://t.me/NosanaCI",
      "twitter": "https://twitter.com/nosana_ci",
      "website": "https://nosana.io/"
    }
  },
  {
    "chainId": 101,
    "address": "A1KWZzcUrsX9MAsL8XtZkuS4RX6fjZazc7K5UoX42M3M",
    "symbol": "ARTZ",
    "name": "Artozo",
    "decimals": 4,
    "logoURI": "https://artozo.mypinata.cloud/ipfs/QmdBoJK2HTRc7B71Xo36VqEXpME7JeexZPJkF1tamdQTTy",
    "tags": [
      "utility-token",
      "payment-token"
    ],
    "extensions": {
      "website": "https://artozo.com"
    }
  },
  {
    "chainId": 101,
    "address": "F14Cp89oAXMrNnaC4mKMNKHPWw2p2R4DRFAZEdJhUBkD",
    "symbol": "MOONBURN",
    "name": "MOONBURN",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/Joblo197/Crypto/main/Shroom%20Logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "3FYzcJvLeQubLuAgacV6sDu9Ye8Eg1vFYpCxD3ogp74M",
    "symbol": "CCG",
    "name": "Collectors Club Gold",
    "decimals": 6,
    "logoURI": "https://arweave.net/0rrcadIfzEyCUv1dCIQKJI-KTkxQEJ3OKy8WYsS6_a0",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/collectorsclub",
      "medium": "https://collectorsclub.medium.com",
      "twitter": "https://twitter.com/TheWatchersCC"
    }
  },
  {
    "chainId": 101,
    "address": "svtMpL5eQzdmB3uqK9NXaQkq8prGZoKQFNVJghdWCkV",
    "symbol": "SVT",
    "name": "Solvent",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/svtMpL5eQzdmB3uqK9NXaQkq8prGZoKQFNVJghdWCkV/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "solvent",
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "HuFKVQNyB177c9DiocQksYzBCtHMRUP5bBXZJzuLvYQm",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "EEhosSQvC2yVDRXRGpkonGFF2WNjtUdzb48GV8TSmhfA",
    "symbol": "AMMO",
    "name": "Ammo",
    "decimals": 9,
    "logoURI": "https://arweave.net/rjP_BdMqFsXBWoInFYuVNDdqLzW1xo82egb74WRl3Hc",
    "tags": [
      "nft-token",
      "staking"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/cryptostraps",
      "twitter": "https://twitter.com/CryptoStraps",
      "website": "https://cryptostraps.io"
    }
  },
  {
    "chainId": 101,
    "address": "CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks",
    "symbol": "GARI",
    "name": "Gari",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks/logo.png",
    "tags": [
      "community-token",
      "utility-token",
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/garitoken",
      "twitter": "https://twitter.com/garitoken",
      "website": "https://gari.network"
    }
  },
  {
    "chainId": 101,
    "address": "2jw1uFmc1hhfJH3EqGhaE2rfZMMC2YBpxkZcdUbPppMn",
    "symbol": "VIVAION",
    "name": "Vivaion Token",
    "decimals": 9,
    "logoURI": "https://arweave.net/Xz7ErS3TZYmBnoh3OPkIQM_O6TPotyEJb6H5WFOe_qc",
    "tags": [
      "community-token",
      "utility-token",
      "social-token",
      "metaverse-token"
    ],
    "extensions": {
      "coingeckoId": "vivaion",
      "discord": "https://discord.gg/vivaion/",
      "twitter": "https://twitter.com/vivaion",
      "website": "https://vivaion.com"
    }
  },
  {
    "chainId": 101,
    "address": "cMETAGX549J6Z5wLWDVHKxEmBibh8YkWvFftCRyaw2a",
    "symbol": "cMETA",
    "name": "cMETA",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/meta-collective/tokens/main/assets/cMETA.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/B6sd88UVmD",
      "twitter": "https://twitter.com/_metaCollective",
      "website": "https://meta-collective.digital/"
    }
  },
  {
    "chainId": 101,
    "address": "Hg35Vd8K3BS2pLB3xwC2WqQV8pmpCm3oNRGYP1PEpmCM",
    "symbol": "eSOL",
    "name": "Eversol staked SOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/everstake/solana-program-library/master/stake-pool/static-content/images/esol_token.jpg",
    "extensions": {
      "medium": "https://medium.com/everstake",
      "twitter": "https://twitter.com/everstake_pool",
      "website": "https://everstake.one"
    }
  },
  {
    "chainId": 101,
    "address": "ACUMENkbnxQPAsN8XrNA11sY3NmXDNKVCqS82EiDqMYB",
    "symbol": "ACM",
    "name": "Acumen Governance Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ACUMENkbnxQPAsN8XrNA11sY3NmXDNKVCqS82EiDqMYB/logo3.svg",
    "extensions": {
      "coingeckoId": "acumen",
      "discord": "https://discord.com/invite/UXDnngxRmn",
      "medium": "https://acumenofficial.medium.com/",
      "serumV3Usdc": "94CZWJMy7Jmc7gSM288WmFfse596H12KCKgwMARkyvhw",
      "twitter": "https://twitter.com/acumenofficial",
      "website": "https://acumen.network/"
    }
  },
  {
    "chainId": 101,
    "address": "pH5wWJc3KhdeVQSt86DU31pdcL9c8P88x2FQoKEJVHC",
    "symbol": "BXS",
    "name": "Bancambios AX",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/pH5wWJc3KhdeVQSt86DU31pdcL9c8P88x2FQoKEJVHC/logo.jpg",
    "tags": [
      "impact-defi",
      "bancambios-token",
      "solana",
      "impact-dex",
      "defi-for-good",
      "multi-chain"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/BXcommunity",
      "facebook": "https://www.facebook.com/bancambios",
      "imageUrl": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/pH5wWJc3KhdeVQSt86DU31pdcL9c8P88x2FQoKEJVHC/image.png",
      "instagram": "https://www.instagram.com/bancambiosx",
      "linkedin": "https://www.linkedin.com/company/bancambios",
      "medium": "https://medium.com/@bancambios",
      "telegram": "https://t.me/bancambiosx",
      "twitter": "https://twitter.com/bancambios",
      "website": "https://bancambios.exchange/"
    }
  },
  {
    "chainId": 101,
    "address": "CkD9GDPqME11zrFt7Lk51jdQSuPmP1nRULUWbBYj2Ngq",
    "symbol": "B4C",
    "name": "b4c meme coin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CkD9GDPqME11zrFt7Lk51jdQSuPmP1nRULUWbBYj2Ngq/logo.png",
    "tags": [
      "meme-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/cryptobac",
      "website": "https://cryptobac.me"
    }
  },
  {
    "chainId": 101,
    "address": "CASHedBw9NfhsLBXq1WNVfueVznx255j8LLTScto3S6s",
    "symbol": "sCASH-8",
    "name": "Saber Wrapped Cashio Dollar (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CASHedBw9NfhsLBXq1WNVfueVznx255j8LLTScto3S6s/icon.png",
    "tags": [
      "stablecoin",
      "saber-mkt-usd",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "coingeckoId": "usd-coin",
      "discord": "https://discord.com/invite/GmkRRKJkuh",
      "medium": "https://medium.com/@cashioapp",
      "twitter": "https://twitter.com/CashioApp",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "EU9aLffrTckFCs16da6CppHy63fAxMPF9ih1erQTuuRt",
    "symbol": "sagEUR-9",
    "name": "Saber Wrapped agEUR (Portal) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EU9aLffrTckFCs16da6CppHy63fAxMPF9ih1erQTuuRt/icon.png",
    "tags": [
      "ethereum",
      "wrapped",
      "wormhole",
      "saber-mkt-eur",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "address": "0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "ageur",
      "description": "Angle is the first decentralized, capital efficient and over-collateralized stablecoin protocol",
      "discord": "https://discord.gg/z3kCpTaKMh",
      "twitter": "https://twitter.com/AngleProtocol",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "UST8SCn7jrqsq51odVLqcmvnC658HkqrKrPL3w2hHQ7",
    "symbol": "sUST-8",
    "name": "Saber Wrapped UST (Portal) (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/UST8SCn7jrqsq51odVLqcmvnC658HkqrKrPL3w2hHQ7/icon.png",
    "tags": [
      "wrapped",
      "wormhole",
      "saber-mkt-usd",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "address": "uusd",
      "bridgeContract": "https://finder.terra.money/columbus-5/address/terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf",
      "coingeckoId": "terra-usd",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "6Dujewcxn1qCd6rcj448SXQL9YYqTcqZCNQdCn3xJAKS",
    "symbol": "ARTE",
    "name": "ARTE",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/ArtPunks/ARTE-token/main/assets/token_512.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "arte",
      "description": "Utility token which is the fuel of the blockchain-art ARTE ecosystem.",
      "discord": "http://discord.gg/artpunks",
      "medium": "https://medium.com/@artpunknft",
      "serumV3Usdc": "4wqFtfechUSNW1nJ3WK5ogy478GTa66H99RrKnz45fa9",
      "twitter": "https://twitter.com/ArtPunksNFT",
      "website": "http://artpunks.fun/"
    }
  },
  {
    "chainId": 101,
    "address": "6fMoTH7Bad61GPzvqfq1XmRGFGv84MrvZfjDKGNuVwBz",
    "symbol": "OXSQ",
    "name": "Ox Squad Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/juandelia03/logo/main/icon400x400.jpg",
    "tags": [
      "utility-token",
      "social-token",
      "nft-token",
      "community"
    ]
  },
  {
    "chainId": 101,
    "address": "PsyFiqqjiv41G7o5SMRzDJCu4psptThNR2GtfeGHfSq",
    "symbol": "PSY",
    "name": "PsyOptions",
    "decimals": 6,
    "logoURI": "https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png",
    "extensions": {
      "coingeckoId": "psyoptions",
      "discord": "https://discord.gg/Ew3dq7dKwp",
      "serumV3Usdc": "CzuipkNnvG4JaTQPjgAseWLNhLZFYxMcYpd2G8hDLHco",
      "twitter": "https://twitter.com/psyoptions",
      "website": "https://psyoptions.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BUD1144GGYwmMRFs4Whjfkom5UHqC9a8dZHPVvR2vfPx",
    "symbol": "BUD",
    "name": "BunnyDucky Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BUD1144GGYwmMRFs4Whjfkom5UHqC9a8dZHPVvR2vfPx/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/BunnyDuckyHQ",
      "website": "https://bunnyducky.com/"
    }
  },
  {
    "chainId": 101,
    "address": "GNCjk3FmPPgZTkbQRSxr6nCvLtYMbXKMnRxg8BgJs62e",
    "symbol": "CELO",
    "name": "CELO (Allbridge from Celo)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GNCjk3FmPPgZTkbQRSxr6nCvLtYMbXKMnRxg8BgJs62e/logo.png",
    "extensions": {
      "coingeckoId": "celo"
    }
  },
  {
    "chainId": 101,
    "address": "EsPKhGTMf3bGoy4Qm7pCv3UCcWqAmbC1UGHBTDxRjjD4",
    "symbol": "FTM",
    "name": "FTM (Allbridge from Fantom)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EsPKhGTMf3bGoy4Qm7pCv3UCcWqAmbC1UGHBTDxRjjD4/logo.png",
    "extensions": {
      "coingeckoId": "fantom"
    }
  },
  {
    "chainId": 101,
    "address": "2YJH1Y5NbdwJGEUAMY6hoTycKWrRCP6kLKs62xiSKWHM",
    "symbol": "GEMS",
    "name": "SolGems",
    "decimals": 9,
    "logoURI": "https://public.djib.io/QmdLDat9CvntvFPG98CcXJJ3tE1mQZkf5DEfPNhK8F3guq",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://dazedducks.com"
    }
  },
  {
    "chainId": 101,
    "address": "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
    "symbol": "FCON",
    "name": "Space Falcon",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/spacefalcon-io/crypto/main/logo.svg",
    "tags": [
      "game-token",
      "utility-token",
      "trading-token"
    ],
    "extensions": {
      "coingeckoId": "spacefalcon",
      "telegram": "https://t.me/spacefalconIO",
      "twitter": "https://twitter.com/SpaceFalconIO",
      "website": "https://spacefalcon.io/"
    }
  },
  {
    "chainId": 101,
    "address": "27nqFZqb2iPBeVA7bbE4KPZrJgi3dJdKV9VzhCguSy6Y",
    "symbol": "POZZ",
    "name": "PozzCoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/dc215007/pozz1/main/logo1.png",
    "tags": [
      "social-token",
      "meme-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/pozzcoin",
      "website": "https://pozzco.in"
    }
  },
  {
    "chainId": 101,
    "address": "GYCVdmDthkf3jSz5ns6fkzCmHub7FSZxjVCfbfGqkH7P",
    "symbol": "GYC",
    "name": "GameYoo Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/gameyoo/materials/main/gyc.png",
    "tags": [
      "social-token",
      "community-token",
      "utility-token",
      "game-token",
      "game-currency",
      "GameFi",
      "Gaming",
      "metaverse",
      "play-to-earn",
      "play-to-contribute"
    ],
    "extensions": {
      "github": "https://github.com/gameyoo",
      "twitter": "https://twitter.com/GameYooOfficial",
      "website": "https://gameyoo.io"
    }
  },
  {
    "chainId": 101,
    "address": "HonyeYAaTPgKUgQpayL914P6VAqbQZPrbkGMETZvW4iN",
    "symbol": "$HONEY",
    "name": "HONEY",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HonyeYAaTPgKUgQpayL914P6VAqbQZPrbkGMETZvW4iN/logo.svg",
    "tags": [
      "utility-token",
      "DeFi",
      "Governance"
    ],
    "extensions": {
      "discord": "https://discord.gg/honeydefi",
      "website": "https://honey.finance"
    }
  },
  {
    "chainId": 101,
    "address": "CFbdjaKonbBQTYG2GC6CmB7exofgDYGCDR8tp8KVGS7T",
    "symbol": "BORG",
    "name": "Cyborg Apes BORG",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CFbdjaKonbBQTYG2GC6CmB7exofgDYGCDR8tp8KVGS7T/logo.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/wunVdsjwZT",
      "twitter": "https://twitter.com/CyborgApesNFT",
      "website": "https://www.cyborg-apes.com/"
    }
  },
  {
    "chainId": 101,
    "address": "RLYv2ubRMDLcGG2UyvPmnPmkfuQTsMbg4Jtygc7dmnq",
    "symbol": "sRLY",
    "name": "Rally (Solana)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/RLYv2ubRMDLcGG2UyvPmnPmkfuQTsMbg4Jtygc7dmnq/logo.png",
    "extensions": {
      "coingeckoId": "rally-solana",
      "website": "https://rly.network"
    }
  },
  {
    "chainId": 101,
    "address": "2zzC22UBgJGCYPdFyo7GDwz7YHq5SozJc1nnBqLU8oZb",
    "symbol": "1SP",
    "name": "1SPACE",
    "decimals": 9,
    "logoURI": "https://1space.me/images/1SP_logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "telegram": "https://t.me/+jDm8ioFvec5iNzFk",
      "website": "https://1space.me/"
    }
  },
  {
    "chainId": 101,
    "address": "76DThuyLHagfkm2ssYw6Lv7k3MYHx6tXcwPBLU9tXm4D",
    "symbol": "BASIC",
    "name": "Basic Tokens",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/76DThuyLHagfkm2ssYw6Lv7k3MYHx6tXcwPBLU9tXm4D/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/basicapesociety",
      "website": "https://www.basicapesociety.com/"
    }
  },
  {
    "chainId": 101,
    "address": "C6qep3y7tCZUJYDXHiwuK46Gt6FsoxLi8qV1bTCRYaY1",
    "symbol": "LSTAR",
    "name": "Learning Star",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/D3yigvdWq6qobhAwQL6UiSide5W9W7zcJbuVvKa3T231/logo.png",
    "tags": [
      "play2earn",
      "learn2earn"
    ],
    "extensions": {
      "discord": "https://discord.gg/letmespeak",
      "instagram": "https://www.instagram.com/letmespeak_org",
      "telegram": "https://t.me/letmespeak_org",
      "twitter": "https://twitter.com/Letmespeak_org",
      "website": "https://www.letmespeak.org"
    }
  },
  {
    "chainId": 101,
    "address": "BB33fYoeBVA2uv119be9tKvmXeuwtcx1W25N9KFNd2ca",
    "symbol": "GODZ",
    "name": "Godz Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BB33fYoeBVA2uv119be9tKvmXeuwtcx1W25N9KFNd2ca/logo.jpg",
    "tags": [
      "utility-token",
      "nft-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/BGnCshGWgk",
      "twitter": "https://twitter.com/pocketgodz",
      "website": "https://www.pocketgodz.xyz/"
    }
  },
  {
    "chainId": 101,
    "address": "5fTwKZP2AK39LtFN9Ayppu6hdCVKfMGVm79F2EgHCtsi",
    "symbol": "WHEY",
    "name": "WHEY",
    "decimals": 6,
    "logoURI": "https://secureservercdn.net/160.153.138.53/cjm.06a.myftpupload.com/wp-content/uploads/2021/12/whey-coin-2048x2048.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "whey-token",
      "twitter": "https://twitter.com/shreddedapes",
      "website": "https://shreddedapes.io/"
    }
  },
  {
    "chainId": 101,
    "address": "DiWunPY8GfsFthdDAwiRRtCgKCB5AEcFx9edDpxZoTyo",
    "symbol": "GMORNN",
    "name": "gmornn",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DiWunPY8GfsFthdDAwiRRtCgKCB5AEcFx9edDpxZoTyo/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/g_mornn",
      "website": "https://twitter.com/g_mornn"
    }
  },
  {
    "chainId": 101,
    "address": "DMCUFm2ZAnSU7UgsdVq23gRogMU3MEBjPgQF1gK53rEn",
    "symbol": "UM",
    "name": "UncleMine",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DMCUFm2ZAnSU7UgsdVq23gRogMU3MEBjPgQF1gK53rEn/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "Defi",
      "NFT"
    ],
    "extensions": {
      "discord": "https://discord.gg/ScuJCZtDHs",
      "medium": "https://medium.com/@UncleMine",
      "telegram": "https://t.me/unclemineEN",
      "twitter": "https://twitter.com/uncleminenews",
      "website": "https://unclemine.org",
      "whitepaper": "https://wiki.unclemine.org"
    }
  },
  {
    "chainId": 101,
    "address": "GKNr1Gwf7AMvEMEyMzBoEALVBvCpKJue9Lzn9HfrYYhg",
    "symbol": "SIXY",
    "name": "611Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/dc215007/611/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "GTuDe5yneFKaWSsPqqKgu413KTk8WyDnUZcZUGxuNYsT",
    "symbol": "DASCH",
    "name": "Dasch Coin",
    "decimals": 9,
    "logoURI": "https://github.com/kennethoqs/dasch/blob/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6",
    "symbol": "HBB",
    "name": "Hubble Protocol Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg",
    "tags": [
      "stake-pool-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "coingeckoId": "hubble",
      "coinmarketcap": "https://coinmarketcap.com/currencies/hubble-protocol/",
      "discord": "https://discord.gg/d44A8WvK",
      "twitter": "https://twitter.com/hubbleprotocol",
      "website": "https://hubbleprotocol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "F2CcdH4uXVL6vwutkFMtHWFaj87dYSh9WMWNqzsMmTUG",
    "symbol": "ENC",
    "name": "crypt",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/encryptedsolana/crypt/main/logo.png",
    "tags": [
      "social-token",
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
    "symbol": "USDH",
    "name": "USDH Hubble Stablecoin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usdh",
      "discord": "https://discord.gg/d44A8WvK",
      "twitter": "https://twitter.com/hubbleprotocol",
      "website": "https://hubbleprotocol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "EGiWZhNk3vUNJr35MbL2tY5YD6D81VVZghR2LgEFyXZh",
    "symbol": "BIT",
    "name": "BIT Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Gtj6NZHgMZ7QHg8PDN6izEn4GjVoX8yFLv4ESNKsWb62/BT-logo.png",
    "tags": [
      "utility-token",
      "Game-Token"
    ],
    "extensions": {
      "discord": "https://discord.gg/bitmon",
      "twitter": "https://twitter.com/BitmonWorld",
      "website": "https://bitmon.io/"
    }
  },
  {
    "chainId": 101,
    "address": "76aYNHbDfHemxSS7vmh6eJGfjodK8m7srCxiYCrKxzY1",
    "symbol": "ROLL",
    "name": "HRHC Token",
    "decimals": 6,
    "logoURI": "https://hrhc.io/images/logo.png",
    "tags": [
      "community-token",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/rJjFqcJf",
      "twitter": "https://twitter.com/HighRollerHC",
      "website": "https://hrhc.io"
    }
  },
  {
    "chainId": 101,
    "address": "CpFE715P5DnDoJj9FbCRcuyHHeTXNdRnvzNkHvq1o23U",
    "symbol": "DARC",
    "name": "DARC Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/Konstellation/DARC_token/main/256darctoken.png",
    "tags": [
      "utility-token",
      "wrapped"
    ],
    "extensions": {
      "coingeckoId": "darcmatter-coin",
      "description": "Konstellation is a decentralized cross-chain capital markets protocol built on Cosmos. It is aimed to efficiently connect funds and the various components of the asset management industry with investors. Konstellation intends to be the financial services industry hub for Cosmos and other blockchain ecosystems through strategic inter-blockchain communications. The network is powered by DARC tokens, which are required for the Konstellation network’s governance and transactions.",
      "facebook": "https://www.facebook.com/Konstellation.tech/",
      "imageUrl": "https://raw.githubusercontent.com/Konstellation/DARC_token/main/256darctoken.png",
      "linkedin": "https://www.linkedin.com/company/konstellation-tech/",
      "medium": "https://konstellation.medium.com/",
      "telegram": "https://t.me/Konstellation",
      "website": "https://konstellation.tech/"
    }
  },
  {
    "chainId": 101,
    "address": "NaFJTgvemQFfTTGAq2PR1uBny3NENWMur5k6eBsG5ii",
    "symbol": "NAGA",
    "name": "Naga Kingdom",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/NaFJTgvemQFfTTGAq2PR1uBny3NENWMur5k6eBsG5ii/logo.png",
    "tags": [
      "utility-token",
      "game-token",
      "io-game",
      "GameFi",
      "Gaming"
    ],
    "extensions": {
      "description": "The most entertaining .io game on Solana",
      "discord": "https://discord.gg/nagakingdom",
      "facebook": "https://www.facebook.com/NagaKingdomGame",
      "medium": "https://medium.com/@NagaKingdom",
      "reddit": "https://www.reddit.com/r/nagakingdom",
      "telegram": "https://t.me/nagakingdom",
      "twitter": "https://twitter.com/NagaKingdom",
      "website": "https://naga.gg/"
    }
  },
  {
    "chainId": 101,
    "address": "Ma4dse7fmzXLQYymNsDDjq6VgRXtEFTJw1CvmRrBoKN",
    "symbol": "MAGA",
    "name": "Magic Eggs",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ma4dse7fmzXLQYymNsDDjq6VgRXtEFTJw1CvmRrBoKN/logo.png",
    "tags": [
      "utility-token",
      "game-token",
      "io-game",
      "GameFi",
      "Gaming"
    ],
    "extensions": {
      "description": "The most entertaining .io game on Solana",
      "discord": "https://discord.gg/nagakingdom",
      "facebook": "https://www.facebook.com/NagaKingdomGame",
      "medium": "https://medium.com/@NagaKingdom",
      "reddit": "https://www.reddit.com/r/nagakingdom",
      "telegram": "https://t.me/nagakingdom",
      "twitter": "https://twitter.com/NagaKingdom",
      "website": "https://naga.gg/"
    }
  },
  {
    "chainId": 101,
    "address": "CY2E69dSG9vBsMoaXDvYmMDSMEP4SZtRY1rqVQ9tkNDu",
    "symbol": "NFD",
    "name": "Feisty Doge NFT",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CY2E69dSG9vBsMoaXDvYmMDSMEP4SZtRY1rqVQ9tkNDu/logo.svg",
    "tags": [
      "ethereum",
      "wrapped",
      "wormhole",
      "fractionalized-nft"
    ],
    "extensions": {
      "address": "0xdfdb7f72c1f195c5951a234e8db9806eb0635346",
      "assetContract": "https://etherscan.io/address/0xdfdb7f72c1f195c5951a234e8db9806eb0635346",
      "bridgeContract": "https://etherscan.io/address/0x3ee18B2214AFF97000D974cf647E7C347E8fa585",
      "coingeckoId": "feisty-doge-nft",
      "description": "The first fractionalized doge NFT, backed by one of the most culturally significant digital assets in all of crypto",
      "discord": "https://discord.gg/JNKbZur9gd",
      "twitter": "https://twitter.com/feistydogenfd",
      "website": "https://www.feistydoge.art/"
    }
  },
  {
    "chainId": 101,
    "address": "9iz45n44TQUPyoRymdZXEunqvZUksZyhzS6zQ7sLMadj",
    "symbol": "POT",
    "name": "Positron",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iz45n44TQUPyoRymdZXEunqvZUksZyhzS6zQ7sLMadj/logo.png",
    "tags": [
      "utility-token",
      "social-token",
      "governance-token"
    ],
    "extensions": {
      "description": "POT is a utility token for Ubik LoFi metaverse."
    }
  },
  {
    "chainId": 101,
    "address": "Foxy7Df6VEc1dUCr1ExZfRAqqHaifNFDd8ccvAs59DNr",
    "symbol": "FOXY",
    "name": "Foxy",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/foxytoken/foxytoken/main/foxy.png",
    "extensions": {
      "discord": "https://discord.gg/9Yph9njFNF",
      "github": "https://github.com/foxytoken",
      "telegram": "https://t.me/foxyarmy",
      "twitter": "https://twitter.com/joinfoxyarmy",
      "website": "https://foxy.army"
    }
  },
  {
    "chainId": 101,
    "address": "KARTdF5K68Q2nGppizG3DeCzp7AhHy6YXf2uTQjBSQx",
    "symbol": "VROOM",
    "name": "Mushroom Racers Token",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KARTdF5K68Q2nGppizG3DeCzp7AhHy6YXf2uTQjBSQx/logo.png"
  },
  {
    "chainId": 101,
    "address": "9mWRABuz2x6koTPCWiCPM49WUbcrNqGTHBV9T9k7y1o7",
    "symbol": "MAI",
    "name": "MAI Stablecoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/0xlaozi/qidao/main/images/mimatic-red.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/mQq55j65xJ",
      "twitter": "https://twitter.com/QiDaoProtocol",
      "website": "https://mai.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "2pLrCRnbYBGbhANbUvkFXDYuuRNZNkesbvc8WSMQ9unX",
    "symbol": "DEVX",
    "name": "developer experience",
    "decimals": 9,
    "logoURI": "https://user-images.githubusercontent.com/35096265/151653614-7271949c-5d16-4b0e-b06f-af5b5983fb8d.png",
    "tags": [
      "utility-token",
      "Community-Token"
    ]
  },
  {
    "chainId": 101,
    "address": "4mJ6N65rD9w6sFPQ17UDWot2H64UtzR31biVLaKpZT6J",
    "symbol": "ALIEN",
    "name": "AlienUniverse Token",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/alien-universe/assets/main/logo.png",
    "tags": [
      "game-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/AlienUniversNFT",
      "website": "https://alienuniverse.io/"
    }
  },
  {
    "chainId": 101,
    "address": "MonYu4GQb1dpoMs4DG1FpJt5F9nXtUy6JRyvANZFxZu",
    "symbol": "MONY",
    "name": "Mooney Token",
    "decimals": 6,
    "logoURI": "https://arweave.net/b-zptDkkRt3xz9dNflpUxRMJMqFq40tPVS5wjuicDd4",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/moondusa",
      "telegram": "https://t.me/MoondusaTheNFT",
      "twitter": "https://twitter.com/Moondusa",
      "website": "https://moondusanft.io"
    }
  },
  {
    "chainId": 101,
    "address": "Taki7fi3Zicv7Du1xNAWLaf6mRK7ikdn77HeGzgwvo4",
    "symbol": "TAKI",
    "name": "Taki",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Taki7fi3Zicv7Du1xNAWLaf6mRK7ikdn77HeGzgwvo4/logo.png",
    "extensions": {
      "website": "https://gettaki.com"
    }
  },
  {
    "chainId": 101,
    "address": "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    "symbol": "DUST",
    "name": "DUST Protocol",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/dedao",
      "twitter": "https://twitter.com/degodsnft",
      "website": "https://docs.dustprotocol.com/"
    }
  },
  {
    "chainId": 101,
    "address": "H5euuuZXAuFak2NVTMu53fckdkHFWuJzXXb3TfKTrLWK",
    "symbol": "DEV",
    "name": "DevCoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/thedevdojo/devcoin/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "9e6nnqbsTjWx3ss6a3x7Q9ZvpupLNYLb8cTbVmm6UD2K",
    "symbol": "SHUT",
    "name": "Shuttlecoin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/Mikkel76543/crypto9/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "8yQuj5v4s72UqZi3sYZL5rAD4NPV4ueUwBKzChBDWMVf",
    "symbol": "MRX",
    "name": "Maars",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/maarstoken/crypto/main/maars-800x800.png",
    "tags": [
      "social-token",
      "community-token",
      "nft-token",
      "gaming-token",
      "web3-token"
    ]
  },
  {
    "chainId": 101,
    "address": "7eJCLyW5KkvzdzkVXs1ukA1WfFjCcocXjVit64tYcown",
    "symbol": "SLITE",
    "name": "SolanaLite",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/SolanaLite/SolanaLite-Brand-Kit/main/SolanaLite%20(SLITE)%20Logo%20Solana%20Blockchain.svg",
    "tags": [
      "SolanaLite"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/GbQAgQKxdN",
      "reddit": "https://www.reddit.com/r/SolanaLite",
      "telegram": "https://t.me/SolanaLite",
      "twitter": "https://twitter.com/SolanaLite",
      "website": "https://www.solanalite.io"
    }
  },
  {
    "chainId": 101,
    "address": "7sWMHQaJJPn1rkeizq41iPiW5gG7Ry7PXYAVHaUwY4qu",
    "symbol": "EDO",
    "name": "EDO",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7sWMHQaJJPn1rkeizq41iPiW5gG7Ry7PXYAVHaUwY4qu/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/E7yWZrzvXj",
      "twitter": "https://twitter.com/SenshiNFT",
      "website": "https://senshisamurai.com/"
    }
  },
  {
    "chainId": 101,
    "address": "WNZzxM1WqWFH8DpDZSqr6EoHKWXeMx9NLLd2R5RzGPA",
    "symbol": "$WNZ",
    "name": "Winerz",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/WNZzxM1WqWFH8DpDZSqr6EoHKWXeMx9NLLd2R5RzGPA/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "payment-token",
      "game-token"
    ],
    "extensions": {
      "facebook": "https://www.facebook.com/winerz.official",
      "instagram": "https://www.instagram.com/winerz.official/",
      "medium": "https://medium.com/@winerz",
      "twitter": "https://twitter.com/Winerz_official",
      "website": "https://winerz.com/",
      "whitepaper": "https://ico.winerz.com/assets/docs/Winerz-Token-Economics.pdf"
    }
  },
  {
    "chainId": 101,
    "address": "KAT2oYwjN2uVj9gubM9VutCFMoX1Wq9eLiwJJEpBEX3",
    "symbol": "9LIVES",
    "name": "9LIVES",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/KAT2oYwjN2uVj9gubM9VutCFMoX1Wq9eLiwJJEpBEX3/9lives.png",
    "tags": [
      "utility-token",
      "community"
    ],
    "extensions": {
      "discord": "http://discord.gg/cyberkatz",
      "twitter": "https://twitter.com/thecyberkatz",
      "website": "https://cyberkatz.space"
    }
  },
  {
    "chainId": 101,
    "address": "H1QvHLhmk4rL36FBphnFUaQszf6RHGU8RLptPSuPcQwX",
    "symbol": "BUGS",
    "name": "BUGS",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/H1QvHLhmk4rL36FBphnFUaQszf6RHGU8RLptPSuPcQwX/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/FroggosNFT",
      "website": "http://froggosnft.com/"
    }
  },
  {
    "chainId": 101,
    "address": "8JnNWJ46yfdq8sKgT1Lk4G7VWkAA8Rhh7LhqgJ6WY41G",
    "symbol": "SOLI",
    "name": "Solana Ecosystem Index",
    "decimals": 6,
    "logoURI": "https://cdn.lima.amun.com/solana/8jnnwj46yfdq8skgt1lk4g7vwkaa8rhh7lhqgj6wy41g.png",
    "tags": [
      "index-token",
      "index",
      "defi-index",
      "defi",
      "solana-ecosystem"
    ],
    "extensions": {
      "description": "SOLI is an index of the Solana ecosystem. It delivers easy, low-cost, diversified exposure to top Solana-native projects. By using staked SOL (mSOL), the index also captures Solana's 6% staking yield. SOLI rebalances monthly to catch trends in the ecosystem.",
      "discord": "https://discord.gg/amun",
      "medium": "https://medium.com/amun-tokens",
      "telegram": "https://t.me/AmunTokens",
      "twitter": "https://twitter.com/amun",
      "website": "https://amun.com/"
    }
  },
  {
    "chainId": 101,
    "address": "5XiE2JApnDwGc24PSY7y7stD4JxStkYPAH5tFVKAcrow",
    "symbol": "ORIA",
    "name": "Memoria",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5XiE2JApnDwGc24PSY7y7stD4JxStkYPAH5tFVKAcrow/Logo.png",
    "tags": [
      "Gaming-token",
      "NFT-token",
      "Metaverse"
    ]
  },
  {
    "chainId": 101,
    "address": "fujiCeCeP9AFDVCv27P5JRcKLoH7wfs2C9xmDECs24m",
    "symbol": "FUJI",
    "name": "FUJI",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/MarkSackerberg/token-list/main/assets/mainnet/fujiCeCeP9AFDVCv27P5JRcKLoH7wfs2C9xmDECs24m/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://fujilions.io/"
    }
  },
  {
    "chainId": 101,
    "address": "75XracgnqjPeuexHKWQU3bBcXMZG6XLDF867tKB1T9e6",
    "symbol": "ISL",
    "name": "The Islanders",
    "decimals": 9,
    "logoURI": "https://cdn.jsdelivr.net/gh/koudydev/crypto/main/islIcon.png",
    "tags": [
      "game-token",
      "gaming"
    ],
    "extensions": {
      "description": "The Islanders Game coin",
      "discord": "https://discord.com/channels/937754422270885889/937754422270885892",
      "facebook": "https://www.facebook.com/ISLGame",
      "instagram": "https://www.instagram.com/theislandersgame/",
      "twitter": "https://twitter.com/ISLGame",
      "website": "https://theislandersgame.com/"
    }
  },
  {
    "chainId": 101,
    "address": "42Y3CgJQLnHjdScYMu8VS4TbeZMUNVdBMKYbf7hz7aum",
    "symbol": "GMFC",
    "name": "Gamify Club",
    "decimals": 6,
    "logoURI": "https://pbs.twimg.com/profile_images/1444964749897175046/wdz26CzM_400x400.jpg",
    "tags": [
      "gamefi",
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "9ZLBKPCzkvDv85hojKofsogsESkJMN164QCVUtxvBxEQ",
    "symbol": "SLDR",
    "name": "Solderland",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9ZLBKPCzkvDv85hojKofsogsESkJMN164QCVUtxvBxEQ/logo.jpg",
    "extensions": {
      "twitter": "https://twitter.com/solderland",
      "website": "https://solderland.com/"
    }
  },
  {
    "chainId": 101,
    "address": "Et3k45YA6ZMur4GcjuYJiiZSdnr78Jt2AhMbWs4cs3B",
    "symbol": "GNOM",
    "name": "GnomToken",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/onuraladi/CoinGnom/main/gnomcoin.png",
    "tags": [
      "utility-token",
      "community-token",
      "nft-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/CFgTvwDEHf",
      "twitter": "https://twitter.com/GnarlyGnomies",
      "website": "https://gnomiezgen2.fun/"
    }
  },
  {
    "chainId": 101,
    "address": "CBV12y1pehFbhdnDpUfgPe88SbUZ5G2s1kLA449Yu3Ad",
    "symbol": "GUARD",
    "name": "VANGUARD",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CBV12y1pehFbhdnDpUfgPe88SbUZ5G2s1kLA449Yu3Ad/logo.png",
    "tags": [
      "VANGUARD"
    ],
    "extensions": {
      "discord": "https://discord.gg/thevanguards",
      "twitter": "https://twitter.com/Vanguards_SOL",
      "website": "https://vanguards.world/"
    }
  },
  {
    "chainId": 101,
    "address": "epchejN2prm44RwMfWetBkbMr4wnEXHmMN9nmKyx2TQ",
    "symbol": "EPOCH",
    "name": "Playground Epoch Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/epchejN2prm44RwMfWetBkbMr4wnEXHmMN9nmKyx2TQ/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "2QxNtz8xeSZeY5kmFsGUbsqwqE5zQXdMfeHYUac1KvuT",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "GePFQaZKHcWE5vpxHfviQtH5jgxokSs51Y5Q4zgBiMDs",
    "symbol": "JFI",
    "name": "Jungle DeFi",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GePFQaZKHcWE5vpxHfviQtH5jgxokSs51Y5Q4zgBiMDs/logo.png",
    "tags": [
      "governance-token"
    ],
    "extensions": {
      "description": "The Jungle Finance governance token.",
      "discord": "https://discord.gg/2DWjx5NywE",
      "medium": "https://medium.com/@JungleDeFi",
      "twitter": "https://twitter.com/JungleDeFi",
      "website": "https://jungledefi.io/"
    }
  },
  {
    "chainId": 101,
    "address": "BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3",
    "symbol": "prtSOL",
    "name": "prtSOL (Parrot Staked SOL)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BdZPG9xWrG3uFrx2KrUW1jT4tZ9VKPDWknYihzoPRJS3/logo.svg",
    "extensions": {
      "discord": "https://discord.gg/gopartyparrot",
      "medium": "https://gopartyparrot.medium.com/",
      "telegram": "https://t.me/gopartyparrot",
      "twitter": "https://twitter.com/gopartyparrot",
      "website": "https://parrot.fi"
    }
  },
  {
    "chainId": 101,
    "address": "9mXZ54YnJJRmUN2MaMEtWCfFyoncP4ZhKz7U9DZ4JY2X",
    "symbol": "SPACEGOLD",
    "name": "SPACEGOLD",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/cosmic-condos/SPACEGOLD/main/logo-icon.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/CosmicCondos",
      "website": "https://cosmiccondos.io/"
    }
  },
  {
    "chainId": 101,
    "address": "Czt7Fc4dz6BpLh2vKiSYyotNK2uPPDhvbWrrLeD9QxhV",
    "symbol": "NESTA",
    "name": "Nest Arcade",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Czt7Fc4dz6BpLh2vKiSYyotNK2uPPDhvbWrrLeD9QxhV/logo.png",
    "tags": [
      "game-token"
    ],
    "extensions": {
      "website": "https://nestarcade.io"
    }
  },
  {
    "chainId": 101,
    "address": "GVsdtSe3E2fQoP3TzNT2M1VUchJ7sBmDBuvBZmGDGvmB",
    "symbol": "PEEL",
    "name": "PEEL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GVsdtSe3E2fQoP3TzNT2M1VUchJ7sBmDBuvBZmGDGvmB/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SolKongz",
      "website": "https://www.solkongz.net/"
    }
  },
  {
    "chainId": 101,
    "address": "4vXidyArpT8fyQTmfXfMNHitj5ay1Fjcnbw9fJLL2zBa",
    "symbol": "HONSHU",
    "name": "HONSHU",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4vXidyArpT8fyQTmfXfMNHitj5ay1Fjcnbw9fJLL2zBa/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/HonshuWolves"
    }
  },
  {
    "chainId": 101,
    "address": "htoHLBJV1err8xP5oxyQdV2PLQhtVjxLXpKB7FsgJQD",
    "symbol": "HTO",
    "name": "HTO",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/htoHLBJV1err8xP5oxyQdV2PLQhtVjxLXpKB7FsgJQD/logo.png",
    "tags": [
      "utility-token",
      "governance-token",
      "metaverse"
    ],
    "extensions": {
      "twitter": "https://twitter.com/heavenland_io",
      "website": "https://heavenland.io/"
    }
  },
  {
    "chainId": 101,
    "address": "DPuGqV7jq9PEbcRU7bWzuaJx5bGiaVj4cNWhWjTdWAKi",
    "symbol": "DOPIES",
    "name": "DOPE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DPuGqV7jq9PEbcRU7bWzuaJx5bGiaVj4cNWhWjTdWAKi/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/DopeApes"
    }
  },
  {
    "chainId": 101,
    "address": "4onzDs1X6ubktirorHB8iYbve3K4bBtkGpYehqzGm9So",
    "symbol": "BIJU",
    "name": "BIJU",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4onzDs1X6ubktirorHB8iYbve3K4bBtkGpYehqzGm9So/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/KuramaFoxes",
      "website": "https://kuramafoxes.io/"
    }
  },
  {
    "chainId": 101,
    "address": "68RRPuZQrrw3whXHm9LSyC4y8iLrjkTm5Brc2tUMLNPw",
    "symbol": "CLAN",
    "name": "Clan Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/SolPatrol/SolPatrol/main/%24CLAN_Token.png",
    "tags": [
      "NFT"
    ]
  },
  {
    "chainId": 101,
    "address": "32CHtMAuGaCAZx8Rgp54jSFG3ihbpN5brSvRAWpwEHPv",
    "symbol": "DAB",
    "name": "DAB COIN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/SolPatrol/SolPatrol/main/basc-coin.png",
    "tags": [
      "NFT"
    ]
  },
  {
    "chainId": 101,
    "address": "Gh1jKzmxf95cT5PQabNbfJskkQU8kQ5UugfpbHSnPq9z",
    "symbol": "NRC",
    "name": "Neon Rocket Coin",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/neontechanoah/neon_rocket_coin/main/asset/NRC_Logo_100px.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/NeonRocketCoin"
    }
  },
  {
    "chainId": 101,
    "address": "6FLsSkF4AqQeDuqEmGPyBZvVebc4WWWntnZP2QZyBzG8",
    "symbol": "JJJJC",
    "name": "JJC",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6FLsSkF4AqQeDuqEmGPyBZvVebc4WWWntnZP2QZyBzG8/logo.png",
    "tags": [
      "social-token",
      "nft-token",
      "game-token",
      "jjcverse"
    ]
  },
  {
    "chainId": 101,
    "address": "8ZepSXp47WFyDK21QbvMiiKVWRHnGrAegiwDr71PfGi3",
    "symbol": "$ROBO",
    "name": "ROBO Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/CMHayden/crypto/master/robocoin.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/cN4qECwt68",
      "twitter": "https://twitter.com/robotmafiaclub"
    }
  },
  {
    "chainId": 101,
    "address": "RoLLn5qBN4juQ1D2KFpJyAcC7Deo3cYotXi4qDooHLU",
    "symbol": "ROL",
    "name": "ROL",
    "decimals": 6,
    "logoURI": "https://assets.blockstars.gg/static/ROL.svg",
    "tags": [
      "utility-token",
      "game-token"
    ],
    "extensions": {
      "description": "$ROL is the core gameplay token used in Blockstars, Solana's first management simulation game.",
      "discord": "https://discord.gg/blockstars",
      "facebook": "https://www.facebook.com/blockstarsgame",
      "instagram": "https://instagram.com/blockstarsgame",
      "medium": "https://blog.blockstars.gg",
      "reddit": "https://www.reddit.com/r/blockstarsgame",
      "twitter": "https://twitter.com/blockstarsgame",
      "website": "https://blockstars.gg"
    }
  },
  {
    "chainId": 101,
    "address": "7GNyprqrpvJHNwzWSj4KVkqw9cKyV5aR3ehM2HeE5pw",
    "symbol": "Miku",
    "name": "Mikuko Token",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7GNyprqrpvJHNwzWSj4KVkqw9cKyV5aR3ehM2HeE5pw/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/kirinkingdom",
      "twitter": "https://twitter.com/Kirin_Kingdom"
    }
  },
  {
    "chainId": 101,
    "address": "C5xtJBKm24WTt3JiXrvguv7vHCe7CknDB7PNabp4eYX6",
    "symbol": "T1NY",
    "name": "Tiny Bonez",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/danvernon/tiny-dogz-logo/main/coin.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/K3rqQVxDdX",
      "twitter": "https://twitter.com/TinyDogzNFT",
      "website": "https://www.tinydogz.com"
    }
  },
  {
    "chainId": 101,
    "address": "4xDPH7DVtDXA2eU6wp9BjhryfXEdxBuhe4hnEc9yz1pJ",
    "symbol": "BOLT",
    "name": "Bolt Token",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4xDPH7DVtDXA2eU6wp9BjhryfXEdxBuhe4hnEc9yz1pJ/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/skullbots",
      "twitter": "https://twitter.com/SKULLBOTS",
      "website": "https://www.skullbots.io/"
    }
  },
  {
    "chainId": 101,
    "address": "5EbpXhW7t8ypBF3Q1X7odFaHjuh7XJfCohXR3VYAW32i",
    "symbol": "MALL",
    "name": "MetaMall",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5EbpXhW7t8ypBF3Q1X7odFaHjuh7XJfCohXR3VYAW32i/logo.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "website": "https://metamalls.io"
    }
  },
  {
    "chainId": 101,
    "address": "32gaR4rn9JyzoDVwMzZ5j3NgcHc5RQhMSJby55FFKnq3",
    "symbol": "RIBBET",
    "name": "RIBBET",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/32gaR4rn9JyzoDVwMzZ5j3NgcHc5RQhMSJby55FFKnq3/logo.png",
    "tags": [
      "social-token",
      "meme-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/metafrogbizclub",
      "website": "https://www.metafrogbusinessclub.com/"
    }
  },
  {
    "chainId": 101,
    "address": "5yw793FZPCaPcuUN4F61VJh2ehsFX87zvHbCA4oRebfn",
    "symbol": "RICE",
    "name": "RICE",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/kakasonz112/robocock-token/main/assets/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/robococknft",
      "twitter": "https://twitter.com/RoboCockNFT",
      "website": "https://robocock.io/"
    }
  },
  {
    "chainId": 101,
    "address": "hone3CJTYjczb5nJh45KCNMkjrKMt7SCnHkWGWsVfVu",
    "symbol": "HONE",
    "name": "Yokoito Crew Hone",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/hone3CJTYjczb5nJh45KCNMkjrKMt7SCnHkWGWsVfVu/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/kcYuqWu9Qr",
      "twitter": "https://twitter.com/yokoitocrew",
      "website": "https://yokoitocrew.org/"
    }
  },
  {
    "chainId": 101,
    "address": "bonegFPgrpZ4bfVn3kQK1aMbGYddWtfMAywNt5LsuVE",
    "symbol": "BONES",
    "name": "BONES Token",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bonegFPgrpZ4bfVn3kQK1aMbGYddWtfMAywNt5LsuVE/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/souldogs",
      "instagram": "https://www.instagram.com/souldogscity/",
      "medium": "https://medium.com/@souldogscity",
      "twitter": "https://twitter.com/SoulDogsNFT",
      "website": "https://souldogs.city/"
    }
  },
  {
    "chainId": 101,
    "address": "BKydRTNdaMJ8B4zPva3YhwUQcpvAsyZaGJnKA6F44fX7",
    "symbol": "FBZ",
    "name": "FakeBiz",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BKydRTNdaMJ8B4zPva3YhwUQcpvAsyZaGJnKA6F44fX7/logo.png",
    "tags": [
      "social-token",
      "util-token",
      "web3"
    ],
    "extensions": {
      "instagram": "https://www.instagram.com/timjdillon",
      "twitter": "https://twitter.com/FakeBiz_FBZ",
      "website": "https://www.fakebiz.io/"
    }
  },
  {
    "chainId": 101,
    "address": "B8wCsjSv3TDZcaLuhPZNDvpk2vuBtRgpgmTuvoDAJZZ7",
    "symbol": "CHIMP",
    "name": "Chimp",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/tsbsoltn/soltn/main/chimp/logo.png",
    "tags": [
      "community-token",
      "social-token",
      "meme-token"
    ],
    "extensions": {
      "description": "The #1 Decentralized meme token in Solana ecosystem.",
      "telegram": "https://t.me/TokenChimp",
      "twitter": "https://twitter.com/tokenchimp",
      "website": "https://chimpd.com"
    }
  },
  {
    "chainId": 101,
    "address": "E6oCGvmSYW7qhy7oeDfiNZLX6hEmPCVxBC8AknwAj82B",
    "symbol": "PLAYA",
    "name": "Playground Art Collection",
    "decimals": 2,
    "logoURI": "https://ybtrj4uri4zn4ob36ww7gdkqek3tkpm3uqq3mhsavul4ls5us3aa.arweave.net/wGcU8pFHMt44O_Wt8w1QIrc1PZukIbYeQK0Xxcu0lsA/?ext=png",
    "tags": [
      "bridgesplit-fraction",
      "playground-dao",
      "curated-index",
      "fnft",
      "curated-index"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/pool/E6oCGvmSYW7qhy7oeDfiNZLX6hEmPCVxBC8AknwAj82B"
    }
  },
  {
    "chainId": 101,
    "address": "7SEsxCsiNiYqCpYG16wx4c9u2YGLZphnEFTAU9ENAizD",
    "symbol": "RING",
    "name": "RING",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7SEsxCsiNiYqCpYG16wx4c9u2YGLZphnEFTAU9ENAizD/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/TheBullHerdNFT",
      "website": "https://thebullherd.com/ring"
    }
  },
  {
    "chainId": 101,
    "address": "EP2aYBDD4WvdhnwWLUMyqU69g1ePtEjgYK6qyEAFCHTx",
    "symbol": "KRILL",
    "name": "KRILL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solanahodlwhales/whitelist/main/Krill_towen.png",
    "tags": [
      "NFT"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SolanaWhalesNFT",
      "website": "https://solanahodlwhales.io"
    }
  },
  {
    "chainId": 101,
    "address": "3uNAevHamuZKKQdtdLzmHNvqD8r14tXUUXx5PN48UbYC",
    "symbol": "NLTK",
    "name": "Nasi Lemak",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/avaelon/nltk/main/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "2cW8Yosn4tSYJYjfUkcpKnYBSMYDqXfJmQXVu4RJzBTw",
    "symbol": "WAS",
    "name": "Wasder",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2cW8Yosn4tSYJYjfUkcpKnYBSMYDqXfJmQXVu4RJzBTw/logo.png",
    "tags": [
      "gaming",
      "metaverse",
      "microverse",
      "gamefi"
    ],
    "extensions": {
      "address": "0x0c572544a4ee47904d54aaa6a970af96b6f00e1b",
      "assetContract": "https://etherscan.io/address/0x0c572544a4ee47904d54aaa6a970af96b6f00e1b",
      "bridgeContract": "https://etherscan.io/address/0x3ee18b2214aff97000d974cf647e7c347e8fa585",
      "coingeckoId": "wasder",
      "twitter": "https://twitter.com/WasderGG",
      "website": "https://www.wasder.gg/"
    }
  },
  {
    "chainId": 101,
    "address": "MMAx26JtJgSWv6yH48nEHCGZcVvRbf9Lt9ALa7jSipe",
    "symbol": "MMA",
    "name": "mma",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MMAx26JtJgSWv6yH48nEHCGZcVvRbf9Lt9ALa7jSipe/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "WE PLAY, YOU EARN, By helping gamers generate an income for themselves, they create an income for you.",
      "discord": "https://discord.gg/mmagaming",
      "medium": "https://medium.com/@MMAGaming",
      "twitter": "https://twitter.com/mmagaming_io",
      "website": "https://mmagaming.io/"
    }
  },
  {
    "chainId": 101,
    "address": "EcQCUYv57C4V6RoPxkVUiDwtX1SP8y8FP5AEToYL8Az",
    "symbol": "WLKN",
    "name": "Walken",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EcQCUYv57C4V6RoPxkVUiDwtX1SP8y8FP5AEToYL8Az/logo.svg",
    "tags": [
      "walken",
      "utility-token"
    ],
    "extensions": {
      "website": "https://walken.io"
    }
  },
  {
    "chainId": 101,
    "address": "GpQLC7KnNgAvEpamfWi1AWFdXECZ1eQetvFYTuETLZC7",
    "symbol": "SPM",
    "name": "SchimmelPeter Monster",
    "decimals": 9,
    "logoURI": "https://www.schimmelpeter.de/spm_solana.png",
    "extensions": {
      "facebook": "https://facebook.com/SchimmelPeterGmbH",
      "instagram": "https://www.instagram.com/schimmelpetergmbh",
      "website": "https://www.schimmelpeter.de/"
    }
  },
  {
    "chainId": 101,
    "address": "2Tp4hCJ24aRnsLShz9U96VtTSDHuaKL7eD7vj8Stvxhn",
    "symbol": "HENDX",
    "name": "Hendrix Token",
    "decimals": 6,
    "logoURI": "https://github.com/thejoshuahendrix/hennyscript/blob/main/IMG_20180803_100044.jpg?raw=true",
    "tags": [
      "utility-token",
      "social-token",
      "community-token",
      "game-token"
    ],
    "extensions": {
      "website": "https://hennyscript.netlify.app/"
    }
  },
  {
    "chainId": 101,
    "address": "Code7hV6DaK5Werof8c7vPwBxLvhmEWVUbU2AfhBZArB",
    "symbol": "CODE",
    "name": "Code",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Code7hV6DaK5Werof8c7vPwBxLvhmEWVUbU2AfhBZArB/logo.png",
    "tags": [
      "defi",
      "currency",
      "social-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/pSCsYD5x",
      "telegram": "https://t.me/codenjobsgroup",
      "twitter": "https://twitter.com/codenjobs",
      "website": "https://www.codenjobs.com"
    }
  },
  {
    "chainId": 101,
    "address": "FsPncBfeDV3Uv9g6yyx1NnKidvUeCaAiT2NtBAPy17xg",
    "symbol": "XGLI",
    "name": "Glitter Finance",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FsPncBfeDV3Uv9g6yyx1NnKidvUeCaAiT2NtBAPy17xg/logo.svg",
    "tags": [
      "community-token",
      "social-token",
      "utility-token",
      "security-token",
      "governance-token"
    ],
    "extensions": {
      "coingeckoId": "glitter-finance",
      "discord": "https://discord.gg/P3mZkjsQMM",
      "linkedin": "https://www.linkedin.com/company/glitter-finance",
      "medium": "https://medium.com/@Glitter-Finance",
      "telegram": "https://t.me/GlitterFinanceGlobal",
      "twitter": "https://twitter.com/GlitterFinance",
      "website": "https://glitter.finance"
    }
  },
  {
    "chainId": 101,
    "address": "H3pWoh5Te12nHYVSQm1vQC6aAn2EbADj8zit23jP2jX3",
    "symbol": "FAC",
    "name": "FAC FUD Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/MundoFacu/stuff/038660d9336d647a9d4ede0e3107de9c9481724d/FAC_logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "de1QJkP1qDCk5JYCCXCeq27bQQUdCaiv7xVKFrhPSzF",
    "symbol": "DELFI",
    "name": "DeltaFi Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/de1QJkP1qDCk5JYCCXCeq27bQQUdCaiv7xVKFrhPSzF/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/deltafi",
      "github": "https://github.com/delta-fi",
      "medium": "https://medium.com/deltafi",
      "telegram": "https://t.me/deltafi_labs",
      "twitter": "https://twitter.com/deltafi_ai",
      "whitepaper": "https://deltafi-s3.s3.us-east-2.amazonaws.com/DeltaFi_whitepaper.pdf"
    }
  },
  {
    "chainId": 101,
    "address": "GmY2Rp9t5S4yD5jhgJrc47VSAa6hQiikkYi3sr9HLNZr",
    "symbol": "BLEEP",
    "name": "BLEEP",
    "decimals": 4,
    "logoURI": "https://gateway.pinata.cloud/ipfs/QmYjaWwcDx8gaf5rnkzGYLy8qhjjvuuvQXK8RttvXFWUWd?preview=1",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "HuMShjViKhcfihmHkgvctcFAyeyxAk8hK5K58zWpuRKf",
    "symbol": "DREAM",
    "name": "DREAM TOKEN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HuMShjViKhcfihmHkgvctcFAyeyxAk8hK5K58zWpuRKf/logo.png",
    "tags": [
      "Dreamapes"
    ],
    "extensions": {
      "twitter": "https://twitter.com/DreamapesNFT",
      "website": "https://dreamapes.intersect.art/"
    }
  },
  {
    "chainId": 101,
    "address": "jWWi8vp5q8hcNdxQpqbJNMJ2aDpz5t8SoB1dkzYS7CL",
    "symbol": "BD$",
    "name": "Businessdogs Token",
    "decimals": 6,
    "logoURI": "https://i.redd.it/pap3i9ua8g421.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Businessdogs Token is used in Businessdogs P2E game on Solana",
      "twitter": "https://twitter.com/BusinessdogsP2E",
      "website": "https://businessdogs.eu/"
    }
  },
  {
    "chainId": 101,
    "address": "SKu11EypaFU3gvr8VSAbi13zEC2CPvqbz9s83N3tWHM",
    "symbol": "SKULL",
    "name": "Skeleton Crew",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SKu11EypaFU3gvr8VSAbi13zEC2CPvqbz9s83N3tWHM/logo.png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/skeletoncrewrip",
      "twitter": "https://twitter.com/skeletoncrewrip",
      "website": "https://skeletoncrew.rip/"
    }
  },
  {
    "chainId": 101,
    "address": "EeLpRX4pgS4zPTQQfoHqqhBvoLzL83wPExmQoG5e1hnb",
    "symbol": "CRAFT",
    "name": "CRAFT COIN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/SolPatrol/SolPatrol/main/craft-token.png",
    "tags": [
      "NFT"
    ]
  },
  {
    "chainId": 101,
    "address": "6frkvZf72wiz3uqRWhBqLftNU4PS6XXYCoNrW9P4CFdK",
    "symbol": "QUACK",
    "name": "QUACK",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GP9zY2D8CgMreoUdYQjyn7Fo7XCq9ubVnX3u4ot1wpgt/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/DuckPatrolNFT",
      "website": "https://duckpatrol.io/"
    }
  },
  {
    "chainId": 101,
    "address": "7TQTpG1qBvE9ui7J9yQWKFAYpQahkaKPKqGTsqSm1wUv",
    "symbol": "GV",
    "name": "Good Vibes",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7TQTpG1qBvE9ui7J9yQWKFAYpQahkaKPKqGTsqSm1wUv/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/The_Sol_Army",
      "website": "http://www.thesolarmy.com"
    }
  },
  {
    "chainId": 101,
    "address": "CzXF8oUJSsB9ADKV99WAi2TgytqAyKvQw6EihwiL9em4",
    "symbol": "DRGNZ",
    "name": "Boryoku Genesis Dragonz Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/AzJI7FQ.png",
    "tags": [
      "bridgesplit-fraction",
      "boryoku-genesis",
      "fraction-index",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/CzXF8oUJSsB9ADKV99WAi2TgytqAyKvQw6EihwiL9em4"
    }
  },
  {
    "chainId": 101,
    "address": "invSTFnhB1779dyku9vKSmGPxeBNKhdf7ZfGL1vTH3u",
    "symbol": "IV",
    "name": "Invoker",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/invSTFnhB1779dyku9vKSmGPxeBNKhdf7ZfGL1vTH3u/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/invokers",
      "twitter": "https://twitter.com/invokersnft"
    }
  },
  {
    "chainId": 101,
    "address": "5VQnKaTu522jRQyaawDNBKZjBa5SZoeetyDXEwocYxXN",
    "symbol": "KING",
    "name": "King's token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5VQnKaTu522jRQyaawDNBKZjBa5SZoeetyDXEwocYxXN/logo.png",
    "tags": [
      "meme-coin"
    ],
    "extensions": {
      "twitter": "https://twitter.com/kings_dao"
    }
  },
  {
    "chainId": 101,
    "address": "Ao94rg8D6oK2TAq3nm8YEQxfS73vZ2GWYw2AKaUihDEY",
    "symbol": "$CRECK",
    "name": "CRECK",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ao94rg8D6oK2TAq3nm8YEQxfS73vZ2GWYw2AKaUihDEY/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "4NJ1L4LHSbJpk4h4rHQnJNKZbRSYticS8sQVPbGHsj33",
    "symbol": "BNCE",
    "name": "BOUNCER",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4NJ1L4LHSbJpk4h4rHQnJNKZbRSYticS8sQVPbGHsj33/logo.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/parlay",
      "twitter": "https://twitter.com/parlaynft",
      "website": "https://theparlaynft.com/"
    }
  },
  {
    "chainId": 101,
    "address": "FTT8cGNp3rfTC6c44uPTuEFLqmsVDhjd2BhH65v2uppr",
    "symbol": "ssoFTT-8",
    "name": "Saber Wrapped Wrapped FTT (Sollet) (8 decimals)",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FTT8cGNp3rfTC6c44uPTuEFLqmsVDhjd2BhH65v2uppr/icon.png",
    "tags": [
      "wrapped-sollet",
      "ethereum",
      "saber-mkt-ftt",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "bridgeContract": "https://etherscan.io/address/0xeae57ce9cc1984f202e15e038b964bb8bdf7229a",
      "coingeckoId": "ftx-token",
      "serumV3Usdc": "2Pbh1CvRVku1TgewMfycemghf6sU9EyuFDcNXqvRmSxc",
      "serumV3Usdt": "Hr3wzG8mZXNHV7TuL6YqtgfVUesCqMxGYCEyP3otywZE",
      "waterfallbot": "https://bit.ly/FTTwaterfall",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "LUNGEjUXyP48nrC1GYY5o4eTAkwm4RdX8BxFUxWJBLB",
    "symbol": "sLUNA-9",
    "name": "Saber Wrapped LUNA (Portal) (9 decimals)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LUNGEjUXyP48nrC1GYY5o4eTAkwm4RdX8BxFUxWJBLB/icon.png",
    "tags": [
      "wrapped",
      "wormhole",
      "saber-mkt-luna",
      "wormhole-v2",
      "saber-dec-wrapped"
    ],
    "extensions": {
      "address": "uluna",
      "bridgeContract": "https://finder.terra.money/columbus-5/address/terra10nmmwe8r3g99a9newtqa7a75xfgs2e8z87r2sf",
      "coingeckoId": "terra-luna",
      "serumV3Usdc": "HBTu8hNaoT3VyiSSzJYa8jwt9sDGKtJviSwFa11iXdmE",
      "website": "https://app.saber.so"
    }
  },
  {
    "chainId": 101,
    "address": "66edZnAPEJSxnAK4SckuupssXpbu5doV57FUcghaqPsY",
    "symbol": "PRGC",
    "name": "ProtoReality Games Token",
    "decimals": 9,
    "logoURI": "https://www.protorealitygames.com/images/PRGC_Token.png",
    "tags": [
      "utility-token",
      "game-token",
      "gaming"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/7pjQxtUc5F",
      "telegram": "https://t.me/PRG_and_DO119",
      "twitter": "https://twitter.com/ProtoRealityGmz",
      "website": "https://www.protorealitygames.com",
      "youtube": "https://www.youtube.com/channel/UCfSBSgEnTOZfSCOkY5pGqLg"
    }
  },
  {
    "chainId": 101,
    "address": "wrBTCqVjkpqktbqN3CeGVSzQ9PFiPonHN98uwEpwMsy",
    "symbol": "wrBTC",
    "name": "Wrapped BTC (Player 2)",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/wrBTCqVjkpqktbqN3CeGVSzQ9PFiPonHN98uwEpwMsy/logo_wrBTC.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/player2",
      "github": "https://github.com/player2world",
      "reddit": "https://www.reddit.com/r/player2world",
      "twitter": "https://twitter.com/player2world"
    }
  },
  {
    "chainId": 101,
    "address": "AMzmwvDRKdt5AQ3m1m28tWjzBxmQNe1PsmHnYitVZwzp",
    "symbol": "JUNKz",
    "name": "JUNK",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/XAGBack/JUNKToken1/main/JunkToken.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "YAWtS7vWCSRPckx1agB6sKidVXiXiDUfehXdEUSRGKE",
    "symbol": "YAW",
    "name": "Yawww",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/YAWtS7vWCSRPckx1agB6sKidVXiXiDUfehXdEUSRGKE/yaw.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/YawwwNFT",
      "website": "https://www.yawww.io"
    }
  },
  {
    "chainId": 101,
    "address": "7FntsntzGjK9PzPBbHLDJAFcKQVU14d2SbQZhgMUf2KA",
    "symbol": "TOCO",
    "name": "TownCoin",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7FntsntzGjK9PzPBbHLDJAFcKQVU14d2SbQZhgMUf2KA/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://solanatown.com"
    }
  },
  {
    "chainId": 101,
    "address": "THCBB791xLFhRhxPHMDVN9m5KDeBBjwh6dfBbnTuPe9",
    "symbol": "THC",
    "name": "Club 420 Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/THCBB791xLFhRhxPHMDVN9m5KDeBBjwh6dfBbnTuPe9/Logo.png",
    "tags": [
      "community-token",
      "utility-token",
      "nft-staking"
    ],
    "extensions": {
      "discord": "https://discord.gg/PzJpxNkHNf",
      "twitter": "https://twitter.com/Club420_NFT",
      "website": "https://club420nft.com/"
    }
  },
  {
    "chainId": 101,
    "address": "GS6E87SLTioRDG3uSVRwQmuKKMxDmWU7fktCTJ5xkEM8",
    "symbol": "WAVE",
    "name": "Lost At Sea WAVE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GS6E87SLTioRDG3uSVRwQmuKKMxDmWU7fktCTJ5xkEM8/logo.png",
    "tags": [
      "community-token",
      "utility-token",
      "nft-staking"
    ],
    "extensions": {
      "twitter": "https://twitter.com/lostatseanft",
      "website": "https://lostatseanft.com/"
    }
  },
  {
    "chainId": 101,
    "address": "9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp",
    "symbol": "JELLY",
    "name": "Jelly",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/wzEfUjmpFw",
      "twitter": "https://twitter.com/JellyBabiesNFT"
    }
  },
  {
    "chainId": 101,
    "address": "8iSagwHZNj4Hx4CMeoZwLLMVbWt4mUT6qk42TxiHkRtn",
    "symbol": "DGNA",
    "name": "DegenAlley",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8iSagwHZNj4Hx4CMeoZwLLMVbWt4mUT6qk42TxiHkRtn/DGNA.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "website": "https://realms.today/dao/6iBBtiZDb14Y4xRRcJ6uchaRXoFG2PxiQggPooYTPZuS"
    }
  },
  {
    "chainId": 101,
    "address": "7s6NLX42eURZfpyuKkVLrr9ED9hJE8718cyXFsYKqq5g",
    "symbol": "GEAR",
    "name": "Gear Token",
    "decimals": 9,
    "logoURI": "https://github.com/ArthurPaivaT/token-list/blob/main/assets/mainnet/7s6NLX42eURZfpyuKkVLrr9ED9hJE8718cyXFsYKqq5g/logo.png?raw=true"
  },
  {
    "chainId": 101,
    "address": "3rH1toffQAELHo5vyRKdwEFxhPTZA7ocfRdJK2c8txoJ",
    "symbol": "FamSOL",
    "name": "FamilySOL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solodevo/FamilySOL/main/LOGOFamilySOL.png",
    "tags": [
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/tSXnjNJEhT",
      "twitter": "https://twitter.com/FamilySolNft",
      "website": "https://familysolnft.com/"
    }
  },
  {
    "chainId": 101,
    "address": "BLAAD2QLUgRSbQ9AB9jqAoHh55cGVcSBaCH9JGBh2zDX",
    "symbol": "BLOOD",
    "name": "DRACULA GAME BLOOD",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BLAAD2QLUgRSbQ9AB9jqAoHh55cGVcSBaCH9JGBh2zDX/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/invite/Frj3KDPBpq",
      "twitter": "https://twitter.com/draculagame_nft",
      "website": "https://www.dracula.game"
    }
  },
  {
    "chainId": 101,
    "address": "2MtPZqwNKTNsBoFCwm4ZTWk3ySz4LSd82ucDGeTk7VNu",
    "symbol": "IVRY",
    "name": "Portals Ivory Index",
    "decimals": 2,
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/102af36cc30fec0b05ebb45406f20971/126d0320",
    "tags": [
      "bridgesplit-fraction",
      "portals-ivory",
      "fraction-index",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/2MtPZqwNKTNsBoFCwm4ZTWk3ySz4LSd82ucDGeTk7VNu"
    }
  },
  {
    "chainId": 101,
    "address": "GZL4yjPohDShW4RofJ6dEWu2Fv7qEa5mBT7Dpje5hqe7",
    "symbol": "SAC",
    "name": "Stoned Ape Crew Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/sxmJbDr.jpg",
    "tags": [
      "bridgesplit-fraction",
      "stonedd-ape-crew",
      "fraction-index",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/GZL4yjPohDShW4RofJ6dEWu2Fv7qEa5mBT7Dpje5hqe7"
    }
  },
  {
    "chainId": 101,
    "address": "EBQ6gWBQNxA2zB4twR5GWP6CkeAhqZZZeDgeP7BTtdM3",
    "symbol": "PERP",
    "name": "PerpeTraders",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EBQ6gWBQNxA2zB4twR5GWP6CkeAhqZZZeDgeP7BTtdM3/logo.jpg",
    "tags": [
      "stablecoin",
      "security-token",
      "utility-token",
      "tokenized-stock"
    ]
  },
  {
    "chainId": 101,
    "address": "2Kc91qK5tA1df2P9BWrjNrJfdQCbCx95iUY8H27aNuWa",
    "symbol": "FFF",
    "name": "Famous Fox Federation Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2Kc91qK5tA1df2P9BWrjNrJfdQCbCx95iUY8H27aNuWa/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "5WDPUdgNUUiQ83TXubV8q1CdSnNg8WvAH7YDXwTvdct7",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "GUtWHTy9N5Av4LTB5PJPn4ZTfxCB2tGiK7DJpS7y8F8S",
    "symbol": "AUR",
    "name": "Aurory Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GUtWHTy9N5Av4LTB5PJPn4ZTfxCB2tGiK7DJpS7y8F8S/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "Hd5uEsj4fnEYsdPdY8ReptKoXGkUZYM9ZC5GHZcHkCBY",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "GknXZXR3Y84wgmDUxtsoR9FBHEZovqXFuDK2jczi1ydz",
    "symbol": "GENO",
    "name": "Genopets Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GknXZXR3Y84wgmDUxtsoR9FBHEZovqXFuDK2jczi1ydz/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "8AjdxXSvZ5Cu7FGsoMa6Y8hu1ZS1iCy3gaoNggNCmqML",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "5aGsu5hASnsnQVXV58fN8Jw9P8BVyfDnH2eYatmFLGoQ",
    "symbol": "LIFL",
    "name": "Lifinity Flares Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5aGsu5hASnsnQVXV58fN8Jw9P8BVyfDnH2eYatmFLGoQ/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "AYbybZJN533vgPdZrJga6Zw7WtZCnUofNLiMjneWUP6V",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "DpcmtJniwGRPqU6A8shdcV812uddwoxDCMfXUz2SkLVJ",
    "symbol": "DGOD",
    "name": "DeGods Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DpcmtJniwGRPqU6A8shdcV812uddwoxDCMfXUz2SkLVJ/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "FFmE1patBuqcjRZ1TMrokrefnpMqzmLZMecLGhvnWb3b",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "JAa3gQySiTi8tH3dpkvgztJWHQC1vGXr5m6SQ9LEM55T",
    "symbol": "solUST",
    "name": "solUST",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JAa3gQySiTi8tH3dpkvgztJWHQC1vGXr5m6SQ9LEM55T/solust.svg",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "website": "https://soluna.money/"
    }
  },
  {
    "chainId": 101,
    "address": "FFBnqafsjrvvxxf5n3Tzba8V7vWPb8wr5DPEog1VAwff",
    "symbol": "THUGZ",
    "name": "Thugbirdz Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FFBnqafsjrvvxxf5n3Tzba8V7vWPb8wr5DPEog1VAwff/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "5Rcqv6qXRFFnK3dzYu96sKqf6wtC8hEA1ivRdMwFHEH2",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "FQkm6bACFuJpGDmnkvYoq2Luhcc65oam2dg1tXfnKWAY",
    "symbol": "PLWAV",
    "name": "Playground Waves Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FQkm6bACFuJpGDmnkvYoq2Luhcc65oam2dg1tXfnKWAY/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "Ccgq4UV9sFtXp9yMGXwJRcJz9UsgQFEjF3Fmui2Z6Xhm",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "CRSzWoeyfR8sJxB2d6LLEre92Uc59TCPX2gZidp4t3eE",
    "symbol": "AGVZ",
    "name": "Agave Zwolf",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/GrupoZwolf/cryptozw/main/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "nYDqQVEaQxLYLh8B8oAFXziMT1bcGrAVigZPL1s3dKc",
    "symbol": "PREY",
    "name": "PREY",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/nYDqQVEaQxLYLh8B8oAFXziMT1bcGrAVigZPL1s3dKc/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/ApexPredatorSOL",
      "website": "https://home.apexpredator.army/"
    }
  },
  {
    "chainId": 101,
    "address": "BYPsjxa3YuZESQz1dKuBw1QSFCSpecsm8nCQhY5xbU1Z",
    "symbol": "NEAR",
    "name": "NEAR (Allbridge from Near)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BYPsjxa3YuZESQz1dKuBw1QSFCSpecsm8nCQhY5xbU1Z/logo.png",
    "extensions": {
      "coingeckoId": "near"
    }
  },
  {
    "chainId": 101,
    "address": "7ScYHk4VDgSRnQngAUtQk4Eyf7fGat8P4wXq6e2dkzLj",
    "symbol": "$ALL",
    "name": "ALL",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7ScYHk4VDgSRnQngAUtQk4Eyf7fGat8P4wXq6e2dkzLj/logo.png",
    "tags": [
      "utility-token",
      "nft",
      "commodity-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/stonedapecrew",
      "twitter": "https://twitter.com/stonedapecrew",
      "website": "https://www.allblue.dev/"
    }
  },
  {
    "chainId": 101,
    "address": "GDTVxsG41afjiJngZgFYHJkrG4PkTB9pVx7NuVsm2RcX",
    "symbol": "Club",
    "name": "Club",
    "decimals": 9,
    "logoURI": "https://github.com/ArthurPaivaT/token-list/blob/main/assets/mainnet/GDTVxsG41afjiJngZgFYHJkrG4PkTB9pVx7NuVsm2RcX/logo.png?raw=true"
  },
  {
    "chainId": 101,
    "address": "4uRn7vxRPWYP4HuAa4UNXwEPLRL8oQ71YByMhr6yBnL4",
    "symbol": "WAVES",
    "name": "Playground Waves Floor Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/TMyD8MN.jpg",
    "tags": [
      "bridgesplit-fraction",
      "playground-waves",
      "fraction-index",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/4uRn7vxRPWYP4HuAa4UNXwEPLRL8oQ71YByMhr6yBnL4"
    }
  },
  {
    "chainId": 101,
    "address": "DCg5GuAyxRwtM2VcSAJbgHesi1XqSqV1FAtV6T3VatcR",
    "symbol": "HKDD",
    "name": "DEFINIS",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/Definis-HKDD/Smart-Contract-/main/logo.png",
    "tags": [
      "stablecoin"
    ]
  },
  {
    "chainId": 101,
    "address": "SLNAAQ8VT6DRDc3W9UPDjFyRt7u4mzh8Z4WYMDjJc35",
    "symbol": "SLNA",
    "name": "Soluna Governance Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNAAQ8VT6DRDc3W9UPDjFyRt7u4mzh8Z4WYMDjJc35/slna.svg",
    "extensions": {
      "website": "https://soluna.money/"
    }
  },
  {
    "chainId": 101,
    "address": "FanJWA4yEVUJj1r83tR7XybxmDGF6bNH8M81ag9aeUbF",
    "symbol": "BMT",
    "name": "BMT",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FanJWA4yEVUJj1r83tR7XybxmDGF6bNH8M81ag9aeUbF/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "exchange-token"
    ]
  },
  {
    "chainId": 101,
    "address": "E6eCEE3KqjRD5UxcBYQTdV8Z535hyaBuFin9Udm6s6bz",
    "symbol": "AIR",
    "name": "Balloonsville AIR",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/E6eCEE3KqjRD5UxcBYQTdV8Z535hyaBuFin9Udm6s6bz/logo.png",
    "tags": [
      "NFT-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/balloonsville",
      "twitter": "https://twitter.com/balloonsville_2",
      "website": "https://stake.balloonsville.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "ARg9wfeLN4qZTxgYTYeuGtGFMmYdk5zFhBuSnTfXXUvb",
    "symbol": "CHI",
    "name": "Project Paradise - CHI Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/benthebape/projekt-paradise-chi-token/main/Moneda_1.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://projektparadise.com/"
    }
  },
  {
    "chainId": 101,
    "address": "33MJjPS6H7P2nwD648uiTiUu8v5fJ1zKyjnVqeWZ344F",
    "symbol": "WVE",
    "name": "everwave",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/33MJjPS6H7P2nwD648uiTiUu8v5fJ1zKyjnVqeWZ344F/logo.jpg"
  },
  {
    "chainId": 101,
    "address": "zebeczgi5fSEtbpfQKVZKCJ3WgYXxjkMUkNNx7fLKAF",
    "symbol": "ZBC",
    "name": "ZEBEC",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/zebeczgi5fSEtbpfQKVZKCJ3WgYXxjkMUkNNx7fLKAF/logo.png",
    "tags": [
      "utility-token",
      "veni",
      "vidi",
      "vici"
    ],
    "extensions": {
      "coingeckoId": "zebec-protocol",
      "description": "Zebec is a continuous Settlement Protocol that will transform payroll, cash flow, and token vesting by allowing users to send payments and distributions every second.",
      "discord": "https://discord.gg/gYCe7h8p",
      "telegram": "https://t.me/zebececosystem",
      "twitter": "https://twitter.com/Zebec_HQ",
      "website": "https://zebec.io"
    }
  },
  {
    "chainId": 101,
    "address": "8BLiujyxu5gJajWBXoZQkwSsamdeHNKWQbu1ApAao8Ps",
    "symbol": "ACA",
    "name": "Acacia",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/qubelabsllc/ACALogo/main/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "48FCZmKZw3iJcvuAMMShWRSimJ9DN2BBN4exgRpTp5WG",
    "symbol": "TRIT",
    "name": "Trit",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/48FCZmKZw3iJcvuAMMShWRSimJ9DN2BBN4exgRpTp5WG/logo.png",
    "extensions": {
      "serumV3Usdc": "5SWZF5PpQcMhVDFduXVGApmvdHNPJRhzYEq3EgbtkvkZ",
      "website": "https://trit.hr"
    }
  },
  {
    "chainId": 101,
    "address": "TKMKgSh3aADsmjr4yFWG52tkCQvmDxsQC1he1aBsi65",
    "symbol": "TKMK",
    "name": "TOKAMAK ON SOLANA",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/TKMKgSh3aADsmjr4yFWG52tkCQvmDxsQC1he1aBsi65/logo.png",
    "tags": [
      "community-token",
      "nft",
      "dao"
    ],
    "extensions": {
      "description": "TOKAMAK - REACTOR OF SOLANA ECOSYSTEM",
      "telegram": "https://t.me/tokamaksolana",
      "twitter": "https://twitter.com/tokamak_solana",
      "website": "https://tkmksolana.gitbook.io/tokamak_token/"
    }
  },
  {
    "chainId": 101,
    "address": "GjdreVe7iUG4hyESSweGyFzgekWufhEwGJqAaa1hr7pf",
    "symbol": "WATT",
    "name": "WATT token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GjdreVe7iUG4hyESSweGyFzgekWufhEwGJqAaa1hr7pf/logo.png",
    "tags": [
      "stablecoin",
      "utility-token",
      "community-token",
      "meme-token"
    ],
    "extensions": {
      "description": "The WATT token is fixed to an external asset class, e.g. The total development cost to produce 1 Watt of solar powered energy based in the USA, in US Dollars",
      "github": "https://github.com/SnaZish/SnaZish",
      "reddit": "https://www.reddit.com/r/WATTtoken",
      "telegram": "https://t.me/WATTtoken",
      "twitter": "https://twitter.com/WATT_token",
      "website": "https://www.snazish.com"
    }
  },
  {
    "chainId": 101,
    "address": "HtbhBYdcfXbbD2JiH6jtsTt2m2FXjn7h4k6iXfz98k5W",
    "symbol": "DKM",
    "name": "DeadKnight Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HtbhBYdcfXbbD2JiH6jtsTt2m2FXjn7h4k6iXfz98k5W/dkmlogo.png",
    "tags": [
      "Utility-Token",
      "Stake-Token"
    ],
    "extensions": {
      "discord": "https://discord.gg/deadknightmetaverse",
      "facebook": "https://www.facebook.com/deadknight.metaverse.nft",
      "medium": "https://medium.com/deadknightmetaverse",
      "reddit": "https://www.reddit.com/user/DEADKNIGHTOFFICIAL",
      "telegram": "https://t.me/DeadKnightMeta_Official",
      "telegramAnnouncements": "https://t.me/DeadKnightMeta_Ann",
      "twitter": "https://twitter.com/DeadKnight_SOL",
      "website": "https://deadknight.io",
      "youtube": "https://www.youtube.com/channel/UCTzFwKLZ6uD8cWoJIMV9v7A"
    }
  },
  {
    "chainId": 101,
    "address": "sunSBR8hRLZy13HCHdrT3hjJZVRpkVfXF3QaaJYjxZ2",
    "symbol": "sunSBR",
    "name": "sunSBR",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/sunSBR8hRLZy13HCHdrT3hjJZVRpkVfXF3QaaJYjxZ2/logo.svg",
    "extensions": {
      "website": "https://sunny.ag"
    }
  },
  {
    "chainId": 101,
    "address": "PRiME7gDoiG1vGr95a3CRMv9xHY7UGjd4JKvfSkmQu2",
    "symbol": "PRIME",
    "name": "SolanaPrime",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PRiME7gDoiG1vGr95a3CRMv9xHY7UGjd4JKvfSkmQu2/logo.png",
    "tags": [
      "launchpad",
      "ido",
      "staking",
      "utility"
    ],
    "extensions": {
      "description": "SolanaPrime utility token",
      "discord": "https://discord.gg/FfDjmQJ9ZH",
      "twitter": "https://twitter.com/solana_prime",
      "website": "https://solanaprime.com/"
    }
  },
  {
    "chainId": 101,
    "address": "NovNrxPNjmLVFscH5rjMbec7C4BdAHms9WK21xjsP3p",
    "symbol": "NOVAX",
    "name": "NOVAX",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/NovNrxPNjmLVFscH5rjMbec7C4BdAHms9WK21xjsP3p/clogo.png",
    "extensions": {
      "twitter": "https://twitter.com/the_cynova",
      "website": "https://www.cynova.io/"
    }
  },
  {
    "chainId": 101,
    "address": "GuRdDYCNuykG28e77aFVD7gvwdeRqziBfQYdCdRqSVVS",
    "symbol": "HNYG",
    "name": "Honey Genesis Bee Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GuRdDYCNuykG28e77aFVD7gvwdeRqziBfQYdCdRqSVVS/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "8s6vNyWzCynmXV8tpKfsRZFy2qRYwFA9uR31nA5d61mz",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "SLCLww7nc1PD2gQPQdGayHviVVcpMthnqUz2iWKhNQV",
    "symbol": "SLCL",
    "name": "Solcial token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLCLww7nc1PD2gQPQdGayHviVVcpMthnqUz2iWKhNQV/logo.png",
    "tags": [
      "social-token",
      "community-token",
      "utility-token",
      "nfts"
    ],
    "extensions": {
      "blog": "http://blog.solcial.io/",
      "coinmarketcap": "https://coinmarketcap.com/currencies/solcial/",
      "description": "The first uncensorable, permissionless and truly open social network",
      "discord": "https://discord.gg/solcial",
      "telegram": "https://t.me/solcial",
      "twitter": "https://twitter.com/solcialofficial",
      "website": "https://solcial.io/"
    }
  },
  {
    "chainId": 101,
    "address": "ratioMVg27rSZbSvBopUvsdrGUzeALUfFma61mpxc8J",
    "symbol": "RATIO",
    "name": "Ratio Governance Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ratioMVg27rSZbSvBopUvsdrGUzeALUfFma61mpxc8J/logo.svg",
    "extensions": {
      "telegram": "https://t.me/ratiofinance",
      "twitter": "https://twitter.com/RatioFinance",
      "website": "https://ratio.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "ELXRYrf8wd4DcyXDU9QPnMdD8jn2twg7o7qEtf5z2GBW",
    "symbol": "ELIXIR",
    "name": "ELIXIR",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/zaptors/image/main/elixir.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "A3HyGZqe451CBesNqieNPfJ4A9Mu332ui8ni6dobVSLB",
    "symbol": "WOOP",
    "name": "WOOP",
    "decimals": 5,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/A3HyGZqe451CBesNqieNPfJ4A9Mu332ui8ni6dobVSLB/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "coingeckoId": "woop",
      "discord": "https://discord.gg/bohemia",
      "serumV3Usdc": "DQY2Sjm3bEbrXhyGgHsXqLHU2EybBPVPLDTCrEHq9KpL",
      "twitter": "https://twitter.com/BohemiaArtFair"
    }
  },
  {
    "chainId": 101,
    "address": "5s4BYUXLuvs9ZcVDTxkTpKhThWFSpaU8GG55q2iySe2N",
    "symbol": "ENRX",
    "name": "Enrex",
    "decimals": 2,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5s4BYUXLuvs9ZcVDTxkTpKhThWFSpaU8GG55q2iySe2N/logo.png",
    "tags": [
      "carbon-offsetting",
      "renewable-energy",
      "green-commodities",
      "defi"
    ],
    "extensions": {
      "description": "Solution that allows to have exposure to crypto in an environmentally friendly way. One-stop-shop to calculate your crypto CO2 emissions and offset it",
      "discord": "https://discord.com/invite/enrex",
      "facebook": "https://www.facebook.com/enrex.io",
      "github": "https://github.com/Enrex-io",
      "instagram": "https://www.instagram.com/enrex.io",
      "linkedin": "https://www.linkedin.com/company/enrex",
      "medium": "https://medium.com/@enrex",
      "telegram": "https://t.me/enrex_community",
      "telegramAnnouncements": "https://t.me/enrex_io",
      "twitter": "https://twitter.com/enrex_crypto",
      "website": "https://www.enrex.io",
      "whitepaper": "https://wp.enrex.io",
      "youtube": "https://www.youtube.com/channel/UClY1GH83dVoTM_uZs4PstIg"
    }
  },
  {
    "chainId": 101,
    "address": "9yM42HMJnN69rhMGr8nCYSRtFxjWTWm5Z6GeucyLBEHg",
    "symbol": "RAMENF",
    "name": "Ramen Feast Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9yM42HMJnN69rhMGr8nCYSRtFxjWTWm5Z6GeucyLBEHg/logo.png",
    "tags": [
      "utility-token",
      "nfts"
    ],
    "extensions": {
      "discord": "https://www.discord.gg/kamakuranft",
      "twitter": "https://twitter.com/kamakura_nft"
    }
  },
  {
    "chainId": 101,
    "address": "MM7s2bggZvq2DBFyBVKBBHb9DYAo3A2WGkP6L5cPzxC",
    "symbol": "NEST",
    "name": "Nest Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/Beario/crypto/main/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "2Dm1zu8ERJGBs3NLXt8s8Vor3YHwJye5E2pYhLiMHU4L",
    "symbol": "REAP",
    "name": "REAP",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2Dm1zu8ERJGBs3NLXt8s8Vor3YHwJye5E2pYhLiMHU4L/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/dakureapersnft"
    }
  },
  {
    "chainId": 101,
    "address": "rvxo8t7TKeSmAgpdqK1CY9ddZi3NyowRCh1m2d7KrUc",
    "symbol": "SMRAI",
    "name": "SMRAI",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rvxo8t7TKeSmAgpdqK1CY9ddZi3NyowRCh1m2d7KrUc/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SamuraiWarriorz"
    }
  },
  {
    "chainId": 101,
    "address": "8XUTstViEpLfhxaA88A6oWKraHm8V444bnSq6hm79vYh",
    "symbol": "RUGZ",
    "name": "RUGZ",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8XUTstViEpLfhxaA88A6oWKraHm8V444bnSq6hm79vYh/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/ProbRug"
    }
  },
  {
    "chainId": 101,
    "address": "BoFxKXdyiEYJReWGZAT4tavuAo3D1BmDyXK5VFSXd4EF",
    "symbol": "BOFx",
    "name": "BitOptionsFx",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BoFxKXdyiEYJReWGZAT4tavuAo3D1BmDyXK5VFSXd4EF/logo.png",
    "tags": [
      "BitOptionsFx"
    ]
  },
  {
    "chainId": 101,
    "address": "7rrJLRar2WjZwRoF3iJKHKnA7d7d9YJT1X9HAJnwUH3Z",
    "symbol": "WIZE",
    "name": "Project Wisdom",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7rrJLRar2WjZwRoF3iJKHKnA7d7d9YJT1X9HAJnwUH3Z/logo.png"
  },
  {
    "chainId": 101,
    "address": "USDrbBQwQbQ2oWHUPfA8QBHcyVxKUq1xHyXsSLKdUq2",
    "symbol": "USDr",
    "name": "Ratio stable Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDrbBQwQbQ2oWHUPfA8QBHcyVxKUq1xHyXsSLKdUq2/logo.png",
    "extensions": {
      "telegram": "https://t.me/ratiofinance",
      "twitter": "https://twitter.com/RatioFinance",
      "website": "https://ratio.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "BKipkearSqAUdNKa1WDstvcMjoPsSKBuNyvKDQDDu9WE",
    "symbol": "HAWK",
    "name": "Hawksight",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BKipkearSqAUdNKa1WDstvcMjoPsSKBuNyvKDQDDu9WE/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/hawksight",
      "medium": "https://hawksight.medium.com/",
      "twitter": "https://twitter.com/HawksightCo",
      "website": "https://hawksight.co/"
    }
  },
  {
    "chainId": 101,
    "address": "mongopjRpUgnQQpQFiasgFLyo69YXUwFcw3hyqaN8RL",
    "symbol": "MONGO",
    "name": "Mongo",
    "decimals": 9,
    "logoURI": "https://mongomons.com/logo-MONGO.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/mongomons",
      "twitter": "https://twitter.com/Mongomonsol",
      "website": "https://mongomons.com"
    }
  },
  {
    "chainId": 101,
    "address": "HxPoEHMt1vKeqjKCePcqTj6yYgn6Xqq1fKTY3Pjx4YrX",
    "symbol": "ZAP",
    "name": "ZAP Token",
    "decimals": 8,
    "logoURI": "https://www.zap.org/static/zapSplash.svg",
    "tags": [
      "whitelist-token",
      "utility-token",
      "community-token",
      "nft"
    ],
    "extensions": {
      "coingeckoId": "zap",
      "coinmarketcap": "https://coinmarketcap.com/currencies/zap",
      "description": "Zap is building critical infrastructure to power the next wave of decentralized applications.",
      "discord": "https://discord.gg/pvHzemX",
      "facebook": "https://www.facebook.com/ZapProtocol",
      "instagram": "https://www.instagram.com/zapprotocol",
      "linkedin": "https://www.linkedin.com/company/zapprotocol",
      "medium": "https://medium.com/the-zap-project",
      "reddit": "https://www.reddit.com/r/ZapProtocol",
      "telegram": "https://t.me/ZapOracles",
      "twitter": "https://twitter.com/ZapProtocol",
      "website": "https://zap.org",
      "whitepaper": "https://app.zap.org/docs/overview"
    }
  },
  {
    "chainId": 101,
    "address": "idoLztG5ZGMVEjjoQWjeSu2eVkVsp3YnrFZKf7dNi4j",
    "symbol": "IDOLZ",
    "name": "IDOLZ Token",
    "decimals": 9,
    "logoURI": "https://arweave.net/mdvmPYEgiX_uPGRtiIZA3HrpilDK5JfW2bXkDBRuzVM?ext=png",
    "tags": [
      "utility-token",
      "social-token"
    ],
    "extensions": {
      "description": "$IDOLZ is an essential part of the Idolz Ecosystem. It will be used as the primary internal currency for minting, trading, and upgrading Idolz NFTs",
      "discord": "https://discord.com/invite/cryptoidolz",
      "twitter": "https://twitter.com/CryptoIdolzNFT",
      "website": "https://cryptoidolz.pro/"
    }
  },
  {
    "chainId": 101,
    "address": "2cZv8HrgcWSvC6n1uEiS48cEQGb1d3fiowP2rpa4wBL9",
    "symbol": "ACF",
    "name": "ACF Game",
    "decimals": 2,
    "logoURI": "https://shop.alienchickenfarm.com/logos/acf-token.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/playacf"
    }
  },
  {
    "chainId": 101,
    "address": "3LDAW7enNUZ4DjE1jCi1cDpXvXLrJ1rPiECPbcHpMgG2",
    "symbol": "FEED",
    "name": "FEED on ACF Game",
    "decimals": 2,
    "logoURI": "https://shop.alienchickenfarm.com/logos/feed-token.png",
    "tags": [
      "social-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/playacf"
    }
  },
  {
    "chainId": 101,
    "address": "DuSyBCGuhPvyGu6cSvbZonvQvh8JLyGvXJn1TmkJh6Zn",
    "symbol": "$NEON",
    "name": "NeonGame Credits",
    "decimals": 0,
    "logoURI": "https://arweave.net/VPS4BrOgXT4rg-mwGfCLqXL8vtbII0ianMBsw_L2CeE",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://neon.game"
    }
  },
  {
    "chainId": 101,
    "address": "FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds",
    "symbol": "FORGE",
    "name": "FORGE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FoRGERiW7odcCBGU1bztZi16osPBHjxharvDathL5eds/logo.png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/blocksmithlabs",
      "twitter": "https://twitter.com/BlocksmithLabs",
      "website": "https://blocksmithlabs.io/"
    }
  },
  {
    "chainId": 101,
    "address": "SPraYi59a21jEhqvPBbWuwmjA4vdTaSLbiRTefcHJSR",
    "symbol": "SPRAY",
    "name": "SPRAY",
    "decimals": 4,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SPraYi59a21jEhqvPBbWuwmjA4vdTaSLbiRTefcHJSR/icon.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/thugpacaz",
      "twitter": "https://twitter.com/ThugPacaz",
      "website": "https://thugpacaz.com"
    }
  },
  {
    "chainId": 101,
    "address": "PRAxfbouRoJ9yZqhyejEAH6RvjJ86Y82vfiZTBSM3xG",
    "symbol": "PRANA",
    "name": "prANA",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PRAxfbouRoJ9yZqhyejEAH6RvjJ86Y82vfiZTBSM3xG/logo.png",
    "tags": [
      "currency"
    ],
    "extensions": {
      "twitter": "https://twitter.com/nirvana_fi",
      "website": "https://nirvana.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "8k8nYi4NSigPgk9CijcDJyoraGr273AggWZFgn8Adk1a",
    "symbol": "VSNRY",
    "name": "Visionary Studios Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8k8nYi4NSigPgk9CijcDJyoraGr273AggWZFgn8Adk1a/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "serumV3Usdc": "6cQTBrDUWjSKjeqhAzYE7GA1LjR7QexoSfwGrDEVpLFS",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "KRTapyUMe5fW92KZkYoXToFtc6Cn7UG6seaKz646oGu",
    "symbol": "OOINK",
    "name": "OOINK",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/danvernon/tiny-dogz-logo/main/oink.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://t.co/K0TdK7RFgI",
      "twitter": "https://twitter.com/kireifarm",
      "website": "http://www.kireifarm.com/"
    }
  },
  {
    "chainId": 101,
    "address": "MoshMwLkVu4iwrPBaWpYkh43qJiSXsnyzNLuMXFv5F4",
    "symbol": "MOSHI",
    "name": "MOSHI",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MoshMwLkVu4iwrPBaWpYkh43qJiSXsnyzNLuMXFv5F4/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/moshiheads",
      "twitter": "https://twitter.com/Moshiheads",
      "website": "https://www.moshiheads.com/"
    }
  },
  {
    "chainId": 101,
    "address": "ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo",
    "symbol": "ANA",
    "name": "ANA",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo/logo.png",
    "tags": [
      "currency"
    ],
    "extensions": {
      "twitter": "https://twitter.com/nirvana_fi",
      "website": "https://nirvana.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "DfgYfvfW8cWumofEgRZsAYHhZVDgQbu9z8sGwcKahSho",
    "symbol": "CARTEL",
    "name": "Cartoon Cartel Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/ArthurPaivaT/token-list/main/assets/mainnet/DfgYfvfW8cWumofEgRZsAYHhZVDgQbu9z8sGwcKahSho/logo.png"
  },
  {
    "chainId": 101,
    "address": "CJ5U6wPmjxFUyTJpUTS7Rt1UqhTmSVRMvmJ8WD4nndXW",
    "symbol": "GLXY",
    "name": "Astrals GLXY",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CJ5U6wPmjxFUyTJpUTS7Rt1UqhTmSVRMvmJ8WD4nndXW/logo.png",
    "tags": [
      "NFT-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/astralsnft",
      "twitter": "https://twitter.com/Astrals_NFT",
      "website": "https://astralsnft.io"
    }
  },
  {
    "chainId": 101,
    "address": "NRVwhjBQiUPYtfDT5zRBVJajzFQHaBUNtC7SNVvqRFa",
    "symbol": "NIRV",
    "name": "NIRV",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/NRVwhjBQiUPYtfDT5zRBVJajzFQHaBUNtC7SNVvqRFa/NIRV.png",
    "tags": [
      "currency"
    ],
    "extensions": {
      "twitter": "https://twitter.com/nirvana_fi",
      "website": "https://nirvana.finance/"
    }
  },
  {
    "chainId": 101,
    "address": "buMnhMd5xSyXBssTQo15jouu8VhuEZJCfbtBUZgRcuW",
    "symbol": "NNI",
    "name": "NeoNomad",
    "decimals": 6,
    "logoURI": "https://www.arweave.net/8441EZ-sS_iL8MukU7HsGIB6yQXh5B-TeNKX_KdwbMc?ext=png",
    "tags": [
      "utility-token",
      "nft-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/Fj77EYcTNH",
      "twitter": "https://twitter.com/NeoNomadFinance",
      "website": "https://app.neonomad.exchange"
    }
  },
  {
    "chainId": 101,
    "address": "unknXbA1bDg39nuBqVgMNZ5qSZa8pw5HditgkPe5eFA",
    "symbol": "UNKN",
    "name": "UNKN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/unknXbA1bDg39nuBqVgMNZ5qSZa8pw5HditgkPe5eFA/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/celestialz",
      "twitter": "https://twitter.com/CELESTIALZ777",
      "website": "https://www.celestialznft.io/"
    }
  },
  {
    "chainId": 101,
    "address": "3Dy8KFyvpUJ8nfRCbvk4HLWjNRRzxiVhTeE9PQF9RARD",
    "symbol": "ARNM",
    "name": "Arenum",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3Dy8KFyvpUJ8nfRCbvk4HLWjNRRzxiVhTeE9PQF9RARD/logo.png",
    "tags": [
      "game-token"
    ],
    "extensions": {
      "telegram": "https://t.me/arenum_community",
      "telegramAnnouncements": "https://t.me/arenum_announcements",
      "website": "https://arenum.io"
    }
  },
  {
    "chainId": 101,
    "address": "CZY2dDTb86ARthiLP47hpmEgX1h82XCEr51XWQ5GsZoj",
    "symbol": "UMF",
    "name": "UMF",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CZY2dDTb86ARthiLP47hpmEgX1h82XCEr51XWQ5GsZoj/logo.png",
    "extensions": {
      "description": "pow token backed by FIL mining power"
    }
  },
  {
    "chainId": 101,
    "address": "4id3Lrw5BJruX7VQ3iRbmpnt8JHYKEkFd47j9NFgirFp",
    "symbol": "UREP",
    "name": "UNIVERSAL REPVBLIK TOKEN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4id3Lrw5BJruX7VQ3iRbmpnt8JHYKEkFd47j9NFgirFp/logo.png",
    "tags": [
      "community-token",
      "utility-token"
    ],
    "extensions": {
      "description": "UNIVERSAL REPVBLIK TOKEN",
      "instagram": "https://www.instagram.com/universalrepvblik",
      "twitter": "https://twitter.com/URepvblik",
      "website": "https://www.universalrepvblik.com"
    }
  },
  {
    "chainId": 101,
    "address": "HNm1VgnyhaMZZF71RjNFNiYLN76zyZTDcBZPjYveWFXX",
    "symbol": "FRENS",
    "name": "Chimp Frens",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HNm1VgnyhaMZZF71RjNFNiYLN76zyZTDcBZPjYveWFXX/chimp.png",
    "tags": [
      "nfts"
    ],
    "extensions": {
      "twitter": "https://twitter.com/chimpfrens",
      "website": "https://www.chimpfrens.com/"
    }
  },
  {
    "chainId": 101,
    "address": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
    "symbol": "RAIN",
    "name": "Rain Token",
    "decimals": 5,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://linktr.ee/degeneratetrashpandas",
      "github": "https://github.com/raindrops-protocol/raindrops",
      "twitter": "https://twitter.com/only_raindrops",
      "website": "https://degentrashpandas.com/"
    }
  },
  {
    "chainId": 101,
    "address": "ETbxzGvuzVrCxVN7cNoT6QBEYwFLBwMUwSYX6pUdHyep",
    "symbol": "sTZC",
    "name": "Trezarcoin",
    "decimals": 6,
    "logoURI": "https://trezarcoin.com/wp-content/uploads/2018/02/TZC-1000x.png",
    "tags": [
      "sTZC",
      "utility-token",
      "TZC-on-Sol"
    ],
    "extensions": {
      "description": "sTZC is a bridged version of Trezarcoin on Solana",
      "twitter": "https://twitter.com/Trezarcoin",
      "website": "https://trezarcoin.com"
    }
  },
  {
    "chainId": 101,
    "address": "4h4LvS6NsVjZ87uBwrYyTeppTm1ii5PtRN9A6Ld2kZjw",
    "symbol": "$FLY",
    "name": "StayFly",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4h4LvS6NsVjZ87uBwrYyTeppTm1ii5PtRN9A6Ld2kZjw/logo.png",
    "tags": [
      "utility-token",
      "community-token",
      "merchandise-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/EaglezSOL"
    }
  },
  {
    "chainId": 101,
    "address": "GXnw9YSt6DANCt84Ti6ZpbaXvrvuEJFCYqrDjygnq4R8",
    "symbol": "ATC",
    "name": "Articoin",
    "decimals": 6,
    "logoURI": "https://www.arweave.net/lAU02W36UWemPd7ji1t_tlITGgP2V8k0VKEKQlg5Fug?ext=png",
    "tags": [
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/36sYxUUpKn",
      "twitter": "https://twitter.com/Articoin1",
      "website": "https://atcsolana.com/"
    }
  },
  {
    "chainId": 101,
    "address": "2cJgFtnqjaoiu9fKVX3fny4Z4pRzuaqfJ3PBTMk2D9ur",
    "symbol": "PLD",
    "name": "Plutonian DAO",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2cJgFtnqjaoiu9fKVX3fny4Z4pRzuaqfJ3PBTMk2D9ur/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Plutonian DAO Token",
      "serumV3Usdc": "FcAadXjF1bYQxnjFDMN6igivSYeLbabXDKjx284pagBy",
      "twitter": "https://twitter.com/plutoniansgame",
      "website": "https://plutonians.tech"
    }
  },
  {
    "chainId": 101,
    "address": "EAefyXw6E8sny1cX3LTH6RSvtzH6E5EFy1XsE2AiH1f3",
    "symbol": "RPC",
    "name": "Republic Credits",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EAefyXw6E8sny1cX3LTH6RSvtzH6E5EFy1XsE2AiH1f3/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Republic Credits",
      "serumV3Usdc": "Dujraambe9WWEtgswwccoJWMtE4Rnz2Ue4X2cGJB7keB",
      "twitter": "https://twitter.com/plutoniansgame",
      "website": "https://plutonians.tech"
    }
  },
  {
    "chainId": 101,
    "address": "7p6zGHdmWHvCH4Lsik2MoMBXqPGhFbSPSceSBXd8KNEC",
    "symbol": "PU238",
    "name": "Plutonium 238",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7p6zGHdmWHvCH4Lsik2MoMBXqPGhFbSPSceSBXd8KNEC/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Plutonium 238",
      "twitter": "https://twitter.com/plutoniansgame",
      "website": "https://plutonians.tech"
    }
  },
  {
    "chainId": 101,
    "address": "LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp",
    "symbol": "LFNTY",
    "name": "Lifinity",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp/logo.svg",
    "extensions": {
      "discord": "https://discord.com/invite/K2tvfcXwWr",
      "medium": "https://medium.com/@lifinity.io",
      "twitter": "https://twitter.com/Lifinity_io",
      "website": "https://lifinity.io/"
    }
  },
  {
    "chainId": 101,
    "address": "xLfNTYy76B8Tiix3hA51Jyvc1kMSFV4sPdR7szTZsRu",
    "symbol": "xLFNTY",
    "name": "xLifinity",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/xLfNTYy76B8Tiix3hA51Jyvc1kMSFV4sPdR7szTZsRu/logo.svg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/K2tvfcXwWr",
      "medium": "https://medium.com/@lifinity.io",
      "twitter": "https://twitter.com/Lifinity_io",
      "website": "https://lifinity.io/"
    }
  },
  {
    "chainId": 101,
    "address": "ANqY8h3sRSwkC29FvGJenAh7VGRABVVx7Ls6Mq4BuGT",
    "symbol": "ZIG",
    "name": "ZIG Coin",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ANqY8h3sRSwkC29FvGJenAh7VGRABVVx7Ls6Mq4BuGT/logo.png",
    "tags": [
      "ethereum",
      "utility-token"
    ],
    "extensions": {
      "address": "0xb2617246d0c6c0087f18703d576831899ca94f01",
      "assetContract": "https://etherscan.io/token/0xb2617246d0c6c0087f18703d576831899ca94f01",
      "blog": "https://zignaly.com/blog",
      "bridgeContract": "https://etherscan.io/address/0x3265bf56ab6c2e3cb39bb0b1bf41307ed87bfa35",
      "coingeckoId": "zignaly",
      "coinmarketcap": "https://coinmarketcap.com/currencies/zigcoin/",
      "description": "ZIG is the token that powers the Zignaly ecosystem: marketplace, vault and launchpad.",
      "discord": "https://discord.gg/r5qRXDJ",
      "facebook": "https://www.facebook.com/zignaly",
      "github": "https://github.com/zignaly-open",
      "linkedin": "https://www.linkedin.com/company/zignaly",
      "medium": "https://zignaly.medium.com/",
      "telegram": "https://t.me/ZignalyHQ",
      "telegramAnnouncements": "https://t.me/zignalyannouncement",
      "twitter": "https://twitter.com/zignaly",
      "vault": "https://zignaly.com/app/dashboard/#vault",
      "website": "https://zignaly.com/",
      "youtube": "https://www.youtube.com/c/Zignaly"
    }
  },
  {
    "chainId": 101,
    "address": "NEo3D6MXRXf2iAfaqvZYqSmFkfutLvNjm86xmfGWNh5",
    "symbol": "NEO",
    "name": "NEO3D TOKEN",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/minh-git/docusaurus-2/main/static/img/neo3d-logo.jpg",
    "tags": [
      "NFT",
      "gallery",
      "utility-token",
      "catpunk",
      "metaverse",
      "art"
    ],
    "extensions": {
      "twitter": "https://twitter.com/Neo3Dxyz",
      "website": "https://www.neo3d.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "EzfnjRUKtc5vweE1GCLdHV4MkDQ3ebSpQXLobSKgQ9RB",
    "symbol": "CSM",
    "name": "Cricket Star Manager",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EzfnjRUKtc5vweE1GCLdHV4MkDQ3ebSpQXLobSKgQ9RB/logo.svg",
    "extensions": {
      "website": "https://cricketstarmanager.com/"
    }
  },
  {
    "chainId": 101,
    "address": "LiLyT885cG9xZKYQk9x6VWMzmcui4ueV9J1uzPDDajY",
    "symbol": "LILY",
    "name": "Solily Protocol Coin",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LiLyT885cG9xZKYQk9x6VWMzmcui4ueV9J1uzPDDajY/logo.png",
    "tags": [
      "community-token"
    ],
    "extensions": {
      "website": "https://www.solily.io/"
    }
  },
  {
    "chainId": 101,
    "address": "HWSqJdwemji7TNiKQPudUj86LXyF3vGAtWm5ePk5KzgD",
    "symbol": "SIX",
    "name": "Solana Eco Index",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HWSqJdwemji7TNiKQPudUj86LXyF3vGAtWm5ePk5KzgD/logo.png",
    "tags": [
      "Index",
      "SypoolProduct"
    ],
    "extensions": {
      "description": "Solana Eco Index is based on the 5 crypto assets on Solana.",
      "website": "https://sypool.io/"
    }
  },
  {
    "chainId": 101,
    "address": "6D7nXHAhsRbwj8KFZR2agB6GEjMLg4BM7MAqZzRT8F1j",
    "symbol": "GOSU",
    "name": "Gosu",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/jGosu/gosu/main/GOSU%20COIN.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "CUvVMqXAcyFJnwMhojQ9jmGuWrijGt26HfY7b99dyBeB",
    "symbol": "FLWRS",
    "name": "FLWRS Token",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/pablolefleur/flwrsimage/main/flwrs%20logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "FmQ7v2QUqXVVtAXkngBh3Mwx7s3mKT55nQ5Z673dURYS",
    "symbol": "DARK",
    "name": "Dark Protocol",
    "decimals": 9,
    "logoURI": "https://www.arweave.net/3VPYgJz-wlRAm1H5_4zrsAckyz55qa5ILyk3Uq6l4Ms?ext=png",
    "tags": [
      "nfts",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/anonclub",
      "medium": "https://theanonclub.medium.com/",
      "twitter": "https://twitter.com/theanonclub",
      "website": "https://theanonclub.com/"
    }
  },
  {
    "chainId": 101,
    "address": "519W6ZZnduudeo6tp1YMgeWiNFeoq4kTVS4uMZggKE5r",
    "symbol": "KLGT",
    "name": "Kleyne Gelt",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/klglt/Crypto/main/menorah.png",
    "tags": [
      "currency"
    ]
  },
  {
    "chainId": 101,
    "address": "87rSGrpYdmTxfNBf8o2cpyiNcxCmNhUPBXjT8aoyfob5",
    "symbol": "ENX",
    "name": "Equinox",
    "decimals": 9,
    "logoURI": "https://ixrjpmbgkspkjaueqzmyhb3fbca5atffgsrqyt527d2x3ycdlgqq.arweave.net/ReKXsCZUnqSChIZZg4dlCIHQTKU0owxPuvj1feBDWaE",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/SolminatorNFT",
      "website": "https://www.solminator.com/"
    }
  },
  {
    "chainId": 101,
    "address": "CREAMpdDimXxj2zTCwP5wMEtba4NYaKCrTBEQTSKtqHe",
    "symbol": "CREAMY",
    "name": "Creamy",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CREAMpdDimXxj2zTCwP5wMEtba4NYaKCrTBEQTSKtqHe/logo.png",
    "tags": [
      "community-token",
      "utility-token",
      "social-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/creamyfriends",
      "serumV3Usdc": "BxTfmxEQf6FQ6F1cQ3fi6o6FPG52hiZXi4DTGYRhsmPo",
      "twitter": "https://twitter.com/CreamyFriends"
    }
  },
  {
    "chainId": 101,
    "address": "23WuycvPjEuzJTsBPBZqnbFZFcBtBKAMTowUDHwagkuD",
    "symbol": "GEAR",
    "name": "Starbots GEAR",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/23WuycvPjEuzJTsBPBZqnbFZFcBtBKAMTowUDHwagkuD/logo.png",
    "tags": [
      "utility-token",
      "play-to-earn",
      "game-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/Starbots_game",
      "website": "https://starbots.net"
    }
  },
  {
    "chainId": 101,
    "address": "LUVumGBdVkaPYbGyjjRJtsbYoVtZ1h7AaX1Hh2bcaqn",
    "symbol": "$LUV",
    "name": "LUV",
    "decimals": 10,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/LUVumGBdVkaPYbGyjjRJtsbYoVtZ1h7AaX1Hh2bcaqn/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/loveonsolana"
    }
  },
  {
    "chainId": 101,
    "address": "8c71AvjQeKKeWRe8jtTGG1bJ2WiYXQdbjqFbUfhHgSVk",
    "symbol": "$GARY",
    "name": "GARY",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/puresec-ng/gary/main/GARY_coin.jpg"
  },
  {
    "chainId": 101,
    "address": "Do5AbqdEbj742B2Cm8BypAGg3h1skLaAVTbT2mLRcW8c",
    "symbol": "HALO",
    "name": "HALO",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/farhan067/HaloTokenLogo/main/logo.png"
  },
  {
    "chainId": 101,
    "address": "Emberc567ToSP9FgAMuJWHXiQnEKVWrWC6gy64zbsK8u",
    "symbol": "EMBER",
    "name": "Meta Drago Ember",
    "decimals": 9,
    "logoURI": "https://metadrago.art/resources/images/EmberLogo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/metadrago",
      "twitter": "https://twitter.com/MetaDragoNFT",
      "website": "https://metadrago.art"
    }
  },
  {
    "chainId": 101,
    "address": "ChywntqwNRzaoWYUcDQ3iALqcwSAVtjM2dPshz5AETMm",
    "symbol": "KTRC",
    "name": "Kotaro Chips",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ChywntqwNRzaoWYUcDQ3iALqcwSAVtjM2dPshz5AETMm/logo.png",
    "tags": [
      "NFT",
      "GAMEFI",
      "Staking"
    ],
    "extensions": {
      "description": "Kotaro Chips is an SPL token of Kotaro Sharks, an NFT collection of sharks living on the Solana blockchain that love to play poker and vibe with friends.",
      "discord": "http://discord.gg/kotarosharks",
      "twitter": "https://twitter.com/KotaroSharks"
    }
  },
  {
    "chainId": 101,
    "address": "TKDrcm3n4mfXFfPKZoLp5soRSdFQSmyWLdomdKL3ktU",
    "symbol": "TENKAI",
    "name": "Tenkai Token",
    "decimals": 0,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/TKDrcm3n4mfXFfPKZoLp5soRSdFQSmyWLdomdKL3ktU/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/PfrZe9hPcP",
      "serumV3Usdc": "DnBj2xqxwjDYCNnegpFuaFqiYktvZpz9a7gvdbodjTU",
      "twitter": "https://twitter.com/TenkaiApes",
      "website": "https://tenkaiapes.com/"
    }
  },
  {
    "chainId": 101,
    "address": "aYZPYgohjK6LYM8o1v6pnr3ZinhuRzSHd6TRDVDUBkK",
    "symbol": "BTL",
    "name": "BitLegacy Token",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/aYZPYgohjK6LYM8o1v6pnr3ZinhuRzSHd6TRDVDUBkK/logo.png",
    "extensions": {
      "twitter": "https://twitter.com/bitlegacytoken",
      "website": "https://bitlegacytoken.com"
    }
  },
  {
    "chainId": 101,
    "address": "BvEj2MNMPsUrD4vSk7NHs4TtRcCcJd75Wx5HvVbY4rbK",
    "symbol": "DEDS",
    "name": "Decimus Dynamics Token",
    "decimals": 9,
    "logoURI": "https://github.com/DecimusDynamics/assets/blob/main/decimus-icon-1x1-black.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/DecimusDynamic",
      "website": "http://decimusdynamics.io/"
    }
  },
  {
    "chainId": 101,
    "address": "PUhuAtMHsKavMTwZsLaDeKy2jb7ciETHJP7rhbKLJGY",
    "symbol": "USN",
    "name": "USN (Allbridge from Near)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/PUhuAtMHsKavMTwZsLaDeKy2jb7ciETHJP7rhbKLJGY/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "coingeckoId": "usn"
    }
  },
  {
    "chainId": 101,
    "address": "9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6",
    "symbol": "USH",
    "name": "Hedge USD",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9iLH8T7zoWhY7sBmj1WK9ENbWdS1nL8n9wAxaeRitTa6/logo.png",
    "tags": [
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/hedge",
      "serumV3Usdc": "6aRwQtvTcHeRTtGxQRhqViwMF1XPEn271CgGEx3YAyEY",
      "twitter": "https://twitter.com/HedgeLabs",
      "website": "https://www.hedge.so/"
    }
  },
  {
    "chainId": 101,
    "address": "5PmpMzWjraf3kSsGEKtqdUsCoLhptg4yriZ17LKKdBBy",
    "symbol": "HDG",
    "name": "Hedge Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/5PmpMzWjraf3kSsGEKtqdUsCoLhptg4yriZ17LKKdBBy/logo.png",
    "tags": [
      "community-token",
      "governance-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/hedge",
      "serumV3Usdc": "7HrUmsVM7poJdjgoteTVzx3VMFyLcAhdR8JMbuFD6VNq",
      "twitter": "https://twitter.com/HedgeLabs",
      "website": "https://www.hedge.so/"
    }
  },
  {
    "chainId": 101,
    "address": "3swraHsc77KMg1tFvwH3tfYcd8SWr5fcUhtmRxjavG7H",
    "symbol": "KS",
    "name": "KALISTEN - Train To Earn",
    "decimals": 9,
    "logoURI": "https://kalisten.app/wp-content/uploads/2022/05/kalisten_token.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/kalisten",
      "twitter": "https://twitter.com/kalisten_",
      "website": "https://kalisten.app/"
    }
  },
  {
    "chainId": 101,
    "address": "CT81fJ8ReVt3aNPqZr3xZvgJ7jjEfrzaXh3condAXHXP",
    "symbol": "SOLPUNKS",
    "name": "SolPunks Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/17eC2nf.jpg",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "solpunks",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/CT81fJ8ReVt3aNPqZr3xZvgJ7jjEfrzaXh3condAXHXP"
    }
  },
  {
    "chainId": 101,
    "address": "FmoKY2ERGmE9NzrYphAJcqH5BPRy2Hs4VomRfu8Qgt7Y",
    "symbol": "MONKES",
    "name": "SMB Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/FczxrLa.png",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "smb",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/FmoKY2ERGmE9NzrYphAJcqH5BPRy2Hs4VomRfu8Qgt7Y"
    }
  },
  {
    "chainId": 101,
    "address": "8e2G3tCTvKAosq4BnYbDczboRVhy7xaXwbTSJeXEefJX",
    "symbol": "JCATS",
    "name": "Jungle Cats Floor Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/AEPNTTQ.jpg",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "jungle-cats",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/8e2G3tCTvKAosq4BnYbDczboRVhy7xaXwbTSJeXEefJX"
    }
  },
  {
    "chainId": 101,
    "address": "CP8CaP7GmSVUo9j3L8dwDKVR6i1kvcCUn1ubGGhc2V2M",
    "symbol": "SURF",
    "name": "Serum Surfers Floor Index",
    "decimals": 2,
    "logoURI": "https://creator-hub-prod.s3.us-east-2.amazonaws.com/serum_surfers_pfp_1650376607466.gif",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "serum-surfers",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/CP8CaP7GmSVUo9j3L8dwDKVR6i1kvcCUn1ubGGhc2V2M"
    }
  },
  {
    "chainId": 101,
    "address": "fLoeAqCfMiS3Uaj6aXSCGhf2ZE9znWz7WjTPCD2Rgnf",
    "symbol": "MMCC",
    "name": "Meerkats Floor Index",
    "decimals": 2,
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/da62eb10c452a9b2a9b768d4aedd13b5/676b0660",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "mmcc",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/fLoeAqCfMiS3Uaj6aXSCGhf2ZE9znWz7WjTPCD2Rgnf"
    }
  },
  {
    "chainId": 101,
    "address": "sRLY3migNrkC1HLgqotpvi66qGkdNedqPZ9TJpAQhyh",
    "symbol": "sRLY",
    "name": "sRLY (Rally Solana)",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/RLYv2ubRMDLcGG2UyvPmnPmkfuQTsMbg4Jtygc7dmnq/logo.png",
    "extensions": {
      "website": "https://rly.network"
    }
  },
  {
    "chainId": 101,
    "address": "9ET2QCQJdFkeKkuaampNbmicbA8eLYauFCWch9Ddh9p5",
    "symbol": "CTI",
    "name": "ClinTex CTI",
    "decimals": 8,
    "logoURI": "https://clintex.io/cti_sml.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "ClinTex CTI: Clinical Trials Intelligence.",
      "twitter": "https://twitter.com/ClinTexCTi",
      "website": "https://clintex.io/"
    }
  },
  {
    "chainId": 101,
    "address": "TRENpVRAR9LiZgyYv9zWrQwYqSHa7ThCYdbpFCJixj1",
    "symbol": "TREN",
    "name": "Trenbolone",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/TRENpVRAR9LiZgyYv9zWrQwYqSHa7ThCYdbpFCJixj1/logo.png",
    "tags": [
      "social-token",
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/YokedYetis"
    }
  },
  {
    "chainId": 101,
    "address": "GoLDYyyiVeXnVf9qgoK712N5esm1cCbHEK9aNJFx47Sx",
    "symbol": "GOLDY",
    "name": "DeFi Land Gold",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/GoLDYyyiVeXnVf9qgoK712N5esm1cCbHEK9aNJFx47Sx/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.com/invite/defiland",
      "medium": "https://defiland.medium.com/",
      "telegram": "https://t.me/defiland_official",
      "twitter": "https://twitter.com/DeFi_Land",
      "website": "https://defiland.app/"
    }
  },
  {
    "chainId": 101,
    "address": "4B619RbcXbXrKTzNVgDSRiUn9wfxWgA1w1oFLveGacNy",
    "symbol": "HCOIN",
    "name": "Hydrogencoin",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/dataalg/Hydrogen/main/4B619RbcXbXrKTzNVgDSRiUn9wfxWgA1w1oFLveGacNy/logo.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "Hydrogencoin is a digital currency founded by DataAlg. It aims to develop green hydrogen economies.",
      "twitter": "https://twitter.com/hydrogencoin_io",
      "website": "http://hydrogencoin.io"
    }
  },
  {
    "chainId": 101,
    "address": "CTYiHf58UGShfHtpkTwx7vjPDA779dd6iVaeD281fEVx",
    "symbol": "HUNT",
    "name": "Hunter Diamond",
    "decimals": 9,
    "logoURI": "https://tokenhunters.app/assets/img/icons/chest-close.svg"
  },
  {
    "chainId": 101,
    "address": "GRsoqmhsS7fCLpEqqE7oRM92ag3WVy8VbJAi6KfWSeHS",
    "symbol": "BBI",
    "name": "Bridgesplit Brand Index",
    "decimals": 2,
    "logoURI": "https://i.imgur.com/lbvoBFh.png",
    "tags": [
      "unstoppable-domains",
      "domains",
      "bridgesplit-fraction",
      "curated-index"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/curated-index/GRsoqmhsS7fCLpEqqE7oRM92ag3WVy8VbJAi6KfWSeHS"
    }
  },
  {
    "chainId": 101,
    "address": "BjZ5Hazjyp9LrzfapAHYZuceWm6zJZDqMH1QPCWtsouq",
    "symbol": "AERA",
    "name": "Aera Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BjZ5Hazjyp9LrzfapAHYZuceWm6zJZDqMH1QPCWtsouq/logo.png",
    "tags": [
      "aera-token",
      "utility-token"
    ],
    "extensions": {
      "website": "https://aeralife.com"
    }
  },
  {
    "chainId": 101,
    "address": "FyNuYGBBry5LAtPEkh8Y73izjTUNT2td2J3sGCK7E9Ju",
    "symbol": "VIBEZ",
    "name": "VIBEZ",
    "decimals": 9,
    "logoURI": "https://github.com/ArthurPaivaT/token-list/blob/main/assets/mainnet/FyNuYGBBry5LAtPEkh8Y73izjTUNT2td2J3sGCK7E9Ju/logo.png?raw=true"
  },
  {
    "chainId": 101,
    "address": "E8G4uo2i9d12aGnXDHXXcw6hU2fh2NytR5XR3qurTLBx",
    "symbol": "WNDO",
    "name": "WNDO",
    "decimals": 9,
    "logoURI": "https://static1.squarespace.com/static/6252f1590fac8d79fb6d772e/t/627682f25295251e0967c29c/1651933939477/wndocoin.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "description": "WNDO is a utility token used on the WNDO platform.  Buy stuff in the real world get rewarded in WNDO!",
      "website": "https://www.wndo.io/"
    }
  },
  {
    "chainId": 101,
    "address": "boooCKXQn9YTK2aqN5pWftQeb9TH7cj7iUKuVCShWQx",
    "symbol": "BOO",
    "name": "Boo Network",
    "decimals": 9,
    "logoURI": "https://arweave.net/Reo2_w4k9PGdtYX3p8BllNZpSbbIJ-zype0qdbQgsoE",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/GhostKidDAO",
      "website": "https://tinyurl.com/ghostkiddao"
    }
  },
  {
    "chainId": 101,
    "address": "EK6j5Shv99xttoT3F2DfG8uQMoX6NoAZgTuYwCvrHzqo",
    "symbol": "LIONESS",
    "name": "Jungle Cats Lioness Index",
    "decimals": 2,
    "logoURI": "https://dl.airtable.com/.attachments/5befbef5bb59eb122426dac8db5a0b2f/2327b76a/QueenLion.jpg",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "jungle-cats-lioness",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/EK6j5Shv99xttoT3F2DfG8uQMoX6NoAZgTuYwCvrHzqo"
    }
  },
  {
    "chainId": 101,
    "address": "uL2qhMckUAroJPt2MLHwEeppJNYE3wBAGFMCs3anwXn",
    "symbol": "DRIPSPLIT",
    "name": "Drippies Floor Index",
    "decimals": 2,
    "logoURI": "https://creator-hub-prod.s3.us-east-2.amazonaws.com/drippies_pfp_1648415706808.gif",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "drippies",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/uL2qhMckUAroJPt2MLHwEeppJNYE3wBAGFMCs3anwXn"
    }
  },
  {
    "chainId": 101,
    "address": "7V5AaqHTwiySegaAmNPLekQfTAoK4WvEVgfi2R8V44tB",
    "symbol": "rFRAKT",
    "name": "Random FRAKTs",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7V5AaqHTwiySegaAmNPLekQfTAoK4WvEVgfi2R8V44tB/rFRAKT.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/CUvaGx32Z1p9Wia2Xheod37ii62byAxhNv8r2UJX729Y/buy"
    }
  },
  {
    "chainId": 101,
    "address": "EmvtEzATa3n766yxojGZJmpSzkTxsCdDSX2zgRMZEoaQ",
    "symbol": "rPWNG",
    "name": "Random Pawnshop Gnomies",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EmvtEzATa3n766yxojGZJmpSzkTxsCdDSX2zgRMZEoaQ/rPWNG.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/FvKPzBfDx6AgBhkwweFnth2g9Mfd21vT9Lr7yoxUQsp8/buy"
    }
  },
  {
    "chainId": 101,
    "address": "4PhPtyBhmMYBLjiJPr3wef2syoMSJYn5WcNgXxvmG3NZ",
    "symbol": "rPUNK",
    "name": "Random Solpunks",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4PJ8yD2hPXVGxnYcmjBoDyDHKAMEAKjGgAfvEqmZUaAw/logo.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/HfEJXp9YNdrrPuqAoaeKzL3pyCvsdnVQxHXpf7KVTsjY/buy"
    }
  },
  {
    "chainId": 101,
    "address": "ugKuq43fnPEcEeH12gCfETbshMRJ8nD2qXmcbyNHaEb",
    "symbol": "rTHUG",
    "name": "Random Thugbirdz",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ugKuq43fnPEcEeH12gCfETbshMRJ8nD2qXmcbyNHaEb/rTHUG.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/3da5KmaRp9gHx2wzv8PdZHpxXWvbHMRUxCK9FCLvHGZr/buy"
    }
  },
  {
    "chainId": 101,
    "address": "9m8E1yLHaG1B2TFSNeWahsitQh5yQRnrbyw756HFAcEa",
    "symbol": "rLGND",
    "name": "Random Blockasset Legends",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9m8E1yLHaG1B2TFSNeWahsitQh5yQRnrbyw756HFAcEa/rLGND.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/EHNimBvyzYB8qJvpXzaGudDZ3eNUnezyCMLxigXvTqwU/buy"
    }
  },
  {
    "chainId": 101,
    "address": "7uENff26kbM3zP9YhYj4MdSzS5nGoEDSeHs81zQ7Gp2J",
    "symbol": "rATRNT",
    "name": "Random Aiternate",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7uENff26kbM3zP9YhYj4MdSzS5nGoEDSeHs81zQ7Gp2J/rATRNT.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/8ezfmbfr5rRNrvM1z4ZqWTjf9mbcpozpgFxgSbmmR2c2/buy"
    }
  },
  {
    "chainId": 101,
    "address": "Vjq9T5xmqRzLXQRyvigzyZzpHCGCsbYAJ7afLVuF8j9",
    "symbol": "rZOOM",
    "name": "Random Zaysan Raptors",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Vjq9T5xmqRzLXQRyvigzyZzpHCGCsbYAJ7afLVuF8j9/rZOOM.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/2pCdQHULNgwesN7dQdRW93GFsLb99GpNC4wT9V1jvUvB/buy"
    }
  },
  {
    "chainId": 101,
    "address": "7Mfsbr8vS2LjWTFspTgfLPWm7s77zvJsevBuW4P9MZ3m",
    "symbol": "rSAMO",
    "name": "Random Samo",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7Mfsbr8vS2LjWTFspTgfLPWm7s77zvJsevBuW4P9MZ3m/rSAMO.png",
    "tags": [
      "frakt-nft-pool"
    ],
    "extensions": {
      "website": "https://frakt.xyz/pools/6oufJYFSNcWEBV465FDywN2VbYftnXff9KuNnebkc8YD/buy"
    }
  },
  {
    "chainId": 101,
    "address": "3FHpkMTQ3QyAJoLoXVdBpH4TfHiehnL2kXmv9UXBpYuF",
    "symbol": "STYLE",
    "name": "STYLE",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3FHpkMTQ3QyAJoLoXVdBpH4TfHiehnL2kXmv9UXBpYuF/style.png",
    "tags": [
      "utility-token",
      "fashion",
      "wte",
      "wear-to-earn"
    ],
    "extensions": {
      "discord": "https://discord.gg/anybodies",
      "twitter": "https://twitter.com/anybodiesNFT",
      "website": "https://www.anybodies.com/"
    }
  },
  {
    "chainId": 101,
    "address": "MLKmUCaj1dpBY881aFsrBwR9RUMoKic8SWT3u1q5Nkj",
    "symbol": "MILK",
    "name": "MILK",
    "decimals": 9,
    "logoURI": "https://www.arweave.net/HayHyYd_wWkVl0-LqTXKfBqxGTLnXkSB8wQwtbXe8c0?ext=png",
    "tags": [
      "NFT",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/udderchaos",
      "twitter": "https://twitter.com/udderchaossol",
      "website": "https://udderchaos.io/"
    }
  },
  {
    "chainId": 101,
    "address": "XwTZraiF1dVh69cZ2SpqyjDLmei2uVps5CYHD9vqK6d",
    "symbol": "BURR",
    "name": "Burrito Boyz Floor Index",
    "decimals": 2,
    "logoURI": "https://creator-hub-prod.s3.us-east-2.amazonaws.com/burrito_boyz_pfp_1653394754301.png",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "Burrito-Boyz",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/XwTZraiF1dVh69cZ2SpqyjDLmei2uVps5CYHD9vqK6d"
    }
  },
  {
    "chainId": 101,
    "address": "EHaEBhYHWA7HSphorXXosysJem6qF4agccoqDqQKCUge",
    "symbol": "WEYU",
    "name": "WEYU",
    "decimals": 8,
    "logoURI": "https://weyu.io/img/WEYU.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "address": "0xFAfD4CB703B25CB22f43D017e7e0d75FEBc26743",
      "assetContract": "https://bscscan.com/address/0xFAfD4CB703B25CB22f43D017e7e0d75FEBc26743",
      "coingeckoId": "weyu",
      "discord": "https://discord.com/invite/weyu",
      "serumV3Usdc": "4hvgayPdWGdMeQREv4JGGfs83beV9d4biQV8AUhUMQmT",
      "telegram": "https://t.me/WEYUchat",
      "twitter": "https://twitter.com/weyuofficial",
      "website": "https://weyu.io"
    }
  },
  {
    "chainId": 101,
    "address": "4nhQdXfoHvCCVnyZQg3awXqPrKL89Ys7Rbe77oXM47GG",
    "symbol": "AIO",
    "name": "AIO Exchange Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/adminesc/AIO_EXCHANGE_Token/main/logo.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "HDEqEpFgTrBawzDgTG1eyH8Go9PX84LCEC8Qjt8T4jFN",
    "symbol": "BOTS",
    "name": "Skullbot Biker Gang Floor Index",
    "decimals": 2,
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/85c63ffb5a6bb05e08daa667fecb7c84/6949eab5",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "skullbots-biker-gang",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/HDEqEpFgTrBawzDgTG1eyH8Go9PX84LCEC8Qjt8T4jFN"
    }
  },
  {
    "chainId": 101,
    "address": "6ABQdaTwRvmacto7aeRBGghS6Pxctd6cFGL8gDdwV1dd",
    "symbol": "XTR",
    "name": "Extra Reality",
    "decimals": 8,
    "logoURI": "https://www.arweave.net/JhshFOxqQpI1RlVzANbN0Dwf3P9g1E7lPSRfbZQfsp8?ext=png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/TRECO_XTR",
      "website": "https://tradecoin.space/"
    }
  },
  {
    "chainId": 101,
    "address": "F8Wh3zT1ydxPYfQ3p1oo9SCJbjedqDsaC1WaBwh64NHA",
    "symbol": "SSURF",
    "name": "Serum Surfers Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/F8Wh3zT1ydxPYfQ3p1oo9SCJbjedqDsaC1WaBwh64NHA/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "7R4pJpJdzapj2hEfzQR5bp2ApDjqXNRUA5GTngC6xRZX",
    "symbol": "GB",
    "name": "GameBeef",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7R4pJpJdzapj2hEfzQR5bp2ApDjqXNRUA5GTngC6xRZX/logo.png",
    "tags": [
      "social-token"
    ]
  },
  {
    "chainId": 101,
    "address": "7vVRYg24HvVmgxV4neAog66GjW6aCUwnArvjDn6bgrX5",
    "symbol": "NECTAR2",
    "name": "NECTAR2 Token",
    "decimals": 9,
    "logoURI": "https://raw.githubusercontent.com/agave-com/nectar-token/main/logo-sq.png",
    "tags": [
      "utility-token"
    ]
  },
  {
    "chainId": 101,
    "address": "4JWktLr39ZbyutVnym7wKxV1RDoJz7ifDYxMUHDmAbPB",
    "symbol": "DMV",
    "name": "DARK COIN",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/Shaik-Sirajuddin/RepoForUploadsNeverDelete/master/Images/darkcoin.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/dh3gWTFj",
      "facebook": "https://www.facebook.com/darkcoindmv",
      "github": "https://github.com/darkcoindmv",
      "instagram": "https://www.instagram.com/helloyogaworlddao",
      "reddit": "https://www.reddit.com/user/darkcoindmv",
      "telegram": "https://t.me/darkcoindmv",
      "twitter": "https://twitter.com/darkcoindmv",
      "website": "https://www.darktoken.org"
    }
  },
  {
    "chainId": 101,
    "address": "9tzZzEHsKnwFL1A3DyFJwj36KnZj3gZ7g4srWp9YTEoh",
    "symbol": "ARB",
    "name": "ARB Protocol",
    "decimals": 6,
    "logoURI": "https://raw.githubusercontent.com/ARBProtocol/arbprotocol/main/IMG_3600.png",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/M4F8RKqgce",
      "twitter": "https://twitter.com/arbprotocol"
    }
  },
  {
    "chainId": 101,
    "address": "4tejdaGTug9xWg58f92zmFMrsoWqCnvt8WaVuCiP3uUy",
    "symbol": "ICHIGO",
    "name": "ICHIGO",
    "decimals": 8,
    "logoURI": "https://ichigo.network/logos/logo.png",
    "tags": [
      "utility-token",
      "social-token"
    ],
    "extensions": {
      "twitter": "https://twitter.com/ichigonetwork",
      "website": "https://ichigo.network/"
    }
  },
  {
    "chainId": 101,
    "address": "HCpyiCXvziKByTGoQMLUmooAWBkCLvZmzB9D6TyPdACR",
    "symbol": "QDOT",
    "name": "QDOT",
    "decimals": 8,
    "logoURI": "https://www.arweave.net/qyhe_8Lmd82_NWRwxdfPX0fm_CItn18KXV1Skp-x6N0?ext=jpg",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "website": "https://musicq.club/"
    }
  },
  {
    "chainId": 101,
    "address": "98ouGzbMV2DnHfn3Uc7oahwvDP4Cf7Ls77JsBiARdjvn",
    "symbol": "DBC",
    "name": "DBank Coin",
    "decimals": 6,
    "logoURI": "https://arweave.net/g4a4JTGvXRxWYFIkuJtyEIDdIp2b487R_2YdTSUreXM",
    "tags": [
      "utility-token",
      "community-token"
    ],
    "extensions": {
      "website": "https://dbank.to/"
    }
  },
  {
    "chainId": 101,
    "address": "AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh",
    "symbol": "svtOKAY",
    "name": "Okay Bears Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/AG5j4hhrd1ReYi7d1JsZL8ZpcoHdjXvc8sdpWF74RaQh/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "8UaGbxQbV9v2rsMxy2G2NEh1JYQ8T9dmggq1oesrXD9c",
    "symbol": "RIBH",
    "name": "Ribh",
    "decimals": 3,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8UaGbxQbV9v2rsMxy2G2NEh1JYQ8T9dmggq1oesrXD9c/logo.png",
    "tags": [
      "DeFi",
      "stablecoin"
    ],
    "extensions": {
      "discord": "https://discord.gg/vC4cmuZw",
      "linkedin": "https://linkedin.com/company/ribh",
      "twitter": "https://twitter.com/Ribh00857956",
      "website": "https://ribh.finance"
    }
  },
  {
    "chainId": 101,
    "address": "BoeDfSFRyaeuaLP97dhxkHnsn7hhhes3w3X8GgQj5obK",
    "symbol": "svtFFF",
    "name": "Famous Fox Federation Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BoeDfSFRyaeuaLP97dhxkHnsn7hhhes3w3X8GgQj5obK/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "Ca5eaXbfQQ6gjZ5zPVfybtDpqWndNdACtKVtxxNHsgcz",
    "symbol": "svtSMB",
    "name": "Solana Monkey Business Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Ca5eaXbfQQ6gjZ5zPVfybtDpqWndNdACtKVtxxNHsgcz/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "Bp6k6xacSc4KJ5Bmk9D5xfbw8nN42ZHtPAswEPkNze6U",
    "symbol": "svtPSK",
    "name": "Pesky Penguins Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Bp6k6xacSc4KJ5Bmk9D5xfbw8nN42ZHtPAswEPkNze6U/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "DCgRa2RR7fCsD63M3NgHnoQedMtwH1jJCwZYXQqk9x3v",
    "symbol": "svtDGOD",
    "name": "DeGods Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DCgRa2RR7fCsD63M3NgHnoQedMtwH1jJCwZYXQqk9x3v/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "8vkTew1mT8w5NapTqpAoNUNHW2MSnAGVNeu8QPmumSJM",
    "symbol": "svtWAVE",
    "name": "Playground Waves Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8vkTew1mT8w5NapTqpAoNUNHW2MSnAGVNeu8QPmumSJM/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "EiasWmzy9MrkyekABHLfFRkGhRakaWNvmQ8h5DV86zyn",
    "symbol": "svtVSNRY",
    "name": "Visionary Studios Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EiasWmzy9MrkyekABHLfFRkGhRakaWNvmQ8h5DV86zyn/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "4wGimtLPQhbRT1cmKFJ7P7jDTgBqDnRBWsFXEhLoUep2",
    "symbol": "svtFLARE",
    "name": "Lifinity Flares Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4wGimtLPQhbRT1cmKFJ7P7jDTgBqDnRBWsFXEhLoUep2/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "3GQqCi9cuGhAH4VwkmWD32gFHHJhxujurzkRCQsjxLCT",
    "symbol": "svtGGSG",
    "name": "Galactic Geckos Space Garage Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3GQqCi9cuGhAH4VwkmWD32gFHHJhxujurzkRCQsjxLCT/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "8W2ZFYag9zTdnVpiyR4sqDXszQfx2jAZoMcvPtCSQc7D",
    "symbol": "svtCWM",
    "name": "The Catalina Whale Mixer Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8W2ZFYag9zTdnVpiyR4sqDXszQfx2jAZoMcvPtCSQc7D/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "6F5A4ZAtQfhvi3ZxNex9E1UN5TK7VM2enDCYG1sx1AXT",
    "symbol": "svtDAPE",
    "name": "Degenerate Ape Academy Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6F5A4ZAtQfhvi3ZxNex9E1UN5TK7VM2enDCYG1sx1AXT/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "CT1iZ7MJzm8Riy6MTgVht2PowGetEWrnq1SfmUjKvz8c",
    "symbol": "svtBV",
    "name": "Balloonsville Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CT1iZ7MJzm8Riy6MTgVht2PowGetEWrnq1SfmUjKvz8c/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "3XwZtyP5g2ku5cNzLXYcBYygvToXKdjw73GSRq73QYLQ",
    "symbol": "KREECHURE",
    "name": "Kreechures Floor Index",
    "decimals": 2,
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/1204ecf0b475bf46a0e65391c3b5e947/fefec436",
    "tags": [
      "fraction-index",
      "bridgesplit-fraction",
      "kreechures",
      "fnft"
    ],
    "extensions": {
      "discord": "https://discord.gg/bridgesplit",
      "twitter": "https://twitter.com/bridgesplit",
      "vault": "https://app.bridgesplit.com/fractions/3XwZtyP5g2ku5cNzLXYcBYygvToXKdjw73GSRq73QYLQ"
    }
  },
  {
    "chainId": 101,
    "address": "EmLJ8cNEsUtboiV2eiD6VgaEscSJ6zu3ELhqixUP4J56",
    "symbol": "svtTHUGZ",
    "name": "Thugbirdz - Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EmLJ8cNEsUtboiV2eiD6VgaEscSJ6zu3ELhqixUP4J56/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "4MSMKZwGnkT8qxK8LsdH28Uu8UfKRT2aNaGTU8TEMuHz",
    "symbol": "svtGENE",
    "name": "Genopets Genesis - Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4MSMKZwGnkT8qxK8LsdH28Uu8UfKRT2aNaGTU8TEMuHz/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "HYtdDGdMFqBrtyUe5z74bKCtH2WUHZiWRicjNVaHSfkg",
    "symbol": "svtAURY",
    "name": "Aurory - Solvent Droplet",
    "decimals": 8,
    "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HYtdDGdMFqBrtyUe5z74bKCtH2WUHZiWRicjNVaHSfkg/logo.png",
    "tags": [
      "utility-token",
      "solvent-droplet"
    ],
    "extensions": {
      "discord": "https://discord.gg/thK8BCtQbM",
      "github": "https://github.com/solventprotocol",
      "medium": "https://medium.com/@solventprotocol",
      "telegram": "https://t.me/solventprotocol",
      "twitter": "https://twitter.com/solventprotocol",
      "website": "https://solvent.xyz"
    }
  },
  {
    "chainId": 101,
    "address": "kiTkNc7nYAu8dLKjQFYPx3BqdzwagZGBUrcb7d4nbN5",
    "symbol": "depKI",
    "name": "Old Ki",
    "decimals": 9,
    "logoURI": "https://arweave.net/ZdmFNB-xpXrEVuQeJBsKHLn3is6yt3m74_jlmjtQjSA?ext=png",
    "tags": [
      "genopets",
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/genopets",
      "twitter": "https://twitter.com/genopets",
      "website": "https://genopets.me"
    }
  },
  {
    "chainId": 101,
    "address": "DMbb79fgxR3fKKVKWcbetMCuxNNtJnfjY3qqAE4G4wJf",
    "symbol": "DUSK",
    "name": "Dusk",
    "decimals": 3,
    "logoURI": "https://firebasestorage.googleapis.com/v0/b/mom-prod-625e5.appspot.com/o/TokensNoBG%2FDusk_Coin_INV.png?alt=media&token=66709e38-8d35-40b0-8c0d-9499372f421f",
    "tags": [
      "utility-token"
    ],
    "extensions": {
      "discord": "https://discord.gg/milliononmars",
      "twitter": "https://twitter.com/MilliononMars",
      "website": "https://milliononmars.io/"
    }
  },
  {
    "chainId": 101,
    "symbol": "CRM",
    "name": "Crema",
    "address": "CRMaDAzKCWYbhUfsKYA8448vaA1qUzCETd7gNBDzQ1ks",
    "decimals": 9,
    "logoURI": "https://www.arweave.net/E6II9rfGbg3zzLugMjtbPGf5sM-JKKky2iXGA5SoYjQ?ext=png",
    "extensions": {
      "website": "https://www.crema.finance/",
      "twitter": "https://twitter.com/Crema_Finance",
      "coingeckoId": "crema-finance"
    },
    "tags": []
  },
  {
    "chainId": 101,
    "symbol": "KI",
    "name": "Genopets Ki",
    "address": "kiGenopAScF8VF31Zbtx2Hg8qA5ArGqvnVtXb83sotc",
    "decimals": 9,
    "logoURI": "https://arweave.net/WfPR8w5dEoerG_bI3S2o2_nuSfWY3p8M4YbQ6ijd1cQ?ext=png",
    "extensions": {
      "website": "https://genopets.me",
      "twitter": "https://twitter.com/genopets"
    },
    "tags": []
  },
  {
    "address": "6y8W5YwAuzostqrS4YDJufBvksosfSi47Pd8U4A5vrBC",
    "chainId": 101,
    "decimals": 9,
    "name": "Whole Earth Coin",
    "symbol": "WEC",
    "logoURI": "https://ipfs.moralis.io:2053/ipfs/QmStqd3JLmEA9bfcUzt2CWF2iPzt7tgPmnkgou7JxauUkz"
  },
  {
    "address": "AUT1gfMZw37wMMQqAxk89nfpjZpEEf2XSoBUd8V5ydnS",
    "chainId": 101,
    "decimals": 9,
    "name": "Ave University Token",
    "symbol": "AUT",
    "logoURI": "https://arweave.net/T-R84Zo32rDOA5Wo66T8jAlqcyjD7Folt1oeCfjlizU"
  },
  {
    "address": "DSXWF79VQ3RzFBB67WeNfCzfzAQq5X6m97zi85bq1TRx",
    "chainId": 101,
    "decimals": 2,
    "name": "Catalina Whale Mixer Floor Index",
    "symbol": "WHALES",
    "logoURI": "https://bafkreicadecx3rbffm6tqtgtc67bi6r2xiibtmawcejje7pfu7id2zxwwy.ipfs.dweb.link/"
  },
  {
    "address": "CbazZEWMxFoXthk8s347PqvDG4JkvnNiCC3zZkah4aqD",
    "chainId": 101,
    "decimals": 9,
    "name": "Zalina Finance",
    "symbol": "ZALINA",
    "logoURI": "https://www.arweave.net/rYIH0g8RO9D_CfAwEcdWa_HT4HnMFXsQ0TxQFWua5jw?ext=png"
  },
  {
    "address": "3uejHm24sWmniGA5m4j4S1DVuGqzYBR5DJpevND4mivq",
    "chainId": 101,
    "decimals": 9,
    "name": "IP3",
    "symbol": "IP3",
    "logoURI": "https://cripco.com/token/image/ip3?ext=png"
  },
  {
    "address": "xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms",
    "chainId": 101,
    "decimals": 6,
    "name": "Wrapped ALGO",
    "symbol": "xALGO",
    "logoURI": "https://arweave.net/zZizaipiM5GvJ5upulPUzg9VW9bui0VaMCY6k1QyHgs"
  },
  {
    "address": "Ca9LxRYdZ7jK4QAqjLo4iaYmiV8FNdngtSkzM69hzgDX",
    "chainId": 101,
    "decimals": 2,
    "name": "Okay Bears Floor Index",
    "symbol": "OKAYB",
    "logoURI": "https://bafkreidgfsdjx4nt4vctch73hcchb3pkiwic2onfw5yr4756adchogk5de.ipfs.dweb.link/"
  },
  {
    "address": "FYUkUybywqUUyrUwiAezbvhTp2DUgx1eg8tQNiKkXqJ9",
    "chainId": 101,
    "decimals": 9,
    "name": "Magic Crystal Coin",
    "symbol": "MC",
    "logoURI": "https://arweave.net/Nwami1xs2ciMI7mUcawKMkUTKf_UUrLjYvIqUSL1ShI"
  },
  {
    "address": "Boxch1343xWQWbahVBPhYHuYLXNHnWYHG6QbuqfNugQ1",
    "chainId": 101,
    "decimals": 9,
    "name": "Utility Token Boxch",
    "symbol": "BOXCH",
    "logoURI": "https://www.arweave.net/_CA-ISMIy-7nbG6Map53iFIuIbEfs8HVrvOFlcYO7rE?ext=png"
  },
  {
    "address": "CejQBkdRPN8Jyod2jVUYTfHwU9hPHvM3rD9prvQiffDU",
    "chainId": 101,
    "decimals": 9,
    "name": "TAP Coin",
    "symbol": "TAP",
    "logoURI": "https://arweave.net/gHPUUFpbtWac5AnYtV10nGXa3VBgu0PgBiA7gDHJkJE"
  },
  {
    "address": "F3tBHjJxZiefhsHYKdWs2TzsjxfEGKrLH5GSmMZMjSLC",
    "chainId": 101,
    "decimals": 9,
    "name": "KALISTEN",
    "symbol": "KST",
    "logoURI": "https://www.arweave.net/DM8NL2rgRJww1WsS2PdhMRhy5qbqRKDEzXNIL2nM0R0?ext=png"
  },
  {
    "address": "kNkT1RDnexWqYP3EYGyWv5ZtazB8CfgGAfJtv9AQ3kz",
    "chainId": 101,
    "decimals": 9,
    "name": "Kineko",
    "symbol": "KNK",
    "logoURI": "https://www.arweave.net/u7prAs3T9UHwykErAXDfX306yAxFU08PpgvN819K_so?ext=png"
  },
  {
    "address": "F9BqFoWRML4Red6YPiL3xJBP7u9g8f61AKJMEYDB3wBR",
    "chainId": 101,
    "decimals": 9,
    "name": "Athens",
    "symbol": "ATH",
    "logoURI": "https://arweave.net/GNYZdT1icjRPLbRoivdtSU9_GqBM7LF6khrpV9qCBtM"
  },
  {
    "address": "jDeFiS8sPefsHZ3293Pwbug38csVh3hDjWJQ9hYEQ1A",
    "chainId": 101,
    "decimals": 9,
    "name": "Jungle DeFi",
    "symbol": "JFI"
  },
  {
    "address": "BoNEpo724mHhqFs7hbQxXbM1VESYn5dbu5YNJhdy9E1",
    "chainId": 101,
    "decimals": 2,
    "name": "MARROW",
    "symbol": "MARROW",
    "logoURI": "https://www.arweave.net/Tdruk9JWtgrZptCsNFuWzH1898SYMPA0z-qpiEFCmuI?ext=png"
  },
  {
    "address": "9bQsNPppyuTaAcf92mWjQBuRLjSDpbTDdAC7pRQNviQ9",
    "chainId": 101,
    "decimals": 9,
    "name": "Lightning Speed Interaction",
    "symbol": "LSI",
    "logoURI": "https://pbs.twimg.com/profile_images/1554860226112798722/jNsKHWRs_400x400.jpg"
  },
  {
    "address": "B4oTdUf5ym7t1Xh9VHBHrYVRJcgCU93Wz1WCmcw7fmMP",
    "chainId": 101,
    "decimals": 2,
    "name": "PYROCHILL PYROCOIN",
    "symbol": "PCPC",
    "logoURI": "https://arweave.net/pOTFA1SSqLcZFerjTBpDwNf1ich9JjRBerMZpCEmoMg"
  },
  {
    "address": "CYndQCN5WJL2iF4V42mZ5u8CHPAHCLz7wCXYwPd5hJ37",
    "chainId": 101,
    "decimals": 9,
    "name": "Noahs Ark Token",
    "symbol": "NARK",
    "logoURI": "https://www.arweave.net/mlhV9PwlA2akghJCDewuT7o39H1my3_aZc1jgk9JvhU?ext=png"
  },
  {
    "address": "7Bp7AoSa68KgeScXEmfM6RFnGR1FDJZJsEeic8MFesDZ",
    "chainId": 101,
    "decimals": 9,
    "name": "Furry",
    "symbol": "FRR",
    "logoURI": "https://www.arweave.net/PLCy2sdD23B266CQpoKHIobg2wQoSJVFWYAQJ6iupf8?ext=png"
  },
  {
    "address": "EKLq86cHRwc8Spkcx2noPnfoVyQvcWSeud5JMJnTxNAD",
    "chainId": 101,
    "decimals": 2,
    "name": "ABC",
    "symbol": "ABC",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeie4f7n526mxpp2jgixpc4e7b7vpkae4sglks37lzj7tiwghxyvel4.ipfs.dweb.link/"
  },
  {
    "address": "AHT1yynTv45s3P3KrRfQCVMHckdHeMVA3fteEg34xt9y",
    "chainId": 101,
    "decimals": 9,
    "name": "Ave Hamilton Token",
    "symbol": "AHT",
    "logoURI": "https://arweave.net/7FbZmTSKMsSqtlfe8yH1n3QgdBc3RBBt0B6dsdprVBs"
  },
  {
    "address": "GqiReKpoAHQCnziNA1koxcttCkBD38W6Pyd45FoiBXQm",
    "chainId": 101,
    "decimals": 2,
    "name": "Primates Floor Index",
    "symbol": "PRIMATES",
    "logoURI": "https://bafybeifnx4apyushfc3i2tg5wx2xgudcfxgisd2sven2mhxixpghuo2jeu.ipfs.dweb.link/"
  },
  {
    "address": "FbUy1NubUtCfoif7TAr6wAtJVJFapYUVWxRGmUwvKNyS",
    "chainId": 101,
    "decimals": 2,
    "name": "𝝠ndre's Fleet Share",
    "symbol": "AFSeX",
    "logoURI": "https://arweave.net/l5d0WrtUcpUEqwknqjvxlo2QyGryLL3SDsRbigT9HA0"
  },
  {
    "address": "54KPee6wF8AzwJovtNgsT9uhoU3GiMWhFZUkJmU8yHVn",
    "chainId": 101,
    "decimals": 9,
    "name": "Infinity X",
    "symbol": "INFX",
    "logoURI": "https://www.arweave.net/FOlF-7-naudAeDbXlaWJEtCJxw-av7pzcQIBZ_TXMRk?ext=png"
  },
  {
    "address": "GtLBsmS6Z4FC9gmnCFS2ZzCKmb9vYL3kELnjVmxHurnh",
    "chainId": 101,
    "decimals": 2,
    "name": "ENG Token",
    "symbol": "ENG",
    "logoURI": "https://www.arweave.net/N_pDeYTYERWexWo2E3-mzZhqMtqdcqA_ZktPva4ImnY?ext=png"
  },
  {
    "address": "9sCKN7aYj9Fd5xyAANSosc7E6ZJbQSqfTvXSGzEDyhY3",
    "chainId": 101,
    "decimals": 9,
    "name": "SNAIL",
    "symbol": "SNAIL",
    "logoURI": "https://arweave.net/_b8mHe-fdSIhW-wZ6qu6R5uBBF-7QiCP4Euqg8SKkMc"
  },
  {
    "address": "6AarZpv8KwmPBxBEZdRmd3g1q2tUBaSgTNQ5e621qcZQ",
    "chainId": 101,
    "decimals": 2,
    "name": "Degenerate Ape Academy",
    "symbol": "DAPE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreie44hlb5xve225n6p2siebaevxiwha37aefyvs2ul2kx2akalnree.ipfs.dweb.link/"
  },
  {
    "address": "DxRbkqB2cEqa4rnXJwq4z3GuksgpL2U27PWBw8QBcNv2",
    "chainId": 101,
    "decimals": 2,
    "name": "Trippin' Ape Tribe Floor Index",
    "symbol": "TAPES",
    "logoURI": "https://i.imgur.com/iFgvQva.png"
  },
  {
    "address": "FLTHudk5B5zag7JmGXqrYrFfey6otevLQA6jm1UHHLEE",
    "chainId": 101,
    "decimals": 9,
    "name": "FLTH",
    "symbol": "FLTH",
    "logoURI": "https://www.arweave.net/6cZ-d9BnAsCqxkpzazYmKjLpUN2kE-jYnU3WDV4_lo0?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6Zkc5eJrbHMhvtHnUB5dwp7QpSJPSdeAYVNEkwadAM6Q",
    "chainId": 101,
    "decimals": 2,
    "name": "y00ts: mint t00bs",
    "symbol": "Y00T00BE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeigjqyvd6mrjpqficz3hygcpttmbrlcvkakartrsmqtdfds5nfyjga.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "isktkk27QaTpoRUhwwS5n9YUoYf8ydCuoTz5R2tFEKu",
    "chainId": 101,
    "decimals": 2,
    "name": "Rafkróna",
    "symbol": "ISKT",
    "logoURI": "https://rafmyntasjodur.github.io/iskt-metadata/logo.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "9tQhCmFtCh56qqf9szLQ8dNjYcd4TTv6MWPpw6MqLubu",
    "chainId": 101,
    "decimals": 6,
    "name": "Companion",
    "symbol": "CMPN",
    "logoURI": "https://www.arweave.net/B51NQ1mjb0ntBJ1TvkmYxHXcMbfam4wqIeJaICHBKQY?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "J8taaG2MEBQruGWE4Hhzkrahb1nMAeSZUYBs5cmzST9k",
    "chainId": 101,
    "decimals": 9,
    "name": "LUV",
    "symbol": "$LUV",
    "logoURI": "https://www.arweave.net/9swZaTu7Vjwb8apy-7eDVPZOtU2l1zArjnxxafbptKo?ext=jpg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "iRAYYHCNhEpbDiVt6QKK3Q57DMgw4p8zEKsVz3WfMjW",
    "chainId": 101,
    "decimals": 6,
    "name": "I-RAY-Q4",
    "symbol": "I-RAY-Q4",
    "logoURI": "https://www.arweave.net/843zJtjG748KWnJD54xAPUwqzYMY3tJTENoSI0-qrAY?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "jRAYPwLn4ZRGRSKu7GWu6B3Qx3Vj2JU88agUweEceyo",
    "chainId": 101,
    "decimals": 6,
    "name": "Jungle-Staked RAY",
    "symbol": "J-RAY",
    "logoURI": "https://www.arweave.net/9smtqPjMMkwuGDhUMtlkVXunWy8PYr_IjfTDjIWWqJE?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "SoLW9muuNQmEAoBws7CWfYQnXRXMVEG12cQhy6LE2Zf",
    "chainId": 101,
    "decimals": 9,
    "name": "Amulet Staked Sol (amtSol)",
    "symbol": "amtSol",
    "logoURI": "https://arweave.net/Ge3yd9dtBrUiMhowuk6Pv6-ie-vryJUFN6e6XrEugj8?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "jJF1SrhzpyqYawE9ruSVKrHjfxjaG5TUMFB5vnXUWVm",
    "chainId": 101,
    "decimals": 9,
    "name": "Jungle-Staked JFI",
    "symbol": "J-JFI",
    "logoURI": "https://www.arweave.net/aIBvYbeCHiVXWUAnfx81fyRMY-OYgQfJtuYhLu3fZnM?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "iJF17JCu78E51eAgwtCwvgULHh2ZqCeRrcFP7wgcc6w",
    "chainId": 101,
    "decimals": 9,
    "name": "I-JFI-Q4",
    "symbol": "I-JFI-Q4",
    "logoURI": "https://www.arweave.net/KBzPwLR-OUkR9O_bbGEfIc0L3U49m1qFjzOeLCSKZU0?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CLAsHPfTPpsXmzZzdexdEuKeRzZrWjZFRHQEPu2kSgWM",
    "chainId": 101,
    "decimals": 6,
    "name": "Clash",
    "symbol": "CLH",
    "logoURI": "https://arweave.net/H76ZU31oLcbbQ9D_uTqdz-MBMYMtGb2EwmtbE7UvWNk",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GENZexWRRGNS2Ko5rEgGG1snRXpaa3CDDGYnhTSmE3kd",
    "chainId": 101,
    "decimals": 9,
    "name": "GENZ Token",
    "symbol": "GENZ",
    "logoURI": "https://www.arweave.net/XVrUkXF5ZCC40IZNTqjs9PegUDYyqEqEd8LyfST-8Wk?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GXvC1SLNxBgr5U2B1VU9qfrpwwCXSUydWJtRBYUr9djz",
    "chainId": 101,
    "decimals": 2,
    "name": "Cardboard Citizens",
    "symbol": "CZ",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeic4fhsqfehej4z5gg53osxiktlbkdllpz2wta4gubdtez7c55m62u.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "C3bwM3HpEPzNsY5DBfZEcXywxyko6mpRAVFNXMzB1Mou",
    "chainId": 101,
    "decimals": 2,
    "name": "P-Gang",
    "symbol": "PGANG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/pgang_pfp_1663711276449.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "McpgFn2CxFYFq6JLiBxeC6viNfebLsfsf9Sv5wcwKvL",
    "chainId": 101,
    "decimals": 2,
    "name": "Duck Punkz Universe",
    "symbol": "DPUNKZ",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/duckpunkzuniverse_pfp_1650542071140.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "46cCLt1TcdmeMr8xmEshLapyENRQtfDh3npmbN91ohE6",
    "chainId": 101,
    "decimals": 2,
    "name": "Vandals",
    "symbol": "VANDAL",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://cdn.discordapp.com/attachments/975048153843777577/1005302647491928124/unknown.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "C5z8HSR19v3uWaD9UrPzsZ7kgWMnJxp55b54i5uuSNWy",
    "chainId": 101,
    "decimals": 2,
    "name": "The Atrivians",
    "symbol": "ATRIVIANS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/atrivians_pfp_1663012736300.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3tFcVwc25sXE2WALbfR9GgMoaH2kTkieHvVtSzu98UNo",
    "chainId": 101,
    "decimals": 2,
    "name": "Launchlabs",
    "symbol": "LAUNCHLAB",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachments/50b7a48b85ba698d2279ccaa6b2c6717/42f95bf4/qwe.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3g7DimMct3vjQjM69MeRMqmJ32DbTQ6Qg5wADhJWYaM4",
    "chainId": 101,
    "decimals": 9,
    "name": "Avalon",
    "symbol": "AVA",
    "logoURI": "https://www.arweave.net/1VTAYv1aFT5PB4-1frLCU3SdTSZNvoMmPDOXl34uQiE?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "Cd7S2zHJym8NsxSsYGikW2eBFiK3voneZ6iwWYZ7n6Uq",
    "chainId": 101,
    "decimals": 2,
    "name": "Simpl3r: Bounty Hunters",
    "symbol": "SIMPL3R",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeicwc2b6xpm7ixu7zz4iyzrjn3ippmg74jswkrgb4eanaorpxadwvm.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5UAh4DFZ33oZXnnR2dB5g8vNgh5GGAiYvYGZ59y8Wuis",
    "chainId": 101,
    "decimals": 9,
    "name": "Farm IO",
    "symbol": "FIO",
    "logoURI": "https://www.arweave.net/X8nGmctlIO_K6rtPwurNxBVRAKJDBptQ1LYJvjFWtU4?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CJKrnvgB5PugtXXMooJq8N31VRtzMowusi9n2SQJEJMh",
    "chainId": 101,
    "decimals": 2,
    "name": "KikiVerse",
    "symbol": "KIKI",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeib4lrvntpzwr6eyhzkn4llzp4tbjxngsj5ur7fenx5j6i7o7c6g5q.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DLQoZ14o43XkT5C57QHTtxATMmty3khY8LpPyiMcsufk",
    "chainId": 101,
    "decimals": 2,
    "name": "Froots",
    "symbol": "FROOTS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/frootsnft_pfp_1657757320025.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GXQBfrgAngEvVM2VmEDFmkWTa9xdhJ9o1wwn6Fas79bg",
    "chainId": 101,
    "decimals": 6,
    "name": "HUSKY SOLANA ",
    "symbol": "HUSKY",
    "logoURI": "https://www.arweave.net/7srcs1O_kvS6jFQ4TFnne9TJIWkZv1mw1jDmzj6mThk?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DRj1oGgqx3Ne3CxrdossS8LPyHtRHuExqu34QhEBsYhp",
    "chainId": 101,
    "decimals": 9,
    "name": "Sologe",
    "symbol": "SOGE",
    "logoURI": "https://arweave.net/aDK-CNt9vlL6NDp_6BrpwajL3CS19iC9qgcbi3kVjPE",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "tDcw216fFJcHrzQB179QVw5aSqVrCjJuASKHnc72wWJ",
    "chainId": 101,
    "decimals": 2,
    "name": "Great Goats",
    "symbol": "GGOATS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/b3bc1733c8b49865d70b79160acef873/86af3e32",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "9Z7cE5EoyHjFQAL2X8AMcR4N1zjWLpmYP3WUDoSXviDn",
    "chainId": 101,
    "decimals": 2,
    "name": "Yaku X",
    "symbol": "YAKUX",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeigaq3x3iz3v24qjnv26ql7c7fstll6reolqbxkpncpbpa23bovgva.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FY64DpoX5z8oMTYy7LnDwEVx16dbJbTWrLs8BBo78aJv",
    "chainId": 101,
    "decimals": 6,
    "name": "BRITARIA",
    "symbol": "DREAD",
    "logoURI": "https://arweave.net/XZSyt_CIUM8DzlEi8fKsJhMw2e8p3bG97OneCu19qRs",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GRhZvGB8TfwaMZjVGgBtsjFL4nQpW47eczWL4G6drPvC",
    "chainId": 101,
    "decimals": 2,
    "name": "ABC Degens",
    "symbol": "ABCDE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://back.blackmagic.gg/static/collections/abcd/2602.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CWBzupvyXN1Cf5rsBEHbzfTFvreLfUaJ77BMNLVJ739y",
    "chainId": 101,
    "decimals": 9,
    "name": "AtPay",
    "symbol": "ATPAY",
    "logoURI": "https://www.arweave.net/8QF11a_-KYYi__bFUuRWmLqWwk7pLTo9YKwJ1WhY0Lw?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4co51tnVXXj4nNGzfHRvaZ3JczVCU1BBnsezr6ZgwXJc",
    "chainId": 101,
    "decimals": 2,
    "name": "Bubblegoose Ballers Floor Index",
    "symbol": "GEESE",
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/91673f0315b610cc0d1db91d23ff329a/686f5df0",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FL9J1ke2bvAMvfFUX2eP7twQmVLaVfBEQbVFCTgqVZJm",
    "chainId": 101,
    "decimals": 2,
    "name": "Reptillian Renegade",
    "symbol": "LIZARD",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeiaodvhrw4xb36l2ja2a377anqd2ykqznzspb5rqdtokaocozona6y.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "9fcktgakGMz78RBNCYaX1QhnHnwXUtnU2n3MsorM6Zjk",
    "chainId": 101,
    "decimals": 2,
    "name": "Aiternate - Holotabs",
    "symbol": "AITABS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/965bf53867c3ee6c67fed25856f69da4/6ddeda09",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6gSmbxSfgJrqeGBYwuKGuSbShhbDLjcCLWqzivvPeG3i",
    "chainId": 101,
    "decimals": 2,
    "name": "Royal Crows",
    "symbol": "CROWS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/royal_crows_pfp_1654260294179.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "BXXB2LxRk2uwKQih5ysoVQ3oVdeNCfGuEHAvBZGtK1Bf",
    "chainId": 101,
    "decimals": 2,
    "name": "Cyberlinx",
    "symbol": "CYBERLINX",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/cyberlinxnft_pfp_1661792397527.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6AmNhPanjUR5g1fLv4aGaZKXC44ghfAVH3Ly59XE93s6",
    "chainId": 101,
    "decimals": 2,
    "name": "Thugbirdz",
    "symbol": "BIRDZ",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Fwww.arweave.net%2FnGvadeW0UuvIgzZUyNKaQ-c8400CDQn1FwNthOJ_KUw%3Fext%3Dpng",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CUhrGSrSn9Ub8xBobqb4QK6fB6we77dELV9mMQzaY3ne",
    "chainId": 101,
    "decimals": 2,
    "name": "Magnum AI",
    "symbol": "MAGNUM",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/magnum_ai_pfp_1650146367080.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3yPvfudQ88ECG9U5Sz2MPmd9C8tzPQG3Gjm1Ts69LWVV",
    "chainId": 101,
    "decimals": 2,
    "name": "Suteki",
    "symbol": "SUTEKI",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/bb5f40a7c3d9feb5c27e4810e83e1f74/1f770b7f",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "G6BWiMU2uPZmE2A3Ng3oG9qxc5JoZbFbgEpqZss93M4K",
    "chainId": 101,
    "decimals": 2,
    "name": "Solswipe",
    "symbol": "SWIPE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/solswipe_pfp_1660584726131.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2NjTBbskUU22JSTY9X73XQALVo4Z9mo9XtHERQuvAgf6",
    "chainId": 101,
    "decimals": 2,
    "name": "ANYBODIES",
    "symbol": "ANYBOD",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreiag6jkfjvv5tmwms4eai5wmtzpgr2dmul3baee7ejiwmb7ce4j2mu.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "AmVSRu3fCtV9FtQcyLfU8DKHXHmaBFSbnx8nahXycrMC",
    "chainId": 101,
    "decimals": 2,
    "name": "Kaizen Corps",
    "symbol": "KAIZEN",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeib6iwtqwtgwkqoyadqy7vs6c6cshyueu7vvta6ozv7npqz5s44mvq.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "MekkANZkBpzbGeTWsD1cRRuQxZMTFfBJyLrKywGQRss",
    "chainId": 101,
    "decimals": 9,
    "name": "MekkaCoin",
    "symbol": "MEK",
    "logoURI": "https://www.arweave.net/THaOPzFZ1YqBIKmewqNbckMo9CUSbmAFdL2LDZbyBco?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2LZA864dgLpKAjXhvQn54ZmgtaQR44sVqyVZJ8MsjqnC",
    "chainId": 101,
    "decimals": 9,
    "name": "MORTYBEAR",
    "symbol": "MTB",
    "logoURI": "https://bafkreielrghoxfxiyvsyd2jytnsbiw6bbub4pxzaticzpn5jpg3wlbprce.ipfs.nftstorage.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2tHamMTmuZGWKEfsvYXXvTFDtqkk8hYhLixHFZu9ghpL",
    "chainId": 101,
    "decimals": 2,
    "name": "Degentown : The Living",
    "symbol": "DEGENTOWN",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/408f2a34f3ee1f67856cca3a226d71ab/9679778e",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "HkSiK3rrAf4JHXN7Cf1j7GsLofX9jo8962xabT1qiff1",
    "chainId": 101,
    "decimals": 2,
    "name": "Satori",
    "symbol": "SATORI",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreieavkjl5rchszvydi7asd3e7jzms5cw6ggixjfto6euuxd3ido7ui.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "AaFf8fFi9uN69MTyiioi7AeyUnotcwZSG49yVo242H6J",
    "chainId": 101,
    "decimals": 2,
    "name": "Communi3",
    "symbol": "COMMUNI",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeifpz2j5oy4e7u2c5vrgnp4grts5sbpjsz2piylgngrmo7wk5xmxw4.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "kWCWVtHck9Kg6NQjAbYoUgbd4oc7b2gnHxZNbqo47Ze",
    "chainId": 101,
    "decimals": 2,
    "name": "Lunar NFT",
    "symbol": "LUNARNFT",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://arweave.net/veXP5zPtYc3VlTo9P4zbvGlADIw1cBKKhKKnlC-n0io",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X",
    "chainId": 101,
    "decimals": 9,
    "name": "Laine Stake Token",
    "symbol": "laineSOL",
    "logoURI": "https://shdw-drive.genesysgo.net/4DUkKJB966oMk8zq57KkAUxqg9HpuWtZ3BKobhmYph39/laineSOL.webp",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FwrfWVbDq2X7sb9tEFyVVExxFyMEDUP4Ta2PkYyeCGoZ",
    "chainId": 101,
    "decimals": 2,
    "name": "Cets on Creck Floor Index",
    "symbol": "CETS",
    "logoURI": "https://creator-hub-prod.s3.us-east-2.amazonaws.com/cats_on_crack_pfp_1644850873089.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "fY16V3CtLyHDZ71HCDot7MYXioFHD7RfPYChzZ65V2N",
    "chainId": 101,
    "decimals": 2,
    "name": "The Sports Club - MVP",
    "symbol": "SPORTMVP",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeihvlwqsqs6idaa5gusa7easbjbbb4s3qt6jxyeorushx7o5r4btki.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2FbCdry1bfjnKEoyLju3VAbK5b6Kzn4ug7G1aQnxPgCY",
    "chainId": 101,
    "decimals": 2,
    "name": "De Goddesses ",
    "symbol": "DGODESS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/degoddess_pfp_1664574730178.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "HjR8jtT9emnBxJnXUrjTA3MdQ2nkqMufcdVAHyBhiMoS",
    "chainId": 101,
    "decimals": 4,
    "name": "ALEROMISIAN YOHALAM",
    "symbol": "ALY",
    "logoURI": "https://arweave.net/_CzS5tSEz7wc-VXBdwdJjo8ZFDHxr3PgS1U2y3gIqzQ",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "7WVnj7Sna8u7bTarreuLmDye2DBtEcxhgd6hwi3c1vKa",
    "chainId": 101,
    "decimals": 2,
    "name": "Bag Gang",
    "symbol": "BAGGANG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://arweave.net/-VfWiWobp8GwL1kOOYmsVvBvcQzaRPnS24VyLlOo7W8",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4XtRbgB65Desc4KKizz9ZF4VpUohnzSjn1tTFj746PVL",
    "chainId": 101,
    "decimals": 2,
    "name": "Udder Chaos",
    "symbol": "UDDERS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/udder_chaos_pfp_1655229269923.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4NtKBFMRkEm2sTuQLBrbFC3LYJJQNyM7GgM9yJqFynuQ",
    "chainId": 101,
    "decimals": 2,
    "name": "Rakkudos",
    "symbol": "KUDOS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihq6fzbrm7l2uc6tc75mrso5ewowsyxzfehz2wqqjbbatytvw4a64.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "7N9gKoaocMAmr8JFNtVbj74i1oYsSKJAi5Y6sp4EaU1Z",
    "chainId": 101,
    "decimals": 2,
    "name": "Anthros",
    "symbol": "ANTHROS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreigg2pwr5qvkj57smcgsstjg7xocd5wiiqcgjacbgbah7kuxv2ws6i.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FaTM8V3A53D7W6TYs8a678tAXwkuATXtuC9nCnDmiPRX",
    "chainId": 101,
    "decimals": 2,
    "name": "Degenerate Trash Pandas",
    "symbol": "DTP",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihiyquvbkmwbrqfl62gdrwuqesc5lkwfqpsvcaimsrtdgi3ujy5ry.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3A6x5sPRjDBBFQBRR3AxKLsmpHLJHnQ29CcAKrADxpk7",
    "chainId": 101,
    "decimals": 6,
    "name": "Accrew DAO",
    "symbol": "ACRW",
    "logoURI": "https://arweave.net/t3Sm7m7iWMnldteS0mmiGBpJaJ8bjd9wJRBFHkR6SRw?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "F6ABFHuQRF6xiGU3wVLpeTqgKaxdFnTp2mXihUrKTNLD",
    "chainId": 101,
    "decimals": 2,
    "name": "Magic Ticket Floor Index",
    "symbol": "MGCTIX",
    "logoURI": "https://ipfs.io/ipfs/bafybeibimlad5fzgsvo2hzvtb6h2ayqi6kncr665mddylf6crvjpc2l7s4",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "BPG8QUwEsc5f1T74vgeR33ACwJpPxAYhDk1oA4vmEu77",
    "chainId": 101,
    "decimals": 2,
    "name": "Apin Labs",
    "symbol": "APINLABS",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FrG7YxkifmLq5oiULBMh4zBnNyoniNMWXatLfceJiFTX",
    "chainId": 101,
    "decimals": 2,
    "name": "Jikan Studios",
    "symbol": "JIKAN",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihav5rr3p3rphpex6gzieb6rf5qorgipg5z44w3qs7672cryq346u.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6wktcKujaFRKV9Sz455nHUNz34dEWht1gqKzR5KQ9Ljb",
    "chainId": 101,
    "decimals": 2,
    "name": "Soosh",
    "symbol": "SOOSH",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeig5il3cq3c7wojc323d7kiex3pyoyxcxtufh4m7pvixarvcjiiqga.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5KtxfEpgBXkqsGZZytzt3Z7cWhnSWyyWoYNGiGTectna",
    "chainId": 101,
    "decimals": 8,
    "name": "Mehracki",
    "symbol": "MKI",
    "logoURI": "https://arweave.net/Z7jj8v8_elNILJZV3SLILGxM7nvAFmZzDuQyyGe4-Js",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "58z1a1Ab7ZoG2hwMmvrtuiQn5C2QV6c67iHbdur99A5E",
    "chainId": 101,
    "decimals": 2,
    "name": "Flaskies",
    "symbol": "FLASKIES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/flaskiesnft_pfp_1665071853960.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "HEcYsfjuxDfGMWLLCvXTagUJbz8w4mXh8ZUswk7d6tcK",
    "chainId": 101,
    "decimals": 2,
    "name": "SoDead",
    "symbol": "SODEAD",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/sodead_pfp_1661196273906.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "H1k1UKBCdrarwFH48SGBmJquC5fErPp1WN1W6Adc9Q7Q",
    "chainId": 101,
    "decimals": 2,
    "name": "Kozy Koalas",
    "symbol": "KOZYK",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachments/4449a2f4ad8db444325ef09ae8335dcb/a963280e/500.jpg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3maRo4BaCsxo1YEBMFuKcAJgftqW8rv8pRe44A2xPJMR",
    "chainId": 101,
    "decimals": 2,
    "name": "Critters Cult",
    "symbol": "CRITCULT",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Farweave.net%2FHAJki4ur54JGDW6_qTtZokrRKwGIVhj7izQj6gKtvY4%3Fext%3Dpng",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "9ZWRmw7msvGnDJefmFc5MCAPpjhjGdkWfL9t5pJdbyio",
    "chainId": 101,
    "decimals": 2,
    "name": "Solful Creatures",
    "symbol": "SOLFUL",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihv3wiz3zenl6rqibzqx7ov3sb5ppuz5uftw47eglqyaixa3op3ai.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "7qLkK693xEWhTtCEvjEpYmwSGPjWwgu8kSXe36aFtLSg",
    "chainId": 101,
    "decimals": 2,
    "name": "Generous Robots DAO",
    "symbol": "GENROB",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreigj3rnxhdmgayys36daxchyf66xb6xrhzpjhnhp2ycbbgmr55nkqu.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "57Pu2vR7QzXQJUjyPmiFCTtqVsTi1wy6NReWSLah7Pic",
    "chainId": 101,
    "decimals": 2,
    "name": "TombStoned High Society",
    "symbol": "TSHS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/tombstoned_pfp_1645169267186.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "EGcridgp1rMKagGVyaa2UpQGhzo5zwxK8cuidHLB5kJN",
    "chainId": 101,
    "decimals": 2,
    "name": "da bois",
    "symbol": "BOIS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/lebois_pfp_1653219382299.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "D56ymJNSeNjzdsjT1gmpeW8a8KosH6nt8MWmJb9JCYLj",
    "chainId": 101,
    "decimals": 9,
    "name": "Guerra",
    "symbol": "GDOT",
    "logoURI": "https://www.arweave.net/Xi3T35WSwMhYdpLD_4vBfNdp3jKRzmhljpGMsdV3X4s?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "815WsMGTVcdKh7HeaTi5XLQfqXtu7tHMspAYcCH4dAwN",
    "chainId": 101,
    "decimals": 2,
    "name": "Alpha Pharaohs",
    "symbol": "APHAROAH",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/alpha_pharaohs_pfp_1655055534354.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DF8vhyo51Nu3XSKRAMmFPm2WFUkHhxwGVp3SoR77gAdz",
    "chainId": 101,
    "decimals": 2,
    "name": "Good Vibrations",
    "symbol": "GOODVIBE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://arweave.net/NYe5NlpoOItQsIU7LHVRwQPcDZ3JYUNbBf72Aq4JGTY",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FrGsi1hT9LX2nkxDxLX33YHoavovcjSi23PK8g4YpPCu",
    "chainId": 101,
    "decimals": 2,
    "name": "CosplayX",
    "symbol": "COSPLAYX",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeid23k7sgzmhleapfnq2bi2is7vsntg572qhu6scok6e3xr7wwx53a.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "dwnkQmmfLjkYZjTkpQk6wP6aeoBFCVNxQLtEkWeVGjC",
    "chainId": 101,
    "decimals": 2,
    "name": "Baby Ape Social Club",
    "symbol": "BASC",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/fa393956b6723bd9f8a92fbb294ce965/39caef8b",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6qj7pc1gtyziS11W5SQXbQesUuFUB48C5wCymd8PPvEy",
    "chainId": 101,
    "decimals": 2,
    "name": "The Stoned Frogs",
    "symbol": "STONEF",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreidssu7hdver4dtscwk3ny74l4k2uq7cluzcwznzja4ptlvdsdsyfa.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3CaVSKdi6myXtCSoqH1qwQHGLTeenYx8oCVKuyts1pey",
    "chainId": 101,
    "decimals": 2,
    "name": "Alder Mages",
    "symbol": "MAGES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/aldermages_pfp_1654539613984.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DdquHiRdVDUtioEHvJPN6m6g5KUMe5svSWKxocmsESH1",
    "chainId": 101,
    "decimals": 9,
    "name": "Shield Coin",
    "symbol": "SHLD",
    "logoURI": "https://www.arweave.net/SXqc0gy1FubjDzsezDokeSiEAXF2brRqsDVG_UDXFM0?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CKUUGK5dxNTLy4kX4PSTnHTDYzMQFmkH3K2CCkCZPqKa",
    "chainId": 101,
    "decimals": 9,
    "name": "Karda",
    "symbol": "KDA",
    "logoURI": "https://arweave.net/WTedCh0WBqgsiJCfX-2EW_3lC3iIg9Ump6_vPSExgks",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4fHNyVDysSVSAjAYi6UGXt3dcsp9sfKN4obe7iKWAh59",
    "chainId": 101,
    "decimals": 2,
    "name": "ChainMyth Floor Index",
    "symbol": "MYTH",
    "logoURI": "https://dl.airtable.com/.attachmentThumbnails/56226f8081528434a49be4781d5ac66d/ad61a280",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "BNTX5V5xeCmKB18HRMZmF7fFrhrs8LvD3KREfczdwBpr",
    "chainId": 101,
    "decimals": 9,
    "name": "Bounty-X",
    "symbol": "$BNTX",
    "logoURI": "https://www.arweave.net/HAVJ_s17gSxecBbtkVopLcVxAt_GuhnZzSotOMLFIwY?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6yXBz95PRgTxWL1dyU49f5yGXHNin8XeBHDhpSV55nTN",
    "chainId": 101,
    "decimals": 2,
    "name": "Wakuland",
    "symbol": "WAKUL",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreia5q6pacoxu3oyrhb7gumdpirwxjnjmbf7edzngbizccitn3j4nkq.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "KNG29Db1b92sJe8iJutc6BFen44WZoAH23DQi5UQZTL",
    "chainId": 101,
    "decimals": 9,
    "name": "DigiKong",
    "symbol": "$KONG",
    "logoURI": "https://arweave.net/2P9dkszRTK4nnjMWHTzLbh0Z-65hVFUS1UXUDjuh2bs",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4nKW1yHuxS4t6M8AnMZ9s1RQC8HUhsLmeQk3Zv7j8gew",
    "chainId": 101,
    "decimals": 2,
    "name": "Cyborg Apes",
    "symbol": "CYAPES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeidiysrigkc5nq5bdplj5blad2bnosf5lgb2yndjhje2ygqqxovj7q.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "71YpUdv723KFiqkQY6QNj2gKomLdphsUbNKQ2xns6V3o",
    "chainId": 101,
    "decimals": 2,
    "name": "Odes",
    "symbol": "ODES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/odes_pfp_1664218158492.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "8b6TitoVovJ5qkfs5z5GvMFthrukp5faEn8KY8MQ9YFm",
    "chainId": 101,
    "decimals": 2,
    "name": "Flamboyant Panthers",
    "symbol": "FLAMBO",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/flambopanthers_pfp_1662224842008.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6bv7myU4BPsZDaSoqzrgvtZZ7H3Nv3oJxeabktL7z1RR",
    "chainId": 101,
    "decimals": 9,
    "name": "NAVATAR",
    "symbol": "NAVI",
    "logoURI": "https://bafkreibnlmcfga4pqarrtrdvxueop5onbubnx736xffm3gxzhz62n56kxq.ipfs.nftstorage.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5rochbLAummS1BPvF8xRZ5G8Li6e3jo3fJzbFMnTgE6Q",
    "chainId": 101,
    "decimals": 2,
    "name": "Botborgs",
    "symbol": "BOTBORG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/0e1add28d570871e2d032f38a5e95ed0/31b14a29",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "RNCoMmGbjMKg6aJRfpoosnjuP7Xp2MLrYn1bvdr5usE",
    "chainId": 101,
    "decimals": 6,
    "name": "ResNet",
    "symbol": "RNC",
    "logoURI": "https://arweave.net/kGdYpxRWY-L8lCscaqvnj3iz3eV04SyLjyku8GcohZg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "HqFG17V7wNfEDV3k5K2AuY3rmM5n2np4rhbGV21hp4as",
    "chainId": 101,
    "decimals": 2,
    "name": "Just Ape",
    "symbol": "JAPE",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeicwsd4if6yxgunl4x4czy3kp2i7fzwppvbkaj4l3touqhjw4z2wfa.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GgdKUChwY6rv4N5DauRbhs61TFme5kqWXDYAZs6VTWr8",
    "chainId": 101,
    "decimals": 2,
    "name": "The Kings",
    "symbol": "KINGS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/theking_pfp_1663489846200.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CTkTLHiiza6a5GhJ5knJbDp9BWp7NebXYpFE3k6pt9TT",
    "chainId": 101,
    "decimals": 2,
    "name": "Psyker - Keycards",
    "symbol": "PSYKERK",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/6a38a87c7febd7bffd1a9ffde7991020/93e04d55",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "EpZwaTh536LDNsBnsS985SUri2xoNg4dE6ufiMgCvaZ2",
    "chainId": 101,
    "decimals": 2,
    "name": "Homeowners Association (Parcl)",
    "symbol": "PRCLHOA",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/3bac2a201fa493c7682039559e0a394f/4977d91a",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FR2xsxdi9uFeGdFWGyUdJVZCy1nkXp92nujiznk2kEiz",
    "chainId": 101,
    "decimals": 2,
    "name": "GGSG: Galactic Geckos",
    "symbol": "GGSG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://i.imgur.com/PfaeoXm.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DAWqvQZ2K7rkC2d3iwGfreVrLLTRqY9gSHEC6cKczdHe",
    "chainId": 101,
    "decimals": 2,
    "name": "Sorcies",
    "symbol": "SORCIES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://shdw-drive.genesysgo.net/9soWxtVjudZ5ySZuCx5FhjuYuToHUx4exQf8E6zoD9wh/0.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6kQc2ok7ANqyj4r77TcYgEDXHB4d4ZJb4KYuiveLwhRN",
    "chainId": 101,
    "decimals": 2,
    "name": "Degen Fat Cats",
    "symbol": "FATCATS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/degenfatcats_pfp_1657860808010.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FiCyXAxNmp7oroKBht7Hu4zpsnUkwnPLfwSiAHvobhsW",
    "chainId": 101,
    "decimals": 2,
    "name": "Cyber Frogs",
    "symbol": "CYBERFRG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Fwww.arweave.net%2FOHFIbHqpFpgERaUhApaCFCwclAP_KrBoD0MixurXTDk%3Fext%3Dpng",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3f7wfg9yHLtGKvy75MmqsVT1ueTFoqyySQbusrX1YAQ4",
    "chainId": 101,
    "decimals": 9,
    "name": "Pixel by Pixel",
    "symbol": "PbP",
    "logoURI": "https://www.arweave.net/oM5esNEOkJrw6rElkNeg8I_ayWnf_ScNC8P9cgqNsms?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "79HSB5Zd4feNc8xCwhhaCyJAwPuXrMKeJcbg2tKgDn8P",
    "chainId": 101,
    "decimals": 2,
    "name": "Rifters",
    "symbol": "RIFTERS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreienoqmgoktuanavekzevj6bfo4pqn352vqj6semiargi75g4fhenu.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5Y7KkN5h3aGK5BWgQd3VHuKYENxzdch2inkrxJUywkVy",
    "chainId": 101,
    "decimals": 2,
    "name": "DeGods",
    "symbol": "DEGODS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "Bzkc8h8jDrSZbWZXzuQS6om8RbgJRmxo99dYE7ShyWV4",
    "chainId": 101,
    "decimals": 2,
    "name": "UKIYO",
    "symbol": "UKIYO",
    "logoURI": "https://pbs.twimg.com/profile_images/1544356839701241857/-tuFVvmk_400x400.jpg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "B9UyBRhLFNEm4uHC418kjSdzUBCS6qAZMKvTm5kW92J6",
    "chainId": 101,
    "decimals": 2,
    "name": "Secret Skellies Society",
    "symbol": "SKELLIES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/secret_skellies_society_pfp_1663862048919.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "8r6HSxAfS2vQA7vtstHXrMKQL2Jmkb9bz7BWzPGm4Z57",
    "chainId": 101,
    "decimals": 2,
    "name": "Shremps",
    "symbol": "SHREMPS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/shremp_pfp_1661624912458.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4MsWmTdKbAXtwHgwFsm9MkcN6YhAWbn1dcCR4tUchCuA",
    "chainId": 101,
    "decimals": 2,
    "name": "Fearless Bulls Club",
    "symbol": "FBC",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachments/3ce24c8c8c76abb1a78024d91933da04/3739095a/vvvvv.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "EQQK5Pk2tXoxaJy29ghTSpT1D3p5mfaxYeVi83F1wzcy",
    "chainId": 101,
    "decimals": 2,
    "name": "Astrals",
    "symbol": "ASTRALS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/astrals_pfp_1650330464227.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "H9dChMX7kQnhftwcqa8K8TH5oKekfun9BQjQ9dLUfEf",
    "chainId": 101,
    "decimals": 2,
    "name": "Clever Arsens Nation",
    "symbol": "CAN",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Farweave.net%2FGdeE0fqGZJltsQ2kjgftFNaHirwSkd_F_XahmUaNnAU%3Fext%3Dpng",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FTuNqhptJCo4qDcDxj8kNNyAakGL24Z18Zxb4dnCeTCK",
    "chainId": 101,
    "decimals": 2,
    "name": "Trogg",
    "symbol": "TROGG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeibupbcdyvqopn2pzrxhlais7wzt4brc7tv7fcritq3ruo7gttd2ye.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FUTdgy9hb2E7WdgYUAiMx1f7cfxCa3SuQiNWBvz9n4Ja",
    "chainId": 101,
    "decimals": 2,
    "name": "Lotus Gang",
    "symbol": "LOTUS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/5183df07a5b80ad546e765748575bed2/b2fe7fd0",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "AAK4mFz2j6AZAv4Duqou9wq5VzVTqKkJcjCRa51ZrPZd",
    "chainId": 101,
    "decimals": 2,
    "name": "Owly",
    "symbol": "OWLY",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreiajore3mjd2j7y25pys2qtverox3f4age4jvfamir26x3i3qaeuqa.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3tbZLBjNeZcBmVQjJBiDC6qmsurNt6wxrF3xuFE1RHaU",
    "chainId": 101,
    "decimals": 2,
    "name": "Bet3",
    "symbol": "BET3",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/bet3_pfp_1662994493142.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "EWsGsEHKyKWg7grdaNUwS7D6w4WZnwfoTo4NoJhc3MnQ",
    "chainId": 101,
    "decimals": 2,
    "name": "Patches",
    "symbol": "PATCHES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/patches_pfp_1663333026331.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3RCVCywxSs8pDRU1hw8fo7xTUCpNuX86w8cKTM6fgWBY",
    "chainId": 101,
    "decimals": 2,
    "name": "Famous Fox Federation",
    "symbol": "FOXES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeiglipep6klutky4atw7jhf7lknpgzbfqlmqmamqh5s6lwih6uopma.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "25yPcyqSpSv8T2JWyoKKRiU622Sr7LoMk9S3FmuBFt8S",
    "chainId": 101,
    "decimals": 2,
    "name": "GMers",
    "symbol": "GMERS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/gmers_pfp_1662860639809.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4kVztsKSzMBPfFxM8iJoZvt2X7xZKah3pyjiYDNYFMf7",
    "chainId": 101,
    "decimals": 2,
    "name": "Datbois",
    "symbol": "DATBOIS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/datbois_pfp_1661886144569.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "6Rqtt2h8dS6pHPGzqrmGtyhjCk3zpk795QcEwXJLfeLn",
    "chainId": 101,
    "decimals": 2,
    "name": "Netrunner",
    "symbol": "RUNNER",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeidm5eagsdbikbqokdtcmm5b2jjqetcjxg7b3bsdyxft6rgdalm2nu.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4t5wBE1Urg4wCB4jRJ7fdW2XZ3ohrDNUZhmhmNpAuqRm",
    "chainId": 101,
    "decimals": 2,
    "name": "Vula Society",
    "symbol": "VULA",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/vulasociety_pfp_1664310044055.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5zqwZoo3TkHJzxf797pXRbHGV328J7xaAegWKWk17Efi",
    "chainId": 101,
    "decimals": 2,
    "name": "Monkey Baby Business",
    "symbol": "MBB",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dl.airtable.com/.attachmentThumbnails/bafb174c6d4fb01610fd1c9bf2998d9d/29772c78",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "9tyiqVfWAibsyxztEqFD5KTzyUu5rALzEHRfQB1QpPK5",
    "chainId": 101,
    "decimals": 9,
    "name": "Song",
    "symbol": "SONG",
    "logoURI": "https://www.arweave.net/3YeVgV6xHplTE5zpfC61YBSDOLRZOHoi20m4kQIpPWU?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FEELeKVxHtsHHvu1ARySjETxnJMKbLC6wHCaMD68ipiR",
    "chainId": 101,
    "decimals": 9,
    "name": "FEEL",
    "symbol": "FEEL",
    "logoURI": "https://api.feel.market/static/feel.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "CUSDvqAQLbt7fRofcmV2EXfPA2t36kzj7FjzdmqDiNQL",
    "chainId": 101,
    "decimals": 6,
    "name": "Coin98 Dollar",
    "symbol": "CUSD",
    "logoURI": "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/CUSDC98.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "4KbzSz2VF1LCvEaw8viq1335VgWzNjMd8rwQMsCkKHip",
    "chainId": 101,
    "decimals": 2,
    "name": "Helions",
    "symbol": "HELIONS",
    "logoURI": "https://img-cdn.magiceden.dev/plain/https://bafybeicwbrcbknxmk7hoyufpmq56fhyp3ri465cfchwrfseu6xdnnhulky.ipfs.nftstorage.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2eVHiVahkRV8d6MCBMQPjq6qZdMgT3ZqRUthwUhCBL1C",
    "chainId": 101,
    "decimals": 2,
    "name": "Midnight Panthers",
    "symbol": "MNP",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeigwgilz3e7zi7hpsk4hnjucsvkj4xtrkujpuqneu4si2tgxoir7dy.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "8Gdk7VxU97Jjbu45CpNPdjHygVqwxVG56cvjk3jHTXVH",
    "chainId": 101,
    "decimals": 6,
    "name": "Serum Surfers DAO",
    "symbol": "SSDAO",
    "logoURI": "https://www.arweave.net/JfIJSS5lZhnTDbCbGZoNpHoH6klG5vWzzGHo4xH69nw?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GD91R91Jjz6m7BfTQ3PeEyJvnWLSP3jTganJN45RNNQ9",
    "chainId": 101,
    "decimals": 9,
    "name": "Zhino",
    "symbol": "Zhino",
    "logoURI": "https://www.arweave.net/_2xFgjF17TBeVerO57-vw8h2ODYxy7vRlHZCvGFj-SQ?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "8rS9Z8CYBiKiya6SoCv3eJBukKjxNy2ExvY4shmT2juF",
    "chainId": 101,
    "decimals": 2,
    "name": "More Monkes",
    "symbol": "MMONKES",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dweb.link/ipfs/bafybeifi7btn7t7r2gbwakfso7ahqc4iwuwkbexfpsytgwtj7i4rigt6u4/26.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "92fJ7VF2G4CLjXXj2kPCoQ6bLzv4cL2dgtBM3b1j5rJp",
    "chainId": 101,
    "decimals": 2,
    "name": "Oak Paradise",
    "symbol": "OAKYP",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/oak_paradise_pfp_1661193184623.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FYNmEg12xqyuNrRn8A1cqkEapcUCh3M7ZARUN1yj1bEs",
    "chainId": 101,
    "decimals": 6,
    "name": "Corni",
    "symbol": "CORNI",
    "logoURI": "https://www.arweave.net/3wy5KOCchF28ECwiKdNsXAvzP0n_zjPV2RMZfaOdIxc?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "AKppFNL374Dekytm9sRBPh5WEaR1XxoH3BvZnxkpaM2J",
    "chainId": 101,
    "decimals": 2,
    "name": "Cyber Samuri",
    "symbol": "CSAMURI",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https%3A%2F%2Farweave.net%2FWPNXBZmqPuMXmv6KXz6jvtPYoZls30oUjL5SyhmuaQc%3Fext%3Dpng",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5fFUeBJnjPK18PLnF7KBWPu29BjEjLgQgvwhZ83Gkmdu",
    "chainId": 101,
    "decimals": 1,
    "name": "BabySamo.io",
    "symbol": "BABYSAMOIO",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "FTr3B8UsvkUvYbkzd7yoUxoAAEdvfKLiSr4Sttk8QHBP",
    "chainId": 101,
    "decimals": 2,
    "name": "Sentries",
    "symbol": "SENTRY",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/sentries_pfp_1660877491500.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "ZzzXrkbAxHvVJksyrrQBCFj2qu12976rx4if4SFEZdY",
    "chainId": 101,
    "decimals": 9,
    "name": "Snuggle Squad Zzzs",
    "symbol": "Zzz",
    "logoURI": "https://www.arweave.net/Pib8Fx__f-0WgsDbaqcaqpnu9wvYIGpCzFGj5m1dzd0?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "Ens4sStvd6C5suYWa36WjkyZrCZwQG5ecgwJJYK4ZWa3",
    "chainId": 101,
    "decimals": 2,
    "name": "Baby Boryoku Dragonz",
    "symbol": "BABYBOKU",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://i.imgur.com/43QRPkZ.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DiGmvTPHBzuADgBPrzt29simEuPKSYFMSmBZYdFdddyb",
    "chainId": 101,
    "decimals": 2,
    "name": "Da Bobos",
    "symbol": "DABOBOS",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/dabobos_pfp_1660663615245.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "41CvStKf2PPotnn6UV3eQiY7Hg1fssDTCfXjUK7pRD6g",
    "chainId": 101,
    "decimals": 2,
    "name": "Everlasting",
    "symbol": "EVERL",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dweb.link/ipfs/bafybeientcmaci6eduovqwx2pek6yncn5ko4stwzlgdxtktuqihel7gyom/85.png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "2uVQjmwUbVPWQ3d1ATsJvVoiMEo8jDH8o4TmmaYAf9Ea",
    "chainId": 101,
    "decimals": 9,
    "name": "The Geometric Goat Coin",
    "symbol": "TGG",
    "logoURI": "https://www.arweave.net/lO7m9vPtmy-v7iYRXMTzwdWAkIF300E7B4nCibfaeW8?ext=png",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "DM8YLBujra6arvKuZ23d4ukqLdzbiGuhyWM4dUZnTnFA",
    "chainId": 101,
    "decimals": 2,
    "name": "Piggy Sol Gang",
    "symbol": "PSG",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://cdn.piggygang.com/imgs/4a9e3480c4230ee0efb2a408fab74d91.jpg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "HTKYxe6RQ25KAu3H3tkqxhxnHpZ17BTaWd4dWiY5YCNQ",
    "chainId": 101,
    "decimals": 2,
    "name": "Hiraeth",
    "symbol": "HIRAETH",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/hiraeth_nft_pfp_1659946160779.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "GZzAhrEuVg4ohKcFRXH34TAb3NgU2wCEdpnF3LxKWegW",
    "chainId": 101,
    "decimals": 2,
    "name": "Dumbass Donkeys",
    "symbol": "DUMBDONK",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreifkyodj5gasv4og4v3mhcltclf73w25loyzfbfja6yzfrh6u6f4oe.ipfs.dweb.link/",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "5iLE3Z7mTN7gW2bysKZST7mqp6s7KvvPU33XrzpzpyZ1",
    "chainId": 101,
    "decimals": 2,
    "name": "Just Worms",
    "symbol": "JUSTW",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/just_worms_pfp_1662674818856.jpeg",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "3q8Eh9ne7zJbMhzrjvnbVMrnR4s89gWPCQ97K1bsRmNh",
    "chainId": 101,
    "decimals": 2,
    "name": "Degentown : The Resurrected",
    "symbol": "DGNTWNR",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeidoaeoldxea6yqumy2p2gyweixm4jpbdwtvrlz5x6w4jiyxpwv3da.ipfs.dweb.link/0.gif",
    "tags": [
      "unknown"
    ]
  },
  {
    "address": "xrsv3s1X93BM6oDekzrgCxMSACvGdFyZpBXsYeunVsr",
    "chainId": 101,
    "decimals": 2,
    "name": "Bonku Labs",
    "symbol": "BONKU",
    "logoURI": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://dweb.link/ipfs/bafybeid6m2d4yv54kuwe7ecnujsiyoclvvurnvra4ylgnokajm5prjruzi/6.png",
    "tags": [
      "unknown"
    ]
  }
]
for (var tok of arg) {
    if (!mints.includes(tok.address)) {
     mints.push(tok.address);
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
      `https://quote-api-v3-3-hops.fly.dev/v3/quote?outputMint=${outputMint}&inputMint=${inputMint}&amount=${amount}&slippage=99&swapMode=ExactIn`
    )
    .json();

const getTransaction = (route) => {
  return got
    .post("https://quote-api-v3-3-hops.fly.dev/v3/swap", {
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
var markets = [/*
  await SolendMarket.initialize(
    connection,

    "production" // optional environment argument
  ),
  await SolendMarket.initialize(
    connection,

    "production", // optional environment argument
    "Epa6Sy5rhxCxEdmYu6iKKoFjJamJUJw8myjxuhfX2YJi"
  ),*/
  await SolendMarket.initialize(
    connection,

    "production", // optional environment argument
    "F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1"
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
 configs = 
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
function toObject(obj) {
    return (JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}
for (var amarket of configs) {
  if (false){//!amarket.hidden){//} && !amarket.isPermissionless) {
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
      var USDC_MINT = reserve.config.liquidityToken.mint;
     // console.log(USDC_MINT)
      if (!mints.includes(USDC_MINT)){
     mints.push(USDC_MINT)
      }
      if ( true){//!baddies.includes(USDC_MINT+SOL_MINT) && !baddies.includes(SOL_MINT+USDC_MINT)) {
        //USDC_MINT != "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
        //has.includes(USDC_MINT) ){

        var dec = reserve.config.liquidityToken.decimals;
        let min = reserve.stats.flashLoanFeePercentage;
        let cba = -1;
        if (true
        ) {
          let dothethings = [];
          cba++;
          try {
                let tokenAccount;
                
               let initial =Math.floor(10 * (Math.random() * 10) * 10 ** dec)

            try {
              if (initial != 0 && !baddies.includes(USDC_MINT + SOL_MINT)) {
                let usdcToSol;
                let solToUsdc;
                try {
                    await sleep(1000)
                  usdcToSol = await getCoinQuote(
                    USDC_MINT,
                    SOL_MINT,
                    Math.floor(Math.floor(initial))
                  );
                  usdcToSol.data[0] = usdcToSol.data.find(
                    (res) => res.marketInfos.length <= 6
                  );
//                  console.log(usdcToSol.data[0])
                 // console.log(usdcToSol.data.length)
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
                    await sleep(1000)
                    solToUsdc = await getCoinQuote(
                      SOL_MINT,
                      USDC_MINT,
                      Math.floor(usdcToSol.data[0].outAmount)
                    );

                    solToUsdc.data[0] = solToUsdc.data.find(
                      (res) => res.marketInfos.length <= 6
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
                      let returns =
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
                      if (returns > 0.2)
                        console.log(
                          (
                            (initial / 10 ** dec)
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
                      if (returns > -0.1  && returns < 10000000) {
                        let goaccs = [];
                       
                        if (true) {
                          // when outAmount more than initial
                          if (!false) {
                            for (var i of usdcToSol.data){
                                for (var xi of solToUsdc.data){
                                    goaccs=  []
                            let index = USDC_MINT+","+SOL_MINT
                                                    for (var mi of i.marketInfos) {
index+=","+mi.id
                                                    }
                                                    for (var mi of xi.marketInfos) {
                                                        index+=","+mi.id
                                                    }


                            // get routes based on from Token amount 10 USDC -> ? PRISM
                            try {
                                var tanswers = JSON.parse(fs.readFileSync('./answers2.json').toString())

                              if (!Object.keys(tanswers).includes(index)) {
                                jares = [];
                                await sleep(1000)
                                await Promise.all(
                                  [i, xi].map(
                                    async (route) => {
                                      const {
                                        setupTransaction,
                                        swapTransaction,
                                        cleanupTransaction,
                                      } = await getTransaction(route);
await sleep(100)
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
                                                VersionedTransaction.deserialize(
                                                  Buffer.from(
                                                    serializedTransaction,
                                                    "base64"
                                                  )
                                                );
                                             //   console.log(transaction)
                                               // goaccs.push(...transaction.message.addressTableLookups)
                                              //  console.log(transaction)
                                              ///  const messageV0 = TransactionMessage.decompile(transaction.message)
                                              //  console.log(messageV0)
await sleep(1000)
                                              //  let hmmm = (transaction.message.compileToV0Message())
                                              for(var goacc of transaction.message.addressTableLookups){
                                            //   console.log(goacc.accountKey)
                                                
                                                goaccs.push(goacc.accountKey.toBase58())
                                               }
                                                 // instructions.push(...transaction.instructions)
                                         
                                              // perform the swap
                                              // Transaction might failed or dropped
                                            }
                                          )
                                      );
                                    }
                                  )
                                );  var tanswers = JSON.parse(fs.readFileSync('./answers2.json').toString())

                                tanswers[index] = goaccs 
                              }
                            
                              fs.writeFileSync("./answers2.json", JSON.stringify(tanswers))
                              if (false) {
                                jares = [];
                               var usdcToSol2 = await getCoinQuote(
                                  USDC_MINT,
                                  SOL_MINT,
                                  Math.floor(Math.floor(initial))
                                );
                                console.log(instructions.length)
                             var   solToUsdc2 = await getCoinQuote(
                                  SOL_MINT,
                                  USDC_MINT,
                                  Math.floor(usdcToSol.data[0].outAmount)
                                );
                                console.log(instructions.length)
                                console.log(usdcToSol2.data[0])
                                await Promise.all(
                                  

                                  [usdcToSol2.data[0], solToUsdc2.data[0]].map(
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
                                                VersionedTransaction.deserialize(
                                                  Buffer.from(
                                                    serializedTransaction,
                                                    "base64"
                                                  )
                                                );
                                                console.log(transaction)
                                               for(var goacc of transaction.message.addressTableLookups){
                                                let test = (

                                                  await connection.getAddressLookupTable(
                                                    goacc.accountKey
                                                  )
                                                )
                                                goaccs.push(test)
                                               }
                                              //  console.log(transaction)
                                              ///  const messageV0 = TransactionMessage.decompile(transaction.message)
                                              //  console.log(messageV0)

                                              //  let hmmm = (transaction.message.compileToV0Message())
                                                
                                            //      instructions.push(...transaction.instructions)
                                         
                                              // perform the swap
                                              // Transaction might failed or dropped
                                            }
                                          )
                                      );
                                    }
                                  )
                                );
                              }
                              let jjs = [];
                              /*
                             
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
                                  Math.floor(initial),
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
                              instructions.push(
                                createTransferInstruction(
                                  tokenAccount,
                                  tokenAccount,
                                  payer.publicKey,
                                  myshit
                                )
                              );

                              var blockhash = await connection
                                .getLatestBlockhash()
                                .then((res) => res.blockhash);

                              console.log(blockhash);
                              console.log(instructions.length);
console.log(instructions)
                              blockhash = await connection
                                .getLatestBlockhash()
                                .then((res) => res.blockhash);a
                              let messageV00;
                              console.log(instructions.length);

                              console.log(goaccs.length);
                              console.log(goaccs)
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
                                }).compileToV0Message(goaccst);
                                console.log(123);
                                const transaction = new VersionedTransaction(
                                  messageV00
                                );
                                // sign your transaction with the required `Signers`
                                console.log(123);

                                await transaction.sign([payer]); //, delegate])//, ...swapTransaction.preSigners, ...swapTransaction2.preSigners])
                                //let m = await skippy.sendTransaction(transaction)
                                //console.log(m);
                              } catch (err) {
                                console.log(err);
                              } */
                              
                            } catch (err) {
                              console.log(err);
                            }
                          }
                        
                        }
                    }
                }
            }
        }
    }catch(err){


    }            
}
              }
            }catch(err){

            }   
        } catch (err){

        }   
    }
}
    } catch(Err){}              
  }
  return;
}

while (true) {
  await PromisePool.withConcurrency(1)
    .for(markets)
    // @ts-ignore
    .process(async (market) => {
      myluts = JSON.parse(fs.readFileSync("./luts.json").toString());
      //await createWSolAccount(); xx

      market = markets[Math.floor(rando(0, 1, "float") * markets.length)];
      await market.loadReserves();
      market.refreshAll();

      await PromisePool.withConcurrency(4)
        .for(mints)
        // @ts-ignore
        .process(async (SOL_MINT) => {
          something(SOL_MINT, market, myluts);
        });
    });
}
