"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCloseAdvancedOrdersInstruction = exports.makeCloseSpotOpenOrdersInstruction = exports.makeCloseMangoAccountInstruction = exports.makeExecutePerpTriggerOrderInstruction = exports.makeAddPerpTriggerOrderInstruction = exports.makeInitAdvancedOrdersInstruction = exports.makeRemoveAdvancedOrderInstruction = exports.makeSetGroupAdminInstruction = exports.makeChangePerpMarketParams2Instruction = exports.makeChangePerpMarketParamsInstruction = exports.makeWithdrawMsrmInstruction = exports.makeDepositMsrmInstruction = exports.makeAddMangoAccountInfoInstruction = exports.makeRedeemMngoInstruction = exports.makeResolveTokenBankruptcyInstruction = exports.makeResolvePerpBankruptcyInstruction = exports.makeSettleFeesInstruction = exports.makeLiquidatePerpMarketInstruction = exports.makeLiquidateTokenAndPerpInstruction = exports.makeLiquidateTokenAndTokenInstruction = exports.makeForceCancelPerpOrdersInstruction = exports.makeForceCancelSpotOrdersInstruction = exports.makeUpdateFundingInstruction = exports.makePlacePerpOrder2Instruction = exports.makePlacePerpOrderInstruction = exports.makeConsumeEventsInstruction = exports.makeSettlePnlInstruction = exports.makeCachePerpMarketsInstruction = exports.makeCreatePerpMarketInstruction = exports.makeAddPerpMarketInstruction = exports.makeSetOracleInstruction = exports.makeAddOracleInstruction = exports.makeUpdateRootBankInstruction = exports.makePlaceSpotOrder2Instruction = exports.makePlaceSpotOrderInstruction = exports.makeCreateSpotOpenOrdersInstruction = exports.makeInitSpotOpenOrdersInstruction = exports.makeAddSpotMarketInstruction = exports.makeCachePerpMarketInstruction = exports.makeCachePricesInstruction = exports.makeCacheRootBankInstruction = exports.makeDepositInstruction = exports.makeCancelAllPerpOrdersInstruction = exports.makeCancelPerpOrderByClientIdInstruction = exports.makeCancelPerpOrderInstruction = exports.makeCancelSpotOrderInstruction = exports.makeSettleFundsInstruction = exports.makeWithdrawInstruction = exports.makeInitMangoAccountInstruction = exports.makeInitMangoGroupInstruction = void 0;
exports.makeCancelAllSpotOrdersInstruction = exports.makeForceSettlePerpPositionInstruction = exports.makeLiquidateDelistingTokenInstruction = exports.makeRemoveOracleInstruction = exports.makeRemoveSpotMarketInstruction = exports.makeSwapSpotMarketInstruction = exports.makeRemovePerpMarketInstruction = exports.makeSetMarketModeInstruction = exports.makeWithdraw2Instruction = exports.makeRegisterReferrerIdInstruction = exports.makeSetReferrerMemoryInstruction = exports.makeChangeReferralFeeParams2Instruction = exports.makeChangeReferralFeeParamsInstruction = exports.makeChangeSpotMarketParamsInstruction = exports.makeSetDelegateInstruction = exports.makeCancelPerpOrdersSideInstruction = exports.makeChangeMaxMangoAccountsInstruction = exports.makeUpgradeMangoAccountV0V1Instruction = exports.makeCreateMangoAccountInstruction = exports.makeUpdateMarginBasketInstruction = exports.makeResolveDustInstruction = exports.makeCreateDustAccountInstruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const layout_1 = require("./layout");
const spl_token_1 = require("@solana/spl-token");
const fixednum_1 = require("./utils/fixednum");
const utils_1 = require("./utils/utils");
function makeInitMangoGroupInstruction(programId, mangoGroupPk, signerKey, payerPk, quoteMintPk, quoteVaultPk, quoteNodeBankPk, quoteRootBankPk, insuranceVaultPk, msrmVaultPk, feesVaultPk, mangoCachePk, dexProgramPk, signerNonce, validInterval, quoteOptimalUtil, quoteOptimalRate, quoteMaxRate) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: signerKey },
        { isSigner: true, isWritable: false, pubkey: payerPk },
        { isSigner: false, isWritable: false, pubkey: quoteMintPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: false, pubkey: insuranceVaultPk },
        { isSigner: false, isWritable: false, pubkey: msrmVaultPk },
        { isSigner: false, isWritable: false, pubkey: feesVaultPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: dexProgramPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        InitMangoGroup: {
            signerNonce,
            validInterval,
            quoteOptimalUtil,
            quoteOptimalRate,
            quoteMaxRate,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId: programId,
    });
}
exports.makeInitMangoGroupInstruction = makeInitMangoGroupInstruction;
function makeInitMangoAccountInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ InitMangoAccount: {} });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeInitMangoAccountInstruction = makeInitMangoAccountInstruction;
function makeWithdrawInstruction(programId, mangoGroupPk, mangoAccountPk, walletPk, mangoCachePk, rootBankPk, nodeBankPk, vaultPk, tokenAccPk, signerKey, openOrders, nativeQuantity, allowBorrow) {
    const withdrawKeys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: walletPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: true, pubkey: vaultPk },
        { isSigner: false, isWritable: true, pubkey: tokenAccPk },
        { isSigner: false, isWritable: false, pubkey: signerKey },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const withdrawData = (0, layout_1.encodeMangoInstruction)({
        Withdraw: { quantity: nativeQuantity, allowBorrow },
    });
    return new web3_js_1.TransactionInstruction({
        keys: withdrawKeys,
        data: withdrawData,
        programId,
    });
}
exports.makeWithdrawInstruction = makeWithdrawInstruction;
function makeSettleFundsInstruction(programId, mangoGroupPk, mangoCachePk, ownerPk, mangoAccountPk, dexProgramId, spotMarketPk, openOrdersPk, signerKey, spotMarketBaseVaultPk, spotMarketQuoteVaultPk, baseRootBankPk, baseNodeBankPk, quoteRootBankPk, quoteNodeBankPk, baseVaultPk, quoteVaultPk, dexSignerKey) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramId },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: openOrdersPk },
        { isSigner: false, isWritable: false, pubkey: signerKey },
        { isSigner: false, isWritable: true, pubkey: spotMarketBaseVaultPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketQuoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: baseRootBankPk },
        { isSigner: false, isWritable: true, pubkey: baseNodeBankPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: baseVaultPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: dexSignerKey },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ SettleFunds: {} });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeSettleFundsInstruction = makeSettleFundsInstruction;
