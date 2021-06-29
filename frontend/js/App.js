import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import SentryBoundary from './components/SentryBoundary';
import Home from './pages/Home';
import configureStore from './store';

const store = configureStore({});
const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Home />
    </Provider>
  </SentryBoundary>
);

export default hot(App);
