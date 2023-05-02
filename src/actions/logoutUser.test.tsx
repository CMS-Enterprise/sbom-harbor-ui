import logoutUser from './logoutUser'
import { AuthActions } from './actionTypes'

test('logoutUser', async () => {
  const dispatch = jest.fn()
  await logoutUser(dispatch)
  expect(dispatch).toHaveBeenCalledWith({ type: AuthActions.LOGOUT })
})
