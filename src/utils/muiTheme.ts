import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#be0000',
            main: '#800000',
            dark: '#1A191D',
            // contrastText: '#ffeeee',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        textTransform: 'none',
        fontSize: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '0px',
                    padding: "12px 24px",
                },
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    }
}

export const theme = createTheme(themeSchema);
