import { act } from '@testing-library/react'
import { Auth } from 'aws-amplify'
import logoutUser from '@/actions/logoutUser'
import { AuthActions } from '@/actions/actionTypes'

// Helper function to provide a mock dispatch function for our tests
function useMockDispatch() {
  const dispatch = jest.fn()
  // Simulate calling the logoutUser function
  function doLogout() {
    act(() => {
      logoutUser(dispatch)
    })
  }
  return { dispatch, doLogout }
}

describe('logoutUser action', () => {
  it('calls Auth.signOut', async () => {
    const { doLogout } = useMockDispatch()
    await doLogout()
    expect(Auth.signOut).toHaveBeenCalled()
  })

  it('dispatches LOGOUT action', async () => {
    const { dispatch, doLogout } = useMockDispatch()
    await doLogout()
    expect(dispatch).toHaveBeenCalledWith({ type: AuthActions.LOGOUT })
  })
})
