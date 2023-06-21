import React from 'react'
import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../src/theme/theme'

export const decorators = [
  withThemeFromJSXProvider({
  themes: {
    light: theme,
    dark: theme,
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
})];
