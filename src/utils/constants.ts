/**
 * @module @sbom-harbor-ui/dashboard/utils/constants
 * @exports CONFIG
 * @exports storageTokenKeyName
 */
import { AppConfig } from '@/types'

// parse `CONFIG` from environment variables
const apiUrl = `${process.env.VITE_CF_DOMAIN}/api`

/**
 * Set global configuration for the application provided by webpack (craco) at build time.
 * @see {@link @sbom-harbor-ui/dashboard/craco.config.js}.
 */
export const CONFIG = {
  CF_DOMAIN: process.env.VITE_CF_DOMAIN,
  API_URL: apiUrl,
  TEAM_API_URL: `${apiUrl}/v1/team`,
  TEAMS_API_URL: `${apiUrl}/v1/teams`,
  USER_API_URL: `${apiUrl}/v1/user`,
  USER_API_SEARCH_URL: `${apiUrl}/v1/user/search`,
  USER_POOL_ID: process.env.VITE_USER_POOL_ID,
  USER_POOL_CLIENT_ID: process.env.VITE_USER_POOL_CLIENT_ID,
  AWS_REGION: process.env.VITE_AWS_REGION,
} as AppConfig

export const DEFAULT_ALERT_TIMEOUT = 3000
