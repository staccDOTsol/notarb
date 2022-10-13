import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PrismLoadParams, TokenList } from "./types/types";
import { Wallet } from "./types/types";
import { web3 } from "@project-serum/anchor";
export declare class Prism {
    private settings;
    private user;
    private publicKey;
    private liquidityInfos;
    private userAccounts;
    private userOpenOrders;
    private connection;
    private tokenList;
    private liquidityProviders;
    private knownMarkets;
    private lastFromCoin;
    private lastToCoin;
    private fromCoin;
    private toCoin;
    constructor(connection: Connection, user: Keypair | Wallet | PublicKey | undefined, publicKey: PublicKey, settings: any, userAccounts: Array<any>, tokenList: TokenList, liquidityProviders: any, knownMarkets: any);
    static init(params: PrismLoadParams): Promise<Prism>;
    setSigner(user: Keypair | Wallet): Promise<void>;
    setSlippage(slippage: number): void;
    getUserAccounts(): any[];
    getUserOpenOrders(): any;
    closeOpenOrders(openOrders: Array<any>): Promise<null>;
    unwrapWSolAccounts(): Promise<null>;
    static loadPrismStats(): Promise<any>;
    loadPrismStats(): Promise<any>;
    static loadUserTradeHistory(publicKey: PublicKey): Promise<any>;
    loadUserTradeHistory(): Promise<any>;
    loadRoutes(from: string, to: string, direct?: boolean): Promise<void>;
    getRoutes(amount: number): any;
    generateSwapTransactions(route: any): Promise<{
        preTransaction: any;
        preSigners: any;
        mainTransaction: any;
        postTransaction: any;
    }>;
    generateSymmetryTransaction(route: any, fromTokenAccount: any, toTokenAccount: any): Promise<{
        transaction: web3.Transaction;
        signers: any[];
        mainSigners: any[];
    }>;
    swap(route: any): Promise<any>;
    /**
    * @deprecated Swap function already confirms transaction
    */
    confirmSwap(result: any): Promise<any>;
}
