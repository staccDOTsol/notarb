import type { PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type Decimal from "decimal.js";
export declare const withdrawAllTokenTypesInstruction: (programId: PublicKey, tokenSwapKey: PublicKey, authority: PublicKey, userTransferAuthority: PublicKey, swapTokenA: PublicKey, swapTokenB: PublicKey, userTokenA: PublicKey, userTokenB: PublicKey, nftMint: PublicKey, nftUser: PublicKey, ticksKey: PublicKey, positionsKey: PublicKey, liquityAmount: Decimal, minimumTokenA: Decimal, minimumTokenB: Decimal, positionIndex: Decimal) => TransactionInstruction;
