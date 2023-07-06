/**
 * @module sbom-harbor-ui/layouts/AppLayout/AppDrawerListItems
 */
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppDrawerButton from '@/components/AppDrawerButton'

const AppDrawerButtonList = () => (
  <>
    {/* Dashboard */}
    <AppDrawerButton label="Dashboard" to="" icon={<DashboardIcon />} />
  </>
)

export default AppDrawerButtonList
