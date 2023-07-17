import AuthReducer from '@/store/auth/AuthReducer'
import { INITIAL_STATE } from '@/store/auth/constants'
import { AuthActions } from '@/actions/actionTypes'

describe('AuthReducer', () => {
  it('should handle LOGIN_REQUEST', () => {
    const action = { type: AuthActions.LOGIN_REQUEST }
    const state = AuthReducer(INITIAL_STATE, action)
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: AuthActions.LOGIN_SUCCESS,
      payload: { jwtToken: '123456' },
    }
    const expectedState = {
      ...INITIAL_STATE,
      jwtToken: '123456',
      error: null,
    }
    const state = AuthReducer(INITIAL_STATE, action)
    expect(state).toEqual(expectedState)
  })

  it('should handle LOGOUT', () => {
    const action = { type: AuthActions.LOGOUT }
    const state = AuthReducer(INITIAL_STATE, action)
    expect(state).toEqual(INITIAL_STATE)
  })

  it('should handle LOGIN_FAILURE', () => {
    const error = new Error('Login failed')
    const action = {
      type: AuthActions.LOGIN_FAILURE,
      error: error,
    }
    const expectedState = {
      ...INITIAL_STATE,
      error: error,
    }
    const state = AuthReducer(INITIAL_STATE, action)
    expect(state).toEqual(expectedState)
  })

  it('should throw an error for unhandled action type', () => {
    const action = { type: 'UNHANDLED_ACTION' }
    // @ts-expect-error
    expect(() => AuthReducer(INITIAL_STATE, action)).toThrow(
      'Unhandled action type: UNHANDLED_ACTION'
    )
  })
})
