/**
 * The entry point for the SBOM Harbor UI application
 * @module sbom-harbor-ui/main
 */
import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import router from '@/router/router'
import { CONFIG } from '@/utils/config'
import configureCognito from '@/utils/configureCognito'

// IIFE that initializes the root node and renders the application.
;(async function () {
  configureCognito()

  // create the root element in the DOM
  const rootElement = document.getElementById('root') as HTMLElement

  // create the React root node and render the application
  ReactDOMClient.createRoot(rootElement).render(
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  )

  // if NODE_ENV is production, return early. otherwise, run dev tools.
  if (process.env.NODE_ENV === 'production') return
  // print the global app CONFIG to the console
  console.debug('Welcome to the Harbor!', CONFIG)

  function onPerfEntry(entry: any) {
    console.debug(entry)
  }

  // enable React performance measurement tools.
  // see https://create-react-app.dev/docs/measuring-performance/
  import('web-vitals').then(({ onCLS, onFID, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(onPerfEntry)
    onFID(onPerfEntry)
    onFCP(onPerfEntry)
    onINP(onPerfEntry)
    onLCP(onPerfEntry)
    onTTFB(onPerfEntry)
  })
})()
