import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'store';

import 'normalize.css';
import theme from 'theme';

import App from 'components/App/App';


render(
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ThemeProvider>,
  document.getElementById('root')
);
