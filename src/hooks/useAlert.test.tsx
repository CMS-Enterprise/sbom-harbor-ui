import { Root, createRoot } from 'react-dom/client'
import { act, renderHook, waitFor } from '@testing-library/react'
import { AlertColor } from '@mui/material/Alert'
import { AlertProvider, AlertState, useAlert } from '@/hooks/useAlert'

const TIMEOUT = 100

describe('useAlert', () => {
  let root: Root
  const mockClearAlert = jest.fn()
  const mockSetAlert = jest.fn()
  const mockSetData = jest.fn()

  const successAlert = {
    autoHide: true,
    message: 'Test message',
    severity: 'success' as AlertColor,
    timeout: TIMEOUT,
  }

  const successState = {
    isVisible: true,
    message: 'Test message',
    severity: 'success',
  } as AlertState

  const errorMessage = 'Something went wrong'

  const errorAlert = {
    autoHide: true,
    message: errorMessage,
    severity: 'error' as AlertColor,
    timeout: TIMEOUT,
  }

  const initialState = {
    isVisible: false,
    message: '',
    severity: 'info' as AlertColor,
  } as AlertState

  const Wrapper = ({ children }: { children: JSX.Element }) => (
    <AlertProvider
      contextOverrides={{
        clearAlert: mockClearAlert,
        setAlert: mockSetAlert,
        setData: mockSetData,
      }}
    >
      {children}
    </AlertProvider>
  )

  const RenderNodes = () => (
    <Wrapper>
      <div>Test</div>
    </Wrapper>
  )

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    root = createRoot(document.createElement('div'))
    await act(() => {
      root.render(<RenderNodes />)
    })
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should set and clear alert', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: Wrapper })
    await act(() => {
      result.current.setAlert(successAlert)
    })
    await waitFor(() => {
      expect(result.current.state).toEqual(successState)
    })
    await waitFor(
      () => {
        expect(result.current.state).toEqual(initialState)
      },
      { timeout: TIMEOUT + 10 }
    )
  })

  it('should not clear alert if it is cleared before DEFAULT_ALERT_TIMEOUT', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: Wrapper })
    await act(() => {
      result.current.setAlert(successAlert)
    })
    await waitFor(() => {
      expect(result.current.state).toEqual(successState)
    })
    await act(() => {
      result.current.clearAlert()
    })
    await waitFor(() => {
      expect(result.current.state).toEqual(initialState)
    })
  })

  it('updates the alert state', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: Wrapper })
    await act(() => {
      result.current.setAlert(errorAlert)
    })
    expect(result.current.state.severity).toBe('error')
    expect(result.current.state.message).toBe(errorMessage)
  })

  it('clears the alert state after timeout passes', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: Wrapper })
    await act(() => {
      result.current.setAlert(errorAlert)
    })
    await waitFor(() => expect(result.current.state.severity).toBe('info'), {
      timeout: TIMEOUT + 100,
    })
  })

  it('should call setData if implemented as a controlled component', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: Wrapper })
    await act(() => {
      result.current.setData(successState)
    })
    await waitFor(() => {
      expect(result.current.state).toEqual(successState)
      expect(mockSetData).toHaveBeenCalledTimes(1)
    })
  })

  it('should call default setData if not implemented as a controlled component', async () => {
    const { result } = renderHook(() => useAlert())
    await act(() => {
      result.current.setData(successState)
    })
    await waitFor(() => {
      expect(result.current.state).toEqual(initialState)
      expect(mockSetData).toHaveBeenCalledTimes(0)
    })
  })
})
