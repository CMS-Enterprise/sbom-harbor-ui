import { render, screen } from '@testing-library/react'
import AppBar from '@/components/AppBar'

describe('AppBar', () => {
  it('should render the AppBar with closed drawer', () => {
    render(<AppBar open={false} />)
    const appBarElement = screen.getByRole('banner')
    expect(appBarElement).toBeInTheDocument()
    expect(appBarElement).toHaveStyle(`width: 100%`)
  })

  it('should render the AppBar with opened drawer', () => {
    render(<AppBar open />)
    const appBarElement = screen.getByRole('banner')
    expect(appBarElement).toBeInTheDocument()
    expect(appBarElement).toHaveStyle('width: 100%')
  })
})
