import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  })

  it('should render the Header', () => {
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })

  it('should render the AppBar', () => {
    const appBarElement = screen.getByRole('toolbar')
    expect(appBarElement).toBeInTheDocument()
  })

  it('should render the app title', () => {
    const titleElement = screen.getByText('SBOM Harbor')
    expect(titleElement).toBeInTheDocument()
  })

  it('should render the AuthButton', () => {
    const authButtonElement = screen.getByRole('button')
    expect(authButtonElement).toBeInTheDocument()
  })
})
