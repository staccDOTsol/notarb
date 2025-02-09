import { SupportedTypeDefinition } from './types';
import { CollectionsExports, CollectionsTypeMapKey } from './beets/collections';
import { CompositesExports, CompositesTypeMapKey } from './beets/composites';
import { NumbersExports, NumbersTypeMapKey } from './beets/numbers';
import { StringExports, StringTypeMapKey } from './beets/string';
import { EnumsExports, EnumsTypeMapKey } from './beets/enums';
export * from './beets/collections';
export * from './beets/string';
export * from './beets/composites';
export * from './beets/enums';
export * from './beets/numbers';
export * from './beet.fixable';
export * from './read-write';
export * from './struct';
export * from './struct.fixable';
export * from './types';
/**
 * @category TypeDefinition
 */
export declare type BeetTypeMapKey = CollectionsTypeMapKey | StringTypeMapKey | CompositesTypeMapKey | EnumsTypeMapKey | NumbersTypeMapKey;
/**
 * @category TypeDefinition
 */
export declare type BeetExports = CollectionsExports | StringExports | CompositesExports | EnumsExports | NumbersExports;
/**
 * Maps all {@link Beet} de/serializers to metadata which describes in which
 * package it is defined as well as which TypeScript type is used to represent
 * the deserialized value in JavaScript.
 *
 * @category TypeDefinition
 */
export declare const supportedTypeMap: Record<BeetTypeMapKey, SupportedTypeDefinition & {
    beet: BeetExports;
}>;
