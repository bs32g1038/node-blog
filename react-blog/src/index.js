import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
import routes from './router';
ReactDOM.hydrate(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/blog" />} />
            <Route path="/blog" component={(props) => <App {...props} routes={routes} />} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);