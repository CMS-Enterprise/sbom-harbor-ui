/**
 * The main component that renders all routes in the application.
 * @module sbom-harbor-ui/App
 */
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles'
import { AlertProvider } from '@/hooks/useAlert'
import { AuthProvider } from '@/hooks/useAuth'
import DialogProvider from '@/hooks/useDialog'
import theme from '@/theme/theme'

const queryClient = new QueryClient()

/**
 * Root Layout component that renders the entire application,
 *  including the public (home, auth) and private (app) views.
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AlertProvider>
          <DialogProvider>
            <Outlet />
          </DialogProvider>
        </AlertProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
)

export default App
