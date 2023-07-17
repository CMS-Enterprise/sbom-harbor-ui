import { waitFor } from '@testing-library/dom'
import { renderHook } from '@testing-library/react-hooks'
import AuthStateContext from '@/store/auth/AuthStateContext'
import useAuthState from '@/store/auth/useAuthState'

describe('useAuthState', () => {
  it('should throw an error when used outside AuthProvider', () => {
    const { result } = renderHook(() => useAuthState())

    waitFor(() => {
      expect(result.error).toBeDefined()
      expect(result.error).toEqual(
        new Error('useAuthState must be used within an AuthProvider')
      )
    })
  })

  it('should return the context value from AuthStateContext', () => {
    const mockState = { jwtToken: 'test' }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthStateContext.Provider value={mockState}>
        {children}
      </AuthStateContext.Provider>
    )
    const { result } = renderHook(() => useAuthState(), { wrapper })
    expect(result.current).toBe(mockState)
  })
})
