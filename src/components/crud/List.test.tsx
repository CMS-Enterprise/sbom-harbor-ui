// List.test.tsx
import {
  render as renderImport,
  fireEvent,
  waitFor,
  act,
  RenderOptions,
} from '@testing-library/react'
import List from '@/components/crud/List'
import TextField from '@mui/material/TextField'
import { BrowserRouter } from 'react-router-dom'
import { ReactElement } from 'react'

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  renderImport(ui, { wrapper: BrowserRouter, ...options })

describe('List', () => {
  const deleteItemMock = jest.fn()

  const items = [
    { id: '1', name: 'Vendor 1', address: 'Address 1' },
    { id: '2', name: 'Vendor 2', address: 'Address 2' },
  ]
  const schema = [
    { type: 'text', component: TextField, name: 'name', label: 'Vendor Name' },
    { type: 'text', component: TextField, name: 'address', label: 'Address' },
  ]

  test('renders all items', () => {
    const { getByText, getAllByRole, getByRole } = render(
      <List items={items} schema={schema} deleteItem={deleteItemMock} />
    )

    const grid = getByRole('grid')
    const rows = getAllByRole('row')
    expect(rows.length).toBe(items.length + 1)
    expect(grid).toContainElement(getByText(items[0].name))
    expect(grid).toContainElement(getByText(items[1].name))

    const headerRow = getAllByRole('columnheader')
    expect(headerRow.length).toBe(schema.length + 1)

    expect(getByText('Vendor 1')).toBeInTheDocument()
    expect(grid).toContainElement(getByText(schema[0].label))
    expect(grid).toContainElement(getByText(schema[1].label))
  })

  test('renders a column title from either the field label or name in title-case', () => {
    const { getAllByRole, getByText } = render(
      <List
        items={items}
        schema={[
          { type: 'text', component: TextField, name: 'name' },
          {
            type: 'text',
            component: TextField,
            name: 'address',
            label: 'vendor address',
          },
        ]}
        deleteItem={deleteItemMock}
      />
    )

    const rows = getAllByRole('row')[0]
    expect(rows).toContainElement(getByText('Name'))
    expect(rows).toContainElement(getByText('Vendor Address'))
  })

  test('deletes an item when delete button is clicked', async () => {
    const { getAllByLabelText } = render(
      <List items={items} schema={schema} deleteItem={deleteItemMock} />
    )

    const deleteButtons = getAllByLabelText('delete')

    await act(() => {
      fireEvent.click(deleteButtons[0])
    })

    waitFor(() => {
      expect(deleteItemMock).toHaveBeenCalledTimes(1)
      expect(deleteItemMock).toHaveBeenCalledWith(items[0].id)
    })
  })
})
