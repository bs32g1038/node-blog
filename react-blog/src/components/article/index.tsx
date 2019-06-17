import styled from '@emotion/styled';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { fetchArticle, fetchRecentArticle, State } from '../../redux/reducers/article';
import media from '../../utils/media';
import rem from '../../utils/rem';
import { parseTime } from '../../utils/time';
import ContentLoader from '../content-loader';
import Comment from './comment';
import MarkdownBody from './markdown-body';

const ArticleWrap = styled.div`
    background-color: #fff;
    display: flex;
`;

const ArticleItem = styled.article`
    max-width: 720px;
    flex: 1 0 auto;
    padding: ${rem('20px')};
    ${
    media.phone`
            padding-left: 12px;
            padding-right: 12px;
        `
    }
`;

const ArticleHeader = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    word-break: break-word;
    margin: 16px 0;
    font-size: 26px;
    a{
        display: inline-block;
        position: relative;
        color: rgb(85,85,85);
        border-bottom: none;
        vertical-align: top;
        text-decoration: none;
    }
`;

const Meta = styled.div`
    margin: 3px 0px 6px;
    color: rgb(153,153,153);
    font-family: Monda,"PingFang SC","Microsoft YaHei",sans-serif;
    font-size: 12px;
    span {
        padding: 0 5px;
    }
`;

const Copyright = styled.ul`
    color: #444;
    padding: 5px 12px;
    list-style: none;
    font-size: 13px;
    background-color: #efefef;
    border-radius: 3px;
    line-height: 1.8;
    a {
        white-space: pre-wrap;
        word-break: break-all;
        text-decoration: none;
        color: inherit;
    }
`;

const PrevNextArticle = styled.div`
    display: flex;
    justify-content: space-between;
    p{
        margin-right: 10px;
        &:last-child{
            margin-right: 0;
        }
    }
    a {
        white-space: pre-wrap;
        word-break: break-all;
        text-decoration: none;
        color: inherit;
    }
`;

const WidgetArea = styled.div`
    display: flex;
    width: 240px;
    margin-left: 20px;
    min-width: 240px;
`;

const WidgetTitle = styled.div`
    color: #8a92a9;
    font-size: 16px;
    padding-bottom: 16px;
    margin-top: 18px;
    margin-bottom: 18px;
    position: relative;
    border-bottom: 1px solid #f5f6fa;
`;

const ListItem = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    padding: 9px 0;
    &.list-nice-overlay{
        max-width: 25%;
        margin: 10px;
        padding: 0;
        .list-content {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 8px 16px;
            z-index: 1;
        }
        a{
            color: #FFF;
            font-size: 14px;
            text-decoration: none
        }
         .media{
            max-width: 100%!important;
        }
    }
`;

const Media = styled.div`
    max-width: 33%;
    position: relative;
    width: 100%;
    &:after{
        content: '';
        display: block;
        padding-top: 100%;
        padding-top: 75%;
    }
`;
const MediaContent = styled(Link)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0;
    border-radius: 2px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: rgba(120, 120, 120, 0.1);

`;

const ListTitle = styled(Link)`
    text-decoration: none;
    color: #062743;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
`;

const ListContent = styled.div`
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
    padding-left: 16px;
`;

const TextMuted = styled.div`
    color: #8a92a9;
    font-size: 12px;
`;

const Breadcrumbs = styled.div`
    color: #8a92a9;
    font-size: 12px;
    margin-bottom: 16px;
    span{
        color: #8a92a9;
        font-size: 12px;
        &.sep{
            margin: 0 5px;
            font-size: 14px;
        }
    }
    a{
        text-decoration: none
    }
`;

const ListGrouped = styled.div`
    display: flex;
