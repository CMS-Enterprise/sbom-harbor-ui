/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/Drawer
 */
import React from 'react'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import MuiDrawer from '@mui/material/Drawer'
import DrawerExpandButton from './DrawerExpandButton'
import DrawerMenu from './DrawerMenu'
import useDrawer from './useDrawer'

const Drawer: React.FC = () => {
  const { open } = useDrawer()

  return (
    <MuiDrawer open={open}>
      <Toolbar>
        <DrawerExpandButton />
      </Toolbar>
      <Divider />
      <DrawerMenu />
    </MuiDrawer>
  )
}

export default Drawer
