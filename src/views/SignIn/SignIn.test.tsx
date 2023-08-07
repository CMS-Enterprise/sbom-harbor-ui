// src/views/SignIn/useSignIn.test.ts
import { JSXElementConstructor, ReactElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from '@/views/SignIn/SignIn'

function setup(
  jsx: ReactElement<
    typeof SignIn,
    string | JSXElementConstructor<typeof SignIn>
  >
) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('SignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should submit correct form data in the SignIn page', async () => {
    const mockSubmit = jest.fn()

    jest.mock('react-hook-form', () => ({
      useForm: () => ({
        control: {
          email: '',
          password: '',
        },
        handleSubmit: mockSubmit,
      }),
    }))

    // Setup to render the SignIn page
    const { user } = setup(<SignIn />)

    // Type the email into the email field
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'user@example.com'
    )

    // Type the password into the password field
    await user.type(
      screen.getByRole('textbox', { name: /password/i }),
      'password'
    )

    // Save the form
    await user.click(screen.getByRole('button', { name: /^login$/i }))

    // Wait for form submission to complete
    waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password',
      })
    })
  })
})
