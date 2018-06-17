import React, { Component } from 'react';
import axios from '../../utils/axios';
import { timeAgo } from '../../utils/time';
import CommentForm from '../CommentForm';
import styles from './cssmodule.scss';
import DocumentTitle from '../DocumentTitle';

export default class Guestbooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guestbooks: this.props.guestbooks || []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            guestbooks: nextProps.guestbooks
        });
    }
    static asyncData(match, location) {
        return axios.get('/guestbooks').then((_) => ({ guestbooks: _.data }));
    }
    render() {
        let lefts = [], rigths = [];
        this.state.guestbooks.map((guestbook, index) => {
            const item = (
                <div className={styles.guestbookItem} key={guestbook._id}>
                    <div className={styles.userMata}>
                        {
                            guestbook.website ?
                                <a href={guestbook.website} className={styles.avatar} rel="noopener noreferrer" target="_blank">
                                    <img className={styles.avatarImg} src={guestbook.avatar} alt={guestbook.nickName} />
                                </a>
                                :
                                <div className={styles.avatar}>
                                    <img className={styles.avatarImg} src={guestbook.avatar} alt={guestbook.nickName} />
                                </div>
                        }
                        <span className={styles.nickName}>
                            <strong>{guestbook.nickName}</strong>
                        </span>
                        <span className={styles.map}>
                            <i className="fa fa-map-marker fa-fw"></i>
                            {guestbook.location || '远方的来客'}
                        </span>
                        <span className={styles.time}>
                            <i className="fa fa-clock-o fa-fw"></i>
                            {timeAgo(guestbook.createdAt)}
                        </span>
                    </div>
                    <div className={styles.userContent}>{guestbook.content}</div>
                    <div className={styles.userContent}><strong>回复：</strong>&nbsp;&nbsp;{guestbook.replyContent || '暂无回复...'}</div>
                </div>);
            return index % 2 == 0 ? lefts.push(item) : rigths.push(item);
        });
        return (
            <DocumentTitle title="留言版">

                <div className={styles.guestbook}>
                    <h2 className={styles.resume}>--留言板--</h2>
                    <div className={styles.main}>
                        <div className={styles.left}>{lefts}</div>
                        <div className={styles.right}>{rigths}</div>
                    </div>
                    <div className={styles.form}>
                        <CommentForm url="/guestbooks"></CommentForm>
                    </div>
                </div>
            </DocumentTitle>

        );
    }
}