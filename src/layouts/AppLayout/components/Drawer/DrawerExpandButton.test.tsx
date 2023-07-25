import { fireEvent, getByRole } from '@testing-library/react'
import { render } from '@/test-utils'
import DrawerExpandButton from './DrawerExpandButton'
import useDrawer from './useDrawer'

jest.mock('./useDrawer') // Mock the custom hook

describe('DrawerExpandButton', () => {
  let toggleDrawer: jest.Mock
  const mockUseDrawer = useDrawer as jest.Mock

  beforeEach(() => {
    toggleDrawer = jest.fn()
    mockUseDrawer.mockReturnValue({ open: false, toggleDrawer })
  })

  it('renders without crashing', () => {
    mockUseDrawer.mockReturnValue({ open: false, toggleDrawer })
    const { getByRole } = render(<DrawerExpandButton />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('displays the correct icon based on drawer state', () => {
    // start with closed drawer
    mockUseDrawer.mockReturnValue({ open: false, toggleDrawer })

    // render a <DrawerExpandButton />,
    const { container, rerender, getByLabelText } = render(
      <DrawerExpandButton />
    )

    // since the drawer is closed, the button should display
    // the icon for opening the drawer (i.e., the menu icon).
    expect(getByRole(container, 'button')).toBeInTheDocument()
    // it should be labeled as "open drawer" and not "close drawer"
    expect(getByLabelText('open drawer')).toBeInTheDocument()

    // change to open drawer and rerender the component.
    mockUseDrawer.mockReturnValue({ open: true, toggleDrawer })
    rerender(<DrawerExpandButton />)

    // now that the drawer is open, the button should display
    // the icon for closing the drawer (i.e., the chevron icon).
    expect(getByRole(container, 'button')).toBeInTheDocument()
    // it should be labeled as "close drawer" and not "open drawer"
    expect(getByLabelText('close drawer')).toBeInTheDocument()
  })

  it('calls toggleDrawer when clicked', () => {
    mockUseDrawer.mockReturnValue({ open: false, toggleDrawer })
    const { getByRole } = render(<DrawerExpandButton />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(toggleDrawer).toHaveBeenCalled()
  })
})
