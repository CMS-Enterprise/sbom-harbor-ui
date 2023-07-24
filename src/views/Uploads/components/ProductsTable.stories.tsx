import type { StoryObj, Meta } from '@storybook/react'
import ProductsTable, {
  ProductsTableProps,
} from '@/views/Uploads/components/ProductsTable'

type Story = StoryObj<ProductsTableProps>

export default {
  title: 'Upload-UI/Components/ProductsTable',
  component: ProductsTable,
  argTypes: {
    products: {
      control: {
        type: 'object',
        defaultValue: [],
      },
    },
    showId: {
      control: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
} as Meta<typeof ProductsTable>

export const Default: Story = {
  argTypes: {
    products: {
      control: false,
    },
  },
  args: {
    products: [],
  },
}

export const WithRows: Story = {
  render: (args) => <ProductsTable {...args} />,
  args: {
    products: [
      {
        id: '1',
        name: 'Product 1',
        vendor: 'Vendor 1',
        lastUpload: '2021-10-01T00:00:00.000Z',
        freshness: 1,
      },
    ],
  },
  argTypes: {},
}
