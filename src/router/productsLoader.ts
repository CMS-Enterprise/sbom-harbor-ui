/**
 * State loader for react-router data routes that require a user's single team.
 * @module sbom-harbor-ui/router/productsLoader
 * @see {@link @sbom-harbor-ui/dashboard/Routes}
 */
import { defer, Params } from 'react-router-dom'
import { Product } from '@/types'
import getJWT from '@/utils/getJWT'

const productsLoader = ({
  params: { productId = '' } = {} as unknown as Params<string>,
  request: { signal = new AbortController().signal },
}: {
  params: Params<string>
  request: Request
}) => {
  return defer({
    data: getJWT().then(() => {
      return [
        {
          id: '93efbb3e-beb0-4229-9a3c-d452a2f36e38',
          name: 'Test Product',
          vendor: {
            id: 'f7fa92e0-4e3f-4674-b9f8-100b1c2d1bd9',
            name: 'ABC Software Solutions',
          },
          lastUpload: '2023-07-25T03:47:12.798Z',
        },
      ] as Product[]
    }),
  })
}

export default productsLoader
