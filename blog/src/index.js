import { Component, render } from 'inferno';
import { BrowserRouter, Route, Switch, Redirect } from 'inferno-router';
import './styles/index.scss';
import App from './App'
render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/blog" />} />
        <Route path="/blog" component={App} />
      </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);