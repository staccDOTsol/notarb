import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
var POOLS_PROGRAM_ADDRESS = new PublicKey('AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6');
var POOLS_V2_PROGRAM_ADDRESS = new PublicKey('CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4');
var DTWAP_PROGRAM_ADDRESS = new PublicKey('TWAPR9s1DEhrr8tuFbwEPws5moHXebMotqU85wwVmvU');
export var PRECISION_NOMINATOR = new BN(1000000); // BN precision
export { POOLS_PROGRAM_ADDRESS, POOLS_V2_PROGRAM_ADDRESS, DTWAP_PROGRAM_ADDRESS, };
