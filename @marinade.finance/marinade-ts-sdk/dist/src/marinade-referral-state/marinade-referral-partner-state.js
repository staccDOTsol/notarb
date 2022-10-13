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
exports.MarinadeReferralPartnerState = void 0;
class MarinadeReferralPartnerState {
    constructor(state, referralStateAddress, marinadeReferralProgramId) {
        this.state = state;
        this.referralStateAddress = referralStateAddress;
        this.marinadeReferralProgramId = marinadeReferralProgramId;
    }
    static fetch(marinade) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marinadeReferralProgram, config } = marinade;
            if (!config.referralCode) {
                throw new Error('The Referral Code must be provided in the MarinadeConfig!');
            }
            const state = yield marinadeReferralProgram.program.account.referralState.fetch(config.referralCode);
            return new MarinadeReferralPartnerState(state, config.referralCode, config.marinadeReferralProgramId);
        });
    }
}
exports.MarinadeReferralPartnerState = MarinadeReferralPartnerState;
//# sourceMappingURL=marinade-referral-partner-state.js.map