import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare const simulateSwapInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, ticksKey: PublicKey, amountIn: Decimal, direction: number) => TransactionInstruction;
