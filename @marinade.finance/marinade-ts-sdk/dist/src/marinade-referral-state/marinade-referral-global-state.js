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
exports.MarinadeReferralGlobalState = void 0;
class MarinadeReferralGlobalState {
    constructor(state, marinadeReferralProgramId) {
        this.state = state;
        this.marinadeReferralProgramId = marinadeReferralProgramId;
    }
    static fetch(marinade) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marinadeReferralProgram, config } = marinade;
            const globalState = yield marinadeReferralProgram.program.account.globalState.fetch(config.marinadeReferralGlobalStateAddress);
            return new MarinadeReferralGlobalState(globalState, config.marinadeReferralProgramId);
        });
    }
}
exports.MarinadeReferralGlobalState = MarinadeReferralGlobalState;
//# sourceMappingURL=marinade-referral-global-state.js.map