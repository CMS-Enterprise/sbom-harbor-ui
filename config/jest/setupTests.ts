/**
 * @module @cyclone-dx/ui/sbom/utils/setupTests
 */
// global mocks
jest.mock('aws-amplify')
jest.mock('web-vitals')

// enable mocking of fetch requests
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

if (process.env.NODE_ENV === 'test') {
  // mock environment variables for the global app config during tests
  process.env.VITE_AWS_REGION = 'us-east-1'
  process.env.VITE_CF_DOMAIN = 'https://localhost:3000/'
  process.env.VITE_USER_POOL_ID = 'us-east-1_123456789'
  process.env.VITE_USER_POOL_CLIENT_ID = '1234567890123456789012'
}

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
})

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(),
})
