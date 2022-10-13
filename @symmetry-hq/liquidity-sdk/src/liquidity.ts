import { BN, Program } from "@project-serum/anchor";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Price, PriceData } from "@pythnetwork/client";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { FundsIDL } from "./fundsIDL";
import { FundStateChainData, FUNDS_PROGRAM_ID, FUNDS_PROGRAM_PDA, RouteData, SWAP_FEE_ACCOUNT, TokenInfoData, TOKEN_INFO_ADDRESS } from "./types";

export function availableRoutes(
    tokenInfoData: TokenInfoData[],
    fund: FundStateChainData,
    pythPrices: PriceData[],
): {
    tokenMint: string,
    coingeckoId: string,
    userCanSellToFund: number,
    userCanBuyFromFund: number,
}[] {
    let fundWorth: number = 0;
    let numTokens = fund.numOfTokens.toNumber();

    for(let i=0; i<numTokens; i++) {
        let token = fund.currentCompToken[i].toNumber();
        let amount = fund.currentCompAmount[i].toNumber();
        let priceData = pythPrices[token];
        let price = priceData.aggregate.price;
        let tokenAmount = amount / 10 ** tokenInfoData[token].decimals;
        let tokenValue = price * tokenAmount;
        fundWorth += tokenValue;
    }

    let result: {
        tokenMint: string
        userCanSellToFund: number,
        userCanBuyFromFund: number,
        coingeckoId: string,
    }[] = [];

    for(let i=0; i<numTokens; i++) {
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
        })
    }

    return result;
}

export function checkForLiquidity(
    tokenInfoData: TokenInfoData[],
    fundAddress: PublicKey,
    fund: FundStateChainData,
    pythPrices: PriceData[],
    tokenFrom: number,
    tokenTo: number,
    fromAmount: number,
): RouteData|undefined {
    let initialAmount = fromAmount;
    let fundWorth: number = 0;
    let numTokens = fund.numOfTokens.toNumber();
    let fromTokenIndex = -1;
    let toTokenIndex = -1;
    for(let i=0; i<numTokens; i++) {
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
    if ( toAmountAfter * toTokenPythPrice / fundWorth < toTokenTargetPercentage * (1 - toOffset))
        return undefined;

    let fromAmountAfter = (fromTokenAvailableAmount + fromAmount) / fromDecimals;
    let fromOffset = (fund.rebalanceThreshold.toNumber() / 10000) * (fund.lpOffsetThreshold.toNumber() / 10000);
    if ((fromAmountAfter * fromTokenPythPrice / fundWorth > fromTokenTargetPercentage * (1 + fromOffset)) &&
        tokenFrom != 0
    ) return undefined;
    let pythAccounts = [];
    for (let i = 0; i < fund.numOfTokens.toNumber(); i++)
        pythAccounts.push({
            pubkey: new PublicKey(
                tokenInfoData[fund.currentCompToken[i].toNumber()].pyth
            ),
            isSigner: false,
            isWritable: false,
        })
    return {
        fromAmount: initialAmount / fromDecimals,
        toAmount: toAmount / toDecimals,
        minimumReceived: toAmount * (1 - 1 / 100) / toDecimals,
        feeUSDC: fee / 10 ** 6,
        fromTokenId: tokenFrom,
        toTokenId: tokenTo,
        swapAccounts: {
            program: FUNDS_PROGRAM_ID,
            fundState: fundAddress,
            authority: FUNDS_PROGRAM_PDA,
            source: new PublicKey(tokenInfoData[tokenFrom].pdaAccount),
            destination:  new PublicKey(tokenInfoData[tokenTo].pdaAccount),
            fees: SWAP_FEE_ACCOUNT,
            tokenInfo: TOKEN_INFO_ADDRESS,
            remainingAccounts: pythAccounts,
        }
    }
}

export function loadRouteData(
    tokenInfoData: TokenInfoData[],
    funds: {pubkey: PublicKey, fund: FundStateChainData}[],
    pythPrices: PriceData[],
    tokenFrom: number|undefined,
    tokenTo: number|undefined,
    fromAmount: number,
): RouteData {
    if (tokenFrom == undefined || tokenTo == undefined)
        throw new Error("From or To tokens are not defined");
    let fromTokenAmount = fromAmount * 10 ** tokenInfoData[tokenFrom].decimals;
    for (let i = 0; i < funds.length; i++) {
        let routeData = checkForLiquidity(
            tokenInfoData,
            funds[i].pubkey,
            funds[i].fund,
            pythPrices,
            tokenFrom,
            tokenTo,
            fromTokenAmount,
        );
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
            program: FUNDS_PROGRAM_ID,
            fundState: PublicKey.default,
            authority: FUNDS_PROGRAM_PDA,
            source: PublicKey.default,
            destination:  PublicKey.default,
            fees: SWAP_FEE_ACCOUNT,
            tokenInfo: TOKEN_INFO_ADDRESS,
            remainingAccounts: [],
        }
    }
    
}

export async function generateSwapInstruction(
    program: Program<FundsIDL>,
    wallet: Wallet,
    tokenInfoData: TokenInfoData[],
    routeData: RouteData,
    userFromTokenAccount: PublicKey,
    userToTokenAccount: PublicKey,
): Promise<TransactionInstruction> {
    let { fromTokenId, toTokenId, fromAmount, toAmount, minimumReceived } = routeData;
    let fundStateData = await program.account.fundState.fetch(routeData.swapAccounts.fundState);
    let accounts = [];
    for (let i = 0; i < fundStateData.numOfTokens.toNumber(); i++)
        accounts.push({
            pubkey: new PublicKey(
                tokenInfoData[fundStateData.currentCompToken[i].toNumber()].pyth
            ),
            isSigner: false,
            isWritable: false,
        })
    return await program.methods
        .swapFundTokens(
            new BN(fromTokenId),
            new BN(toTokenId),
            new BN(
                Math.floor(
                    fromAmount * 10 ** tokenInfoData[fromTokenId].decimals
                )
            ),
            new BN(
                Math.floor(
                    minimumReceived * 10 ** tokenInfoData[toTokenId].decimals
                )
            ),
        )
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
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
        })
        .remainingAccounts(accounts)
        .instruction();
}
