import { render } from '@/test-utils'
import Drawer from './Drawer'

describe('Drawer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Drawer />)
    expect(container).toBeInTheDocument()
  })
})
