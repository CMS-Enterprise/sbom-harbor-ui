/**
 * The view at the /login route that renders the sign in form.
 * @module sbom-harbor-ui/views/SignIn/SignIn
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MuiLink from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import PasswordVisibilityToggle from '@/components/PasswordVisibilityToggle'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import BlankLayout from '@/layouts/BlankLayout'
import { useSignIn } from '@/views/SignIn/useSignIn'
import SignInGraphic from '@/views/SignIn/SignInGraphic'
import {
  BoxWrapper,
  CenteredFlexBox,
  FormControlLabel,
  LoginIllustrationWrapper,
  RightWrapper,
  VerticalCenteredFlexBox,
} from '@/views/SignIn/SignIn.components'

/**
 * Component that renders the page containing the sign in form.
 * @returns {JSX.Element} component that renders the the sign in form.
 */
const LoginPage = () => {
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    errors,
    loading,
    showPassword,
    setShowPassword,
    handleClickFederatedSignIn,
    onSubmit,
    handleSubmitHookForm,
  } = useSignIn()

  return (
    <BoxWrapper id="box-wrapper">
      {!hidden && (
        <CenteredFlexBox sx={{ flex: 1, position: 'relative' }}>
          {/* TODO: add graphics for the login page */}
          <LoginIllustrationWrapper />
        </CenteredFlexBox>
      )}
      <RightWrapper hidden={hidden}>
        <CenteredFlexBox
          sx={{
            backgroundColor: 'background.paper',
            flexFlow: 'column',
            height: '100%',
            p: 7,
          }}
        >
          {!hidden && (
            <CenteredFlexBox
              sx={{
                position: 'absolute',
                left: 40,
                top: 30,
              }}
            >
              <SignInGraphic />
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.5rem !important',
                  lineHeight: 1,
                  ml: 2,
                }}
              >
                SBOM Harbor
              </Typography>
            </CenteredFlexBox>
          )}
          <VerticalCenteredFlexBox>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5">{`Welcome to the Harbor! 👋🏻`}</Typography>
              <Typography variant="body2">
                Please sign-in to your account.
              </Typography>
            </Box>
            <form
              onSubmit={handleSubmitHookForm(onSubmit)}
              autoComplete="off"
              noValidate
              id="login-form"
              role="form"
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel
                  id="email-label"
                  htmlFor="email-input"
                  error={Boolean(errors.email)}
                >
                  Email
                </InputLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      label="Email"
                      id="email-input"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      autoFocus
                      autoComplete="email"
                      placeholder="admin@cms.gov"
                      aria-labelledby="email-label"
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                    />
                  )}
                />
                <FormHelperText id="email-error" error={Boolean(errors?.email)}>
                  {errors?.email?.message || ' '}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  id="password-label"
                  htmlFor="password-input"
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      label="Password"
                      id="password-input"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      endAdornment={
                        <PasswordVisibilityToggle
                          showPassword={showPassword}
                          setShowPassword={setShowPassword}
                        />
                      }
                      aria-describedby={
                        errors.password ? 'password-error' : undefined
                      }
                    />
                  )}
                />
                <FormHelperText
                  id="password-error"
                  error={Boolean(errors?.password)}
                >
                  {errors?.password?.message || ' '}
                </FormHelperText>
              </FormControl>
              <CenteredFlexBox
                sx={{
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel label="Remember Me" control={<Checkbox />} />
                <MuiLink
                  component={Link}
                  to="/login"
                  variant="body2"
                  sx={{ color: 'primary.main' }}
                >
                  Forgot Password?
                </MuiLink>
              </CenteredFlexBox>
              <Stack direction="column" spacing={6} sx={{ mt: 1 }}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  sx={{ mb: 5 }}
                  onClick={handleClickFederatedSignIn}
                >
                  Login with IDP
                </Button>
              </Stack>
            </form>
            {loading && <LinearIndeterminate />}
          </VerticalCenteredFlexBox>
        </CenteredFlexBox>
      </RightWrapper>
    </BoxWrapper>
  )
}

LoginPage.getLayout = (page: React.ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)

export default LoginPage
