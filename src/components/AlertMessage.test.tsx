import { render, screen, fireEvent } from '@testing-library/react'
import { type AlertColor } from '@mui/material/Alert'
import { AlertContext, type AlertState } from '@/hooks/useAlert'
import AlertMessage from '@/components/AlertMessage'

describe('AlertMessage', () => {
  const mockAlertState = {
    isVisible: true,
    message: 'Test Alert',
    severity: 'error' as AlertColor,
  } as AlertState

  const mockClearAlert = jest.fn()
  const mockSetAlert = jest.fn()
  const mockSetData = jest.fn()

  beforeEach(() => {
    render(
      <AlertContext.Provider
        value={{
          state: mockAlertState,
          clearAlert: mockClearAlert,
          setAlert: mockSetAlert,
          setData: mockSetData,
        }}
      >
        <AlertMessage />
      </AlertContext.Provider>
    )
  })

  it('should render the alert with the given message and severity', () => {
    const alertElement = screen.getByText(/Test Alert/i)
    expect(alertElement).toBeInTheDocument()
    const parentElement = alertElement.parentElement
    expect(parentElement).toHaveClass('MuiAlert-standardError')
  })

  it('should call clearAlert when the close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(mockClearAlert).toHaveBeenCalledTimes(1)
  })
})
