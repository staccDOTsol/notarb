/// <reference types="node" />
import Decimal from "decimal.js";
export declare class DecimalExt {
    /**
     * New a Decimal from a int64 buffer
     * @param buffer The buffer
     * @param precision The pricision
     * @returns The Decimal value, the result will be div 10^precision
     */
    static from64Buffer(buffer: Buffer, precision?: number): Decimal;
    /**
     * New a Decimal from a uint64 buffer
     * @param buffer The buffer
     * @param precision The precision
     * @returns The Decimal value, the result will be div 10^precision
     */
    static fromU64Buffer(buffer: Buffer, precision?: number): Decimal;
    /**
     * New a Decimal from a int128 buffer
     * @param buffer The buffer
     * @param precision The pricision
     * @returns The Decimal value, the result will be div 10^precision
     */
    static from128Buffer(buffer: Buffer, precision?: number): Decimal;
    /**
     * New a Decimal from a uint128 buffer
     * @param buffer The buffer
     * @param precision The precision
     * @returns The Decimal value, the result will be div 10^precision
     */
    static fromU128Buffer(buffer: Buffer, precision?: number): Decimal;
    /**
     * Convert a Decimal value to int64 buffer
     * @param v The Decimal value
     * @param precision The precision
     * @returns The buffer, the result will be mul 10^precision
     */
    static to64Buffer(v: Decimal, precision?: number): Buffer;
    /**
     * Convert a Decimal value to uint64 buffer
     * @param v The Decimal value
     * @param precision The precision
     * @returns The buffer, the result will be mul 10^precision
     */
    static toU64Buffer(v: Decimal, precision?: number): Buffer;
    /**
     * Convert a Decimal value to int128 buffer
     * @param v The Decimal value
     * @param precision The precision
     * @returns The buffer, the result will be mul 10^precision
     */
    static to128Buffer(v: Decimal, precision?: number): Buffer;
    /**
     * Convert a Decimal value to uint128 buffer
     * @param v The Decimal value
     * @param precision The precision
     * @returns The buffer, the result will be mul 10^precision
     */
    static toU128Buffer(v: Decimal, precision?: number): Buffer;
}
