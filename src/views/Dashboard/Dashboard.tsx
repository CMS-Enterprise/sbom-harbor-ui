/**
 * The default view that an authenticated user first sees when they visit the
 *  app. It renders a list of teams that the user is a member of, and a list
 *  of the api keys that the user has access to.
 * @module sbom-harbor-ui/views/Dashboard/Dashboard
 */
import * as React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fallback from '@/components/SimpleLoadingFallback'
import ProductsTable from '@/views/Uploads/components/ProductsTable'
import { Product } from '@/types'

const DashboardContainer = (): JSX.Element => {
  // hook for getting the route loader data
  const { data } = useLoaderData() as { data: Promise<Product[]> }

  return (
    <Box>
      <React.Suspense fallback={<Fallback />}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          My Products
        </Typography>
        <Await
          resolve={data}
          errorElement={<div>Could not load teams 😬</div>}
          // eslint-disable-next-line react/no-children-prop
          children={(resolvedData) => (
            <ProductsTable products={resolvedData} showId={false} />
          )}
        />
      </React.Suspense>
    </Box>
  )
}

export default DashboardContainer
