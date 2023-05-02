import loginUser from './loginUser'
import { AuthActions } from './actionTypes'

const users: {
  [key: string]: {
    username: string
    email: string
    password: string
  }
} = {
  'user@example.com': {
    username: 'user@example.com',
    email: 'user@example.com',
    password: '12345678',
  },
}

describe('actions/loginUser', () => {
  test('loginUser', async () => {
    const dispatch = jest.fn()
    await loginUser(dispatch, users['user@example.com'])
    expect(dispatch).toHaveBeenCalledWith({ type: AuthActions.LOGIN_REQUEST })
  })
})
