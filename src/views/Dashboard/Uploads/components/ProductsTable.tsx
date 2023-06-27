/**
 * A component that renders a table of team members with their details.
 * @module sbom-harbor-ui/views/Dashboard/Uploads/components/ProductsTable
 */
import { useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useDialog } from '@/hooks/useDialog'
import FileUploadDialog, {
  OnCloseEvent,
  OnCloseReason,
} from '@/components/FileUploadDialog'
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

export type ProductsTableProps = {
  products?: ProductRow[]
  getRowId?: (row: ProductRow) => string
  showId?: boolean
}

/**
 * A component that renders a table of vendor products with their details.
 * @param {ProductsTableProps} props Input props for the ProductsTable component.
 * @param {function(ProductRow): string} props.getRowId - The getter for product ids.
 * @param {boolean} props.showId - Whether or not to show the id column.
 * @param {ProductRow[]} props.products - The list of vendor products.
 * @returns {JSX.Element} A component that renders a datagrid table of products.
 */
const ProductsTable = ({
  getRowId = ({ id }: ProductRow) => id || uuidv4(),
  showId = false,
  products = [],
}: ProductsTableProps) => {
  const [openDialog, setDialog] = useDialog()

  /**
   * The callback function that is called when the dialog is closed.
   * @param {OnCloseEvent} event - The event that triggered the dialog close.
   * @param {OnCloseReason} reason - The reason that the dialog was closed.
   */
  const handleCloseDialog = useCallback(
    (event: OnCloseEvent, reason: OnCloseReason) => {
      setDialog({
        children: <></>,
        props: {
          open: false,
        },
      })
    },
    []
  )

  /**
   * The callback function that is called when the upload button is clicked.
   * @param {ProductRow} row - The row that the upload button was clicked for.
   * @todo Implement the upload functionality.
   */
  const handleOpenDialog = useCallback((row: ProductRow) => {
    openDialog({
      children: <FileUploadDialog open={true} onClose={handleCloseDialog} />,
      props: {
        open: true,
        onClose: handleCloseDialog,
        maxWidth: 'md',
        fullWidth: true,
      },
    })
  }, [])

  /**
   * The configuration object for the columns of the products table,
   * where each row represents a product that an SBOM can be uploaded for.
   * @constant {GridColDef[]} columns - The columns for the products table.
   */
  const columns: GridColDef[] = useMemo(
    () => [
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
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        width: 125,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              handleOpenDialog(params.row)
            }}
          >
            Upload
          </Button>
        ),
      },
    ],
    []
  )

  return (
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
}

ProductsTable.displayName = 'ProductsTable'

export default ProductsTable
