/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/DrawerMenu
 */
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppDrawerButton from '@/components/AppDrawerButton'

const DrawerMenuItems = () => (
  <List component="nav">
    <ListItem disablePadding>
      <AppDrawerButton label="Dashboard" to="" icon={<DashboardIcon />} />
    </ListItem>
  </List>
)

export default DrawerMenuItems
