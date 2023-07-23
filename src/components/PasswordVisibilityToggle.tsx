/**
 * @module sbom-harbor-ui/components/PasswordVisibilityToggle.tsx
 */
import React from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityOutline from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface PasswordVisibilityToggleProps {
  showPassword: boolean
  setShowPassword: (value: boolean) => void
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  showPassword,
  setShowPassword,
}) => {
  const handleClick = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword, setShowPassword]
  )

  return (
    <InputAdornment position="end">
      <IconButton
        edge="end"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleClick}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <VisibilityOutline /> : <VisibilityOffIcon />}
      </IconButton>
    </InputAdornment>
  )
}

export default PasswordVisibilityToggle
