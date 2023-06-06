/**
 * The default view that an authenticated user first sees when they visit the
 *  app. It renders a list of teams that the user is a member of, and a list
 *  of the api keys that the user has access to.
 * @module sbom-harbor-ui/views/Dashboard/Dashboard
 */
import * as React from 'react'
import { useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProductsTable from '@/views/Dashboard/Uploads/components/ProductsTable'

const DashboardContainer = (): JSX.Element => {
  // hook for getting the route loader data
  const { data } = useLoaderData() as { data: Promise<[]> }

  React.useEffect(() => {
    data.then((products: []) => {
      console.log('products', products)
    })
  }, [data])

  return (
    <Box>
      <Typography variant="h4">My Products</Typography>
      <ProductsTable />
    </Box>
  )
}
export default DashboardContainer
