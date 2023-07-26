/**
 * @module sbom-harbor-ui/views/Vendors/Vendors
 */
import { Suspense, useCallback } from 'react'
import { useQuery } from 'react-query'
import Typography from '@mui/material/Typography'
import LinearIndeterminate from '@/components/mui/LinearLoadingBar'
import List from '@/components/crud/List'
import { vendorsQuery } from '@/router/vendorsLoader'
import schema from './schema'

/**
 * React Suspense-aware Component for rendering all vendors in a list view.
 * @return {JSX.Element} the vendors list view
 */
const VendorsContainer = (): JSX.Element => {
  const { data: vendors = [], isLoading } = useQuery(vendorsQuery())

  const handleDelete = useCallback((id: string) => {
    console.debug('handleDelete: ', id)
  }, [])

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Vendors List
      </Typography>
      <Suspense fallback={<LinearIndeterminate />}>
        <List items={vendors || []} schema={schema} deleteItem={handleDelete} />
      </Suspense>
    </>
  )
}

export default VendorsContainer
