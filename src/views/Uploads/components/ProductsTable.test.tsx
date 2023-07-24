import { render, screen } from '@testing-library/react'
import ProductsTable, {
  Product,
  ProductsTableProps,
} from '@/views/Uploads/components/ProductsTable'
import { v4 as uuidv4 } from 'uuid'

const defaultProps: ProductsTableProps = {
  products: [],
  getRowId: (row: Product) => row.id || uuidv4(),
}

describe('ProductsTable', () => {
  it('renders without crashing', () => {
    render(<ProductsTable {...defaultProps} />)
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('renders the correct number of rows', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        vendor: 'Vendor 1',
        lastUpload: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Product 2',
        vendor: 'Vendor 2',
        lastUpload: new Date().toISOString(),
      },
    ]
    render(<ProductsTable {...defaultProps} products={products} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(products.length + 1) // +1 for the header row
  })

  it('renders the correct data in the cells', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      vendor: 'Vendor 1',
      lastUpload: new Date().toISOString(),
    }
    render(<ProductsTable {...defaultProps} products={[product]} />)
    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(product.vendor)).toBeInTheDocument()
  })

  it('calls the getRowId function with the correct argument', () => {
    const getRowId = jest.fn((row: Product) => row.id || uuidv4())
    const product: Product = {
      id: '1',
      name: 'Product 1',
      vendor: 'Vendor 1',
      lastUpload: new Date().toISOString(),
    }
    render(<ProductsTable getRowId={getRowId} products={[product]} />)
    expect(getRowId).toHaveBeenCalledWith(product)
  })

  it('does not render the id column', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      vendor: 'Vendor 1',
      lastUpload: new Date().toISOString(),
    }
    render(<ProductsTable {...defaultProps} products={[product]} />)
    const headerRow = screen.getAllByRole('columnheader')
    expect(headerRow.find((row) => row.textContent === 'ID')).not.toBeDefined()
  })

  it('generates a unique id when id is not present in the row data', () => {
    // @ts-expect-error ts(2741)
    const product: Product = {
      name: 'Product 1',
      vendor: 'Vendor 1',
      lastUpload: new Date().toISOString(),
    }
    render(<ProductsTable products={[product]} showId />)
    const cell = screen
      .getAllByRole('cell')
      .find((cell) => cell.getAttribute('data-field') === 'id')
    expect(cell).toBeDefined()
  })

  it('hides the id column by default', () => {
    const product: Product = {
      id: '1',
      name: 'Product 1',
      vendor: 'Vendor 1',
      lastUpload: new Date().toISOString(),
    }
    render(<ProductsTable products={[product]} />)
    const idHeader = screen.queryByText('ID')
    expect(idHeader).not.toBeInTheDocument()
  })
})
