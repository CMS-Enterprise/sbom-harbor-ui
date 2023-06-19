/**
 * Action that logs in the current Cognito user using federated sign in.
 * @module sbom-harbor-ui/actions/loginUserFederated
 */
import React from 'react'
import { Auth } from 'aws-amplify'
import { AuthActions } from '@/actions/actionTypes'

export default async function loginUserFederated(
  dispatch: React.Dispatch<{
    type: AuthActions
    payload?: unknown
    error?: Error
  }>
) {
  try {
    dispatch({ type: AuthActions.LOGIN_REQUEST })
    const user = await Auth.federatedSignIn()
    const jwtToken = await (await Auth.currentSession())
      .getAccessToken()
      .getJwtToken()

    if (!jwtToken) {
      throw new Error('No JWT token found')
    }

    const {
      accessKeyId,
      sessionToken,
      secretAccessKey,
      identityId,
      authenticated,
      expiration,
    } = user

    const data = {
      accessKeyId,
      sessionToken,
      secretAccessKey,
      identityId,
      authenticated,
      expiration,
    }

    dispatch({ type: AuthActions.LOGIN_SUCCESS, payload: data })
    return data
  } catch (error) {
    dispatch({ type: AuthActions.LOGIN_FAILURE, error: error as Error })
  }
}
