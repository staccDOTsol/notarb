import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import Decimal from "decimal.js";
export declare const initializeInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, manager: PublicKey, managerTokenA: PublicKey, managerTokenB: PublicKey, swapTokenA: PublicKey, swapTokenB: PublicKey, ticksKey: PublicKey, positionsKey: PublicKey, nonce: number, curveType: number, fee: Decimal, managerFee: Decimal, tickSpace: number, currentSqrtPrice: Decimal) => TransactionInstruction;
