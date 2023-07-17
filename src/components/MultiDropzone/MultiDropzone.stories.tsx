import type { StoryObj, Meta } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import MultiDropzone from '@/components/MultiDropzone/MultiDropzone'

type Story = StoryObj<typeof MultiDropzone>

export default {
  title: 'Upload-UI/Components/MultiDropzone',
  component: MultiDropzone,
  argTypes: {
    uploadedFiles: {
      control: 'object',
    },
    onFileSelect: {
      control: 'function',
    },
    uploading: {
      control: 'boolean',
    },
    onRemoveFile: {
      control: 'function',
    },
  },
  args: {
    uploadedFiles: [],
    uploading: false,
    onFileSelect: () => null,
    onRemoveFile: () => null,
  },
  render: (args) => <MultiDropzone {...args} />,
} as Meta<typeof MultiDropzone>

export const Default: Story = {
  args: {
    uploadedFiles: [],
    uploading: false,
  },
}

export const Playground = ({ ...args }) => {
  const [{ uploadedFiles }, updateArgs] = useArgs()

  const onFileSelect = (files: File[]) => {
    updateArgs({
      uploadedFiles: files.map((file) => ({
        id: file.name,
        name: file.name,
        progress: 0,
        previewUrl: URL.createObjectURL(file),
      })),
    })
  }

  const onRemoveFile = (name: string) => {
    updateArgs({
      uploadedFiles: uploadedFiles.filter((file: File) => file.name !== name),
    })
  }

  return (
    <MultiDropzone
      {...args}
      uploading={false}
      uploadedFiles={uploadedFiles}
      onRemoveFile={onRemoveFile}
      onFileSelect={onFileSelect}
      accept={{
        json: ['.json'],
      }}
    />
  )
}
