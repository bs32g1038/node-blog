import * as React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Articles from './components/Articles';
import Guestbooks from './components/Guestbooks';
import Article from './components/Article';
import About from './components/About';
import axios from './utils/axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    componentDidMount() {
        axios.get('/categories').then((res) => {
            this.setState({
                categories: res.data,
            });
        });
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
                <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/blog"/>)}/>
                    <Route exact path="/blog" component={Articles} />
                    <Route exact path="/blog/articles" component={Articles} />
                    <Route exact path="/blog/articles/:id" component={Article} />
                    <Route exact path="/blog/guestbook" component={Guestbooks} />
                    <Route exact path="/blog/about" component={About} />
                </Switch>
                <AppFooter />
            </div>
        )
    }
}

