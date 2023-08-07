/**
 * A component that renders a button to submit a form.
 * @module sbom-harbor-ui/components/forms/SubmitButton
 */
import Button, { ButtonProps } from '@mui/material/Button'
import { PropsWithChildren } from 'react'

type InputProps = {
  disabled?: boolean
} & ButtonProps

const SubmitButton = ({
  children = 'Submit',
  ...props
}: PropsWithChildren<InputProps>) => <Button {...props}>{children}</Button>

SubmitButton.defaultProps = {
  color: 'primary',
  label: 'Submit',
  size: 'large',
  type: 'submit',
  variant: 'contained',
}

export default SubmitButton
