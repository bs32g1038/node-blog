import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import config from '../../config/site-info';
import media from '../../utils/media';
import { parseTime } from '../../utils/time';
import { ContentLoader } from '../content-loader';
import Comment from './comment';
import MarkdownBody from './markdown-body';

const ArticleItem = styled.article`
    max-width: 570px;
    flex: 1 0 auto;
    ${media.phone`
            padding-left: 12px;
            padding-right: 12px;
            width: 100%;
            box-sizing: border-box;
        `}
`;

const ArticleHeader = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    word-break: break-word;
    margin: 16px 0;
    font-size: 18px;
    a {
        display: inline-block;
        position: relative;
        color: rgb(85, 85, 85);
        border-bottom: none;
        vertical-align: top;
        text-decoration: none;
    }
`;

const Meta = styled.div`
    margin: 3px 0px 6px;
    color: rgb(153, 153, 153);
    font-family: Monda, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 12px;
    span {
        padding: 0 5px;
    }
    a {
        color: rgb(153, 153, 153);
        font-size: 12px;
        margin-left: 4px;
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
    border: 1px solid #e5e5e5;
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
    p {
        margin-right: 10px;
        &:last-child {
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

const Breadcrumbs = styled.div`
    color: #8a92a9;
    font-size: 12px;
    margin-bottom: 16px;
    > .sep {
        margin: 0 5px;
        font-size: 14px;
    }
    a {
        text-decoration: none;
        color: #8a92a9;
        font-size: 12px;
    }
`;

interface Props {
    loading: boolean;
    article: any;
    comments: any[];
}

const C = (props: Props) => {
    const { article, comments } = props;
    return (
        <ArticleItem>
            <Breadcrumbs>
                <Link href="/">
                    <a>首页</a>
                </Link>
                <span className="sep">›</span>
                <Link href={'/blog/categories/' + (article.category && article.category._id)}>
                    <a className="text-muted">{article.category && article.category.name}</a>
                </Link>
                <span className="sep">›</span>
                <span className="current">{article.title}</span>
            </Breadcrumbs>
            <ArticleHeader>
                <Title>
                    <Link href={`/blog/articles/${article._id}`} passHref={true}>
                        <a>{article.title}</a>
                    </Link>
                </Title>
                <Meta>
                    <span>发表于{parseTime(article.createdAt)}</span>
                    <span>
                        分类于
                        <a href={`/blog/categories/${article.category && article.category._id}`}>
                            {article.category && article.category.name}
                        </a>
                    </span>
                    <span>{article.commentCount}条评论</span>
                    <span>阅读次数{article.viewsCount}</span>
                </Meta>
            </ArticleHeader>
            <MarkdownBody content={article.content}></MarkdownBody>
            <Copyright>
                <li>
                    <strong>本文链接：</strong>
                    <a href={config.domain + '/blog/articles/' + article._id}>
                        {config.domain + '/blog/articles/' + article._id}
                    </a>
                </li>
                <li>
                    <strong>版权声明：</strong>自由转载-署名-非商业性使用 |{' '}
                    <a
                        href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        CC BY-NC-SA 3.0 CN
                    </a>{' '}
                    许可协议。
                </li>
            </Copyright>
            <PrevNextArticle>
                {article.prev && (
                    <p>
                        <strong>上一篇：</strong>
                        <Link href={`/blog/articles/${article.prev._id}`} passHref={true}>
                            <a>{article.prev.title}</a>
                        </Link>
                    </p>
                )}
                {article.next && (
                    <p>
                        <strong>下一篇：</strong>
                        <Link href={`/blog/articles/${article.next._id}`} passHref={true}>
                            <a>{article.next.title}</a>
                        </Link>
                    </p>
                )}
            </PrevNextArticle>
            <Comment article={article} comments={comments}></Comment>
        </ArticleItem>
    );
};

const loading = (
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
);

export default (props: Props) => {
    return !props.loading && (props.article && Object.keys(props.article).length > 0) ? <C {...props}></C> : loading;
};
