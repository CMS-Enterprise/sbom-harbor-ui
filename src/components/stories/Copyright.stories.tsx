import type { StoryObj, Meta } from '@storybook/react'
import Copyright from '@/components/Copyright'

type Story = StoryObj<typeof Copyright>

export default {
  title: 'Components/Copyright',
  component: Copyright,
  argTypes: {
    typograpyProps: { control: 'object' },
    sx: { control: 'object' },
  },
} as Meta<typeof Copyright>

export const Default: Story = {}

export const WithTypographyProps: Story = {
  render: () => <Copyright typograpyProps={{ color: 'text.primary' }} />,
  parameters: {
    title: 'With typography props',
  },
}
