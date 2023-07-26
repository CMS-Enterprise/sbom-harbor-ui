import { Vendor } from '@/types'

export const sampleData: Vendor[] = [
  {
    id: 'f7fa92e0-4e3f-4674-b9f8-100b1c2d1bd9',
    name: 'ABC Software Solutions',
    description: 'We provide cutting-edge software solutions for businesses.',
    contact: 'John Smith',
    email: 'john.smith@abcsoftwaresolutions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'Los Angeles',
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
