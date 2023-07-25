/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/DrawerContext
 */
import { createContext } from 'react'
import IDrawerContext from './IDrawerContext'

const DrawerContext = createContext<IDrawerContext>({
  open: true,
  toggleDrawer: () => {},
})

export default DrawerContext
