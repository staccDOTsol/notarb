import { Program } from "@project-serum/anchor";
import { Middleware } from "@project-serum/serum";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { PsyAmerican } from "../psyAmericanTypes";
/**
 * Create a MarketProxy for the Psy American V 1.1 program
 *
 * @param program - Anchor Psy American program
 * @param optionMarketKey - The OptionMarket address
 * @param marketAuthorityBump - The marketAuthority bump seed
 * @param dexProgramId - The Serum DEX program id
 * @param marketKey - The Serum market address
 * @returns
 */
export declare const marketLoader: (program: Program<PsyAmerican>, optionMarketKey: PublicKey, marketAuthorityBump: number, dexProgramId: PublicKey, marketKey: PublicKey, opts?: {
    enableLogger: boolean;
}) => Promise<import("@project-serum/serum").MarketProxy>;
export declare class Validation implements Middleware {
    optionMarketKey: PublicKey;
    marketAuthorityBump: number;
    constructor(optionMarketKey: PublicKey, marketAuthorityBump: number);
    initOpenOrders(ix: TransactionInstruction): void;
    newOrderV3(ix: TransactionInstruction): void;
    cancelOrderV2(ix: TransactionInstruction): void;
    cancelOrderByClientIdV2(ix: TransactionInstruction): void;
    settleFunds(ix: TransactionInstruction): void;
    closeOpenOrders(ix: TransactionInstruction): void;
    prune(ix: TransactionInstruction): void;
    consumeEvents(ix: TransactionInstruction): void;
    consumeEventsPermissioned(ix: TransactionInstruction): void;
}
