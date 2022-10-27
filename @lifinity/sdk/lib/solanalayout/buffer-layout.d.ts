/// <reference types="node" />
export interface Layout<T = any, P = ''> {
    span: number;
    property?: P;
    decode(b: Buffer, offset?: number): T;
    encode(src: T, b: Buffer, offset?: number): number;
    getSpan(b: Buffer, offset?: number): number;
    replicate<AP extends string>(name: AP): Layout<T, AP>;
}
export interface LayoutConstructor {
    new <T, P>(): Layout<T, P>;
    new <T, P>(span?: T, property?: P): Layout<T, P>;
    readonly prototype: Layout;
}
export declare const Layout: LayoutConstructor;
export interface Structure<T = any, P = '', DecodeSchema extends {
    [key: string]: any;
} = any> extends Layout<DecodeSchema, P> {
    span: number;
    decode(b: Buffer, offset?: number): DecodeSchema;
    layoutFor<AP extends string>(property: AP): Layout<DecodeSchema[AP]>;
    offsetOf<AP extends string>(property: AP): number;
}
interface StructureConstructor {
    new <T = any, P = '', DecodeSchema extends {
        [key: string]: any;
    } = any>(): Structure<T, P, DecodeSchema>;
    new <T = any, P = '', DecodeSchema extends {
        [key: string]: any;
    } = any>(fields: T, property?: P, decodePrefixes?: boolean): Structure<T, P, DecodeSchema>;
}
export declare const Structure: StructureConstructor;
export declare type UInt<T = any, P = ''> = Layout<T, P>;
interface UIntConstructor {
    new <T, P>(span?: T, property?: P): UInt<T, P>;
}
export declare const UInt: UIntConstructor;
export declare type Blob<P extends string = ''> = Layout<Buffer, P>;
interface BlobConstructor {
    new (...params: ConstructorParameters<LayoutConstructor>): Blob;
}
export declare const Blob: BlobConstructor;
export declare const u8: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const u16: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const u24: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const u32: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const u40: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const u48: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const nu64: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const f32: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const f64: <P extends string = "">(property?: P) => Layout<number, P>;
export declare const struct: <T, P extends string = "">(fields: T, property?: P, decodePrefixes?: boolean) => T extends Layout<infer Value, infer Property>[] ? Structure<Value, P, { [K in Exclude<Extract<Property, string>, "">]: Extract<T[number], Layout<any, K>> extends Layout<infer V, any> ? V : any; }> : any;
export declare const blob: <P extends string = "">(length: number | Layout<number, P>, property?: P) => Blob<P>;
export declare const offset: <T, P extends string = "">(layout: Layout<T, P>, offset?: number, property?: P) => Layout<T, P>;
export {};
