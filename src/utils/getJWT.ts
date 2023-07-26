/**
 * Helper to return the Cognito JWT Token from the current session.
 * @module sbom-harbor-ui/utils/getJWT
 */
import { Auth } from 'aws-amplify'
import AuthError from '@/errors/AuthError'

/**
 * Get the Cognito JWT Token from the current session.
 * @returns {Promise<string>} The Cognito JWT Token.
 */
const getJWT = async (): Promise<string> => {
  const session = await Auth.currentSession()
  const jwtToken = session.getAccessToken().getJwtToken()
  if (!jwtToken) {
    throw new AuthError().toResponse()
  }
  return jwtToken
}

export default getJWT
