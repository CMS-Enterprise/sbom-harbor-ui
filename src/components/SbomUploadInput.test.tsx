import { v4 as uuidv4 } from 'uuid'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SbomUploadInput from '@/components/SbomUploadInput'

const inputProps = {
  teamId: uuidv4(),
  projectId: uuidv4(),
  codebaseId: uuidv4(),
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => ({
    tokens: {
      'some-token': {
        id: 'some-token',
        name: 'some-token',
        token: 'sbom-api-abcdefg',
        enabled: true,
        created: new Date().toLocaleDateString(),
        expires: new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toLocaleDateString(),
      },
    },
  }),
}))

test('should render a label and a file input field', async () => {
  render(<SbomUploadInput {...inputProps} />)
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('heading')).toHaveTextContent('Upload SBOM')
})

test.skip('should upload a file when one is selected', async () => {
  const user = userEvent.setup()

  render(<SbomUploadInput {...inputProps} />)

  // create a mock SBOM file
  const fileContents = JSON.stringify({
    bomFormat: 'SPDX',
    bomFormatVersion: '2.2',
    bomSpecVersion: '2.2',
    specVersion: '2.2',
  })

  const blob = new Blob([fileContents])
  const file = new File([blob], 'sbom.json', { type: 'application/JSON' })
  File.prototype.text = jest.fn().mockResolvedValueOnce(fileContents)

  // trigger the file upload event
  act(() => {
    user.upload(screen.getByTestId('file-input'), file)
  })

  // assert that fetch was called
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
})
