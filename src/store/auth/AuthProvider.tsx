/**
 * @module sbom-harbor-ui/store/auth/AuthProvider
 */
import { Auth } from 'aws-amplify'
import { useEffect, useReducer } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { AuthActions } from '@/actions/actionTypes'
import AuthReducer from '@/store/auth/AuthReducer'
import { AuthProviderProps } from '@/store/auth/types'
import { INITIAL_STATE } from '@/store/auth/constants'
import AuthDispatchContext from '@/store/auth/AuthDispatchContext'
import AuthStateContext from '@/store/auth/AuthStateContext'

/**
 * The AuthContextProvider is used to provide user data to components.
 * @param {AuthProviderProps} props The input props passed to the component.
 * @param {React.ReactNode} props.children The children nodes being rendered.
 * @returns {JSX.Element} The rendered provider that wraps the children nodes.
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const matchProtectedRoute = useMatch('/app/*')
  const [user, dispatch] = useReducer(AuthReducer, { ...INITIAL_STATE })

  /**
   * Effect that initializes the AuthContext by checking for a user session
   *  and setting the user state accordingly. If no valid user session exists,
   *  it sets the user state to null and clears local storage.
   */
  useEffect(() => {
    /**
     * Async function to check the validity of the user session and set user state.
     * @returns {Promise<void>} A promise that resolves when the user's sesson
     *  is resolved to a valid session, or rejects if no valid session exists.
     */
    const init = async () => {
      try {
        const [user, session] = await Promise.all([
          Auth.currentAuthenticatedUser(),
          Auth.currentSession(),
        ])

        if (!user || !session) {
          throw new Error('No user or session')
        }

        const jwtToken = session?.getAccessToken()?.getJwtToken()

        if (!jwtToken) {
          throw new Error('No jwtToken')
        }

        // TODO: implement refresh sessions
        // user.refreshSession(
        //   session.getRefreshToken(),
        //   async (err: any, session: CognitoUserSession) => {
        //     if (err) {
        //       throw err
        //     }
        //   }
        // )

        dispatch({
          type: AuthActions.LOGIN_SUCCESS,
          payload: { jwtToken },
        })

        // if the unauthenticated user is trying to navigate to a
        // protected app routue, redirect them to the login page.
        if (!matchProtectedRoute && location.pathname !== '/logout') {
          navigate('/app')
        }
      } catch (error) {
        dispatch({
          type: AuthActions.LOGIN_FAILURE,
          error: error as Error,
        })
        // if the unauthenticated user is trying to navigate to a
        // protected app routue, redirect them to the login page.
        if (matchProtectedRoute) {
          navigate('/login')
        }
      }
    }

    init()
  }, [location?.pathname, matchProtectedRoute, navigate])

  // set all the AuthContext values in the context provider.
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default AuthProvider
