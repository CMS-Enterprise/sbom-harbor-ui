// Avatar.stories.tsx
import { StoryObj } from '@storybook/react'
import Avatar from '@/components/mui/Avatar'

type Story = StoryObj<typeof Avatar>

// Default export with general component information
export default {
  title: 'Components/mui/Avatar',
  component: Avatar,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      control: { type: 'select' },
    },
    skin: {
      options: ['filled', 'light', 'light-static'],
      control: { type: 'select' },
    },
  },
}

export const Default: Story = {
  args: {
    color: 'primary',
    skin: 'filled',
  },
}

export const PrimaryLightStatic: Story = {
  render: () => <Avatar color="primary" skin="light-static" />,
  args: {
    color: 'primary',
    skin: 'light-static',
  },
}

export const SecondaryLight: Story = {
  render: () => <Avatar color="secondary" skin="light" />,
  args: {
    color: 'secondary',
    skin: 'light',
  },
}
