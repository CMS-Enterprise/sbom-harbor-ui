import { Auth } from 'aws-amplify'
import getJWT from '@/utils/getJWT'
import { AuthErrorStatus } from '@/errors/AuthError'

describe('getJWT', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the JWT token when the session is valid', async () => {
    const mockSession = {
      getAccessToken: jest
        .fn()
        .mockReturnValue({ getJwtToken: jest.fn().mockReturnValue('123456') }),
    }
    // @ts-expect-error
    Auth.currentSession.mockResolvedValue(mockSession)
    await expect(getJWT()).resolves.toBe('123456')
    expect(Auth.currentSession).toHaveBeenCalled()
    expect(mockSession.getAccessToken).toHaveBeenCalled()
  })

  it('returns a 401 Response when the session is invalid', async () => {
    const mockSession = {
      getAccessToken: jest
        .fn()
        .mockReturnValue({ getJwtToken: jest.fn().mockReturnValue(null) }),
    }
    // @ts-expect-error
    Auth.currentSession.mockResolvedValue(mockSession)
    const promise = getJWT()
    await expect(promise).rejects.toBeInstanceOf(Response)
    await expect(promise).rejects.toHaveProperty(
      'status',
      AuthErrorStatus.UNAUTHORIZED
    )
  })
})
