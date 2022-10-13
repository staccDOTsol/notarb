"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideMinimumLamportsBalance = exports.getBalanceLamports = exports.airdrop = exports.PARTNER_NAME = exports.REFERRAL_CODE = exports.PROVIDER = exports.CONNECTION = exports.PROVIDER_URL = exports.SDK_USER = exports.MARINADE_PROGRAM_REFERRAL_ID = exports.LAMPORTS_AIRDROP_CAP = void 0;
const anchor_1 = require("@project-serum/anchor");
const src_1 = require("../src");
exports.LAMPORTS_AIRDROP_CAP = src_1.MarinadeUtils.solToLamports(2);
exports.MARINADE_PROGRAM_REFERRAL_ID = new anchor_1.web3.PublicKey('FqYPYHc3man91xYDCugbGuDdWgkNLp5TvbXPascHW6MR');
exports.SDK_USER = anchor_1.web3.Keypair.fromSecretKey(new Uint8Array([
    120, 45, 242, 38, 63, 135, 84, 226, 66, 56, 76,
    216, 125, 144, 38, 182, 53, 47, 169, 251, 128, 65,
    185, 237, 41, 47, 64, 53, 158, 124, 64, 2, 132,
    229, 176, 107, 25, 190, 28, 223, 58, 136, 95, 237,
    236, 176, 26, 160, 11, 12, 131, 129, 21, 8, 221,
    100, 249, 221, 177, 114, 143, 231, 102, 250,
]));
// export const SDK_USER = Wallet.local().payer
// export const SDK_USER = new web3.Keypair()
console.log('SDK User', exports.SDK_USER.publicKey.toBase58());
exports.PROVIDER_URL = 'https://api.devnet.solana.com';
exports.CONNECTION = new anchor_1.web3.Connection(exports.PROVIDER_URL);
exports.PROVIDER = new anchor_1.Provider(exports.CONNECTION, new anchor_1.Wallet(exports.SDK_USER), { commitment: 'confirmed' /*, skipPreflight: true*/ });
exports.REFERRAL_CODE = new anchor_1.web3.PublicKey('mRtnRH2M3rMLP4BBcrxkk4WBKsSi3JvoyUEog7gf3qE');
exports.PARTNER_NAME = 'REF_TEST';
console.log('Referral partner', exports.PARTNER_NAME, exports.REFERRAL_CODE.toBase58());
const airdrop = (to, amountLamports) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield exports.PROVIDER.connection.requestAirdrop(to, amountLamports);
    yield exports.PROVIDER.connection.confirmTransaction(signature);
    console.log('Airdrop:', src_1.MarinadeUtils.lamportsToSol(new anchor_1.BN(amountLamports)), 'SOL', 'to', to.toBase58());
});
exports.airdrop = airdrop;
const getBalanceLamports = (account) => __awaiter(void 0, void 0, void 0, function* () { return exports.PROVIDER.connection.getBalance(account); });
exports.getBalanceLamports = getBalanceLamports;
const provideMinimumLamportsBalance = (account, minimumLamportsBalance) => __awaiter(void 0, void 0, void 0, function* () {
    const balanceLamports = new anchor_1.BN(yield (0, exports.getBalanceLamports)(account));
    if (balanceLamports.gte(minimumLamportsBalance)) {
        return;
    }
    let remainingLamportsToAirdrop = minimumLamportsBalance.sub(balanceLamports);
    while (remainingLamportsToAirdrop.gtn(0)) {
        const airdropLamports = anchor_1.BN.min(exports.LAMPORTS_AIRDROP_CAP, remainingLamportsToAirdrop);
        yield (0, exports.airdrop)(account, airdropLamports.toNumber());
        remainingLamportsToAirdrop = remainingLamportsToAirdrop.sub(airdropLamports);
    }
});
exports.provideMinimumLamportsBalance = provideMinimumLamportsBalance;
//# sourceMappingURL=test-world.js.map