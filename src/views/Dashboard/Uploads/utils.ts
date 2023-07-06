/**
 * @module sbom-harbor-ui/views/Dashboard/Uploads/utils
 * @see {@link @sbom-harbor-ui/views/Dashboard/Uploads}
 */

import getDaysSince from '@/utils/getDaysSince'

/**
 * Format the last upload ISOString as a locale string or 'N/A' if no date is provided.
 * @param {TDateISO} lastUpload - The last upload date.
 */
export const formatLastUploadDate = (lastUpload?: TDateISO): string => {
  if (typeof lastUpload === 'undefined') {
    return 'N/A'
  }
  const date = new Date(lastUpload)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date object')
  }
  return date.toLocaleDateString()
}

/**
 * Map the last upload date to a freshness score.
 * @param {TDateISO} lastUpload - The last upload date.
 * @returns {number} The freshness score.
 * @todo bucket freshness scores show a color-coded freshness score in pills
 */
export const mapLastUploadToFreshness = (lastUpload?: TDateISO): number => {
  if (!lastUpload) return -1
  return getDaysSince(new Date(lastUpload))
}
