/**
 * @module sbom-harbor-ui/views/Products/Products
 */
import { Suspense, useCallback } from 'react'
import { Await } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import List from '@/components/crud/List'
import { productsQuery } from '@/router/productsLoader'
import schema from './schema'

/**
 * React Suspense-aware Component for rendering all products in a list view.
 * @return {JSX.Element} the products list view
 */
const ProductsContainer: React.FC = (): JSX.Element => {
  const { data } = useQuery(productsQuery())

  /**
   * Handles deletion of a product's product and removes it from the products list.
   * @param {string} id the product's ID
   * @todo implement deletion of a product's product
   */
  const handleDeleteProductPackage = useCallback((id: string) => {
    console.debug('handleDeleteProductPackage: ', id)
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
              Products List
            </Typography>
            <List
              items={resolvedData}
              schema={schema}
              deleteItem={handleDeleteProductPackage}
            />
          </>
        )}
      />
    </Suspense>
  )
}

export default ProductsContainer
