/**
 * The layout for rendering the authenticated user's layout.
 * @module sbom-harbor-ui/layouts/AppLayout/AppLayout
 */
import { useCallback, useState, Suspense } from 'react'
import { Await, Navigate, Outlet, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import AlertMessage from '@/components/AlertMessage'
import AppBar from '@/components/AppBar'
import AppDrawer from '@/components/AppDrawer'
import AuthButton from '@/components/HeaderAuthButton'
import MenuListItems from '@/layouts/AppLayout/AppDrawerListItems'

/**
 * The main layout that renders the application layout for authenticated users.
 * If the user is not authenticated, they will be redirected to the login page.
 * @returns {JSX.Element} The main application layout component.
 */
const AppLayout = (): JSX.Element => {
  const jwtToken = useLoaderData() as string
  const [drawerOpen, setDrawerOpen] = useState(true)

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen)
  }, [drawerOpen])

  return (
    <Suspense
      fallback={
        <Navigate
          to="/login"
          state={{ from: window.location.pathname }}
          replace
        />
      }
    >
      <Await resolve={jwtToken}>
        <Box
          data-testid="app"
          sx={{
            display: 'flex',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <AlertMessage />

          {/* top nav bar */}
          <AppBar position="absolute" open={drawerOpen} color="secondary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(drawerOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="span"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <AuthButton />
            </Toolbar>
          </AppBar>

          {/* drawer */}
          <AppDrawer open={drawerOpen}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                filter: `brightness(80%)`,
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />

            <List component="nav">
              <MenuListItems />
            </List>
          </AppDrawer>
          {/* main content outlet for child routes */}
          <Container
            component="main"
            fixed
            maxWidth="lg"
            sx={{ mt: 8, pt: 4, overflow: 'scroll' }}
          >
            <Outlet />
          </Container>
        </Box>
      </Await>
    </Suspense>
  )
}

export default AppLayout
