import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Articles from './components/Articles';
import ArticleEdit from './components/ArticleEdit';
import Guestbooks from './components/Guestbooks';
import GuestbookReply from './components/GuestbookReply';
import Categories from './components/Categories';
import CategoryEdit from './components/CategoryEdit';
import Comments from './components/Comments';
import CommentReply from './components/CommentReply';
import Article from './components/Article';
import About from './components/About';
import axios from './utils/axios';
import { Link } from 'react-router-dom';

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
                <Switch>
                    <Route exact path="/admin" render={() => (<Redirect to="/blog/admin"/>)}/>
                    <Route exact path="/blog/admin" component={Articles} />
                    <Route exact path="/blog/admin/articles" component={Articles} />
                    <Route exact path="/blog/admin/articles/edit" component={ArticleEdit} />
                    <Route exact path="/blog/admin/articles/edit/:id" component={ArticleEdit} />
                    <Route exact path="/blog/admin/comments" component={Comments} />
                    <Route exact path="/blog/admin/comments/reply/:id" component={CommentReply} />
                    <Route exact path="/blog/admin/guestbooks" component={Guestbooks} />
                    <Route exact path="/blog/admin/guestbooks/reply/:id" component={GuestbookReply} />
                    <Route exact path="/blog/admin/categories" component={Categories} />
                    <Route exact path="/blog/admin/categories/edit" component={CategoryEdit} />
                    <Route exact path="/blog/admin/categories/edit/:id" component={CategoryEdit} />
                    <Route exact path="/blog/about" component={About} />
                </Switch>
                <AppFooter />
            </div>
        )
    }
}