`;

class Article extends Component<any, any> {

    public static asyncData(store: any, route: any) {
        const id = route.params.id;
        return store.dispatch(fetchArticle(id)).then(() => {
            return store.dispatch(fetchRecentArticle());
        });
    }

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    public componentDidMount() {
        const { article } = this.props._DB;
        if (article._id !== this.props.match.params.id) {
            const q = queryString.parse(location.search);
            this.setState({
                isLoading: true
            });
            Article.asyncData({ dispatch: this.props.dispatch }, {
                query: q,
                params: this.props.match.params
            }).then(() => {
                this.setState({
                    isLoading: false
                });
            });
        }
    }

    public componentDidUpdate(prevProps: any) {
        const navigated = prevProps.location !== this.props.location;
        if (navigated) {
            this.setState({
                isLoading: true
            });
            Article.asyncData({ dispatch: this.props.dispatch }, {
                params: this.props.match.params
            }).then(() => {
                this.setState({
                    isLoading: false
                });
            });
        }
    }

    public render() {
        const { article, comments, recentArticles } = this.props._DB;
        return (
            <>
                <ArticleWrap>
                    {
                        this.state.isLoading ?
                            <>
                                <Helmet title={article.title + ' - ' + siteInfo.name}></Helmet>
                                <ArticleItem>
                                    <ArticleHeader>
                                        <ContentLoader width={720} height={20}>
                                            <rect x="0" y="0" width="500" height="20"></rect>
                                        </ContentLoader>
                                        <Title>
                                            <ContentLoader width={720} height={20}>
                                                <rect x="0" y="0" width="300" height="20"></rect>
                                            </ContentLoader>
                                        </Title>

                                        <Meta>
                                            <ContentLoader width={720} height={20}>
                                                <rect x="0" y="0" width="400" height="20"></rect>
                                            </ContentLoader>
                                        </Meta>
                                    </ArticleHeader>
                                    <ContentLoader width={720} height={320}>
                                        <rect x="0" y="0" width="720" height="300"></rect>
                                    </ContentLoader>
                                    <ContentLoader width={720} height={110}>
                                        <rect x="0" y="0" width="720" height="100"></rect>
                                    </ContentLoader>
                                    <ContentLoader width={720} height={50}>
                                        <rect x="250" y="0" width="220" height="50"></rect>
                                    </ContentLoader>
                                    <ContentLoader width={720} height={120}>
                                        <rect x="0" y="0" width="720" height="120"></rect>
                                    </ContentLoader>
                                </ArticleItem>
                            </>
                            :
                            <>
                                <Helmet title={article.title + ' - ' + siteInfo.name}></Helmet>
                                <ArticleItem>
                                    <Breadcrumbs>
                                        <span>
                                            <Link to="/">
                                                <span>首页</span>
                                            </Link>
                                        </span>
                                        <span className="sep">›</span>
                                        <span>
                                            <Link to={'/blog/categories/' + (article.category && article.category._id)}>
                                                <span className="text-muted">{(article.category && article.category.name)}</span>
                                            </Link>
                                        </span>
                                        <span className="sep">›</span>
                                        <span className="current">{article.title}
                                        </span>
                                    </Breadcrumbs>
                                    <ArticleHeader>
                                        <Title>
                                            <Link to={`/blog/articles/${article._id}`}>{article.title}</Link>
                                        </Title>
                                        <Meta>
                                            <span>发表于{parseTime(article.createdAt)}</span>
                                            <span>分类于<a href={`/blog/categories/${article.category && article.category._id}`}>{article.category && article.category.name}</a></span>
                                            <span>{article.commentCount}条评论</span>
                                            <span>阅读次数{article.viewsCount}</span>
                                        </Meta>
                                    </ArticleHeader>
                                    <MarkdownBody content={article.content}></MarkdownBody>
                                    <Copyright>
                                        <li>
                                            <strong>本文链接：</strong>
                                            <a href={'http://www.lizc.me' + this.props.location.pathname}>{'http://www.lizc.me' + this.props.location.pathname}</a>
                                        </li>
                                        <li>
                                            <strong>版权声明： </strong> 本博客所有文章除特别声明外，均采用 <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/" rel="noopener noreferrer" target="_blank">CC BY-NC-SA 3.0 CN</a> 许可协议。转载请注明出处！
                                    </li>
                                    </Copyright>
                                    <PrevNextArticle>
                                        {
                                            article.prev && <p>
                                                <strong>上一篇：</strong>
                                                <Link to={`/blog/articles/${article.prev._id}`}>{article.prev.title}</Link>
                                            </p>
                                        }
                                        {
                                            article.next && <p>
                                                <strong>下一篇：</strong>
                                                <Link to={`/blog/articles/${article.next._id}`}>{article.next.title}</Link>
                                            </p>
                                        }
                                    </PrevNextArticle>
                                    <Comment article={article} comments={comments}></Comment>
                                </ArticleItem>
                            </>
                    }
                    <WidgetArea>
                        <section id="recommended_posts-5" className="widget Recommended_Posts">
                            <WidgetTitle>最近文章</WidgetTitle>
                            <div className="list-grid list-grid-padding p-0 my-n2" style={{ width: '240px' }}>
                                {
                                    this.state.isLoading ?
                                        <ContentLoader width={240} height={85}>
                                            <rect x="0" y="0" width="100" height="85"></rect>
                                            <rect x="120" y="0" width="120" height="40"></rect>
                                            <rect x="120" y="75" width="60" height="10"></rect>
                                        </ContentLoader>
                                        :
                                        recentArticles.slice(0, 5).map((item: any) => (
                                            <ListItem key={'rc' + item._id}>
                                                <Media>
                                                    <MediaContent
                                                        to={`/blog/articles/${item._id}`}
                                                        className="media-content"
                                                        style={{ backgroundImage: `url(${item.screenshot})` }}
                                                    >
                                                    </MediaContent>
                                                    <div className="media-action">
                                                        <i className="iconfont icon-pic-s"></i>
                                                    </div>
                                                </Media>
                                                <ListContent>
                                                    <div className="list-body">
                                                        <ListTitle to={`/blog/articles/${item._id}`} className="list-title text-sm h-2x">{item.title}</ListTitle>
                                                    </div>
                                                    <TextMuted>
                                                        <div>2019-03-08</div>
                                                    </TextMuted>
                                                </ListContent>
                                            </ListItem>
                                        ))
                                }
                                <a href="https://www.vultr.com/?ref=7866918-4F">
                                    <img
                                        src="https://www.vultr.com/media/banners/banner_300x250.png"
                                        style={{
                                            width: '220px',
                                            border: '1px solid #ccc',
                                            height: 'auto',
                                        }}
                                    />
                                </a>
                            </div>
                        </section>
                    </WidgetArea>
                </ArticleWrap>

                <div className="container">
                    <div className="list-header h4 mb-3 mb-md-4">相关文章</div>
                    <ListGrouped>
                        {
                            this.state.isLoading ?
                                <ContentLoader width={960} height={240} style={{ width: '400px' }}>
                                    <rect x="0" y="0" width="960" height="40"></rect>
                                    <rect x="0" y="60" width="960" height="40"></rect>
                                    <rect x="0" y="120" width="960" height="40"></rect>
                                </ContentLoader>
                                :
                                recentArticles.slice(6, 9).map((item: any) => (
                                    <ListItem className="list-nice-overlay" key={'rl' + item._id}>
                                        <Media className="media">
                                            <MediaContent
                                                to={`/blog/articles/${item._id}`}
                                                className="media-content"
                                                style={{ backgroundImage: `url(${item.screenshot})` }}
                                            >
                                            </MediaContent>
                                            <div className="media-action">
                                                <i className="iconfont icon-pic-s"></i>
                                            </div>
                                        </Media>
                                        <div className="list-content">
                                            <div className="list-body">
                                                <Link to={`/blog/articles/${item._id}`} className="list-title h-2x">
                                                    {item.title}
                                                </Link>
                                            </div>
                                        </div>
                                    </ListItem>
                                ))
                        }
                    </ListGrouped>
                </div>
            </>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.article
    })
)(Article as any);