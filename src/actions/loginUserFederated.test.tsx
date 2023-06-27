import { AuthActions } from '@/actions/actionTypes'
import loginUserFederated from '@/actions/loginUserFederated'
import { Auth } from 'aws-amplify'

describe('loginUserFederated', () => {
  let mockDispatch: jest.Mock

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch LOGIN_REQUEST action', async () => {
    const mockUser = {
      accessKeyId: 'testAccessKeyId',
      sessionToken: 'testSessionToken',
      secretAccessKey: 'testSecretAccessKey',
      identityId: 'testIdentityId',
      authenticated: true,
      expiration: new Date(),
    }

    const mockToken = 'testToken'

    ;(Auth.federatedSignIn as jest.Mock).mockResolvedValue(mockUser)
    ;(Auth.currentSession as jest.Mock).mockResolvedValue({
      getAccessToken: () => ({
        getJwtToken: () => mockToken,
      }),
    })

    await loginUserFederated(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_REQUEST,
    })
  })

  it('should dispatch LOGIN_SUCCESS action when login is successful', async () => {
    const mockUser = {
      accessKeyId: 'testAccessKeyId',
      sessionToken: 'testSessionToken',
      secretAccessKey: 'testSecretAccessKey',
      identityId: 'testIdentityId',
      authenticated: true,
      expiration: new Date(),
    }

    const mockToken = 'testToken'

    ;(Auth.federatedSignIn as jest.Mock).mockResolvedValue(mockUser)
    ;(Auth.currentSession as jest.Mock).mockResolvedValue({
      getAccessToken: () => ({
        getJwtToken: () => mockToken,
      }),
    })

    await loginUserFederated(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_SUCCESS,
      payload: mockUser,
    })
  })

  it('should dispatch LOGIN_FAILURE action when login fails', async () => {
    const mockError = new Error('login failed')

    ;(Auth.federatedSignIn as jest.Mock).mockRejectedValue(mockError)

    await loginUserFederated(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: mockError,
    })
  })

  it('should dispatch LOGIN_FAILURE action when no JWT token is found', async () => {
    const mockUser = {
      accessKeyId: 'testAccessKeyId',
      sessionToken: 'testSessionToken',
      secretAccessKey: 'testSecretAccessKey',
      identityId: 'testIdentityId',
      authenticated: true,
      expiration: new Date(),
    }

    const mockToken = ''

    ;(Auth.federatedSignIn as jest.Mock).mockResolvedValue(mockUser)
    ;(Auth.currentSession as jest.Mock).mockResolvedValue({
      getAccessToken: () => ({
        getJwtToken: () => mockToken,
      }),
    })

    await loginUserFederated(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AuthActions.LOGIN_FAILURE,
      error: new Error('No JWT token found'),
    })
  })
})
