import { createContext } from 'react'
import AuthStateContext from '@/store/auth/AuthStateContext'
import { INITIAL_STATE } from '@/store/auth/constants'

describe('AuthStateContext', () => {
  it('should create a context with the provided initial state', () => {
    const context = createContext(INITIAL_STATE)
    expect(context).toBeDefined()
    expect(context).not.toBeNull()
    expect(context.Consumer).toEqual(AuthStateContext.Consumer)
  })
})
