/**
 * State loader for react-router data routes that require a list of vendors.
 * @module sbom-harbor-ui/router/vendorsLoader
 */
import { defer, LoaderFunctionArgs } from 'react-router-dom'
import { Vendor } from '@/views/Vendors/types'
import getJWT from '@/utils/getJWT'

const sampleData: Vendor[] = [
  {
    id: '1',
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
  },
]

const vendorsLoader = ({ params = {}, request }: LoaderFunctionArgs) => {
  return defer({
    data: getJWT().then(() => {
      console.debug('vendorsLoader params', params, request)

      return sampleData as Vendor[]
    }),
  })
}

export default vendorsLoader
