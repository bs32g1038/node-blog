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
import Login from './components/Login';
import About from './components/About';
import axios from './utils/axios';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    check(Item) {
        return (props) => {
            const user = sessionStorage.getItem("user");
            if (!user) {
                return <Redirect to='/blog/admin/login'></Redirect>
            } else {
                return <Item {...props} />
            }
        }
    }
    render() {
        return (
            <div className="app-main">
                <AppHeader />
                <Switch>
                    <Route exact path="/blog/admin/login" component={Login} />
                    <Route exact path="/blog/admin" component={this.check(Articles)} />
                    <Route exact path="/blog/admin/articles" component={this.check(Articles)} />
                    <Route exact path="/blog/admin/articles/edit" component={this.check(ArticleEdit)} />
                    <Route exact path="/blog/admin/articles/edit/:id" component={this.check(ArticleEdit)} />
                    <Route exact path="/blog/admin/comments" component={this.check(Comments)} />
                    <Route exact path="/blog/admin/comments/reply/:id" component={this.check(CommentReply)} />
                    <Route exact path="/blog/admin/guestbooks" component={this.check(Guestbooks)} />
                    <Route exact path="/blog/admin/guestbooks/reply/:id" component={this.check(GuestbookReply)} />
                    <Route exact path="/blog/admin/categories" component={this.check(Categories)} />
                    <Route exact path="/blog/admin/categories/edit" component={this.check(CategoryEdit)} />
                    <Route exact path="/blog/admin/categories/edit/:id" component={this.check(CategoryEdit)} />
                    <Route exact path="/blog/about" component={this.check(About)} />
                </Switch>
                <AppFooter />
            </div>
        )
    }
}

export default withRouter(App);