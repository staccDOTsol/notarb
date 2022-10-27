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
const __1 = require("..");
describe('MarinadeState', () => {
    it('getStakeStates', () => __awaiter(void 0, void 0, void 0, function* () {
        const marinade = new __1.Marinade();
        const state = yield marinade.getMarinadeState();
        const accountInfos = [{
                account: {
                    data: Buffer.from('AgAAAIDVIgAAAAAANW0aj6LBKPbJQ/wTWTSoQgM4pWWci256Ye2TQjl8FVuAaQtLGkbornYeejJYw3kxRYbab8LmYo3X4irqaL1q7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEClM1NCYixYJ/F511x003U5jAB5HWc+6vGBUWA4WISTCwRyggAAAACTAAAAAAAAAP//////////AAAAAAAA0D/YExAEAAAAAAAAAAA=', 'base64'),
                    executable: false,
                    lamports: 2190793099,
                    owner: __1.MarinadeUtils.STAKE_PROGRAM_ID,
                    rentEpoch: 224,
                },
                pubkey: new __1.web3.PublicKey('6yWLeYR8RsBHGbAvUGQhsi72JEhn2sZAjY2jxjQPT5sC'),
            }];
        marinade.provider.connection.getProgramAccounts = jest.fn().mockResolvedValueOnce(accountInfos);
        const stakeStates = yield state.getStakeStates();
        expect(stakeStates).toMatchSnapshot();
    }));
});
//# sourceMappingURL=marinade-state.spec.js.map