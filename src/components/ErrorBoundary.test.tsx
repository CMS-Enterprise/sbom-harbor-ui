import { render, screen } from '@testing-library/react'
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}))

describe('ErrorBoundary', () => {
  // @ts-ignore
  const isRouteErrorResponseMock = isRouteErrorResponse as jest.Mock
  const useNavigateMock = useNavigate as jest.Mock
  const routeErrorMock = useRouteError as jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('should render auth session error and navigate to logout after 5 seconds', () => {
    const navigateMock = jest.fn().mockImplementation(() => ({}))
    useNavigateMock.mockReturnValue(navigateMock)
    isRouteErrorResponseMock.mockReturnValue(true)
    routeErrorMock.mockReturnValue({
      status: 401,
      statusText: 'Unauthorized',
      data: 'Unauthorized',
    })

    render(<ErrorBoundary />)

    expect(
      screen.getByText(/Your session has expired. Please login again./i)
    ).toBeInTheDocument()

    jest.advanceTimersByTime(5000)

    expect(navigateMock).toHaveBeenCalledWith('/logout')
  })

  it('should render generic error message', () => {
    routeErrorMock.mockReturnValue(new Error('Something went wrong'))
    render(<ErrorBoundary />)
    expect(
      screen.getByText(/Something went wrong. Please try again./i)
    ).toBeInTheDocument()
  })
})
