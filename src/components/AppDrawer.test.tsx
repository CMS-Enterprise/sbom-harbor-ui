import { render, screen } from '@testing-library/react'
import AppDrawer from '@/components/AppDrawer'

const roleOptions = { hidden: true }

describe('AppDrawer', () => {
  it('should render the AppDrawer in open state', () => {
    render(<AppDrawer open />)
    const drawerElement = screen.getByRole('navigation', roleOptions)
    expect(drawerElement).toBeInTheDocument()
    expect(drawerElement.closest('div')).toBeVisible()
  })

  it('should render the AppDrawer in closed state', () => {
    render(<AppDrawer open={false} />)
    const drawerElement = screen.getByRole('navigation', roleOptions)
    expect(drawerElement).toBeInTheDocument()
    expect(drawerElement.closest('div')).toBeVisible()
    expect(drawerElement).toHaveClass('MuiDrawer-docked')
  })
})
