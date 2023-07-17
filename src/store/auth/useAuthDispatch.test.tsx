import { waitFor } from '@testing-library/dom'
import { renderHook } from '@testing-library/react-hooks'
import AuthDispatchContext from '@/store/auth/AuthDispatchContext'
import useAuthDispatch from '@/store/auth/useAuthDispatch'

describe('useAuthDispatch', () => {
  it('should throw an error when used outside AuthProvider', () => {
    const { result } = renderHook(() => useAuthDispatch())

    waitFor(() => {
      expect(result.error).toBeDefined()
      expect(result.error).toEqual(
        new Error('useAuthDispatch must be used within an AuthProvider')
      )
    })
  })

  it('should return the context value from AuthDispatchContext', () => {
    const mockDispatch = jest.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthDispatchContext.Provider value={mockDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    )
    const { result } = renderHook(() => useAuthDispatch(), { wrapper })
    expect(result.current).toBe(mockDispatch)
  })
})
