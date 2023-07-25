/**
 * @module sbom-harbor-ui/views/Products/Products
 */
import { Suspense, useEffect } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { useQuery } from 'react-query'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Fallback from '@/components/SimpleLoadingFallback'
import List from '@/components/crud/List'
import { Product } from '@/types'

const schema = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
  },
]

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

const ProductsContainer = (): JSX.Element => {
  // hook for getting the route loader data
  const { data: loaderData, isLoading: isLoaderDataLoading } =
    useLoaderData() as { data: Promise<Product[]>; isLoading: boolean }

  const { data: queryData, isLoading: isQueryLoading } = useQuery(
    'products',
    fetchProducts,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  )

  useEffect(() => {
    console.debug('queryData: ', queryData)
  }, [queryData])

  const deleteProduct = (id: string) => {
    // TODO: implement delete product functionality
    console.debug('deleteProduct: ', id)
  }

  return (
    <Box>
      {(isQueryLoading || isLoaderDataLoading) && <CircularProgress />}
      <Suspense fallback={<Fallback />}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Products
        </Typography>
        <Await
          resolve={loaderData}
          errorElement={<div>Could not load products 😬</div>}
          // eslint-disable-next-line react/no-children-prop
          children={(resolvedData) => (
            <List
              items={resolvedData}
              schema={schema}
              deleteItem={deleteProduct}
            />
          )}
        />
      </Suspense>
    </Box>
  )
}

export default ProductsContainer
