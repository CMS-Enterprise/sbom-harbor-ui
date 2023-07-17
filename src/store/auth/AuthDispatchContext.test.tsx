import { createContext } from 'react'
import AuthDispatchContext from '@/store/auth/AuthDispatchContext'
import { AuthActionParams } from '@/store/auth/types'

describe('AuthDispatchContext', () => {
  it('should create a context with the provided value', () => {
    const context = createContext((value: AuthActionParams) => value)

    // @ts-expect-error
    delete context.Consumer._context
    // @ts-expect-error
    delete context.Provider._context
    // @ts-expect-error
    delete AuthDispatchContext.Consumer._context
    // @ts-expect-error
    delete AuthDispatchContext.Provider._context

    expect(context).toBeDefined()
    expect(context).not.toBeNull()
    expect(JSON.stringify(context)).toEqual(JSON.stringify(AuthDispatchContext))
  })
})
