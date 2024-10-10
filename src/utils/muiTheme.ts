import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#254e65',
            main: '#1f3b4d',
            dark: '#122a3a',
            // contrastText: '#C4DDE4',
            contrastText: '#eff9fc',
        },
    },
    typography: {
        fontFamily: 'Jost, Roboto, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: "12px 24px",
                },
            }
        },
    }
}

export const theme = createTheme(themeSchema);
