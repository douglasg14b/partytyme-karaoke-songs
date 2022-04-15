import { createTheme } from "@mui/material";

const theme = createTheme({
    spacing: 4,
    typography: {
        fontSize: 14
    },
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '8px 12px',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '8px 12px',
          },
        },
      },
    },
});

export {
    theme
}