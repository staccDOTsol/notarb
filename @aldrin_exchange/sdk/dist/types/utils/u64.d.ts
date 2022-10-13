/// <reference types="node" />
import BN from 'bn.js';
/**
 * 64-bit value
 */
export declare class u64 extends BN {
    /**
     * Convert to Buffer representation
     */
    toBuffer(): Buffer;
    /**
     * Construct a u64 from Buffer representation
     */
    static fromBuffer(buffer: Buffer): u64;
}
