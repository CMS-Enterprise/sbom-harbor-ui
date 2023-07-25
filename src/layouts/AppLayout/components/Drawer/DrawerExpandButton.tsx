/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/DrawerExpandButton
 */
import React from 'react'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import useDrawer from './useDrawer'

const DrawerExpandButton: React.FC = () => {
  const { open, toggleDrawer } = useDrawer()

  return (
    <IconButton
      onClick={toggleDrawer}
      aria-label={open ? 'close drawer' : 'open drawer'}
      color="inherit"
      role="button"
    >
      {!open && <ChevronLeftIcon />}
      {open && <MenuIcon />}
    </IconButton>
  )
}

export default DrawerExpandButton
