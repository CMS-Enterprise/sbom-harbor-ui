import { render } from '@/test-utils'
import DrawerMenu from './DrawerMenu'

describe('DrawerMenu', () => {
  it('renders without crashing', () => {
    const { container } = render(<DrawerMenu />)
    expect(container).toBeInTheDocument()
  })
})
