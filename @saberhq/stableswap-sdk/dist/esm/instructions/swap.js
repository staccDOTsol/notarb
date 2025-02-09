import { encodeFees, ZERO_FEES } from "../state/index.js";
import { buildInstruction } from "./common.js";
import { DepositIXLayout, InitializeSwapIXLayout, SwapIXLayout, WithdrawIXLayout, WithdrawOneIXLayout, } from "./layouts.js";
/**
 * Instruction enum.
 */
export var StableSwapInstruction;
(function (StableSwapInstruction) {
    StableSwapInstruction[StableSwapInstruction["INITIALIZE"] = 0] = "INITIALIZE";
    StableSwapInstruction[StableSwapInstruction["SWAP"] = 1] = "SWAP";
    StableSwapInstruction[StableSwapInstruction["DEPOSIT"] = 2] = "DEPOSIT";
    StableSwapInstruction[StableSwapInstruction["WITHDRAW"] = 3] = "WITHDRAW";
    StableSwapInstruction[StableSwapInstruction["WITHDRAW_ONE"] = 4] = "WITHDRAW_ONE";
})(StableSwapInstruction || (StableSwapInstruction = {}));
export const initializeSwapInstructionRaw = ({ config, adminAccount, tokenA: { adminFeeAccount: adminFeeAccountA, mint: tokenMintA, reserve: tokenAccountA, }, tokenB: { adminFeeAccount: adminFeeAccountB, mint: tokenMintB, reserve: tokenAccountB, }, poolTokenMint, destinationPoolTokenAccount, nonce, ampFactor, fees, }) => {
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
    const data = Buffer.alloc(InitializeSwapIXLayout.span);
    InitializeSwapIXLayout.encode({
        instruction: StableSwapInstruction.INITIALIZE,
        nonce,
        ampFactor: ampFactor.toBuffer(),
        fees,
    }, data);
    return buildInstruction({
        config,
        keys,
        data,
    });
};
export const initializeSwapInstruction = ({ fees = ZERO_FEES, ...args }) => {
    return initializeSwapInstructionRaw({ ...args, fees: encodeFees(fees) });
};
export const swapInstruction = ({ config, userAuthority, userSource, poolSource, poolDestination, userDestination, adminDestination, amountIn, minimumAmountOut, }) => {
    const data = Buffer.alloc(SwapIXLayout.span);
    SwapIXLayout.encode({
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
    return buildInstruction({
        config,
        keys,
        data,
    });
};
export const depositInstruction = ({ config, userAuthority, sourceA, sourceB, tokenAccountA, tokenAccountB, poolTokenMint, poolTokenAccount, tokenAmountA, tokenAmountB, minimumPoolTokenAmount, }) => {
    const data = Buffer.alloc(DepositIXLayout.span);
    DepositIXLayout.encode({
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
    return buildInstruction({
        config,
        keys,
        data,
    });
};
export const withdrawInstruction = ({ config, userAuthority, poolMint, sourceAccount, tokenAccountA, tokenAccountB, userAccountA, userAccountB, adminFeeAccountA, adminFeeAccountB, poolTokenAmount, minimumTokenA, minimumTokenB, }) => {
    const data = Buffer.alloc(WithdrawIXLayout.span);
    WithdrawIXLayout.encode({
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
    return buildInstruction({
        config,
        keys,
        data,
    });
};
export const withdrawOneInstruction = ({ config, userAuthority, poolMint, sourceAccount, baseTokenAccount, quoteTokenAccount, destinationAccount, adminDestinationAccount, poolTokenAmount, minimumTokenAmount, }) => {
    const data = Buffer.alloc(WithdrawOneIXLayout.span);
    WithdrawOneIXLayout.encode({
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
    return buildInstruction({
        config,
        keys,
        data,
    });
};
//# sourceMappingURL=swap.js.map