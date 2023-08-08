/**
 * The view at the /login route that renders the sign in form.
 * @module sbom-harbor-ui/views/SignIn/SignIn
 */
import { memo, ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputFormControl from '@/components/forms/InputFormControl'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import PasswordVisibilityToggle from '@/components/PasswordVisibilityToggle'
import SubmitButton from '@/components/forms/SubmitButton'
import BlankLayout from '@/layouts/BlankLayout'
import { FormData, useSignIn } from '@/views/SignIn/useSignIn'
import {
  BoxWrapper,
  CenteredFlexBox,
  LoginIllustrationWrapper,
  RightWrapper,
  SignInGraphic,
  VerticalCenteredFlexBox,
} from '@/views/SignIn/SignIn.components'

/**
 * Component that renders the page containing the sign in form.
 * @returns {JSX.Element} component that renders the the sign in form.
 */
const SignIn = () => {
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    loading,
    handleClickFederatedSignIn,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useSignIn()

  const ShowPasswordButton = memo(
    Object.assign(
      () => (
        <PasswordVisibilityToggle
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      ),
      { displayName: 'ShowPasswordButton' }
    ) as React.FC
  )

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

            {/* Start of Form */}
            <Stack
              component="form"
              id="login-form"
              role="form"
              autoComplete="off"
              onSubmit={handleSubmit}
              spacing={3}
            >
              <InputFormControl<FormData>
                control={control}
                name="email"
                InputProps={{
                  placeholder: 'admin@cms.gov',
                }}
              />
              <InputFormControl<FormData>
                control={control}
                name="password"
                InputProps={{
                  autoComplete: 'current-password',
                  endAdornment: <ShowPasswordButton />,
                  type: showPassword ? 'text' : 'password',
                }}
              />
              <SubmitButton
                disabled={loading}
                fullWidth
                name="login"
                role="button"
              >
                Sign In
              </SubmitButton>
              {loading && (
                <Backdrop open={loading} sx={{ borderRadius: 2 }}>
                  <CircularProgress data-testid="linear-indeterminate" />
                </Backdrop>
              )}
              <Typography align="center" variant="subtitle2">
                or...
              </Typography>
              <Button
                fullWidth
                onClick={handleClickFederatedSignIn}
                role="button"
                variant="outlined"
              >
                Login with IDP
              </Button>
            </Stack>
            {/* End of Form */}
          </VerticalCenteredFlexBox>
        </CenteredFlexBox>
      </RightWrapper>
    </BoxWrapper>
  )
}

SignIn.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SignIn
