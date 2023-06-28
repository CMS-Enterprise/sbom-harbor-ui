/**
 * @module sbom-harbor-ui/hooks/useAlert
 */
import { createContext, useCallback, useContext, useState } from 'react'
import { AlertColor } from '@mui/material/Alert'
import { DEFAULT_ALERT_TIMEOUT } from '@/constants'

export type AlertProps = {
  severity?: AlertColor
  message?: string
  autoHide?: boolean
  timeout?: number
}

export type AlertState = {
  isVisible: boolean
  message: string
  severity: AlertColor
}

export type AlertContextType = {
  state: AlertState
  clearAlert: () => void
  setAlert: (values: AlertProps) => void
  setData: (values: AlertState) => void
}

const INITIAL_STATE = {
  isVisible: false,
  message: '',
  severity: 'info' as AlertColor,
} as AlertState

const defaultContext: AlertContextType = {
  state: INITIAL_STATE,
  setData: () => null,
  setAlert: () => null,
  clearAlert: () => null,
}

export const AlertContext = createContext<AlertContextType>(defaultContext)

export type AlertProviderOverrideProps = {
  initialState?: AlertState
  contextOverrides?: Partial<AlertContextType>
}

export type AlertProviderProps = {
  children: JSX.Element
} & AlertProviderOverrideProps

export const AlertProvider = ({
  children,
  initialState = INITIAL_STATE,
  contextOverrides = {},
}: AlertProviderProps) => {
  const [state, setState] = useState<AlertState>(initialState)
  const isControlled = Object.keys(contextOverrides).length > 0
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const clearAlert = useCallback(() => {
    if (isControlled && contextOverrides?.clearAlert) {
      contextOverrides.clearAlert?.()
    }
    setState({
      ...INITIAL_STATE,
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }, [timeoutId])

  const setAlert = useCallback(
    ({
      autoHide = true,
      message = state.message || '',
      severity = state.severity || 'info',
      timeout = DEFAULT_ALERT_TIMEOUT,
    }: AlertProps) => {
      if (isControlled && contextOverrides?.setAlert) {
        contextOverrides.setAlert?.({
          autoHide,
          message,
          severity,
          timeout,
        })
      }
      setState({
        isVisible: true,
        message,
        severity,
      })
      if (!autoHide) return
      setTimeoutId(setTimeout(clearAlert, timeout))
    },
    [state.message, state.severity, timeoutId]
  )

  const setData = useCallback((values: AlertState) => {
    if (isControlled && contextOverrides?.setData) {
      contextOverrides.setData?.(values)
    }
    setState((prevData: AlertState) => ({
      ...prevData,
      ...values,
    }))
  }, [])

  return (
    <AlertContext.Provider value={{ state, setData, setAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)

export default useAlert
