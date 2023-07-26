/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorLoader
 */
import { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { Params } from 'react-router-dom'
import { Vendor } from '@/types'
import getJWT from '@/utils/getJWT'
import { sampleData } from '@/views/Vendors/mocks'

const fetchVendor = async (id: string): Promise<Vendor | undefined> => {
  try {
    const jwt = await getJWT()
    // DEBUG: uncomment this when API is ready
    // const result = await fetch(`/api/vendor/${id}`)
    // DEBUG: remove this when API is ready
    const result = new Response(JSON.stringify(sampleData[0]), {
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
    const result = await new Response(JSON.stringify({}), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
    return result.json()
  }
}

/**
 * Creates a react-query configuration object for fetching vendor data.
 * @param {string} id - The ID of the vendor.
 * @return {Object} - The query configuration object.
 * @property {Array<string>} queryKey - The unique identifier for the query.
 * @property {Function} queryFn - The async function responsible for fetching the vendor data.
 * @property {Object} options - Additional configuration options for the query.
 * @property {boolean} options.refetchOnWindowFocus - Determines whether the query should refetch when the window gains focus.
 * @property {number} options.staleTime - The duration in milliseconds after which the data is considered stale.
 * @property {boolean} options.suspense - Determines whether React Suspense should be enabled for this query.
 */
export const vendorQuery = (
  id: string
): UseQueryOptions<
  Vendor | undefined,
  Error,
  Vendor,
  ['contacts', 'detail', string]
> & {
  initialData?: undefined
} => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => {
    const vendor = await fetchVendor(id)
    if (!vendor) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    return vendor
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  suspense: true,
})

/**
 * Retrieves vendor data from the provided queryClient based on the given vendor ID.
 * @param {QueryClient} queryClient - The query client instance used for fetching data.
 * @param {Object} options - The options object.
 * @param {string} options.params.id - The ID of the vendor.
 * @return {Promise<any>} - A promise that resolves to the vendor data.
 * @throws {Error} - Throws an error if no vendor ID is provided.
 */
const vendorLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }) => {
    if (!params?.id) {
      return new Response(JSON.stringify({}), {
        status: 500,
      })
    }
    const query = vendorQuery(params.id)
    const { queryKey } = query
    return (
      queryClient.getQueryData(queryKey) ??
      (await queryClient.fetchQuery(query))
    )
  }

export default vendorLoader
