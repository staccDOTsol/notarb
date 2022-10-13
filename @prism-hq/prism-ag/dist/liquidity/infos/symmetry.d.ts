import { Connection } from "@solana/web3.js";
export declare function loadSymmetry(liquidity: any, connection: Connection): Promise<{
    symmetry?: undefined;
} | {
    symmetry: any;
}>;
