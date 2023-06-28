import type { StoryObj, Meta } from '@storybook/react'
import { styled } from '@mui/material/styles'
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'
import { DEFAULT_ALERT_TIMEOUT } from '@/constants'
import { AlertProvider, useAlert, type AlertProps } from '@/hooks/useAlert'

const DEFAULT_MESSAGE = 'Hello World!'
const DEFAULT_SEVERITY: AlertColor = 'info'

const Button = styled(MuiButton)({
  position: 'absolute',
  bottom: 10,
  right: 10,
})

Button.defaultProps = { variant: 'contained', size: 'large' }

const AlertComponent = ({
  autoHide = true,
  message = DEFAULT_MESSAGE,
  severity = DEFAULT_SEVERITY,
  timeout = DEFAULT_ALERT_TIMEOUT,
}: AlertProps) => {
  const {
    clearAlert,
    setAlert,
    state: { isVisible },
  } = useAlert()

  return (
    <Box>
      {isVisible && (
        <MuiAlert severity={severity} onClose={clearAlert}>
          {message}
        </MuiAlert>
      )}
      {!isVisible && (
        <Button
          onClick={() =>
            setAlert({
              autoHide,
              message,
              severity,
              timeout,
            })
          }
        >
          Show alert
        </Button>
      )}
      {isVisible && <Button onClick={clearAlert}>Clear alert</Button>}
    </Box>
  )
}

type Story = StoryObj<AlertProps>

export default {
  title: 'Hooks/Alerts',
  component: AlertComponent,
  decorators: [
    (StoryNode, { args }) => (
      <AlertProvider {...args}>
        <StoryNode />
      </AlertProvider>
    ),
  ],
  argTypes: {
    autoHide: {
      control: 'boolean',
      defaultValue: true,
    },
    message: {
      control: 'text',
      defaultValue: DEFAULT_MESSAGE,
    },
    severity: {
      control: 'select',
      defaultValue: DEFAULT_SEVERITY,
      options: ['success', 'error', 'info'],
    },
    timeout: {
      control: 'number',
      defaultValue: DEFAULT_ALERT_TIMEOUT,
    },
  },
} as Meta<Story>

export const Playground: Story = {
  render: (_, { args }) => <AlertComponent {...args} />,
}

Playground.parameters = {
  title: 'Hooks/Alerts/Playground',
  defaultValues: {
    autoHide: true,
    message: DEFAULT_MESSAGE,
    severity: DEFAULT_SEVERITY,
    timeout: DEFAULT_ALERT_TIMEOUT,
  },
}
