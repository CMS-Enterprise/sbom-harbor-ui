import { RouterProviderProps } from 'react-router-dom'
import { type AppConfig } from '@/utils/config'

/**
 * These tests use sandbox registry for the modules that are loaded inside each test function.
 * This is necessary because the IIFE in src/main.tsx is run when the module is loaded.
 * The sandbox registry allows us to isolate the modules that are loaded inside each test function.
 */
describe('src/main.tsx', () => {
  let CONFIG: AppConfig

  let mockConfigureCognito: jest.Mock
  let mockRender: jest.Mock
  let mockCreateRoot: jest.Mock
  let mockConsoleDebug: jest.Mock

  beforeAll(() => {
    jest.clearAllMocks()
    // @ts-ignore
    delete window.location
    // @ts-ignore
    window.location = new URL('http://test.com')
    document.body.innerHTML = '<div id="root"></div>'
  })

  beforeEach(() => {
    jest.clearAllMocks()

    jest.isolateModules(() => {
      mockConsoleDebug = jest.fn()
      mockConfigureCognito = jest.fn()
      mockRender = jest.fn()
      mockCreateRoot = jest.fn(() => ({
        render: mockRender,
      }))

      // @ts-ignore
      global.console = { log: console.log, debug: mockConsoleDebug }

      jest.doMock('react-dom/client', () => ({
        createRoot: mockCreateRoot,
      }))

      jest.doMock('@/utils/configureCognito', () => ({
        default: mockConfigureCognito,
        configureCognito: mockConfigureCognito,
      }))

      require('react-dom/client').default
      CONFIG = require('@/utils/config').default
    })
  })

  it('calls configureCognito', () => {
    jest.isolateModules(() => {
      // require main to run the IIFE inside an isolated module
      require('@/main')
      // expect configureCognito to have been called once after the IIFE runs
      expect(mockConfigureCognito).toHaveBeenCalledTimes(1)
      // expect(mockConfigureCognito).toHaveBeenCalledWith()
    })
  })

  it('creates and renders the root React node', () => {
    jest.isolateModules(() => {
      // require main to run the IIFE inside an isolated module
      require('@/main')
      // expect the root node to be created and the application to be rendered
      expect(mockConfigureCognito).toHaveBeenCalledTimes(1)
      expect(mockCreateRoot).toHaveBeenCalledWith(
        document.getElementById('root')
      )
      expect(mockRender).toHaveBeenCalledTimes(1)
    })
  })

  it('logs config and imports web-vitals in development mode', () => {
    process.env.NODE_ENV = 'development'
    // use a sandbox registry for the modules that are loaded inside the callback function
    jest.isolateModules(async () => {
      // require main to run the IIFE inside an isolated module
      require('@/main')
      // expect the config to be logged to the console at the debug level
      expect(mockConsoleDebug).toHaveBeenCalledWith(
        'Welcome to the Harbor!',
        CONFIG
      )
      // import global mock of web-vitals to verify that the on* functions were called
      const { onCLS, onFID, onFCP, onINP, onLCP, onTTFB } = await import(
        'web-vitals'
      )
      // expect the on* functions to have been called
      expect(onCLS).toHaveBeenCalled()
      expect(onFID).toHaveBeenCalled()
      expect(onFCP).toHaveBeenCalled()
      expect(onINP).toHaveBeenCalled()
      expect(onLCP).toHaveBeenCalled()
      expect(onTTFB).toHaveBeenCalled()
    })
  })

  it('does not log config or import web-vitals in production mode', () => {
    process.env.NODE_ENV = 'production'
    // use a sandbox registry for the modules that are loaded inside the callback function
    jest.isolateModules(async () => {
      // require main to run the IIFE inside an isolated module
      require('@/main')
      // expect the config to not be logged to the console
      expect(mockConsoleDebug).not.toHaveBeenCalled()
      // import global mock of web-vitals and verify that the on* functions were called
      const { onCLS, onFID, onFCP, onINP, onLCP, onTTFB } = await import(
        'web-vitals'
      )
      // expect the on* functions to not have been called
      expect(onCLS).not.toHaveBeenCalled()
      expect(onFID).not.toHaveBeenCalled()
      expect(onFCP).not.toHaveBeenCalled()
      expect(onINP).not.toHaveBeenCalled()
      expect(onLCP).not.toHaveBeenCalled()
      expect(onTTFB).not.toHaveBeenCalled()
    })
  })
})
