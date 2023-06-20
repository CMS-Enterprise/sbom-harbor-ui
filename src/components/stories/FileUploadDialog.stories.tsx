import { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import FileUploadDialog, {
  FileUploadDialogProps,
} from '@/components/FileUploadDialog'

type Story = StoryObj<FileUploadDialogProps>

export default {
  title: 'Components/FileUploadDialog',
  component: FileUploadDialog,
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'close' },
  },
} as Meta<FileUploadDialogProps>

const files = [
  { name: 'example1.json', progress: 20 },
  { name: 'example2.json', progress: 100, success: true },
  {
    name: 'example3.json',
    progress: 100,
    success: false,
    error: 'Upload failed',
  },
]

export const Playground = ({ ...args }) => {
  const [{ open }, updateArgs] = useArgs()
  const handleClose = () => updateArgs({ open: !open })

  return (
    <div>
      <FileUploadDialog
        open={open}
        onClose={handleClose}
        {...args}
        // files={files}
      />
    </div>
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
