import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import './styles/index.scss';
import App from './App';
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);