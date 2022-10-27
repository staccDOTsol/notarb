import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
export declare const managerClaimInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, userTransferAuthority: PublicKey, swapTokenA: PublicKey, swapTokenB: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey) => TransactionInstruction;
