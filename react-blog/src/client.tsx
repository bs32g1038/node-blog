import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ScrollToTop } from './components/scroll-to-top';
import Store from './redux/store';
import routes from './router';

const W: any = window;

hydrate(
    <Provider store={Store(W.__INITIAL_STATE__)}>
        <BrowserRouter>
            <ScrollToTop>
                <Switch>
                    {renderRoutes(routes, { routes })}
                </Switch>
            </ScrollToTop>
        </BrowserRouter>
    </Provider> as any,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
