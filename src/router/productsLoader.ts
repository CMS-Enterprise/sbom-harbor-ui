/**
 * State loader for react-router data routes that require a list of products.
 * @module sbom-harbor-ui/router/productsLoader
 */
import { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import getJWT from '@/utils/getJWT'
import { Product } from '@/types'
import { sampleData } from '@/views/Products/mocks'

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const jwt = await getJWT()
    // DEBUG: uncomment this when API is ready
    // const result = await fetch('/api/products')
    // DEBUG: remove this when API is ready
    const result = new Response(JSON.stringify(sampleData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })

    if (result.status !== 200) {
      throw new Error(`Something went wrong: ${result.statusText}`)
    }

    if (result.headers.get('content-type')?.includes('application/json')) {
      return result.json()
    }

    throw new Error('Response was not JSON')
  } catch (error) {
    const result = await new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
    return result.json()
  }
}

/**
 * Creates a query configuration object for fetching a list of products.
 * @return {Object} - The query configuration object.
 * @property {Array<string>} queryKey - The unique identifier for the query.
 * @property {Function} queryFn - The async function responsible for fetching the list of products.
 * @property {boolean} refetchOnWindowFocus - Determines whether the query should refetch when the window gains focus.
 * @property {number} staleTime - The duration in milliseconds after which the data is considered stale.
 * @property {boolean} suspense - Determines whether React Suspense should be enabled for this query.
 */
export const productsQuery = (): UseQueryOptions<
  Product[] | undefined,
  Error,
  Product[],
  ['products', 'list']
> & {
  initialData?: undefined
} => ({
  queryKey: ['products', 'list'],
  queryFn: async () => {
    const products = await fetchProducts()
    if (!products) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return products
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  suspense: true,
})

/**
 * Retrieves a list of products using the provided queryClient.
 * @param {QueryClient} queryClient - The query client instance used for fetching data.
 * @return {Promise<any>} - A promise that resolves to the list of products.
 */
const productsLoader = (queryClient: QueryClient) => async () => {
  const query = productsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

export default productsLoader
