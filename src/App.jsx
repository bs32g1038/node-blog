import { Component, render } from 'inferno';
import { Route,  Link } from 'inferno-router';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import axios from './utils/axios';
import { renderRoutes } from './router-util';
import routerFetch from './utils/router-fetch';
import routes from './router';
import progress from './components/Progress';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            previousLocation: null,
            data: null,
            isFetching: false
        };
    }
    componentWillMount() {
        const p = Promise.all([axios.get('/categories'), routerFetch(routes, this.props.location)])
        p.then(([resCategory, resArticle]) => {
            this.setState({
                categories: resCategory.data,
                data: resArticle
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        const navigated = nextProps.location !== this.props.location
        progress.start()
        if (navigated && !this.state.isFetching) {
            this.setState({
                previousLocation: this.props.location,
                isFetching: true
            })
            routerFetch(routes, nextProps.location)
                .then((data) => {
                    this.setState({
                        data,
                        previousLocation: null,
                        isFetching: false
                    })
                    progress.finish()
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