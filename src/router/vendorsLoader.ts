/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorsLoader
 */
import getJWT from '@/utils/getJWT'
import { Vendor } from '@/types'
import { QueryClient } from 'react-query'

export const sampleData: Vendor[] = [
  {
    id: 'f7fa92e0-4e3f-4674-b9f8-100b1c2d1bd9',
    name: 'ABC Software Solutions',
    description: 'We provide cutting-edge software solutions for businesses.',
    contact: 'John Smith',
    email: 'john.smith@abcsoftwaresolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'Anytown',
    state: 'California',
    zip: '12345',
    country: 'United States',
    website: 'www.abcsoftwaresolutions.com',
    notes:
      'Please feel free to reach out to us for any inquiries or support requests.',
    products: [
      {
        id: '93efbb3e-beb0-4229-9a3c-d452a2f36e38',
        name: 'Test Product',
        lastUpload: '2023-07-25T03:47:12.798Z',
      },
    ],
  },
]

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
