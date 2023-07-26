/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorsLoader
 */
import getJWT from '@/utils/getJWT'
import { Vendor } from '@/types'
import { QueryClient } from 'react-query'
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

export const vendorsQuery = () => ({
  queryKey: ['vendors', 'list'],
  queryFn: async () => fetchVendors(),
  options: {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    suspense: true,
  },
})

const vendorsLoader = (queryClient: QueryClient) => async () => {
  const query = vendorsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

export default vendorsLoader
