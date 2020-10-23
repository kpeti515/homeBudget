import React from 'react';
import ReactDOM from 'react-dom';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
