import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath, Switch } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Categories from "./components/Categories";
import AppFooter from './components/AppFooter';
import progress from './components/Progress';
import axios from './utils/axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
            categories: [],
            previousLocation: null,
            data: null,
            isFetching: false
        };
    }

    getChildContext() {
        return {
            siteInfo: {
                name: 'Lizc博客',
                icp: '粤ICP备16021965号-2',
                github: 'https://github.com/bs32g1038/node-blog'
            }
        };
    }

    getDataBeforeRouter(location) {
        return Promise.all(
            this.state.routes.map(route => {
                let match = matchPath(location.pathname, route);
                if (match) {
                    return route.component.asyncData && route.component.asyncData(match, location);
                }
            }).filter(_ => !!_)).then(([data]) => data).catch(err => { });
    }

    componentDidMount() {
        const p = Promise.all([axios.get('/categories'), this.getDataBeforeRouter(this.props.location)]);
        p.then(([resCategory, data]) => {
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
        progress.start();
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
                    progress.finish();
                });
        }
    }
    render() {
        return (
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
        );
    }
}

App.childContextTypes = {
    siteInfo: PropTypes.shape({
        name: PropTypes.string,
        icp: PropTypes.string,
        github: PropTypes.string
    })
};