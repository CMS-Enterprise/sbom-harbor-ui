/**
 * Custom React Hook to use the AuthContext in a functional component
 *  in order to access the AuthContext's state and dispatch functions.
 * @module sbom-harbor-ui/store/auth/AuthReducer
 */
import { AuthActions } from '@/actions/actionTypes'
import { AuthState } from '@/store/auth/types'
import { INITIAL_STATE } from '@/store/auth/constants'

const AuthReducer = (
  state: AuthState,
  {
    type,
    payload = {},
    error,
  }: {
    type: AuthActions
    payload?: AuthState
    error?: Error | null
  }
) => {
  switch (type) {
    case AuthActions.LOGIN_REQUEST:
      return {
        ...state,
      }

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        jwtToken: payload.jwtToken,
        error: null,
      }

    case AuthActions.LOGOUT:
      return {
        ...INITIAL_STATE,
      }

    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        error: error,
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export default AuthReducer
