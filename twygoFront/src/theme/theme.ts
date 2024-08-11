import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: { 500: '#a847e3' },
    secondary: { 500: '#4e89f7' },
    accent: {
      500: '#58e3a8',
      600: '#f7a647',
      700: '#e8c400',
      800: '#ff5722',
    },
    background: {
      light: {
        default: '#f5f5f5',
        sidebar: '#ffffff',
        header: '#ffffff',
        card: '#ffffff',
      },
      dark: {
        default: '#1a202c',
        sidebar: '#20242c',
        header: '#20242c',
        card: '#343444',
      },
    },
    neutral: {
      light: '#6e6e6e',
      dark: '#e2e2e2',
    },
    text: {
      light: '#333333',
      dark: '#f5f5f5',
    },
    border: {
      light: '#dcdcdc',
      dark: '#444444',
    },
    gray: {
      200: '#e2e8f0',
      600: '#4a5568',
    },
  },
  styles: {
    global: (props: { colorMode: string; }) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'background.dark.default' : 'background.light.default',
        color: props.colorMode === 'dark' ? 'text.dark' : 'text.light',
      },
      '*': {
        boxSizing: 'border-box',
      },
    }),
  },
});

export default theme;
