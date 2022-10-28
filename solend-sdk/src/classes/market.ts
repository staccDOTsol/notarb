// @ts-nocheck

import { Connection, PublicKey } from "@solana/web3.js";
import { SolendObligation } from "./obligation";
import { SolendReserve } from "./reserve";
import { parseObligation } from "../state/obligation";
import axios from "axios";
import { getProgramId } from "./constants";
import {
  RewardsDataType,
  ExternalRewardStatType,
  MarketConfigType,
} from "./shared";

type Config = Array<MarketConfigType>;

const API_ENDPOINT = "https://api.solend.fi";

export class SolendMarket {
  private connection: Connection;

  reserves: Array<SolendReserve>;

  rewardsData: RewardsDataType | null;

  config: MarketConfigType;

  programId: PublicKey;

  private constructor(
    connection: Connection,
    config: MarketConfigType,
    reserves: Array<SolendReserve>,
    programId: PublicKey
  ) {
    this.connection = connection;
    this.reserves = reserves;
    this.rewardsData = null;
    this.config = config;
    this.programId = programId;
  }

  static async initialize(
    connection: Connection,
    environment: "production" | "devnet" | "beta" = "production",
    marketAddress?: string
  ) {
    const config  = 
    [
        {
          "name": "main",
          "address": "F8dCQofhBuspm1sVsrfr8NReJvGn1JfiR9xARnUBQgo1",
          "authorityAddress": "HECVhRpddhzhkn6n1vdiqhQe1Y65yjXuwb45jKspD1VV",
          "reserves": [
            {
              "asset": "SOL",
              mint: "So11111111111111111111111111111111111111112",
              dec: 9,
              assetPriceUSD: 30,
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
              dec: 6,
              assetPriceUSD: 1,
              "mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
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
              "asset": "COPE",
              dec: 6,
              assetPriceUSD: 0.05,
              mint:"8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh",
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
      ]as Config;

    let marketConfig;
    if (marketAddress) {
      marketConfig =
        config.find((market) => market.address == marketAddress) ?? null;
      if (!marketConfig) {
        throw `market address not found: ${marketAddress}`;
      }
    } else {
      marketConfig = config.find((market) => market.isPrimary) ?? config[0];
    }

    const reserves = marketConfig.reserves.map(
      (res) => new SolendReserve(res, connection)
    );

    return new SolendMarket(
      connection,
      marketConfig,
      reserves,
      getProgramId(environment)
    );
  }

  async fetchObligationByWallet(publicKey: PublicKey) {
    const { config, reserves } = this;
    if (!config) {
      throw Error("Market must be initialized to call initialize.");
    }
    const obligationAddress = await PublicKey.createWithSeed(
      publicKey,
      config.address.slice(0, 32),
      this.programId
    );
    const rawObligationData = await this.connection.getAccountInfo(
      obligationAddress
    );

    if (!rawObligationData) {
      return null;
    }

    const parsedObligation = parseObligation(
      PublicKey.default,
      rawObligationData!
    );

    if (!parsedObligation) {
      throw Error("Could not parse obligation.");
    }

    if (!reserves.every((reserve) => reserve.stats)) {
      await this.loadReserves();
    }

    const obligationInfo = parsedObligation.info;

    return new SolendObligation(
      publicKey,
      obligationAddress,
      obligationInfo,
      reserves
    );
  }

  async loadAll() {
    const promises = [this.loadReserves(), this.loadRewards()];

    await Promise.all(promises);
  }

  private async loadExternalRewardData() {
    const data = (
      await axios.get(
        `${API_ENDPOINT}/liquidity-mining/external-reward-stats-v2?flat=true`
      )
    ).data as Promise<Array<ExternalRewardStatType>>;

    return data;
  }

  private async loadPriceData(symbols: Array<string>) {
    const data = (await (
      await axios.get(`${API_ENDPOINT}/v1/prices/?symbols=${symbols.join(",")}`)
    ).data) as {
      results: Array<{
        identifier: string;
        price: string;
        source: string;
      }>;
    };

    return data.results.reduce(
      (acc, price) => ({
        ...acc,
        [price.identifier]: Number(price.price),
      }),
      {} as { [key: string]: number }
    );
  }

  private getLatestRewardRate(
    rewardRates: Array<{
      beginningSlot: number;
      rewardRate: string;
      name?: string;
    }>,
    slot: number
  ) {
    return rewardRates
      .filter((rr) => slot >= rr.beginningSlot)
      .reduce((v1, v2) => (v1.beginningSlot > v2.beginningSlot ? v1 : v2), {
        beginningSlot: 0,
        rewardRate: "0",
      });
  }

  async loadRewards() {
    if (!this.config) {
      throw Error("Market must be initialized to call loadRewards.");
    }

    const promises = [
      this.loadExternalRewardData(),
      this.connection.getSlot("finalized"),
    ] as const;

    const [externalRewards, currentSlot] = await Promise.all(promises);

    const querySymbols = [
      ...new Set(externalRewards.map((reward) => reward.rewardSymbol)),
    ];

    const priceData = await this.loadPriceData(querySymbols.concat("SLND"));

    this.rewardsData = this.reserves.reduce((acc, reserve) => {
      const supply = [
        ...externalRewards
          .filter(
            (externalReward) =>
              externalReward.reserveID === reserve.config.address &&
              externalReward.side === "supply"
          )
          .map((externalReward) => ({
            rewardRate: this.getLatestRewardRate(
              externalReward.rewardRates,
              currentSlot
            ).rewardRate,
            rewardMint: externalReward.rewardMint,
            rewardSymbol: externalReward.rewardSymbol,
            price: priceData[externalReward.rewardSymbol],
          })),
      ].filter(Boolean);

      const borrow = [
        ...externalRewards
          .filter(
            (externalReward) =>
              externalReward.reserveID === reserve.config.address &&
              externalReward.side === "borrow"
          )
          .map((externalReward) => ({
            rewardRate: this.getLatestRewardRate(
              externalReward.rewardRates,
              currentSlot
            ).rewardRate,
            rewardMint: externalReward.rewardMint,
            rewardSymbol: externalReward.rewardSymbol,
            price: priceData[externalReward.rewardSymbol],
          })),
      ].filter(Boolean);

      return {
        ...acc,
        [reserve.config.liquidityToken.mint]: {
          supply,
          borrow,
        },
      };
    }, {});

    const refreshReserves = this.reserves.map((reserve) => {
      return reserve.load(this.rewardsData ?? undefined);
    });

    await Promise.all(refreshReserves);
  }

  async loadReserves() {
    const addresses = this.reserves.map(
      (reserve) => new PublicKey(reserve.config.address)
    );
    const reserveAccounts = await this.connection.getMultipleAccountsInfo(
      addresses,
      "processed"
    );

    const loadReserves = this.reserves.map((reserve, index) => {
      reserve.setBuffer(reserveAccounts[index]);
      return reserve.load();
    });

    await Promise.all(loadReserves);
  }

  async refreshAll() {
    const promises = [
      this.reserves.every((reserve) => reserve.stats)
        ? this.loadReserves()
        : null,
      this.rewardsData ? this.loadRewards() : null,
    ].filter((x) => x);

    await Promise.all(promises);
  }
}
