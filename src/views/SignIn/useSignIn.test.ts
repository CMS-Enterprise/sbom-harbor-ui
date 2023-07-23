// src/views/SignIn/useSignIn.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import loginUser from '@/actions/loginUser'
import useAlert from '@/hooks/useAlert'
import { useAuthDispatch } from '@/hooks/useAuth'
import { useSignIn } from './useSignIn'

jest.mock('@/actions/loginUser')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))
jest.mock('@/hooks/useAlert')
jest.mock('@/hooks/useAuth')

describe('useSignIn', () => {
  ;(useAuthDispatch as jest.Mock).mockReturnValue(jest.fn())
  ;(useNavigate as jest.Mock).mockReturnValue(jest.fn())
  const setAlertMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAlert as jest.Mock).mockReturnValue({ setAlert: setAlertMock })
  })

  it('should handle form submission', async () => {
    ;(loginUser as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(useSignIn)

    await act(async () => {
      result.current.onSubmit({
        email: 'test@test.com',
        password: 'password',
      })
    })

    waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(loginUser).toHaveBeenCalledWith(expect.any(Function), {
        email: 'test@test.com',
        password: 'password',
      })
    })
  })

  it('should handle federated sign in', async () => {
    ;(Auth.federatedSignIn as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(useSignIn)

    await act(async () => {
      await result.current.handleClickFederatedSignIn()
    })

    waitFor(() => {
      expect(Auth.federatedSignIn).toHaveBeenCalledWith({ provider: 'COGNITO' })
    })
  })

  it('should toggle password visibility', async () => {
    const { result } = renderHook(useSignIn)

    await act(() => {
      result.current.setShowPassword(true)
    })

    waitFor(() => {
      expect(result.current.showPassword).toBe(true)
    })
  })

  it('should handle form submission error', async () => {
    ;(loginUser as jest.Mock).mockRejectedValueOnce(new Error('Login error'))

    const { result } = renderHook(useSignIn)

    await act(async () => {
      result.current.onSubmit({
        email: 'test@test.com',
        password: 'password',
      })
    })

    waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(setAlertMock).toHaveBeenCalledWith({
        message: 'There was an error logging in. Please try again.',
        severity: 'error',
      })
    })
  })

  it('should handle federated sign in error', async () => {
    ;(Auth.federatedSignIn as jest.Mock).mockRejectedValueOnce(
      new Error('Federated sign in error')
    )
    const { result } = renderHook(useSignIn)
    await act(async () => {
      await result.current.handleClickFederatedSignIn()
    })
    waitFor(() => {
      expect(setAlertMock).toHaveBeenCalledWith({
        message: 'There was an error with the identity provider.',
        severity: 'error',
      })
    })
  })
})
