import { default as invariant } from "tiny-invariant";
import { valueAsPromise } from "../utils/misc.js";
import { generateTXLink } from "../utils/txLink.js";
import { PendingTransaction } from "./PendingTransaction.js";
/**
 * Confirms a transaction, returning its receipt.
 *
 * @param tx
 * @returns
 */
export const confirmTransactionLike = async (tx) => {
    const ish = await valueAsPromise(tx);
    if (ish instanceof TransactionReceipt) {
        return ish;
    }
    let pending;
    if (ish instanceof PendingTransaction) {
        pending = ish;
    }
    else {
        pending = await ish.send({
            printLogs: false,
        });
    }
    return await pending.wait();
};
/**
 * A transaction that has been processed by the cluster.
 */
export class TransactionReceipt {
    constructor(
    /**
     * Signature (id) of the transaction.
     */
    signature, 
    /**
     * Raw response from web3.js
     */
    response) {
        this.signature = signature;
        this.response = response;
    }
    /**
     * Gets the events associated with this transaction.
     */
    getEvents(eventParser) {
        var _a;
        const logs = (_a = this.response.meta) === null || _a === void 0 ? void 0 : _a.logMessages;
        if (logs && logs.length > 0) {
            return eventParser(logs);
        }
        return [];
    }
    /**
     * Prints the logs associated with this transaction.
     */
    printLogs() {
        var _a, _b;
        console.log((_b = (_a = this.response.meta) === null || _a === void 0 ? void 0 : _a.logMessages) === null || _b === void 0 ? void 0 : _b.join("\n"));
    }
    /**
     * Gets the compute units used by the transaction.
     * @returns
     */
    get computeUnits() {
        var _a;
        const logs = (_a = this.response.meta) === null || _a === void 0 ? void 0 : _a.logMessages;
        invariant(logs, "no logs");
        const consumeLog = logs[logs.length - 2];
        invariant(consumeLog, "no consume log");
        const amtStr = consumeLog.split(" ")[3];
        invariant(amtStr, "no amount");
        return parseInt(amtStr);
    }
    /**
     * Generates a link to view this {@link TransactionReceipt} on the official Solana explorer.
     * @param network
     * @returns
     */
    generateSolanaExplorerLink(cluster = "mainnet-beta") {
        return generateTXLink(this.signature, cluster);
    }
}
//# sourceMappingURL=TransactionReceipt.js.map