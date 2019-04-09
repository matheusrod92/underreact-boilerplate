import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './containers/App';
import initStore from './store';
import theme from './globals/theme';
import GlobalStyles from './globals/reset';

const store = initStore();

export default () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </Provider>
  </ThemeProvider>
);
