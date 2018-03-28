import { Component } from 'inferno';
import config from '../config';
import { parseTime, timeAgo } from '../utils/time';
import axios from '../utils/axios';
import CommentForm from './CommentForm';
import queryString from 'query-string';

const replyFn = (item) => (
    <div className="comments-quote">
        <span className="comments-info-author"><i className="fa fa-fw fa-user"></i>{item.nickName}
        </span>
        <span className="comments-info-time">{timeAgo(item.createdAt)}前</span>
        <div className="comments-item-content">
            {item.content}
        </div>
    </div>
)

const articleComments = (items, self) => items.map((item) => (
    <li className="comments-item" key={item._id}>
        <div className="comments-info">
            <span className="comments-info-author"><i className="fa fa-fw fa-user"></i>{item.nickName} 说：</span>
            <div style={{ float: 'right' }}>
                <span className="comments-info-time">{parseTime(item.createdAt)} | </span>
                <a href="javascript:;" comment-id={item._id} onClick={() => self.setState({
                    showCommentForm: item._id
                })}>回复</a>
            </div>
        </div>
        {item.reply && replyFn(item.reply)}
        <div className="comments-item-content">{item.content}</div>
        <div className="comments-replay-box">
            {
                self.state.showCommentForm === item._id
                && <CommentForm
                    url="/comments"
                    articleId={item.article}
                    replyId={item._id}
                />
            }
        </div>
    </li>
))

export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: ''
        }
    }

    static fetch(match, location, options) {
        const query = { fields: '-summary,category.name', md: true };
        const id = match.params.id;
        const articlePrmoise = axios.get('/articles/' + id + '?' + queryString.stringify(query));
        const commentsPrmoise = axios.get('/comments?articleId=' + id);
        return Promise.all([articlePrmoise, commentsPrmoise]).then((arr)=>({article:arr[0].data, comments:arr[1].data}));
    }

    render() {
        let data = this.props.data;
        let article = data ? data.article : { category: {} };
        let comments = data ? data.comments : [];

        return (
            <div className="article">
                <article className="inner">
                    <div className="header">
                        <h2 className="title">
                            <a className="title-link" href={`/blog/articles/${article._id}`}>{article.title}</a>
                        </h2>
                        <div className="meta">
                            <span>发表于{parseTime(article.createdAt)}</span>
                            <span>分类于<a href={`/blog/articles?cid=${article.category._id}`}>{article.category.name}</a></span>
                            <span>{article.commentCount}条评论</span>
                            <span>阅读次数{article.viewsCount}</span>
                        </div>
                    </div>
                    <div className="markdown-body" dangerouslySetInnerHTML={{
                        __html: article.content
                    }}></div>
                    <ul className="post-copyright">
                        <li className="post-copyright-author">
                            <strong>本文作者：</strong> {config.site.author.nick_name}
                        </li>
                        <li className="post-copyright-link">
                            <strong>本文链接：</strong>
                            <a href={'http://www.lizc.me' + this.props.location.pathname}>{'http://www.lizc.me' + this.props.location.pathname}</a>
                        </li>
                        <li className="post-copyright-license">
                            <strong>版权声明： </strong> 本博客所有文章除特别声明外，均采用 <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/" rel="external nofollow" target="_blank">CC BY-NC-SA 3.0 CN</a> 许可协议。转载请注明出处！
                        </li>
                    </ul>
                    <div className="comments">
                        <h3 className="tip"><i className="fa fa-flag fa-fw"></i>既然来了，就说点什么吧~</h3>
                        <CommentForm url="/comments" articleId={article._id} />
                        <ul className="comments-list">
                            {
                                articleComments(comments, this)
                            }
                        </ul>
                    </div>
                </article>
            </div>
        )
    }
}