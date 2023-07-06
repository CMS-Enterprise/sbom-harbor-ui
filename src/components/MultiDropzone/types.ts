/**
 * MultiDropzone types
 * @module sbom-harbor-ui/components/MultiDropzone/types
 */
import { Accept } from 'react-dropzone'

export enum FileMimeTypes {
  bmp = 'image/bmp',
  doc = 'application/msword',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  heic = 'image/heic',
  jpeg = 'image/jpeg',
  jpg = 'image/jpg',
  pdf = 'application/pdf',
  png = 'image/png',
  tif = 'image/tiff',
  webp = 'image/webp',
  json = 'application/json',
}

export type FileType = keyof typeof FileMimeTypes

export enum UploadStatus {
  UPLOADING = 'UPLOADING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}
export interface UploadedFile {
  id: string
  name: string
  previewUrl?: string
  progress: number
  error?: string
  showProgressBar?: boolean
  showLoadingSpinner?: boolean
}

export type AcceptType = 'source' | 'document' | 'image' | Accept

export interface TextOverrides {
  currentlyUploadingText?: string
  fileTypeError?: string
  fileTooLargeError?: string
  instructionsText?: string
  sizeUpToText?: string
  supportsText?: string
  supportsTextShort?: string
  tooManyFilesError?: string
}
export interface ErrorMessage {
  id: string
  message: string
}

export interface MultiDropzoneStyleProps {
  isCondensed?: boolean
  multiple?: boolean
  textOverrides?: TextOverrides
  uploading: boolean
}

export interface MultiDropzoneProps extends MultiDropzoneStyleProps {
  accept?: AcceptType
  maxFiles?: number
  maxSize?: number
  onFileSelect: (files: File[]) => void
  onRemoveFile: (id: string) => void
  uploadedFiles: UploadedFile[]
}

export interface UploadFileCellProps {
  file: UploadedFile
  onRemoveFile: (id: string) => void
  uploading: boolean
  uploadStatus: UploadStatus
}
