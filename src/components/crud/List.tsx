// List.tsx
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { DataGrid, GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FormField } from '@/types'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import EyeOutlineIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import toTitleCase from '@/utils/toTitleCase'

export type ListActionOptions =
  | {
      to: string | ((id: string) => string)
      icon?: JSX.Element
      iconColor?: string
      buttonColor?: string
    }
  | boolean

export interface ListProps {
  items: GridRowModel[]
  schema: FormField[]
  actions?: {
    view?: ListActionOptions
    delete?: ListActionOptions
  }
  deleteItem: (id: string) => void
}

const List: React.FC<ListProps> = ({
  items = [],
  schema,
  deleteItem,
  actions: actionsInput = {
    view: true,
    delete: true,
  },
}) => {
  const handleDelete = (id: GridRowId) => {
    deleteItem(id as string)
  }

  const actions = {
    view: true,
    delete: true,
    ...actionsInput,
  }

  const columns: GridColDef[] = [
    ...schema.map(
      (field: FormField): GridColDef => ({
        ...field,
        field: field.name,
        flex: 1,
        headerName: toTitleCase(field.label || field.name),
      })
    ),
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.5,
      align: 'right',
      headerAlign: 'right',
      disableColumnMenu: true,
      filterable: false,
      hideable: false,
      sortable: false,
      hideSortIcons: true,
      renderCell: (params) => {
        const renderViewCell = () => {
          if (actions.view === false) return null

          let url = `${params.row.id}`
          if (
            typeof actions.view !== 'boolean' &&
            typeof actions.view?.to === 'string'
          ) {
            url = actions.view.to
          } else if (
            typeof actions.view !== 'boolean' &&
            typeof actions.view?.to === 'function'
          ) {
            url = actions.view.to(params.row.id)
          }

          return (
            <IconButton
              aria-label="view"
              color="primary"
              component={RouterLink}
              to={url}
            >
              {params.row?.actions?.view?.icon || <EyeOutlineIcon />}
            </IconButton>
          )
        }

        return (
          <>
            {renderViewCell()}
            {!!actions.delete && (
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => handleDelete(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        )
      },
    },
  ]

  return (
    <Card>
      <DataGrid rows={items} columns={columns} pagination />
    </Card>
  )
}

export default List
