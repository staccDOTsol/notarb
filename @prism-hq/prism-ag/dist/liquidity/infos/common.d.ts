/// <reference types="node" />
import { AccountInfo, Commitment, Connection, PublicKey } from "@solana/web3.js";
export declare function getMultipleAccounts(connection: Connection, publicKeys: PublicKey[], commitment?: Commitment): Promise<Array<null | {
    publicKey: PublicKey;
    account: AccountInfo<Buffer>;
}>>;
