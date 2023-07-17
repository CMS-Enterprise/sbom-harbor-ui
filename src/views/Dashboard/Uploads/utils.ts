/**
 * @module sbom-harbor-ui/views/Dashboard/Uploads/utils
 * @see {@link @sbom-harbor-ui/views/Dashboard/Uploads}
 */

import getDaysSince from '@/utils/getDaysSince'
import validateDate from '@/utils/validateDate'

/**
 * Format the last upload ISOString as a locale string or 'N/A' if no date is provided.
 * @param {TDateISO} lastUpload - The last upload date.
 */
export const formatLastUploadDate = (lastUpload?: TDateISO): string => {
  return validateDate(lastUpload)?.toLocaleDateString() || 'N/A'
}

/**
 * Map the last upload date to a freshness score.
 * @param {TDateISO} lastUpload - The last upload date.
 * @returns {number} The freshness score.
 * @todo bucket freshness scores show a color-coded freshness score in pills
 */
export const mapLastUploadToFreshness = (lastUpload?: TDateISO): number => {
  const date = validateDate(lastUpload)
  if (!date || typeof date === 'undefined') {
    return -1
  }
  return getDaysSince(date)
}
