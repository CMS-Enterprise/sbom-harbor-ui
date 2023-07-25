/**
 * Material UI theme object at the root of the application.
 * @module sbom-harbor-ui/theme/theme
 * @see {@link @sbom-harbor-ui/dashboard/index} for where this is imported.
 * @see https://material-ui.com/customization/themes/ for documentation.
 */
import { DrawerProps } from '@mui/material/Drawer'
import { createTheme, alpha } from '@mui/material/styles'

export const MuiDrawerWidth = 200

declare module '@mui/material/styles' {
  interface Palette {
    dark?: Palette['primary']
    background: Palette['background']
  }

  interface PaletteOptions {
    dark?: PaletteOptions['primary']
    background?: PaletteOptions['background']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark?: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    dark?: true
  }
}

// ** Base theme with breakpoints, direction, spacing
let theme = createTheme({
  spacing: 4,
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1900,
    },
    unit: 'px',
  },
  direction: 'ltr',
})

//* Spacing
theme = createTheme({
  shape: {
    // hack around the typing for border radius being wrong
    borderRadius: +`${theme.spacing(2)}`.replace('px', ''),
  },
})

// ** Palette Base
theme = createTheme(theme, {
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#FFF',
    },
  },
})

// ** Palette Colors
theme = createTheme(theme, {
  palette: {
    primary: {
      light: '#5B70AD',
      main: '#051094',
      dark: '#5A5FE0',
      contrastText: theme.palette.common.white,
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: theme.palette.common.white,
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: theme.palette.common.white,
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: theme.palette.common.white,
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: theme.palette.common.white,
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: theme.palette.common.white,
    },
    grey: {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      '200': '#EEEEEE',
      '300': '#E0E0E0',
      '400': '#BDBDBD',
      '500': '#9E9E9E',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030',
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(76, 78, 100, 0.68)',
      disabled: 'rgba(76, 78, 100, 0.38)',
    },
    background: {
      paper: theme.palette.common.white,
      default: '#F7F7F9',
      selected: alpha(theme.palette.common.black, 0.04),
    },
    action: {
      active: 'rgba(76, 78, 100, 0.54)',
      hover: 'rgba(76, 78, 100, 0.05)',
      hoverOpacity: 0.05,
      selected: 'rgba(76, 78, 100, 0.08)',
      disabled: 'rgba(76, 78, 100, 0.26)',
      disabledBackground: 'rgba(76, 78, 100, 0.12)',
      focus: 'rgba(76, 78, 100, 0.12)',
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    divider: 'rgba(76, 78, 100, 0.12)',
    // Use the minimum contrast of at least 4.5:1 as defined in
    // [WCAG 2.1 Rule 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
    contrastThreshold: 4.5,
    // The default value of `tonalOffset` for light themes.
    tonalOffset: 0.2,
  },
})

// ** Typography
theme = createTheme(theme, {
  typography: {
    fontFamily:
      "'Open Sans',--apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
    fonts: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      mono: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace',
    },
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

theme = createTheme(theme, {
  typography: {
    h1: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '3.5rem',
      lineHeight: 1.167,
      letterSpacing: '-1.5px',
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        fontSize: '4.7129rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '5.3556rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '5.9983rem',
      },
    },
    h2: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '2.375rem',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        fontSize: '3.125rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '3.3333rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '3.75rem',
      },
    },
    h3: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '2rem',
      lineHeight: 1.167,
      letterSpacing: 0,
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.5707rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.7849rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.9991rem',
      },
    },
    h4: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.8219rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.0243rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.0243rem',
      },
    },
    h5: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '1.25rem',
      lineHeight: 1.334,
      letterSpacing: 0,
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.3118rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.4993rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.4993rem',
      },
    },
    h6: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: '1.125rem',
      lineHeight: 1.6,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.25rem',
      },
    },
    subtitle1: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary,
    },
    subtitle2: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.1px',
      color: theme.palette.text.secondary,
    },
    body1: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.15px',
      color: theme.palette.text.primary,
    },
    body2: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '0.875rem',
      lineHeight: 1.429,
      letterSpacing: '0.15px',
      color: theme.palette.text.secondary,
    },
    button: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      textTransform: 'uppercase',
      letterSpacing: '0.4px',
      color: theme.palette.text.primary,
    },
    caption: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '0.75rem',
      lineHeight: 1.25,
      letterSpacing: '0.4px',
      color: theme.palette.text.secondary,
    },
    overline: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: theme.palette.text.secondary,
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.light,
      },
    },
  },
})

