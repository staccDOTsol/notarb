import * as BufferLayout from '@solana/buffer-layout';
/**
 *
 * {

          {
            "name": "tokensTotal",
            "type": "u64"
          },
          {
            "name": "periodLength",
            "type": "u64"
          },
          {
            "name": "noWithdrawalTime",
            "type": "i64"
          },
          {
            "name": "vestingType",
            "type": "u8"
          },
          {
            "name": "vestingPeriod",
            "type": "i64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "currentTime",
            "type": "i64"
          },
          {
            "name": "pool",
            "type": "publicKey"
          },
          {
            "name": "farmingTokenVault",
            "type": "publicKey"
          },
          {
            "name": "farmingSnapshots",
            "type": "publicKey"
          }

 */
export declare const FarmingStateLayout: BufferLayout.Structure;
