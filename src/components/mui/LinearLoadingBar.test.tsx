import * as React from 'react'
import { render } from '@testing-library/react'
import LinearLoadingBar from '@/components/mui/LinearLoadingBar'

describe('LinearLoadingBar', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<LinearLoadingBar />)

    // Expect the LinearProgress component to be in the document
    expect(getByRole('progressbar')).toBeInTheDocument()
  })
})
