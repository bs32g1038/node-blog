import React from 'react';
import ReactDOM from 'react-dom';
import routes from './configs/router.config';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.scss';
import history from './utils/history';
import UserLogin from './pages/UserLogin';
import ScrollTop from './components/ScrollTop';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/user/login" component={UserLogin} />
                <ScrollTop>{renderRoutes(routes)}</ScrollTop>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
