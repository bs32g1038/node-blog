import {  render } from 'inferno';
import { BrowserRouter, Switch } from 'inferno-router';
import './styles/index.scss';
import App from './App';
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);