// ** Transitions
theme = createTheme(theme, {
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
})

// ** Z-Index Values
theme = createTheme(theme, {
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    fab: 1050,
    mobileStepper: 1000,
    modal: 1300,
    snackbar: 1400,
    speedDial: 1050,
    tooltip: 1500,
  },
})

// ** Shadows
theme = createTheme(theme, {
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(76, 78, 100), 0px 1px 1px 0px rgba(76, 78, 100, 0.14), 0px 1px 3px 0px rgba(76, 78, 100, 0.12)',
    '0px 3px 1px -2px rgba(76, 78, 100, 0.2), 0px 2px 2px 0px rgba(76, 78, 100, 0.14), 0px 1px 5px 0px rgba(76, 78, 100, 0.12)',
    '0px 4px 8px -4px rgba(76, 78, 100, 0.42)',
    '0px 6px 18px -8px rgba(76, 78, 100, 0.56)',
    '0px 3px 5px -1px rgba(76, 78, 100, 0.2), 0px 5px 8px 0px rgba(76, 78, 100, 0.14), 0px 1px 14px 0px rgba(76, 78, 100, 0.12)',
    '0px 2px 10px 0px rgba(76, 78, 100, 0.22)',
    '0px 4px 5px -2px rgba(76, 78, 100, 0.2), 0px 7px 10px 1px rgba(76, 78, 100, 0.14), 0px 2px 16px 1px rgba(76, 78, 100, 0.12)',
    '0px 5px 5px -3px rgba(76, 78, 100, 0.2), 0px 8px 10px 1px rgba(76, 78, 100, 0.14), 0px 3px 14px 2px rgba(76, 78, 100, 0.12)',
    '0px 5px 6px -3px rgba(76, 78, 100, 0.2), 0px 9px 12px 1px rgba(76, 78, 100, 0.14), 0px 3px 16px 2px rgba(76, 78, 100, 0.12)',
    '0px 6px 6px -3px rgba(76, 78, 100, 0.2), 0px 10px 14px 1px rgba(76, 78, 100, 0.14), 0px 4px 18px 3px rgba(76, 78, 100, 0.12)',
    '0px 6px 7px -4px rgba(76, 78, 100, 0.2), 0px 11px 15px 1px rgba(76, 78, 100, 0.14), 0px 4px 20px 3px rgba(76, 78, 100, 0.12)',
    '0px 7px 8px -4px rgba(76, 78, 100, 0.2), 0px 12px 17px 2px rgba(76, 78, 100, 0.14), 0px 5px 22px 4px rgba(76, 78, 100, 0.12)',
    '0px 7px 8px -4px rgba(76, 78, 100, 0.2), 0px 13px 19px 2px rgba(76, 78, 100, 0.14), 0px 5px 24px 4px rgba(76, 78, 100, 0.12)',
    '0px 7px 9px -4px rgba(76, 78, 100, 0.2), 0px 14px 21px 2px rgba(76, 78, 100, 0.14), 0px 5px 26px 4px rgba(76, 78, 100, 0.12)',
    '0px 8px 9px -5px rgba(76, 78, 100, 0.2), 0px 15px 22px 2px rgba(76, 78, 100, 0.14), 0px 6px 28px 5px rgba(76, 78, 100, 0.12)',
    '0px 8px 10px -5px rgba(76, 78, 100, 0.2), 0px 16px 24px 2px rgba(76, 78, 100, 0.14), 0px 6px 30px 5px rgba(76, 78, 100, 0.12)',
    '0px 8px 11px -5px rgba(76, 78, 100, 0.2), 0px 17px 26px 2px rgba(76, 78, 100, 0.14), 0px 6px 32px 5px rgba(76, 78, 100, 0.12)',
    '0px 9px 11px -5px rgba(76, 78, 100, 0.2), 0px 18px 28px 2px rgba(76, 78, 100, 0.14), 0px 7px 34px 6px rgba(76, 78, 100, 0.12)',
    '0px 9px 12px -6px rgba(76, 78, 100, 0.2), 0px 19px 29px 2px rgba(76, 78, 100, 0.14), 0px 7px 36px 6px rgba(76, 78, 100, 0.12)',
    '0px 10px 13px -6px rgba(76, 78, 100, 0.2), 0px 20px 31px 3px rgba(76, 78, 100, 0.14), 0px 8px 38px 7px rgba(76, 78, 100, 0.12)',
    '0px 10px 13px -6px rgba(76, 78, 100, 0.2), 0px 21px 33px 3px rgba(76, 78, 100, 0.14), 0px 8px 40px 7px rgba(76, 78, 100, 0.12)',
    '0px 10px 14px -6px rgba(76, 78, 100, 0.2), 0px 22px 35px 3px rgba(76, 78, 100, 0.14), 0px 8px 42px 7px rgba(76, 78, 100, 0.12)',
    '0px 11px 14px -7px rgba(76, 78, 100, 0.2), 0px 23px 36px 3px rgba(76, 78, 100, 0.14), 0px 9px 44px 8px rgba(76, 78, 100, 0.12)',
    '0px 11px 15px -7px rgba(76, 78, 100, 0.2), 0px 24px 38px 3px rgba(76, 78, 100, 0.14), 0px 9px 46px 8px rgba(76, 78, 100, 0.12)',
  ],
})

