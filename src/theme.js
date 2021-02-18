import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink, red, green, cyan, orange, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue.A700,
      main: blue.A700,
      dark: blue.A700,
      contrastText: grey[50],
    },
    secondary: {
      main: pink.A700,
    },
    success: {
      main: green.A700,
    },
    info: {
      light: cyan.A700,
      main: cyan.A700,
      dark: cyan.A700,
      contrastText: grey[50],
    },
    warning: {
      main: orange.A700,
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: grey[50],
      secondary: grey[400],
      disabled: grey[500],
    },
    background: {
      light: grey[800],
      default: grey[900],
    },
  },
});

export default theme;
