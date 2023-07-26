/**
 * @module sbom-harbor-ui/layouts/AppLayout/components/Drawer/DrawerMenu
 */
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppsIcon from '@mui/icons-material/Apps'
import PosIcon from '@mui/icons-material/PointOfSale'
import AppDrawerButton from '@/components/AppDrawerButton'

const DrawerMenuItems = () => (
  <List component="nav">
    <ListItem disablePadding>
      <AppDrawerButton label="Dashboard" to="" icon={<DashboardIcon />} />
    </ListItem>
    <ListItem disablePadding>
      <AppDrawerButton label="Vendors" to="vendors" icon={<PosIcon />} />
    </ListItem>
    <ListItem disablePadding>
      <AppDrawerButton label="Products" to="products" icon={<AppsIcon />} />
    </ListItem>
  </List>
)

export default DrawerMenuItems
