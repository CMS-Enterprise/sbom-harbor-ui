import React, { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import generateId from '@/utils/generateId'
import {
  formatAcceptFileList,
  getErrorMessage,
  getFormattedAcceptObject,
  getUploadStatus,
} from './utils'
import {
  AcceptType,
  ErrorMessage,
  FileType,
  TextOverrides,
  UploadedFile,
  UploadStatus,
} from './types'
import { formatBytes } from '@/utils/formatBytes'
import UploadFileCell from './UploadFileCell'

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: `2px dashed ${theme.palette.text.primary}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  '&.active': {
    border: `2px dashed ${theme.palette.primary.main}`,
  },
  '&.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}))

interface MultiDropzoneProps {
  accept?: AcceptType
  onFileSelect: (files: File[]) => void
  uploadedFiles: UploadedFile[]
  uploading: boolean
  onRemoveFile: (id: string) => void
  isCondensed?: boolean
  maxFiles?: number
  maxSize?: number
  textOverrides?: TextOverrides
}

const MultiDropZone: React.FC<MultiDropzoneProps> = ({
  accept,
  uploadedFiles,
  onFileSelect,
  uploading,
  onRemoveFile,
  isCondensed = false,
  maxFiles = 0,
  maxSize,
  textOverrides,
}) => {
  const [errors, setErrors] = useState<ErrorMessage[]>([])
  const formattedAccept = getFormattedAcceptObject(accept)
  const fileList = formatAcceptFileList(formattedAccept)
  const maxSizePlaceholder =
    maxSize && maxSize > 0
      ? `${textOverrides?.sizeUpToText || 'up to'} ${formatBytes(maxSize)}`
      : ''
  const placeholder = `${textOverrides?.supportsTextShort || 'Supports'} ${
    fileList || 'JSON'
  } ${maxSizePlaceholder}`
  const isOverMaxFiles = maxFiles > 0 && uploadedFiles.length > maxFiles

  const removeError = (removeId: string) =>
    setErrors(errors.filter(({ id }) => id !== removeId))

  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      onFileSelect(acceptedFiles)

      setErrors((previousErrors) => [
        ...previousErrors,
        ...filesRejected.map(({ errors }) => ({
          id: generateId(),
          message: getErrorMessage(
            errors[0],
            { fileList, maxSize },
            textOverrides
          ),
        })),
      ])

      console.error(errors)
    },
    [fileList, maxSize, onFileSelect, textOverrides, errors]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: formattedAccept,
    disabled: uploading,
    maxSize,
    onDrop,
  })

  return (
    <StyledBox
      className={`${isDragActive ? 'active' : ''} ${
        uploading ? 'disabled' : ''
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        {uploading
          ? textOverrides?.currentlyUploadingText ||
            'Please wait while uploading file...'
          : textOverrides?.instructionsText || 'Choose file or drag & drop'}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {textOverrides?.supportsText || placeholder}
      </Typography>

      {errors.map(
        ({ id, message }) =>
          message && (
            <UploadFileCell
              uploadStatus="ERROR"
              file={{
                error: message,
                id,
                name: message,
                progress: 0,
              }}
              key={id}
              onRemoveFile={() => removeError(id)}
              uploading={false}
            />
          )
      )}

      {uploadedFiles.length > 0 && (
        <Box mt={2}>
          {uploadedFiles.map((file) => (
            <UploadFileCell
              uploadStatus={getUploadStatus(file.progress, file.error)}
              file={file}
              key={file.id}
              onRemoveFile={onRemoveFile}
              uploading={uploading}
            />
          ))}
        </Box>
      )}

      <Collapse in={isOverMaxFiles}>
        <Typography variant="body2" color="error">
          {textOverrides?.tooManyFilesError || 'Too many files.'}
        </Typography>
      </Collapse>
    </StyledBox>
  )
}

export type { FileType, MultiDropzoneProps, UploadedFile, UploadStatus }
export default MultiDropZone
