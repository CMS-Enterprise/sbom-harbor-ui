/**
 * A component that renders a table of team members with their details.
 * @module sbom-harbor-ui/views/Dashboard/Team/ProductsTable
 */
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { TeamMemberRole, TeamMemberTableRow } from '@/types'

type FreshnessChipProps = {
  lastUpload: string
  freshness: number
}

type ProductRow = {
  name: string
  vendor: string
  lastUpload: string
  freshness: number
}

type RenderCellProps = {
  row: ProductRow
}

/**
 * The configuration object for the columns of the products table,
 * where each row represents a product that an SBOM can be uploaded for.
 * @constant {GridColDef[]} columns The columns for the products table.
 */
const columns: GridColDef[] = [
  {
    field: 'productName',
    headerName: 'Product Name',
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
  },
  // TODO: Add a chip component for freshness
  {
    field: 'freshness',
    headerName: 'SBOM Freshness',
    renderCell: ({ row }: RenderCellProps) => (
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {row.freshness}
      </Typography>
    ),
  },
  {
    field: 'lastUpload',
    headerName: 'Last SBOM Upload',
    renderCell: ({ row: { lastUpload } }: RenderCellProps) => {
      const datelastUpload = new Date(lastUpload).toLocaleDateString()
      return <Typography variant="body2">{datelastUpload}</Typography>
    },
  },
]

type InputProps = {
  products: ProductRow[]
}

/**
 * A component that renders a table of vendor products with their details.
 * @param {InputProps} props Input props for the ProductsTable component.
 * @param {ProductRow[]} props.products - The list of vendor products.
 * @returns {JSX.Element} A component that renders a datagrid table of products.
 */
const ProductsTable = ({ products }: InputProps) => (
  <Card>
    <DataGrid
      autoHeight
      hideFooter
      rows={products}
      columns={columns}
      disableSelectionOnClick
      pagination={true}
      pageSize={20}
    />
  </Card>
)

ProductsTable.displayName = 'ProductsTable'

export default ProductsTable
