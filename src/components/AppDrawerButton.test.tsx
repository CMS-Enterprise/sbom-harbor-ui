import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'
import AppDrawerButton from '@/components/AppDrawerButton'

describe('AppDrawerButton', () => {
  const mockProps = {
    label: 'Test Button',
    to: '/test',
    icon: (
      <SvgIcon titleAccess="Test icon">
        <path d="M0 0h24v24H0z" fill="none" />
      </SvgIcon>
    ),
  }

  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppDrawerButton {...mockProps} />
      </BrowserRouter>
    )
  })

  it('should render the button with the given label', () => {
    const button = screen.getByRole('button', { name: /Test Button/i })
    expect(button).toBeInTheDocument()
  })

  it('should render the icon', () => {
    const icon = screen.getByTitle(/test icon/i)
    expect(icon).toBeInTheDocument()
  })

  it('should navigate to the given URL when the button is clicked', () => {
    const link = screen.getByRole('link', { name: /Test Button/i })
    expect(link).toHaveAttribute('href', '/test')
  })
})
