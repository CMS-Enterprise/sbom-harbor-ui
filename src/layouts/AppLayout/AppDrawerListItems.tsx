/**
 * @module sbom-harbor-ui/layouts/AppLayout/AppDrawerListItems
 */
import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppDrawerButton from '@/components/AppDrawerButton'

const AppDrawerButtonList = () => (
  <React.Fragment>
    {/* Dashboard */}
    <AppDrawerButton label="Dashboard" to="" icon={<DashboardIcon />} />
  </React.Fragment>
)

export default AppDrawerButtonList
