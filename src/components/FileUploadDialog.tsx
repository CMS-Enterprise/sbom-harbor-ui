import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

type FileWithProgress = File & {
  progress?: number
  success?: boolean
  error?: string
}

export interface FileUploadDialogProps {
  open: boolean
  onClose: () => void
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onClose,
}) => {
  const { register, handleSubmit, reset } = useForm()
  const [files, setFiles] = useState<FileWithProgress[]>([])

  const onSubmit = (data: any) => {
    const uploadedFiles: FileWithProgress[] = Array.from(data.files)
    setFiles(uploadedFiles)

    // TODO: Implement the actual file upload process here. This simulates progress update.
    uploadedFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles]
          if (
            newFiles[index].progress === undefined ||
            newFiles[index].progress === 100
          ) {
            clearInterval(interval)
            newFiles[index].progress = 100
            newFiles[index].success = true // Set to false if the upload failed.
          } else {
            newFiles[index].progress = (newFiles[index].progress || 0) + 10
          }
          return newFiles
        })
      }, 500)
    })
    reset()
  }

  const handleFileDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const droppedFiles: FileWithProgress[] = Array.from(
      event.dataTransfer.files
    )
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleFileDrop}
      role="dialog"
    >
      <DialogTitle>Upload SBOM JSON files</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" multiple accept=".json" {...register('files')} />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </form>
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={file.name}
                secondary={
                  file.error ||
                  (file.progress !== undefined && `${file.progress}%`)
                }
              />
              {file.success === undefined && (
                <LinearProgress
                  variant="determinate"
                  value={file.progress || 0}
                />
              )}
              {file.success !== undefined && (
                <ListItemIcon>
                  {file.success ? (
                    <CheckIcon color="primary" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default FileUploadDialog
