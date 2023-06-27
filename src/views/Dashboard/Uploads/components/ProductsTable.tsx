/**
 * A component that renders a table of team members with their details.
 * @module sbom-harbor-ui/views/Dashboard/Uploads/components/ProductsTable
 */
import { v4 as uuidv4 } from 'uuid'
import Card from '@mui/material/Card'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import {
  formatLastUploadDate,
  mapLastUploadToFreshness,
} from '@/views/Dashboard/Uploads/utils'

export interface Product {
  id: string
  name: string
  vendor: string
  lastUpload: TDateISO | undefined
}

interface ProductRow extends Product {
  freshness?: number
}

interface RenderCellProps {
  row: ProductRow
}

/**
 * The configuration object for the columns of the products table,
 * where each row represents a product that an SBOM can be uploaded for.
 * @constant {GridColDef[]} columns The columns for the products table.
 */
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    valueGetter: ({ id }) => id,
  },
  { field: 'name', headerName: 'Product Name' },
  { field: 'vendor', headerName: 'Vendor' },
  {
    field: 'freshness',
    headerName: 'SBOM Freshness',
    renderCell: ({ row: { lastUpload } }: RenderCellProps) =>
      mapLastUploadToFreshness(lastUpload),
  },
  {
    field: 'lastUpload',
    headerName: 'Last SBOM Upload',
    renderCell: ({ row: { lastUpload } }: RenderCellProps) =>
      formatLastUploadDate(lastUpload),
  },
]

export type ProductsTableProps = {
  products?: ProductRow[]
  getRowId?: (row: ProductRow) => string
  showId?: boolean
}

/**
 * A component that renders a table of vendor products with their details.
 * @param {ProductsTableProps} props Input props for the ProductsTable component.
 * @param {ProductRow[]} props.products - The list of vendor products.
 * @returns {JSX.Element} A component that renders a datagrid table of products.
 */
const ProductsTable = ({
  products = [],
  getRowId = ({ id }: ProductRow) => id || uuidv4(),
  showId = false,
}: ProductsTableProps) => (
  <Card>
    <DataGrid
      rows={products}
      columns={columns}
      autoHeight
      getRowId={getRowId}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: showId,
          },
        },
      }}
    />
  </Card>
)

ProductsTable.displayName = 'ProductsTable'

export default ProductsTable
