/// <reference types="node" />
import { AccountInfo, BlockhashWithExpiryBlockHeight, Commitment, Connection, Keypair, PublicKey, Transaction, TransactionConfirmationStatus, TransactionSignature } from '@solana/web3.js';
import BN from 'bn.js';
import { AssetType, MangoCache } from './layout';
import MangoAccount from './MangoAccount';
import PerpMarket from './PerpMarket';
import RootBank from './RootBank';
import { Market } from '@project-serum/serum';
import { I80F48 } from './utils/fixednum';
import { Order } from '@project-serum/serum/lib/market';
import { PerpOrderType, Payer } from './utils/types';
import { PerpOrder } from './book';
import MangoGroup from './MangoGroup';
import { ReferrerIdRecord } from './layout';
/**
 * Get the current epoch timestamp in seconds with microsecond precision
 */
export declare const getUnixTs: () => number;
declare type AccountWithPnl = {
    publicKey: PublicKey;
    pnl: I80F48;
};
/**
 * A class for interacting with the Mango V3 Program
 *
 * @param connection A solana web.js Connection object
 * @param programId The PublicKey of the Mango V3 Program
 * @param opts An object used to configure the MangoClient. Accepts a postSendTxCallback, and prioritizationFee. The prioritizationFee is a number measured in micro lamports that is charged per compute unit.
 */
