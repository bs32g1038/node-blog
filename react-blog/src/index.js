import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { StoreContext, $store } from './context/store';
import './styles/index.scss';
import routes from './router';

ReactDOM.hydrate(
    <StoreContext.Provider value={$store}>
        <BrowserRouter>
            {/* <Switch>
                <Route exact path="/" render={() => <Redirect to="/blog" />} /> */}
        {renderRoutes(routes, { routes })}
            {/* </Switch> */}
        </BrowserRouter>
    </StoreContext.Provider>,
    document.getElementById('app')
);