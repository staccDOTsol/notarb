import { web3 } from '@project-serum/anchor';
export declare const enum ErrorMessage {
    NO_PUBLIC_KEY = "User's public key must be provided in the configuration!"
}
export declare namespace MarinadeResult {
    interface AddLiquidity {
        associatedLPTokenAccountAddress: web3.PublicKey;
        transaction: web3.Transaction;
    }
    interface RemoveLiquidity {
        associatedLPTokenAccountAddress: web3.PublicKey;
        associatedMSolTokenAccountAddress: web3.PublicKey;
        transaction: web3.Transaction;
    }
    interface Deposit {
        associatedMSolTokenAccountAddress: web3.PublicKey;
        transaction: web3.Transaction;
    }
    interface LiquidUnstake {
        associatedMSolTokenAccountAddress: web3.PublicKey;
        transaction: web3.Transaction;
    }
    interface DepositStakeAccount {
        associatedMSolTokenAccountAddress: web3.PublicKey;
        voterAddress: web3.PublicKey;
        transaction: web3.Transaction;
        mintRatio: number;
    }
    interface LiquidateStakeAccount {
        associatedMSolTokenAccountAddress: web3.PublicKey;
        voterAddress: web3.PublicKey;
        transaction: web3.Transaction;
    }
}
export interface DepositOptions {
    /**
     * The address of the owner account for the associated mSOL account.
     */
    mintToOwnerAddress?: web3.PublicKey;
}
