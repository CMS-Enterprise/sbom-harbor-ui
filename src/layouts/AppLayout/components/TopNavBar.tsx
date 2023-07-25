/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/TopNavBar
 */
import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import AuthButton from '@/components/HeaderAuthButton'
import AppBar from '@/components/AppBar'
import useDrawer from './Drawer/useDrawer'

const TopNavBar: React.FC = () => {
  const { open } = useDrawer()

  return (
    <AppBar position="absolute" open={open} color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <AuthButton />
      </Toolbar>
    </AppBar>
  )
}

export default TopNavBar
