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
exports.MarinadeMint = void 0;
const anchor_1 = require("../util/anchor");
const conversion_1 = require("../util/conversion");
class MarinadeMint {
    constructor(anchorProvider, address) {
        this.anchorProvider = anchorProvider;
        this.address = address;
        this.mintClient = () => (0, anchor_1.getMintClient)(this.anchorProvider, this.address);
        this.mintInfo = () => this.mintClient().getMintInfo();
    }
    static build(anchorProvider, mintAddress) {
        return new MarinadeMint(anchorProvider, mintAddress);
    }
    /**
     * Returns Total supply as a number with decimals
     * @param mintInfoCached optional
     * @returns
     */
    totalSupply(mintInfoCached) {
        return __awaiter(this, void 0, void 0, function* () {
            const mintInfo = mintInfoCached !== null && mintInfoCached !== void 0 ? mintInfoCached : yield this.mintInfo();
            return (0, conversion_1.tokenBalanceToNumber)(mintInfo.supply, mintInfo.decimals);
        });
    }
    /**
     * @deprecated use totalSupply() instead
     */
    tokenBalance(mintInfoCached) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.totalSupply(mintInfoCached);
        });
    }
}
exports.MarinadeMint = MarinadeMint;
//# sourceMappingURL=marinade-mint.js.map