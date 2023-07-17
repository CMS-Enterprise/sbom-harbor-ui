// List.stories.tsx
import { Meta } from '@storybook/react'
import TextField from '@mui/material/TextField'
import List from './List'
import { useState } from 'react'

const schema = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    component: TextField,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    component: TextField,
  },
]

const ITEMS = [
  {
    id: '1',
    name: 'Vendor 1',
    address: '123 ABC St.',
  },
  {
    id: '2',
    name: 'Vendor 2',
    address: '456 DEF St.',
  },
]

export default {
  title: 'Components/CRUD/List',
  component: List,
  args: {
    items: [],
    schema,
    deleteItem: () => {},
  },
  argTypes: {
    items: {
      control: {
        type: 'object',
      },
    },
    schema: {
      control: {
        type: 'object',
      },
    },
    deleteItem: {
      control: {
        type: 'function',
      },
    },
  },
} as Meta

export const EmptyList = () => {
  return <List items={[]} schema={schema} deleteItem={() => {}} />
}

export const PopulatedList = () => {
  const [items, setItems] = useState(ITEMS)

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return <List items={items} schema={schema} deleteItem={deleteItem} />
}

PopulatedList.parameters = {
  args: {
    items: ITEMS,
  },
} as Meta
