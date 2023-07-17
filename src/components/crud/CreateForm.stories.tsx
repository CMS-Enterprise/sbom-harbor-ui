// CreateForm.stories.tsx
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextField from '@mui/material/TextField'
import CreateForm, { CreateFormProps } from './CreateForm'

export default {
  title: 'Components/CRUD/CreateForm',
  component: CreateForm,
} as Meta

const defaultArgs = {
  onClose: action('closed'),
  onSubmit: action('submitted'),
  open: true,
  title: 'Add a new vendor',
  submitLabel: 'Save',
  cancelLabel: 'Cancel',
}

const Template: Story<CreateFormProps> = (args) => <CreateForm {...args} />

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs,
  schema: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      component: TextField,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      component: TextField,
    },
  ],
}

export const WithPrefilledValues = Template.bind({})
WithPrefilledValues.args = {
  ...defaultArgs,
  schema: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      component: TextField,
      value: 'Vendor X',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      component: TextField,
      value: 'Address X',
    },
  ],
}

export const WithDialogProps = Template.bind({})
WithDialogProps.args = {
  ...defaultArgs,
  DialogProps: {
    open: true,
    fullWidth: false,
    maxWidth: 'sm',
  },
  schema: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      component: TextField,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      component: TextField,
    },
  ],
}
