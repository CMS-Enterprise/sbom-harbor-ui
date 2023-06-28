import type { StoryObj, Meta, Decorator } from '@storybook/react'
import {
  Product,
  ProductsTableProps,
} from '@/views/Dashboard/Uploads/components/ProductsTable'
import DashboardComponent from '@/views/Dashboard/Dashboard'
import { createMemoryRouter, RouterProvider, defer } from 'react-router-dom'

type Story = StoryObj<ProductsTableProps>

const productsLoader = () => {
  return defer({
    data: Promise.resolve([
      {
        id: '1',
        name: 'Test Product',
        vendor: 'Test Vendor',
        lastUpload: new Date().toISOString(),
      },
    ] as Product[]),
  })
}

const reactRouterDecorator: Decorator = () => {
  return (
    <RouterProvider
      router={createMemoryRouter([
        {
          index: true,
          id: 'Dashboard',
          loader: productsLoader,
          element: <DashboardComponent />,
        },
      ])}
    />
  )
}

export default {
  title: 'Upload-UI/Demo',
  component: DashboardComponent,
  decorators: [reactRouterDecorator],
  render: () => {
    return <DashboardComponent />
  },
} as Meta<typeof DashboardComponent>

export const ProductsDashboard: Story = {}
