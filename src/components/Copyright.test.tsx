import { render, screen } from '@testing-library/react'
import Copyright from '@/components/Copyright'
import { COPYRIGHT_LABEL, ORG_NAME, ORG_URL } from '@/constants'

describe('Copyright', () => {
  beforeEach(() => {
    render(<Copyright />)
  })

  it('should render the copyright statement', () => {
    const copyrightStatement = screen.getByText(
      new RegExp(`${COPYRIGHT_LABEL}`, 'i')
    )
    expect(copyrightStatement).toBeInTheDocument()
  })

  it('should render the current year', () => {
    const currentYear = new Date().getFullYear().toString()
    const yearElement = screen.getByText(new RegExp(currentYear, 'i'))
    expect(yearElement).toBeInTheDocument()
  })

  it('should render a link to the CMS website', async () => {
    const linkElement = screen.getByRole('link', {
      name: ORG_NAME,
    })
    expect(linkElement).toHaveAttribute('href', ORG_URL)
  })
})
