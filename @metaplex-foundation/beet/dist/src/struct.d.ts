/// <reference types="node" />
import { FixedBeetField, ScalarFixedSizeBeet } from './types';
/**
 * Configures a class or any JavaScript object type for de/serialization aka
 * read/write. All fields of that class have to be of fixed size.
 * If a field requires a {@link FixableBeet} use the {@link FixableBeetStruct}
 * instead.
 *
 * @template Class the type to produce when deserializing
 * @template Args contains all fields, is typically a subset of Class and is
 * used to construct an instance of it
 *
 * @category beet/struct
 */
export declare class BeetStruct<Class, Args = Partial<Class>> implements ScalarFixedSizeBeet<Class> {
    private readonly fields;
    private readonly construct;
    readonly description: string;
    readonly byteSize: number;
    /**
     * Creates an instance of the BeetStruct.
     *
     * @param fields de/serializers for each field of the {@link Class}
     * @param construct the function that creates an instance of {@link Class}
     * from the args
     * @param description identifies this struct for diagnostics/debugging
     * purposes
     */
    constructor(fields: FixedBeetField<Args>[], construct: (args: Args) => Class, description?: string);
    /**
     * Along with `write` this allows structs to be treated as {@link Beet}s and
     * thus supports composing/nesting them the same way.
     * @private
     */
    read(buf: Buffer, offset: number): Class;
    /**
     * Along with `read` this allows structs to be treated as {@link Beet}s and
     * thus supports composing/nesting them the same way.
     * @private
     */
    write(buf: Buffer, offset: number, value: Args): void;
    /**
     * Deserializes an instance of the Class from the provided buffer starting to
     * read at the provided offset.
     *
     * @returns `[instance of Class, offset into buffer after deserialization completed]`
     */
    deserialize(buffer: Buffer, offset?: number): [Class, number];
    /**
     * Serializes the provided instance into a new {@link Buffer}
     *
     * @param instance of the struct to serialize
     * @param byteSize allows to override the size fo the created Buffer and
     * defaults to the size of the struct to serialize
     */
    serialize(instance: Args, byteSize?: number): [Buffer, number];
    private getByteSize;
    static description: string;
}
/**
 * Convenience wrapper around {@link BeetStruct} which is used for plain JavasScript
 * objects, like are used for option args passed to functions.
 *
 * @category beet/struct
 */
export declare class BeetArgsStruct<Args> extends BeetStruct<Args, Args> {
    constructor(fields: FixedBeetField<Args>[], description?: string);
    static description: string;
}
