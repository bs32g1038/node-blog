import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import asyncComponent from './components/asyncComponent';
const Articles = asyncComponent(()=>import('./components/Articles'));
const ArticleEdit = asyncComponent(()=>import('./components/ArticleEdit'));
const Guestbooks = asyncComponent(()=>import('./components/Guestbooks'));
const GuestbookReply = asyncComponent(()=>import('./components/GuestbookReply'));
const Categories = asyncComponent(()=>import('./components/Categories'));
const CategoryEdit = asyncComponent(()=>import('./components/CategoryEdit'));
const Comments = asyncComponent(()=>import('./components/Comments'));
const CommentReply = asyncComponent(()=>import('./components/CommentReply'));
const Links = asyncComponent(()=>import('./components/Links'));
const LinkEdit = asyncComponent(()=>import('./components/LinkEdit'));
import AppSideMenu from './components/AppSideMenu';

import config from './config';

class App extends Component {
    constructor(props) {
        super(props);
    }
    check() {
        return localStorage.getItem(config.tokenKey);
    }
    render() {
        return (
            <div className="app">
                <AppSideMenu />
                <div className="app-main">
                    <AppHeader />
                    <Route path="/blog/admin" render={() => (
                        !this.check() ?
                            <Redirect to="/blog/admin/login"></Redirect>
                            :
                            <Switch>
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
                                <Route exact path="/blog/admin/links" component={Links} />
                                <Route exact path="/blog/admin/links/edit" component={LinkEdit} />
                                <Route exact path="/blog/admin/links/edit/:id" component={LinkEdit} />
                            </Switch>
                    )} />
                    <AppFooter />
                </div>
            </div>
        );
    }
}

export default withRouter(App);