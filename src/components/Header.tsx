/**
 * @module @sbom-harbor-ui/dashboard/components/Header
 */
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppBar from '@/components/AppBar'
import AuthButton from '@/components/HeaderAuthButton'

const Header = (): JSX.Element => (
  <Box>
    <AppBar position="static" role="banner">
      <Toolbar role="toolbar">
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          SBOM Harbor
        </Typography>
        <AuthButton />
      </Toolbar>
    </AppBar>
  </Box>
)

export default Header
