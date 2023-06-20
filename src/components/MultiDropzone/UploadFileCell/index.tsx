import React, { ReactNode } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import FileIcon from '@mui/icons-material/AttachFile'
import TaskIcon from '@mui/icons-material/Task'
import ErrorIcon from '@mui/icons-material/Error'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'

import { UploadStatus, UploadedFile } from '../types'

interface UploadFileCellProps {
  uploadStatus: UploadStatus
  file: UploadedFile
  onRemoveFile: (id: string) => void
  uploading: boolean
}

const UploadFileCell: React.FC<UploadFileCellProps> = ({
  uploadStatus,
  file,
  onRemoveFile,
  uploading,
}) => {
  const {
    id,
    error,
    name,
    progress,
    previewUrl,
    showLoadingSpinner = false,
    showProgressBar = true,
  } = file

  const isComplete = uploadStatus === 'COMPLETE'
  const isUploading = uploadStatus === 'UPLOADING'
  const hasError = uploadStatus === 'ERROR'

  const mapFileIcon: { [k in UploadStatus]: ReactNode } = {
    UPLOADING: <FileIcon />,
    COMPLETE: <TaskIcon />,
    ERROR: <ErrorIcon />,
  }

  const mapDisplayText: { [s in UploadStatus]: string } = {
    UPLOADING: 'Uploading...',
    COMPLETE: name,
    ERROR: error ?? 'Something went wrong. Try uploading again.',
  }

  return (
    <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <SvgIcon>{mapFileIcon[uploadStatus]}</SvgIcon>
        <Box sx={{ flexGrow: 1, ml: 1 }}>
          <Typography variant="body1">
            {mapDisplayText[uploadStatus]}
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
            <IconButton disabled={uploading} onClick={() => onRemoveFile(id)}>
              {hasError ? <ErrorIcon /> : <DeleteIcon />}
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default UploadFileCell
