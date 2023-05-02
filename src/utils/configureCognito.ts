import { Amplify } from 'aws-amplify'
import { CONFIG } from '@/utils/constants'

/**
 * Initializes and configures Amazon Cognito auth.
 * This is used as the root loader for the data router.
 * @see {@link @sbom-harbor-ui/dashboard/router/routes.tsx}
 */
export function configureCognito(): null {
  // TODO: remove this once Cognito is configured
  if (
    !CONFIG.AWS_REGION ||
    !CONFIG.USER_POOL_ID ||
    !CONFIG.USER_POOL_CLIENT_ID
  ) {
    return null
  }

  // Configure Amplify Auth with the Cognito User Pool
  Amplify.configure({
    region: CONFIG.AWS_REGION,
    userPoolId: CONFIG.USER_POOL_ID || new Error('USER_POOL_ID is not defined'),
    userPoolWebClientId:
      CONFIG.USER_POOL_CLIENT_ID ||
      new Error('USER_POOL_CLIENT_ID is not defined'),
  })

  // a loader has to return something or null
  return null
}

export default configureCognito
