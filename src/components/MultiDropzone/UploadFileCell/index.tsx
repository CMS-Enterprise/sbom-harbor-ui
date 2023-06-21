import React, { ReactNode, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import ErrorIcon from '@mui/icons-material/Error'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import SvgIcon from '@mui/material/SvgIcon'
import TaskIcon from '@mui/icons-material/Task'
import Typography from '@mui/material/Typography'

import { UploadStatus, UploadedFile } from '../types'

interface UploadFileCellProps {
  file: UploadedFile
  onRemoveFile: (id: string) => void
  uploading: boolean
  uploadStatus: UploadStatus
}

const UploadFileCell: React.FC<UploadFileCellProps> = ({
  file,
  onRemoveFile,
  uploading,
  uploadStatus,
}) => {
  const {
    error,
    id,
    name,
    progress,
    showLoadingSpinner = false,
    showProgressBar = true,
  } = file

  const isComplete = uploadStatus === 'COMPLETE'
  const isUploading = uploadStatus === 'UPLOADING' && uploading
  const hasError = uploadStatus === 'ERROR'

  const mapFileIcon: { [k in UploadStatus]: ReactNode } = {
    UPLOADING: null,
    COMPLETE: <TaskIcon />,
    ERROR: <ErrorIcon />,
  }

  const mapDisplayText: { [s in UploadStatus]: string } = {
    UPLOADING: 'Uploading...',
    COMPLETE: 'Uploaded',
    ERROR: error ?? 'Something went wrong. Try uploading again.',
  }

  return (
    <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, w: 100 }}>
        <Box sx={{ flexGrow: 1, ml: 1 }}>
          <Typography variant="body1">
            {uploading && mapDisplayText[uploadStatus]}
            {name}
          </Typography>
          {isUploading && showProgressBar && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress variant="determinate" value={progress} />
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
            {showLoadingSpinner && <CircularProgress />}
          </Box>
        ) : (
          <Box>
            {isComplete && <CheckIcon />}
            {isUploading && <SvgIcon>{mapFileIcon[uploadStatus]}</SvgIcon>}
            {!isUploading && (
              <IconButton
                disabled={uploading}
                onClick={(event: SyntheticEvent<Element, MouseEvent>) => {
                  event?.preventDefault()
                  onRemoveFile(id)
                }}
              >
                {hasError ? <ErrorIcon /> : <DeleteIcon />}
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
