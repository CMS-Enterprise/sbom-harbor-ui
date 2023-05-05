/**
 * @module @sbom-harbor-ui/dashboard/views/App/AppDrawerListItems
 */
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

/**
 * A single menu button in the list inside of the AppDrawer.
 * @param {string} label The text label for menu button.
 * @param {string} to The URL path that the menu button should link to.
 * @param {JSX.Element} icon The SVG icon to display next to the label.
 * @returns {JSX.Element} The menu button list item.
 */
const AppDrawerButton = ({
  label,
  to,
  icon,
}: {
  label: string
  to: string
  icon?: JSX.Element
}) => (
  <Link to={to} component={RouterLink}>
    <ListItemButton sx={{ margin: 'auto' }}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={label} />
    </ListItemButton>
  </Link>
)

export default AppDrawerButton
