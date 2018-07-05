import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppHeader from './components/app-header';
import Categories from "./components/categories";
import AppFooter from './components/app-footer';
// import progress from './components/Progress';
import axios from './utils/axios';
// import { getFieldFromProps } from './utils/helper';
import { matchRoutes, renderRoutes } from 'react-router-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
            categories: (this.props.$store && this.props.$store.categories) || [],
            previousLocation: null,
            isFetching: false
        };
    }

    static asyncData({ store }) {
        if (store.categories.length > 0) {
            return Promise.resolve();
        }
        return axios.get('/categories').then((_) => {
            // console.log('分类', _.data);
            return store.setCategories(_.data);
        });
    }

    getDataBeforeRouter(location) {
        const branchs = matchRoutes(this.state.routes, location.pathname);
        return Promise.all(branchs.map(branch => {
            return branch && branch.route.asyncData && branch.route.asyncData({ store: this.props.$store });
        }));
    }

    componentDidMount() {
        this.getDataBeforeRouter(this.props.location).catch(err => {
            console.log('获取数据失败！', err);
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const navigated = nextProps.location && (nextProps.location !== prevState.previousLocation);
        if (navigated) {
            window.scrollTo(0, 0);
            return { previousLocation: nextProps.location };
        }
        return true;
    }
    componentDidUpdate() {
        this.getDataBeforeRouter(this.props.location).catch(err => {
            console.log('获取数据失败！', err);
        });
    }
    render() {
        console.log(this.state, this.props.$store)
        return (
            <div className="app-main">
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