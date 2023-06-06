// src/actions/loginUser.test.tsx
import { AuthActions } from '@/actions/actionTypes'
import loginUser from '@/actions/loginUser'
import { Auth } from 'aws-amplify'
import type {
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'

type SignInMock = jest.Mock
type CurrentSessionMock = jest.Mock
type User = CognitoUser & { attributes: { email: string } }

jest.mock('aws-amplify', () => ({
  Auth: {
    signIn: jest.fn() as SignInMock,
    currentSession: jest.fn() as CurrentSessionMock,
  },
}))

const mockDispatch = jest.fn()

describe('loginUser action', () => {
  const payload = { email: 'test@test.com', password: 'password' }
  let session: jest.Mocked<CognitoUserSession>
  let user: jest.Mocked<User>
  let signInFn: jest.MockedFunction<SignInMock>
  let sessionFn: jest.MockedFunction<CurrentSessionMock>

  beforeEach(() => {
    jest.resetAllMocks()

    session = {
      isValid: jest.fn().mockReturnValue(true),
      getAccessToken: jest.fn().mockReturnValue({
        getJwtToken: jest.fn().mockReturnValue('jwtToken'),
      }),
      getIdToken: jest.fn(),
      getRefreshToken: jest.fn(),
    }
    sessionFn = Auth.currentSession as jest.MockedFunction<CurrentSessionMock>
    sessionFn.mockResolvedValue(session)

    user = {
      ...user,
      attributes: { email: payload.email },
      getUsername: jest.fn().mockReturnValue('username'),
      getSignInUserSession: jest.fn().mockReturnValue(true),
    }
    signInFn = Auth.signIn as jest.MockedFunction<SignInMock>
    signInFn.mockResolvedValue(user)
  })

  it('should dispatch LOGIN_REQUEST action', async () => {
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_REQUEST,
    })
  })

  it('should call Auth.signIn and Auth.currentSession on successful login', async () => {
    await loginUser(mockDispatch, payload)
    expect(Auth.signIn).toHaveBeenCalledWith(payload.email, payload.password)
    expect(Auth.currentSession).toHaveBeenCalled()
  })

  it('should dispatch LOGIN_SUCCESS action on successful login with the correct payload', async () => {
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_SUCCESS,
      payload: {
        jwtToken: 'jwtToken',
        email: user.attributes.email,
        username: user.getUsername(),
      },
    })
  })

  it('should dispatch LOGIN_FAILURE action on failed login', async () => {
    signInFn.mockRejectedValue(new Error('Login failed'))
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: new Error('Login failed'),
    })
  })

  it('should dispatch LOGIN_FAILURE action if the session is not valid', async () => {
    sessionFn.mockResolvedValue({
      isValid: jest.fn().mockReturnValue(false),
    })
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: new Error('Invalid user session'),
    })
  })

  it('should dispatch LOGIN_FAILURE action if the jwtToken is not valid', async () => {
    sessionFn.mockResolvedValue({
      isValid: jest.fn().mockReturnValue(true),
      getAccessToken: jest.fn().mockReturnValue({
        getJwtToken: jest.fn().mockReturnValue(''),
      }),
    })
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: new Error('No JWT token'),
    })
  })

  it('should dispatch LOGIN_FAILURE action if the user object is not valid', async () => {
    signInFn.mockResolvedValue({
      getSignInUserSession: jest.fn().mockReturnValue(null),
    })
    await loginUser(mockDispatch, payload)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: new Error('Invalid user'),
    })
  })
})
