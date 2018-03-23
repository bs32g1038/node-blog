import * as React from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom'
import { parseTime, timeAgo } from '../utils/time';
import config from '../config';
import CommentForm from './CommentForm';

const LoadingMasker = (
    <div className="guestbook-list-loading-masker">
        <div className="guestbook-item">
            <div className="guestbook-user">
                <div className="guestbook-user-content masker-background"></div>
                <div className="guestbook-user-mata masker-background"></div>
            </div>
            <div className="guestbook-user blog">
                <div className="guestbook-user-content masker-background"></div>
                <div className="guestbook-user-mata masker-background"></div>
            </div>
        </div>
    </div>
)

export default class Guestbooks extends React.Component {
    
    static fetch(match, location, options) {
        return axios.get('/guestbooks')
    }

    render() {
        let results = this.props.data;
        let guestbooks = results ? results[0].data : [];
        return (
            <div className="app-guestbook-list">
                <h2 className="resume">--留言板--</h2>
                {
                    guestbooks.map((guestbook) => (
                        <div className="guestbook-item" key={guestbook._id}>
                            <div className="guestbook-user">
                                <div className="guestbook-user-content">{guestbook.content}</div>
                                <div className="guestbook-user-mata">
                                    <span><i className="fa fa-user fa-fw"></i>{guestbook.nickName}</span>
                                    <em> · </em>
                                    <span><i className="fa fa-clock-o fa-fw"></i>{parseTime(guestbook.createdAt)}</span>
                                    <em> · </em>{
                                        guestbook.location && <span className="date"><i className="fa fa-map-marker fa-fw"></i>{guestbook.location}</span>
                                    }
                                </div>
                            </div>
                            {
                                guestbook.replyContent &&
                                (<div className="guestbook-user blog">
                                    <div className="guestbook-user-content"><strong>@{guestbook.nickName}</strong>&nbsp;&nbsp;{guestbook.replyContent}</div>
                                    <div className="guestbook-user-mata">
                                        <span><i className="fa fa-user fa-fw"></i>{config.site.author.nick_name}</span>
                                        <em> · </em>
                                        <span><i className="fa fa-clock-o fa-fw"></i>{parseTime(guestbook.updatedAt)}</span>
                                        <em> · </em>
                                        <span><i className="fa fa-map-marker fa-fw"></i>{config.site.author.location}</span>
                                    </div>
                                </div>)
                            }
                        </div>
                    ))
                }
                <div className="guestbook-form">
                    <CommentForm url="/guestbooks"></CommentForm>
                </div>
            </div>
        )
    }
}