function makeCancelSpotOrderInstruction(programId, mangoGroupPk, ownerPk, mangoAccountPk, dexProgramId, spotMarketPk, bidsPk, asksPk, openOrdersPk, signerKey, eventQueuePk, order) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: mangoAccountPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramId },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: openOrdersPk },
        { isSigner: false, isWritable: false, pubkey: signerKey },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelSpotOrder: {
            side: order.side,
            orderId: order.orderId,
        },
    });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeCancelSpotOrderInstruction = makeCancelSpotOrderInstruction;
function makeCancelPerpOrderInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, perpMarketPk, bidsPk, asksPk, order, invalidIdOk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelPerpOrder: {
            orderId: order.orderId,
            invalidIdOk,
        },
    });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeCancelPerpOrderInstruction = makeCancelPerpOrderInstruction;
function makeCancelPerpOrderByClientIdInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, perpMarketPk, bidsPk, asksPk, clientOrderId, invalidIdOk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelPerpOrderByClientId: {
            clientOrderId,
            invalidIdOk,
        },
    });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeCancelPerpOrderByClientIdInstruction = makeCancelPerpOrderByClientIdInstruction;
function makeCancelAllPerpOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, perpMarketPk, bidsPk, asksPk, limit, ownerIsSigner = true) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: ownerIsSigner, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelAllPerpOrders: {
            limit,
        },
    });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeCancelAllPerpOrdersInstruction = makeCancelAllPerpOrdersInstruction;
