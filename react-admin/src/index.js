import './styles/theme.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import App from './App';
import Login from './components/Login';
class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/blog/admin/login" component={Login} />
                <Route path="/blog/admin" component={App} />
            </Switch>
        );
    }
}

ReactDOM.render(
    <Router history={history}>
        <Main />
    </Router>,
    document.getElementById('app')
);
