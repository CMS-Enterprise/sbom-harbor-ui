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
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import DrawerProvider from './components/Drawer/DrawerProvider'
import { RouteIds } from '@/types'

/**
 * The main component that renders the application layout.
 * @returns {JSX.Element} The main application layout component.
 */
const AppLayout = (): JSX.Element => {
  const jwtTokenPromise = useRouteLoaderData(RouteIds.AUTHED_APP)

  return (
    <Suspense fallback={<LinearIndeterminate />}>
      <Await
        resolve={jwtTokenPromise}
        errorElement={<div>Could not load teams 😬</div>}
        // eslint-disable-next-line react/no-children-prop
        children={(jwtToken) => (
          <AuthContext.Provider value={{ jwtToken }}>
            <DrawerProvider>
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
                <TopNavBar />
                <AppDrawer />
                <Container
                  component="main"
                  maxWidth={false}
                  sx={{ mt: 8, mr: 0, ml: 0, pt: 4, overflow: 'scroll' }}
                >
                  <Outlet />
                </Container>
              </Box>
            </DrawerProvider>
          </AuthContext.Provider>
        )}
      />
    </Suspense>
  )
}

export default AppLayout
