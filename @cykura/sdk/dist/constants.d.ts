import { web3 } from "@project-serum/anchor";
export declare const FACTORY_ADDRESS: web3.PublicKey;
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
    SUPER_STABLE = 20,
    TURBO_SPL = 80,
    LOW = 500,
    MEDIUM = 3000,
    HIGH = 10000
}
/**
 * The default factory tick spacings by fee amount.
 */
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
