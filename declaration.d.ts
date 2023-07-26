/// <reference types="vite/client" />

/**
 * Global type declarations
 * @module @sbom-harbor-ui/dashboard/declaration
 * @description Global type declarations for the Harbor UI Dashboard.
 */

// Image module declarations
declare module '*.png'
declare module '*.svg'

// Style module declaration
declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

/**
 * Utility type that sets chosen attributes of type T as required. It makes use
 *  of T for the original type, and K as a union of T keys that need to be set
 *  as required. The expression { [_ in K]: {} } represents a mapped type where
 *  every property K in T is defined as necessary. This type is beneficial for
 *  setting specific properties of object type T as non-nullable or needed.
 */
type WithRequired<T, K extends keyof T> = T & { [_ in K]: NonNullable<T[_]> }

/**
 * Generalizable way to require at least one of a set of properties is provided.
 * @see https://stackoverflow.com/a/49725198/1526037
 * @author KPD (https://stackoverflow.com/users/2077574/kpd)
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/**
 * Partial but not absolute way to require that one and only one is provided.
 * @see https://stackoverflow.com/a/49725198/1526037
 * @author KPD (https://stackoverflow.com/users/2077574/kpd)
 */
type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

/**
 * Utility type that takes two types T and U. It creates a new type that has
 *  all the properties of T, and where the properties that share with U are
 *  marked as never. This makes sure that the intersection of properties
 *  between T and U is not present in the final type.
 */
type Only<T, U> = {
  [P in keyof T]: T[P]
} & {
  [P in keyof U]?: never
}

/**
 * Utility type that is a union type of Only<T, U> and Only<U, T>.
 * It represents a type that contains properties of either T or U,
 *  but not the properties that are shared by T and U.
 * This is useful when you want to specify a type that takes
 *  either one or the other type, but not a mix of both.
 */
type Either<T, U> = Only<T, U> | Only<U, T>

/**
 * Generic Error Callback type
 */
type ErrorCallbackType = (err: Error) => void

/**
 * Date Interface
 */
interface Date {
  /**
   * Give a more precise return type to the method `toISOString()`:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
   */
  toISOString(): TDateISO
}

type TYear = `${number}${number}${number}${number}`
type TMonth = `${number}${number}`
type TDay = `${number}${number}`
type THours = `${number}${number}`
type TMinutes = `${number}${number}`
type TSeconds = `${number}${number}`
type TMilliseconds = `${number}${number}${number}`

/**
 * Represent a string like `2021-01-08`
 */
type TDateISODate = `${TYear}-${TMonth}-${TDay}`

/**
 * Represent a string like `14:42:34.678`
 */
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values
 * for months, hours, etc.) as it would result in a warning from TypeScript:
 *  "Expression produces a union type that is too complex to represent. ts(2590)
 */
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`

/**
 * Represent a string like `2021-01-08T14:42:34.678` (format: ISO 8601).
 * The server needs the string to be formatted this way.
 */
type TDateISOWithoutZ = `${TDateISODate}T${TDateISOTime}`
