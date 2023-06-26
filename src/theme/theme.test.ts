import theme, { MuiDrawerWidth } from '@/theme/theme'

describe('Theme Unit Tests', () => {
  it('should export MuiDrawerWidth', () => {
    expect(MuiDrawerWidth).toBeCloseTo(200)
  })

  it('should have the expected palette', () => {
    expect(theme.palette).toMatchObject({
      mode: expect.any(String),
      common: expect.any(Object),
      primary: expect.any(Object),
      secondary: expect.any(Object),
      error: expect.any(Object),
      warning: expect.any(Object),
      info: expect.any(Object),
      success: expect.any(Object),
      grey: expect.any(Object),
      text: expect.any(Object),
      divider: expect.any(String),
      background: expect.any(Object),
      action: expect.any(Object),
      // dark: expect.any(Object),
    })
  })

  it('should have the expected shadows', () => {
    expect(theme.shadows).toHaveLength(25)
    theme.shadows.forEach((shadow) => {
      expect(typeof shadow).toBe('string')
    })
  })

  it('should have the expected transitions', () => {
    expect(theme.transitions).toMatchObject({
      easing: expect.any(Object),
      duration: expect.any(Object),
    })
  })

  it('should have the expected typography', () => {
    expect(theme.typography).toMatchObject({
      fontFamily: expect.any(String),
      fontWeightLight: expect.any(Number),
      fontWeightRegular: expect.any(Number),
      fontWeightMedium: expect.any(Number),
      fontWeightBold: expect.any(Number),
      h1: expect.any(Object),
      h2: expect.any(Object),
      h3: expect.any(Object),
      h4: expect.any(Object),
      h5: expect.any(Object),
      h6: expect.any(Object),
      body1: expect.any(Object),
      body2: expect.any(Object),
      subtitle1: expect.any(Object),
      subtitle2: expect.any(Object),
      button: expect.any(Object),
      overline: expect.any(Object),
      caption: expect.any(Object),
    })
  })

  it('should have the expected zIndex', () => {
    expect(theme.zIndex).toMatchObject({
      mobileStepper: expect.any(Number),
      appBar: expect.any(Number),
      drawer: expect.any(Number),
      modal: expect.any(Number),
      snackbar: expect.any(Number),
      tooltip: expect.any(Number),
    })
  })

  it('should have the expected components', () => {
    expect(theme.components).toMatchObject({
      MuiAccordion: expect.any(Object),
      MuiAccordionDetails: expect.any(Object),
      MuiAccordionSummary: expect.any(Object),
      MuiAlert: expect.any(Object),
      MuiAppBar: expect.any(Object),
      MuiAutocomplete: expect.any(Object),
      MuiAvatar: expect.any(Object),
      MuiAvatarGroup: expect.any(Object),
      MuiBackdrop: expect.any(Object),
      MuiBreadcrumbs: expect.any(Object),
      MuiButton: expect.any(Object),
      MuiButtonBase: expect.any(Object),
      MuiButtonGroup: expect.any(Object),
      MuiCard: expect.any(Object),
      MuiCardActions: expect.any(Object),
      MuiCardContent: expect.any(Object),
      MuiCardHeader: expect.any(Object),
      MuiCheckbox: expect.any(Object),
      MuiChip: expect.any(Object),
      MuiCircularProgress: expect.any(Object),
      MuiContainer: expect.any(Object),
      MuiCssBaseline: expect.any(Object),
      MuiDialog: expect.any(Object),
      MuiDialogActions: expect.any(Object),
      MuiDialogContent: expect.any(Object),
      MuiDialogTitle: expect.any(Object),
      MuiDivider: expect.any(Object),
      MuiDrawer: expect.any(Object),
      MuiFormControl: expect.any(Object),
      MuiFormControlLabel: expect.any(Object),
      MuiFormGroup: expect.any(Object),
      MuiFormHelperText: expect.any(Object),
      MuiIconButton: expect.any(Object),
      MuiInput: expect.any(Object),
      MuiLinearProgress: expect.any(Object),
      MuiList: expect.any(Object),
      MuiListItem: expect.any(Object),
      MuiListItemIcon: expect.any(Object),
      MuiListItemText: expect.any(Object),
      MuiMenu: expect.any(Object),
      MuiMenuItem: expect.any(Object),
      MuiOutlinedInput: expect.any(Object),
      MuiPaper: expect.any(Object),
      MuiSelect: expect.any(Object),
      MuiSnackbar: expect.any(Object),
      MuiSnackbarContent: expect.any(Object),
      MuiSwitch: expect.any(Object),
      MuiTab: expect.any(Object),
      MuiTableCell: expect.any(Object),
      MuiTabs: expect.any(Object),
      MuiToggleButton: expect.any(Object),
      MuiTooltip: expect.any(Object),
      MuiTypography: expect.any(Object),
    })
  })
})
