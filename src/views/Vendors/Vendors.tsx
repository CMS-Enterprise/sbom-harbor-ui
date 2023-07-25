/**
 * @module sbom-harbor-ui/views/Vendors/Vendors
 */
import { Suspense } from 'react'
import { useQuery } from 'react-query'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import List from '@/components/crud/List'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import { vendorsQuery } from '@/router/vendorsLoader'

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

const VendorsContainer = (): JSX.Element => {
  const { data: vendors = [], isLoading } = useQuery(vendorsQuery())

  const deleteVendor = (id: string) => {
    // TODO: implement delete vendor functionality
    console.debug('deleteVendor: ', id)
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Vendors
      </Typography>
      {isLoading && <CircularProgress />}
      <Suspense fallback={<LinearIndeterminate />}>
        <List items={vendors || []} schema={schema} deleteItem={deleteVendor} />
      </Suspense>
    </Box>
  )
}

export default VendorsContainer
