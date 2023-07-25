// test-utils.tsx
import React, { PropsWithChildren } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const render = (ui: React.ReactElement, options?: Record<string, unknown>) => {
  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
