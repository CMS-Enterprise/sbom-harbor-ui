/**
 * The main component that renders all routes in the application.
 * @module sbom-harbor-ui/App
 */
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { AlertProvider } from '@/hooks/useAlert'
import { AuthProvider } from '@/hooks/useAuth'
import DialogProvider from '@/hooks/useDialog'
import theme from '@/theme/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    // TODO: determine the ideal staleTimes, re-fetch intervals for polls
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error: ', error)
      },
    },
  },
})

/**
 * Root Layout component that renders the entire application,
 *  including the public (home, auth) and private (app) views.
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AlertProvider>
        <DialogProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </DialogProvider>
      </AlertProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default App
