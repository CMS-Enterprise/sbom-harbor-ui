/**
 * @module sbom-harbor-ui/views/Vendors/Vendor
 */
import { Suspense, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
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
const VendorContainer: React.FC<void> = (): JSX.Element => {
  const { vendorId } = useParams() as { vendorId: string }

  const { data: { name = 'Unnamed Vendor', products = [] } = {}, isLoading } =
    useQuery(vendorQuery(vendorId))

  /**
   * Handles deletion of a vendor's product and removes it from the products list
   * @param {string} id the product's ID
   * @todo implement deletion of a vendor's product
   */
  const handleDeleteVendorPackage = useCallback((id: string) => {
    console.debug('handleDeleteVendorPackage: ', id)
  }, [])

  return (
    <Suspense fallback={<LinearIndeterminate />}>
      {/* Vendor Page Title */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        {name}
      </Typography>
      {/* Vendor's Products List */}
      <List
        items={products || []}
        schema={schema}
        deleteItem={handleDeleteVendorPackage}
      />
      )
    </Suspense>
  )
}

export default VendorContainer
