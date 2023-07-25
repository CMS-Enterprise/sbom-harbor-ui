import type { StoryObj, Meta, Decorator } from '@storybook/react'
import { createMemoryRouter, RouterProvider, defer } from 'react-router-dom'
import { ProductsTableProps } from '@/views/Uploads/components/ProductsTable'
import DashboardComponent from '@/views/Dashboard/Dashboard'
import { Product } from '@/types'

type Story = StoryObj<ProductsTableProps>

const productsLoader = () => {
  return defer({
    data: Promise.resolve([
      {
        id: '93efbb3e-beb0-4229-9a3c-d452a2f36e38',
        name: 'Test Product',
        vendor: {
          id: 'f7fa92e0-4e3f-4674-b9f8-100b1c2d1bd9',
          name: 'ABC Software Solutions',
        },
        lastUpload: '2023-07-25T03:47:12.798Z',
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
