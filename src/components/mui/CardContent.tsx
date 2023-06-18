/**
 * Custom MuiCardContent components
 * @module sbom-harbor-ui/components/mui/CardContent
 */
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'

export const CenteredCardContent = styled(CardContent)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
})
