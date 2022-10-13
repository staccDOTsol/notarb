import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare const depositAllTokenTypesInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, userTransferAuthority: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, swapTokenA: PublicKey, swapTokenB: PublicKey, nftMint: PublicKey, nftUser: PublicKey, ticksKey: PublicKey, positionsKey: PublicKey, isNewPosition: number, tickLower: number, tickUpper: number, liquityAmount: Decimal, maximumTokenA: Decimal, maximumTokenB: Decimal, positionIndex: Decimal) => TransactionInstruction;
