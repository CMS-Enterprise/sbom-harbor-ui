import React, { SyntheticEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MultiDropZone, { UploadedFile } from '@/components/MultiDropzone'

export interface FileUploadDialogProps {
  open: boolean
  onClose: (
    event: SyntheticEvent<Element, Event> | null,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void
  dialogProps?: DialogProps
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onClose,
  ...dialogProps
}) => {
  const { handleSubmit, reset } = useForm()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onSubmit = useCallback((data: any) => {
    setUploading(true)
    // TODO: upload files
    setTimeout(() => {
      setUploading(false)
      handleClose(null, 'backdropClick')
    }, 2000)
  }, [])

  const handleClose = useCallback(
    (event: any, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason === 'backdropClick') return
      reset()
      setUploadedFiles([])
      setUploading(false)
      onClose(event, reason)
    },
    [onClose, reset]
  )

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles((previousFiles) =>
      previousFiles.filter((f) => f.id !== id)
    )
  }, [])

  const handleFileSelect = useCallback((newFiles: File[]) => {
    const filesToUpload = newFiles.map((f) => {
      const fileWithProgress = {
        name: f.name,
        progress: 0,
        id: uuidv4(),
      } as UploadedFile
      fileWithProgress.progress = 0
      return fileWithProgress
    })
    setUploadedFiles([...filesToUpload])
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onDragOver={(event) => event.preventDefault()}
      role="dialog"
      maxWidth="sm"
      fullWidth
      {...dialogProps}
    >
      <DialogTitle variant="h5">Upload SBOM JSON files</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultiDropZone
            uploading={uploading}
            multiple={false}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            uploadedFiles={uploadedFiles}
          />
          <DialogActions>
            <Button onClick={onClose} size="large">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadDialog
