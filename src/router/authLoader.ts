/**
 * Auth state loader for react-router data routes.
 * @module @sbom-harbor-ui/dashboard/loaders/authLoader
 * @see {@link @sbom-harbor-ui/dashboard/Routes}
 */
import { defer } from 'react-router-dom'
import getJWT from '@/utils/getJWT'

const authLoader = async () => {
  return defer({
    jwtToken: getJWT(),
  })
}

export default authLoader
