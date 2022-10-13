import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
/**
 *
 * Creates a PsyAmerican program using the internal IDL. This helps with anchor version
 * descrepencies.
 *
 * @param pubkey - The public key for the PsyAmerican program
 * @param provider - An anchor provider
 * @returns
 */
export declare const createProgram: (pubkey: web3.PublicKey, provider: AnchorProvider) => Program<import("../psyAmericanTypes").PsyAmerican>;
