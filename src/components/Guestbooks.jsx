import { Component } from 'inferno';
import axios from '../utils/axios';
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

export default class Guestbooks extends Component {

    static fetch(match, location, options) {
        return axios.get('/guestbooks').then((_) => ({ guestbooks: _.data }));
    }

    render() {
        let data = this.props.data;
        let guestbooks = data ? data.guestbooks : [];
        let lefts = [], rigths = [];
        guestbooks.map((guestbook, index) => {
            const item = (<div className="guestbook-item" key={guestbook._id}>
                <div class="guestbook-user">
                    <div class="guestbook-user-mata">
                        <div className="avatar">
                            <img src={guestbook.avatar} alt={guestbook.nickName} />
                        </div>
                        <span class="nick-name">
                            <strong>{guestbook.nickName}</strong>
                        </span>
                        <span className="map">
                            <i className="fa fa-map-marker fa-fw"></i>
                            {config.site.author.location}
                        </span>
                        <span class="time">
                            <i class="fa fa-clock-o fa-fw"></i>
                            {timeAgo(guestbook.createdAt)}前
                        </span>
                    </div>
                    <div class="guestbook-user-content">{guestbook.content}</div>
                    <div class="guestbook-user-content"><strong>回复：</strong>&nbsp;&nbsp;{guestbook.replyContent || '暂无回复...'}</div>
                </div>
            </div>)
            return index % 2 == 0 ? lefts.push(item) : rigths.push(item);
        })
        return (
            <div className="app-guestbook-list">
                <h2 className="resume">--留言板--</h2>
                <div className="guestbook-list-wrap">
                    <div className="guestbook-list-left">{lefts}</div>
                    <div className="guestbook-list-right">{rigths}</div>
                </div>
                <div className="guestbook-form">
                    <CommentForm url="/guestbooks"></CommentForm>
                </div>
            </div>
        )
    }
}