/**
 * Converts a string to title case
 * @module sbom-harbor-ui/utils/toTitleCase
 * @param {string} input - The string to convert
 * @returns {string} The converted string
 */
const toTitleCase = (input: string) =>
  input.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  )

export default toTitleCase
