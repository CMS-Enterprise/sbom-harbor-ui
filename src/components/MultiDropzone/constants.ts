/**
 * Constants for the MultiDropzone component.
 * @module sbom-harbor-ui/components/MultiDropzone/constants
 */
import { FileType } from '@/components/MultiDropzone/types'
import { formatMimeType } from '@/components/MultiDropzone/utils'

//* Constants for the MultiDropzone component.
// The default text shown in the uploading state.
export const DEFAULT_UPLOADING_TEXT = 'Please wait while uploading file...'
// The default text for the error shown if too many files are selected.
export const DEFAULT_TOO_MANY_FILES_ERROR = 'Too many files.'

//* Constants for the UploadFileCell component.
// The default text shown when the file is uploaded.
export const DEFAULT_CELL_UPLOADED_TEXT = 'Uploaded'
// The default text shown when the file is uploading.
export const DEFAULT_CELL_UPLOADING_TEXT = 'Uploading...'
// The default text shown when the file upload fails.
export const DEFAULT_CELL_ERROR_TEXT = 'Something went wrong. Try again.'

//* Constants for the file types.
const SOURCE_CODE_FILES: FileType[] = ['json']
const DOCUMENT_FILES: FileType[] = ['doc', 'docx', 'pdf']
const IMAGE_FILES: FileType[] = ['heic', 'bmp', 'jpeg', 'jpg', 'png']
// The default source code file types accepted.
export const SOURCE_CODE_FILES_ACCEPT = formatMimeType(SOURCE_CODE_FILES)
// The default document file types accepted.
export const DOCUMENT_FILES_ACCEPT = formatMimeType(DOCUMENT_FILES)
// The default image file types accepted.
export const IMAGE_FILES_ACCEPT = formatMimeType(IMAGE_FILES)
