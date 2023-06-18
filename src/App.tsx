/**
 * The main component that renders all routes in the application.
 * @module sbom-harbor-ui/Main
 */
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AlertProvider } from '@/hooks/useAlert'
import { AuthProvider } from '@/hooks/useAuth'
import DialogProvider from '@/hooks/useDialog'
import theme from '@/theme/theme'

/**
 * Root Layout component that renders the entire application,
 *  including the public (home, auth) and private (app) views.
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => (
  <main data-testid="main">
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <DialogProvider>
            <Outlet />
          </DialogProvider>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  </main>
)

export default App
