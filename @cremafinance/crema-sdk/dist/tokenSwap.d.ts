import type { Connection, Signer, TransactionSignature } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import type { Tick, TokenSwapAccount } from "./state";
export declare const INIT_KEY: PublicKey;
export interface PositionInfo {
    positionsKey: PublicKey;
    index: Decimal;
    positionId: PublicKey;
    lowerTick: number;
    upperTick: number;
    liquity: Decimal;
    feeGrowthInsideALast: Decimal;
    feeGrowthInsideBLast: Decimal;
    tokenAFee: Decimal;
    tokenBFee: Decimal;
}
/**
 * The token swap class
 */
export declare class TokenSwap {
    conn: Connection;
    programId: PublicKey;
    tokenSwapKey: PublicKey;
    payer: Signer | null;
    authority: PublicKey;
    isLoaded: boolean;
    currentTick: number;
    tokenSwapInfo: TokenSwapAccount;
    ticks: Tick[];
    positions: Map<string, PositionInfo>;
    positionsKeys: Map<PublicKey, number>;
    /**
     * The constructor of TokenSwap
     * @param conn The connection to use
     * @param programId The token swap program id
     * @param tokenSwapKey The token swap key
     * @param payer The default pays for the transaction
     */
    constructor(conn: Connection, programId: PublicKey, tokenSwapKey: PublicKey, payer: Signer | null);
    /**
     * Set the default payer
     * @returns
     */
    setDefaultPayer(payer: Signer): void;
    /**
     * Load the token swap info
     */
    load(): Promise<TokenSwap>;
    /**
     * Create a new token swap
     * @param conn The connection to use
     * @param programId The token swap program id
     * @param payer Pays for the transaction
     * @param tokenAMint The token A mint
     * @param tokenBMint The token B mint
     * @param manager The manager
     * @param fee The fee of token swap
     * @param managerFee The manager(protocol) fee of token swap
     * @param tickSpace The tick space
     * @param initializePrice The initilized price of token swap
     * @param payer The pays for the transaction
     */
    static createTokenSwap(conn: Connection, programId: PublicKey, tokenAMint: PublicKey, tokenBMint: PublicKey, manager: PublicKey, fee: Decimal, managerFee: Decimal, tickSpace: number, initializePrice: Decimal, payer: Signer, isDebug?: boolean): Promise<TokenSwap>;
    /**
     *
     * @param userTokenA The user address of token A
     * @param userTokenB The user address of token B
     * @param lowerTick The lower tick
     * @param upperTick The upper tick
     * @param liquity The liquity amount
     * @param maximumAmountA The maximum amount of Token A
     * @param maximumAmountB The maximum amount of Token B
     * @param userTransferAuthroity The pays for the transaction
     * @returns
     */
    mintPosition(userTokenA: PublicKey, userTokenB: PublicKey, lowerTick: number, upperTick: number, liquity: Decimal, maximumAmountA: Decimal, maximumAmountB: Decimal, userTransferAuthroity: Signer, payer?: Signer | null): Promise<TransactionSignature | null>;
    /**
     * Increase liquity on a exist position
     * @param positionId The position id (nft mint address)
     * @param userTokenA The user address of token A
     * @param userTokenB The user address of token B
     * @param lowerTick The lower tick
     * @param upperTick The upper tick
     * @param liquity The liquity amount
     * @param maximumAmountA The maximum of token A
     * @param maximumAmountB The maximum of token B
     * @returns
     */
    increaseLiquity(positionId: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, liquity: Decimal, maximumAmountA: Decimal, maximumAmountB: Decimal, payer?: Signer | null): Promise<TransactionSignature | null>;
    /**
     * Decrease liquity, after decrease if liquity amount is zero the position will be remove
     * @param positionId The position id (nft mint address)
     * @param userTokenA The user address of token A
     * @param userTokenB The user address of token B
     * @param liquity The liquity amount
     * @param minimumAmountA The minimum amount of token A want recv
     * @param minimumAmountB The minimum amount of token b want recv
     * @param userAuthroity The pays for the transaction
     * @returns
     */
    decreaseLiquity(positionId: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, liquity: Decimal, minimumAmountA: Decimal, minimumAmountB: Decimal, payer?: Signer | null): Promise<TransactionSignature | null>;
    /**
     *
     * @param userSource The token that user want swap out
     * @param userDestination The token that user want swap in
     * @param direct 0-A swap B, 1-B swap A
     * @param amountIn The amount in
     * @param minimumAmountOut The minimum amount out
     * @param userTransactionAuthority Account delegated to transfer user's tokens
     * @returns
     */
    swap(userSource: PublicKey, userDestination: PublicKey, direct: number, amountIn: Decimal, minimumAmountOut: Decimal, userTransferAuthority: Signer, payer?: Signer | null): Promise<TransactionSignature | null>;
    simulateSwap(amountIn: Decimal, direction: number, payer: Signer): Promise<void>;
    /**
     *
     * Collect fee from specified position
     * @param positionID The NFT token public key of position
     * @param userTokenA The user address of token A
     * @param userTokenB The user address of token B
     * @param userAuthroity The pays for the transaction
     * @returns
     */
    collect(positionId: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, payer?: Signer | null): Promise<TransactionSignature | null>;
    /**
     * Collect the manager fee
     * @param userTokenA The manager address of token A
     * @param userTokenB The manager address of token B
     * @param userAuthroity The pays for the transaction
     * @returns
     */
    managerCollect(userTokenA: PublicKey, userTokenB: PublicKey, payer?: Signer | null): Promise<TransactionSignature | null>;
    /**
     * Add a positions account for token swap
     * @param payer The pays for transaction
     * @returns
     */
    addPositionsAccount(payer?: Signer | null): Promise<TransactionSignature | null>;
    approve(userToken: PublicKey, tokenMint: PublicKey, amount: Decimal, authority: Signer, payer?: Signer | null): Promise<void>;
    /**
     * Get user's positions
     * @param owner The owner of position
     * @returns The positions list
     */
    getUserPositions(owner?: PublicKey | undefined): Promise<PositionInfo[] | null>;
    /**
     * Calculate the liquity and token A amount, when the token swap currentTick < upperTick
     * @param tickLower The lower tick
     * @param tickUpper the upper tick
     * @param desiredAmountA The desired token A amount
     * @returns
     */
    calculateLiquityByTokenA(tickLower: number, tickUpper: number, desiredAmountA: Decimal): {
        desiredAmountB: Decimal;
        liquity: Decimal;
    };
    /**
     * Calculate the liquity and token B amount, when the token swap currentTick < upperTick
     * @param tickLower The lower tick
     * @param tickUpper the upper tick
     * @param desiredAmountA The desired token B amount
     * @returns
     */
    calculateLiquityByTokenB(tickLower: number, tickUpper: number, desiredAmountB: Decimal): {
        desiredAmountA: Decimal;
        liquity: Decimal;
    };
    /**
     * Calculate the position current value
     * @param positionId The position id
     * @returns The amount of token A and token B
     */
    calculatePositionValue(positionId: PublicKey): {
        liquity: Decimal;
        amountA: Decimal;
        amountB: Decimal;
    };
    /**
     * prepare calculate collect amount of token A and B
     * @param positionId The position id
     * @returns the amount of token A and B
     */
    preCollect(positionId: PublicKey): {
        amountA: Decimal;
        amountB: Decimal;
    };
    /**
     * Prepare calculate A swap B
     * @param amountIn The amount input of token A
     * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
     */
    preSwapA(amountIn: Decimal): {
        amountOut: Decimal;
        amountUsed: Decimal;
        feeUsed: Decimal;
        afterLiquity: Decimal;
        impactA: Decimal;
        impactB: Decimal;
        transactionPriceA: Decimal;
        transactionPriceB: Decimal;
        afterPriceA: Decimal;
        afterPriceB: Decimal;
    };
    /**
     * Prepare calculate B swap A
     * @param amountIn The amount input of token B
     * @returns amountOut:The amount out of token A, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
     */
    preSwapB(amountIn: Decimal): {
        amountOut: Decimal;
        amountUsed: Decimal;
        feeUsed: Decimal;
        afterLiquity: Decimal;
        impactA: Decimal;
        impactB: Decimal;
        transactionPriceA: Decimal;
        transactionPriceB: Decimal;
        afterPriceA: Decimal;
        afterPriceB: Decimal;
    };
    /**
     * Get nearest tick by price
     * @param price The price
     * @returns The tick
     */
    getNearestTickByPrice(price: Decimal): number;
    getPositionInfo(positionId: PublicKey): PositionInfo | undefined;
    choosePosition(): PublicKey | null;
    log(): void;
}
