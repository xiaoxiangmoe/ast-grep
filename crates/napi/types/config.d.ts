import type { Rule } from './rule'
import type { Lang } from './lang'
import type { NodeTypesMap } from './staticTypes'

/**
 * Rule configuration similar to YAML
 * See https://ast-grep.github.io/reference/yaml.html
 */
export interface NapiConfig<M extends NodeTypesMap = NodeTypesMap> {
  /** The rule object, see https://ast-grep.github.io/reference/rule.html */
  rule: Rule<M>
  /** See https://ast-grep.github.io/guide/rule-config.html#constraints */
  constraints?: Record<string, Rule<M>>
  /** Available languages: html, css, js, jsx, ts, tsx */
  language?: Lang
  /**
   * transform is NOT useful in JavaScript. You can use JS code to directly transform the result.
   * https://ast-grep.github.io/reference/yaml.html#transform
   */
  transform?: unknown
  /** https://ast-grep.github.io/guide/rule-config/utility-rule.html */
  utils?: Record<string, Rule<M>>
}
export interface FileOption {
  paths: Array<string>
  languageGlobs: Record<string, Array<string>>
}
export interface FindConfig<M extends NodeTypesMap = NodeTypesMap> {
  /** specify the file paths to recursively find files */
  paths: Array<string>
  /** a Rule object to find what nodes will match */
  matcher: NapiConfig<M>
  /**
   * An list of pattern globs to treat of certain files in the specified language.
   * eg. ['*.vue', '*.svelte'] for html.findFiles, or ['*.ts'] for tsx.findFiles.
   * It is slightly different from https://ast-grep.github.io/reference/sgconfig.html#languageglobs
   */
  languageGlobs?: Array<string>
}