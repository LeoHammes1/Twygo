import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { ChakraProvider, ColorModeProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import App from './App';
import theme from './theme/theme';

type ColorMode = 'light' | 'dark';

const getInitialColorMode = (): ColorMode => {
  const savedMode = window.localStorage.getItem('chakra-ui-color-mode') as ColorMode;
  return savedMode === 'dark' ? 'dark' : 'light';
};

const AppWrapper = () => {
  const initialColorMode = getInitialColorMode();

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <ColorModeProvider options={{ initialColorMode }}>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Criar o root

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
