/**
 * The layout for rendering the authenticated user's layout.
 * @module sbom-harbor-ui/layouts/AppLayout/AppLayout
 */
import { Suspense } from 'react'
import { Await, Outlet, useRouteLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { AuthContext } from '@/hooks/useAuth'
import AlertMessage from '@/components/AlertMessage'
import AppDrawer from './components/Drawer/Drawer'
import TopNavBar from './components/TopNavBar'
import DrawerProvider from './components/Drawer/DrawerProvider'
import NavigateToLogin from '@/components/react-router/NavigateToLogin'
import { RouteIds } from '@/types'

/**
 * The main component that renders the application layout.
 * @returns {JSX.Element} The main application layout component.
 */
const AppLayout = (): JSX.Element => {
  const jwtTokenPromise = useRouteLoaderData(RouteIds.AUTHED_APP)

  return (
    <Suspense fallback={<NavigateToLogin />}>
      <Await
        resolve={jwtTokenPromise}
        errorElement={<div>Could not load teams 😬</div>}
        // eslint-disable-next-line react/no-children-prop
        children={(jwtToken) => (
          <DrawerProvider>
            <AuthContext.Provider value={{ jwtToken }}>
              <Box
                data-testid="app"
                sx={{
                  display: 'flex',
                  width: '100%',
                  marginRight: 0,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  height: '100vh',
                  overflow: 'clip',
                }}
              >
                <AlertMessage />

                {/* top nav bar */}
                <TopNavBar />

                {/* drawer */}
                <AppDrawer />
                {/* main content outlet for child routes */}
                <Container
                  component="main"
                  maxWidth={false}
                  sx={{ mt: 8, mr: 0, ml: 0, pt: 4, overflow: 'scroll' }}
                >
                  {/* @ts-ignore */}
                  <Outlet />
                </Container>
              </Box>
            </AuthContext.Provider>
          </DrawerProvider>
        )}
      />
    </Suspense>
  )
}

export default AppLayout
