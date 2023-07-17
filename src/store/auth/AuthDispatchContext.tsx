/**
 * @module sbom-harbor-ui/store/auth/AuthDispatchContext
 */
import { createContext } from 'react'
import { AuthActionParams } from '@/store/auth/types'

const AuthDispatchContext = createContext(
  ((value: AuthActionParams) => value) as React.Dispatch<AuthActionParams>
)

export default AuthDispatchContext
