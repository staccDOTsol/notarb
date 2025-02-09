import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare const swapInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, userTransferAuthority: PublicKey, userSource: PublicKey, userDestination: PublicKey, swapSource: PublicKey, swapDestination: PublicKey, ticksKey: PublicKey, amountIn: Decimal, minimumAmountOut: Decimal) => TransactionInstruction;
