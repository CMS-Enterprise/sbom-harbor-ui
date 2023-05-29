/**
 * @module sbom-harbor-ui/actions/logoutUser
 */
import * as React from 'react'
import { Auth } from 'aws-amplify'
import { AuthActions } from '@/actions/actionTypes'

export default async function logoutUser(dispatch: React.Dispatch<any>) {
  await Auth.signOut()
  dispatch({ type: AuthActions.LOGOUT })
}
