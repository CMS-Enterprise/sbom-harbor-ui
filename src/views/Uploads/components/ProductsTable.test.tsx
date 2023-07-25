import { render, screen } from '@testing-library/react'
import ProductsTable, {
  ProductsTableProps,
} from '@/views/Uploads/components/ProductsTable'
import { v4 as uuidv4 } from 'uuid'
import { Product, Vendor } from '@/types'
import { BrowserRouter } from 'react-router-dom'

const makeVendor = (id: number | string): Vendor => ({
  id: `${id}`,
  name: `Vendor ${1}`,
  products: [],
})

const makeProduct = (id: number | string): Product => ({
  id: `${id}`,
  name: `Product ${id}`,
  vendor: makeVendor(id),
  lastUpload: new Date().toISOString(),
})

const defaultProps: ProductsTableProps = {
  products: [],
  getRowId: (row: Product) => row.id || uuidv4(),
}

describe('ProductsTable', () => {
  it('renders without crashing', () => {
    render(<ProductsTable {...defaultProps} />, { wrapper: BrowserRouter })
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('renders the correct number of rows', () => {
    const products: Product[] = [makeProduct(1), makeProduct(2)]
    render(<ProductsTable {...defaultProps} products={products} />, {
      wrapper: BrowserRouter,
    })
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(products.length + 1) // +1 for the header row
  })

  it('renders the correct data in the cells', () => {
    const product: Product = makeProduct(1)
    render(<ProductsTable {...defaultProps} products={[product]} />, {
      wrapper: BrowserRouter,
    })
    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(product.vendor.name)).toBeInTheDocument()
  })

  it('calls the getRowId function with the correct argument', () => {
    const getRowId = jest.fn((row: Product) => row.id || uuidv4())
    const product: Product = makeProduct(1)
    render(<ProductsTable getRowId={getRowId} products={[product]} />, {
      wrapper: BrowserRouter,
    })
    expect(getRowId).toHaveBeenCalledWith(product)
  })

  it('does not render the id column', () => {
    const product: Product = makeProduct(1)
    render(<ProductsTable {...defaultProps} products={[product]} />, {
      wrapper: BrowserRouter,
    })
    const headerRow = screen.getAllByRole('columnheader')
    expect(headerRow.find((row) => row.textContent === 'ID')).not.toBeDefined()
  })

  it('generates a unique id when id is not present in the row data', () => {
    // @ts-expect-error ts(2741)
    const product: Product = { ...makeProduct(1), id: null }
    render(<ProductsTable products={[product]} showId />, {
      wrapper: BrowserRouter,
    })
    const cell = screen
      .getAllByRole('cell')
      .find((cell) => cell.getAttribute('data-field') === 'id')
    expect(cell).toBeDefined()
  })

  it('hides the id column by default', () => {
    const product: Product = makeProduct(1)
    render(<ProductsTable products={[product]} />, { wrapper: BrowserRouter })
    const idHeader = screen.queryByText('ID')
    expect(idHeader).not.toBeInTheDocument()
  })
})
