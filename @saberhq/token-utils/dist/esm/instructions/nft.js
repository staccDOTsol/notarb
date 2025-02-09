import { Token as SPLToken, TOKEN_PROGRAM_ID, u64 } from "@solana/spl-token";
import { getOrCreateATA } from "./ata.js";
import { createInitMintInstructions } from "./mint.js";
export const mintNFT = async (provider, mintKP, owner = provider.wallet.publicKey) => {
    // Temporary mint authority
    const tempMintAuthority = provider.wallet.publicKey;
    // Mint for the NFT
    const tx = await createInitMintInstructions({
        provider,
        mintKP,
        decimals: 0,
        mintAuthority: tempMintAuthority,
    });
    // Token account for the NFT
    const { address, instruction } = await getOrCreateATA({
        provider,
        mint: mintKP.publicKey,
        owner: owner,
        payer: provider.wallet.publicKey,
    });
    if (instruction) {
        tx.instructions.push(instruction);
    }
    // Mint to owner's ATA
    tx.instructions.push(SPLToken.createMintToInstruction(TOKEN_PROGRAM_ID, mintKP.publicKey, address, tempMintAuthority, [], new u64(1)));
    // Set mint authority of the NFT to NULL
    tx.instructions.push(SPLToken.createSetAuthorityInstruction(TOKEN_PROGRAM_ID, mintKP.publicKey, null, "MintTokens", tempMintAuthority, []));
    return tx;
};
//# sourceMappingURL=nft.js.map