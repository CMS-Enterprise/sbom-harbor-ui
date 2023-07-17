import { screen, render, act, waitFor } from '@testing-library/react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { AuthActions } from '@/actions/actionTypes'
import AuthProvider from './AuthProvider'
import AuthDispatchContext from './AuthDispatchContext'
import AuthStateContext from './AuthStateContext'
import { Auth as mockAuth } from 'aws-amplify'

const Content = () => (
  <AuthProvider>
    <div>Child component</div>
  </AuthProvider>
)

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useMatch: jest.fn(),
  useNavigate: jest.fn(),
}))

describe('AuthProvider', () => {
  let mockDispatch: jest.Mock<any>
  let mockNavigate: jest.Mock<any>
  let mockUseLocation: jest.Mock<any>
  let mockUseMatch: jest.Mock<any>
  let mockUseNavigate: jest.Mock<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockDispatch = jest.fn()
    mockNavigate = jest.fn()
    mockUseLocation = useLocation as jest.Mock<any>
    mockUseMatch = useMatch as jest.Mock<any>
    mockUseNavigate = useNavigate as jest.Mock<any>
    mockUseNavigate.mockReturnValue(mockNavigate)
  })

  it('Render the children', async () => {
    await act(async () => {
      render(<Content />)
    })
    expect(screen.getByText('Child component')).toBeInTheDocument()
    expect(mockUseLocation).toHaveBeenCalled()
    expect(mockUseMatch).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalled()
  })

  it('should initialize the AuthContext on mount', async () => {
    const mockLocation = { pathname: '/login' }
    const mockMatch = { path: '/app' }
    const mockState = { jwtToken: 'test' }
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)

    await act(async () => {
      render(
        <AuthStateContext.Provider value={mockState}>
          <AuthDispatchContext.Provider value={mockDispatch}>
            <Content />
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AuthActions.LOGIN_SUCCESS,
        payload: { jwtToken: 'mockJwtToken' },
      })
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  it('should handle initialization error', async () => {
    const mockLocation = { pathname: '/app' }
    const mockMatch = { path: '/app' }
    const mockState = { jwtToken: 'test' }
    const mockError = new Error('Initialization error')
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)

    await act(async () => {
      render(
        <AuthStateContext.Provider value={mockState}>
          <AuthDispatchContext.Provider value={mockDispatch}>
            <Content />
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockUseLocation).toHaveBeenCalled()
      expect(mockUseMatch).toHaveBeenCalled()
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(mockAuth.currentAuthenticatedUser).toHaveBeenCalled()
      expect(mockAuth.currentSession).toHaveBeenCalled()
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AuthActions.LOGIN_FAILURE,
        error: mockError,
      })
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('should redirect to /app when user is authenticated and on /login', async () => {
    const mockLocation = { pathname: '/login' }
    const mockMatch = null // no match for a protected route
    const mockState = { jwtToken: 'test' }
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)
    // @ts-expect-error
    mockAuth.currentAuthenticatedUser.mockResolvedValue({ username: 'test' })
    // @ts-expect-error
    mockAuth.currentSession.mockResolvedValue({
      getAccessToken: () => ({ getJwtToken: () => '123456' }),
    })

    await act(async () => {
      render(
        <AuthStateContext.Provider value={mockState}>
          <AuthDispatchContext.Provider value={mockDispatch}>
            <Content />
          </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/app')
    })
  })

  it('should redirect to /login when user is not authenticated and on protected route', async () => {
    const mockLocation = { pathname: '/app' }
    const mockMatch = { path: '/app' }
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)
    // @ts-expect-error
    mockAuth.currentAuthenticatedUser.mockRejectedValue(
      new Error('No user or session')
    )

    act(() => {
      render(
        <AuthDispatchContext.Provider value={mockDispatch}>
          <Content />
        </AuthDispatchContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('should not redirect when user is not authenticated and on /login', async () => {
    const mockLocation = { pathname: '/login' }
    const mockMatch = null // no match for a protected route
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)

    await act(async () => {
      render(
        <AuthDispatchContext.Provider value={mockDispatch}>
          <Content />
        </AuthDispatchContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  it('should redirect to /login if the current session does not get a valid jwtToken', async () => {
    // @ts-expect-error
    mockAuth.currentSession.mockResolvedValue({
      getAccessToken: () => ({ getJwtToken: () => '' }),
    })
    const mockError = new Error('Initialization error')
    const mockLocation = { pathname: '/app' }
    const mockMatch = { path: '/app' }
    mockUseLocation.mockReturnValue(mockLocation)
    mockUseMatch.mockReturnValue(mockMatch)

    await act(async () => {
      render(
        <AuthDispatchContext.Provider value={mockDispatch}>
          <Content />
        </AuthDispatchContext.Provider>
      )
    })

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AuthActions.LOGIN_FAILURE,
        error: mockError,
      })
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })
})
