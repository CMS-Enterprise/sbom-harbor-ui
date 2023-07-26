import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { Product } from '@/types'

const schema = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'vendor',
    label: 'Vendor',
    type: 'text',
    renderCell: ({
      row: {
        vendor: { id, name },
      },
    }: {
      row: Product
    }) => (
      <Link
        to={`/app/vendors/${id}`}
        component={RouterLink}
        aria-label={`Vendor Detail: ${name}`}
        role="link"
      >
        {name}
      </Link>
    ),
  },
]

export default schema
