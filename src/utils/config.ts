import { sanitizeUrlString } from '@/utils/sanitizeUrl'

/**
 * @module sbom-harbor-ui/utils/config
 * @exports CONFIG
 * @exports storageTokenKeyName
 */
export type AppConfig = {
  AWS_REGION: string | 'us-east-1'
  CF_DOMAIN: string

  // Cognito
  USER_POOL_ID: string
  USER_POOL_CLIENT_ID: string
  COGNITO_DOMAIN: string
  COGNITO_REDIRECT_SIGN_IN: string
  COGNITO_REDIRECT_SIGN_OUT: string

  // API URLs
  API_URL: string
  TEAM_API_URL: string
  TEAMS_API_URL: string
  USER_API_URL: string
  USER_API_SEARCH_URL: string
}

// parse `CONFIG` from environment variables
const apiUrl = sanitizeUrlString(`${process.env.VITE_CF_DOMAIN}/api`)

/**
 * Set global configuration for the application provided by webpack (craco) at build time.
 * @see {@link @sbom-harbor-ui/dashboard/craco.config.js}.
 */
const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  AWS_REGION: process.env.VITE_AWS_REGION,
  CF_DOMAIN: process.env.VITE_CF_DOMAIN,

  // Cognito
  USER_POOL_ID: process.env.VITE_USER_POOL_ID,
  USER_POOL_CLIENT_ID: process.env.VITE_USER_POOL_CLIENT_ID,
  COGNITO_DOMAIN: process.env.VITE_COGNITO_DOMAIN,
  COGNITO_REDIRECT_SIGN_IN: process.env.VITE_COGNITO_REDIRECT_SIGN_IN,
  COGNITO_REDIRECT_SIGN_OUT: process.env.VITE_COGNITO_REDIRECT_SIGN_OUT,

  // API URLs
  API_URL: apiUrl,
  TEAM_API_URL: sanitizeUrlString(`${apiUrl}/v1/team`),
  TEAMS_API_URL: sanitizeUrlString(`${apiUrl}/v1/teams`),
  USER_API_URL: sanitizeUrlString(`${apiUrl}/v1/user`),
  USER_API_SEARCH_URL: sanitizeUrlString(`${apiUrl}/v1/user/search`),
} as AppConfig

export default CONFIG
