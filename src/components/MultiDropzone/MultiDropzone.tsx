/**
 * Component that via drag and drop or selection of files for upload.
 * @module sbom-harbor-ui/components/MultiDropzone/MultiDropzone
 */
import React, { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import UploadFileCell from '@/components/MultiDropzone/UploadFileCell'
import {
  DEFAULT_TOO_MANY_FILES_ERROR,
  DEFAULT_UPLOADING_TEXT,
} from '@/components/MultiDropzone/constants'
import {
  AcceptType,
  ErrorMessage,
  FileMimeTypes,
  FileType,
  MultiDropzoneProps,
  MultiDropzoneStyleProps,
  TextOverrides,
  UploadedFile,
  UploadFileCellProps,
  UploadStatus,
} from '@/components/MultiDropzone/types'
import {
  formatAcceptFileList,
  getErrorMessage,
  getFormattedAcceptObject,
  getUploadStatus,
} from '@/components/MultiDropzone/utils'
import formatBytes from '@/utils/formatBytes'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

/**
 * The styled container that's the target for the drag and drop functionality.
 * @param {MultiDropzoneStyleProps} props - The props for the styled container
 * @param {Theme} props.theme - The theme object provided by the ThemeProvider
 * @returns {React.FC} - The styled container
 */
const StyledBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  border: `3px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
  padding: theme.spacing(4),
  transition: 'border .24s ease-in-out',
  '&.active': {
    border: `2px dashed ${theme.palette.primary.light}`,
  },
  '&.disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  '& .MuiSvgIcon-fontSizeLarge': {
    fontSize: theme.typography.fontSize * 5,
    marginBottom: theme.spacing(2),
  },
  '& .MuiDialogTitle-root': {
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

/**
 * The default CallToAction component rendered in the MultiDropzone component.
 * @returns {React.FC} - The default CallToAction component
 */
const DefaultCTA: React.FC = () => (
  <span
    style={{
      alignItems: 'center',
      display: 'inline-flex',
    }}
  >
    <span style={{ lineHeight: 2 }}>Drag and drop files or</span>
    <Button
      aria-label="Browse for Files"
      color="primary"
      size="small"
      sx={{
        p: 0,
        lineHeight: 2,
        minHeight: '100%',
        width: 'auto',
      }}
    >
      Browse
    </Button>
  </span>
)

/**
 * The CallToAction component rendered inside the MultiDropzone component.
 * @param {MultiDropzoneStyleProps} param0 props - Input props
 * @param {boolean} props.uploading - Whether or not a file is uploading
 * @param {[boolean=false]} props.isCondensed - Whether or not text is condensed
 * @param {TextOverrides} props.textOverrides - Overrides for the CTA text
 * @param {string} props.textOverrides.currentlyUploadingText - Text override for when a file is uploading
 * @param {string} props.textOverrides.instructionsText - Text override for when a file is not uploading
 * @returns {React.FC} - The conditionally rendered CallToAction component
 */
const CallToAction: React.FC<MultiDropzoneStyleProps> = ({
  uploading,
  isCondensed = false,
  textOverrides: { currentlyUploadingText = '', instructionsText = '' } = {},
}) => (
  <Typography variant={isCondensed ? 'body2' : 'body1'}>
    {uploading
      ? currentlyUploadingText || DEFAULT_UPLOADING_TEXT
      : instructionsText || <DefaultCTA />}
  </Typography>
)

/**
 * The MultiDropzone component that allows for file(s) to be uploaded via drag and drop or file selection.
 * @param {MultiDropzoneProps} props - Input props
 * @param {AcceptType} props.accept - The accepted file types
 * @param {[boolean=false]} props.isCondensed - Whether or not the component is condensed, defaults to false
 * @param {[number=0]} props.maxFiles - The maximum number of files allowed, defaults to 0 (unlimited)
 * @param {number} props.maxSize - The max size of a file allowed
 * @param {[boolean=false]} props.multiple - Whether or not multiple files are allowed, defaults to false
 * @param {(files: File[]) => void} props.onFileSelect - The callback for when a file is selected
 * @param {(id: string) => void} props.onRemoveFile - The callback for when a file is removed
 * @param {UploadedFile[]} props.uploadedFiles - The list of uploaded files
 * @param {boolean} props.uploading - Whether or not a file is uploading
 * @param {TextOverrides} props.textOverrides - The text overrides for the component
 * @returns {React.FC<MultiDropzoneProps>} - The MultiDropzone component
 */
const MultiDropZone: React.FC<MultiDropzoneProps> = ({
  accept,
  isCondensed = false,
  maxFiles = 0,
  maxSize,
  multiple = false,
  onFileSelect,
  onRemoveFile,
  textOverrides,
  uploadedFiles,
  uploading,
}) => {
  const [errors, setErrors] = useState<ErrorMessage[]>(() => {
    return uploadedFiles
      .filter((file) => file.error)
      .map((file) => ({
        id: file.id || uuidv4(),
        message: file.error || '',
      }))
  })
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

  /**
   * Removes an error from the list of errors.
   * @param {string} removeId - The id of the error to remove
   */
  const removeError = (removeId: string) =>
    setErrors(errors.filter(({ id }) => id !== removeId))

  /**
   * Handles the onDrop event from react-dropzone.
   * @param {File[]} acceptedFiles - List of accepted files
   * @param {FileRejection[]} filesRejected - List of rejected files and their errors
   */
  const onDrop = useCallback(
    (acceptedFiles: File[], filesRejected: FileRejection[]) => {
      // call the onFileSelect callback with the accepted files
      onFileSelect(acceptedFiles)
      // get errors from any rejected files
      const currentErrors = filesRejected.map(({ file, errors }) => ({
        file,
        id: uuidv4(),
        message: getErrorMessage(
          errors[0],
          { fileList, maxSize },
          textOverrides
        ),
      }))
      // add new errors to the list of errors
      setErrors((previousErrors) => [...previousErrors, ...currentErrors])
      // log any new errors to console
      if (currentErrors.length > 0) {
        console.error(currentErrors)
      }
    },
    [fileList, maxSize, textOverrides]
  )

  const handleRemoveFile = useCallback(
    (id: string) => {
      onRemoveFile(id)
      removeError(id)
    },
    [onRemoveFile]
  )

  // set the dropzone props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: formattedAccept,
    disabled: uploading,
    maxSize,
    multiple,
    onDrop,
  })

  return (
    <>
      <StyledBox
        className={`${isDragActive ? 'active' : ''} ${
          uploading ? 'disabled' : ''
        }`}
        {...getRootProps()}
      >
        <input aria-label="Drag and Drop File Selection" {...getInputProps()} />
        <UploadFileIcon
          color="primary"
          fontSize={isCondensed ? 'small' : 'large'}
        />
        <CallToAction
          isCondensed={isCondensed}
          textOverrides={textOverrides}
          uploading={uploading}
        />
        <Typography variant="body2" color="textSecondary">
          {textOverrides?.supportsText || placeholder}
        </Typography>
      </StyledBox>

      {uploadedFiles.length > 0 && (
        <Box mt={2}>
          {uploadedFiles.map((file) => (
            <UploadFileCell
              file={file}
              key={file.id}
              onRemoveFile={handleRemoveFile}
              uploading={uploading}
              uploadStatus={getUploadStatus(file.progress, file.error)}
            />
          ))}
        </Box>
      )}

      <Collapse in={isOverMaxFiles}>
        {isOverMaxFiles && (
          <Typography variant="body2" color="error">
            {textOverrides?.tooManyFilesError || DEFAULT_TOO_MANY_FILES_ERROR}
          </Typography>
        )}
      </Collapse>
    </>
  )
}

MultiDropZone.displayName = 'MultiDropZone'

export default MultiDropZone

export type {
  FileMimeTypes,
  FileType,
  UploadStatus,
  UploadedFile,
  AcceptType,
  TextOverrides,
  ErrorMessage,
  MultiDropzoneStyleProps,
  MultiDropzoneProps,
  UploadFileCellProps,
}
