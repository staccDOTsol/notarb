"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangoClient = exports.getUnixTs = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const utils_1 = require("./utils/utils");
const layout_1 = require("./layout");
const MangoAccount_1 = __importDefault(require("./MangoAccount"));
const PerpMarket_1 = __importDefault(require("./PerpMarket"));
const instruction_1 = require("./instruction");
const serum_1 = require("@project-serum/serum");
const fixednum_1 = require("./utils/fixednum");
const adapterTypes_1 = require("./utils/adapterTypes");
const book_1 = require("./book");
const token_instructions_1 = require("@project-serum/serum/lib/token-instructions");
const spl_token_1 = require("@solana/spl-token");
const MangoGroup_1 = __importDefault(require("./MangoGroup"));
const instruction_2 = require("./instruction");
const layout_2 = require("./layout");
const bs58 = __importStar(require("bs58"));
/**
 * Get the current epoch timestamp in seconds with microsecond precision
 */
const getUnixTs = () => {
    return new Date().getTime() / 1000;
};
exports.getUnixTs = getUnixTs;
/**
 * A class for interacting with the Mango V3 Program
 *
 * @param connection A solana web.js Connection object
 * @param programId The PublicKey of the Mango V3 Program
 * @param opts An object used to configure the MangoClient. Accepts a postSendTxCallback, and prioritizationFee. The prioritizationFee is a number measured in micro lamports that is charged per compute unit.
 */
