/**
 * @module sbom-harbor-ui/store/auth/AuthStateContext
 */
import { createContext } from 'react'
import { INITIAL_STATE } from '@/store/auth/constants'

const AuthStateContext = createContext(INITIAL_STATE)

export default AuthStateContext
