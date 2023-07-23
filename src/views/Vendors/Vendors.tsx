/**
 * @module sbom-harbor-ui/views/Vendors/Vendors
 */
import * as React from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { useQuery } from 'react-query'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Fallback from '@/components/SimpleLoadingFallback'
import List from '@/components/crud/List'
import { Vendor } from '@/views/Vendors/types'
import { useEffect } from 'react'

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

const fetchVendors = async (): Promise<Vendor[]> => {
  try {
    const result = await fetch('/api/vendors')
    if (result.headers.get('content-type')?.includes('application/json')) {
      return result.json()
    }
    throw new Error('Response was not JSON')
  } catch (error) {
    console.error(error)
    return []
  }
}

const VendorsContainer = (): JSX.Element => {
  // hook for getting the route loader data
  const { data: loaderData, isLoading: isLoaderDataLoading } =
    useLoaderData() as { data: Promise<Vendor[]>; isLoading: boolean }

  const { data: queryData, isLoading: isQueryLoading } = useQuery(
    'vendors',
    fetchVendors,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  )

  useEffect(() => {
    console.debug('queryData: ', queryData)
  }, [queryData])

  const deleteVendor = (id: string) => {
    // TODO: implement delete vendor functionality
    console.debug('deleteVendor: ', id)
  }

  return (
    <Box>
      {(isQueryLoading || isLoaderDataLoading) && <CircularProgress />}
      <React.Suspense fallback={<Fallback />}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Vendors
        </Typography>
        <Await
          resolve={loaderData}
          errorElement={<div>Could not load vendors 😬</div>}
          // eslint-disable-next-line react/no-children-prop
          children={(resolvedData) => (
            <List
              items={resolvedData}
              schema={schema}
              deleteItem={deleteVendor}
            />
          )}
        />
      </React.Suspense>
    </Box>
  )
}

export default VendorsContainer
