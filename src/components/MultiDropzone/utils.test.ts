import { Accept, ErrorCode, FileError } from 'react-dropzone'
import {
  DOCUMENT_FILES_ACCEPT,
  IMAGE_FILES_ACCEPT,
  SOURCE_CODE_FILES_ACCEPT,
} from '@/components/MultiDropzone/constants'
import {
  getUploadStatus,
  formatMimeType,
  getFormattedAcceptObject,
  formatAcceptFileList,
  getErrorMessage,
} from '@/components/MultiDropzone/utils'
import { FileType, UploadStatus } from '@/components/MultiDropzone/types'

describe('MultiDropzone utils', () => {
  describe('getUploadStatus', () => {
    it('should return ERROR if error is present', () => {
      expect(getUploadStatus(0, 'error')).toEqual(UploadStatus.ERROR)
    })

    it('should return UPLOADING if progress is less than 100', () => {
      expect(getUploadStatus(50)).toEqual(UploadStatus.UPLOADING)
    })

    it('should return COMPLETE if progress is 100 and no error', () => {
      expect(getUploadStatus(100)).toEqual(UploadStatus.COMPLETE)
    })
  })

  describe('formatMimeType', () => {
    it('should return correct mime types', () => {
      const fileType: FileType[] = ['json']
      const expected: Accept = {
        'application/json': ['.json'],
      }
      expect(formatMimeType(fileType)).toEqual(expected)
    })
  })

  describe('getFormattedAcceptObject', () => {
    it('returns SOURCE_CODE_FILES_ACCEPT for "source"', () => {
      expect(getFormattedAcceptObject('source')).toBe(SOURCE_CODE_FILES_ACCEPT)
    })

    it('returns DOCUMENT_FILES_ACCEPT for "document"', () => {
      expect(getFormattedAcceptObject('document')).toBe(DOCUMENT_FILES_ACCEPT)
    })

    it('returns IMAGE_FILES_ACCEPT for "image"', () => {
      expect(getFormattedAcceptObject('image')).toBe(IMAGE_FILES_ACCEPT)
    })

    it('returns the same object for any other input', () => {
      const acceptObject = { example: ['.ext'] }
      expect(getFormattedAcceptObject(acceptObject)).toBe(acceptObject)
    })

    it('returns an empty object when no argument is provided', () => {
      expect(getFormattedAcceptObject()).toEqual({})
    })
  })

  describe('formatAcceptFileList', () => {
    it('should return formatted accept object', () => {
      const accept: Accept = {
        'application/json': ['.json'],
      }
      expect(formatAcceptFileList(accept)).toEqual('JSON')
    })
  })

  describe('getErrorMessage', () => {
    it('returns custom error message for invalid file type', () => {
      const error: FileError = {
        code: ErrorCode.FileInvalidType,
        message: 'Invalid file type',
      }
      const params = { fileList: 'jpg, png', maxSize: 20000 }
      const textOverrides = {
        fileTypeError: 'Please upload a valid file type:',
      }

      expect(getErrorMessage(error, params, textOverrides)).toBe(
        'Please upload a valid file type: jpg, png.'
      )
    })

    it('returns default error message if fileTypeError is not provided in textOverrides', () => {
      const error: FileError = {
        code: ErrorCode.FileInvalidType,
        message: 'Invalid file type',
      }
      const params = { fileList: 'jpg, png', maxSize: 20000 }
      expect(getErrorMessage(error, params)).toBe(
        'Only the following file types are accepted: jpg, png.'
      )
    })

    it('returns custom error message for file too large', () => {
      const error: FileError = {
        code: ErrorCode.FileTooLarge,
        message: 'File too large',
      }
      const params = { fileList: 'jpg, png', maxSize: 20000 }
      const textOverrides = {
        fileTooLargeError: 'File is too large. It should be less than:',
      }
      expect(getErrorMessage(error, params, textOverrides)).toContain(
        'File is too large. It should be less than:'
      )
    })

    it('returns custom error message for invalid file type with default fileList', () => {
      const error: FileError = {
        code: ErrorCode.FileInvalidType,
        message: 'Invalid file type',
      }
      const params = { maxSize: 20000, fileList: 'json' }
      const textOverrides = {
        fileTypeError: 'Please upload a valid file type:',
      }
      expect(getErrorMessage(error, params, textOverrides)).toBe(
        'Please upload a valid file type: json.'
      )
    })

    it('returns custom error message for file too large with default maxSize', () => {
      const error: FileError = {
        code: ErrorCode.FileTooLarge,
        message: 'File too large',
      }
      const params = { fileList: 'jpg, png' }
      const textOverrides = {
        fileTooLargeError: 'File is too large. It should be less than:',
      }
      expect(getErrorMessage(error, params, textOverrides)).toContain(
        'File is too large. It should be less than: 0 Bytes.'
      )
    })

    it('returns default error message if fileTooLargeError is not provided in textOverrides', () => {
      const error: FileError = {
        code: ErrorCode.FileTooLarge,
        message: 'File too large',
      }
      const params = { fileList: 'jpg, png', maxSize: 20000 }
      expect(getErrorMessage(error, params)).toContain(
        'File is too large. It must be less than 20 KB.'
      )
    })

    it('returns default error message for file too large with maxSize formatted', () => {
      const error: FileError = {
        code: ErrorCode.FileTooLarge,
        message: 'File too large',
      }
      const params = { maxSize: 20000 }
      expect(getErrorMessage(error, params)).toContain(
        'File is too large. It must be less than 20 KB.'
      )
    })

    it('returns default error message for invalid file type with no fileList', () => {
      const error: FileError = {
        code: ErrorCode.FileInvalidType,
        message: 'Invalid file type',
      }
      const params = { fileList: '', maxSize: 20000 }
      expect(getErrorMessage(error, params)).toBe(
        'Only the following file types are accepted: NONE.'
      )
    })

    it('returns default error message if error code does not match', () => {
      const error: FileError = {
        code: 'unknown_error',
        message: 'Unknown error',
      }
      const params = {}
      expect(getErrorMessage(error, params)).toBe('Unknown error')
    })

    it('returns default error message if error code does not match and no error message', () => {
      const error: FileError = { code: 'unknown_error', message: '' }
      const params = {}
      expect(getErrorMessage(error, params)).toBe('')
    })
  })
})
