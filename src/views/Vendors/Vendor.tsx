/**
 * @module sbom-harbor-ui/views/Vendors/Vendor
 */
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Fallback from '@/components/SimpleLoadingFallback'
import List from '@/components/crud/List'
import { vendorQuery } from '@/router/vendorLoader'

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

const VendorContainer = (): JSX.Element => {
  const { vendorId } = useParams() as { vendorId: string }

  const { data: vendor, isLoading } = useQuery(vendorQuery(vendorId))

  const deleteVendor = (id: string) => {
    // TODO: implement delete vendor functionality
    console.debug('deleteVendor: ', id)
  }

  return (
    <Box>
      {isLoading && <CircularProgress />}
      <Suspense fallback={<Fallback />}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Vendor
        </Typography>
        <List
          items={vendor?.products || []}
          schema={schema}
          deleteItem={deleteVendor}
        />
      </Suspense>
    </Box>
  )
}

export default VendorContainer
