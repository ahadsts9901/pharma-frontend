import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme } from '@mui/material/styles';

export const themeSchema: any = {
    palette: {
        primary: {
            light: '#3f3b3e',
            main: '#3f3b3e',
            dark: '#494346',
            contrastText: '#f8f7f8',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'none',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    // borderRadius: '50px',
                    // padding: "12px 24px",
                },
            }
        },
    }
}

export const theme = createTheme(themeSchema);
