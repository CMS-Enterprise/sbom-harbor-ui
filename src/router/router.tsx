/**
 * Component that renders all routes in the application.
 * @module sbom-harbor-ui/router/router
 * @see {@link @sbom-harbor-ui/dashboard/main} for usage.
 */
import { createBrowserRouter } from 'react-router-dom'
import { RouteIds } from '@/types'

// ** Components
import App from '@/App'
import ErrorBoundary from '@/components/ErrorBoundary'
import NavigateToLogin from '@/components/react-router/NavigateToLogin'

// ** Public Views
import SignIn from '@/views/SignIn/SignIn'
import SignOut from '@/views/SignOut/SignOut'

// ** Private Views
import AppLayout from '@/layouts/AppLayout/AppLayout'
import Dashboard from '@/views/Dashboard/Dashboard'
import TeamForm from '@/views/Dashboard/Team/TeamForm'
import TeamView from '@/views/Dashboard/Team/TeamView'
import Products from '@/views/Products/Products'
import Vendors from '@/views/Vendors/Vendors'
import Vendor from '@/views/Vendors/Vendor'

// ** Loaders, Utils
import configureCognito from '@/utils/configureCognito'
import authLoader from '@/router/authLoader'
import teamLoader from '@/router/teamLoader'
import productsLoader from '@/router/productsLoader'
import vendorLoader from '@/router/vendorLoader'
import vendorsLoader from '@/router/vendorsLoader'
import { QueryClient } from 'react-query'

// Declare the React Query Client
const queryClient = new QueryClient()

/**
 * The hash router for the application that defines routes
 *  and specifies the loaders for routes with dynamic data.
 * @see {@link https://reactrouter.com/web/api/BrowserRouter BrowserRouter}
 * @see {@link https://reactrouter.com/en/main/route/loader loader}
 */
const router = createBrowserRouter([
  {
    id: RouteIds.MAIN,
    path: '/',
    loader: configureCognito,
    element: <App />,
    children: [
      {
        index: true,
        element: <NavigateToLogin />,
      },
      {
        id: RouteIds.LOGIN,
        path: 'login',
        element: <SignIn />,
      },
      {
        id: RouteIds.LOGOUT,
        path: 'logout',
        element: <SignOut />,
      },
      {
        path: 'app/*',
        id: RouteIds.AUTHED_APP,
        element: <AppLayout />,
        errorElement: <ErrorBoundary />,
        loader: authLoader,
        children: [
          {
            index: true,
            id: RouteIds.DASHBOARD,
            loader: productsLoader,
            element: <Dashboard />,
            errorElement: <ErrorBoundary />,
          },
          {
            id: RouteIds.VENDOR_VIEW,
            path: 'vendors/:vendorId',
            loader: vendorLoader(queryClient),
            element: <Vendor />,
            errorElement: <ErrorBoundary />,
          },
          {
            id: RouteIds.VENDORS,
            path: 'vendors',
            loader: vendorsLoader(queryClient),
            element: <Vendors />,
            errorElement: <ErrorBoundary />,
          },
          {
            id: RouteIds.PRODUCTS,
            path: 'products',
            loader: productsLoader,
            element: <Products />,
            errorElement: <ErrorBoundary />,
          },
          {
            path: 'team',
            children: [
              {
                id: RouteIds.TEAM_NEW,
                loader: () => ({
                  data: Promise.resolve({}),
                }),
                path: 'new',
                element: <TeamForm />,
              },
            ],
          },
          {
            id: RouteIds.TEAM,
            path: 'teams/:teamId',
            loader: teamLoader,
            errorElement: <ErrorBoundary />,
            children: [
              {
                id: RouteIds.TEAM_VIEW,
                path: '',
                loader: teamLoader,
                element: <TeamView />,
                errorElement: <ErrorBoundary />,
              },
              {
                id: RouteIds.TEAM_EDIT,
                path: 'edit',
                loader: teamLoader,
                element: <TeamForm />,
                errorElement: <ErrorBoundary />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NavigateToLogin />,
      },
    ],
  },
])

export default router
