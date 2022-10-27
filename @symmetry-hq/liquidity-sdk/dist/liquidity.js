"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwapInstruction = exports.loadRouteData = exports.checkForLiquidity = exports.availableRoutes = void 0;
const anchor_1 = require("@project-serum/anchor");
const token_1 = require("@project-serum/anchor/dist/cjs/utils/token");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("./types");
function availableRoutes(tokenInfoData, fund, pythPrices) {
    let fundWorth = 0;
    let numTokens = fund.numOfTokens.toNumber();
    for (let i = 0; i < numTokens; i++) {
        let token = fund.currentCompToken[i].toNumber();
        let amount = fund.currentCompAmount[i].toNumber();
        let priceData = pythPrices[token];
        let price = priceData.aggregate.price;
        let tokenAmount = amount / 10 ** tokenInfoData[token].decimals;
        let tokenValue = price * tokenAmount;
        fundWorth += tokenValue;
    }
    let result = [];
    for (let i = 0; i < numTokens; i++) {
        let token = fund.currentCompToken[i].toNumber();
        let amount = fund.currentCompAmount[i].toNumber();
        let priceData = pythPrices[token];
        let price = priceData.aggregate.price;
        let tokenAmount = amount / 10 ** tokenInfoData[token].decimals;
        let tokenValue = price * tokenAmount;
        let offset = (fund.rebalanceThreshold.toNumber() / 10000) * (fund.lpOffsetThreshold.toNumber() / 10000);
        let maxWorth = fundWorth * fund.targetWeight[i].toNumber()
            / fund.weightSum.toNumber() * (1 + offset);
        let minWorth = fundWorth * fund.targetWeight[i].toNumber()
            / fund.weightSum.toNumber() * (1 - offset);
        result.push({
            tokenMint: tokenInfoData[token].mint,
            coingeckoId: tokenInfoData[token].coingeckoId,
            userCanSellToFund: Math.max(0, (maxWorth - tokenValue) / price),
            userCanBuyFromFund: Math.max(0, (tokenValue - minWorth) / price),
        });
    }
    return result;
}
exports.availableRoutes = availableRoutes;
function checkForLiquidity(tokenInfoData, fundAddress, fund, pythPrices, tokenFrom, tokenTo, fromAmount) {
    let initialAmount = fromAmount;
    let fundWorth = 0;
    let numTokens = fund.numOfTokens.toNumber();
    let fromTokenIndex = -1;
    let toTokenIndex = -1;
    for (let i = 0; i < numTokens; i++) {
        let token = fund.currentCompToken[i].toNumber();
        let amount = fund.currentCompAmount[i].toNumber();
        let priceData = pythPrices[token];
        let price = priceData.aggregate.price;
        let tokenAmount = amount / 10 ** tokenInfoData[token].decimals;
        let tokenValue = price * tokenAmount;
        fundWorth += tokenValue;
        if (token == tokenFrom)
            fromTokenIndex = i;
        if (token == tokenTo)
            toTokenIndex = i;
    }
    if (fromTokenIndex == -1 || toTokenIndex == -1 || fundWorth == 0)
        return undefined;
    let weightSum = fund.weightSum.toNumber();
    let fee = 0;
    if (tokenFrom == 0) {
        fee = (fund.fundLpFee.toNumber() + fund.symmetryLpFee.toNumber()) *
            fromAmount / 10000;
        if (tokenTo == 4)
            fee = 5 * fromAmount / 1000000;
        fromAmount -= fee;
    }
    let fromDecimals = 10 ** tokenInfoData[tokenFrom].decimals;
    let fromTokenPythPrice = pythPrices[tokenFrom].aggregate.price;
    let toDecimals = 10 ** tokenInfoData[tokenTo].decimals;
    let toTokenPythPrice = pythPrices[tokenTo].aggregate.price;
    let fromTokenValue = fromAmount * fromTokenPythPrice / fromDecimals;
    let toAmount = fromTokenValue / toTokenPythPrice * toDecimals;
    if (tokenTo == 0) {
        fee = (fund.fundLpFee.toNumber() + fund.symmetryLpFee.toNumber()) *
            toAmount / 10000;
        if (tokenFrom == 4)
            fee = 5 * toAmount / 1000000;
        toAmount -= fee;
    }
    let fromTokenTargetPercentage = fund.targetWeight[fromTokenIndex].toNumber() / weightSum;
    let fromTokenAvailableAmount = fund.currentCompAmount[fromTokenIndex].toNumber();
    let toTokenTargetPercentage = fund.targetWeight[toTokenIndex].toNumber() / weightSum;
    let toTokenAvailableAmount = fund.currentCompAmount[toTokenIndex].toNumber();
    if (toAmount > toTokenAvailableAmount * 0.99)
        return undefined;
    let toAmountAfter = (toTokenAvailableAmount - toAmount) / toDecimals;
    let toOffset = (fund.rebalanceThreshold.toNumber() / 10000) * (fund.lpOffsetThreshold.toNumber() / 10000);
    if (toAmountAfter * toTokenPythPrice / fundWorth < toTokenTargetPercentage * (1 - toOffset))
        return undefined;
    let fromAmountAfter = (fromTokenAvailableAmount + fromAmount) / fromDecimals;
    let fromOffset = (fund.rebalanceThreshold.toNumber() / 10000) * (fund.lpOffsetThreshold.toNumber() / 10000);
    if ((fromAmountAfter * fromTokenPythPrice / fundWorth > fromTokenTargetPercentage * (1 + fromOffset)) &&
        tokenFrom != 0)
        return undefined;
    let pythAccounts = [];
    for (let i = 0; i < fund.numOfTokens.toNumber(); i++)
        pythAccounts.push({
            pubkey: new web3_js_1.PublicKey(tokenInfoData[fund.currentCompToken[i].toNumber()].pyth),
            isSigner: false,
            isWritable: false,
        });
    return {
        fromAmount: initialAmount / fromDecimals,
        toAmount: toAmount / toDecimals,
        minimumReceived: toAmount * (1 - 1 / 100) / toDecimals,
        feeUSDC: fee / 10 ** 6,
        fromTokenId: tokenFrom,
        toTokenId: tokenTo,
        swapAccounts: {
            program: types_1.FUNDS_PROGRAM_ID,
            fundState: fundAddress,
            authority: types_1.FUNDS_PROGRAM_PDA,
            source: new web3_js_1.PublicKey(tokenInfoData[tokenFrom].pdaAccount),
            destination: new web3_js_1.PublicKey(tokenInfoData[tokenTo].pdaAccount),
            fees: types_1.SWAP_FEE_ACCOUNT,
            tokenInfo: types_1.TOKEN_INFO_ADDRESS,
            remainingAccounts: pythAccounts,
        }
    };
}
exports.checkForLiquidity = checkForLiquidity;
function loadRouteData(tokenInfoData, funds, pythPrices, tokenFrom, tokenTo, fromAmount) {
    if (tokenFrom == undefined || tokenTo == undefined)
        throw new Error("From or To tokens are not defined");
    let fromTokenAmount = fromAmount * 10 ** tokenInfoData[tokenFrom].decimals;
    for (let i = 0; i < funds.length; i++) {
        let routeData = checkForLiquidity(tokenInfoData, funds[i].pubkey, funds[i].fund, pythPrices, tokenFrom, tokenTo, fromTokenAmount);
        if (routeData)
            return routeData;
    }
    return {
        fromAmount: 0,
        toAmount: 0,
        minimumReceived: 0,
        fromTokenId: 0,
        toTokenId: 0,
        feeUSDC: 0,
        swapAccounts: {
            program: types_1.FUNDS_PROGRAM_ID,
            fundState: web3_js_1.PublicKey.default,
            authority: types_1.FUNDS_PROGRAM_PDA,
            source: web3_js_1.PublicKey.default,
            destination: web3_js_1.PublicKey.default,
            fees: types_1.SWAP_FEE_ACCOUNT,
            tokenInfo: types_1.TOKEN_INFO_ADDRESS,
            remainingAccounts: [],
        }
    };
}
exports.loadRouteData = loadRouteData;
function generateSwapInstruction(program, wallet, tokenInfoData, routeData, userFromTokenAccount, userToTokenAccount) {
    return __awaiter(this, void 0, void 0, function* () {
        let { fromTokenId, toTokenId, fromAmount, toAmount, minimumReceived } = routeData;
        let fundStateData = yield program.account.fundState.fetch(routeData.swapAccounts.fundState);
        let accounts = [];
        for (let i = 0; i < fundStateData.numOfTokens.toNumber(); i++)
            accounts.push({
                pubkey: new web3_js_1.PublicKey(tokenInfoData[fundStateData.currentCompToken[i].toNumber()].pyth),
                isSigner: false,
                isWritable: false,
            });
        return yield program.methods
            .swapFundTokens(new anchor_1.BN(fromTokenId), new anchor_1.BN(toTokenId), new anchor_1.BN(Math.floor(fromAmount * 10 ** tokenInfoData[fromTokenId].decimals)), new anchor_1.BN(Math.floor(minimumReceived * 10 ** tokenInfoData[toTokenId].decimals)))
            .accounts({
            buyer: wallet.publicKey,
            fundState: routeData.swapAccounts.fundState,
            pdaAccount: routeData.swapAccounts.authority,
            pdaFromTokenAccount: routeData.swapAccounts.source,
            buyerFromTokenAccount: userFromTokenAccount,
            pdaToTokenAccount: routeData.swapAccounts.destination,
            buyerToTokenAccount: userToTokenAccount,
            swapFeeAccount: routeData.swapAccounts.fees,
            tokenInfo: routeData.swapAccounts.tokenInfo,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: token_1.TOKEN_PROGRAM_ID
        })
            .remainingAccounts(accounts)
            .instruction();
    });
}
exports.generateSwapInstruction = generateSwapInstruction;
