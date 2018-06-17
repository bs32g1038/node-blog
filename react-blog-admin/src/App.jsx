import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Articles from './components/Articles';
// import asyncComponent from './components/asyncComponent';
import ArticleEdit from './components/ArticleEdit';
import Guestbooks from './components/Guestbooks';
import GuestbookReply from './components/GuestbookReply';
import Categories from './components/Categories';
import CategoryEdit from './components/CategoryEdit';
import Comments from './components/Comments';
import CommentReply from './components/CommentReply';
import Links from './components/Links';
import LinkEdit from './components/LinkEdit';
import AppSideMenu from './components/AppSideMenu';
import ChatRoomGroups from './components/ChatRoom/Groups';
import ChatRoomGroupsEdit from './components/ChatRoom/GroupsEdit';
import Users from './components/ChatRoom/Users';

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
                                <Route exact path="/blog/admin/chatroom/groups" component={ChatRoomGroups} />
                                <Route exact path="/blog/admin/chatroom/groups/edit" component={ChatRoomGroupsEdit} />
                                <Route exact path="/blog/admin/chatroom/groups/edit/:id" component={ChatRoomGroupsEdit} />
                                <Route exact path="/blog/admin/chatroom/users" component={Users} />

                            </Switch>
                    )} />
                    <AppFooter />
                </div>
            </div>
        );
    }
}

export default withRouter(App);