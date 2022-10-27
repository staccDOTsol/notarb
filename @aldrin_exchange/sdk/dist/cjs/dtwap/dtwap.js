"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwAmm = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var _1 = require(".");
var __1 = require("..");
var utils_1 = require("../utils");
/**
 * TWAMM instructions & help utils
 */
var TwAmm = /** @class */ (function () {
    function TwAmm() {
    }
    /**
       * Create instruction for getAvailableTokensForSale simulation
      * @param params
       * @returns
       */
    TwAmm.getAvailableTokensInstruction = function (params) {
        var data = Buffer.alloc(_1.GET_AVAILABLE_TOKENS_LAYOUT.span);
        var pairSettings = params.pairSettings, pyth = params.pyth, orderArray = params.orderArray;
        _1.GET_AVAILABLE_TOKENS_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('get_available_tokens_for_sale'),
        }, data);
        var keys = [
            (0, utils_1.account)(pairSettings),
            (0, utils_1.account)(orderArray),
            (0, utils_1.account)(pyth),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: __1.DTWAP_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    TwAmm.executeSwapInstruction = function (params) {
        var data = Buffer.alloc(_1.GET_AVAILABLE_TOKENS_LAYOUT.span);
        var pairSettings = params.pairSettings, pyth = params.pyth, orderArray = params.orderArray, signer = params.signer, wallet = params.wallet, userFrom = params.userFrom, userTo = params.userTo, twammFromTokenVault = params.twammFromTokenVault, twammToTokenVault = params.twammToTokenVault;
        _1.GET_AVAILABLE_TOKENS_LAYOUT.encode({
            instruction: (0, utils_1.instructionDiscriminator)('execute_swap_token'),
        }, data);
        var keys = [
            (0, utils_1.account)(pairSettings),
            (0, utils_1.account)(orderArray, true),
            (0, utils_1.account)(signer),
            (0, utils_1.account)(userFrom, true),
            (0, utils_1.account)(userTo, true),
            (0, utils_1.account)(wallet.publicKey, false, true),
            (0, utils_1.account)(twammFromTokenVault, true),
            (0, utils_1.account)(twammToTokenVault, true),
            (0, utils_1.account)(pyth),
            (0, utils_1.account)(web3_js_1.SYSVAR_CLOCK_PUBKEY),
            (0, utils_1.account)(spl_token_1.TOKEN_PROGRAM_ID),
        ];
        return new web3_js_1.TransactionInstruction({
            programId: __1.DTWAP_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    return TwAmm;
}());
exports.TwAmm = TwAmm;
