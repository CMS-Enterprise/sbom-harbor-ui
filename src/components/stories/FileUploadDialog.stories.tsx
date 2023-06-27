import { v4 as uuidv4 } from 'uuid'
import { Meta, StoryObj } from '@storybook/react'
import { useArgs, useCallback } from '@storybook/client-api'
import { SyntheticEvent } from 'react'
import { Breakpoint, Button } from '@mui/material'
import { UploadedFile } from '@/components/MultiDropzone/MultiDropzone'
import FileUploadDialog, {
  FileUploadDialogProps,
} from '@/components/FileUploadDialog'
import { getErrorMessage } from '../MultiDropzone/utils'

type Story = StoryObj<FileUploadDialogProps>

const defaultValues = {
  open: false,
  fullScreen: false,
  fullWidth: true,
  maxWidth: 'sm' as Breakpoint,
  scroll: 'body' as 'body' | 'paper',
}

export default {
  title: 'Upload-UI/FileUploadDialog',
  component: FileUploadDialog,
  argTypes: {
    open: {
      control: 'boolean',
      defaultValue: false,
      options: [true, false],
    },
    onClose: {
      description: 'Callback when the user close the modal',
      action: true,
      table: {
        category: 'Callbacks',
      },
      defaultValue: () => ({}),
      control: false,
    },
    uploading: {
      control: 'boolean',
      defaultValue: false,
      options: [true, false],
    },
    onUploadingChange: {
      description: 'Callback when the user upload a file',
      action: true,
      table: {
        category: 'Callbacks',
      },
      defaultValue: () => ({}),
      control: false,
    },
    uploadedFiles: {
      description: 'List of files that have been uploaded',
      control: 'object',
      defaultValue: [],
    },
    onUploadedFilesChange: {
      description: 'Callback when the user upload a file',
      action: true,
      table: {
        category: 'Callbacks',
      },
      defaultValue: () => ({}),
      control: false,
    },
    disableEscapeKeyDown: {
      control: false,
      defaultValue: false,
      options: [true, false],
    },
    fullScreen: {
      control: 'boolean',
      defaultValue: false,
      options: [true, false],
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: true,
      options: [true, false],
    },
    maxWidth: {
      control: 'radio',
      defaultValue: 'sm',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    scroll: {
      control: 'radio',
      defaultValue: 'body',
      options: ['body', 'paper'],
    },
  },
} as Meta<FileUploadDialogProps>

export const Playground = () => {
  const [
    {
      open = false,
      uploading = false,
      uploadedFiles = [],
      onClose = () => ({}),
      ...dialogProps
    },
    updateArgs,
  ] = useArgs()

  const toggle = useCallback(
    (event: SyntheticEvent<Element, Event> | unknown, reason?: string) => {
      if (uploading) return
      if (open) onClose(event, reason)
      updateArgs({ open: !open })
    },
    [onClose, open, updateArgs, uploading]
  )

  const onUploadedFilesChange = useCallback(
    (newFiles: UploadedFile[]) => {
      updateArgs({ uploadedFiles: newFiles })
    },
    [updateArgs]
  )

  const onUploadingChange = useCallback(
    (newUploading: boolean) => {
      updateArgs({ uploading: newUploading })
    },
    [updateArgs]
  )

  return (
    <>
      <div>
        <Button onClick={toggle}>Open Dialog</Button>
      </div>
      <FileUploadDialog
        {...dialogProps}
        disableEscapeKeyDown={false}
        open={open}
        onClose={toggle}
        uploadedFiles={uploadedFiles}
        onUploadedFilesChange={onUploadedFilesChange}
        uploading={uploading}
        onUploadingChange={onUploadingChange}
      />
    </>
  )
}
Playground.args = defaultValues

export const WithoutFiles: Story = {
  args: defaultValues,
}

export const WithFileToUpload: Story = {
  args: {
    ...defaultValues,
    open: true,
    uploadedFiles: [{ id: uuidv4(), name: 'sbom.json', progress: 0 }],
  },
}

export const WithFileUploading: Story = {
  args: {
    ...defaultValues,
    open: true,
    uploading: true,
    uploadedFiles: [{ id: uuidv4(), name: 'sbom.json', progress: 50 }],
  },
}

export const WithFileSizeError: Story = {
  args: {
    ...defaultValues,
    open: true,
    uploading: false,
    uploadedFiles: [
      {
        id: uuidv4(),
        name: 'sbom.json',
        progress: 50,
        error: getErrorMessage(
          { code: 'file-too-large', message: 'File too large' },
          { fileList: 'JSON', maxSize: 1000000 }
        ),
      },
    ],
  },
}
