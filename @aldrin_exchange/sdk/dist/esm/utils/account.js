export function account(pubkey, isWritable, isSigner) {
    if (isWritable === void 0) { isWritable = false; }
    if (isSigner === void 0) { isSigner = false; }
    return {
        pubkey: pubkey,
        isWritable: isWritable,
        isSigner: isSigner,
    };
}
