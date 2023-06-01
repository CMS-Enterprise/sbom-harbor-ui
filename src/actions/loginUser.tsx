/**
 * @module sbom-harbor-ui/actions/loginUser
 */
import React from 'react'
import { Auth } from 'aws-amplify'
import { AuthActions } from '@/actions/actionTypes'
import { LoginParams } from '@/hooks/types'

export default async function loginUser(
  dispatch: React.Dispatch<{
    type: AuthActions
    payload?: unknown
    error?: Error
  }>,
  payload: LoginParams
) {
  try {
    dispatch({ type: AuthActions.LOGIN_REQUEST })
    const user = await Auth.signIn(payload.email, payload.password)
    const jwtToken = await (await Auth.currentSession())
      .getAccessToken()
      .getJwtToken()

    if (jwtToken) {
      const data = {
        jwtToken,
        email: user.attributes.email,
        teams: user.attributes['custom:teams'],
        username: user.getUsername(),
      }
      dispatch({ type: AuthActions.LOGIN_SUCCESS, payload: data })
      return data
    }

    return
  } catch (error) {
    console.warn(`Login failed for ${payload.email}`, error)
    dispatch({ type: AuthActions.LOGIN_FAILURE, error: error as Error })
  }
}
