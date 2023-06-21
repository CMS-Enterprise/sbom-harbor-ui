import { Meta, StoryObj } from '@storybook/react'
import { useArgs, useCallback } from '@storybook/client-api'
import { Button } from '@mui/material'
import FileUploadDialog, {
  FileUploadDialogProps,
} from '@/components/FileUploadDialog'
import { SyntheticEvent } from 'react'

type Story = StoryObj<FileUploadDialogProps>

export default {
  title: 'Components/FileUploadDialog',
  component: FileUploadDialog,
  argTypes: {
    open: { control: 'boolean' },
    onClose: {
      description: 'Callback when the user close the modal',
      action: true,
      table: {
        category: 'Callbacks',
      },
    },
  },
} as Meta<FileUploadDialogProps>

export const Playground = () => {
  const [{ open = false, onClose }, updateArgs] = useArgs()

  const toggle = useCallback(
    (event: SyntheticEvent<Element, Event> | null, reason?: string) => {
      if (open) {
        onClose(event, reason)
      }
      updateArgs({ open: !open })
    },
    [open, onClose, updateArgs]
  )

  return (
    <>
      <div>
        <Button onClick={toggle}>Open Dialog</Button>
      </div>
      <FileUploadDialog
        open={open}
        onClose={toggle}
        dialogProps={{
          open,
          maxWidth: 'md',
        }}
      />
    </>
  )
}

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {
      console.log('close')
    },
  },
}

export const WithFiles: Story = {
  parameters: {
    title: 'With Files',
  },
  args: {
    open: true,
    onClose: () => {
      console.log('close')
    },
  },
}
