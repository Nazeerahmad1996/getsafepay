// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#193A8C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00cf83',
    },

  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  }
});

export default theme;
