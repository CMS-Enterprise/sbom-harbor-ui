// CreateForm.test.tsx
import { useState } from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextField from '@mui/material/TextField'
import CreateForm from '@/components/crud/CreateForm'

describe('CreateForm', () => {
  const defaultValues = {
    name: 'Vendor 1',
    address: 'Address 1',
  }

  const schema = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      component: TextField,
    },
    {
      id: 'address',
      name: 'address',
      label: 'Address',
      type: 'text',
      required: true,
      component: TextField,
    },
  ]

  let onCloseMock: jest.Mock<unknown>
  let onSubmitMock: jest.Mock<unknown>

  beforeEach(() => {
    jest.clearAllMocks()
    onCloseMock = jest.fn()
    onSubmitMock = jest.fn()
  })

  test('renders the form when open is true', async () => {
    const { getByLabelText } = render(
      <CreateForm
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        schema={schema}
      />
    )
    const nameField = getByLabelText(/Name/)
    const addressField = getByLabelText(/Address/)
    expect(nameField).toBeInTheDocument()
    expect(addressField).toBeInTheDocument()
  })

  test('calls onSubmit with form data when form is submitted', async () => {
    const { getByLabelText, getByText } = render(
      <CreateForm
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        schema={schema}
        submitLabel="Submit"
      />
    )

    const nameField = getByLabelText(/Name/)
    const addressField = getByLabelText(/Address/)
    const submit = getByText('Submit')

    await act(async () => {
      fireEvent.input(nameField, { target: { value: 'Vendor 1' } })
      fireEvent.input(addressField, { target: { value: 'Address 1' } })
      fireEvent.click(submit)
    })

    waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(defaultValues)
    })
  })

  test('calls onClose when Cancel button is clicked', async () => {
    const { getByText } = render(
      <CreateForm
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        schema={schema}
      />
    )

    act(() => {
      fireEvent.click(getByText('Cancel'))
    })

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })
  })

  test('submits form data only when all required fields are filled and form is not disabled', async () => {
    const {
      result: {
        current: [values],
      },
    } = renderHook(() => useState(defaultValues))

    const { getByText, getByLabelText, getByRole } = render(
      <CreateForm
        open={true}
        schema={schema}
        onClose={() => {}}
        onSubmit={onSubmitMock}
        FormProps={{
          defaultValues,
          values,
          mode: 'onChange',
        }}
        submitLabel="Submit"
      />
    )

    const form = getByRole('form')
    const nameField = getByLabelText(/Name/)
    const addressField = getByLabelText(/Address/)
    const submitButton = getByText('Submit')

    act(() => {
      userEvent.type(nameField, 'Test Name')
      userEvent.type(addressField, 'Test Address')
    })

    waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    act(() => {
      fireEvent.submit(form)
    })

    waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
      expect(onSubmitMock).toHaveBeenCalledWith(defaultValues)
    })
  })
})
