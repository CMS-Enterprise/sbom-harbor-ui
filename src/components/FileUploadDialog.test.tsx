import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import FileUploadDialog from '@/components/FileUploadDialog'

describe.skip('FileUploadDialog', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<FileUploadDialog open={true} onClose={mockOnClose} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('calls onClose when the dialog is closed', async () => {
    render(<FileUploadDialog open={true} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    userEvent.click(closeButton)

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1))
  })

  it('displays the progress of file upload', async () => {
    const file = new File(['(⌐□_□)'], 'chuckles.json', {
      type: 'application/json',
    })

    render(<FileUploadDialog open={true} onClose={mockOnClose} />)

    const input = screen.getByLabelText(/Upload/)
    await act(async () => {
      userEvent.upload(input, file)
    })

    const submitButton = screen.getByRole('button', { name: /Upload/ })
    await act(async () => {
      userEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByText('chuckles.json')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  it('handles file drop', async () => {
    const file = new File(['(⌐□_□)'], 'chuckles.json', {
      type: 'application/json',
    })

    render(<FileUploadDialog open={true} onClose={mockOnClose} />)

    const dropzone = screen.getByRole('dialog')

    await act(async () => {
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      })
    })

    await waitFor(() => {
      expect(screen.getByText('chuckles.json')).toBeInTheDocument()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })
})
