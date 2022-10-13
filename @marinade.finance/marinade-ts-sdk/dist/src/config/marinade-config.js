"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarinadeConfig = void 0;
const anchor_1 = require("@project-serum/anchor");
const DEFAULT_PROVIDER_URL = 'https://api.devnet.solana.com';
class MarinadeConfig {
    constructor(configOverrides = {}) {
        this.marinadeFinanceProgramId = new anchor_1.web3.PublicKey('MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD');
        this.marinadeReferralProgramId = new anchor_1.web3.PublicKey('mRefx8ypXNxE59NhoBqwqb3vTvjgf8MYECp4kgJWiDY');
        this.marinadeStateAddress = new anchor_1.web3.PublicKey('8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC');
        this.marinadeReferralGlobalStateAddress = new anchor_1.web3.PublicKey('mRg6bDsAd5uwERAdNTynoUeRbqQsLa7yzuK2kkCUPGW');
        this.stakeWithdrawAuthPDA = new anchor_1.web3.PublicKey('9eG63CdHjsfhHmobHgLtESGC8GabbmRcaSpHAZrtmhco');
        this.connection = new anchor_1.web3.Connection(DEFAULT_PROVIDER_URL);
        this.publicKey = null;
        this.referralCode = null;
        Object.assign(this, configOverrides);
    }
}
exports.MarinadeConfig = MarinadeConfig;
//# sourceMappingURL=marinade-config.js.map