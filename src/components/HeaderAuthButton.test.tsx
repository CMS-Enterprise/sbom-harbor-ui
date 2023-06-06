import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthState } from '@/hooks/useAuth'
import HeaderAuthButton from '@/components/HeaderAuthButton'

jest.mock('@/hooks/useAuth')

describe('HeaderAuthButton', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty container when jwtToken is null', () => {
    ;(useAuthState as jest.Mock).mockReturnValue({ jwtToken: null })
    render(<HeaderAuthButton />, { wrapper: BrowserRouter })
    const buttonContainer = screen.queryByRole('button')
    expect(buttonContainer).toBeNull()
  })

  it('renders login button when jwtToken is undefined', () => {
    ;(useAuthState as jest.Mock).mockReturnValue({ jwtToken: undefined })
    render(<HeaderAuthButton />, { wrapper: BrowserRouter })
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('renders logout button when jwtToken is defined', () => {
    ;(useAuthState as jest.Mock).mockReturnValue({ jwtToken: 'mockToken' })
    render(<HeaderAuthButton />, { wrapper: BrowserRouter })
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    expect(logoutButton).toBeInTheDocument()
  })
})