export declare class MangoClient {
    connection: Connection;
    sendConnection?: Connection;
    programId: PublicKey;
    lastSlot: number;
    lastValidBlockHeight: number;
    timeout: number | null;
    blockhashCommitment: Commitment;
    postSendTxCallback?: ({ txid }: {
        txid: string;
    }) => void;
    prioritizationFee: number;
    constructor(connection: Connection, programId: PublicKey, opts?: {
        postSendTxCallback?: ({ txid }: {
            txid: string;
        }) => void;
        maxStoredBlockhashes?: number;
        blockhashCommitment?: Commitment;
        timeout?: number;
        sendConnection?: Connection;
        prioritizationFee?: number;
    });
    sendTransactions(transactions: Transaction[], payer: Payer, additionalSigners: Keypair[], timeout?: number | null, confirmLevel?: TransactionConfirmationStatus): Promise<TransactionSignature[]>;
    getCurrentBlockhash(): Promise<BlockhashWithExpiryBlockHeight>;
    signTransaction({ transaction, payer, signers, currentBlockhash, }: {
        transaction: Transaction;
        payer: any;
        signers: Array<Keypair>;
        currentBlockhash?: BlockhashWithExpiryBlockHeight;
    }): Promise<any>;
    signTransactions({ transactionsAndSigners, payer, currentBlockhash, }: {
        transactionsAndSigners: {
            transaction: Transaction;
            signers?: Array<Keypair>;
        }[];
        payer: Payer;
        currentBlockhash?: BlockhashWithExpiryBlockHeight;
    }): Promise<Transaction[] | undefined>;
    /**
     * Send a transaction using the Solana Web3.js connection on the mango client
     *
     * @param transaction
     * @param payer
     * @param additionalSigners
     * @param timeout Retries sending the transaction and trying to confirm it until the given timeout. Passing null will disable the transaction confirmation check and always return success.
     */
    sendTransaction(transaction: Transaction, payer: Payer, additionalSigners: Keypair[], timeout?: number | null, confirmLevel?: TransactionConfirmationStatus): Promise<TransactionSignature>;
    sendSignedTransaction({ signedTransaction, timeout, confirmLevel, signedAtBlock, }: {
        signedTransaction: Transaction;
        timeout?: number | null;
        confirmLevel?: TransactionConfirmationStatus;
        signedAtBlock?: BlockhashWithExpiryBlockHeight;
    }): Promise<TransactionSignature>;
    awaitTransactionSignatureConfirmation(txid: TransactionSignature, timeout: number, confirmLevel: TransactionConfirmationStatus, signedAtBlock?: BlockhashWithExpiryBlockHeight): Promise<unknown>;
    /**
     * Create a new Mango group
     */
    initMangoGroup(quoteMint: PublicKey, msrmMint: PublicKey, dexProgram: PublicKey, feesVault: PublicKey, // owned by Mango DAO token governance
    validInterval: number, quoteOptimalUtil: number, quoteOptimalRate: number, quoteMaxRate: number, payer: Payer): Promise<PublicKey | undefined>;
    /**
     * Retrieve information about a Mango Group
     */
    getMangoGroup(mangoGroup: PublicKey): Promise<MangoGroup>;
    /**
     * DEPRECATED - Create a new Mango Account on a given group
     */
    initMangoAccount(mangoGroup: MangoGroup, owner: Payer): Promise<PublicKey | undefined>;
    /**
     * Create a new Mango Account (PDA) on a given group
     */
    createMangoAccount(mangoGroup: MangoGroup, owner: Payer, accountNum: number, payerPk?: PublicKey): Promise<PublicKey | undefined>;
    /**
     * Upgrade a Mango Account from V0 (not deletable) to V1 (deletable)
     */
    upgradeMangoAccountV0V1(mangoGroup: MangoGroup, owner: Payer, accountNum: number): Promise<PublicKey | undefined>;
    /**
     * Retrieve information about a Mango Account
     */
    getMangoAccount(mangoAccountPk: PublicKey, dexProgramId: PublicKey): Promise<MangoAccount>;
    /**
     * Create a new Mango Account and deposit some tokens in a single transaction
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     * @param info An optional UI name for the account
     */
    initMangoAccountAndDeposit(mangoGroup: MangoGroup, owner: Payer, rootBank: PublicKey, nodeBank: PublicKey, vault: PublicKey, tokenAcc: PublicKey, quantity: number, info?: string): Promise<string | undefined>;
    /**
     * Create a new Mango Account (PDA) and deposit some tokens in a single transaction
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     * @param info An optional UI name for the account
     */
    createMangoAccountAndDeposit(mangoGroup: MangoGroup, owner: Payer, rootBank: PublicKey, nodeBank: PublicKey, vault: PublicKey, tokenAcc: PublicKey, quantity: number, accountNum: number, info?: string, referrerPk?: PublicKey, payerPk?: PublicKey): Promise<[string, TransactionSignature] | undefined>;
    /**
     * Deposit tokens in a Mango Account
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     */
    deposit(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, rootBank: PublicKey, nodeBank: PublicKey, vault: PublicKey, tokenAcc: PublicKey, quantity: number): Promise<TransactionSignature | undefined>;
    /**
     * Withdraw tokens from a Mango Account
     *
     * @param rootBank The RootBank for the withdrawn currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param allowBorrow Whether to borrow tokens if there are not enough deposits for the withdrawal
     */
    withdraw(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, rootBank: PublicKey, nodeBank: PublicKey, vault: PublicKey, quantity: number, allowBorrow: boolean): Promise<TransactionSignature | undefined>;
    /**
     * Withdraw tokens from a Mango Account, only passing open orders accounts in the margin basket
     *
     * @param rootBank The RootBank for the withdrawn currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param allowBorrow Whether to borrow tokens if there are not enough deposits for the withdrawal
     */
    withdraw2(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, rootBank: PublicKey, nodeBank: PublicKey, vault: PublicKey, quantity: number, allowBorrow: boolean): Promise<TransactionSignature | undefined>;
    withdrawAll(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer): Promise<void>;
    /**
     * Called by the Keeper to cache interest rates from the RootBanks
     */
    cacheRootBanks(mangoGroup: PublicKey, mangoCache: PublicKey, rootBanks: PublicKey[], payer: Payer): Promise<TransactionSignature>;
    /**
     * Called by the Keeper to cache prices from the Oracles
     */
    cachePrices(mangoGroup: PublicKey, mangoCache: PublicKey, oracles: PublicKey[], payer: Payer): Promise<TransactionSignature>;
    /**
     * Called by the Keeper to cache perp market funding
     */
    cachePerpMarkets(mangoGroup: PublicKey, mangoCache: PublicKey, perpMarkets: PublicKey[], payer: Keypair): Promise<TransactionSignature>;
    /**
     * Called by the Keeper to update interest rates on the RootBanks
     */
    updateRootBank(mangoGroup: MangoGroup, rootBank: PublicKey, nodeBanks: PublicKey[], payer: Payer): Promise<TransactionSignature>;
    /**
     * Called by the Keeper to process events on the Perp order book
     */
    consumeEvents(mangoGroup: MangoGroup, perpMarket: PerpMarket, mangoAccounts: PublicKey[], payer: Keypair, limit: BN): Promise<TransactionSignature>;
    /**
     * Called by the Keeper to update funding on the perp markets
     */
    updateFunding(mangoGroup: PublicKey, mangoCache: PublicKey, perpMarket: PublicKey, bids: PublicKey, asks: PublicKey, payer: Keypair): Promise<TransactionSignature>;
    /**
     * Retrieve information about a perp market
     */
    getPerpMarket(perpMarketPk: PublicKey, baseDecimal: number, quoteDecimal: number): Promise<PerpMarket>;
    /**
     * Place an order on a perp market
     *
     * @param clientOrderId An optional id that can be used to correlate events related to your order
     * @param bookSideInfo Account info for asks if side === bid, bids if side === ask. If this is given, crank instruction is added
     */
    placePerpOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: PublicKey, // TODO - remove; already in MangoGroup
    perpMarket: PerpMarket, owner: Payer, side: 'buy' | 'sell', price: number, quantity: number, orderType?: PerpOrderType, clientOrderId?: number, bookSideInfo?: AccountInfo<Buffer>, reduceOnly?: boolean, referrerMangoAccountPk?: PublicKey): Promise<TransactionSignature | undefined>;
    /**
     * Place an order on a perp market
     *
     * @param clientOrderId An optional id that can be used to correlate events related to your order
     * @param bookSideInfo Account info for asks if side === bid, bids if side === ask. If this is given, crank instruction is added
     * @param expiryTimestamp Absolute: 0 for never expire, othereise future expiry timestamp in seconds. Relative: expiry offset in seconds
     * @param expiryType Since there is an unknown delay from sending a transaction to the transaction being processed, Absolute expiry usually preferred.
     */
    placePerpOrder2(mangoGroup: MangoGroup, mangoAccount: MangoAccount, perpMarket: PerpMarket, owner: Payer, side: 'buy' | 'sell', price: number, quantity: number, options?: {
        maxQuoteQuantity?: number;
        limit?: number;
        orderType?: PerpOrderType;
        clientOrderId?: number;
        bookSideInfo?: AccountInfo<Buffer>;
        reduceOnly?: boolean;
        referrerMangoAccountPk?: PublicKey;
        expiryTimestamp?: number;
        expiryType?: 'absolute' | 'relative';
    }): Promise<TransactionSignature | undefined>;
    /**
     * Cancel an order on a perp market
     *
     * @param invalidIdOk Don't throw error if order is invalid
     */
    cancelPerpOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, perpMarket: PerpMarket, order: PerpOrder, invalidIdOk?: boolean): Promise<TransactionSignature | undefined>;
    /**
     * Cancel all perp orders across all markets
     */
    cancelAllPerpOrders(group: MangoGroup, perpMarkets: PerpMarket[], mangoAccount: MangoAccount, owner: Payer, ownerIsSigner?: boolean): Promise<TransactionSignature[] | undefined>;
    /**
     * Add a new oracle to a group
     */
    addOracle(mangoGroup: MangoGroup, oracle: PublicKey, admin: Keypair): Promise<TransactionSignature>;
    /**
     * Set the price of a 'stub' type oracle
     */
    setOracle(mangoGroup: MangoGroup, oracle: PublicKey, admin: Keypair, price: I80F48): Promise<TransactionSignature>;
    addSpotMarket(mangoGroup: MangoGroup, oracle: PublicKey, spotMarket: PublicKey, mint: PublicKey, admin: Keypair, maintLeverage: number, initLeverage: number, liquidationFee: number, optimalUtil: number, optimalRate: number, maxRate: number): Promise<TransactionSignature>;
    /**
     * Make sure mangoAccount has recent and valid inMarginBasket and spotOpenOrders
     */
    placeSpotOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: PublicKey, spotMarket: Market, owner: Payer, side: 'buy' | 'sell', price: number, size: number, orderType?: 'limit' | 'ioc' | 'postOnly', clientId?: BN): Promise<TransactionSignature | undefined>;
    /**
     * Make sure mangoAccount has recent and valid inMarginBasket and spotOpenOrders
     */
    placeSpotOrder2(mangoGroup: MangoGroup, mangoAccount: MangoAccount, spotMarket: Market, owner: Payer, side: 'buy' | 'sell', price: number, size: number, orderType?: 'limit' | 'ioc' | 'postOnly', clientOrderId?: BN, useMsrmVault?: boolean | undefined): Promise<TransactionSignature[] | undefined>;
    cancelSpotOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, spotMarket: Market, order: Order): Promise<TransactionSignature | undefined>;
    settleFunds(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, spotMarket: Market): Promise<TransactionSignature | undefined>;
    /**
     * Assumes spotMarkets contains all Markets in MangoGroup in order
     */
    settleAll(mangoGroup: MangoGroup, mangoAccount: MangoAccount, spotMarkets: Market[], owner: Payer): Promise<TransactionSignature[] | undefined>;
    fetchTopPnlAccountsFromRPC(mangoGroup: MangoGroup, mangoCache: MangoCache, perpMarket: PerpMarket, price: I80F48, // should be the MangoCache price
    sign: number, mangoAccounts?: MangoAccount[]): Promise<AccountWithPnl[]>;
    fetchTopPnlAccountsFromDB(mangoGroup: MangoGroup, perpMarket: PerpMarket, sign: number): Promise<AccountWithPnl[]>;
    /**
     * Automatically fetch MangoAccounts for this PerpMarket
     * Pick enough MangoAccounts that have opposite sign and send them in to get settled
     */
    settlePnl(mangoGroup: MangoGroup, mangoCache: MangoCache, mangoAccount: MangoAccount, perpMarket: PerpMarket, quoteRootBank: RootBank, price: I80F48, // should be the MangoCache price
    owner: Payer, mangoAccounts?: MangoAccount[]): Promise<TransactionSignature | null>;
    /**
     * Settle all perp accounts with positive pnl
     */
    settlePosPnl(mangoGroup: MangoGroup, mangoCache: MangoCache, mangoAccount: MangoAccount, perpMarkets: PerpMarket[], quoteRootBank: RootBank, owner: Payer, mangoAccounts?: MangoAccount[]): Promise<TransactionSignature[] | undefined>;
    /**
     * Settle all perp accounts with any pnl
     */
    settleAllPerpPnl(mangoGroup: MangoGroup, mangoCache: MangoCache, mangoAccount: MangoAccount, perpMarkets: PerpMarket[], quoteRootBank: RootBank, owner: Payer, mangoAccounts?: MangoAccount[]): Promise<(TransactionSignature | null)[]>;
    getMangoAccountsForOwner(mangoGroup: MangoGroup, owner: PublicKey, includeOpenOrders?: boolean): Promise<MangoAccount[]>;
    /**
     * Get all MangoAccounts where `delegate` pubkey has authority
     */
    getMangoAccountsForDelegate(mangoGroup: MangoGroup, delegate: PublicKey, includeOpenOrders?: boolean): Promise<MangoAccount[]>;
    getAllMangoAccounts(mangoGroup: MangoGroup, filters?: any[], includeOpenOrders?: boolean): Promise<MangoAccount[]>;
    addStubOracle(mangoGroupPk: PublicKey, admin: Keypair): Promise<string>;
    setStubOracle(mangoGroupPk: PublicKey, oraclePk: PublicKey, admin: Keypair, price: number): Promise<string>;
    addPerpMarket(mangoGroup: MangoGroup, oraclePk: PublicKey, mngoMintPk: PublicKey, admin: Keypair, maintLeverage: number, initLeverage: number, liquidationFee: number, makerFee: number, takerFee: number, baseLotSize: number, quoteLotSize: number, maxNumEvents: number, rate: number, // liquidity mining params; set rate == 0 if no liq mining
    maxDepthBps: number, targetPeriodLength: number, mngoPerPeriod: number, exp: number): Promise<string>;
    createPerpMarket(mangoGroup: MangoGroup, oraclePk: PublicKey, mngoMintPk: PublicKey, admin: Payer, maintLeverage: number, initLeverage: number, liquidationFee: number, makerFee: number, takerFee: number, baseLotSize: number, quoteLotSize: number, maxNumEvents: number, rate: number, // liquidity mining params; set rate == 0 if no liq mining
    maxDepthBps: number, targetPeriodLength: number, mngoPerPeriod: number, exp: number, version: number, lmSizeShift: number, baseDecimals: number): Promise<string | undefined>;
    forceCancelSpotOrders(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, spotMarket: Market, baseRootBank: RootBank, quoteRootBank: RootBank, payer: Keypair, limit: BN): Promise<string>;
    /**
     * Send multiple instructions to cancel all perp orders in this market
     */
    forceCancelAllPerpOrdersInMarket(mangoGroup: MangoGroup, liqee: MangoAccount, perpMarket: PerpMarket, payer: Payer, limitPerInstruction: number): Promise<TransactionSignature>;
    forceCancelPerpOrders(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, perpMarket: PerpMarket, payer: Keypair, limit: BN): Promise<string>;
    liquidateTokenAndToken(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, liqorMangoAccount: MangoAccount, assetRootBank: RootBank, liabRootBank: RootBank, payer: Keypair, maxLiabTransfer: I80F48): Promise<string>;
    liquidateTokenAndPerp(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, liqorMangoAccount: MangoAccount, rootBank: RootBank, payer: Keypair, assetType: AssetType, assetIndex: number, liabType: AssetType, liabIndex: number, maxLiabTransfer: I80F48): Promise<string>;
    liquidatePerpMarket(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, liqorMangoAccount: MangoAccount, perpMarket: PerpMarket, payer: Keypair, baseTransferRequest: BN): Promise<string>;
    settleFees(mangoGroup: MangoGroup, mangoAccount: MangoAccount, perpMarket: PerpMarket, rootBank: RootBank, payer: Keypair): Promise<string>;
    resolvePerpBankruptcy(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, liqorMangoAccount: MangoAccount, perpMarket: PerpMarket, rootBank: RootBank, payer: Keypair, liabIndex: number, maxLiabTransfer: I80F48): Promise<string>;
    resolveTokenBankruptcy(mangoGroup: MangoGroup, liqeeMangoAccount: MangoAccount, liqorMangoAccount: MangoAccount, quoteRootBank: RootBank, liabRootBank: RootBank, payer: Keypair, maxLiabTransfer: I80F48): Promise<string>;
    redeemMngo(mangoGroup: MangoGroup, mangoAccount: MangoAccount, perpMarket: PerpMarket, payer: Payer, mngoRootBank: PublicKey, mngoNodeBank: PublicKey, mngoVault: PublicKey): Promise<TransactionSignature | undefined>;
    redeemAllMngo(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer, mngoRootBank: PublicKey, mngoNodeBank: PublicKey, mngoVault: PublicKey): Promise<TransactionSignature[] | undefined>;
    addMangoAccountInfo(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, info: string): Promise<TransactionSignature | undefined>;
    depositMsrm(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, msrmAccount: PublicKey, quantity: number): Promise<TransactionSignature | undefined>;
    withdrawMsrm(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, msrmAccount: PublicKey, quantity: number): Promise<TransactionSignature | undefined>;
    changePerpMarketParams(mangoGroup: MangoGroup, perpMarket: PerpMarket, admin: Payer, maintLeverage: number | undefined, initLeverage: number | undefined, liquidationFee: number | undefined, makerFee: number | undefined, takerFee: number | undefined, rate: number | undefined, maxDepthBps: number | undefined, targetPeriodLength: number | undefined, mngoPerPeriod: number | undefined, exp: number | undefined): Promise<TransactionSignature | undefined>;
    changePerpMarketParams2(mangoGroup: MangoGroup, perpMarket: PerpMarket, admin: Payer, maintLeverage: number | undefined, initLeverage: number | undefined, liquidationFee: number | undefined, makerFee: number | undefined, takerFee: number | undefined, rate: number | undefined, maxDepthBps: number | undefined, targetPeriodLength: number | undefined, mngoPerPeriod: number | undefined, exp: number | undefined, version: number | undefined, lmSizeShift: number | undefined): Promise<TransactionSignature | undefined>;
    setGroupAdmin(mangoGroup: MangoGroup, newAdmin: PublicKey, admin: Payer): Promise<TransactionSignature | undefined>;
    /**
     * Add allowance for orders to be cancelled and replaced in a single transaction
     */
    modifySpotOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: PublicKey, spotMarket: Market, owner: Payer, order: Order, side: 'buy' | 'sell', price: number, size: number, orderType?: 'limit' | 'ioc' | 'postOnly'): Promise<TransactionSignature | undefined>;
    modifyPerpOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: PublicKey, perpMarket: PerpMarket, owner: Payer, order: PerpOrder, side: 'buy' | 'sell', price: number, quantity: number, orderType?: PerpOrderType, clientOrderId?: number, bookSideInfo?: AccountInfo<Buffer>, // ask if side === bid, bids if side === ask; if this is given; crank instruction is added
    invalidIdOk?: boolean, // Don't throw error if order is invalid
    referrerMangoAccountPk?: PublicKey): Promise<TransactionSignature | undefined>;
    addPerpTriggerOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, perpMarket: PerpMarket, owner: Payer, orderType: PerpOrderType, side: 'buy' | 'sell', price: number, quantity: number, triggerCondition: 'above' | 'below', triggerPrice: number, reduceOnly: boolean, clientOrderId?: number): Promise<TransactionSignature | undefined>;
    removeAdvancedOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, owner: Payer, orderIndex: number): Promise<TransactionSignature | undefined>;
    executePerpTriggerOrder(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: MangoCache, perpMarket: PerpMarket, payer: Payer, orderIndex: number): Promise<TransactionSignature | undefined>;
    closeAdvancedOrders(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer): Promise<TransactionSignature | undefined>;
    closeSpotOpenOrders(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer, marketIndex: number, ownerIsSigner?: boolean): Promise<TransactionSignature | undefined>;
    closeMangoAccount(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer): Promise<TransactionSignature | undefined>;
    createDustAccount(mangoGroup: MangoGroup, payer: Payer): Promise<TransactionSignature | undefined>;
    resolveDust(mangoGroup: MangoGroup, mangoAccount: MangoAccount, rootBank: RootBank, mangoCache: MangoCache, payer: Payer): Promise<TransactionSignature | undefined>;
    updateMarginBasket(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer): Promise<string>;
    resolveAllDust(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: MangoCache, payer: Payer): Promise<void>;
    emptyAndCloseMangoAccount(mangoGroup: MangoGroup, mangoAccount: MangoAccount, mangoCache: MangoCache, mngoIndex: number, payer: Payer): Promise<TransactionSignature[] | undefined>;
    cancelPerpOrderSide(mangoGroup: MangoGroup, mangoAccount: MangoAccount, perpMarket: PerpMarket, payer: Payer, side: 'buy' | 'sell', limit: number): Promise<string | undefined>;
    setDelegate(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer, delegate: PublicKey): Promise<string | undefined>;
    changeSpotMarketParams(mangoGroup: MangoGroup, spotMarket: Market, rootBank: RootBank, admin: Payer, maintLeverage: number | undefined, initLeverage: number | undefined, liquidationFee: number | undefined, optimalUtil: number | undefined, optimalRate: number | undefined, maxRate: number | undefined, version: number | undefined): Promise<TransactionSignature | undefined>;
    /**
     * Change the referral fee params
     * @param mangoGroup
     * @param admin
     * @param refSurcharge normal units 0.0001 -> 1 basis point
     * @param refShare
     * @param refMngoRequired ui units -> 1 -> 1_000_000 MNGO
     */
    changeReferralFeeParams(mangoGroup: MangoGroup, admin: Payer, refSurcharge: number, refShare: number, refMngoRequired: number): Promise<TransactionSignature | undefined>;
    setReferrerMemory(mangoGroup: MangoGroup, mangoAccount: MangoAccount, payer: Payer, // must be also owner of mangoAccount
    referrerMangoAccountPk: PublicKey): Promise<TransactionSignature | undefined>;
    getReferrerPda(mangoGroup: MangoGroup, referrerId: string): Promise<{
        referrerPda: PublicKey;
        encodedReferrerId: Buffer;
    }>;
    registerReferrerId(mangoGroup: MangoGroup, referrerMangoAccount: MangoAccount, payer: Payer, // will also owner of referrerMangoAccount
    referrerId: string): Promise<TransactionSignature | undefined>;
    getReferrerIdsForMangoAccount(mangoAccount: MangoAccount): Promise<ReferrerIdRecord[]>;
    cancelAllSpotOrders(mangoGroup: MangoGroup, mangoAccount: MangoAccount, spotMarket: Market, owner: Payer, limit: number, ownerIsSigner?: boolean): Promise<string | undefined>;
    ensureOpenOrdersAccount(mangoAccount: MangoAccount, mangoGroup: MangoGroup, payer: Keypair, spotMarket: Market, spotMarketConfig: any): Promise<void>;
    isMainnet(): any;
}
export {};
//# sourceMappingURL=client.d.ts.map