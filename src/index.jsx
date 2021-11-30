/* eslint-disable prefer-destructuring */
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

const breakpoints = createBreakpoints({
  sm: '360px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
});
const overrides = { breakpoints };
const customTheme = extendTheme(overrides);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
