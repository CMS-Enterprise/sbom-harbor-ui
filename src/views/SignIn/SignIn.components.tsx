/**
 * Styled Components for the SignIn view component.
 * @module sbom-harbor-ui/views/SignIn/SignIn.components
 */
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import MuiFormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel'

export const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(10),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10),
  },
}))

export const RightWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hidden',
})<BoxProps>(({ theme, hidden }) => ({
  width: '100%',
  marginLeft: 'auto',
  marginRight: theme.spacing(16),
  [theme.breakpoints.up('md')]: {
    maxWidth: `min(450px, 40vw)`,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 500,
  },
  ...(!hidden && { borderLeft: `1px solid ${theme.palette.divider}` }),
}))

export const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },
}))

export const CenteredFlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}))

export const VerticalCenteredFlexBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: 'auto',
    padding: theme.spacing(4),
  },
}))

export const FormControlLabel = styled(
  MuiFormControlLabel
)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: theme.typography.body2.fontSize,
  },
}))
