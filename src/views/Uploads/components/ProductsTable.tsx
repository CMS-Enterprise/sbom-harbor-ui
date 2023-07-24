/**
 * A component that renders a table of team members with their details.
 * @module sbom-harbor-ui/views/Dashboard/Uploads/components/ProductsTable
 */
import { useCallback, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import FileUploadDialog, {
  OnCloseEvent,
  OnCloseReason,
} from '@/components/FileUploadDialog'
import {
  formatLastUploadDate,
  mapLastUploadToFreshness,
} from '@/views/Uploads/utils'

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
  const [open, setOpen] = useState(false)

  /**
   * The callback function that is called when the dialog is closed.
   * @param {OnCloseEvent} event - The event that triggered the dialog close.
   * @param {OnCloseReason} reason - The reason that the dialog was closed.
   */
  const handleCloseDialog = useCallback(
    (event: OnCloseEvent, reason: OnCloseReason) => {
      setOpen(false)
    },
    []
  )

  /**
   * The callback function that is called when the upload button is clicked.
   * @param {ProductRow} row - The row that the upload button was clicked for.
   * @todo Implement the upload functionality.
   */
  const handleOpenDialog = useCallback(
    // TODO: use onUploadedFilesChange prop to get and update the files to upload
    (row: ProductRow) => {
      setOpen(true)
    },
    []
  )

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
        hideable: true,
      },
      {
        field: 'name',
        headerName: 'Product Name',
        flex: 1.5,
      },
      {
        field: 'vendor',
        headerName: 'Vendor',
        flex: 1.5,
      },
      {
        field: 'freshness',
        headerName: 'Freshness',
        flex: 1.25,
        renderCell: ({ row: { lastUpload } }: RenderCellProps) =>
          mapLastUploadToFreshness(lastUpload),
      },
      {
        field: 'lastUpload',
        headerName: 'Last Upload',
        flex: 1.25,
        renderCell: ({ row: { lastUpload } }: RenderCellProps) =>
          formatLastUploadDate(lastUpload),
      },
      {
        field: 'action',
        headerName: '',
        align: 'right',
        flex: 0,
        sortable: false,
        disableColumnFilter: true,
        disableColumnMenu: true,
        disableColumnSelector: true,
        renderCell: (params: RenderCellProps) => (
          <IconButton
            aria-controls="upload-dialog"
            aria-haspopup="true"
            aria-label="Upload"
            color="primary"
            onClick={() => {
              handleOpenDialog(params.row)
            }}
          >
            <UploadFileIcon />
          </IconButton>
        ),
      },
    ],
    [handleOpenDialog]
  )

  return (
    <Card>
      <DataGrid
        rows={products}
        columns={columns}
        autoHeight
        getRowId={getRowId}
        rowSelection={false}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: showId,
            },
          },
        }}
        columnVisibilityModel={{
          id: showId,
        }}
      />
      <FileUploadDialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      />
    </Card>
  )
}

ProductsTable.displayName = 'ProductsTable'

export default ProductsTable
