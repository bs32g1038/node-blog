import React, { Component } from 'react';
import axios from '../../utils/axios';
import { timeAgo } from '../../utils/time';
import CommentForm from '../comment-form';
import DocumentTitle from '../document-title';

export default class Guestbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guestbooks: (this.props.$store && this.props.$store.guestbooks) || []
        };
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            guestbooks: nextProps.$store.guestbooks
        };
    }
    static asyncData({ store }) {
        return axios.get('/guestbooks').then((_) => {
            return store.setGuestbooks(_.data);
        });
    }
    render() {
        let lefts = [], rigths = [];
        this.state.guestbooks.map((guestbook, index) => {
            const item = (
                <div className="Guestbooks-item" key={guestbook._id}>
                    <div className="Guestbooks-userMata">
                        {
                            guestbook.website ?
                                <a href={guestbook.website} className="Guestbooks-avatar" rel="noopener noreferrer" target="_blank">
                                    <img className="Guestbooks-avatarImg" src={guestbook.avatar} alt={guestbook.nickName} />
                                </a>
                                :
                                <div className="Guestbooks-avatar">
                                    <img className="Guestbooks-avatarImg" src={guestbook.avatar} alt={guestbook.nickName} />
                                </div>
                        }
                        <span className="Guestbooks-nickName">
                            <strong>{guestbook.nickName}</strong>
                        </span>
                        <span className="Guestbooks-map">
                            <i className="fa fa-map-marker fa-fw"></i>
                            {guestbook.location || '远方的来客'}
                        </span>
                        <span className="Guestbooks-time">
                            <i className="fa fa-clock-o fa-fw"></i>
                            {timeAgo(guestbook.createdAt)}
                        </span>
                    </div>
                    <div className="Guestbooks-userContent">{guestbook.content}</div>
                    <div className="Guestbooks-userContent"><strong>回复：</strong>&nbsp;&nbsp;{guestbook.replyContent || '暂无回复...'}</div>
                </div>);
            return index % 2 == 0 ? lefts.push(item) : rigths.push(item);
        });
        return (
            <DocumentTitle title="留言版">
                <div className="Guestbooks">
                    <h2 className="Guestbooks-resume">--留言板--</h2>
                    <div className="Guestbooks-main">
                        <div className="Guestbooks-left">{lefts}</div>
                        <div className="Guestbooks-right">{rigths}</div>
                    </div>
                    <div className="Guestbooks-form">
                        <CommentForm url="/guestbooks"></CommentForm>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}