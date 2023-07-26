/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorLoader
 */
import { QueryClient } from 'react-query'
import { Params } from 'react-router-dom'
import { Vendor } from '@/types'
import getJWT from '@/utils/getJWT'
import { sampleData } from '@/views/Vendors/mocks'

const fetchVendor = async (id: string): Promise<Vendor> => {
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

export const vendorQuery = (id: string) => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => fetchVendor(id),
  options: {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    suspense: true,
  },
})

const vendorLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<string> }) => {
    if (!params?.id) {
      return Error('No vendor ID provided')
    }
    const query = vendorQuery(params.id)
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    )
  }

export default vendorLoader
