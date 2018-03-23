import * as React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import axios from './utils/axios';
import { renderRoutes, matchRoutes } from 'react-router-config'
import reactRouterFetch from './utils/router-fetch';
import routes from './router';
// import progress from './components/progress';

class App extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            categories: this.props.categories,
            previousLocation: null,
            data: this.props.data,
            isFetching: false
        };
    }
    componentDidMount() {
        const p = Promise.all([axios.get('/categories'), reactRouterFetch(routes, this.props.location)])
        p.then(([resCategory, resArticle]) => {
            this.setState({
                categories: resCategory.data,
                data: resArticle
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        const navigated = nextProps.location !== this.props.location
        if (navigated && !this.state.isFetching) {
            // progress.start()
            this.setState({
                previousLocation: this.props.location,
                isFetching: true
            })
            reactRouterFetch(routes, nextProps.location)
                .then((data) => {
                    this.setState({
                        data,
                        previousLocation: null,
                        isFetching: false
                    })
                    // progress.finish()
                })
        }
    }
    render() {
        return (
            <div className="app-main">
                <AppHeader />
                <ul className="app-category-list">
                    <li className="app-category-item">
                        <i className="fa fa-book fa-fw"></i>分类
                    </li>
                    {
                        this.state.categories.map((item) => (
                            <li className="app-category-item" key={item._id}>
                                <Link to={`/blog/articles?cid=${item._id}`}>
                                    {item.name}<span>({item.articleCount})</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Route
                    location={this.state.previousLocation || this.props.location}
                    render={() => renderRoutes(routes, { data: this.state.data })}
                />
                <AppFooter />
            </div>
        )
    }
}

export default App