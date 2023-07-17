/**
 * The layout for rendering the authenticated user's layout.
 * @module sbom-harbor-ui/layouts/AppLayout/AppLayout
 */
import { useState } from 'react'
import { Await, Outlet, useAsyncValue, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import { AuthContext } from '@/hooks/useAuth'
import AlertMessage from '@/components/AlertMessage'
import AppBar from '@/components/AppBar'
import AppDrawer from '@/components/AppDrawer'
import AuthButton from '@/components/HeaderAuthButton'
import MenuListItems from '@/layouts/AppLayout/AppDrawerListItems'

const AppContent = (): JSX.Element => {
  const jwtToken = useAsyncValue() as string
  const [drawerOpen, setDrawerOpen] = useState(true)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  return (
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
        <AppBar
          position="absolute"
          open={drawerOpen}
          color="transparent"
          elevation={0}
        >
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
            <Box sx={{ flexGrow: 1 }} />
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
            {drawerOpen && (
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />

          <List component="nav">
            <MenuListItems />
          </List>
        </AppDrawer>
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
  )
}

/**
 * The main component that renders the application layout.
 * @returns {JSX.Element} The main application layout component.
 */
const AppLayout = (): JSX.Element => {
  const jwtToken = useLoaderData() as string

  return (
    <Await resolve={jwtToken}>
      <AppContent />
    </Await>
  )
}

export default AppLayout
