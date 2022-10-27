import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare const claimInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, userTransferAuthority: PublicKey, swapTokenA: PublicKey, swapTokenB: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, nftMint: PublicKey, nftUser: PublicKey, ticksKey: PublicKey, positionsKey: PublicKey, positionIndex: Decimal) => TransactionInstruction;
