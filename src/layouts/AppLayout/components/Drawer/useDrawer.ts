/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/useDrawer
 */
import { useContext } from 'react'
import DrawerContext from './DrawerContext'

const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}

export default useDrawer
