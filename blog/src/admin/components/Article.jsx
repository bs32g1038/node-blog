import { Component } from 'inferno'; 
import config from '../config';
import { parseTime } from '../utils/time';
import axios from '../utils/axios';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                category:{}
            }
        }
    }
    componentDidMount() {
        const { match } = this.props;
        axios.get('/articles/' + match.params.id).then((res) => {
            this.setState({
                article: res.data,
            });
        });
    }
    render() {
        const { article } = this.state;
        return (
            <div className="article view">
                <article className="inner">
                    <div className="header">
                        <h2 className="title">
                            <a className="title-link" href={`/blog/articles/${article._id}`}>{article.title}</a>
                        </h2>
                        <div className="meta">
                            <span>发表于{parseTime(article.createdAt)}</span>
                            <span v-if="article.category">&nbsp; | &nbsp;
        <span>分类于
          <a href={`/blog/articles?cid=${article.category._id}`}>{article.category.name}</a>
                                </span>
                            </span>
                            <span>&nbsp; | &nbsp;{article.commentCount}条评论</span>
                            <span>&nbsp; | &nbsp;阅读次数&nbsp;{article.viewsCount}</span>
                        </div>
                    </div>
                    <div className="markdown-body">{ article.content }</div>
                    <ul className="post-copyright">
                        <li className="post-copyright-author">
                            <strong>本文作者：</strong> IIssNan
      </li>
                        <li className="post-copyright-link">
                            <strong>本文链接：</strong>
                            <a href="http://notes.iissnan.com/2016/next-documentations-reload/" title="NexT Documentations Reload">http://notes.iissnan.com/2016/next-documentations-reload/</a>
                        </li>
                        <li className="post-copyright-license">
                            <strong>版权声明： </strong> 本博客所有文章除特别声明外，均采用 <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/" rel="external nofollow" target="_blank" se_prerender_url="complete">CC BY-NC-SA 3.0 CN</a> 许可协议。转载请注明出处！
      </li>
                    </ul>
                    <div className="comments">
                        <h3 className="tip"><i className="fa fa-flag fa-fw"></i>既然来了，就说点什么吧~</h3>
                        <form className="comment-form" id="reply-form" action="/blog/articles/{ article._id }/reply" method="post">
                            <div className="form-group">
                                <label className="label">昵称</label>
                                <input id="nickName" name="nickName" placeholder="输入你的昵称" type="text" className="comment-form__input" />
                            </div>
                            <div className="form-group">
                                <label className="label">邮箱</label>
                                <input id="email" name="email" placeholder="输入你的email" type="text" className="comment-form__input" />
                            </div>
                            <div className="form-group">
                                <textarea id="content" name="content" rows="3" placeholder="留点空白给你说~" className="comment-form__textarea"></textarea>
                            </div>
                            <div className="footer">
                                <button id="submit" type="submit" className="submit">提 交</button>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        )
    }
}