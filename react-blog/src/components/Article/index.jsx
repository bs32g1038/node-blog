import React, { Component } from 'react';
import { parseTime, timeAgo } from '../../utils/time';
import axios from '../../utils/axios';
import CommentForm from '../CommentForm';
import queryString from 'query-string';
import styles from './article-cssmodule.scss';
import commentStyles from './commentlist-cssmodule.scss';
import './github-markdown.scss';
import DocumentTitle from '../DocumentTitle';

const replyFn = (item) => (
    <div className={commentStyles.quote}>
        <span className={commentStyles.infoAuthor}><i className="fa fa-fw fa-user"></i>{item.nickName}
        </span>
        <span className={commentStyles.infoTime}>{timeAgo(item.createdAt)}前</span>
        <div className={commentStyles.itemContent}>
            {item.content}
        </div>
    </div>
);

const articleComments = (items, self) => items.map((item) => (
    <li className={commentStyles.item} key={item._id}>
        <div className={commentStyles.info}>
            <span className={commentStyles.infoAuthor}><i className="fa fa-fw fa-user"></i>{item.nickName} 说：</span>
            <div style={{ float: 'right' }}>
                <span className={commentStyles.infoTime}>{parseTime(item.createdAt)} | </span>
                <a href="javascript:;" comment-id={item._id} onClick={() => self.setState({
                    showCommentForm: item._id
                })}>回复</a>
            </div>
        </div>
        {item.reply && replyFn(item.reply)}
        <div className={commentStyles.itemContent}>{item.content}</div>
        <div className={commentStyles.replayBox}>
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
));

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: '',
            article: this.props.article || {
                category: {}
            },
            comments: this.props.comments || []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            article: nextProps.article,
            comments: nextProps.comments
        });
    }
    static asyncData(match, location) {
        const query = { fields: '-summary,category.name', md: true };
        const id = match.params.id;
        const articlePrmoise = axios.get('/articles/' + id + '?' + queryString.stringify(query));
        const commentsPrmoise = axios.get('/comments?articleId=' + id);
        return Promise.all([articlePrmoise, commentsPrmoise]).then((arr) => ({ article: arr[0].data, comments: arr[1].data }));
    }
    render() {
        const article = this.state.article;
        return (
            <DocumentTitle title={article.title}>
                <div className={styles.article}>
                    <article className={styles.inner}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>
                                <a className={styles.titleLink} href={`/blog/articles/${article._id}`}>{article.title}</a>
                            </h2>
                            <div className={styles.meta}>
                                <span>发表于{parseTime(article.createdAt)}</span>
                                <span>分类于<a href={`/blog/articles?cid=${article.category && article.category._id}`}>{article.category && article.category.name}</a></span>
                                <span>{article.commentCount}条评论</span>
                                <span>阅读次数{article.viewsCount}</span>
                            </div>
                        </div>
                        <div className="markdown-body" dangerouslySetInnerHTML={{
                            __html: article.content
                        }}></div>
                        <ul className={styles.copyright}>
                            <li>
                                <strong>本文链接：</strong>
                                <a href={'http://www.lizc.me' + this.props.location.pathname}>{'http://www.lizc.me' + this.props.location.pathname}</a>
                            </li>
                            <li>
                                <strong>版权声明： </strong> 本博客所有文章除特别声明外，均采用 <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/" rel="noopener noreferrer" target="_blank">CC BY-NC-SA 3.0 CN</a> 许可协议。转载请注明出处！
                            </li>
                        </ul>
                        <div className={styles.comments}>
                            <h3 className={styles.tip}>--发表评论--</h3>
                            <CommentForm url="/comments" articleId={article._id} />
                            <ul className={commentStyles.wrap}>
                                {
                                    articleComments(this.state.comments, this)
                                }
                            </ul>
                        </div>
                    </article>
                </div>
            </DocumentTitle>
        );
    }
}