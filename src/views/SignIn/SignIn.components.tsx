/**
 * Styled Components for the SignIn view component.
 * @module sbom-harbor-ui/views/SignIn/SignIn.components
 */
import { styled, useTheme } from '@mui/material/styles'
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

export const SignInGraphic: React.FC = () => {
  const {
    palette: {
      primary: { main: fill },
    },
  } = useTheme()

  return (
    <svg
      width={47}
      fill="none"
      height={26}
      viewBox="0 0 268 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fill={fill}
        transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
      />
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fillOpacity="0.4"
        fill="url(#paint0_linear_7821_79167)"
        transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
      />
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fill={fill}
        transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
      />
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fill={fill}
        transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
      />
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fillOpacity="0.4"
        fill="url(#paint1_linear_7821_79167)"
        transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
      />
      <rect
        rx="25.1443"
        width="50.2886"
        height="143.953"
        fill={fill}
        transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
      />
      <defs>
        <linearGradient
          y1="0"
          x1="25.1443"
          x2="25.1443"
          y2="143.953"
          id="paint0_linear_7821_79167"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          y1="0"
          x1="25.1443"
          x2="25.1443"
          y2="143.953"
          id="paint1_linear_7821_79167"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
