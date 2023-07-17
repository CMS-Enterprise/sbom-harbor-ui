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

export const Auth = {
  currentAuthenticatedUser: jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        const currentUser = {
          username: 'abc123',
          email: 'demo@test.com',
          accessToken: '123cvb123',
          name: 'John Rambo',
          phone: '+46761022312',
          phoneVerified: false,
          attributes: {
            sub: 'abc123',
          },
        }

        return resolve(currentUser)
      })
  ),
  currentSession: jest.fn().mockImplementation(() => {
    const session = {
      accessToken: {
        jwtToken: '123456',
      },
      idToken: {
        payload: {
          email: 'demo@test.com',
          sub: 'abc123',
        },
      },
      getAccessToken: () => ({ getJwtToken: () => '123456' }),
    }
    return Promise.resolve(session)
  }),
  signOut: jest.fn(),
  signIn: jest.fn().mockImplementation(
    (email: string, pass: string) =>
      new Promise((resolve, reject) => {
        const userExists = users[email]

        if (userExists && pass === '12345678') {
          const signedUser = {
            username: 'abcdfg123',
            attributes: { email, name: 'John Rambo', phone: '+460777777777' },
            signInUserSession: {
              accessToken: { jwtToken: '123456' },
            },
          }
          return resolve(signedUser)
        }

        if (userExists) {
          return reject({
            code: 'NotAuthorizedException',
            name: 'NotAuthorizedException',
            message: 'Incorrect username or password.',
          })
        }

        return reject({
          code: 'UserNotFoundException',
          name: 'UserNotFoundException',
          message: 'User does not exist.',
        })
      })
  ),
  signUp: jest.fn().mockImplementation(
    ({ username, _pass, attributes }) =>
      new Promise((resolve) => {
        const newUser = {
          username: 'abcdfg123',
          email: username,
          name: attributes.name,
          signInUserSession: {
            accessToken: { jwtToken: '123456' },
          },
        }
        return resolve(newUser)
      })
  ),
  confirmSignUp: jest.fn().mockImplementation(
    (email, code) =>
      new Promise((resolve, reject) => {
        const confirmedUser = {
          userConfirmed: true,
          username: 'abcdfg123',
          user: { username: email },
        }

        if (code === '123456') {
          return resolve(confirmedUser)
        }

        return reject({
          code: 'CodeMismatchException',
          name: 'CodeMismatchException',
          message: 'Invalid verification code provided, please try again.',
        })
      })
  ),
  updateUserAttributes: jest.fn(),
}
