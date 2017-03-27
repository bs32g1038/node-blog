import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import routes from './routes'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/index';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
