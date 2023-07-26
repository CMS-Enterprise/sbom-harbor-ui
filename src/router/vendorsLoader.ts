/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorsLoader
 */
import { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import getJWT from '@/utils/getJWT'
import { Vendor } from '@/types'
import { sampleData } from '@/views/Vendors/mocks'

const fetchVendors = async (): Promise<Vendor[]> => {
  try {
    const jwt = await getJWT()
    // DEBUG: uncomment this when API is ready
    // const result = await fetch('/api/vendors')
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
 * Creates a query configuration object for fetching a list of vendors.
 * @return {Object} - The query configuration object.
 * @property {Array<string>} queryKey - The unique identifier for the query.
 * @property {Function} queryFn - The async function responsible for fetching the list of vendors.
 * @property {boolean} refetchOnWindowFocus - Determines whether the query should refetch when the window gains focus.
 * @property {number} staleTime - The duration in milliseconds after which the data is considered stale.
 * @property {boolean} suspense - Determines whether React Suspense should be enabled for this query.
 */
export const vendorsQuery = (): UseQueryOptions<
  Vendor[] | undefined,
  Error,
  Vendor[],
  ['vendors', 'list']
> & {
  initialData?: undefined
} => ({
  queryKey: ['vendors', 'list'],
  queryFn: async () => {
    const vendors = await fetchVendors()
    if (!vendors) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return vendors
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  suspense: true,
})

/**
 * Retrieves a list of vendors using the provided queryClient.
 * @param {QueryClient} queryClient - The query client instance used for fetching data.
 * @return {Promise<any>} - A promise that resolves to the list of vendors.
 */
const vendorsLoader = (queryClient: QueryClient) => async () => {
  const query = vendorsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

export default vendorsLoader
