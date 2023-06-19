/**
 * Dispatch action types.
 * @module sbom-harbor-ui/actions/actionTypes
 */

export enum AuthActions {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
}

export type AuthActionType = {
  type: AuthActions
  payload?: any
  error?: Error
}
