import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SYSVAR_CLOCK_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { GET_AVAILABLE_TOKENS_LAYOUT } from '.';
import { DTWAP_PROGRAM_ADDRESS } from '..';
import { account, instructionDiscriminator } from '../utils';
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
        var data = Buffer.alloc(GET_AVAILABLE_TOKENS_LAYOUT.span);
        var pairSettings = params.pairSettings, pyth = params.pyth, orderArray = params.orderArray;
        GET_AVAILABLE_TOKENS_LAYOUT.encode({
            instruction: instructionDiscriminator('get_available_tokens_for_sale'),
        }, data);
        var keys = [
            account(pairSettings),
            account(orderArray),
            account(pyth),
            account(SYSVAR_CLOCK_PUBKEY),
        ];
        return new TransactionInstruction({
            programId: DTWAP_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    TwAmm.executeSwapInstruction = function (params) {
        var data = Buffer.alloc(GET_AVAILABLE_TOKENS_LAYOUT.span);
        var pairSettings = params.pairSettings, pyth = params.pyth, orderArray = params.orderArray, signer = params.signer, wallet = params.wallet, userFrom = params.userFrom, userTo = params.userTo, twammFromTokenVault = params.twammFromTokenVault, twammToTokenVault = params.twammToTokenVault;
        GET_AVAILABLE_TOKENS_LAYOUT.encode({
            instruction: instructionDiscriminator('execute_swap_token'),
        }, data);
        var keys = [
            account(pairSettings),
            account(orderArray, true),
            account(signer),
            account(userFrom, true),
            account(userTo, true),
            account(wallet.publicKey, false, true),
            account(twammFromTokenVault, true),
            account(twammToTokenVault, true),
            account(pyth),
            account(SYSVAR_CLOCK_PUBKEY),
            account(TOKEN_PROGRAM_ID),
        ];
        return new TransactionInstruction({
            programId: DTWAP_PROGRAM_ADDRESS,
            keys: keys,
            data: data,
        });
    };
    return TwAmm;
}());
export { TwAmm };
