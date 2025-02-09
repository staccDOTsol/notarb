/// <reference types="node" />
import type { TokenInfo } from "@saberhq/token-utils";
import { Token, TokenAmount } from "@saberhq/token-utils";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { default as JSBI } from "jsbi";
import { StableSwap } from "../stable-swap.js";
import type { Fees } from "../state/fees.js";
import type { StableSwapState } from "../state/index.js";
/**
 * Reserve information.
 */
export interface IReserve {
    /**
     * Swap account holding the reserve tokens
     */
    reserveAccount: PublicKey;
    /**
     * Destination account of admin fees of this reserve token
     */
    adminFeeAccount: PublicKey;
    /**
     * Amount of tokens in the reserve
     */
    amount: TokenAmount;
}
/**
 * Static definition of an exchange.
 */
export interface IExchange {
    programID: PublicKey;
    swapAccount: PublicKey;
    lpToken: Token;
    tokens: readonly [Token, Token];
}
/**
 * Info loaded from the exchange. This is used by the calculator.
 */
export interface IExchangeInfo {
    ampFactor: JSBI;
    fees: Fees;
    lpTotalSupply: TokenAmount;
    reserves: readonly [IReserve, IReserve];
}
/**
 * Calculates the amp factor of a swap.
 * @param state
 * @param now
 * @returns
 */
export declare const calculateAmpFactor: (state: Pick<StableSwapState, "initialAmpFactor" | "targetAmpFactor" | "startRampTimestamp" | "stopRampTimestamp">, now?: number) => JSBI;
/**
 * Creates an IExchangeInfo from parameters.
 * @returns
 */
export declare const makeExchangeInfo: ({ exchange, swap, accounts, }: {
    exchange: IExchange;
    swap: StableSwap;
    accounts: {
        reserveA: Buffer;
        reserveB: Buffer;
        poolMint?: Buffer;
    };
}) => IExchangeInfo;
/**
 * Loads exchange info.
 * @param exchange
 * @param swap
 * @returns
 */
export declare const loadExchangeInfo: (connection: Connection, exchange: IExchange, swap: StableSwap) => Promise<IExchangeInfo>;
/**
 * Simplified representation of an IExchange. Useful for configuration.
 */
export interface ExchangeBasic {
    /**
     * Swap account.
     */
    swapAccount: PublicKey;
    /**
     * Mint of the LP token.
     */
    lpToken: PublicKey;
    /**
     * Info of token A.
     */
    tokenA: TokenInfo;
    /**
     * Info of token B.
     */
    tokenB: TokenInfo;
}
/**
 * Creates an IExchange from an ExchangeBasic.
 * @param tokenMap
 * @param param1
 * @returns
 */
export declare const makeExchange: ({ swapAccount, lpToken, tokenA, tokenB, }: ExchangeBasic) => IExchange | null;
/**
 * Get exchange info from just the swap account.
 * @param connection
 * @param swapAccount
 * @param tokenA
 * @param tokenB
 * @returns
 */
export declare const loadExchangeInfoFromSwapAccount: (connection: Connection, swapAccount: PublicKey, tokenA?: Token | undefined, tokenB?: Token | undefined) => Promise<IExchangeInfo | null>;
//# sourceMappingURL=exchange.d.ts.map