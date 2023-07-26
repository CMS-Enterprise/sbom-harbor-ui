/**
 * @module sbom-harbor-ui/views/Vendors/Vendor
 */
import { Suspense, useCallback } from 'react'
import { Await, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import List from '@/components/crud/List'
import { vendorQuery } from '@/router/vendorLoader'
import schema from './schema'

/**
 * React Suspense-aware Component for rendering a single Vendor's detail view.
 * Shows the name of the Vendor and the list of the Vendor's Products.
 * @return {JSX.Element} the Vendor's Products List view
 */
const VendorContainer: React.FC = (): JSX.Element => {
  const { vendorId } = useParams() as { vendorId: string }
  const { data } = useQuery(vendorQuery(vendorId))

  /**
   * Handles deletion of a vendor's product and removes it from the products list.
   * @param {string} id the product's ID
   * @todo implement deletion of a vendor's product
   */
  const handleDeleteVendorPackage = useCallback((id: string) => {
    console.debug('handleDeleteVendorPackage: ', id)
  }, [])

  return (
    <Suspense fallback={<LinearIndeterminate />}>
      {/* Vendor Page Title */}
      <Await
        resolve={data}
        errorElement={<div>Could not load teams 😬</div>}
        // eslint-disable-next-line react/no-children-prop
        children={(resolvedData) => (
          <Stack spacing={4}>
            <Typography variant="h4">{resolvedData.name}</Typography>

            <Stack spacing={1}>
              <Typography variant="h6">Vendor&apos;s Products List</Typography>
              <List
                items={resolvedData.products}
                schema={schema}
                deleteItem={handleDeleteVendorPackage}
                actions={{
                  view: {
                    to: (id: string) => `../products/${id}`,
                  },
                }}
              />
            </Stack>
          </Stack>
        )}
      />
    </Suspense>
  )
}

export default VendorContainer
