/**
 * @module sbom-harbor-ui/store/auth/constants
 */
import { AuthState } from '@/store/auth/types'

export const INITIAL_STATE: AuthState = {
  jwtToken: '',
  error: null,
}
