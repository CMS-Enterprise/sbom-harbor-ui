/**
 * Sticky footer component.
 * @module @sbom-harbor-ui/dashboard/components/Footer
 */
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Copyright from '@/components/Copyright'

const StickyFooter = (): JSX.Element => (
  <Box
    component="footer"
    sx={{
      px: 2,
      py: 3,
      mt: 'auto',
      backgroundColor: (theme) => theme.palette.grey[200],
    }}
  >
    <Container maxWidth="sm">
      <Copyright />
    </Container>
  </Box>
)

export default StickyFooter
