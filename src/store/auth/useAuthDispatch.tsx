/**
 * @module sbom-harbor-ui/store/auth/useAuthDispatch
 */
import { useContext } from 'react'
import AuthDispatchContext from '@/store/auth/AuthDispatchContext'

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}

export default useAuthDispatch
