import React, { Component } from 'react';
import { Route, matchPath, Switch } from 'react-router-dom';
import AppHeader from './components/app-header';
import Categories from "./components/categories";
import AppFooter from './components/app-footer';
// import progress from './components/Progress';
import axios from './utils/axios';
import * as store from './utils/store';
import { withStore, StoreContext, $store } from './context/store';
import { matchRoutes, renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
            categories: [],
            previousLocation: null,
            data: this.props.data,
            isFetching: false
        };
    }

    getDataBeforeRouter(location) {
        // return Promise.all(
        const branch = matchRoutes(this.state.routes, location.pathname);
        console.log(branch)

        // this.state.routes.map(route => {
        //     let match = matchPath(location.pathname, route);
        //     if (match) {
        //         return route.component.asyncData && route.component.asyncData(match, location);
        //     }
        // }).filter(_ => !!_)).then(([data]) => data).catch(err => { });
    }

    componentDidMount() {
        if (store.isSSR()) {
            return this.setState({
                categories: store.__INITIAL_STATE__().categories,
                data: store.__INITIAL_STATE__()
            });
        }
        const p = Promise.all([axios.get('/categories'), this.getDataBeforeRouter(this.props.location)]);
        p.then(([resCategory, data]) => {
            console.log(data)
            this.setState({
                categories: resCategory.data,
                data
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const navigated = nextProps.location !== this.props.location;
        // progress.start();
        if (navigated && !this.state.isFetching) {
            window.scrollTo(0, 0);
            this.setState({
                previousLocation: this.props.location,
                isFetching: true
            });
            this.getDataBeforeRouter(nextProps.location)
                .then((data) => {
                    this.setState({
                        data,
                        previousLocation: null,
                        isFetching: false
                    });
                    // progress.finish();
                });
        }
    }
    render() {
        // console.log(this.state.categories)
        return (
            <StoreContext.Provider value={$store}>
                <div className="app-main">
                    <AppHeader />
                    <Categories categories={this.state.categories} />
                    <Route
                        location={this.state.previousLocation || this.props.location}
                        render={() => (
                            <Switch>
                                {this.state.routes.map((route, i) => (
                                    <Route
                                        key={route.key || i}
                                        path={route.path}
                                        exact={route.exact}
                                        strict={route.strict}
                                        render={props => (
                                            <route.component {...props} {...this.state.data} />
                                        )}
                                    />
                                ))}
                            </Switch>
                        )}
                    />
                    <AppFooter />
                </div>
            </StoreContext.Provider>
        );
    }
}

export default App;