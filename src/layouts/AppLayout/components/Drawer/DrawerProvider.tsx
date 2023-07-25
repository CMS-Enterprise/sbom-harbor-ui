/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/DrawerProvider
 */
import { useCallback, useState } from 'react'
import DrawerContext from './DrawerContext'
import IDrawerProvider from './IDrawerProvider'

const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const [open, setOpen] = useState(true)

  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export default DrawerProvider
