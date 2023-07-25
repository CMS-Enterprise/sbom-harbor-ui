import { render } from '@testing-library/react'
import DrawerProvider from './DrawerProvider'

describe('DrawerProvider', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <DrawerProvider>
        <>Hello world.</>
      </DrawerProvider>
    )
    expect(container).toBeInTheDocument()
    expect(getByText('Hello world.')).toBeInTheDocument()
  })
})
