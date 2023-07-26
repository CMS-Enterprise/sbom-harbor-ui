/**
 * @module sbom-harbor-ui/views/Products/Products
 */
import React, { Suspense, useCallback } from 'react'
import { useQuery } from 'react-query'
import Typography from '@mui/material/Typography'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import List from '@/components/crud/List'
import { Product } from '@/types'
import schema from './schema'

/**
 * Does GET /api/products and returns the response body as JSON if the Content-Type
 *  header includes application/json, otherwise returns an empty array.
 * @return {Promise.<Product[]>} the response body as JSON or an empty array.
 * @todo refactor this to a routeLoader with react-query
 */
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const result = await fetch('/api/products')
    if (result.headers.get('content-type')?.includes('application/json')) {
      return result.json()
    }
    throw new Error('Response was not JSON')
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * Component for rendering the Products List view.
 * @return {JSX.Element} the Products List view
 * @todo refactor this to a routeLoader with react-query
 */
const ProductsContainer: React.FC<void> = (): JSX.Element => {
  const { data: products = [], isLoading } = useQuery(
    ['products', 'list'],
    fetchProducts,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  )

  /**
   * Handles deletion of a product and removes it from the products list.
   * This is the functional equivalent of handleDeleteVendorPackage from src/views/Vendors/Vendor.tsx
   * @param {string} id the product's ID
   * @todo implement deletion of a product
   */
  const handleDelete = useCallback((id: string) => {
    console.debug('handleDelete: ', id)
  }, [])

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products List
      </Typography>
      <Suspense fallback={<LinearIndeterminate />}>
        <List items={products} schema={schema} deleteItem={handleDelete} />
      </Suspense>
    </>
  )
}

export default ProductsContainer
