import { createMuiTheme } from '@material-ui/core/styles';

// Central design tokens for Mediclick's "calm telemedicine" visual identity.
// Everything below is consumed via <ThemeProvider theme={theme}> in App.js,
// so individual screens should pull colors/spacing from `theme` (through
// makeStyles/withStyles) instead of hard-coding hex values inline.

const palette = {
  primary: {
    // Deep clinical teal — used for primary actions, the app bar and links.
    lighter: '#E4F3F3',
    light: '#4FA6A8',
    main: '#0E7C86',
    dark: '#0A5B63',
    contrastText: '#FFFFFF'
  },
  secondary: {
    // Muted slate — used for secondary/back/neutral actions so the primary
    // teal keeps its meaning as "the main thing to do on this screen".
    light: '#94A3B8',
    main: '#5B6B79',
    dark: '#3F4B57',
    contrastText: '#FFFFFF'
  },
  success: {
    light: '#DFF5EC',
    main: '#2E9E6F',
    dark: '#1F7350',
    contrastText: '#FFFFFF'
  },
  warning: {
    light: '#FFF3DE',
    main: '#E2A63B',
    dark: '#A9782A',
    contrastText: '#3F2E00'
  },
  error: {
    light: '#FCE8E6',
    main: '#D0574A',
    dark: '#9C3E33',
    contrastText: '#FFFFFF'
  },
  grey: {
    50: '#F7FAFA',
    100: '#F0F5F5',
    200: '#E3EBEC',
    300: '#CBD8DA',
    400: '#A9BCC0',
    500: '#7E939A',
    600: '#5B6B79',
    700: '#3F4B57',
    800: '#28323C',
    900: '#182028'
  },
  text: {
    primary: '#1F2A33',
    secondary: '#5B6B79',
    disabled: '#A9BCC0'
  },
  background: {
    default: '#F4F8F9',
    paper: '#FFFFFF'
  },
  divider: '#E3EBEC'
};

const fontFamily = [
  'Inter',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif'
].join(',');

const headingFontFamily = [
  'Poppins',
  'Inter',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  'Arial',
  'sans-serif'
].join(',');

const theme = createMuiTheme({
  palette,
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily,
    h1: { fontFamily: headingFontFamily, fontWeight: 700 },
    h2: { fontFamily: headingFontFamily, fontWeight: 700 },
    h3: { fontFamily: headingFontFamily, fontWeight: 700 },
    h4: { fontFamily: headingFontFamily, fontWeight: 600 },
    h5: { fontFamily: headingFontFamily, fontWeight: 600 },
    h6: { fontFamily: headingFontFamily, fontWeight: 600 },
    subtitle1: { fontFamily },
    button: { fontFamily, fontWeight: 600, textTransform: 'none' }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10
      },
      containedPrimary: {
        boxShadow: '0 4px 14px rgba(14, 124, 134, 0.25)'
      },
      contained: {
        boxShadow: 'none'
      },
      sizeLarge: {
        fontSize: '1rem',
        paddingLeft: 28,
        paddingRight: 28
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: 16
      },
      elevation1: {
        boxShadow: '0 2px 10px rgba(31, 42, 51, 0.06)'
      },
      elevation4: {
        boxShadow: '0 8px 30px rgba(31, 42, 51, 0.08)'
      }
    },
    MuiCard: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(31, 42, 51, 0.06)'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: palette.primary.main
      }
    },
    MuiChip: {
      root: {
        fontWeight: 600
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 10
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        fontWeight: 600
      }
    }
  }
});

export default theme;
