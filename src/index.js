import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './styles/index.scss';
import routes from './router';
import { renderRoutes } from 'react-router-config'
import App from './App';
const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
ReactDOM.hydrate (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/blog" />} />
        <Route path="/blog" component={()=> <App {...initialData}/>} />
      </Switch>
    </BrowserRouter>,
    document.getElementById('apps')
);