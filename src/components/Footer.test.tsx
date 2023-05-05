import { render, screen } from '@testing-library/react'
import StickyFooter from '@/components/Footer'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/utils/theme'
import { COPYRIGHT_LABEL } from '@/constants'

describe('StickyFooter', () => {
  const renderWithTheme = () => {
    render(
      <ThemeProvider theme={theme}>
        <StickyFooter />
      </ThemeProvider>
    )
  }

  it('should render the StickyFooter with light theme', () => {
    renderWithTheme()
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveStyle(
      `background-color: ${theme.palette.grey[200]}`
    )
  })

  it('should render the Copyright component', () => {
    renderWithTheme()
    const copyrightElement = screen.getByText(new RegExp(`${COPYRIGHT_LABEL}`))
    expect(copyrightElement).toBeInTheDocument()
  })
})
