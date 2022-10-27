import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
export declare const addUserPositionInstruction: (programId: PublicKey, authority: PublicKey, positionsKey: PublicKey) => TransactionInstruction;
