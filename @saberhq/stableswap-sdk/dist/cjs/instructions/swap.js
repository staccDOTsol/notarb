"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawOneInstruction = exports.withdrawInstruction = exports.depositInstruction = exports.swapInstruction = exports.initializeSwapInstruction = exports.initializeSwapInstructionRaw = exports.StableSwapInstruction = void 0;
const index_js_1 = require("../state/index.js");
const common_js_1 = require("./common.js");
const layouts_js_1 = require("./layouts.js");
/**
 * Instruction enum.
 */
var StableSwapInstruction;
(function (StableSwapInstruction) {
    StableSwapInstruction[StableSwapInstruction["INITIALIZE"] = 0] = "INITIALIZE";
    StableSwapInstruction[StableSwapInstruction["SWAP"] = 1] = "SWAP";
    StableSwapInstruction[StableSwapInstruction["DEPOSIT"] = 2] = "DEPOSIT";
    StableSwapInstruction[StableSwapInstruction["WITHDRAW"] = 3] = "WITHDRAW";
    StableSwapInstruction[StableSwapInstruction["WITHDRAW_ONE"] = 4] = "WITHDRAW_ONE";
})(StableSwapInstruction = exports.StableSwapInstruction || (exports.StableSwapInstruction = {}));
const initializeSwapInstructionRaw = ({ config, adminAccount, tokenA: { adminFeeAccount: adminFeeAccountA, mint: tokenMintA, reserve: tokenAccountA, }, tokenB: { adminFeeAccount: adminFeeAccountB, mint: tokenMintB, reserve: tokenAccountB, }, poolTokenMint, destinationPoolTokenAccount, nonce, ampFactor, fees, }) => {
    const keys = [
        { pubkey: config.swapAccount, isSigner: false, isWritable: false },
        { pubkey: config.authority, isSigner: false, isWritable: false },
        { pubkey: adminAccount, isSigner: false, isWritable: false },
        { pubkey: adminFeeAccountA, isSigner: false, isWritable: false },
        { pubkey: adminFeeAccountB, isSigner: false, isWritable: false },
        { pubkey: tokenMintA, isSigner: false, isWritable: false },
        { pubkey: tokenAccountA, isSigner: false, isWritable: false },
        { pubkey: tokenMintB, isSigner: false, isWritable: false },
        { pubkey: tokenAccountB, isSigner: false, isWritable: false },
        { pubkey: poolTokenMint, isSigner: false, isWritable: true },
        { pubkey: destinationPoolTokenAccount, isSigner: false, isWritable: true },
        { pubkey: config.tokenProgramID, isSigner: false, isWritable: false },
    ];
    const data = Buffer.alloc(layouts_js_1.InitializeSwapIXLayout.span);
    layouts_js_1.InitializeSwapIXLayout.encode({
        instruction: StableSwapInstruction.INITIALIZE,
        nonce,
        ampFactor: ampFactor.toBuffer(),
        fees,
    }, data);
    return (0, common_js_1.buildInstruction)({
        config,
        keys,
        data,
    });
};
exports.initializeSwapInstructionRaw = initializeSwapInstructionRaw;
const initializeSwapInstruction = ({ fees = index_js_1.ZERO_FEES, ...args }) => {
    return (0, exports.initializeSwapInstructionRaw)({ ...args, fees: (0, index_js_1.encodeFees)(fees) });
};
exports.initializeSwapInstruction = initializeSwapInstruction;
const swapInstruction = ({ config, userAuthority, userSource, poolSource, poolDestination, userDestination, adminDestination, amountIn, minimumAmountOut, }) => {
    const data = Buffer.alloc(layouts_js_1.SwapIXLayout.span);
    layouts_js_1.SwapIXLayout.encode({
        instruction: StableSwapInstruction.SWAP,
        amountIn: amountIn.toBuffer(),
        minimumAmountOut: minimumAmountOut.toBuffer(),
    }, data);
    const keys = [
        { pubkey: config.swapAccount, isSigner: false, isWritable: false },
        { pubkey: config.authority, isSigner: false, isWritable: false },
        { pubkey: userAuthority, isSigner: true, isWritable: false },
        { pubkey: userSource, isSigner: false, isWritable: true },
        { pubkey: poolSource, isSigner: false, isWritable: true },
        { pubkey: poolDestination, isSigner: false, isWritable: true },
        { pubkey: userDestination, isSigner: false, isWritable: true },
        { pubkey: adminDestination, isSigner: false, isWritable: true },
        { pubkey: config.tokenProgramID, isSigner: false, isWritable: false },
    ];
    return (0, common_js_1.buildInstruction)({
        config,
        keys,
        data,
    });
};
exports.swapInstruction = swapInstruction;
const depositInstruction = ({ config, userAuthority, sourceA, sourceB, tokenAccountA, tokenAccountB, poolTokenMint, poolTokenAccount, tokenAmountA, tokenAmountB, minimumPoolTokenAmount, }) => {
    const data = Buffer.alloc(layouts_js_1.DepositIXLayout.span);
    layouts_js_1.DepositIXLayout.encode({
        instruction: StableSwapInstruction.DEPOSIT,
        tokenAmountA: tokenAmountA.toBuffer(),
        tokenAmountB: tokenAmountB.toBuffer(),
        minimumPoolTokenAmount: minimumPoolTokenAmount.toBuffer(),
    }, data);
    const keys = [
        { pubkey: config.swapAccount, isSigner: false, isWritable: false },
        { pubkey: config.authority, isSigner: false, isWritable: false },
        { pubkey: userAuthority, isSigner: true, isWritable: false },
        { pubkey: sourceA, isSigner: false, isWritable: true },
        { pubkey: sourceB, isSigner: false, isWritable: true },
        { pubkey: tokenAccountA, isSigner: false, isWritable: true },
        { pubkey: tokenAccountB, isSigner: false, isWritable: true },
        { pubkey: poolTokenMint, isSigner: false, isWritable: true },
        { pubkey: poolTokenAccount, isSigner: false, isWritable: true },
        { pubkey: config.tokenProgramID, isSigner: false, isWritable: false },
    ];
    return (0, common_js_1.buildInstruction)({
        config,
        keys,
        data,
    });
};
exports.depositInstruction = depositInstruction;
const withdrawInstruction = ({ config, userAuthority, poolMint, sourceAccount, tokenAccountA, tokenAccountB, userAccountA, userAccountB, adminFeeAccountA, adminFeeAccountB, poolTokenAmount, minimumTokenA, minimumTokenB, }) => {
    const data = Buffer.alloc(layouts_js_1.WithdrawIXLayout.span);
    layouts_js_1.WithdrawIXLayout.encode({
        instruction: StableSwapInstruction.WITHDRAW,
        poolTokenAmount: poolTokenAmount.toBuffer(),
        minimumTokenA: minimumTokenA.toBuffer(),
        minimumTokenB: minimumTokenB.toBuffer(),
    }, data);
    const keys = [
        { pubkey: config.swapAccount, isSigner: false, isWritable: false },
        { pubkey: config.authority, isSigner: false, isWritable: false },
        { pubkey: userAuthority, isSigner: true, isWritable: false },
        { pubkey: poolMint, isSigner: false, isWritable: true },
        { pubkey: sourceAccount, isSigner: false, isWritable: true },
        { pubkey: tokenAccountA, isSigner: false, isWritable: true },
        { pubkey: tokenAccountB, isSigner: false, isWritable: true },
        { pubkey: userAccountA, isSigner: false, isWritable: true },
        { pubkey: userAccountB, isSigner: false, isWritable: true },
        { pubkey: adminFeeAccountA, isSigner: false, isWritable: true },
        { pubkey: adminFeeAccountB, isSigner: false, isWritable: true },
        { pubkey: config.tokenProgramID, isSigner: false, isWritable: false },
    ];
    return (0, common_js_1.buildInstruction)({
        config,
        keys,
        data,
    });
};
exports.withdrawInstruction = withdrawInstruction;
const withdrawOneInstruction = ({ config, userAuthority, poolMint, sourceAccount, baseTokenAccount, quoteTokenAccount, destinationAccount, adminDestinationAccount, poolTokenAmount, minimumTokenAmount, }) => {
    const data = Buffer.alloc(layouts_js_1.WithdrawOneIXLayout.span);
    layouts_js_1.WithdrawOneIXLayout.encode({
        instruction: StableSwapInstruction.WITHDRAW_ONE,
        poolTokenAmount: poolTokenAmount.toBuffer(),
        minimumTokenAmount: minimumTokenAmount.toBuffer(),
    }, data);
    const keys = [
        { pubkey: config.swapAccount, isSigner: false, isWritable: false },
        { pubkey: config.authority, isSigner: false, isWritable: false },
        { pubkey: userAuthority, isSigner: true, isWritable: false },
        { pubkey: poolMint, isSigner: false, isWritable: true },
        { pubkey: sourceAccount, isSigner: false, isWritable: true },
        { pubkey: baseTokenAccount, isSigner: false, isWritable: true },
        { pubkey: quoteTokenAccount, isSigner: false, isWritable: true },
        { pubkey: destinationAccount, isSigner: false, isWritable: true },
        { pubkey: adminDestinationAccount, isSigner: false, isWritable: true },
        { pubkey: config.tokenProgramID, isSigner: false, isWritable: false },
    ];
    return (0, common_js_1.buildInstruction)({
        config,
        keys,
        data,
    });
};
exports.withdrawOneInstruction = withdrawOneInstruction;
//# sourceMappingURL=swap.js.map