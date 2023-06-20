import React from 'react'
import theme from '../src/theme/theme' // whereever you have defined your material ui theme
import ThemeProvider from '@mui/system/ThemeProvider'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
]
