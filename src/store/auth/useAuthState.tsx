/**
 * @module sbom-harbor-ui/store/auth/hooks
 */
import { useContext } from 'react'
import AuthStateContext from '@/store/auth/AuthStateContext'

const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

export default useAuthState
