import { render, fireEvent, screen } from '@testing-library/react'
import UploadFileCell from '@/components/MultiDropzone/UploadFileCell'
import { UploadStatus, UploadedFile } from '@/components/MultiDropzone/types'

describe('UploadFileCell', () => {
  const mockFile: UploadedFile = {
    id: '1',
    name: 'testFile.json',
    progress: 0,
    error: '',
  }

  const handleRemove = jest.fn()

  it('renders correctly when uploading', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={true}
        uploadStatus={UploadStatus.UPLOADING}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByText(/Uploading.../i)).toBeInTheDocument()
    expect(screen.getByText(/testFile.json/)).toBeInTheDocument()
  })

  it('renders correctly when upload is complete', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={false}
        uploadStatus={UploadStatus.COMPLETE}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
    expect(screen.getByText(/testFile.json/i)).toBeInTheDocument()
  })

  it('renders correctly when there is an error after uploading is done', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={false}
        uploadStatus={UploadStatus.ERROR}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
    expect(screen.getByText('testFile.json')).toBeInTheDocument()
  })

  it('renders correctly when there is an error', () => {
    render(
      <UploadFileCell
        file={{
          ...mockFile,
          error: 'Something went wrong. Try again.',
        }}
        uploading={false}
        uploadStatus={UploadStatus.ERROR}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
    expect(screen.getByText(/testFile.json/)).toBeInTheDocument()
  })

  it('renders correctly when there is an error while uploading is active', () => {
    render(
      <UploadFileCell
        file={{
          ...mockFile,
          error: 'Something went wrong. Try again.',
        }}
        uploading={true}
        uploadStatus={UploadStatus.ERROR}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByText(/testFile.json/)).toBeInTheDocument()
    expect(
      screen.getByText(/Something went wrong. Try again./i)
    ).toBeInTheDocument()
  })

  it('calls onRemoveFile when delete button is clicked', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={false}
        uploadStatus={UploadStatus.UPLOADING}
        onRemoveFile={handleRemove}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('renders progress bar when showProgressBar and does not render CircularProgress with default file arguments', () => {
    const testFile = { ...mockFile }
    render(
      <UploadFileCell
        file={testFile}
        uploading={true}
        uploadStatus={UploadStatus.UPLOADING}
        onRemoveFile={handleRemove}
      />
    )
    const progressBars = screen.getAllByRole('progressbar')
    expect(
      progressBars.find((e) => e.classList.contains('MuiCircularProgress-root'))
    ).not.toBeDefined()
    expect(
      progressBars.find((e) => e.classList.contains('MuiLinearProgress-root'))
    ).toBeInTheDocument()
  })

  it('renders CircularProgress when showLoadingSpinner is true', () => {
    const testFile = { ...mockFile, showLoadingSpinner: true }
    render(
      <UploadFileCell
        file={testFile}
        uploading={true}
        uploadStatus={UploadStatus.UPLOADING}
        onRemoveFile={handleRemove}
      />
    )
    expect(
      screen
        .getAllByRole('progressbar')
        .find((e) => e.classList.contains('MuiCircularProgress-root'))
    ).toBeInTheDocument()
  })

  it('renders DeleteIcon when upload is not complete and not uploading', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={false}
        uploadStatus={UploadStatus.UPLOADING}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument()
  })

  it('renders ErrorIcon when hasError is true', () => {
    render(
      <UploadFileCell
        file={mockFile}
        uploading={false}
        uploadStatus={UploadStatus.ERROR}
        onRemoveFile={handleRemove}
      />
    )
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
  })
})
