/**
 * Utility functions for the MultiDropzone component.
 * @module sbom-harbor-ui/components/MultiDropzone/utils
 * @exports formatAcceptFileList
 * @exports getUploadStatus
 * @exports formatMimeType
 * @exports getFormattedAcceptObject
 * @exports getErrorMessage
 */
import { Accept, ErrorCode, FileError } from 'react-dropzone'
import formatBytes from '@/utils/formatBytes'
import {
  DOCUMENT_FILES_ACCEPT,
  IMAGE_FILES_ACCEPT,
  SOURCE_CODE_FILES_ACCEPT,
} from '@/components/MultiDropzone/constants'
import {
  AcceptType,
  FileMimeTypes,
  FileType,
  TextOverrides,
  UploadStatus,
} from '@/components/MultiDropzone/types'

/**
 * Get the upload status based on the progress and error.
 * @param {number} progress - The progress of the upload from 0 to 100
 * @param {string} error - The error message if the upload failed
 * @returns {UploadStatus} - The upload status enum value
 */
export const getUploadStatus = (
  progress: number,
  error?: string
): UploadStatus => {
  if (error) return UploadStatus.ERROR
  if (progress < 100) return UploadStatus.UPLOADING
  return UploadStatus.COMPLETE
}

/**
 * Format mime types to be used in the accept prop.
 * @param {FileType[]} values - The file types to format
 * @returns {Accept} - The formatted accept object
 */
export const formatMimeType = (values: FileType[]): Accept => {
  const formatedValues = {} as Accept
  values.forEach(
    (value) => (formatedValues[FileMimeTypes[value]] = [`.${value}`])
  )
  return formatedValues
}

/**
 * Get the file types that are accepted for upload from mime types.
 * @param {AcceptType} accept - The accept type to format
 * @returns {Accept} - The formatted accept object
 */
export const getFormattedAcceptObject = (accept: AcceptType = {}): Accept => {
  if (accept === 'source') return SOURCE_CODE_FILES_ACCEPT
  if (accept === 'document') return DOCUMENT_FILES_ACCEPT
  if (accept === 'image') return IMAGE_FILES_ACCEPT
  return accept
}

/**
 * Concatenate the accepted file values as a string for display.
 * @param {Accept} accept - The accept object to format
 * @returns {string} - The formatted accept object
 */
export const formatAcceptFileList = (accept: Accept): string =>
  Object.values(accept)
    .reduce((acc, value) => [...acc, ...value], [])
    .join(', ')
    .replace(/\./g, '')
    .toUpperCase()

/**
 * Get the error message to display based on the error code.
 * @param {FileError} error - The error object
 * @param {{fileList?: string; maxSize?: number}} - The file list and max size
 * @param {string} fileList - The list of file types that are accepted
 * @param {number} maxSize - The max size of the file in bytes
 * @param {TextOverrides} textOverrides - The text overrides for the component
 * @returns {string} - The formatted error message
 * @todo - Add support for multiple errors
 */
export const getErrorMessage = (
  { code, message }: FileError,
  { fileList = '', maxSize }: { fileList?: string; maxSize?: number },
  textOverrides?: TextOverrides
): string => {
  switch (code) {
    case ErrorCode.FileInvalidType:
      return `${textOverrides?.fileTypeError || 'File type must be one of'}${
        fileList ? ' ' + fileList : ''
      }.`
    case ErrorCode.FileTooLarge:
      return `${
        textOverrides?.fileTooLargeError ||
        'File is too large. It must be less than'
      } ${formatBytes(maxSize || 0)}.`
    default:
      return message
  }
}
