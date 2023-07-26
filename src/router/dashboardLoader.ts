/**
 * State loader for react-router data routes that require a user's single team.
 * @module sbom-harbor-ui/router/productsLoader
 * @see {@link @sbom-harbor-ui/dashboard/Routes}
 */
import { defer, Params } from 'react-router-dom'
import getJWT from '@/utils/getJWT'
import { sampleData } from '@/views/Products/mocks'

const productsLoader = ({
  params: { productId = '' } = {} as unknown as Params<string>,
  request: { signal = new AbortController().signal },
}: {
  params: Params<string>
  request: Request
}) => {
  return defer({
    data: getJWT().then(() => {
      return sampleData
    }),
  })
}

export default productsLoader
