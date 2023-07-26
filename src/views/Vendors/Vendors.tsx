/**
 * @module sbom-harbor-ui/views/Vendors/Vendors
 */
import { Suspense, useCallback } from 'react'
import { Await } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import List from '@/components/crud/List'
import { vendorsQuery } from '@/router/vendorsLoader'
import schema from './schema'

/**
 * React Suspense-aware Component for rendering all vendors in a list view.
 * @return {JSX.Element} the vendors list view
 */
const VendorsContainer: React.FC = (): JSX.Element => {
  const { data } = useQuery(vendorsQuery())

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
      <Await
        resolve={data}
        errorElement={<div>Could not load teams 😬</div>}
        // eslint-disable-next-line react/no-children-prop
        children={(resolvedData) => (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Vendors List
            </Typography>
            <List
              items={resolvedData}
              schema={schema}
              deleteItem={handleDeleteVendorPackage}
            />
          </>
        )}
      />
    </Suspense>
  )
}

export default VendorsContainer
