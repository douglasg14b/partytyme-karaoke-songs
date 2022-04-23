import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";

const theme = createTheme({
    spacing: 4,
    typography: {
        fontSize: 14
    },
	palette: {
		mode: 'light',
		green400: {
            main: green[400],
            contrastText: '#fff',
		},
		grey600: {
            main: grey[600],
            contrastText: '#fff',
		}
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


declare module '@mui/material/styles' {
    interface Palette {
        green400: Palette['primary'];
        grey600: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        green400?: PaletteOptions['primary'];
        grey600?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        green400: true;
        grey600: true;
    }
}
declare module '@mui/material/Fab' {
    interface FabPropsColorOverrides {
        green400: true;
        grey600: true;
    }
}


declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        green400: true;
        grey600: true;
    }
}

export {
    theme
}