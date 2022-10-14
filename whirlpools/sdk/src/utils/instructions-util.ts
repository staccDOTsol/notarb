import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { OpenPositionParams } from "../instructions";
import * as anchor from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";

export function openPositionAccounts(params: OpenPositionParams) {
  const {
    funder,
    owner,
    positionPda,
    positionMintAddress,
    positionTokenAccount: positionTokenAccountAddress,
    whirlpool: whirlpoolKey,
  } = params;
  return {
    funder: funder,
    owner,
    position: positionPda.publicKey,
    positionMint: positionMintAddress,
    positionTokenAccount: positionTokenAccountAddress,
    whirlpool: whirlpoolKey,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: SystemProgram.programId,
    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  };
}