// ** Mixins
theme = createTheme(theme, {
  mixins: {
    toolbar: {
      minHeight: 64,
    },
  },
})

// ** Components
theme = createTheme(theme, {
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:first-of-type': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          '&.Mui-expanded': {
            boxShadow: '0px 4px 8px -4px rgba(76, 78, 100, 0.42)',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '1.25rem',
          '& + .MuiAccordionDetails-root': {
            paddingTop: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 1.25rem',
          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-child': {
              paddingTop: 0,
            },
          },
        },
        content: {
          margin: '0.8125rem 0',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filled: {
          fontWeight: theme.typography.fontWeightRegular,
        },
        outlinedError: {
          borderColor: theme.palette.error.main,
          color: 'rgb(229, 69, 65)',
          '& .MuiAlertTitle-root': {
            color: 'rgb(229, 69, 65)',
          },
          '& .MuiAlert-icon': {
            color: theme.palette.error.main,
          },
        },
        outlinedInfo: {
          borderColor: theme.palette.info.main,
          color: 'rgb(34, 178, 224)',
          '& .MuiAlertTitle-root': {
            color: 'rgb(34, 178, 224)',
          },
          '& .MuiAlert-icon': {
            color: theme.palette.info.main,
          },
        },
        outlinedSuccess: {
          borderColor: theme.palette.success.main,
          color: 'rgb(102, 202, 36)',
          '& .MuiAlertTitle-root': {
            color: 'rgb(102, 202, 36)',
          },
          '& .MuiAlert-icon': {
            color: theme.palette.success.main,
          },
        },
        outlinedWarning: {
          borderColor: theme.palette.warning.main,
          color: 'rgb(227, 162, 36)',
          '& .MuiAlertTitle-root': {
            color: 'rgb(227, 162, 36)',
          },
          '& .MuiAlert-icon': {
            color: theme.palette.warning.main,
          },
        },
        standardError: {
          color: theme.palette.common.white,
          backgroundColor: 'rgba(255, 77, 73, 0.85)',
          '& .MuiAlertTitle-root': {
            color: theme.palette.common.white,
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
          },
        },
        standardInfo: {
          color: theme.palette.common.white,
          backgroundColor: 'rgba(38, 198, 249, 0.85)',
          '& .MuiAlertTitle-root': {
            color: theme.palette.common.white,
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
          },
        },
        standardSuccess: {
          color: theme.palette.common.white,
          backgroundColor: 'rgba(114, 225, 40, 0.85)',
          '& .MuiAlertTitle-root': {
            color: theme.palette.common.white,
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
          },
        },
        standardWarning: {
          color: theme.palette.common.white,
          backgroundColor: 'rgba(253, 181, 40, 0.85)',
          '& .MuiAlertTitle-root': {
            color: theme.palette.common.white,
          },
          '& .MuiAlert-icon': {
            color: theme.palette.common.white,
          },
        },
        root: {
          borderRadius: theme.shape.borderRadius,
          '& .MuiAlertTitle-root': {
            marginBottom: '0.25rem',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& a': {
            fontWeight: theme.typography.fontWeightMedium,
            color: 'inherit',
          },
        },
      },
    },
    MuiAppBar: {
      // styleOverrides
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[6],
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: theme.palette.text.secondary,
          backgroundColor: 'rgba(76, 78, 100, 0.08)',
        },
        rounded: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end',
          '.MuiCard-root & .MuiAvatar-root': {
            borderColor: theme.palette.common.white,
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(76, 78, 100, 0.5)',
        },
        invisible: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          '& > .MuiLink-root': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: theme.typography.htmlFontSize,
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightRegular,
          textTransform: 'capitalize',
          borderRadius: theme.shape.borderRadius,
          lineHeight: 1.715,
          padding: '0.4375rem 0.75rem',
          '&.MuiButton-textPrimary:hover': {
            backgroundColor: 'rgba(102, 108, 255, 0.08)',
          },
          '&.MuiButton-textSecondary:hover': {
            backgroundColor: 'rgba(109, 120, 141, 0.08)',
          },
          '&.MuiButton-textSuccess:hover': {
            backgroundColor: 'rgba(114, 225, 40, 0.08)',
          },
          '&.MuiButton-textError:hover': {
            backgroundColor: 'rgba(255, 77, 73, 0.08)',
          },
          '&.MuiButton-textWarning:hover': {
            backgroundColor: 'rgba(253, 181, 40, 0.08)',
          },
          '&.MuiButton-textInfo:hover': {
            backgroundColor: 'rgba(38, 198, 249, 0.08)',
          },
        },
        contained: {
          boxShadow: '0px 4px 8px -4px rgba(76, 78, 100, 0.42)',
          padding: '0.4375rem 1.375rem',
        },
        outlined: {
          lineHeight: 1.572,
          padding: '0.4375rem 1.3125rem',
          '&.MuiButton-outlinedPrimary:hover': {
            backgroundColor: 'rgba(102, 108, 255, 0.08)',
          },
          '&.MuiButton-outlinedSecondary:hover': {
            backgroundColor: 'rgba(109, 120, 141, 0.08)',
          },
          '&.MuiButton-outlinedSuccess:hover': {
            backgroundColor: 'rgba(114, 225, 40, 0.08)',
          },
          '&.MuiButton-outlinedError:hover': {
            backgroundColor: 'rgba(255, 77, 73, 0.08)',
          },
          '&.MuiButton-outlinedWarning:hover': {
            backgroundColor: 'rgba(253, 181, 40, 0.08)',
          },
          '&.MuiButton-outlinedInfo:hover': {
            backgroundColor: 'rgba(38, 198, 249, 0.08)',
          },
        },
        sizeSmall: {
          lineHeight: 1.693,
          padding: '0.25rem 0.5625rem',
          '&.MuiButton-contained': {
            padding: '0.25rem 0.8125rem',
          },
          '&.MuiButton-outlined': {
            lineHeight: 1.539,
            padding: '0.25rem 0.75rem',
          },
        },
        sizeLarge: {
          lineHeight: 1.734,
          padding: '0.5rem 1.375rem',
          '&.MuiButton-contained': {
            padding: '0.5rem 1.625rem',
          },
          '&.MuiButton-outlined': {
            lineHeight: 1.6,
            padding: '0.5rem 1.5625rem',
          },
        },
        // custom Button variant for a dark background color
        dark: {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[6],
          '& .card-more-options': {
            marginTop: '-0.25rem',
            marginRight: '-0.75rem',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '1.25rem',
          '&.card-action-dense': {
            padding: '0rem 0.625rem 0.625rem',
            '.MuiCard-root .MuiCardMedia-root + &': {
              paddingTop: '0.625rem',
            },
            '.MuiCard-root &:first-of-type': {
              paddingTop: '1.25rem',
              paddingBottom: '1.25rem',
              '& + .MuiCardContent-root': {
                paddingTop: 0,
              },
              '& + .MuiCardHeader-root': {
                paddingTop: 0,
              },
            },
          },
          '& .MuiButton-text': {
            paddingLeft: '0.625rem',
            paddingRight: '0.625rem',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1.25rem',
          '& + .MuiCardContent-root': {
            paddingTop: 0,
          },
          '&:last-child': {
            paddingBottom: '1.25rem',
          },
          '.MuiCard-root .MuiCardHeader-root + &': {
            paddingTop: '1.25rem',
          },
          '.MuiCard-root .MuiCardActions-root + &': {
            paddingTop: '1.25rem',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '1.25rem',
          '.MuiCard-root &.card-header-dense': {
            paddingBottom: '0.625rem',
            '.MuiTypography-root': {
              marginBottom: 0,
            },
          },
          '& .MuiAvatar-root': {
            marginTop: '-0.625rem',
            marginLeft: '-0.625rem',
          },
          '& .MuiCardHeader-avatar:first-child': {
            marginRight: '0.625rem',
          },
          '& .MuiCardHeader-action:first-child': {
            marginRight: '0.625rem',
          },
          '& .MuiCardHeader-content': {
            overflow: 'hidden',
          },
        },
        title: {
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          // fontWeight: theme.typography.fontWeightMedium,
        },
        subheader: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          // fontWeight: theme.typography.fontWeightRegular,
          color: theme.palette.text.secondary,
        },
        action: {
          marginTop: '-1.25rem',
          marginRight: '-1.25rem',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '0.625rem',
          '&.Mui-checked': {
            '& .MuiIconButton-label': {
              transform: 'translateX(0.625rem)',
            },
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            '& .MuiIconButton-label': {
              color: theme.palette.text.disabled,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '2.25rem',
          fontSize: '0.875rem',
          borderRadius: theme.shape.borderRadius,
          '&.MuiChip-sizeSmall': {
            height: '1.75rem',
          },
          '&.MuiChip-sizeLarge': {
            height: '2.75rem',
            fontSize: '1.125rem',
          },
          '& .MuiChip-icon': {
            marginRight: '0.625rem',
            marginLeft: '-0.375rem',
          },
          '& .MuiChip-avatar': {
            marginRight: '0.625rem',
          },
          '& .MuiChip-deleteIcon': {
            marginRight: '-0.375rem',
            marginLeft: '0.625rem',
          },
        },
        clickable: {
          '&:hover': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        outlined: {
          border: '1px solid rgba(76, 78, 100, 0.5)',
        },
        outlinedPrimary: {
          border: '1px solid rgba(102, 108, 255, 0.5)',
        },
        outlinedSecondary: {
          border: '1px solid rgba(109, 120, 141, 0.5)',
        },
        outlinedSuccess: {
          border: '1px solid rgba(114, 225, 40, 0.5)',
        },
        outlinedError: {
          border: '1px solid rgba(255, 77, 73, 0.5)',
        },
        outlinedWarning: {
          border: '1px solid rgba(253, 181, 40, 0.5)',
        },
        outlinedInfo: {
          border: '1px solid rgba(38, 198, 249, 0.5)',
        },
        deleteIconOutlined: {
          color: 'rgba(76, 78, 100, 0.5)',
        },
        deleteIconOutlinedPrimary: {
          color: 'rgba(102, 108, 255, 0.5)',
        },
        deleteIconOutlinedSecondary: {
          color: 'rgba(109, 120, 141, 0.5)',
        },
        deleteIconOutlinedSuccess: {
          color: 'rgba(114, 225, 40, 0.5)',
        },
        deleteIconOutlinedError: {
          color: 'rgba(255, 77, 73, 0.5)',
        },
        deleteIconOutlinedWarning: {
          color: 'rgba(253, 181, 40, 0.5)',
        },
        deleteIconOutlinedInfo: {
          color: 'rgba(38, 198, 249, 0.5)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#3f51b5',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          [theme.breakpoints.up('sm')]: {
            paddingLeft: '1.875rem',
            paddingRight: '1.875rem',
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: '2.5rem',
            paddingRight: '2.5rem',
          },
          [theme.breakpoints.up('lg')]: {
            paddingLeft: '3.75rem',
            paddingRight: '3.75rem',
          },
          [theme.breakpoints.up('xl')]: {
            paddingLeft: '5rem',
            paddingRight: '5rem',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          body: {
            backgroundColor: '#F5F6FA',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {},
        columnHeaders: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightMedium,
        },
        columnHeader: {
          padding: `${theme.spacing(1.5)} ${theme.spacing(3.5)}`,
          textTransform: 'capitalize',

          '&:focus': {
            outline: 'none',
          },

          '& .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-menuIcon': {
            '& .MuiSvgIcon-root': {
              color: theme.palette.common.white,
              fill: theme.palette.common.white,
            },
          },
        },
        cell: {
          color: theme.palette.text.primary,
          padding: `${theme.spacing(0.5)} calc(${theme.spacing(3.5)} + 2px)`,

          '&:focus': {
            outline: 'none',
          },

          '&:first-of-type': {
            paddingLeft: theme.spacing(3.5),
          },

          '&:nth-last-of-type(2)': {
            paddingRight: theme.spacing(2),
          },

          '&[data-field="action"]': {
            '&:focus': {
              outline: 'none',
            },
          },
        },
        row: {
          backgroundColor: theme.palette.background.paper,

          '&.Mui-selected': {
            backgroundColor: theme.palette.background.paper,
          },
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
        },
        overlayWrapper: {
          minHeight: theme.spacing(7),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[6],
          borderRadius: theme.shape.borderRadius * 1.5,
          border: `1px solid ${theme.palette.primary.dark}`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          marginTop: '2rem',
          paddingRight: '0',
          '& .MuiButton-text': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
          '&>:not(:first-of-type)': {
            marginLeft: theme.spacing(4),
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '1.25rem',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightMedium,
          padding: theme.spacing(3),
          marginBottom: theme.spacing(3),
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
        vertical: {
          marginLeft: '1.25rem',
          marginRight: '1.25rem',
          [theme.breakpoints.up('sm')]: {
            marginLeft: '1.875rem',
            marginRight: '1.875rem',
          },
          [theme.breakpoints.up('md')]: {
            marginLeft: '2.5rem',
            marginRight: '2.5rem',
          },
          [theme.breakpoints.up('lg')]: {
            marginLeft: '3.75rem',
            marginRight: '3.75rem',
          },
          [theme.breakpoints.up('xl')]: {
            marginLeft: '5rem',
            marginRight: '5rem',
          },
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        anchor: 'left',
        role: 'navigation',
        variant: 'permanent',
      },
      shouldForwardProp: (prop: keyof DrawerProps) => prop !== 'open',
      styleOverrides: {
        root: ({ ownerState }: { ownerState: Partial<DrawerProps> }) => ({
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            position: 'relative',
            width: MuiDrawerWidth,
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!ownerState.open && {
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              width: theme.spacing(7),
              [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
              },
            }),
          },
          '& .MuiList-root': {
            '& .MuiListItem-root': {
              '& .MuiListItemIcon-root': {
                '& .MuiSvgIcon-root': {
                  width: theme.spacing(3),
                  [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(5),
                  },
                },
              },
            },
          },
          '& .MuiToolbar-root': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            ...(!ownerState.open && {
              justifyContent: 'center',
            }),
          },
        }),
        paper: {
          boxShadow: theme.shadows[6],
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[900],
        },
        docked: {
          '& .MuiToolbar-root': {
            width: 'auto',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: '-0.625rem',
          marginRight: '-0.625rem',
          '& .MuiTypography-root': {
            marginBottom: 0,
          },
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          '& .MuiFormControlLabel-root:first-of-type': {
            paddingTop: '0.625rem',
          },
          '& .MuiFormControlLabel-root:last-of-type': {
            paddingBottom: '0.625rem',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          fontWeight: theme.typography.fontWeightRegular,
          color: theme.palette.text.secondary,
          '&.Mui-error': {
            color: 'rgba(255, 77, 73, 1)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '0.625rem',
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },

          '& .MuiSvgIcon-root': {
            textAlign: 'center',
          },
        },
        sizeSmall: {
          padding: '0.5rem',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-sizeSmall': {
            paddingTop: '0.625rem',
            paddingBottom: '0.625rem',
          },
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px white inset',
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.divider,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: theme.palette.text.disabled,
          },
          '&:after': {
            borderBottomColor: '#3f51b5',
          },
          '&.Mui-disabled:before': {
            borderBottomStyle: 'dotted',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.action.disabledBackground,
        },
        colorPrimary: {
          backgroundColor: '#3f51b5',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiListItem-root.Mui-selected': {
            // @ts-expect-error
            backgroundColor: theme.palette.background.selected,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
          '&.Mui-selected': {
            // @ts-expect-error
            backgroundColor: theme.palette.background.selected,
          },
        },
        // gutters: {
        //   paddingLeft: '1.25rem',
        //   paddingRight: '1.25rem',
        //   [theme.breakpoints.up('sm')]: {
        //     paddingLeft: '1.875rem',
        //     paddingRight: '1.875rem',
        //   },
        //   [theme.breakpoints.up('md')]: {
        //     paddingLeft: '2.5rem',
        //     paddingRight: '2.5rem',
        //   },
        //   [theme.breakpoints.up('lg')]: {
        //     paddingLeft: '3.75rem',
        //     paddingRight: '3.75rem',
        //   },
        //   [theme.breakpoints.up('xl')]: {
        //     paddingLeft: '5rem',
        //     paddingRight: '5rem',
        //   },
        // },
        button: {
          '&:hover': {
            // @ts-expect-error
            backgroundColor: theme.palette.background.selected,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          // minWidth: 'unset',
          // marginRight: '0.625rem',
          // marginLeft: '-0.625rem',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          // marginBottom: '0.625rem',
          // marginTop: '0.625rem',
        },
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
        secondary: {
          fontWeight: theme.typography.fontWeightRegular,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[6],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
          '&.Mui-selected': {
            // @ts-expect-error
            backgroundColor: theme.palette.background.selected,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.disabled,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3f51b5',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px white inset',
          },
        },
        inputSizeSmall: {
          paddingTop: '0.625rem',
          paddingBottom: '0.625rem',
        },
        multiline: {
          padding: '1.25rem',
        },
        notchedOutline: {
          borderRadius: '0.625rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            boxShadow: theme.shadows[6],
            borderRadius: '0.625rem',
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.text.primary,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#3f51b5',
            opacity: 0.5,
          },
          '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        sizeSmall: {
          padding: '0.5rem',
          '& .MuiSwitch-switchBase': {
            padding: '0.25rem',
          },
          '& .MuiSwitch-thumb': {
            width: '1.25rem',
            height: '1.25rem',
          },
        },
        track: {
          borderRadius: '1rem',
          opacity: 0.5,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontWeight: theme.typography.fontWeightRegular,
        },
        dark: {
          color: theme.palette.primary.dark,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#3f51b5',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          '& .MuiTablePagination-selectLabel': {
            color: theme.palette.text.primary,
          },
          '& .MuiTablePagination-select': {
            color: theme.palette.text.primary,
          },
          '& .MuiTablePagination-actions': {
            color: theme.palette.text.primary,

            '& .MuiIconButton-root': {
              color: theme.palette.text.primary,
            },
          },
          '& .MuiTablePagination-caption': {
            color: theme.palette.text.primary,
          },
          '& .MuiTablePagination-displayedRows': {
            color: theme.palette.text.primary,
          },
          '& .MuiSelect-select': {
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: theme.shape.borderRadius,
            padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
            paddingTop: `${theme.spacing(0.25)}`,
            paddingBottom: `${theme.spacing(0.25)}`,

            '&.MuiSelect-select': {
              paddingRight: '1.5rem',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
        head: {
          fontWeight: theme.typography.fontWeightMedium,
        },
        sizeSmall: {
          paddingTop: '0.625rem',
          paddingBottom: '0.625rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
        indicator: {
          backgroundColor: '#3f51b5',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&$selected': {
            color: theme.palette.common.white,
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#3f51b5',
            },
          },
        },
        sizeSmall: {
          padding: '0.5rem',
          '& .MuiToggleButton-label': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          fontWeight: theme.typography.fontWeightRegular,
          backgroundColor: theme.palette.text.primary,
        },
        arrow: {
          color: theme.palette.text.primary,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightBold,
          '& a': {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.primary.main,
            textDecoration: 'none',
          },
        },
        body1: {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          lineHeight: theme.typography.body1.lineHeight,
        },
        body2: {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
          lineHeight: theme.typography.body2.lineHeight,
        },
        h1: {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          lineHeight: theme.typography.h1.lineHeight,
        },
        h2: {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          lineHeight: theme.typography.h2.lineHeight,
        },
        h3: {
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          lineHeight: theme.typography.h3.lineHeight,
        },
        h4: {
          fontSize: theme.typography.h4.fontSize,
          fontWeight: theme.typography.h4.fontWeight,
          lineHeight: theme.typography.h4.lineHeight,
        },
        h5: {
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.h5.fontWeight,
          lineHeight: theme.typography.h5.lineHeight,
        },
        h6: {
          fontSize: theme.typography.h6.fontSize,
          fontWeight: theme.typography.h6.fontWeight,
          lineHeight: theme.typography.h6.lineHeight,
        },
      },
    },
  },
})

export default theme