function makeDepositInstruction(programId, mangoGroupPk, ownerPk, merpsCachePk, mangoAccountPk, rootBankPk, nodeBankPk, vaultPk, tokenAccPk, nativeQuantity) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: merpsCachePk },
        { isSigner: false, isWritable: true, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: true, pubkey: vaultPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        { isSigner: false, isWritable: true, pubkey: tokenAccPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        Deposit: { quantity: nativeQuantity },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeDepositInstruction = makeDepositInstruction;
function makeCacheRootBankInstruction(programId, mangoGroupPk, mangoCachePk, rootBanks) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        ...rootBanks.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CacheRootBanks: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCacheRootBankInstruction = makeCacheRootBankInstruction;
function makeCachePricesInstruction(programId, mangoGroupPk, mangoCachePk, oracles) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        ...oracles.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CachePrices: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCachePricesInstruction = makeCachePricesInstruction;
function makeCachePerpMarketInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPks) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        ...perpMarketPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CachePerpMarkets: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCachePerpMarketInstruction = makeCachePerpMarketInstruction;
function makeAddSpotMarketInstruction(programId, mangoGroupPk, oraclePk, spotMarketPk, serumDexPk, mintPk, nodeBankPk, vaultPk, rootBankPk, adminPk, maintLeverage, initLeverage, liquidationFee, optimalUtil, optimalRate, maxRate) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: oraclePk },
        { isSigner: false, isWritable: false, pubkey: spotMarketPk },
        { isSigner: false, isWritable: false, pubkey: serumDexPk },
        { isSigner: false, isWritable: false, pubkey: mintPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: false, pubkey: vaultPk },
        { isSigner: false, isWritable: true, pubkey: rootBankPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        AddSpotMarket: {
            maintLeverage,
            initLeverage,
            liquidationFee,
            optimalUtil,
            optimalRate,
            maxRate,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeAddSpotMarketInstruction = makeAddSpotMarketInstruction;
function makeInitSpotOpenOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, serumDexPk, openOrdersPk, spotMarketPk, signerPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: serumDexPk },
        { isSigner: false, isWritable: true, pubkey: openOrdersPk },
        { isSigner: false, isWritable: false, pubkey: spotMarketPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SYSVAR_RENT_PUBKEY },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        InitSpotOpenOrders: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeInitSpotOpenOrdersInstruction = makeInitSpotOpenOrdersInstruction;
function makeCreateSpotOpenOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, serumDexPk, openOrdersPk, spotMarketPk, signerPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: serumDexPk },
        { isSigner: false, isWritable: true, pubkey: openOrdersPk },
        { isSigner: false, isWritable: false, pubkey: spotMarketPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CreateSpotOpenOrders: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCreateSpotOpenOrdersInstruction = makeCreateSpotOpenOrdersInstruction;
function makePlaceSpotOrderInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, mangoCachePk, serumDexPk, spotMarketPk, bidsPk, asksPk, requestQueuePk, eventQueuePk, spotMktBaseVaultPk, spotMktQuoteVaultPk, baseRootBankPk, baseNodeBankPk, baseVaultPk, quoteRootBankPk, quoteNodeBankPk, quoteVaultPk, signerPk, dexSignerPk, msrmOrSrmVaultPk, 
// pass in only openOrders in margin basket, and only the market index one should be writable
openOrders, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, selfTradeBehavior, orderType, clientId) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: serumDexPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: requestQueuePk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: spotMktBaseVaultPk },
        { isSigner: false, isWritable: true, pubkey: spotMktQuoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: baseRootBankPk },
        { isSigner: false, isWritable: true, pubkey: baseNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: baseVaultPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SYSVAR_RENT_PUBKEY },
        { isSigner: false, isWritable: false, pubkey: dexSignerPk },
        { isSigner: false, isWritable: false, pubkey: msrmOrSrmVaultPk },
        ...openOrders.map(({ pubkey, isWritable }) => ({
            isSigner: false,
            isWritable,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        PlaceSpotOrder: {
            side,
            limitPrice,
            maxBaseQuantity,
            maxQuoteQuantity,
            selfTradeBehavior,
            orderType,
            clientId,
            limit: 65535,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makePlaceSpotOrderInstruction = makePlaceSpotOrderInstruction;
function makePlaceSpotOrder2Instruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, mangoCachePk, serumDexPk, spotMarketPk, bidsPk, asksPk, requestQueuePk, eventQueuePk, spotMktBaseVaultPk, spotMktQuoteVaultPk, baseRootBankPk, baseNodeBankPk, baseVaultPk, quoteRootBankPk, quoteNodeBankPk, quoteVaultPk, signerPk, dexSignerPk, msrmOrSrmVaultPk, 
// pass in only openOrders in margin basket, and only the market index one should be writable
openOrders, side, limitPrice, maxBaseQuantity, maxQuoteQuantity, selfTradeBehavior, orderType, clientOrderId) {
    // TODO - this is wrong, accounts have changed in place spot 2
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: serumDexPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: requestQueuePk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: spotMktBaseVaultPk },
        { isSigner: false, isWritable: true, pubkey: spotMktQuoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: baseRootBankPk },
        { isSigner: false, isWritable: true, pubkey: baseNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: baseVaultPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: dexSignerPk },
        { isSigner: false, isWritable: false, pubkey: msrmOrSrmVaultPk },
        ...openOrders.map(({ pubkey, isWritable }) => ({
            isSigner: false,
            isWritable,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        PlaceSpotOrder2: {
            side,
            limitPrice,
            maxBaseQuantity,
            maxQuoteQuantity,
            selfTradeBehavior,
            orderType,
            clientOrderId,
            limit: 65535,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makePlaceSpotOrder2Instruction = makePlaceSpotOrder2Instruction;
function makeUpdateRootBankInstruction(programId, mangoGroupPk, mangoCachePk, rootBankPk, nodeBanks) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: rootBankPk },
        ...nodeBanks.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        UpdateRootBank: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeUpdateRootBankInstruction = makeUpdateRootBankInstruction;
function makeAddOracleInstruction(programId, mangoGroupPk, oraclePk, adminPk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: oraclePk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ AddOracle: {} });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeAddOracleInstruction = makeAddOracleInstruction;
function makeSetOracleInstruction(programId, mangoGroupPk, oraclePk, adminPk, price) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: oraclePk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SetOracle: { price },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSetOracleInstruction = makeSetOracleInstruction;
function makeAddPerpMarketInstruction(programId, mangoGroupPk, oraclePk, perpMarketPk, eventQueuePk, bidsPk, asksPk, mngoVaultPk, adminPk, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, baseLotSize, quoteLotSize, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: oraclePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: false, pubkey: mngoVaultPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        AddPerpMarket: {
            maintLeverage,
            initLeverage,
            liquidationFee,
            makerFee,
            takerFee,
            baseLotSize,
            quoteLotSize,
            rate,
            maxDepthBps,
            targetPeriodLength,
            mngoPerPeriod,
            exp,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeAddPerpMarketInstruction = makeAddPerpMarketInstruction;
function makeCreatePerpMarketInstruction(programId, mangoGroupPk, oraclePk, perpMarketPk, eventQueuePk, bidsPk, asksPk, mngoMintPk, mngoVaultPk, adminPk, signerPk, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, baseLotSize, quoteLotSize, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp, version, lmSizeShift, baseDecimals) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: oraclePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: false, pubkey: mngoMintPk },
        { isSigner: false, isWritable: true, pubkey: mngoVaultPk },
        { isSigner: true, isWritable: true, pubkey: adminPk },
        { isSigner: false, isWritable: true, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SYSVAR_RENT_PUBKEY },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CreatePerpMarket: {
            maintLeverage,
            initLeverage,
            liquidationFee,
            makerFee,
            takerFee,
            baseLotSize,
            quoteLotSize,
            rate,
            maxDepthBps,
            targetPeriodLength,
            mngoPerPeriod,
            exp,
            version,
            lmSizeShift,
            baseDecimals,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCreatePerpMarketInstruction = makeCreatePerpMarketInstruction;
function makeCachePerpMarketsInstruction(programId, mangoGroupPk, mangoCachePk, perpMarkets) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        ...perpMarkets.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CachePerpMarkets: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCachePerpMarketsInstruction = makeCachePerpMarketsInstruction;
function makeSettlePnlInstruction(programId, mangoGroupPk, mangoAccountAPk, mangoAccountBPk, mangoCachePk, rootBankPk, nodeBankPk, marketIndex) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountAPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountBPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SettlePnl: {
            marketIndex,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSettlePnlInstruction = makeSettlePnlInstruction;
function makeConsumeEventsInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPk, eventQueuePk, mangoAccountPks, limit) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        ...mangoAccountPks.sort().map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ConsumeEvents: { limit },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeConsumeEventsInstruction = makeConsumeEventsInstruction;
function makePlacePerpOrderInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, mangoCachePk, perpMarketPk, bidsPk, asksPk, eventQueuePk, openOrders, price, quantity, clientOrderId, side, orderType, reduceOnly, referrerMangoAccountPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    if (referrerMangoAccountPk !== undefined) {
        keys.push({
            isSigner: false,
            isWritable: true,
            pubkey: referrerMangoAccountPk,
        });
    }
    const data = (0, layout_1.encodeMangoInstruction)({
        PlacePerpOrder: {
            price,
            quantity,
            clientOrderId,
            side,
            orderType,
            reduceOnly: reduceOnly ? reduceOnly : false,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makePlacePerpOrderInstruction = makePlacePerpOrderInstruction;
function makePlacePerpOrder2Instruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, mangoCachePk, perpMarketPk, bidsPk, asksPk, eventQueuePk, openOrders, // pass in only open orders in margin basket
price, maxBaseQuantity, maxQuoteQuantity, clientOrderId, side, limit, // one byte; max 255
orderType, reduceOnly, referrerMangoAccountPk, expiryTimestamp, expiryType) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        {
            isSigner: false,
            isWritable: true,
            pubkey: referrerMangoAccountPk ? referrerMangoAccountPk : mangoAccountPk,
        },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    if (referrerMangoAccountPk !== undefined) {
        keys.push({
            isSigner: false,
            isWritable: true,
            pubkey: referrerMangoAccountPk,
        });
    }
    const data = (0, layout_1.encodeMangoInstruction)({
        PlacePerpOrder2: {
            price,
            maxBaseQuantity,
            maxQuoteQuantity,
            clientOrderId,
            expiryTimestamp: expiryTimestamp ? expiryTimestamp : utils_1.ZERO_BN,
            side,
            orderType,
            reduceOnly: reduceOnly ? reduceOnly : false,
            limit,
            expiryType,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makePlacePerpOrder2Instruction = makePlacePerpOrder2Instruction;
function makeUpdateFundingInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPk, bidsPk, asksPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: false, pubkey: bidsPk },
        { isSigner: false, isWritable: false, pubkey: asksPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        UpdateFunding: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeUpdateFundingInstruction = makeUpdateFundingInstruction;
function makeForceCancelSpotOrdersInstruction(programId, mangoGroupPk, mangoCachePk, liqeeMangoAccountPk, baseRootBankPk, baseNodeBankPk, baseVaultPk, quoteRootBankPk, quoteNodeBankPk, quoteVaultPk, spotMarketPk, bidsPk, asksPk, signerPk, dexEventQueuePk, dexBasePk, dexQuotePk, dexSignerPk, dexProgramPk, liqeeOpenOrdersKeys, limit) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: false, pubkey: baseRootBankPk },
        { isSigner: false, isWritable: true, pubkey: baseNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: baseVaultPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: true, pubkey: dexEventQueuePk },
        { isSigner: false, isWritable: true, pubkey: dexBasePk },
        { isSigner: false, isWritable: true, pubkey: dexQuotePk },
        { isSigner: false, isWritable: false, pubkey: dexSignerPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...liqeeOpenOrdersKeys.map(({ pubkey, isWritable }) => ({
            isSigner: false,
            isWritable,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ForceCancelSpotOrders: {
            limit,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeForceCancelSpotOrdersInstruction = makeForceCancelSpotOrdersInstruction;
function makeForceCancelPerpOrdersInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPk, bidsPk, asksPk, liqeeMangoAccountPk, liqorOpenOrdersPks, limit) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ForceCancelPerpOrders: {
            limit,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeForceCancelPerpOrdersInstruction = makeForceCancelPerpOrdersInstruction;
function makeLiquidateTokenAndTokenInstruction(programId, mangoGroupPk, mangoCachePk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorAccountPk, assetRootBankPk, assetNodeBankPk, liabRootBankPk, liabNodeBankPk, liqeeOpenOrdersPks, liqorOpenOrdersPks, maxLiabTransfer) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorAccountPk },
        { isSigner: false, isWritable: false, pubkey: assetRootBankPk },
        { isSigner: false, isWritable: true, pubkey: assetNodeBankPk },
        { isSigner: false, isWritable: false, pubkey: liabRootBankPk },
        { isSigner: false, isWritable: true, pubkey: liabNodeBankPk },
        ...liqeeOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        LiquidateTokenAndToken: {
            maxLiabTransfer,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeLiquidateTokenAndTokenInstruction = makeLiquidateTokenAndTokenInstruction;
function makeLiquidateTokenAndPerpInstruction(programId, mangoGroupPk, mangoCachePk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorAccountPk, rootBankPk, nodeBankPk, liqeeOpenOrdersPks, liqorOpenOrdersPks, assetType, assetIndex, liabType, liabIndex, maxLiabTransfer) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorAccountPk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        ...liqeeOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        LiquidateTokenAndPerp: {
            assetType,
            assetIndex,
            liabType,
            liabIndex,
            maxLiabTransfer,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeLiquidateTokenAndPerpInstruction = makeLiquidateTokenAndPerpInstruction;
function makeLiquidatePerpMarketInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPk, eventQueuePk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorAccountPk, liqeeOpenOrdersPks, liqorOpenOrdersPks, baseTransferRequest) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorAccountPk },
        ...liqeeOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        LiquidatePerpMarket: {
            baseTransferRequest,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeLiquidatePerpMarketInstruction = makeLiquidatePerpMarketInstruction;
function makeSettleFeesInstruction(programId, mangoGroupPk, mangoCachePk, perpMarketPk, mangoAccountPk, rootBankPk, nodeBankPk, bankVaultPk, feesVaultPk, signerPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: true, pubkey: bankVaultPk },
        { isSigner: false, isWritable: true, pubkey: feesVaultPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SettleFees: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSettleFeesInstruction = makeSettleFeesInstruction;
function makeResolvePerpBankruptcyInstruction(programId, mangoGroupPk, mangoCachePk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorPk, rootBankPk, nodeBankPk, vaultPk, insuranceVaultPk, signerPk, perpMarketPk, liqorOpenOrdersPks, liabIndex, maxLiabTransfer) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorPk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: true, pubkey: vaultPk },
        { isSigner: false, isWritable: true, pubkey: insuranceVaultPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ResolvePerpBankruptcy: {
            liabIndex,
            maxLiabTransfer,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeResolvePerpBankruptcyInstruction = makeResolvePerpBankruptcyInstruction;
function makeResolveTokenBankruptcyInstruction(programId, mangoGroupPk, mangoCachePk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorPk, quoteRootBankPk, quoteNodeBankPk, quoteVaultPk, insuranceVaultPk, signerPk, liabRootBankPk, liabNodeBankPk, liqorOpenOrdersPks, liabNodeBankPks, maxLiabTransfer) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: true, pubkey: insuranceVaultPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: true, pubkey: liabRootBankPk },
        { isSigner: false, isWritable: true, pubkey: liabNodeBankPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
        ...liabNodeBankPks.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ResolveTokenBankruptcy: {
            maxLiabTransfer,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeResolveTokenBankruptcyInstruction = makeResolveTokenBankruptcyInstruction;
function makeRedeemMngoInstruction(programId, mangoGroup, mangoCache, mangoAccount, owner, perpMarket, mngoPerpVault, mngoRootBank, mngoNodeBank, mngoBankVault, signer) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroup },
        { isSigner: false, isWritable: false, pubkey: mangoCache },
        { isSigner: false, isWritable: true, pubkey: mangoAccount },
        { isSigner: true, isWritable: false, pubkey: owner },
        { isSigner: false, isWritable: false, pubkey: perpMarket },
        { isSigner: false, isWritable: true, pubkey: mngoPerpVault },
        { isSigner: false, isWritable: false, pubkey: mngoRootBank },
        { isSigner: false, isWritable: true, pubkey: mngoNodeBank },
        { isSigner: false, isWritable: true, pubkey: mngoBankVault },
        { isSigner: false, isWritable: false, pubkey: signer },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ RedeemMngo: {} });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeRedeemMngoInstruction = makeRedeemMngoInstruction;
function makeAddMangoAccountInfoInstruction(programId, mangoGroup, mangoAccount, owner, info) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroup },
        { isSigner: false, isWritable: true, pubkey: mangoAccount },
        { isSigner: true, isWritable: false, pubkey: owner },
    ];
    // TODO convert info into a 32 byte utf encoded byte array
    const encoded = Buffer.from(info);
    if (encoded.length > layout_1.INFO_LEN) {
        throw new Error('info string too long. Must be less than or equal to 32 bytes');
    }
    const infoArray = new Uint8Array(encoded, 0, layout_1.INFO_LEN);
    const data = (0, layout_1.encodeMangoInstruction)({
        AddMangoAccountInfo: { info: infoArray },
    });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeAddMangoAccountInfoInstruction = makeAddMangoAccountInfoInstruction;
function makeDepositMsrmInstruction(programId, mangoGroup, mangoAccount, owner, msrmAccount, msrmVault, quantity) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroup },
        { isSigner: false, isWritable: true, pubkey: mangoAccount },
        { isSigner: true, isWritable: false, pubkey: owner },
        { isSigner: false, isWritable: true, pubkey: msrmAccount },
        { isSigner: false, isWritable: true, pubkey: msrmVault },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ DepositMsrm: { quantity } });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeDepositMsrmInstruction = makeDepositMsrmInstruction;
function makeWithdrawMsrmInstruction(programId, mangoGroup, mangoAccount, owner, msrmAccount, msrmVault, signer, quantity) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroup },
        { isSigner: false, isWritable: true, pubkey: mangoAccount },
        { isSigner: true, isWritable: false, pubkey: owner },
        { isSigner: false, isWritable: true, pubkey: msrmAccount },
        { isSigner: false, isWritable: true, pubkey: msrmVault },
        { isSigner: false, isWritable: false, pubkey: signer },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({ WithdrawMsrm: { quantity } });
    return new web3_js_1.TransactionInstruction({ keys, data, programId });
}
exports.makeWithdrawMsrmInstruction = makeWithdrawMsrmInstruction;
function makeChangePerpMarketParamsInstruction(programId, mangoGroupPk, perpMarketPk, adminPk, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangePerpMarketParams: {
            maintLeverageOption: maintLeverage !== undefined,
            maintLeverage: maintLeverage !== undefined ? maintLeverage : fixednum_1.ZERO_I80F48,
            initLeverageOption: initLeverage !== undefined,
            initLeverage: initLeverage !== undefined ? initLeverage : fixednum_1.ZERO_I80F48,
            liquidationFeeOption: liquidationFee !== undefined,
            liquidationFee: liquidationFee !== undefined ? liquidationFee : fixednum_1.ZERO_I80F48,
            makerFeeOption: makerFee !== undefined,
            makerFee: makerFee !== undefined ? makerFee : fixednum_1.ZERO_I80F48,
            takerFeeOption: takerFee !== undefined,
            takerFee: takerFee !== undefined ? takerFee : fixednum_1.ZERO_I80F48,
            rateOption: rate !== undefined,
            rate: rate !== undefined ? rate : fixednum_1.ZERO_I80F48,
            maxDepthBpsOption: maxDepthBps !== undefined,
            maxDepthBps: maxDepthBps !== undefined ? maxDepthBps : fixednum_1.ZERO_I80F48,
            targetPeriodLengthOption: targetPeriodLength !== undefined,
            targetPeriodLength: targetPeriodLength !== undefined ? targetPeriodLength : utils_1.ZERO_BN,
            mngoPerPeriodOption: mngoPerPeriod !== undefined,
            mngoPerPeriod: mngoPerPeriod !== undefined ? mngoPerPeriod : utils_1.ZERO_BN,
            expOption: exp !== undefined,
            exp: exp !== undefined ? exp : utils_1.ZERO_BN,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangePerpMarketParamsInstruction = makeChangePerpMarketParamsInstruction;
function makeChangePerpMarketParams2Instruction(programId, mangoGroupPk, perpMarketPk, adminPk, maintLeverage, initLeverage, liquidationFee, makerFee, takerFee, rate, maxDepthBps, targetPeriodLength, mngoPerPeriod, exp, version, lmSizeShift) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangePerpMarketParams2: {
            maintLeverageOption: maintLeverage !== undefined,
            maintLeverage: maintLeverage !== undefined ? maintLeverage : fixednum_1.ZERO_I80F48,
            initLeverageOption: initLeverage !== undefined,
            initLeverage: initLeverage !== undefined ? initLeverage : fixednum_1.ZERO_I80F48,
            liquidationFeeOption: liquidationFee !== undefined,
            liquidationFee: liquidationFee !== undefined ? liquidationFee : fixednum_1.ZERO_I80F48,
            makerFeeOption: makerFee !== undefined,
            makerFee: makerFee !== undefined ? makerFee : fixednum_1.ZERO_I80F48,
            takerFeeOption: takerFee !== undefined,
            takerFee: takerFee !== undefined ? takerFee : fixednum_1.ZERO_I80F48,
            rateOption: rate !== undefined,
            rate: rate !== undefined ? rate : fixednum_1.ZERO_I80F48,
            maxDepthBpsOption: maxDepthBps !== undefined,
            maxDepthBps: maxDepthBps !== undefined ? maxDepthBps : fixednum_1.ZERO_I80F48,
            targetPeriodLengthOption: targetPeriodLength !== undefined,
            targetPeriodLength: targetPeriodLength !== undefined ? targetPeriodLength : utils_1.ZERO_BN,
            mngoPerPeriodOption: mngoPerPeriod !== undefined,
            mngoPerPeriod: mngoPerPeriod !== undefined ? mngoPerPeriod : utils_1.ZERO_BN,
            expOption: exp !== undefined,
            exp: exp !== undefined ? exp : utils_1.ZERO_BN,
            versionOption: version !== undefined,
            version: version !== undefined ? version : utils_1.ZERO_BN,
            lmSizeShiftOption: lmSizeShift !== undefined,
            lmSizeShift: lmSizeShift !== undefined ? lmSizeShift : utils_1.ZERO_BN,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangePerpMarketParams2Instruction = makeChangePerpMarketParams2Instruction;
function makeSetGroupAdminInstruction(programId, mangoGroupPk, newAdminPk, adminPk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: newAdminPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SetGroupAdmin: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSetGroupAdminInstruction = makeSetGroupAdminInstruction;
function makeRemoveAdvancedOrderInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, advancedOrdersPk, orderIndex) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: advancedOrdersPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        RemoveAdvancedOrder: { orderIndex },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeRemoveAdvancedOrderInstruction = makeRemoveAdvancedOrderInstruction;
function makeInitAdvancedOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, advancedOrdersPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: advancedOrdersPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        InitAdvancedOrders: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeInitAdvancedOrdersInstruction = makeInitAdvancedOrdersInstruction;
function makeAddPerpTriggerOrderInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, advancedOrdersPk, mangoCachePk, perpMarketPk, openOrders, orderType, side, price, quantity, triggerCondition, triggerPrice, reduceOnly, clientOrderId) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: advancedOrdersPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: perpMarketPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        AddPerpTriggerOrder: {
            price,
            quantity,
            clientOrderId,
            side,
            orderType,
            triggerCondition,
            triggerPrice,
            reduceOnly,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeAddPerpTriggerOrderInstruction = makeAddPerpTriggerOrderInstruction;
function makeExecutePerpTriggerOrderInstruction(programId, mangoGroupPk, mangoAccountPk, advancedOrdersPk, agentPk, mangoCachePk, perpMarketPk, bidsPk, asksPk, eventQueuePk, openOrders, orderIndex) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: advancedOrdersPk },
        { isSigner: true, isWritable: true, pubkey: agentPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ExecutePerpTriggerOrder: {
            orderIndex,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeExecutePerpTriggerOrderInstruction = makeExecutePerpTriggerOrderInstruction;
function makeCloseMangoAccountInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: ownerPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CloseMangoAccount: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCloseMangoAccountInstruction = makeCloseMangoAccountInstruction;
function makeCloseSpotOpenOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, dexProgramPk, openOrdersPk, spotMarketPk, signerPk, ownerIsSigner = true) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: ownerIsSigner, isWritable: true, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramPk },
        { isSigner: false, isWritable: true, pubkey: openOrdersPk },
        { isSigner: false, isWritable: false, pubkey: spotMarketPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CloseSpotOpenOrders: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCloseSpotOpenOrdersInstruction = makeCloseSpotOpenOrdersInstruction;
function makeCloseAdvancedOrdersInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, advancedOrdersPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: advancedOrdersPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CloseAdvancedOrders: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCloseAdvancedOrdersInstruction = makeCloseAdvancedOrdersInstruction;
function makeCreateDustAccountInstruction(programId, mangoGroupPk, mangoAccountPk, payerPK) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: payerPK },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CreateDustAccount: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCreateDustAccountInstruction = makeCreateDustAccountInstruction;
function makeResolveDustInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, dustAccountPk, rootBankPk, nodeBankPk, mangoCachePk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: dustAccountPk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ResolveDust: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeResolveDustInstruction = makeResolveDustInstruction;
function makeUpdateMarginBasketInstruction(programId, mangoGroupPk, mangoAccountPk, openOrdersPks) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        ...openOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        UpdateMarginBasket: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeUpdateMarginBasketInstruction = makeUpdateMarginBasketInstruction;
function makeCreateMangoAccountInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, accountNum, payer) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
        { isSigner: true, isWritable: true, pubkey: payer },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CreateMangoAccount: {
            accountNum,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCreateMangoAccountInstruction = makeCreateMangoAccountInstruction;
function makeUpgradeMangoAccountV0V1Instruction(programId, mangoGroupPk, mangoAccountPk, ownerPk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        UpgradeMangoAccountV0V1: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeUpgradeMangoAccountV0V1Instruction = makeUpgradeMangoAccountV0V1Instruction;
function makeChangeMaxMangoAccountsInstruction(programId, mangoGroupPk, adminPk, maxMangoAccounts) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangeMaxMangoAccounts: {
            maxMangoAccounts,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangeMaxMangoAccountsInstruction = makeChangeMaxMangoAccountsInstruction;
function makeCancelPerpOrdersSideInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, perpMarketPk, bidsPk, asksPk, side, limit) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelPerpOrdersSide: {
            side,
            limit,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCancelPerpOrdersSideInstruction = makeCancelPerpOrdersSideInstruction;
function makeSetDelegateInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, delegatePk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: false, pubkey: delegatePk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SetDelegate: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSetDelegateInstruction = makeSetDelegateInstruction;
function makeChangeSpotMarketParamsInstruction(programId, mangoGroupPk, spotMarketPk, rootBankPk, adminPk, maintLeverage, initLeverage, liquidationFee, optimalUtil, optimalRate, maxRate, version) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: rootBankPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangeSpotMarketParams: {
            maintLeverageOption: maintLeverage !== undefined,
            maintLeverage: maintLeverage != undefined ? maintLeverage : fixednum_1.ZERO_I80F48,
            initLeverageOption: initLeverage !== undefined,
            initLeverage: initLeverage != undefined ? initLeverage : fixednum_1.ZERO_I80F48,
            liquidationFeeOption: liquidationFee !== undefined,
            liquidationFee: liquidationFee != undefined ? liquidationFee : fixednum_1.ZERO_I80F48,
            optimalUtilOption: optimalUtil !== undefined,
            optimalUtil: optimalUtil != undefined ? optimalUtil : fixednum_1.ZERO_I80F48,
            optimalRateOption: optimalRate !== undefined,
            optimalRate: optimalRate != undefined ? optimalRate : fixednum_1.ZERO_I80F48,
            maxRateOption: maxRate !== undefined,
            maxRate: maxRate != undefined ? maxRate : fixednum_1.ZERO_I80F48,
            versionOption: version !== undefined,
            version: version != undefined ? version : utils_1.ZERO_BN,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangeSpotMarketParamsInstruction = makeChangeSpotMarketParamsInstruction;
function makeChangeReferralFeeParamsInstruction(programId, mangoGroupPk, adminPk, refSurchargeCentibps, refShareCentibps, refMngoRequired) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangeReferralFeeParams: {
            refSurchargeCentibps,
            refShareCentibps,
            refMngoRequired,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangeReferralFeeParamsInstruction = makeChangeReferralFeeParamsInstruction;
function makeChangeReferralFeeParams2Instruction(programId, mangoGroupPk, adminPk, refSurchargeCentibpsTier1, refShareCentibpsTier1, refSurchargeCentibpsTier2, refShareCentibpsTier2, refMngoRequired, refMngoTier2Factor) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ChangeReferralFeeParams2: {
            refSurchargeCentibpsTier1,
            refShareCentibpsTier1,
            refSurchargeCentibpsTier2,
            refShareCentibpsTier2,
            refMngoRequired,
            refMngoTier2Factor,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeChangeReferralFeeParams2Instruction = makeChangeReferralFeeParams2Instruction;
function makeSetReferrerMemoryInstruction(programId, mangoGroupPk, mangoAccountPk, ownerPk, referrerMemoryPk, referrerMangoAccountPk, payerPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: ownerPk },
        { isSigner: false, isWritable: true, pubkey: referrerMemoryPk },
        { isSigner: false, isWritable: false, pubkey: referrerMangoAccountPk },
        { isSigner: true, isWritable: true, pubkey: payerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SetReferrerMemory: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSetReferrerMemoryInstruction = makeSetReferrerMemoryInstruction;
function makeRegisterReferrerIdInstruction(programId, mangoGroupPk, referrerMangoAccountPk, referrerIdRecordPk, payerPk, referrerId) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: referrerMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: referrerIdRecordPk },
        { isSigner: true, isWritable: true, pubkey: payerPk },
        { isSigner: false, isWritable: false, pubkey: web3_js_1.SystemProgram.programId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        RegisterReferrerId: { referrerId },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeRegisterReferrerIdInstruction = makeRegisterReferrerIdInstruction;
function makeWithdraw2Instruction(programId, mangoGroupPk, mangoAccountPk, walletPk, mangoCachePk, rootBankPk, nodeBankPk, vaultPk, tokenAccPk, signerKey, 
// pass in only openOrders in margin basket
openOrders, nativeQuantity, allowBorrow) {
    const withdrawKeys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: walletPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: false, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: nodeBankPk },
        { isSigner: false, isWritable: true, pubkey: vaultPk },
        { isSigner: false, isWritable: true, pubkey: tokenAccPk },
        { isSigner: false, isWritable: false, pubkey: signerKey },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...openOrders.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const withdrawData = (0, layout_1.encodeMangoInstruction)({
        Withdraw2: { quantity: nativeQuantity, allowBorrow },
    });
    return new web3_js_1.TransactionInstruction({
        keys: withdrawKeys,
        data: withdrawData,
        programId,
    });
}
exports.makeWithdraw2Instruction = makeWithdraw2Instruction;
function makeSetMarketModeInstruction(programId, mangoGroupPk, adminPk, marketIndex, marketMode, marketType) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SetMarketMode: { marketIndex, marketMode, marketType },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSetMarketModeInstruction = makeSetMarketModeInstruction;
function makeRemovePerpMarketInstruction(programId, mangoGroupPk, adminPk, perpMarketPk, eventQueuePk, bidsPk, asksPk, mngoVaultPk, mngoDaoVaultPk, signerPk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: true, pubkey: adminPk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
        { isSigner: false, isWritable: true, pubkey: eventQueuePk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: mngoVaultPk },
        { isSigner: false, isWritable: true, pubkey: mngoDaoVaultPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        RemovePerpMarket: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeRemovePerpMarketInstruction = makeRemovePerpMarketInstruction;
function makeSwapSpotMarketInstruction(programId, mangoGroupPk, adminPk, newSpotMarketPk, oldSpotMarketPk, dexProgramId) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
        { isSigner: false, isWritable: false, pubkey: newSpotMarketPk },
        { isSigner: false, isWritable: false, pubkey: oldSpotMarketPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramId },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        SwapSpotMarket: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeSwapSpotMarketInstruction = makeSwapSpotMarketInstruction;
function makeRemoveSpotMarketInstruction(programId, mangoGroupPk, adminPk, dustAccountPk, rootBankPk, adminVaultPk, signerPk, nodeBanks, vaults) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: true, pubkey: adminPk },
        { isSigner: false, isWritable: true, pubkey: dustAccountPk },
        { isSigner: false, isWritable: true, pubkey: rootBankPk },
        { isSigner: false, isWritable: true, pubkey: adminVaultPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...nodeBanks.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
        ...vaults.map((pubkey) => ({
            isSigner: false,
            isWritable: true,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        RemoveSpotMarket: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeRemoveSpotMarketInstruction = makeRemoveSpotMarketInstruction;
function makeRemoveOracleInstruction(programId, mangoGroupPk, adminPk, oraclePk) {
    const keys = [
        { isSigner: false, isWritable: true, pubkey: mangoGroupPk },
        { isSigner: true, isWritable: false, pubkey: adminPk },
        { isSigner: false, isWritable: false, pubkey: oraclePk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        RemoveOracle: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeRemoveOracleInstruction = makeRemoveOracleInstruction;
function makeLiquidateDelistingTokenInstruction(programId, mangoGroupPk, mangoCachePk, dustAccountPk, liqeeMangoAccountPk, liqorMangoAccountPk, liqorPk, assetRootBankPk, assetNodeBankPk, liabRootBankPk, liabNodeBankPk, liabVaultPk, liqeeLiabTokenAccountPk, liqorLiabTokenAccountPk, signerPk, liqeeOpenOrdersPks, liqorOpenOrdersPks, maxLiquidateAmount) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: dustAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqeeMangoAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorMangoAccountPk },
        { isSigner: true, isWritable: false, pubkey: liqorPk },
        { isSigner: false, isWritable: false, pubkey: assetRootBankPk },
        { isSigner: false, isWritable: true, pubkey: assetNodeBankPk },
        { isSigner: false, isWritable: false, pubkey: liabRootBankPk },
        { isSigner: false, isWritable: true, pubkey: liabNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: liabVaultPk },
        { isSigner: false, isWritable: true, pubkey: liqeeLiabTokenAccountPk },
        { isSigner: false, isWritable: true, pubkey: liqorLiabTokenAccountPk },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
        ...liqeeOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
        ...liqorOpenOrdersPks.map((pubkey) => ({
            isSigner: false,
            isWritable: false,
            pubkey,
        })),
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        LiquidateDelistingToken: { maxLiquidateAmount: maxLiquidateAmount },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeLiquidateDelistingTokenInstruction = makeLiquidateDelistingTokenInstruction;
function makeForceSettlePerpPositionInstruction(programId, mangoGroupPk, mangoAccountAPk, mangoAccountBPk, mangoCachePk, perpMarketPk) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountAPk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountBPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: perpMarketPk },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        ForceSettlePerpPosition: {},
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeForceSettlePerpPositionInstruction = makeForceSettlePerpPositionInstruction;
function makeCancelAllSpotOrdersInstruction(programId, mangoGroupPk, mangoCachePk, mangoAccountPk, owner, baseRootBankPk, baseNodeBankPk, baseVaultPk, quoteRootBankPk, quoteNodeBankPk, quoteVaultPk, spotMarketPk, bidsPk, asksPk, openOrders, signerPk, dexEventQueuePk, dexBasePk, dexQuotePk, dexSignerPk, dexProgramPk, limit, ownerIsSigner = true) {
    const keys = [
        { isSigner: false, isWritable: false, pubkey: mangoGroupPk },
        { isSigner: false, isWritable: false, pubkey: mangoCachePk },
        { isSigner: false, isWritable: true, pubkey: mangoAccountPk },
        { isSigner: ownerIsSigner, isWritable: false, pubkey: owner },
        { isSigner: false, isWritable: false, pubkey: baseRootBankPk },
        { isSigner: false, isWritable: true, pubkey: baseNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: baseVaultPk },
        { isSigner: false, isWritable: false, pubkey: quoteRootBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteNodeBankPk },
        { isSigner: false, isWritable: true, pubkey: quoteVaultPk },
        { isSigner: false, isWritable: true, pubkey: spotMarketPk },
        { isSigner: false, isWritable: true, pubkey: bidsPk },
        { isSigner: false, isWritable: true, pubkey: asksPk },
        { isSigner: false, isWritable: true, pubkey: openOrders },
        { isSigner: false, isWritable: false, pubkey: signerPk },
        { isSigner: false, isWritable: true, pubkey: dexEventQueuePk },
        { isSigner: false, isWritable: true, pubkey: dexBasePk },
        { isSigner: false, isWritable: true, pubkey: dexQuotePk },
        { isSigner: false, isWritable: false, pubkey: dexSignerPk },
        { isSigner: false, isWritable: false, pubkey: dexProgramPk },
        { isSigner: false, isWritable: false, pubkey: spl_token_1.TOKEN_PROGRAM_ID },
    ];
    const data = (0, layout_1.encodeMangoInstruction)({
        CancelAllSpotOrders: {
            limit,
        },
    });
    return new web3_js_1.TransactionInstruction({
        keys,
        data,
        programId,
    });
}
exports.makeCancelAllSpotOrdersInstruction = makeCancelAllSpotOrdersInstruction;
//# sourceMappingURL=instruction.js.map