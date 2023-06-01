/**
 * Custom implementation of LinearProgress bar from MUI.
 * @module sbom-harbor-ui/components/mui/LinerLoadingBar
 */
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const LinearIndeterminate = () => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
)

export default LinearIndeterminate
