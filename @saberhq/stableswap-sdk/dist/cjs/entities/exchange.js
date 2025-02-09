"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadExchangeInfoFromSwapAccount = exports.makeExchange = exports.loadExchangeInfo = exports.makeExchangeInfo = exports.calculateAmpFactor = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const bn_js_1 = tslib_1.__importDefault(require("bn.js"));
const tiny_invariant_1 = tslib_1.__importDefault(require("tiny-invariant"));
const constants_js_1 = require("../constants.js");
const stable_swap_js_1 = require("../stable-swap.js");
const account_js_1 = require("../util/account.js");
/**
 * Calculates the amp factor of a swap.
 * @param state
 * @param now
 * @returns
 */
const calculateAmpFactor = (state, now = Date.now() / 1000) => {
    const { initialAmpFactor, targetAmpFactor, startRampTimestamp, stopRampTimestamp, } = state;
    // The most common case is that there is no ramp in progress.
    if (now >= stopRampTimestamp) {
        return (0, token_utils_1.parseBigintIsh)(targetAmpFactor);
    }
    // If the ramp is about to start, use the initial amp.
    if (now <= startRampTimestamp) {
        return (0, token_utils_1.parseBigintIsh)(initialAmpFactor);
    }
    (0, tiny_invariant_1.default)(stopRampTimestamp >= startRampTimestamp, "stop must be after start");
    // Calculate how far we are along the ramp curve.
    const percent = now >= stopRampTimestamp
        ? 1
        : now <= startRampTimestamp
            ? 0
            : (now - startRampTimestamp) / (stopRampTimestamp - startRampTimestamp);
    const diff = Math.floor(parseFloat(targetAmpFactor.sub(initialAmpFactor).toString()) * percent);
    return (0, token_utils_1.parseBigintIsh)(initialAmpFactor.add(new bn_js_1.default(diff)));
};
exports.calculateAmpFactor = calculateAmpFactor;
/**
 * Creates an IExchangeInfo from parameters.
 * @returns
 */
const makeExchangeInfo = ({ exchange, swap, accounts, }) => {
    const swapAmountA = (0, token_utils_1.deserializeAccount)(accounts.reserveA).amount;
    const swapAmountB = (0, token_utils_1.deserializeAccount)(accounts.reserveB).amount;
    const poolMintSupply = accounts.poolMint
        ? (0, token_utils_1.deserializeMint)(accounts.poolMint).supply
        : undefined;
    const ampFactor = (0, exports.calculateAmpFactor)(swap.state);
    return {
        ampFactor,
        fees: swap.state.fees,
        lpTotalSupply: new token_utils_1.TokenAmount(exchange.lpToken, poolMintSupply !== null && poolMintSupply !== void 0 ? poolMintSupply : 0),
        reserves: [
            {
                reserveAccount: swap.state.tokenA.reserve,
                adminFeeAccount: swap.state.tokenA.adminFeeAccount,
                amount: new token_utils_1.TokenAmount(exchange.tokens[0], swapAmountA),
            },
            {
                reserveAccount: swap.state.tokenB.reserve,
                adminFeeAccount: swap.state.tokenB.adminFeeAccount,
                amount: new token_utils_1.TokenAmount(exchange.tokens[1], swapAmountB),
            },
        ],
    };
};
exports.makeExchangeInfo = makeExchangeInfo;
/**
 * Loads exchange info.
 * @param exchange
 * @param swap
 * @returns
 */
const loadExchangeInfo = async (connection, exchange, swap) => {
    if (!exchange.programID.equals(swap.config.swapProgramID)) {
        throw new Error("Swap program id mismatch");
    }
    const reserveA = await (0, account_js_1.loadProgramAccount)(connection, swap.state.tokenA.reserve, swap.config.tokenProgramID);
    const reserveB = await (0, account_js_1.loadProgramAccount)(connection, swap.state.tokenB.reserve, swap.config.tokenProgramID);
    const poolMint = await (0, account_js_1.loadProgramAccount)(connection, swap.state.poolTokenMint, swap.config.tokenProgramID);
    return (0, exports.makeExchangeInfo)({
        swap,
        exchange,
        accounts: {
            reserveA,
            reserveB,
            poolMint,
        },
    });
};
exports.loadExchangeInfo = loadExchangeInfo;
/**
 * Creates an IExchange from an ExchangeBasic.
 * @param tokenMap
 * @param param1
 * @returns
 */
const makeExchange = ({ swapAccount, lpToken, tokenA, tokenB, }) => {
    const exchange = {
        swapAccount,
        programID: constants_js_1.SWAP_PROGRAM_ID,
        lpToken: new token_utils_1.Token({
            symbol: "SLP",
            name: `${tokenA.symbol}-${tokenB.symbol} Saber LP`,
            logoURI: "https://app.saber.so/tokens/slp.png",
            decimals: tokenA.decimals,
            address: lpToken.toString(),
            chainId: tokenA.chainId,
            tags: ["saber-stableswap-lp"],
        }),
        tokens: [new token_utils_1.Token(tokenA), new token_utils_1.Token(tokenB)],
    };
    return exchange;
};
exports.makeExchange = makeExchange;
/**
 * Get exchange info from just the swap account.
 * @param connection
 * @param swapAccount
 * @param tokenA
 * @param tokenB
 * @returns
 */
const loadExchangeInfoFromSwapAccount = async (connection, swapAccount, tokenA = undefined, tokenB = undefined) => {
    var _a, _b;
    const stableSwap = await stable_swap_js_1.StableSwap.load(connection, swapAccount);
    const theTokenA = tokenA !== null && tokenA !== void 0 ? tokenA : (_a = (await token_utils_1.Token.load(connection, stableSwap.state.tokenA.mint))) === null || _a === void 0 ? void 0 : _a.info;
    if (!theTokenA) {
        throw new Error(`Token ${stableSwap.state.tokenA.mint.toString()} not found`);
    }
    const theTokenB = tokenB !== null && tokenB !== void 0 ? tokenB : (_b = (await token_utils_1.Token.load(connection, stableSwap.state.tokenB.mint))) === null || _b === void 0 ? void 0 : _b.info;
    if (!theTokenB) {
        throw new Error(`Token ${stableSwap.state.tokenB.mint.toString()} not found`);
    }
    const exchange = (0, exports.makeExchange)({
        swapAccount,
        lpToken: stableSwap.state.poolTokenMint,
        tokenA: theTokenA,
        tokenB: theTokenB,
    });
    if (exchange === null) {
        return null;
    }
    return await (0, exports.loadExchangeInfo)(connection, exchange, stableSwap);
};
exports.loadExchangeInfoFromSwapAccount = loadExchangeInfoFromSwapAccount;
//# sourceMappingURL=exchange.js.map