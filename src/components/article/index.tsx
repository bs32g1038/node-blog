import styled from '@emotion/styled';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import siteInfo from '../../config/site-info';
import { fetchArticle, State } from '../../redux/reducers/article';
import media from '../../utils/media';
import rem from '../../utils/rem';
import { parseTime } from '../../utils/time';
import ContentLoader from '../content-loader';
import Comment from './comment';
import MarkdownBody from './markdown-body';

const ArticleWrap = styled.div`
    background-color: #fff;
`;

const ArticleItem = styled.article`
    max-width: 980px;
    padding: ${rem('20px')} 0;
    ${
    media.phone`
            padding-left: 12px;
            padding-right: 12px;
        `
    }
`;

const ArticleHeader = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Title = styled.h2`
    word-break: break-word;
    margin: 10px 0;
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

class Article extends Component<any, any> {

    public static asyncData(store: any, route: any) {
        const id = route.params.id;
        return store.dispatch(fetchArticle(id));
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

    public render() {
        const { article, comments } = this.props._DB;
        return (
            <ArticleWrap>
                {
                    this.state.isLoading ?
                        <>
                            <Helmet title={article.title + ' - ' + siteInfo.name}></Helmet>
                            <ArticleItem>
                                <ArticleHeader>
                                    <Title>
                                        <ContentLoader width={720} height={40}>
                                            <rect x="260" y="0" width="200" height="40"></rect>
                                        </ContentLoader>
                                    </Title>
                                    <Meta>
                                        <ContentLoader width={720} height={20}>
                                            <rect x="160" y="0" width="400" height="20"></rect>
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
                                <ArticleHeader>
                                    <Title>
                                        <Link to={`/blog/articles/${article._id}`}>{article.title}</Link>
                                    </Title>
                                    <Meta>
                                        <span>发表于{parseTime(article.createdAt)}</span>
                                        <span>分类于<a href={`/blog/articles?cid=${article.category && article.category._id}`}>{article.category && article.category.name}</a></span>
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
            </ArticleWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.article
    })
)(Article as any);