class MangoClient {
    constructor(connection, programId, opts = {}) {
        this.connection = connection;
        this.programId = programId;
        this.lastSlot = 0;
        this.lastValidBlockHeight = 0;
        this.blockhashCommitment = (opts === null || opts === void 0 ? void 0 : opts.blockhashCommitment) || 'confirmed';
        this.timeout = (opts === null || opts === void 0 ? void 0 : opts.timeout) || 60000;
        this.sendConnection = opts === null || opts === void 0 ? void 0 : opts.sendConnection;
        this.prioritizationFee = (opts === null || opts === void 0 ? void 0 : opts.prioritizationFee) || 0;
        if (opts.postSendTxCallback) {
            this.postSendTxCallback = opts.postSendTxCallback;
        }
    }
    sendTransactions(transactions, payer, additionalSigners, timeout = this.timeout, confirmLevel = 'processed') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(transactions.map((tx) => this.sendTransaction(tx, payer, additionalSigners, timeout, confirmLevel)));
        });
    }
    getCurrentBlockhash() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentBlockhash = yield this.connection.getLatestBlockhash(this.blockhashCommitment);
            return currentBlockhash;
        });
    }
    signTransaction({ transaction, payer, signers, currentBlockhash, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let blockhashWithExpiryBlockHeight = currentBlockhash ? currentBlockhash : yield this.getCurrentBlockhash();
            transaction.recentBlockhash = blockhashWithExpiryBlockHeight.blockhash;
            transaction.setSigners(payer.publicKey, ...signers.map((s) => s.publicKey));
            if (signers.length > 0) {
                transaction.partialSign(...signers);
            }
            if (payer === null || payer === void 0 ? void 0 : payer.connected) {
                console.log('signing as wallet', payer.publicKey);
                return yield payer.signTransaction(transaction);
            }
            else {
                transaction.sign(...[payer].concat(signers));
            }
        });
    }
    signTransactions({ transactionsAndSigners, payer, currentBlockhash, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            let blockhashWithExpiryBlockHeight = currentBlockhash ? currentBlockhash : yield this.getCurrentBlockhash();
            transactionsAndSigners.forEach(({ transaction, signers = [] }) => {
                transaction.recentBlockhash = blockhashWithExpiryBlockHeight.blockhash;
                if (this.prioritizationFee) {
                    transaction = (0, utils_1.prependFeePrioritizationIx)(transaction, this.prioritizationFee);
                }
                if (payer.publicKey) {
                    transaction.setSigners(payer.publicKey, ...signers.map((s) => s.publicKey));
                }
                if ((signers === null || signers === void 0 ? void 0 : signers.length) > 0) {
                    transaction.partialSign(...signers);
                }
            });
            if ((0, adapterTypes_1.adapterHasSignAllTransactions)(payer)) {
                return yield payer.signAllTransactions(transactionsAndSigners.map(({ transaction }) => transaction));
            }
            else {
                transactionsAndSigners.forEach(({ transaction, signers }) => {
                    // @ts-ignore
                    transaction.sign(...[payer].concat(signers));
                });
                return transactionsAndSigners.map((t) => t.transaction);
            }
        });
    }
    /**
     * Send a transaction using the Solana Web3.js connection on the mango client
     *
     * @param transaction
     * @param payer
     * @param additionalSigners
     * @param timeout Retries sending the transaction and trying to confirm it until the given timeout. Passing null will disable the transaction confirmation check and always return success.
     */
    sendTransaction(transaction, payer, additionalSigners, timeout = this.timeout, confirmLevel = 'processed') {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlockhash = yield this.getCurrentBlockhash();
            transaction = (0, utils_1.prependFeePrioritizationIx)(transaction, this.prioritizationFee);
            yield this.signTransaction({
                transaction,
                payer,
                signers: additionalSigners,
                currentBlockhash,
            });
            const rawTransaction = transaction.serialize();
            let txid = bs58.encode(transaction.signatures[0].signature);
            const startTime = (0, exports.getUnixTs)();
            if (this.sendConnection) {
                const promise = this.sendConnection.sendRawTransaction(rawTransaction);
                if (this.postSendTxCallback) {
                    try {
                        this.postSendTxCallback({ txid });
                    }
                    catch (e) {
                        console.warn(`postSendTxCallback error ${e}`);
                    }
                }
                try {
                    return yield promise;
                }
                catch (e) {
                    console.error(e);
                    throw new utils_1.MangoError({ message: 'Transaction failed', txid });
                }
            }
            else {
                txid = yield this.connection.sendRawTransaction(rawTransaction, {
                    skipPreflight: false,
                });
                if (this.postSendTxCallback) {
                    try {
                        this.postSendTxCallback({ txid });
                    }
                    catch (e) {
                        console.warn(`postSendTxCallback error ${e}`);
                    }
                }
                if (!timeout)
                    return txid;
                console.log('Started awaiting confirmation for', txid, 'size:', rawTransaction.length);
                let done = false;
                let retryAttempts = 0;
                const retrySleep = 2000;
                const maxRetries = 30;
                (() => __awaiter(this, void 0, void 0, function* () {
                    while (!done && (0, exports.getUnixTs)() - startTime < timeout / 1000) {
                        yield (0, utils_1.sleep)(retrySleep);
                        // console.log(new Date().toUTCString(), ' sending tx ', txid);
                        this.connection.sendRawTransaction(rawTransaction, {
                            skipPreflight: false,
                        });
                        if (retryAttempts <= maxRetries) {
                            retryAttempts = retryAttempts++;
                        }
                        else {
                            break;
                        }
                    }
                }))();
                try {
                    yield this.awaitTransactionSignatureConfirmation(txid, timeout, confirmLevel, currentBlockhash);
                }
                catch (err) {
                    if (err.timeout) {
                        throw new utils_1.TimeoutError({ txid });
                    }
                    let simulateResult = null;
                    try {
                        simulateResult = (yield (0, utils_1.simulateTransaction)(this.connection, transaction, 'processed')).value;
                    }
                    catch (e) {
                        console.warn('Simulate transaction failed');
                    }
                    if (simulateResult && simulateResult.err) {
                        if (simulateResult.logs) {
                            for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
                                const line = simulateResult.logs[i];
                                if (line.startsWith('Program log: ')) {
                                    throw new utils_1.MangoError({
                                        message: 'Transaction failed: ' + line.slice('Program log: '.length),
                                        txid,
                                    });
                                }
                            }
                        }
                        throw new utils_1.MangoError({
                            message: JSON.stringify(simulateResult.err),
                            txid,
                        });
                    }
                    throw new utils_1.MangoError({ message: 'Transaction failed', txid });
                }
                finally {
                    done = true;
                }
            }
            console.log('Latency', (0, exports.getUnixTs)() - startTime, txid);
            return txid;
        });
    }
    sendSignedTransaction({ signedTransaction, timeout = this.timeout, confirmLevel = 'processed', signedAtBlock, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawTransaction = signedTransaction.serialize();
            let txid = bs58.encode(signedTransaction.signatures[0].signature);
            const startTime = (0, exports.getUnixTs)();
            if (this.sendConnection) {
                const promise = this.sendConnection.sendRawTransaction(rawTransaction);
                if (this.postSendTxCallback) {
                    try {
                        this.postSendTxCallback({ txid });
                    }
                    catch (e) {
                        console.warn(`postSendTxCallback error ${e}`);
                    }
                }
                try {
                    return yield promise;
                }
                catch (e) {
                    console.error(e);
                    throw new utils_1.MangoError({ message: 'Transaction failed', txid });
                }
            }
            else {
                txid = yield this.connection.sendRawTransaction(rawTransaction, {
                    skipPreflight: false,
                });
                if (this.postSendTxCallback) {
                    try {
                        this.postSendTxCallback({ txid });
                    }
                    catch (e) {
                        console.log(`postSendTxCallback error ${e}`);
                    }
                }
                if (!timeout)
                    return txid;
                let done = false;
                (() => __awaiter(this, void 0, void 0, function* () {
                    while (!done && (0, exports.getUnixTs)() - startTime < timeout) {
                        yield (0, utils_1.sleep)(2000);
                        this.connection.sendRawTransaction(rawTransaction, {
                            skipPreflight: false,
                        });
                    }
                }))();
                try {
                    yield this.awaitTransactionSignatureConfirmation(txid, timeout, confirmLevel, signedAtBlock);
                }
                catch (err) {
                    if (err.timeout) {
                        throw new utils_1.TimeoutError({ txid });
                    }
                    let simulateResult = null;
                    try {
                        simulateResult = (yield (0, utils_1.simulateTransaction)(this.connection, signedTransaction, 'single')).value;
                    }
                    catch (e) {
                        console.log('Simulate tx failed');
                    }
                    if (simulateResult && simulateResult.err) {
                        if (simulateResult.logs) {
                            for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
                                const line = simulateResult.logs[i];
                                if (line.startsWith('Program log: ')) {
                                    throw new utils_1.MangoError({
                                        message: 'Transaction failed: ' + line.slice('Program log: '.length),
                                        txid,
                                    });
                                }
                            }
                        }
                        throw new utils_1.MangoError({
                            message: JSON.stringify(simulateResult.err),
                            txid,
                        });
                    }
                    throw new utils_1.MangoError({ message: 'Transaction failed', txid });
                }
                finally {
                    done = true;
                }
                return txid;
            }
        });
    }
    awaitTransactionSignatureConfirmation(txid, timeout, confirmLevel, signedAtBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeoutBlockHeight = signedAtBlock
                ? signedAtBlock.lastValidBlockHeight +
                    utils_1.MAXIMUM_NUMBER_OF_BLOCKS_FOR_TRANSACTION
                : 0;
            let startTimeoutCheck = false;
            let done = false;
            const confirmLevels = ['finalized'];
            if (confirmLevel === 'confirmed') {
                confirmLevels.push('confirmed');
            }
            else if (confirmLevel === 'processed') {
                confirmLevels.push('confirmed');
                confirmLevels.push('processed');
            }
            let subscriptionId;
            const result = yield new Promise((resolve, reject) => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    setTimeout(() => {
                        if (done) {
                            return;
                        }
                        if (timeoutBlockHeight !== 0) {
                            startTimeoutCheck = true;
                        }
                        else {
                            done = true;
                            console.log('Timed out for txid: ', txid);
                            reject({ timeout: true });
                        }
                    }, timeout);
                    try {
                        subscriptionId = this.connection.onSignature(txid, (result, context) => {
                            subscriptionId = undefined;
                            done = true;
                            if (result.err) {
                                reject(result.err);
                            }
                            else {
                                this.lastSlot = context === null || context === void 0 ? void 0 : context.slot;
                                resolve(result);
                            }
                        }, 'processed');
                    }
                    catch (e) {
                        done = true;
                        console.log('WS error in setup', txid, e);
                    }
                    let retrySleep = 2000;
                    while (!done) {
                        // eslint-disable-next-line no-loop-func
                        yield (0, utils_1.sleep)(retrySleep);
                        (() => __awaiter(this, void 0, void 0, function* () {
                            var _a;
                            try {
                                const promises = [this.connection.getSignatureStatuses([txid])];
                                //if startTimeoutThreshold passed we start to check if
                                //current blocks are did not passed timeoutBlockHeight threshold
                                if (startTimeoutCheck) {
                                    promises.push(this.connection.getBlockHeight('confirmed'));
                                }
                                const [signatureStatuses, currentBlockHeight] = yield Promise.all(promises);
                                if (typeof currentBlockHeight !== undefined &&
                                    timeoutBlockHeight <= currentBlockHeight) {
                                    console.log('Timed out for txid: ', txid);
                                    done = true;
                                    reject({ timeout: true });
                                }
                                const result = signatureStatuses && signatureStatuses.value[0];
                                if (!done) {
                                    if (!result)
                                        return;
                                    if (result.err) {
                                        console.log('REST error for', txid, result);
                                        done = true;
                                        reject(result.err);
                                    }
                                    else if (!(result.confirmations ||
                                        confirmLevels.includes(result.confirmationStatus))) {
                                        console.log('REST not confirmed', txid, result);
                                    }
                                    else {
                                        this.lastSlot = (_a = signatureStatuses === null || signatureStatuses === void 0 ? void 0 : signatureStatuses.context) === null || _a === void 0 ? void 0 : _a.slot;
                                        console.log('REST confirmed', txid, result);
                                        done = true;
                                        resolve(result);
                                    }
                                }
                            }
                            catch (e) {
                                if (!done) {
                                    console.log('REST connection error: txid', txid, e);
                                }
                            }
                        }))();
                    }
                }))();
            });
            if (subscriptionId) {
                this.connection.removeSignatureListener(subscriptionId).catch((e) => {
                    console.log('WS error in cleanup', e);
                });
            }
            done = true;
            return result;
        });
    }
    /**
     * Create a new Mango group
     */
    initMangoGroup(quoteMint, msrmMint, dexProgram, feesVault, // owned by Mango DAO token governance
    validInterval, quoteOptimalUtil, quoteOptimalRate, quoteMaxRate, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const accountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, payer.publicKey, layout_1.MangoGroupLayout.span, this.programId);
            const { signerKey, signerNonce } = yield (0, utils_1.createSignerKeyAndNonce)(this.programId, accountInstruction.account.publicKey);
            const quoteVaultAccount = new web3_js_1.Keypair();
            const quoteVaultAccountInstructions = yield (0, utils_1.createTokenAccountInstructions)(this.connection, payer.publicKey, quoteVaultAccount.publicKey, quoteMint, signerKey);
            const insuranceVaultAccount = new web3_js_1.Keypair();
            const insuranceVaultAccountInstructions = yield (0, utils_1.createTokenAccountInstructions)(this.connection, payer.publicKey, insuranceVaultAccount.publicKey, quoteMint, signerKey);
            const quoteNodeBankAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, payer.publicKey, layout_1.NodeBankLayout.span, this.programId);
            const quoteRootBankAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, payer.publicKey, layout_1.RootBankLayout.span, this.programId);
            const cacheAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, payer.publicKey, layout_1.MangoCacheLayout.span, this.programId);
            const createAccountsTransaction = new web3_js_1.Transaction();
            createAccountsTransaction.add(accountInstruction.instruction);
            createAccountsTransaction.add(...quoteVaultAccountInstructions);
            createAccountsTransaction.add(quoteNodeBankAccountInstruction.instruction);
            createAccountsTransaction.add(quoteRootBankAccountInstruction.instruction);
            createAccountsTransaction.add(cacheAccountInstruction.instruction);
            createAccountsTransaction.add(...insuranceVaultAccountInstructions);
            const signers = [
                accountInstruction.account,
                quoteVaultAccount,
                quoteNodeBankAccountInstruction.account,
                quoteRootBankAccountInstruction.account,
                cacheAccountInstruction.account,
                insuranceVaultAccount,
            ];
            yield this.sendTransaction(createAccountsTransaction, payer, signers);
            // If valid msrmMint passed in, then create new msrmVault
            let msrmVaultPk;
            if (!msrmMint.equals(utils_1.zeroKey)) {
                const msrmVaultAccount = new web3_js_1.Keypair();
                const msrmVaultAccountInstructions = yield (0, utils_1.createTokenAccountInstructions)(this.connection, payer.publicKey, msrmVaultAccount.publicKey, msrmMint, signerKey);
                const createMsrmVaultTransaction = new web3_js_1.Transaction();
                createMsrmVaultTransaction.add(...msrmVaultAccountInstructions);
                msrmVaultPk = msrmVaultAccount.publicKey;
                yield this.sendTransaction(createMsrmVaultTransaction, payer, [
                    msrmVaultAccount,
                ]);
            }
            else {
                msrmVaultPk = utils_1.zeroKey;
            }
            const initMangoGroupInstruction = (0, instruction_1.makeInitMangoGroupInstruction)(this.programId, accountInstruction.account.publicKey, signerKey, payer.publicKey, quoteMint, quoteVaultAccount.publicKey, quoteNodeBankAccountInstruction.account.publicKey, quoteRootBankAccountInstruction.account.publicKey, insuranceVaultAccount.publicKey, msrmVaultPk, feesVault, cacheAccountInstruction.account.publicKey, dexProgram, new bn_js_1.default(signerNonce), new bn_js_1.default(validInterval), fixednum_1.I80F48.fromNumber(quoteOptimalUtil), fixednum_1.I80F48.fromNumber(quoteOptimalRate), fixednum_1.I80F48.fromNumber(quoteMaxRate));
            const initMangoGroupTransaction = new web3_js_1.Transaction();
            initMangoGroupTransaction.add(initMangoGroupInstruction);
            yield this.sendTransaction(initMangoGroupTransaction, payer, []);
            return accountInstruction.account.publicKey;
        });
    }
    /**
     * Retrieve information about a Mango Group
     */
    getMangoGroup(mangoGroup) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountInfo = yield this.connection.getAccountInfo(mangoGroup);
            const decoded = layout_1.MangoGroupLayout.decode(accountInfo == null ? undefined : accountInfo.data);
            return new MangoGroup_1.default(mangoGroup, decoded);
        });
    }
    /**
     * DEPRECATED - Create a new Mango Account on a given group
     */
    initMangoAccount(mangoGroup, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const accountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, owner.publicKey, layout_1.MangoAccountLayout.span, this.programId);
            const initMangoAccountInstruction = (0, instruction_1.makeInitMangoAccountInstruction)(this.programId, mangoGroup.publicKey, accountInstruction.account.publicKey, owner.publicKey);
            // Add all instructions to one atomic transaction
            const transaction = new web3_js_1.Transaction();
            transaction.add(accountInstruction.instruction);
            transaction.add(initMangoAccountInstruction);
            const additionalSigners = [accountInstruction.account];
            yield this.sendTransaction(transaction, owner, additionalSigners);
            return accountInstruction.account.publicKey;
        });
    }
    /**
     * Create a new Mango Account (PDA) on a given group
     */
    createMangoAccount(mangoGroup, owner, accountNum, payerPk) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const payer = payerPk !== null && payerPk !== void 0 ? payerPk : owner.publicKey;
            const accountNumBN = new bn_js_1.default(accountNum);
            const [mangoAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoGroup.publicKey.toBytes(),
                owner.publicKey.toBytes(),
                accountNumBN.toBuffer('le', 8),
            ], this.programId);
            const createMangoAccountInstruction = (0, instruction_1.makeCreateMangoAccountInstruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, owner.publicKey, accountNumBN, payer);
            // Add all instructions to one atomic transaction
            const transaction = new web3_js_1.Transaction();
            transaction.add(createMangoAccountInstruction);
            yield this.sendTransaction(transaction, owner, []);
            return mangoAccountPk;
        });
    }
    /**
     * Upgrade a Mango Account from V0 (not deletable) to V1 (deletable)
     */
    upgradeMangoAccountV0V1(mangoGroup, owner, accountNum) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const accountNumBN = new bn_js_1.default(accountNum);
            const [mangoAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoGroup.publicKey.toBytes(),
                owner.publicKey.toBytes(),
                accountNumBN.toBuffer(),
            ], this.programId);
            const upgradeMangoAccountInstruction = (0, instruction_1.makeUpgradeMangoAccountV0V1Instruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, owner.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(upgradeMangoAccountInstruction);
            yield this.sendTransaction(transaction, owner, []);
            return mangoAccountPk;
        });
    }
    /**
     * Retrieve information about a Mango Account
     */
    getMangoAccount(mangoAccountPk, dexProgramId) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.connection.getAccountInfo(mangoAccountPk, 'processed');
            const mangoAccount = new MangoAccount_1.default(mangoAccountPk, layout_1.MangoAccountLayout.decode(acc == null ? undefined : acc.data));
            yield mangoAccount.loadOpenOrders(this.connection, dexProgramId);
            return mangoAccount;
        });
    }
    /**
     * Create a new Mango Account and deposit some tokens in a single transaction
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     * @param info An optional UI name for the account
     */
    initMangoAccountAndDeposit(mangoGroup, owner, rootBank, nodeBank, vault, tokenAcc, quantity, info) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const accountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, owner.publicKey, layout_1.MangoAccountLayout.span, this.programId);
            const initMangoAccountInstruction = (0, instruction_1.makeInitMangoAccountInstruction)(this.programId, mangoGroup.publicKey, accountInstruction.account.publicKey, owner.publicKey);
            transaction.add(accountInstruction.instruction);
            transaction.add(initMangoAccountInstruction);
            const additionalSigners = [accountInstruction.account];
            const tokenIndex = mangoGroup.getRootBankIndex(rootBank);
            const tokenMint = mangoGroup.tokens[tokenIndex].mint;
            let wrappedSolAccount = null;
            if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT) &&
                tokenAcc.toBase58() === owner.publicKey.toBase58()) {
                wrappedSolAccount = new web3_js_1.Keypair();
                const lamports = Math.round(quantity * web3_js_1.LAMPORTS_PER_SOL) + 1e7;
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: owner.publicKey,
                    newAccountPubkey: wrappedSolAccount.publicKey,
                    lamports,
                    space: 165,
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                transaction.add((0, token_instructions_1.initializeAccount)({
                    account: wrappedSolAccount.publicKey,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: owner.publicKey,
                }));
                additionalSigners.push(wrappedSolAccount);
            }
            const nativeQuantity = (0, utils_1.uiToNative)(quantity, mangoGroup.tokens[tokenIndex].decimals);
            const instruction = (0, instruction_1.makeDepositInstruction)(this.programId, mangoGroup.publicKey, owner.publicKey, mangoGroup.mangoCache, accountInstruction.account.publicKey, rootBank, nodeBank, vault, (_a = wrappedSolAccount === null || wrappedSolAccount === void 0 ? void 0 : wrappedSolAccount.publicKey) !== null && _a !== void 0 ? _a : tokenAcc, nativeQuantity);
            transaction.add(instruction);
            if (info) {
                const addAccountNameinstruction = (0, instruction_1.makeAddMangoAccountInfoInstruction)(this.programId, mangoGroup.publicKey, accountInstruction.account.publicKey, owner.publicKey, info);
                transaction.add(addAccountNameinstruction);
            }
            if (wrappedSolAccount) {
                transaction.add((0, token_instructions_1.closeAccount)({
                    source: wrappedSolAccount.publicKey,
                    destination: owner.publicKey,
                    owner: owner.publicKey,
                }));
            }
            yield this.sendTransaction(transaction, owner, additionalSigners);
            return accountInstruction.account.publicKey.toString();
        });
    }
    /**
     * Create a new Mango Account (PDA) and deposit some tokens in a single transaction
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     * @param info An optional UI name for the account
     */
    createMangoAccountAndDeposit(mangoGroup, owner, rootBank, nodeBank, vault, tokenAcc, quantity, accountNum, info, referrerPk, payerPk) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const payer = payerPk !== null && payerPk !== void 0 ? payerPk : owner.publicKey;
            const accountNumBN = new bn_js_1.default(accountNum);
            const [mangoAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoGroup.publicKey.toBytes(),
                owner.publicKey.toBytes(),
                accountNumBN.toArrayLike(Buffer, 'le', 8),
            ], this.programId);
            const createMangoAccountInstruction = (0, instruction_1.makeCreateMangoAccountInstruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, owner.publicKey, accountNumBN, payer);
            transaction.add(createMangoAccountInstruction);
            if (referrerPk) {
                const [referrerMemoryPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoAccountPk.toBytes(), new Buffer('ReferrerMemory', 'utf-8')], this.programId);
                const setReferrerInstruction = (0, instruction_1.makeSetReferrerMemoryInstruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, owner.publicKey, referrerMemoryPk, referrerPk, owner.publicKey);
                transaction.add(setReferrerInstruction);
            }
            const additionalSigners = [];
            const tokenIndex = mangoGroup.getRootBankIndex(rootBank);
            const tokenMint = mangoGroup.tokens[tokenIndex].mint;
            let wrappedSolAccount = null;
            if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT) &&
                tokenAcc.toBase58() === owner.publicKey.toBase58()) {
                wrappedSolAccount = new web3_js_1.Keypair();
                const lamports = Math.round(quantity * web3_js_1.LAMPORTS_PER_SOL) + 1e7;
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: owner.publicKey,
                    newAccountPubkey: wrappedSolAccount.publicKey,
                    lamports,
                    space: 165,
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                transaction.add((0, token_instructions_1.initializeAccount)({
                    account: wrappedSolAccount.publicKey,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: owner.publicKey,
                }));
                additionalSigners.push(wrappedSolAccount);
            }
            const nativeQuantity = (0, utils_1.uiToNative)(quantity, mangoGroup.tokens[tokenIndex].decimals);
            const instruction = (0, instruction_1.makeDepositInstruction)(this.programId, mangoGroup.publicKey, owner.publicKey, mangoGroup.mangoCache, mangoAccountPk, rootBank, nodeBank, vault, (_a = wrappedSolAccount === null || wrappedSolAccount === void 0 ? void 0 : wrappedSolAccount.publicKey) !== null && _a !== void 0 ? _a : tokenAcc, nativeQuantity);
            transaction.add(instruction);
            if (info) {
                const addAccountNameinstruction = (0, instruction_1.makeAddMangoAccountInfoInstruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, owner.publicKey, info);
                transaction.add(addAccountNameinstruction);
            }
            if (wrappedSolAccount) {
                transaction.add((0, token_instructions_1.closeAccount)({
                    source: wrappedSolAccount.publicKey,
                    destination: owner.publicKey,
                    owner: owner.publicKey,
                }));
            }
            const txid = yield this.sendTransaction(transaction, owner, additionalSigners);
            return [mangoAccountPk.toString(), txid];
        });
    }
    /**
     * Deposit tokens in a Mango Account
     *
     * @param rootBank The RootBank for the deposit currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param tokenAcc The token account to transfer from
     */
    deposit(mangoGroup, mangoAccount, owner, rootBank, nodeBank, vault, tokenAcc, quantity) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const tokenIndex = mangoGroup.getRootBankIndex(rootBank);
            const tokenMint = mangoGroup.tokens[tokenIndex].mint;
            let wrappedSolAccount = null;
            if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT) &&
                tokenAcc.toBase58() === owner.publicKey.toBase58()) {
                wrappedSolAccount = new web3_js_1.Keypair();
                const lamports = Math.round(quantity * web3_js_1.LAMPORTS_PER_SOL) + 1e7;
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: owner.publicKey,
                    newAccountPubkey: wrappedSolAccount.publicKey,
                    lamports,
                    space: 165,
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                transaction.add((0, token_instructions_1.initializeAccount)({
                    account: wrappedSolAccount.publicKey,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: owner.publicKey,
                }));
                additionalSigners.push(wrappedSolAccount);
            }
            const nativeQuantity = (0, utils_1.uiToNative)(quantity, mangoGroup.tokens[tokenIndex].decimals);
            const instruction = (0, instruction_1.makeDepositInstruction)(this.programId, mangoGroup.publicKey, owner.publicKey, mangoGroup.mangoCache, mangoAccount.publicKey, rootBank, nodeBank, vault, (_a = wrappedSolAccount === null || wrappedSolAccount === void 0 ? void 0 : wrappedSolAccount.publicKey) !== null && _a !== void 0 ? _a : tokenAcc, nativeQuantity);
            transaction.add(instruction);
            if (wrappedSolAccount) {
                transaction.add((0, token_instructions_1.closeAccount)({
                    source: wrappedSolAccount.publicKey,
                    destination: owner.publicKey,
                    owner: owner.publicKey,
                }));
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Withdraw tokens from a Mango Account
     *
     * @param rootBank The RootBank for the withdrawn currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param allowBorrow Whether to borrow tokens if there are not enough deposits for the withdrawal
     */
    withdraw(mangoGroup, mangoAccount, owner, rootBank, nodeBank, vault, quantity, allowBorrow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const tokenIndex = mangoGroup.getRootBankIndex(rootBank);
            const tokenMint = mangoGroup.tokens[tokenIndex].mint;
            let tokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, owner.publicKey);
            let wrappedSolAccount = null;
            if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
                wrappedSolAccount = new web3_js_1.Keypair();
                tokenAcc = wrappedSolAccount.publicKey;
                const space = 165;
                const lamports = yield this.connection.getMinimumBalanceForRentExemption(space, 'processed');
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: owner.publicKey,
                    newAccountPubkey: tokenAcc,
                    lamports,
                    space,
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                transaction.add((0, token_instructions_1.initializeAccount)({
                    account: tokenAcc,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: owner.publicKey,
                }));
                additionalSigners.push(wrappedSolAccount);
            }
            else {
                const tokenAccExists = yield this.connection.getAccountInfo(tokenAcc);
                if (!tokenAccExists) {
                    transaction.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, tokenAcc, owner.publicKey, owner.publicKey));
                }
            }
            const nativeQuantity = (0, utils_1.uiToNative)(quantity, mangoGroup.tokens[tokenIndex].decimals);
            const instruction = (0, instruction_1.makeWithdrawInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.mangoCache, rootBank, nodeBank, vault, tokenAcc, mangoGroup.signerKey, mangoAccount.spotOpenOrders, nativeQuantity, allowBorrow);
            transaction.add(instruction);
            if (wrappedSolAccount) {
                transaction.add((0, token_instructions_1.closeAccount)({
                    source: wrappedSolAccount.publicKey,
                    destination: owner.publicKey,
                    owner: owner.publicKey,
                }));
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Withdraw tokens from a Mango Account, only passing open orders accounts in the margin basket
     *
     * @param rootBank The RootBank for the withdrawn currency
     * @param nodeBank The NodeBank asociated with the RootBank
     * @param vault The token account asociated with the NodeBank
     * @param allowBorrow Whether to borrow tokens if there are not enough deposits for the withdrawal
     */
    withdraw2(mangoGroup, mangoAccount, owner, rootBank, nodeBank, vault, quantity, allowBorrow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const tokenIndex = mangoGroup.getRootBankIndex(rootBank);
            const tokenMint = mangoGroup.tokens[tokenIndex].mint;
            let tokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, owner.publicKey);
            let wrappedSolAccount = null;
            if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
                wrappedSolAccount = new web3_js_1.Keypair();
                tokenAcc = wrappedSolAccount.publicKey;
                const space = 165;
                const lamports = yield this.connection.getMinimumBalanceForRentExemption(space, 'processed');
                transaction.add(web3_js_1.SystemProgram.createAccount({
                    fromPubkey: owner.publicKey,
                    newAccountPubkey: tokenAcc,
                    lamports,
                    space,
                    programId: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                transaction.add((0, token_instructions_1.initializeAccount)({
                    account: tokenAcc,
                    mint: token_instructions_1.WRAPPED_SOL_MINT,
                    owner: owner.publicKey,
                }));
                additionalSigners.push(wrappedSolAccount);
            }
            else {
                const tokenAccExists = yield this.connection.getAccountInfo(tokenAcc);
                if (!tokenAccExists) {
                    transaction.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, tokenAcc, owner.publicKey, owner.publicKey));
                }
            }
            const nativeQuantity = (0, utils_1.uiToNative)(quantity, mangoGroup.tokens[tokenIndex].decimals);
            const instruction = (0, instruction_1.makeWithdrawInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.mangoCache, rootBank, nodeBank, vault, tokenAcc, mangoGroup.signerKey, mangoAccount.spotOpenOrders.filter((_, i) => mangoAccount.inMarginBasket[i]), nativeQuantity, allowBorrow);
            transaction.add(instruction);
            if (wrappedSolAccount) {
                transaction.add((0, token_instructions_1.closeAccount)({
                    source: wrappedSolAccount.publicKey,
                    destination: owner.publicKey,
                    owner: owner.publicKey,
                }));
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    withdrawAll(mangoGroup, mangoAccount, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transactionsAndSigners = [];
            for (const rootBank of mangoGroup.rootBankAccounts) {
                const transactionAndSigners = {
                    transaction: new web3_js_1.Transaction(),
                    signers: [],
                };
                if (rootBank) {
                    const tokenIndex = mangoGroup.getRootBankIndex(rootBank === null || rootBank === void 0 ? void 0 : rootBank.publicKey);
                    const tokenMint = mangoGroup.tokens[tokenIndex].mint;
                    // const decimals = mangoGroup.tokens[tokenIndex].decimals;
                    if (mangoAccount.deposits[tokenIndex].isPos()) {
                        let tokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, owner.publicKey);
                        let wrappedSolAccount = null;
                        if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
                            wrappedSolAccount = new web3_js_1.Keypair();
                            tokenAcc = wrappedSolAccount.publicKey;
                            const space = 165;
                            const lamports = yield this.connection.getMinimumBalanceForRentExemption(space, 'processed');
                            transactionAndSigners.transaction.add(web3_js_1.SystemProgram.createAccount({
                                fromPubkey: owner.publicKey,
                                newAccountPubkey: tokenAcc,
                                lamports,
                                space,
                                programId: spl_token_1.TOKEN_PROGRAM_ID,
                            }));
                            transactionAndSigners.transaction.add((0, token_instructions_1.initializeAccount)({
                                account: tokenAcc,
                                mint: token_instructions_1.WRAPPED_SOL_MINT,
                                owner: owner.publicKey,
                            }));
                            transactionAndSigners.signers.push(wrappedSolAccount);
                        }
                        else {
                            const tokenAccExists = yield this.connection.getAccountInfo(tokenAcc, 'recent');
                            if (!tokenAccExists) {
                                transactionAndSigners.transaction.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, tokenAcc, owner.publicKey, owner.publicKey));
                            }
                        }
                        const instruction = (0, instruction_1.makeWithdrawInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.mangoCache, rootBank.publicKey, rootBank.nodeBanks[0], rootBank.nodeBankAccounts[0].vault, tokenAcc, mangoGroup.signerKey, mangoAccount.spotOpenOrders, new bn_js_1.default('18446744073709551615'), // u64::MAX to withdraw errything
                        false);
                        transactionAndSigners.transaction.add(instruction);
                        if (wrappedSolAccount) {
                            transactionAndSigners.transaction.add((0, token_instructions_1.closeAccount)({
                                source: wrappedSolAccount.publicKey,
                                destination: owner.publicKey,
                                owner: owner.publicKey,
                            }));
                        }
                    }
                }
                transactionsAndSigners.push(transactionAndSigners);
            }
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer: owner,
                currentBlockhash,
            });
            if (signedTransactions) {
                for (const signedTransaction of signedTransactions) {
                    if (signedTransaction.instructions.length == 0) {
                        continue;
                    }
                    const txid = yield this.sendSignedTransaction({
                        signedTransaction,
                        signedAtBlock: currentBlockhash,
                    });
                    console.log(txid);
                }
            }
            else {
                throw new Error('Unable to sign Settle All transaction');
            }
        });
    }
    // Keeper functions
    /**
     * Called by the Keeper to cache interest rates from the RootBanks
     */
    cacheRootBanks(mangoGroup, mangoCache, rootBanks, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheRootBanksInstruction = (0, instruction_1.makeCacheRootBankInstruction)(this.programId, mangoGroup, mangoCache, rootBanks);
            const transaction = new web3_js_1.Transaction();
            transaction.add(cacheRootBanksInstruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Called by the Keeper to cache prices from the Oracles
     */
    cachePrices(mangoGroup, mangoCache, oracles, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachePricesInstruction = (0, instruction_1.makeCachePricesInstruction)(this.programId, mangoGroup, mangoCache, oracles);
            const transaction = new web3_js_1.Transaction();
            transaction.add(cachePricesInstruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Called by the Keeper to cache perp market funding
     */
    cachePerpMarkets(mangoGroup, mangoCache, perpMarkets, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachePerpMarketsInstruction = (0, instruction_1.makeCachePerpMarketsInstruction)(this.programId, mangoGroup, mangoCache, perpMarkets);
            const transaction = new web3_js_1.Transaction();
            transaction.add(cachePerpMarketsInstruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Called by the Keeper to update interest rates on the RootBanks
     */
    updateRootBank(mangoGroup, rootBank, nodeBanks, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRootBanksInstruction = (0, instruction_1.makeUpdateRootBankInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, rootBank, nodeBanks);
            const transaction = new web3_js_1.Transaction();
            transaction.add(updateRootBanksInstruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Called by the Keeper to process events on the Perp order book
     */
    consumeEvents(mangoGroup, perpMarket, mangoAccounts, payer, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumeEventsInstruction = (0, instruction_1.makeConsumeEventsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.eventQueue, mangoAccounts, limit);
            const transaction = new web3_js_1.Transaction();
            transaction.add(consumeEventsInstruction);
            return yield this.sendTransaction(transaction, payer, [], null);
        });
    }
    /**
     * Called by the Keeper to update funding on the perp markets
     */
    updateFunding(mangoGroup, mangoCache, perpMarket, bids, asks, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateFundingInstruction = (0, instruction_1.makeUpdateFundingInstruction)(this.programId, mangoGroup, mangoCache, perpMarket, bids, asks);
            const transaction = new web3_js_1.Transaction();
            transaction.add(updateFundingInstruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Retrieve information about a perp market
     */
    getPerpMarket(perpMarketPk, baseDecimal, quoteDecimal) {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = yield this.connection.getAccountInfo(perpMarketPk);
            const perpMarket = new PerpMarket_1.default(perpMarketPk, baseDecimal, quoteDecimal, layout_1.PerpMarketLayout.decode(acc === null || acc === void 0 ? void 0 : acc.data));
            return perpMarket;
        });
    }
    /**
     * Place an order on a perp market
     *
     * @param clientOrderId An optional id that can be used to correlate events related to your order
     * @param bookSideInfo Account info for asks if side === bid, bids if side === ask. If this is given, crank instruction is added
     */
    placePerpOrder(mangoGroup, mangoAccount, mangoCache, // TODO - remove; already in MangoGroup
    perpMarket, owner, side, price, quantity, orderType, clientOrderId = 0, bookSideInfo, reduceOnly, referrerMangoAccountPk) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const [nativePrice, nativeQuantity] = perpMarket.uiToNativePriceQuantity(price, quantity);
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const instruction = (0, instruction_1.makePlacePerpOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, perpMarket.eventQueue, mangoAccount.spotOpenOrders, nativePrice, nativeQuantity, new bn_js_1.default(clientOrderId), side, orderType, reduceOnly, referrerMangoAccountPk);
            transaction.add(instruction);
            if (bookSideInfo) {
                // If this data is already parsed as BookSide, use that instead of decoding again
                let bookSide = bookSideInfo['parsed'];
                if (bookSide === undefined) {
                    bookSide = bookSideInfo.data
                        ? new book_1.BookSide(side === 'buy' ? perpMarket.asks : perpMarket.bids, perpMarket, layout_1.BookSideLayout.decode(bookSideInfo.data))
                        : [];
                }
                const accounts = new Set();
                accounts.add(mangoAccount.publicKey.toBase58());
                for (const order of bookSide) {
                    accounts.add(order.owner.toBase58());
                    if (accounts.size >= 10) {
                        break;
                    }
                }
                const consumeInstruction = (0, instruction_1.makeConsumeEventsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.eventQueue, Array.from(accounts)
                    .map((s) => new web3_js_1.PublicKey(s))
                    .sort(), new bn_js_1.default(4));
                transaction.add(consumeInstruction);
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Place an order on a perp market
     *
     * @param clientOrderId An optional id that can be used to correlate events related to your order
     * @param bookSideInfo Account info for asks if side === bid, bids if side === ask. If this is given, crank instruction is added
     * @param expiryTimestamp Absolute: 0 for never expire, othereise future expiry timestamp in seconds. Relative: expiry offset in seconds
     * @param expiryType Since there is an unknown delay from sending a transaction to the transaction being processed, Absolute expiry usually preferred.
     */
    placePerpOrder2(mangoGroup, mangoAccount, perpMarket, owner, side, price, quantity, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            options = options ? options : {};
            let { maxQuoteQuantity, limit, orderType, clientOrderId, bookSideInfo, reduceOnly, referrerMangoAccountPk, expiryTimestamp, expiryType, } = options;
            limit = limit || 20;
            clientOrderId = clientOrderId === undefined ? 0 : clientOrderId;
            orderType = orderType || 'limit';
            const [nativePrice, nativeQuantity] = perpMarket.uiToNativePriceQuantity(price, quantity);
            const maxQuoteQuantityLots = maxQuoteQuantity
                ? perpMarket.uiQuoteToLots(maxQuoteQuantity)
                : utils_1.I64_MAX_BN;
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const instruction = (0, instruction_1.makePlacePerpOrder2Instruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, perpMarket.eventQueue, mangoAccount.getOpenOrdersKeysInBasketPacked(), nativePrice, nativeQuantity, maxQuoteQuantityLots, new bn_js_1.default(clientOrderId), side, new bn_js_1.default(limit), orderType, reduceOnly, referrerMangoAccountPk, expiryTimestamp ? new bn_js_1.default(Math.floor(expiryTimestamp)) : utils_1.ZERO_BN, expiryType ? expiryType : 'absolute');
            transaction.add(instruction);
            if (bookSideInfo) {
                // If this data is already parsed as BookSide, use that instead of decoding again
                let bookSide = bookSideInfo['parsed'];
                if (bookSide === undefined) {
                    bookSide = bookSideInfo.data
                        ? new book_1.BookSide(side === 'buy' ? perpMarket.asks : perpMarket.bids, perpMarket, layout_1.BookSideLayout.decode(bookSideInfo.data))
                        : [];
                }
                const accounts = new Set();
                accounts.add(mangoAccount.publicKey.toBase58());
                for (const order of bookSide) {
                    accounts.add(order.owner.toBase58());
                    if (accounts.size >= 10) {
                        break;
                    }
                }
                if (accounts.size > 1) {
                    const consumeInstruction = (0, instruction_1.makeConsumeEventsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.eventQueue, Array.from(accounts)
                        .map((s) => new web3_js_1.PublicKey(s))
                        .sort(), new bn_js_1.default(4));
                    transaction.add(consumeInstruction);
                }
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Cancel an order on a perp market
     *
     * @param invalidIdOk Don't throw error if order is invalid
     */
    cancelPerpOrder(mangoGroup, mangoAccount, owner, perpMarket, order, invalidIdOk = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeCancelPerpOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, order, invalidIdOk);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Cancel all perp orders across all markets
     */
    cancelAllPerpOrders(group, perpMarkets, mangoAccount, owner, ownerIsSigner = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            let tx = new web3_js_1.Transaction();
            const transactions = [];
            // Determine which market indexes have open orders
            const hasOrders = new Array(group.perpMarkets.length).fill(false);
            for (let i = 0; i < mangoAccount.orderMarket.length; i++) {
                if (mangoAccount.orderMarket[i] !== layout_1.FREE_ORDER_SLOT) {
                    hasOrders[mangoAccount.orderMarket[i]] = true;
                }
            }
            for (let i = 0; i < group.perpMarkets.length; i++) {
                if (!hasOrders[i])
                    continue;
                const pmi = group.perpMarkets[i];
                if (pmi.isEmpty())
                    continue;
                const perpMarket = perpMarkets.find((pm) => pm.publicKey.equals(pmi.perpMarket));
                if (perpMarket === undefined)
                    continue;
                const cancelAllInstr = (0, instruction_1.makeCancelAllPerpOrdersInstruction)(this.programId, group.publicKey, mangoAccount.publicKey, ownerIsSigner ? owner.publicKey : mangoAccount.owner, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, new bn_js_1.default(20), ownerIsSigner);
                tx.add(cancelAllInstr);
                if (tx.instructions.length === 2) {
                    transactions.push(tx);
                    tx = new web3_js_1.Transaction();
                }
            }
            if (tx.instructions.length > 0) {
                transactions.push(tx);
            }
            const transactionsAndSigners = transactions.map((tx) => ({
                transaction: tx,
                signers: [],
            }));
            if (transactionsAndSigners.length === 0) {
                throw new Error('No orders to cancel');
            }
            // Sign multiple transactions at once for better UX
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer: owner,
                currentBlockhash,
            });
            if (signedTransactions) {
                return yield Promise.all(signedTransactions.map((signedTransaction) => this.sendSignedTransaction({
                    signedTransaction,
                    signedAtBlock: currentBlockhash,
                })));
            }
            else {
                throw new Error('Unable to sign all CancelAllPerpOrders transactions');
            }
        });
    }
    /**
     * Add a new oracle to a group
     */
    addOracle(mangoGroup, oracle, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeAddOracleInstruction)(this.programId, mangoGroup.publicKey, oracle, admin.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    /**
     * Set the price of a 'stub' type oracle
     */
    setOracle(mangoGroup, oracle, admin, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeSetOracleInstruction)(this.programId, mangoGroup.publicKey, oracle, admin.publicKey, price);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    addSpotMarket(mangoGroup, oracle, spotMarket, mint, admin, maintLeverage, initLeverage, liquidationFee, optimalUtil, optimalRate, maxRate) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaultAccount = new web3_js_1.Keypair();
            const vaultAccountInstructions = yield (0, utils_1.createTokenAccountInstructions)(this.connection, admin.publicKey, vaultAccount.publicKey, mint, mangoGroup.signerKey);
            const nodeBankAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.NodeBankLayout.span, this.programId);
            const rootBankAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.RootBankLayout.span, this.programId);
            const instruction = (0, instruction_1.makeAddSpotMarketInstruction)(this.programId, mangoGroup.publicKey, oracle, spotMarket, mangoGroup.dexProgramId, mint, nodeBankAccountInstruction.account.publicKey, vaultAccount.publicKey, rootBankAccountInstruction.account.publicKey, admin.publicKey, fixednum_1.I80F48.fromNumber(maintLeverage), fixednum_1.I80F48.fromNumber(initLeverage), fixednum_1.I80F48.fromNumber(liquidationFee), fixednum_1.I80F48.fromNumber(optimalUtil), fixednum_1.I80F48.fromNumber(optimalRate), fixednum_1.I80F48.fromNumber(maxRate));
            const transaction = new web3_js_1.Transaction();
            transaction.add(...vaultAccountInstructions);
            transaction.add(nodeBankAccountInstruction.instruction);
            transaction.add(rootBankAccountInstruction.instruction);
            transaction.add(instruction);
            const additionalSigners = [
                vaultAccount,
                nodeBankAccountInstruction.account,
                rootBankAccountInstruction.account,
            ];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    /**
     * Make sure mangoAccount has recent and valid inMarginBasket and spotOpenOrders
     */
    placeSpotOrder(mangoGroup, mangoAccount, mangoCache, spotMarket, owner, side, price, size, orderType, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const limitPrice = spotMarket.priceNumberToLots(price);
            const maxBaseQuantity = spotMarket.baseSizeNumberToLots(size);
            // TODO implement srm vault fee discount
            // const feeTier = getFeeTier(0, nativeToUi(mangoGroup.nativeSrm || 0, SRM_DECIMALS));
            const feeTier = (0, serum_1.getFeeTier)(0, (0, utils_1.nativeToUi)(0, 0));
            const rates = (0, serum_1.getFeeRates)(feeTier);
            const maxQuoteQuantity = new bn_js_1.default(spotMarket['_decoded'].quoteLotSize.toNumber() * (1 + rates.taker)).mul(spotMarket
                .baseSizeNumberToLots(size)
                .mul(spotMarket.priceNumberToLots(price)));
            if (maxBaseQuantity.lte(utils_1.ZERO_BN)) {
                throw new Error('size too small');
            }
            if (limitPrice.lte(utils_1.ZERO_BN)) {
                throw new Error('invalid price');
            }
            const selfTradeBehavior = 'decrementTake';
            clientId = clientId !== null && clientId !== void 0 ? clientId : new bn_js_1.default(Date.now());
            const spotMarketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            if (!mangoGroup.rootBankAccounts.filter((a) => !!a).length) {
                yield mangoGroup.loadRootBanks(this.connection);
            }
            const baseRootBank = mangoGroup.rootBankAccounts[spotMarketIndex];
            const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
            if (!baseRootBank || !baseNodeBank || !quoteRootBank || !quoteNodeBank) {
                throw new Error('Invalid or missing banks');
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const openOrdersKeys = [];
            // Only pass in open orders if in margin basket or current market index, and
            // the only writable account should be OpenOrders for current market index
            for (let i = 0; i < mangoAccount.spotOpenOrders.length; i++) {
                let pubkey = utils_1.zeroKey;
                let isWritable = false;
                if (i === spotMarketIndex) {
                    isWritable = true;
                    if (mangoAccount.spotOpenOrders[spotMarketIndex].equals(utils_1.zeroKey)) {
                        // open orders missing for this market; create a new one now
                        const openOrdersSpace = serum_1.OpenOrders.getLayout(mangoGroup.dexProgramId).span;
                        const openOrdersLamports = yield this.connection.getMinimumBalanceForRentExemption(openOrdersSpace, 'processed');
                        const accInstr = yield (0, utils_1.createAccountInstruction)(this.connection, owner.publicKey, openOrdersSpace, mangoGroup.dexProgramId, openOrdersLamports);
                        const initOpenOrders = (0, instruction_1.makeInitSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.dexProgramId, accInstr.account.publicKey, spotMarket.publicKey, mangoGroup.signerKey);
                        const initTx = new web3_js_1.Transaction();
                        initTx.add(accInstr.instruction);
                        initTx.add(initOpenOrders);
                        yield this.sendTransaction(initTx, owner, [accInstr.account]);
                        pubkey = accInstr.account.publicKey;
                    }
                    else {
                        pubkey = mangoAccount.spotOpenOrders[i];
                    }
                }
                else if (mangoAccount.inMarginBasket[i]) {
                    pubkey = mangoAccount.spotOpenOrders[i];
                }
                openOrdersKeys.push({ pubkey, isWritable });
            }
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const placeOrderInstruction = (0, instruction_1.makePlaceSpotOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoCache, spotMarket.programId, spotMarket.publicKey, spotMarket['_decoded'].bids, spotMarket['_decoded'].asks, spotMarket['_decoded'].requestQueue, spotMarket['_decoded'].eventQueue, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, baseRootBank.publicKey, baseNodeBank.publicKey, baseNodeBank.vault, quoteRootBank.publicKey, quoteNodeBank.publicKey, quoteNodeBank.vault, mangoGroup.signerKey, dexSigner, mangoGroup.srmVault, // TODO: choose msrm vault if it has any deposits
            openOrdersKeys, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, selfTradeBehavior, orderType, clientId);
            transaction.add(placeOrderInstruction);
            if (spotMarketIndex > 0) {
                console.log(spotMarketIndex - 1, mangoAccount.spotOpenOrders[spotMarketIndex - 1].toBase58(), openOrdersKeys[spotMarketIndex - 1].pubkey.toBase58());
            }
            const txid = yield this.sendTransaction(transaction, owner, additionalSigners);
            // update MangoAccount to have new OpenOrders pubkey
            mangoAccount.spotOpenOrders[spotMarketIndex] =
                openOrdersKeys[spotMarketIndex].pubkey;
            mangoAccount.inMarginBasket[spotMarketIndex] = true;
            console.log(spotMarketIndex, mangoAccount.spotOpenOrders[spotMarketIndex].toBase58(), openOrdersKeys[spotMarketIndex].pubkey.toBase58());
            return txid;
        });
    }
    /**
     * Make sure mangoAccount has recent and valid inMarginBasket and spotOpenOrders
     */
    placeSpotOrder2(mangoGroup, mangoAccount, spotMarket, owner, side, price, size, orderType, clientOrderId, useMsrmVault) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const limitPrice = spotMarket.priceNumberToLots(price);
            const maxBaseQuantity = spotMarket.baseSizeNumberToLots(size);
            const allTransactions = [];
            // TODO implement srm vault fee discount
            // const feeTier = getFeeTier(0, nativeToUi(mangoGroup.nativeSrm || 0, SRM_DECIMALS));
            const feeTier = (0, serum_1.getFeeTier)(0, (0, utils_1.nativeToUi)(0, 0));
            const rates = (0, serum_1.getFeeRates)(feeTier);
            const maxQuoteQuantity = new bn_js_1.default(spotMarket['_decoded'].quoteLotSize.toNumber() * (1 + rates.taker)).mul(spotMarket
                .baseSizeNumberToLots(size)
                .mul(spotMarket.priceNumberToLots(price)));
            if (maxBaseQuantity.lte(utils_1.ZERO_BN)) {
                throw new Error('size too small');
            }
            if (limitPrice.lte(utils_1.ZERO_BN)) {
                throw new Error('invalid price');
            }
            const selfTradeBehavior = 'decrementTake';
            const spotMarketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            if (!mangoGroup.rootBankAccounts.filter((a) => !!a).length) {
                yield mangoGroup.loadRootBanks(this.connection);
            }
            let feeVault;
            if (useMsrmVault) {
                feeVault = mangoGroup.msrmVault;
            }
            else if (useMsrmVault === false) {
                feeVault = mangoGroup.srmVault;
            }
            else {
                const totalMsrm = yield this.connection.getTokenAccountBalance(mangoGroup.msrmVault);
                feeVault =
                    ((_a = totalMsrm === null || totalMsrm === void 0 ? void 0 : totalMsrm.value) === null || _a === void 0 ? void 0 : _a.uiAmount) && totalMsrm.value.uiAmount > 0
                        ? mangoGroup.msrmVault
                        : mangoGroup.srmVault;
            }
            const baseRootBank = mangoGroup.rootBankAccounts[spotMarketIndex];
            const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
            if (!baseRootBank || !baseNodeBank || !quoteRootBank || !quoteNodeBank) {
                throw new Error('Invalid or missing banks');
            }
            const transaction = new web3_js_1.Transaction();
            const openOrdersKeys = [];
            // Only pass in open orders if in margin basket or current market index, and
            // the only writable account should be OpenOrders for current market index
            let marketOpenOrdersKey = utils_1.zeroKey;
            const initTx = new web3_js_1.Transaction();
            for (let i = 0; i < mangoAccount.spotOpenOrders.length; i++) {
                let pubkey = utils_1.zeroKey;
                let isWritable = false;
                if (i === spotMarketIndex) {
                    isWritable = true;
                    if (mangoAccount.spotOpenOrders[spotMarketIndex].equals(utils_1.zeroKey)) {
                        const spotMarketIndexBN = new bn_js_1.default(spotMarketIndex);
                        const [openOrdersPk] = yield web3_js_1.PublicKey.findProgramAddress([
                            mangoAccount.publicKey.toBytes(),
                            spotMarketIndexBN.toArrayLike(Buffer, 'le', 8),
                            new Buffer('OpenOrders', 'utf-8'),
                        ], this.programId);
                        const initOpenOrders = (0, instruction_2.makeCreateSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.dexProgramId, openOrdersPk, spotMarket.publicKey, mangoGroup.signerKey);
                        initTx.add(initOpenOrders);
                        allTransactions.push(initTx);
                        pubkey = openOrdersPk;
                    }
                    else {
                        pubkey = mangoAccount.spotOpenOrders[i];
                    }
                    marketOpenOrdersKey = pubkey;
                }
                else if (mangoAccount.inMarginBasket[i]) {
                    pubkey = mangoAccount.spotOpenOrders[i];
                }
                // new design does not require zero keys to be passed in
                if (!pubkey.equals(utils_1.zeroKey)) {
                    openOrdersKeys.push({ pubkey, isWritable });
                }
            }
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const placeOrderInstruction = (0, instruction_1.makePlaceSpotOrder2Instruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.mangoCache, spotMarket.programId, spotMarket.publicKey, spotMarket['_decoded'].bids, spotMarket['_decoded'].asks, spotMarket['_decoded'].requestQueue, spotMarket['_decoded'].eventQueue, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, baseRootBank.publicKey, baseNodeBank.publicKey, baseNodeBank.vault, quoteRootBank.publicKey, quoteNodeBank.publicKey, quoteNodeBank.vault, mangoGroup.signerKey, dexSigner, feeVault, openOrdersKeys, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, selfTradeBehavior, orderType, clientOrderId !== null && clientOrderId !== void 0 ? clientOrderId : new bn_js_1.default(Date.now()));
            transaction.add(placeOrderInstruction);
            allTransactions.push(transaction);
            const signers = [];
            const transactionsAndSigners = allTransactions.map((tx) => ({
                transaction: tx,
                signers,
            }));
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer: owner,
                currentBlockhash,
            });
            const txids = [];
            if (signedTransactions) {
                for (const signedTransaction of signedTransactions) {
                    if (signedTransaction.instructions.length == 0) {
                        continue;
                    }
                    const txid = yield this.sendSignedTransaction({
                        signedTransaction,
                        signedAtBlock: currentBlockhash,
                    });
                    txids.push(txid);
                }
                // update MangoAccount to have new OpenOrders pubkey
                // We know this new key is in margin basket because if it was a full taker trade
                // there is some leftover from fee rebate. If maker trade there's the order.
                // and if it failed then we already exited before this line
                mangoAccount.spotOpenOrders[spotMarketIndex] = marketOpenOrdersKey;
                mangoAccount.inMarginBasket[spotMarketIndex] = true;
            }
            else {
                throw new Error('Unable to sign Settle All transaction');
            }
            return txids;
        });
    }
    cancelSpotOrder(mangoGroup, mangoAccount, owner, spotMarket, order) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const instruction = (0, instruction_1.makeCancelSpotOrderInstruction)(this.programId, mangoGroup.publicKey, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, spotMarket['_decoded'].bids, spotMarket['_decoded'].asks, order.openOrdersAddress, mangoGroup.signerKey, spotMarket['_decoded'].eventQueue, order);
            transaction.add(instruction);
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const marketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            if (!mangoGroup.rootBankAccounts.length) {
                yield mangoGroup.loadRootBanks(this.connection);
            }
            const baseRootBank = mangoGroup.rootBankAccounts[marketIndex];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
            const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
            if (!baseNodeBank || !quoteNodeBank) {
                throw new Error('Invalid or missing node banks');
            }
            const settleFundsInstruction = (0, instruction_1.makeSettleFundsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, mangoAccount.spotOpenOrders[marketIndex], mangoGroup.signerKey, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, mangoGroup.tokens[marketIndex].rootBank, baseNodeBank.publicKey, mangoGroup.tokens[layout_1.QUOTE_INDEX].rootBank, quoteNodeBank.publicKey, baseNodeBank.vault, quoteNodeBank.vault, dexSigner);
            transaction.add(settleFundsInstruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    settleFunds(mangoGroup, mangoAccount, owner, spotMarket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const marketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            if (!mangoGroup.rootBankAccounts.length) {
                yield mangoGroup.loadRootBanks(this.connection);
            }
            const baseRootBank = mangoGroup.rootBankAccounts[marketIndex];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
            const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
            if (!baseNodeBank || !quoteNodeBank) {
                throw new Error('Invalid or missing node banks');
            }
            const instruction = (0, instruction_1.makeSettleFundsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, mangoAccount.spotOpenOrders[marketIndex], mangoGroup.signerKey, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, mangoGroup.tokens[marketIndex].rootBank, baseNodeBank.publicKey, mangoGroup.tokens[layout_1.QUOTE_INDEX].rootBank, quoteNodeBank.publicKey, baseNodeBank.vault, quoteNodeBank.vault, dexSigner);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    /**
     * Assumes spotMarkets contains all Markets in MangoGroup in order
     */
    settleAll(mangoGroup, mangoAccount, spotMarkets, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transactions = [];
            let j = 0;
            for (let i = 0; i < mangoGroup.spotMarkets.length; i++) {
                if (mangoGroup.spotMarkets[i].isEmpty())
                    continue;
                const spotMarket = spotMarkets[j];
                j++;
                const transaction = new web3_js_1.Transaction();
                const openOrdersAccount = mangoAccount.spotOpenOrdersAccounts[i];
                if (openOrdersAccount === undefined)
                    continue;
                if (openOrdersAccount.quoteTokenFree.toNumber() +
                    openOrdersAccount['referrerRebatesAccrued'].toNumber() ===
                    0 &&
                    openOrdersAccount.baseTokenFree.toNumber() === 0) {
                    continue;
                }
                const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                    spotMarket.publicKey.toBuffer(),
                    spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
                ], spotMarket.programId);
                if (!mangoGroup.rootBankAccounts.length) {
                    yield mangoGroup.loadRootBanks(this.connection);
                }
                const baseRootBank = mangoGroup.rootBankAccounts[i];
                const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
                const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
                const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
                if (!baseNodeBank || !quoteNodeBank) {
                    throw new Error('Invalid or missing node banks');
                }
                const instruction = (0, instruction_1.makeSettleFundsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, mangoAccount.spotOpenOrders[i], mangoGroup.signerKey, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, mangoGroup.tokens[i].rootBank, baseNodeBank.publicKey, mangoGroup.tokens[layout_1.QUOTE_INDEX].rootBank, quoteNodeBank.publicKey, baseNodeBank.vault, quoteNodeBank.vault, dexSigner);
                transaction.add(instruction);
                transactions.push(transaction);
            }
            const signers = [];
            const transactionsAndSigners = transactions.map((tx) => ({
                transaction: tx,
                signers,
            }));
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer: owner,
                currentBlockhash,
            });
            const txids = [];
            if (signedTransactions) {
                for (const signedTransaction of signedTransactions) {
                    if (signedTransaction.instructions.length == 0) {
                        continue;
                    }
                    const txid = yield this.sendSignedTransaction({
                        signedTransaction,
                        signedAtBlock: currentBlockhash,
                    });
                    txids.push(txid);
                }
            }
            else {
                throw new Error('Unable to sign Settle All transaction');
            }
            return txids;
        });
    }
    fetchTopPnlAccountsFromRPC(mangoGroup, mangoCache, perpMarket, price, // should be the MangoCache price
    sign, mangoAccounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketIndex = mangoGroup.getPerpMarketIndex(perpMarket.publicKey);
            const perpMarketInfo = mangoGroup.perpMarkets[marketIndex];
            if (mangoAccounts === undefined) {
                mangoAccounts = yield this.getAllMangoAccounts(mangoGroup, [], false);
            }
            return mangoAccounts
                .map((m) => ({
                publicKey: m.publicKey,
                pnl: m.perpAccounts[marketIndex].getPnl(perpMarketInfo, mangoCache.perpMarketCache[marketIndex], price),
            }))
                .sort((a, b) => sign * a.pnl.cmp(b.pnl));
        });
    }
    fetchTopPnlAccountsFromDB(mangoGroup, perpMarket, sign) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketIndex = mangoGroup.getPerpMarketIndex(perpMarket.publicKey);
            const order = sign === 1 ? 'ASC' : 'DESC';
            const response = yield (0, cross_fetch_1.default)(`https://mango-transaction-log.herokuapp.com/v3/stats/ranked-pnl?market-index=${marketIndex}&order=${order}&limit=20`);
            const data = yield response.json();
            return data.map((m) => ({
                publicKey: new web3_js_1.PublicKey(m.pubkey),
                pnl: fixednum_1.I80F48.fromNumber(m.pnl),
            }));
        });
    }
    /**
     * Automatically fetch MangoAccounts for this PerpMarket
     * Pick enough MangoAccounts that have opposite sign and send them in to get settled
     */
    settlePnl(mangoGroup, mangoCache, mangoAccount, perpMarket, quoteRootBank, price, // should be the MangoCache price
    owner, mangoAccounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketIndex = mangoGroup.getPerpMarketIndex(perpMarket.publicKey);
            const perpMarketInfo = mangoGroup.perpMarkets[marketIndex];
            let pnl = mangoAccount.perpAccounts[marketIndex].getPnl(perpMarketInfo, mangoCache.perpMarketCache[marketIndex], price);
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            let sign;
            if (pnl.eq(fixednum_1.ZERO_I80F48)) {
                // Can't settle pnl if there is no pnl
                return null;
            }
            else if (pnl.gt(fixednum_1.ZERO_I80F48)) {
                sign = 1;
            }
            else {
                // Can settle fees first against perpmarket
                sign = -1;
                if (!quoteRootBank.nodeBankAccounts) {
                    yield quoteRootBank.loadNodeBanks(this.connection);
                }
                const settleFeesInstr = (0, instruction_1.makeSettleFeesInstruction)(this.programId, mangoGroup.publicKey, mangoCache.publicKey, perpMarket.publicKey, mangoAccount.publicKey, quoteRootBank.publicKey, quoteRootBank.nodeBanks[0], quoteRootBank.nodeBankAccounts[0].vault, mangoGroup.feesVault, mangoGroup.signerKey);
                transaction.add(settleFeesInstr);
                pnl = pnl.add(perpMarket.feesAccrued).min(fixednum_1.I80F48.fromString('-0.000001'));
                const remSign = pnl.gt(fixednum_1.ZERO_I80F48) ? 1 : -1;
                if (remSign !== sign) {
                    // if pnl has changed sign, then we're done
                    return yield this.sendTransaction(transaction, owner, additionalSigners);
                }
            }
            // we don't maintain an off chain service for finding accounts for
            // devnet, so use fetchTopPnlAccountsFromDB only for mainnet
            let accountsWithPnl;
            if (this.isMainnet()) {
                try {
                    accountsWithPnl = yield this.fetchTopPnlAccountsFromDB(mangoGroup, perpMarket, sign);
                }
                catch (e) {
                    console.error(`fetchTopPnlAccountsFromDB failed, ${e}`);
                }
            }
            // if not set, then always fallback
            if (!accountsWithPnl) {
                accountsWithPnl = yield this.fetchTopPnlAccountsFromRPC(mangoGroup, mangoCache, perpMarket, price, sign, mangoAccounts);
            }
            for (const account of accountsWithPnl) {
                // ignore own account explicitly
                if (account.publicKey.equals(mangoAccount.publicKey)) {
                    continue;
                }
                if (((pnl.isPos() && account.pnl.isNeg()) ||
                    (pnl.isNeg() && account.pnl.isPos())) &&
                    transaction.instructions.length < 10) {
                    // Account pnl must have opposite signs
                    const instr = (0, instruction_1.makeSettlePnlInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, account.publicKey, mangoGroup.mangoCache, quoteRootBank.publicKey, quoteRootBank.nodeBanks[0], new bn_js_1.default(marketIndex));
                    transaction.add(instr);
                    pnl = pnl.add(account.pnl);
                    // if pnl has changed sign, then we're done
                    const remSign = pnl.gt(fixednum_1.ZERO_I80F48) ? 1 : -1;
                    if (remSign !== sign) {
                        break;
                    }
                }
                else {
                    // means we ran out of accounts to settle against (shouldn't happen) OR transaction too big
                    // TODO - create a multi tx to be signed by user
                    continue;
                }
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
            // Calculate the profit or loss per market
        });
    }
    /**
     * Settle all perp accounts with positive pnl
     */
    settlePosPnl(mangoGroup, mangoCache, mangoAccount, perpMarkets, quoteRootBank, owner, mangoAccounts) {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch all MangoAccounts filtered for having this perp market in basket
            // only if we didn't fetch them already or have the settlePnl service connected
            if (mangoAccounts === undefined && !this.isMainnet()) {
                mangoAccounts = yield this.getAllMangoAccounts(mangoGroup, [], false);
            }
            const signatures = yield Promise.all(perpMarkets.map((pm) => {
                const marketIndex = mangoGroup.getPerpMarketIndex(pm.publicKey);
                const perpMarketInfo = mangoGroup.perpMarkets[marketIndex];
                const price = mangoCache.getPrice(marketIndex);
                const pnl = mangoAccount.perpAccounts[marketIndex].getPnl(perpMarketInfo, mangoCache.perpMarketCache[marketIndex], price);
                return pnl.isPos()
                    ? this.settlePnl(mangoGroup, mangoCache, mangoAccount, pm, quoteRootBank, mangoCache.getPrice(marketIndex), owner, mangoAccounts)
                    : (0, utils_1.promiseNull)();
            }));
            function filterNulls(value) {
                if (value === null)
                    return false;
                return true;
            }
            const filtered = signatures === null || signatures === void 0 ? void 0 : signatures.filter(filterNulls);
            return (filtered === null || filtered === void 0 ? void 0 : filtered.length) ? filtered : undefined;
        });
    }
    /**
     * Settle all perp accounts with any pnl
     */
    settleAllPerpPnl(mangoGroup, mangoCache, mangoAccount, perpMarkets, quoteRootBank, owner, mangoAccounts) {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch all MangoAccounts filtered for having this perp market in basket
            // only if we didn't fetch them already or have the settlePnl service connected
            if (mangoAccounts === undefined && !this.isMainnet()) {
                mangoAccounts = yield this.getAllMangoAccounts(mangoGroup, [], false);
            }
            return yield Promise.all(perpMarkets.map((pm) => {
                const marketIndex = mangoGroup.getPerpMarketIndex(pm.publicKey);
                const perpMarketInfo = mangoGroup.perpMarkets[marketIndex];
                const price = mangoCache.getPrice(marketIndex);
                const pnl = mangoAccount.perpAccounts[marketIndex].getPnl(perpMarketInfo, mangoCache.perpMarketCache[marketIndex], price);
                return !pnl.isZero()
                    ? this.settlePnl(mangoGroup, mangoCache, mangoAccount, pm, quoteRootBank, mangoCache.getPrice(marketIndex), owner, mangoAccounts)
                    : (0, utils_1.promiseNull)();
            }));
        });
    }
    getMangoAccountsForOwner(mangoGroup, owner, includeOpenOrders = false) {
        const filters = [
            {
                memcmp: {
                    offset: layout_1.MangoAccountLayout.offsetOf('owner'),
                    bytes: owner.toBase58(),
                },
            },
        ];
        return this.getAllMangoAccounts(mangoGroup, filters, includeOpenOrders);
    }
    /**
     * Get all MangoAccounts where `delegate` pubkey has authority
     */
    getMangoAccountsForDelegate(mangoGroup, delegate, includeOpenOrders = false) {
        const filters = [
            {
                memcmp: {
                    offset: layout_1.MangoAccountLayout.offsetOf('delegate'),
                    bytes: delegate.toBase58(),
                },
            },
        ];
        return this.getAllMangoAccounts(mangoGroup, filters, includeOpenOrders);
    }
    getAllMangoAccounts(mangoGroup, filters, includeOpenOrders = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountFilters = [
                {
                    memcmp: {
                        offset: layout_1.MangoAccountLayout.offsetOf('mangoGroup'),
                        bytes: mangoGroup.publicKey.toBase58(),
                    },
                },
                {
                    dataSize: layout_1.MangoAccountLayout.span,
                },
            ];
            if (filters && filters.length) {
                accountFilters.push(...filters);
            }
            const mangoAccounts = yield (0, utils_1.getFilteredProgramAccounts)(this.connection, this.programId, accountFilters).then((accounts) => accounts.map(({ publicKey, accountInfo }) => {
                return new MangoAccount_1.default(publicKey, layout_1.MangoAccountLayout.decode(accountInfo == null ? undefined : accountInfo.data));
            }));
            if (includeOpenOrders) {
                const openOrderPks = mangoAccounts
                    .map((ma) => ma.spotOpenOrders.filter((pk) => !pk.equals(utils_1.zeroKey)))
                    .flat();
                const openOrderAccountInfos = yield (0, utils_1.getMultipleAccounts)(this.connection, openOrderPks);
                const openOrders = openOrderAccountInfos.map(({ publicKey, accountInfo }) => serum_1.OpenOrders.fromAccountInfo(publicKey, accountInfo, mangoGroup.dexProgramId));
                const pkToOpenOrdersAccount = {};
                openOrders.forEach((openOrdersAccount) => {
                    pkToOpenOrdersAccount[openOrdersAccount.publicKey.toBase58()] =
                        openOrdersAccount;
                });
                for (const ma of mangoAccounts) {
                    for (let i = 0; i < ma.spotOpenOrders.length; i++) {
                        if (ma.spotOpenOrders[i].toBase58() in pkToOpenOrdersAccount) {
                            ma.spotOpenOrdersAccounts[i] =
                                pkToOpenOrdersAccount[ma.spotOpenOrders[i].toBase58()];
                        }
                    }
                }
            }
            return mangoAccounts;
        });
    }
    addStubOracle(mangoGroupPk, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const createOracleAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.StubOracleLayout.span, this.programId);
            const instruction = (0, instruction_1.makeAddOracleInstruction)(this.programId, mangoGroupPk, createOracleAccountInstruction.account.publicKey, admin.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(createOracleAccountInstruction.instruction);
            transaction.add(instruction);
            const additionalSigners = [createOracleAccountInstruction.account];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    setStubOracle(mangoGroupPk, oraclePk, admin, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeSetOracleInstruction)(this.programId, mangoGroupPk, oraclePk, admin.publicKey, fixednum_1.I80F48.fromNumber(price));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    addPerpMarket(mangoGroup, oraclePk, mngoMintPk, admin, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, baseLotSize, quoteLotSize, maxNumEvents, rate, // liquidity mining params; set rate == 0 if no liq mining
    maxDepthBps, targetPeriodLength, mngoPerPeriod, exp) {
        return __awaiter(this, void 0, void 0, function* () {
            const makePerpMarketAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.PerpMarketLayout.span, this.programId);
            const makeEventQueueAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.PerpEventQueueHeaderLayout.span + maxNumEvents * layout_1.PerpEventLayout.span, this.programId);
            const makeBidAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.BookSideLayout.span, this.programId);
            const makeAskAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.BookSideLayout.span, this.programId);
            const mngoVaultAccount = new web3_js_1.Keypair();
            const mngoVaultAccountInstructions = yield (0, utils_1.createTokenAccountInstructions)(this.connection, admin.publicKey, mngoVaultAccount.publicKey, mngoMintPk, mangoGroup.signerKey);
            const instruction = yield (0, instruction_1.makeAddPerpMarketInstruction)(this.programId, mangoGroup.publicKey, oraclePk, makePerpMarketAccountInstruction.account.publicKey, makeEventQueueAccountInstruction.account.publicKey, makeBidAccountInstruction.account.publicKey, makeAskAccountInstruction.account.publicKey, mngoVaultAccount.publicKey, admin.publicKey, fixednum_1.I80F48.fromNumber(maintLeverage), fixednum_1.I80F48.fromNumber(initLeverage), fixednum_1.I80F48.fromNumber(liquidationFee), fixednum_1.I80F48.fromNumber(makerFee), fixednum_1.I80F48.fromNumber(takerFee), new bn_js_1.default(baseLotSize), new bn_js_1.default(quoteLotSize), fixednum_1.I80F48.fromNumber(rate), fixednum_1.I80F48.fromNumber(maxDepthBps), new bn_js_1.default(targetPeriodLength), new bn_js_1.default(mngoPerPeriod), new bn_js_1.default(exp));
            const createMngoVaultTransaction = new web3_js_1.Transaction();
            createMngoVaultTransaction.add(...mngoVaultAccountInstructions);
            yield this.sendTransaction(createMngoVaultTransaction, admin, [
                mngoVaultAccount,
            ]);
            const transaction = new web3_js_1.Transaction();
            transaction.add(makePerpMarketAccountInstruction.instruction);
            transaction.add(makeEventQueueAccountInstruction.instruction);
            transaction.add(makeBidAccountInstruction.instruction);
            transaction.add(makeAskAccountInstruction.instruction);
            transaction.add(instruction);
            const additionalSigners = [
                makePerpMarketAccountInstruction.account,
                makeEventQueueAccountInstruction.account,
                makeBidAccountInstruction.account,
                makeAskAccountInstruction.account,
            ];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    createPerpMarket(mangoGroup, oraclePk, mngoMintPk, admin, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, baseLotSize, quoteLotSize, maxNumEvents, rate, // liquidity mining params; set rate == 0 if no liq mining
    maxDepthBps, targetPeriodLength, mngoPerPeriod, exp, version, lmSizeShift, baseDecimals) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const [perpMarketPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoGroup.publicKey.toBytes(),
                new Buffer('PerpMarket', 'utf-8'),
                oraclePk.toBytes(),
            ], this.programId);
            const makeEventQueueAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.PerpEventQueueHeaderLayout.span + maxNumEvents * layout_1.PerpEventLayout.span, this.programId);
            const makeBidAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.BookSideLayout.span, this.programId);
            const makeAskAccountInstruction = yield (0, utils_1.createAccountInstruction)(this.connection, admin.publicKey, layout_1.BookSideLayout.span, this.programId);
            const [mngoVaultPk] = yield web3_js_1.PublicKey.findProgramAddress([
                perpMarketPk.toBytes(),
                spl_token_1.TOKEN_PROGRAM_ID.toBytes(),
                mngoMintPk.toBytes(),
            ], this.programId);
            const instruction = yield (0, instruction_1.makeCreatePerpMarketInstruction)(this.programId, mangoGroup.publicKey, oraclePk, perpMarketPk, makeEventQueueAccountInstruction.account.publicKey, makeBidAccountInstruction.account.publicKey, makeAskAccountInstruction.account.publicKey, mngoMintPk, mngoVaultPk, admin.publicKey, mangoGroup.signerKey, fixednum_1.I80F48.fromNumber(maintLeverage), fixednum_1.I80F48.fromNumber(initLeverage), fixednum_1.I80F48.fromNumber(liquidationFee), fixednum_1.I80F48.fromNumber(makerFee), fixednum_1.I80F48.fromNumber(takerFee), new bn_js_1.default(baseLotSize), new bn_js_1.default(quoteLotSize), fixednum_1.I80F48.fromNumber(rate), fixednum_1.I80F48.fromNumber(maxDepthBps), new bn_js_1.default(targetPeriodLength), new bn_js_1.default(mngoPerPeriod), new bn_js_1.default(exp), new bn_js_1.default(version), new bn_js_1.default(lmSizeShift), new bn_js_1.default(baseDecimals));
            const transaction = new web3_js_1.Transaction();
            transaction.add(makeEventQueueAccountInstruction.instruction);
            transaction.add(makeBidAccountInstruction.instruction);
            transaction.add(makeAskAccountInstruction.instruction);
            transaction.add(instruction);
            const additionalSigners = [
                makeEventQueueAccountInstruction.account,
                makeBidAccountInstruction.account,
                makeAskAccountInstruction.account,
            ];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    // Liquidator Functions
    forceCancelSpotOrders(mangoGroup, liqeeMangoAccount, spotMarket, baseRootBank, quoteRootBank, payer, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseNodeBanks = yield baseRootBank.loadNodeBanks(this.connection);
            const quoteNodeBanks = yield quoteRootBank.loadNodeBanks(this.connection);
            const openOrdersKeys = [];
            const spotMarketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            // Only pass in open orders if in margin basket or current market index, and
            // the only writable account should be OpenOrders for current market index
            for (let i = 0; i < liqeeMangoAccount.spotOpenOrders.length; i++) {
                let pubkey = utils_1.zeroKey;
                let isWritable = false;
                if (i === spotMarketIndex) {
                    isWritable = true;
                    if (liqeeMangoAccount.spotOpenOrders[spotMarketIndex].equals(utils_1.zeroKey)) {
                        console.log('missing oo for ', spotMarketIndex);
                        // open orders missing for this market; create a new one now
                        // const openOrdersSpace = OpenOrders.getLayout(
                        //   mangoGroup.dexProgramId,
                        // ).span;
                        // const openOrdersLamports =
                        //   await this.connection.getMinimumBalanceForRentExemption(
                        //     openOrdersSpace,
                        //     'singleGossip',
                        //   );
                        // const accInstr = await createAccountInstruction(
                        //   this.connection,
                        //   owner.publicKey,
                        //   openOrdersSpace,
                        //   mangoGroup.dexProgramId,
                        //   openOrdersLamports,
                        // );
                        // transaction.add(accInstr.instruction);
                        // additionalSigners.push(accInstr.account);
                        // pubkey = accInstr.account.publicKey;
                    }
                    else {
                        pubkey = liqeeMangoAccount.spotOpenOrders[i];
                    }
                }
                else if (liqeeMangoAccount.inMarginBasket[i]) {
                    pubkey = liqeeMangoAccount.spotOpenOrders[i];
                }
                openOrdersKeys.push({ pubkey, isWritable });
            }
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const instruction = (0, instruction_1.makeForceCancelSpotOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, liqeeMangoAccount.publicKey, baseRootBank.publicKey, baseNodeBanks[0].publicKey, baseNodeBanks[0].vault, quoteRootBank.publicKey, quoteNodeBanks[0].publicKey, quoteNodeBanks[0].vault, spotMarket.publicKey, spotMarket.bidsAddress, spotMarket.asksAddress, mangoGroup.signerKey, spotMarket['_decoded'].eventQueue, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, dexSigner, mangoGroup.dexProgramId, openOrdersKeys, limit);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    /**
     * Send multiple instructions to cancel all perp orders in this market
     */
    forceCancelAllPerpOrdersInMarket(mangoGroup, liqee, perpMarket, payer, limitPerInstruction) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = new web3_js_1.Transaction();
            const marketIndex = mangoGroup.getPerpMarketIndex(perpMarket.publicKey);
            const instruction = (0, instruction_1.makeForceCancelPerpOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, liqee.publicKey, liqee.spotOpenOrders, new bn_js_1.default(limitPerInstruction));
            transaction.add(instruction);
            let orderCount = 0;
            for (let i = 0; i < liqee.orderMarket.length; i++) {
                if (liqee.orderMarket[i] !== marketIndex) {
                    continue;
                }
                orderCount++;
                if (orderCount === limitPerInstruction) {
                    orderCount = 0;
                    const instruction = (0, instruction_1.makeForceCancelPerpOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, liqee.publicKey, liqee.spotOpenOrders, new bn_js_1.default(limitPerInstruction));
                    transaction.add(instruction);
                    // TODO - verify how many such instructions can go into one tx
                    // right now 10 seems reasonable considering size of 800ish bytes if all spot open orders present
                    if (transaction.instructions.length === 10) {
                        break;
                    }
                }
            }
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    forceCancelPerpOrders(mangoGroup, liqeeMangoAccount, perpMarket, payer, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeForceCancelPerpOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, liqeeMangoAccount.publicKey, liqeeMangoAccount.spotOpenOrders, limit);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    liquidateTokenAndToken(mangoGroup, liqeeMangoAccount, liqorMangoAccount, assetRootBank, liabRootBank, payer, maxLiabTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeLiquidateTokenAndTokenInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, liqeeMangoAccount.publicKey, liqorMangoAccount.publicKey, payer.publicKey, assetRootBank.publicKey, assetRootBank.nodeBanks[0], liabRootBank.publicKey, liabRootBank.nodeBanks[0], liqeeMangoAccount.getOpenOrdersKeysInBasket(), liqorMangoAccount.getOpenOrdersKeysInBasket(), maxLiabTransfer);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    liquidateTokenAndPerp(mangoGroup, liqeeMangoAccount, liqorMangoAccount, rootBank, payer, assetType, assetIndex, liabType, liabIndex, maxLiabTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeLiquidateTokenAndPerpInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, liqeeMangoAccount.publicKey, liqorMangoAccount.publicKey, payer.publicKey, rootBank.publicKey, rootBank.nodeBanks[0], liqeeMangoAccount.getOpenOrdersKeysInBasket(), liqorMangoAccount.getOpenOrdersKeysInBasket(), assetType, new bn_js_1.default(assetIndex), liabType, new bn_js_1.default(liabIndex), maxLiabTransfer);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    liquidatePerpMarket(mangoGroup, liqeeMangoAccount, liqorMangoAccount, perpMarket, payer, baseTransferRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeLiquidatePerpMarketInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.eventQueue, liqeeMangoAccount.publicKey, liqorMangoAccount.publicKey, payer.publicKey, liqeeMangoAccount.getOpenOrdersKeysInBasket(), liqorMangoAccount.getOpenOrdersKeysInBasket(), baseTransferRequest);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    settleFees(mangoGroup, mangoAccount, perpMarket, rootBank, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeBanks = yield rootBank.loadNodeBanks(this.connection);
            const instruction = (0, instruction_1.makeSettleFeesInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, mangoAccount.publicKey, rootBank.publicKey, nodeBanks[0].publicKey, nodeBanks[0].vault, mangoGroup.feesVault, mangoGroup.signerKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    resolvePerpBankruptcy(mangoGroup, liqeeMangoAccount, liqorMangoAccount, perpMarket, rootBank, payer, liabIndex, maxLiabTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodeBanks = yield rootBank.loadNodeBanks(this.connection);
            const instruction = (0, instruction_1.makeResolvePerpBankruptcyInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, liqeeMangoAccount.publicKey, liqorMangoAccount.publicKey, payer.publicKey, rootBank.publicKey, nodeBanks[0].publicKey, nodeBanks[0].vault, mangoGroup.insuranceVault, mangoGroup.signerKey, perpMarket.publicKey, liqorMangoAccount.spotOpenOrders, new bn_js_1.default(liabIndex), maxLiabTransfer);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    resolveTokenBankruptcy(mangoGroup, liqeeMangoAccount, liqorMangoAccount, quoteRootBank, liabRootBank, payer, maxLiabTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            const quoteNodeBanks = yield quoteRootBank.loadNodeBanks(this.connection);
            const instruction = (0, instruction_1.makeResolveTokenBankruptcyInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, liqeeMangoAccount.publicKey, liqorMangoAccount.publicKey, payer.publicKey, quoteRootBank.publicKey, quoteRootBank.nodeBanks[0], quoteNodeBanks[0].vault, mangoGroup.insuranceVault, mangoGroup.signerKey, liabRootBank.publicKey, liabRootBank.nodeBanks[0], liqorMangoAccount.spotOpenOrders, liabRootBank.nodeBanks, maxLiabTransfer);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    redeemMngo(mangoGroup, mangoAccount, perpMarket, payer, mngoRootBank, mngoNodeBank, mngoVault) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeRedeemMngoInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, mangoAccount.publicKey, payer.publicKey, perpMarket.publicKey, perpMarket.mngoVault, mngoRootBank, mngoNodeBank, mngoVault, mangoGroup.signerKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, payer, []);
        });
    }
    redeemAllMngo(mangoGroup, mangoAccount, payer, mngoRootBank, mngoNodeBank, mngoVault) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const transactions = [];
            let transaction = new web3_js_1.Transaction();
            const perpMarkets = yield Promise.all(mangoAccount.perpAccounts.map((perpAccount, i) => {
                if (perpAccount.mngoAccrued.eq(utils_1.ZERO_BN)) {
                    return (0, utils_1.promiseUndef)();
                }
                else {
                    return this.getPerpMarket(mangoGroup.perpMarkets[i].perpMarket, mangoGroup.tokens[i].decimals, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals);
                }
            }));
            for (let i = 0; i < mangoAccount.perpAccounts.length; i++) {
                const perpMarket = perpMarkets[i];
                if (perpMarket === undefined)
                    continue;
                const instruction = (0, instruction_1.makeRedeemMngoInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, mangoAccount.publicKey, payer.publicKey, perpMarket.publicKey, perpMarket.mngoVault, mngoRootBank, mngoNodeBank, mngoVault, mangoGroup.signerKey);
                transaction.add(instruction);
                if (transaction.instructions.length === 9) {
                    transactions.push(transaction);
                    transaction = new web3_js_1.Transaction();
                }
            }
            if (transaction.instructions.length > 0) {
                transactions.push(transaction);
                // txProms.push(this.sendTransaction(transaction, payer, []));
            }
            const transactionsAndSigners = transactions.map((tx) => ({
                transaction: tx,
                signers: [],
            }));
            if (transactionsAndSigners.length === 0) {
                throw new Error('No MNGO rewards to redeem');
            }
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer,
                currentBlockhash,
            });
            if (signedTransactions) {
                const txSigs = yield Promise.all(signedTransactions.map((signedTransaction) => this.sendSignedTransaction({
                    signedTransaction,
                    signedAtBlock: currentBlockhash,
                })));
                return txSigs;
            }
            else {
                throw new Error('Unable to sign all RedeemMngo transactions');
            }
        });
    }
    addMangoAccountInfo(mangoGroup, mangoAccount, owner, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeAddMangoAccountInfoInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, info);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    depositMsrm(mangoGroup, mangoAccount, owner, msrmAccount, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeDepositMsrmInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, msrmAccount, mangoGroup.msrmVault, new bn_js_1.default(Math.floor(quantity)));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    withdrawMsrm(mangoGroup, mangoAccount, owner, msrmAccount, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeWithdrawMsrmInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, msrmAccount, mangoGroup.msrmVault, mangoGroup.signerKey, new bn_js_1.default(Math.floor(quantity)));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    changePerpMarketParams(mangoGroup, perpMarket, admin, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeChangePerpMarketParamsInstruction)(this.programId, mangoGroup.publicKey, perpMarket.publicKey, admin.publicKey, fixednum_1.I80F48.fromNumberOrUndef(maintLeverage), fixednum_1.I80F48.fromNumberOrUndef(initLeverage), fixednum_1.I80F48.fromNumberOrUndef(liquidationFee), fixednum_1.I80F48.fromNumberOrUndef(makerFee), fixednum_1.I80F48.fromNumberOrUndef(takerFee), fixednum_1.I80F48.fromNumberOrUndef(rate), fixednum_1.I80F48.fromNumberOrUndef(maxDepthBps), targetPeriodLength !== undefined ? new bn_js_1.default(targetPeriodLength) : undefined, mngoPerPeriod !== undefined ? new bn_js_1.default(mngoPerPeriod) : undefined, exp !== undefined ? new bn_js_1.default(exp) : undefined);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    changePerpMarketParams2(mangoGroup, perpMarket, admin, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp, version, lmSizeShift) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeChangePerpMarketParams2Instruction)(this.programId, mangoGroup.publicKey, perpMarket.publicKey, admin.publicKey, fixednum_1.I80F48.fromNumberOrUndef(maintLeverage), fixednum_1.I80F48.fromNumberOrUndef(initLeverage), fixednum_1.I80F48.fromNumberOrUndef(liquidationFee), fixednum_1.I80F48.fromNumberOrUndef(makerFee), fixednum_1.I80F48.fromNumberOrUndef(takerFee), fixednum_1.I80F48.fromNumberOrUndef(rate), fixednum_1.I80F48.fromNumberOrUndef(maxDepthBps), targetPeriodLength !== undefined ? new bn_js_1.default(targetPeriodLength) : undefined, mngoPerPeriod !== undefined ? new bn_js_1.default(mngoPerPeriod) : undefined, exp !== undefined ? new bn_js_1.default(exp) : undefined, version !== undefined ? new bn_js_1.default(version) : undefined, lmSizeShift !== undefined ? new bn_js_1.default(lmSizeShift) : undefined);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    setGroupAdmin(mangoGroup, newAdmin, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeSetGroupAdminInstruction)(this.programId, mangoGroup.publicKey, newAdmin, admin.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    /**
     * Add allowance for orders to be cancelled and replaced in a single transaction
     */
    modifySpotOrder(mangoGroup, mangoAccount, mangoCache, spotMarket, owner, order, side, price, size, orderType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const instruction = (0, instruction_1.makeCancelSpotOrderInstruction)(this.programId, mangoGroup.publicKey, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, spotMarket['_decoded'].bids, spotMarket['_decoded'].asks, order.openOrdersAddress, mangoGroup.signerKey, spotMarket['_decoded'].eventQueue, order);
            transaction.add(instruction);
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const spotMarketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            if (!mangoGroup.rootBankAccounts.length) {
                yield mangoGroup.loadRootBanks(this.connection);
            }
            const baseRootBank = mangoGroup.rootBankAccounts[spotMarketIndex];
            const baseNodeBank = baseRootBank === null || baseRootBank === void 0 ? void 0 : baseRootBank.nodeBankAccounts[0];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            const quoteNodeBank = quoteRootBank === null || quoteRootBank === void 0 ? void 0 : quoteRootBank.nodeBankAccounts[0];
            if (!baseNodeBank || !quoteNodeBank) {
                throw new Error('Invalid or missing node banks');
            }
            const settleFundsInstruction = (0, instruction_1.makeSettleFundsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, owner.publicKey, mangoAccount.publicKey, spotMarket.programId, spotMarket.publicKey, mangoAccount.spotOpenOrders[spotMarketIndex], mangoGroup.signerKey, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, mangoGroup.tokens[spotMarketIndex].rootBank, baseNodeBank.publicKey, mangoGroup.tokens[layout_1.QUOTE_INDEX].rootBank, quoteNodeBank.publicKey, baseNodeBank.vault, quoteNodeBank.vault, dexSigner);
            transaction.add(settleFundsInstruction);
            const additionalSigners = [];
            const limitPrice = spotMarket.priceNumberToLots(price);
            const maxBaseQuantity = spotMarket.baseSizeNumberToLots(size);
            // TODO implement srm vault fee discount
            // const feeTier = getFeeTier(0, nativeToUi(mangoGroup.nativeSrm || 0, SRM_DECIMALS));
            const feeTier = (0, serum_1.getFeeTier)(0, (0, utils_1.nativeToUi)(0, 0));
            const rates = (0, serum_1.getFeeRates)(feeTier);
            const maxQuoteQuantity = new bn_js_1.default(spotMarket['_decoded'].quoteLotSize.toNumber() * (1 + rates.taker)).mul(spotMarket
                .baseSizeNumberToLots(size)
                .mul(spotMarket.priceNumberToLots(price)));
            // Checks already completed as only price modified
            if (maxBaseQuantity.lte(utils_1.ZERO_BN)) {
                throw new Error('size too small');
            }
            if (limitPrice.lte(utils_1.ZERO_BN)) {
                throw new Error('invalid price');
            }
            const selfTradeBehavior = 'decrementTake';
            if (!baseRootBank || !baseNodeBank || !quoteRootBank || !quoteNodeBank) {
                throw new Error('Invalid or missing banks');
            }
            const openOrdersKeys = [];
            // Only pass in open orders if in margin basket or current market index, and
            // the only writable account should be OpenOrders for current market index
            for (let i = 0; i < mangoAccount.spotOpenOrders.length; i++) {
                let pubkey = utils_1.zeroKey;
                let isWritable = false;
                if (i === spotMarketIndex) {
                    isWritable = true;
                    if (mangoAccount.spotOpenOrders[spotMarketIndex].equals(utils_1.zeroKey)) {
                        // open orders missing for this market; create a new one now
                        const openOrdersSpace = serum_1.OpenOrders.getLayout(mangoGroup.dexProgramId).span;
                        const openOrdersLamports = yield this.connection.getMinimumBalanceForRentExemption(openOrdersSpace, 'processed');
                        const accInstr = yield (0, utils_1.createAccountInstruction)(this.connection, owner.publicKey, openOrdersSpace, mangoGroup.dexProgramId, openOrdersLamports);
                        const initOpenOrders = (0, instruction_1.makeInitSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoGroup.dexProgramId, accInstr.account.publicKey, spotMarket.publicKey, mangoGroup.signerKey);
                        const initTx = new web3_js_1.Transaction();
                        initTx.add(accInstr.instruction);
                        initTx.add(initOpenOrders);
                        yield this.sendTransaction(initTx, owner, [accInstr.account]);
                        pubkey = accInstr.account.publicKey;
                    }
                    else {
                        pubkey = mangoAccount.spotOpenOrders[i];
                    }
                }
                else if (mangoAccount.inMarginBasket[i]) {
                    pubkey = mangoAccount.spotOpenOrders[i];
                }
                openOrdersKeys.push({ pubkey, isWritable });
            }
            const placeOrderInstruction = (0, instruction_1.makePlaceSpotOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoCache, spotMarket.programId, spotMarket.publicKey, spotMarket['_decoded'].bids, spotMarket['_decoded'].asks, spotMarket['_decoded'].requestQueue, spotMarket['_decoded'].eventQueue, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, baseRootBank.publicKey, baseNodeBank.publicKey, baseNodeBank.vault, quoteRootBank.publicKey, quoteNodeBank.publicKey, quoteNodeBank.vault, mangoGroup.signerKey, dexSigner, mangoGroup.srmVault, // TODO: choose msrm vault if it has any deposits
            openOrdersKeys, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, selfTradeBehavior, orderType, order.clientId);
            transaction.add(placeOrderInstruction);
            if (spotMarketIndex > 0) {
                console.log(spotMarketIndex - 1, mangoAccount.spotOpenOrders[spotMarketIndex - 1].toBase58(), openOrdersKeys[spotMarketIndex - 1].pubkey.toBase58());
            }
            const txid = yield this.sendTransaction(transaction, owner, additionalSigners);
            // update MangoAccount to have new OpenOrders pubkey
            mangoAccount.spotOpenOrders[spotMarketIndex] =
                openOrdersKeys[spotMarketIndex].pubkey;
            mangoAccount.inMarginBasket[spotMarketIndex] = true;
            console.log(spotMarketIndex, mangoAccount.spotOpenOrders[spotMarketIndex].toBase58(), openOrdersKeys[spotMarketIndex].pubkey.toBase58());
            return txid;
        });
    }
    modifyPerpOrder(mangoGroup, mangoAccount, mangoCache, perpMarket, owner, order, side, price, quantity, orderType, clientOrderId, bookSideInfo, // ask if side === bid, bids if side === ask; if this is given; crank instruction is added
    invalidIdOk = false, // Don't throw error if order is invalid
    referrerMangoAccountPk) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            const cancelInstruction = (0, instruction_1.makeCancelPerpOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, order, invalidIdOk);
            transaction.add(cancelInstruction);
            const [nativePrice, nativeQuantity] = perpMarket.uiToNativePriceQuantity(price, quantity);
            const placeInstruction = (0, instruction_1.makePlacePerpOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoCache, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, perpMarket.eventQueue, mangoAccount.spotOpenOrders, nativePrice, nativeQuantity, clientOrderId
                ? new bn_js_1.default(clientOrderId)
                : (_a = order.clientId) !== null && _a !== void 0 ? _a : new bn_js_1.default(Date.now()), side, orderType, false, referrerMangoAccountPk);
            transaction.add(placeInstruction);
            if (bookSideInfo) {
                const bookSide = bookSideInfo.data
                    ? new book_1.BookSide(side === 'buy' ? perpMarket.asks : perpMarket.bids, perpMarket, layout_1.BookSideLayout.decode(bookSideInfo.data))
                    : [];
                const accounts = new Set();
                accounts.add(mangoAccount.publicKey.toBase58());
                for (const order of bookSide) {
                    accounts.add(order.owner.toBase58());
                    if (accounts.size >= 10) {
                        break;
                    }
                }
                const consumeInstruction = (0, instruction_1.makeConsumeEventsInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, perpMarket.publicKey, perpMarket.eventQueue, Array.from(accounts)
                    .map((s) => new web3_js_1.PublicKey(s))
                    .sort(), new bn_js_1.default(4));
                transaction.add(consumeInstruction);
            }
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    addPerpTriggerOrder(mangoGroup, mangoAccount, perpMarket, owner, orderType, side, price, quantity, triggerCondition, triggerPrice, reduceOnly, clientOrderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const transaction = new web3_js_1.Transaction();
            const additionalSigners = [];
            let advancedOrders = mangoAccount.advancedOrdersKey;
            if (mangoAccount.advancedOrdersKey.equals(utils_1.zeroKey)) {
                [advancedOrders] = yield web3_js_1.PublicKey.findProgramAddress([mangoAccount.publicKey.toBytes()], this.programId);
                console.log('AdvancedOrders PDA:', advancedOrders.toBase58());
                transaction.add((0, instruction_1.makeInitAdvancedOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, advancedOrders));
            }
            const marketIndex = mangoGroup.getPerpMarketIndex(perpMarket.publicKey);
            const baseTokenInfo = mangoGroup.tokens[marketIndex];
            const quoteTokenInfo = mangoGroup.tokens[layout_1.QUOTE_INDEX];
            const baseUnit = Math.pow(10, baseTokenInfo.decimals);
            const quoteUnit = Math.pow(10, quoteTokenInfo.decimals);
            const nativePrice = new bn_js_1.default(price * quoteUnit)
                .mul(perpMarket.baseLotSize)
                .div(perpMarket.quoteLotSize.mul(new bn_js_1.default(baseUnit)));
            const nativeQuantity = new bn_js_1.default(quantity * baseUnit).div(perpMarket.baseLotSize);
            const nativeTriggerPrice = fixednum_1.I80F48.fromNumber(triggerPrice *
                Math.pow(10, perpMarket.quoteDecimals - perpMarket.baseDecimals));
            const openOrders = mangoAccount.spotOpenOrders.filter((pk, i) => mangoAccount.inMarginBasket[i]);
            transaction.add((0, instruction_1.makeAddPerpTriggerOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, advancedOrders, mangoGroup.mangoCache, perpMarket.publicKey, openOrders, orderType, side, nativePrice, nativeQuantity, triggerCondition, nativeTriggerPrice, reduceOnly, new bn_js_1.default(clientOrderId !== null && clientOrderId !== void 0 ? clientOrderId : Date.now())));
            const txid = yield this.sendTransaction(transaction, owner, additionalSigners);
            mangoAccount.advancedOrdersKey = advancedOrders;
            return txid;
        });
    }
    removeAdvancedOrder(mangoGroup, mangoAccount, owner, orderIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeRemoveAdvancedOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, owner.publicKey, mangoAccount.advancedOrdersKey, orderIndex);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, owner, additionalSigners);
        });
    }
    executePerpTriggerOrder(mangoGroup, mangoAccount, mangoCache, perpMarket, payer, orderIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const openOrders = mangoAccount.spotOpenOrders.filter((pk, i) => mangoAccount.inMarginBasket[i]);
            const instruction = (0, instruction_1.makeExecutePerpTriggerOrderInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, mangoAccount.advancedOrdersKey, payer.publicKey, mangoCache.publicKey, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, perpMarket.eventQueue, openOrders, new bn_js_1.default(orderIndex));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    closeAdvancedOrders(mangoGroup, mangoAccount, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeCloseAdvancedOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, mangoAccount.advancedOrdersKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    closeSpotOpenOrders(mangoGroup, mangoAccount, payer, marketIndex, ownerIsSigner = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeCloseSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, ownerIsSigner ? payer.publicKey : mangoAccount.owner, mangoGroup.dexProgramId, mangoAccount.spotOpenOrders[marketIndex], mangoGroup.spotMarkets[marketIndex].spotMarket, mangoGroup.signerKey, ownerIsSigner);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    closeMangoAccount(mangoGroup, mangoAccount, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeCloseMangoAccountInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    createDustAccount(mangoGroup, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const [mangoAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoGroup.publicKey.toBytes(), new Buffer('DustAccount', 'utf-8')], this.programId);
            const instruction = (0, instruction_1.makeCreateDustAccountInstruction)(this.programId, mangoGroup.publicKey, mangoAccountPk, payer.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    resolveDust(mangoGroup, mangoAccount, rootBank, mangoCache, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const [dustAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoGroup.publicKey.toBytes(), new Buffer('DustAccount', 'utf-8')], this.programId);
            const instruction = (0, instruction_1.makeResolveDustInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, dustAccountPk, rootBank.publicKey, rootBank.nodeBanks[0], mangoCache.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    updateMarginBasket(mangoGroup, mangoAccount, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const instruction = (0, instruction_1.makeUpdateMarginBasketInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, mangoAccount.spotOpenOrders);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    resolveAllDust(mangoGroup, mangoAccount, mangoCache, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const transactionsAndSigners = [];
            const [dustAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoGroup.publicKey.toBytes(), new Buffer('DustAccount', 'utf-8')], this.programId);
            for (const rootBank of mangoGroup.rootBankAccounts) {
                const transactionAndSigners = {
                    transaction: new web3_js_1.Transaction(),
                    signers: [],
                };
                if (rootBank) {
                    const tokenIndex = mangoGroup.getRootBankIndex(rootBank === null || rootBank === void 0 ? void 0 : rootBank.publicKey);
                    const nativeDeposit = mangoAccount.getNativeDeposit(rootBank, tokenIndex);
                    const nativeBorrow = mangoAccount.getNativeBorrow(rootBank, tokenIndex);
                    console.log('nativeDeposit', nativeDeposit.toString());
                    console.log('nativeBorrow', nativeBorrow.toString());
                    console.log('tokenIndex', tokenIndex.toString());
                    if ((nativeDeposit.gt(fixednum_1.ZERO_I80F48) && nativeDeposit.lt(fixednum_1.ONE_I80F48)) ||
                        (nativeBorrow.gt(fixednum_1.ZERO_I80F48) && nativeBorrow.lt(fixednum_1.ONE_I80F48))) {
                        const instruction = (0, instruction_1.makeResolveDustInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, dustAccountPk, rootBank.publicKey, rootBank.nodeBanks[0], mangoCache.publicKey);
                        transactionAndSigners.transaction.add(instruction);
                    }
                }
                transactionsAndSigners.push(transactionAndSigners);
            }
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer,
                currentBlockhash,
            });
            if (signedTransactions) {
                for (const signedTransaction of signedTransactions) {
                    if (signedTransaction.instructions.length == 0) {
                        continue;
                    }
                    const txid = yield this.sendSignedTransaction({
                        signedTransaction,
                        signedAtBlock: currentBlockhash,
                    });
                    console.log(txid);
                }
            }
            else {
                throw new Error('Unable to sign ResolveDust transactions');
            }
        });
    }
    emptyAndCloseMangoAccount(mangoGroup, mangoAccount, mangoCache, mngoIndex, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const transactionsAndSigners = [];
            const redeemMngoTransaction = {
                transaction: new web3_js_1.Transaction(),
                signers: [],
            };
            const mngoRootBank = mangoGroup.rootBankAccounts[mngoIndex];
            const perpMarkets = yield Promise.all(mangoAccount.perpAccounts.map((perpAccount, i) => {
                if (perpAccount.mngoAccrued.eq(utils_1.ZERO_BN)) {
                    return (0, utils_1.promiseUndef)();
                }
                else {
                    return this.getPerpMarket(mangoGroup.perpMarkets[i].perpMarket, mangoGroup.tokens[i].decimals, mangoGroup.tokens[layout_1.QUOTE_INDEX].decimals);
                }
            }));
            let redeemedMngo = false;
            for (let i = 0; i < mangoAccount.perpAccounts.length; i++) {
                const perpAccount = mangoAccount.perpAccounts[i];
                if (perpAccount.mngoAccrued.eq(utils_1.ZERO_BN)) {
                    continue;
                }
                redeemedMngo = true;
                const perpMarket = perpMarkets[i];
                // this is actually an error state; Means there is mngo accrued but PerpMarket doesn't exist
                if (perpMarket === undefined)
                    continue;
                const instruction = (0, instruction_1.makeRedeemMngoInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, mangoAccount.publicKey, payer.publicKey, perpMarket.publicKey, perpMarket.mngoVault, mngoRootBank.publicKey, mngoRootBank.nodeBanks[0], mngoRootBank.nodeBankAccounts[0].vault, mangoGroup.signerKey);
                redeemMngoTransaction.transaction.add(instruction);
            }
            if (redeemMngoTransaction.transaction.instructions.length > 0) {
                transactionsAndSigners.push(redeemMngoTransaction);
            }
            const resolveAllDustTransaction = {
                transaction: new web3_js_1.Transaction(),
                signers: [],
            };
            const [dustAccountPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoGroup.publicKey.toBytes(), new Buffer('DustAccount', 'utf-8')], this.programId);
            for (const rootBank of mangoGroup.rootBankAccounts) {
                if (rootBank) {
                    const tokenIndex = mangoGroup.getRootBankIndex(rootBank === null || rootBank === void 0 ? void 0 : rootBank.publicKey);
                    const tokenMint = mangoGroup.tokens[tokenIndex].mint;
                    const shouldWithdrawMngo = redeemedMngo && tokenIndex === mngoIndex;
                    if (mangoAccount.deposits[tokenIndex].isPos() || shouldWithdrawMngo) {
                        const withdrawTransaction = {
                            transaction: new web3_js_1.Transaction(),
                            signers: [],
                        };
                        let tokenAcc = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, payer.publicKey);
                        let wrappedSolAccount = null;
                        if (tokenMint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
                            wrappedSolAccount = new web3_js_1.Keypair();
                            tokenAcc = wrappedSolAccount.publicKey;
                            const space = 165;
                            const lamports = yield this.connection.getMinimumBalanceForRentExemption(space, 'processed');
                            withdrawTransaction.transaction.add(web3_js_1.SystemProgram.createAccount({
                                fromPubkey: payer.publicKey,
                                newAccountPubkey: tokenAcc,
                                lamports,
                                space,
                                programId: spl_token_1.TOKEN_PROGRAM_ID,
                            }));
                            withdrawTransaction.transaction.add((0, token_instructions_1.initializeAccount)({
                                account: tokenAcc,
                                mint: token_instructions_1.WRAPPED_SOL_MINT,
                                owner: payer.publicKey,
                            }));
                            withdrawTransaction.signers.push(wrappedSolAccount);
                        }
                        else {
                            const tokenAccExists = yield this.connection.getAccountInfo(tokenAcc, 'processed');
                            if (!tokenAccExists) {
                                withdrawTransaction.transaction.add(spl_token_1.Token.createAssociatedTokenAccountInstruction(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, tokenMint, tokenAcc, payer.publicKey, payer.publicKey));
                            }
                        }
                        const instruction = (0, instruction_1.makeWithdrawInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, mangoGroup.mangoCache, rootBank.publicKey, rootBank.nodeBanks[0], rootBank.nodeBankAccounts[0].vault, tokenAcc, mangoGroup.signerKey, mangoAccount.spotOpenOrders, utils_1.U64_MAX_BN, false);
                        withdrawTransaction.transaction.add(instruction);
                        if (wrappedSolAccount) {
                            withdrawTransaction.transaction.add((0, token_instructions_1.closeAccount)({
                                source: wrappedSolAccount.publicKey,
                                destination: payer.publicKey,
                                owner: payer.publicKey,
                            }));
                        }
                        transactionsAndSigners.push(withdrawTransaction);
                    }
                    const nativeBorrow = mangoAccount.getNativeBorrow(mangoCache.rootBankCache[tokenIndex], tokenIndex);
                    if (shouldWithdrawMngo ||
                        mangoAccount.deposits[tokenIndex].isPos() ||
                        (nativeBorrow.gt(fixednum_1.ZERO_I80F48) && nativeBorrow.lt(fixednum_1.ONE_I80F48))) {
                        const instruction = (0, instruction_1.makeResolveDustInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, dustAccountPk, rootBank.publicKey, rootBank.nodeBanks[0], mangoCache.publicKey);
                        resolveAllDustTransaction.transaction.add(instruction);
                    }
                }
            }
            transactionsAndSigners.push(resolveAllDustTransaction);
            const closeAccountsTransaction = {
                transaction: new web3_js_1.Transaction(),
                signers: [],
            };
            for (let i = 0; i < mangoAccount.spotOpenOrders.length; i++) {
                const openOrders = mangoAccount.spotOpenOrders[i];
                const spotMarket = mangoGroup.spotMarkets[i].spotMarket;
                if (!openOrders.equals(utils_1.zeroKey)) {
                    closeAccountsTransaction.transaction.add((0, instruction_1.makeCloseSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, mangoGroup.dexProgramId, openOrders, spotMarket, mangoGroup.signerKey));
                }
            }
            if (!mangoAccount.advancedOrdersKey.equals(utils_1.zeroKey)) {
                closeAccountsTransaction.transaction.add((0, instruction_1.makeCloseAdvancedOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, mangoAccount.advancedOrdersKey));
            }
            if (mangoAccount.metaData.version == 0) {
                closeAccountsTransaction.transaction.add((0, instruction_1.makeUpgradeMangoAccountV0V1Instruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey));
            }
            closeAccountsTransaction.transaction.add((0, instruction_1.makeCloseMangoAccountInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey));
            transactionsAndSigners.push(closeAccountsTransaction);
            const currentBlockhash = yield this.getCurrentBlockhash();
            const signedTransactions = yield this.signTransactions({
                transactionsAndSigners,
                payer,
                currentBlockhash,
            });
            const txids = [];
            if (signedTransactions) {
                for (const signedTransaction of signedTransactions) {
                    if (signedTransaction.instructions.length == 0) {
                        continue;
                    }
                    const txid = yield this.sendSignedTransaction({
                        signedTransaction,
                        signedAtBlock: currentBlockhash,
                    });
                    txids.push(txid);
                    console.log(txid);
                }
            }
            else {
                throw new Error('Unable to sign emptyAndCloseMangoAccount transactions');
            }
            return txids;
        });
    }
    cancelPerpOrderSide(mangoGroup, mangoAccount, perpMarket, payer, side, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeCancelPerpOrdersSideInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, perpMarket.publicKey, perpMarket.bids, perpMarket.asks, side, new bn_js_1.default(limit));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    setDelegate(mangoGroup, mangoAccount, payer, delegate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeSetDelegateInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, delegate);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    changeSpotMarketParams(mangoGroup, spotMarket, rootBank, admin, maintLeverage, initLeverage, liquidationFee, optimalUtil, optimalRate, maxRate, version) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeChangeSpotMarketParamsInstruction)(this.programId, mangoGroup.publicKey, spotMarket.publicKey, rootBank.publicKey, admin.publicKey, fixednum_1.I80F48.fromNumberOrUndef(maintLeverage), fixednum_1.I80F48.fromNumberOrUndef(initLeverage), fixednum_1.I80F48.fromNumberOrUndef(liquidationFee), fixednum_1.I80F48.fromNumberOrUndef(optimalUtil), fixednum_1.I80F48.fromNumberOrUndef(optimalRate), fixednum_1.I80F48.fromNumberOrUndef(maxRate), version !== undefined ? new bn_js_1.default(version) : undefined);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    /**
     * Change the referral fee params
     * @param mangoGroup
     * @param admin
     * @param refSurcharge normal units 0.0001 -> 1 basis point
     * @param refShare
     * @param refMngoRequired ui units -> 1 -> 1_000_000 MNGO
     */
    changeReferralFeeParams(mangoGroup, admin, refSurcharge, refShare, refMngoRequired) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!admin.publicKey) {
                return;
            }
            const instruction = (0, instruction_1.makeChangeReferralFeeParamsInstruction)(this.programId, mangoGroup.publicKey, admin.publicKey, new bn_js_1.default(refSurcharge * layout_1.CENTIBPS_PER_UNIT), new bn_js_1.default(refShare * layout_1.CENTIBPS_PER_UNIT), new bn_js_1.default(refMngoRequired * 1000000));
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, admin, additionalSigners);
        });
    }
    setReferrerMemory(mangoGroup, mangoAccount, payer, // must be also owner of mangoAccount
    referrerMangoAccountPk) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            // Generate the PDA pubkey
            const [referrerMemoryPk] = yield web3_js_1.PublicKey.findProgramAddress([mangoAccount.publicKey.toBytes(), new Buffer('ReferrerMemory', 'utf-8')], this.programId);
            const instruction = (0, instruction_1.makeSetReferrerMemoryInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, referrerMemoryPk, referrerMangoAccountPk, payer.publicKey);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    getReferrerPda(mangoGroup, referrerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoded = Buffer.from(referrerId, 'utf8');
            if (encoded.length > layout_1.INFO_LEN) {
                throw new Error(`info string too long. Must be less than or equal to ${layout_1.INFO_LEN} bytes`);
            }
            const encodedReferrerId = Buffer.concat([
                encoded,
                Buffer.alloc(layout_1.INFO_LEN - encoded.length, 0),
            ]);
            // Generate the PDA pubkey
            const [referrerIdRecordPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoGroup.publicKey.toBytes(),
                new Buffer('ReferrerIdRecord', 'utf-8'),
                encodedReferrerId,
            ], this.programId);
            return { referrerPda: referrerIdRecordPk, encodedReferrerId };
        });
    }
    registerReferrerId(mangoGroup, referrerMangoAccount, payer, // will also owner of referrerMangoAccount
    referrerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payer.publicKey) {
                return;
            }
            const { referrerPda, encodedReferrerId } = yield this.getReferrerPda(mangoGroup, referrerId);
            const instruction = (0, instruction_1.makeRegisterReferrerIdInstruction)(this.programId, mangoGroup.publicKey, referrerMangoAccount.publicKey, referrerPda, payer.publicKey, encodedReferrerId);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            const additionalSigners = [];
            return yield this.sendTransaction(transaction, payer, additionalSigners);
        });
    }
    getReferrerIdsForMangoAccount(mangoAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = [
                {
                    memcmp: {
                        offset: layout_2.ReferrerIdRecordLayout.offsetOf('referrerMangoAccount'),
                        bytes: mangoAccount.publicKey.toBase58(),
                    },
                },
                {
                    dataSize: layout_2.ReferrerIdRecordLayout.span,
                },
            ];
            const referrerIds = yield (0, utils_1.getFilteredProgramAccounts)(this.connection, this.programId, filters).then((referrerIds) => {
                return referrerIds.map(({ accountInfo }) => {
                    return new layout_2.ReferrerIdRecord(layout_2.ReferrerIdRecordLayout.decode(accountInfo == null ? undefined : accountInfo.data));
                });
            });
            return referrerIds;
        });
    }
    cancelAllSpotOrders(mangoGroup, mangoAccount, spotMarket, owner, limit, ownerIsSigner = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!owner.publicKey)
                return;
            const marketIndex = mangoGroup.getSpotMarketIndex(spotMarket.address);
            const baseRootBank = mangoGroup.rootBankAccounts[marketIndex];
            const quoteRootBank = mangoGroup.rootBankAccounts[layout_1.QUOTE_INDEX];
            if (baseRootBank == null || quoteRootBank == null) {
                console.log('A root bank is null');
                return;
            }
            const baseNodeBanks = yield baseRootBank.loadNodeBanks(this.connection);
            const quoteNodeBanks = yield quoteRootBank.loadNodeBanks(this.connection);
            const spotMarketIndex = mangoGroup.getSpotMarketIndex(spotMarket.publicKey);
            const dexSigner = yield web3_js_1.PublicKey.createProgramAddress([
                spotMarket.publicKey.toBuffer(),
                spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
            ], spotMarket.programId);
            const instruction = (0, instruction_1.makeCancelAllSpotOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoGroup.mangoCache, mangoAccount.publicKey, ownerIsSigner ? owner.publicKey : mangoAccount.owner, baseRootBank.publicKey, baseNodeBanks[0].publicKey, baseNodeBanks[0].vault, quoteRootBank.publicKey, quoteNodeBanks[0].publicKey, quoteNodeBanks[0].vault, spotMarket.publicKey, spotMarket.bidsAddress, spotMarket.asksAddress, mangoAccount.spotOpenOrders[spotMarketIndex], mangoGroup.signerKey, spotMarket['_decoded'].eventQueue, spotMarket['_decoded'].baseVault, spotMarket['_decoded'].quoteVault, dexSigner, mangoGroup.dexProgramId, new bn_js_1.default(limit), ownerIsSigner);
            const transaction = new web3_js_1.Transaction();
            transaction.add(instruction);
            return yield this.sendTransaction(transaction, owner, []);
        });
    }
    ensureOpenOrdersAccount(mangoAccount, mangoGroup, payer, spotMarket, spotMarketConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mangoAccount.spotOpenOrdersAccounts[spotMarketConfig.marketIndex]) {
                return;
            }
            const [openOrdersPk] = yield web3_js_1.PublicKey.findProgramAddress([
                mangoAccount.publicKey.toBytes(),
                new bn_js_1.default(spotMarketConfig.marketIndex).toArrayLike(Buffer, 'le', 8),
                new Buffer('OpenOrders', 'utf-8'),
            ], this.programId);
            const createSpotOpenOrdersInstruction = (0, instruction_2.makeCreateSpotOpenOrdersInstruction)(this.programId, mangoGroup.publicKey, mangoAccount.publicKey, payer.publicKey, mangoGroup.dexProgramId, openOrdersPk, spotMarket.publicKey, mangoGroup.signerKey);
            const recentBlockHash = yield this.connection.getLatestBlockhash('finalized');
            const tx = new web3_js_1.Transaction({
                recentBlockhash: recentBlockHash.blockhash,
                feePayer: payer.publicKey,
            });
            tx.add(createSpotOpenOrdersInstruction);
            tx.sign(payer);
            try {
                yield this.sendSignedTransaction({
                    signedTransaction: tx,
                    signedAtBlock: recentBlockHash,
                });
            }
            catch (e) {
                console.error(e);
            }
            yield mangoAccount.reload(this.connection, mangoGroup.dexProgramId);
            // ^ The newly created open orders account isn't immediately visible in
            // the already fetched Mango account, hence why it needs to be reloaded
        });
    }
    isMainnet() {
        var _a;
        // simplistic way of checking if we are on mainnet
        let rpcUrl = (_a = this.connection['_rpcEndpoint']) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        return (rpcUrl &&
            !rpcUrl.includes('devnet') &&
            !rpcUrl.includes('testnet') &&
            !rpcUrl.includes('localhost'));
    }
}
exports.MangoClient = MangoClient;
//# sourceMappingURL=client.js.map