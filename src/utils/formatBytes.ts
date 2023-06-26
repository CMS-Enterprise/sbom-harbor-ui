/**
 * A utility function to format bytes into a human readable format.
 * @module sbom-harbor-ui/utils/formatBytes
 */
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

/**
 * A utility function to format bytes into a human readable format.
 * @param {number} bytes the bytes value to format
 * @param {[number=0]} decimals the number of decimal places to include
 * @returns {string} bytes formatted into a human readable format
 */
const formatBytes = (bytes: number, decimals = 0): string => {
  if (!+bytes) {
    return '0 Bytes'
  }
  const dm = decimals < 0 ? 0 : decimals
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default formatBytes
