import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppHeader from './components/app-header';
import Categories from "./components/categories";
import AppFooter from './components/app-footer';
import Progress from './components/progress';
import axios from './utils/axios';
import { isSSR } from './context/store';
import queryString from 'query-string';
import { matchRoutes, renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        const { routes, $store } = this.props;
        this.state = {
            routes,
            categories: ($store && $store.categories) || [],
            previousLocation: this.props.location,
            isFetching: false,
            isShowProgress: false,
            percent: 0,
            _timer: null
        };
    }
    static asyncData({ store }) {
        if (store.categories.length > 0) {
            return Promise.resolve();
        }
        return axios.get('/categories').then((_) => {
            return store.setCategories(_.data);
        });
    }
    getDataBeforeRouter(location) {
        const q = queryString.parse(location.search);
        const branchs = matchRoutes(this.state.routes, location.pathname);
        return Promise.all(branchs.map(branch => {
            return branch && branch.route.asyncData && branch.route.asyncData({
                store: this.props.$store,
                route: {
                    query: q,
                    params: branch.match.params
                }
            });
        }));
    }
    componentDidMount() {
        if (isSSR()) {
            return;
        }
        this.getDataBeforeRouter(this.props.location).catch(err => {
            console.log('获取数据失败！', err);
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.previousLocation != this.props.location && !this.state.isFetching) {
            this.setState({
                isFetching: true
            });
            this.increase();
        }
        if (this.state.isFetching) {
            this.getDataBeforeRouter(this.props.location).then((res) => {
                this.setState({
                    previousLocation: this.props.location,
                    isFetching: false
                });
                this.finishProgress();
            }).catch(err => {
                console.log('获取数据失败！', err);
            });
        }
    }
    increase() {
        if (this.state.percent > 95 && !this.state.isShowProgress) {
            return this.setState({
                percent: 0,
                isShowProgress: true
            });
        }
        const percent = this.state.percent + 30 * Math.random();
        if (percent >= 95) {
            clearTimeout(this._timer);
            return;
        }
        this.setState({ percent, isShowProgress: true });
        this._timer = setTimeout(() => this.increase(), 1000);
    }
    finishProgress() {
        clearInterval(this._timer);
        clearInterval(this._t);
        this.setState({
            percent: 100
        });
        this._t = setTimeout(() => {
            this.setState({
                isShowProgress: false
            });
        }, 500);
    }
    render() {
        return (
            <div className="app-main">
                <Progress show={this.state.isShowProgress} percent={this.state.percent} />
                <AppHeader />
                <Categories categories={this.state.categories} />
                <Route
                    location={this.state.previousLocation || this.props.location}
                    render={() => (
                        renderRoutes(this.state.routes[0].routes)
                    )}
                />
                <AppFooter />
            </div>
        );
    }
}

export default App;