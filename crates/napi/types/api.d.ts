import type { SgNode, SgRoot } from './sgnode'
import type { NapiConfig, FindConfig, FileOption } from './config'
import type { Lang } from './lang'
import type { NamedKinds, NodeTypesMap } from './staticTypes'

export declare function parseFiles<M extends NodeTypesMap>(
  paths: Array<string> | FileOption,
  callback: (err: null | Error, result: SgRoot<M>) => void,
): Promise<number>
/** Parse a string to an ast-grep instance */
export declare function parse<M extends NodeTypesMap>(
  lang: Lang,
  src: string,
): SgRoot<M>
/**
 * Parse a string to an ast-grep instance asynchronously in threads.
 * It utilize multiple CPU cores when **concurrent processing sources**.
 * However, spawning excessive many threads may backfire.
 * Please refer to libuv doc, nodejs' underlying runtime
 * for its default behavior and performance tuning tricks.
 */
export declare function parseAsync<M extends NodeTypesMap>(
  lang: Lang,
  src: string,
): Promise<SgRoot<M>>
/** Get the `kind` number from its string name. */
export declare function kind<M extends NodeTypesMap>(lang: Lang, kindName: NamedKinds<M>): number
/** Compile a string to ast-grep Pattern. */
export declare function pattern<M extends NodeTypesMap>(
  lang: Lang,
  pattern: string,
): NapiConfig<M>
/**
 * Discover and parse multiple files in Rust.
 * `lang` specifies the language.
 * `config` specifies the file path and matcher.
 * `callback` will receive matching nodes found in a file.
 */
export declare function findInFiles<M extends NodeTypesMap>(
  lang: Lang,
  config: FindConfig<M>,
  callback: (err: null | Error, result: SgNode<M>[]) => void,
): Promise<number>