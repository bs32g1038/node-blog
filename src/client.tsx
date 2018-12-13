import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Store from './redux/store';
import routes from './router';

// 实际打包时应该不引入mock
// if (process.env.NODE_ENV !== 'production') { require('./mock'); }

const W: any = window;

hydrate(
    <Provider store={Store(W.__INITIAL_STATE__)}>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" render={() => <Redirect to="/blog" />} />
                {renderRoutes(routes, { routes })}
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
