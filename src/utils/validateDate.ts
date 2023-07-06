/**
 * Validate a date ISO date string and return a date object.
 * @module sbom-harbor-ui/utils/validateDate
 */

/**
 * Validate a date string.
 * @param {TDateISO} dateString - The date string to validate as an ISO string.
 * @returns {Date | undefined} The date object or undefined if the date string is invalid.
 * @throws {Error} An error is thrown if the date string is invalid.
 * @example
 *  validateDate('2023-02-32T00:00:00.000Z')
 *  // => Error: Invalid date object
 * @example
 *  validateDate('2023-02-28T00:00:00.000Z')
 *  // => Date {Tue Feb 28 2023 00:00:00 GMT+0000 (Coordinated Universal Time)}
 */
const validateDate = (dateString?: TDateISO): Date | undefined => {
  if (!dateString || typeof dateString === 'undefined') {
    return undefined
  }
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date object')
  }
  return date
}

export default validateDate
