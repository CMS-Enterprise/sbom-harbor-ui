/**
 * Component that renders a single file for the MultiDropzone component.
 * @module sbom-harbor-ui/components/MultiDropzone/UploadFileCell
 */
import React, { ReactNode, SyntheticEvent, useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import ErrorIcon from '@mui/icons-material/Error'
import TaskIcon from '@mui/icons-material/Task'
import {
  DEFAULT_CELL_ERROR_TEXT,
  DEFAULT_CELL_UPLOADED_TEXT,
  DEFAULT_CELL_UPLOADING_TEXT,
} from '@/components/MultiDropzone/constants'
import {
  UploadFileCellProps,
  UploadStatus,
} from '@/components/MultiDropzone/types'

/**
 * The UploadFileCell component.
 * @param {UploadFileCellProps} props - The input props for the component
 * @param {UploadedFile} props.file - The file to render
 * @param {boolean} props.uploading - Whether or not the file is uploading
 * @param {UploadStatus} props.uploadStatus - The upload status of the file
 * @param {Function} props.onRemoveFile - The callback for when the file is removed
 * @returns {React.FC} - The UploadFileCell component
 */
const UploadFileCell: React.FC<UploadFileCellProps> = ({
  file,
  uploading,
  uploadStatus,
  onRemoveFile,
}) => {
  const {
    error,
    id,
    name,
    progress,
    showLoadingSpinner = false,
    showProgressBar = true,
  } = file

  const {
    hasError,
    isComplete,
    isUploading,
    fileIcon,
  }: {
    hasError: boolean
    isComplete: boolean
    isUploading: boolean
    fileIcon: ReactNode
  } = useMemo(
    () => ({
      hasError: uploadStatus === UploadStatus.ERROR,
      isComplete: uploadStatus === UploadStatus.COMPLETE,
      isUploading: uploadStatus === UploadStatus.UPLOADING && uploading,
      fileIcon: {
        UPLOADING: null,
        COMPLETE: <TaskIcon />,
        ERROR: <ErrorIcon />,
      }[uploadStatus],
    }),
    [uploadStatus, uploading]
  )

  const mapDisplayText: { [s in UploadStatus]: string } = useMemo(
    () => ({
      UPLOADING: DEFAULT_CELL_UPLOADING_TEXT,
      COMPLETE: DEFAULT_CELL_UPLOADED_TEXT,
      ERROR: error ?? DEFAULT_CELL_ERROR_TEXT,
    }),
    [error]
  )

  const handleRemoveFile = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation()
      onRemoveFile(id)
    },
    [id, onRemoveFile]
  )

  return (
    <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, w: 100 }}>
        <Box sx={{ flexGrow: 1, ml: 1 }}>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {!hasError &&
              uploading &&
              progress < 100 &&
              mapDisplayText[uploadStatus]}
            {hasError && mapDisplayText[uploadStatus]}
          </Typography>
          {isUploading && showProgressBar && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                data-testid="linear-progress"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ ml: 1 }}>
        {isUploading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 48,
              height: 48,
            }}
          >
            {showLoadingSpinner && (
              <CircularProgress data-testid="circular-progress" />
            )}
          </Box>
        ) : (
          <Box>
            {isComplete && <CheckIcon />}
            {isUploading && fileIcon}
            {!isUploading && (
              <IconButton
                role="button"
                aria-label="file-action"
                disabled={uploading}
                onClick={handleRemoveFile}
                color={hasError ? 'error' : 'primary'}
              >
                {hasError ? (
                  <ErrorIcon color="error" />
                ) : !isComplete ? (
                  <DeleteIcon />
                ) : null}
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

UploadFileCell.displayName = 'UploadFileCell'

export default UploadFileCell
