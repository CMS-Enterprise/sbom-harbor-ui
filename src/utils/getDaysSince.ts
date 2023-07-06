/**
 * Returns the number of days since the given date.
 * @module sbom-harbor-ui/utils/getDaysSince
 * @param {Date} date - The date to compare to.
 * @returns {number} The number of days since the given date.
 */
const getDaysSince = (date: Date): number => {
  // throw an error if the date is invalid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date object')
  }
  const now = new Date()
  const lastUploadDate = new Date(date)
  const diff = now.getTime() - lastUploadDate.getTime()
  const days = diff / (1000 * 3600 * 24)
  return Math.floor(days)
}

export default getDaysSince
