import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useState } from 'react';
import config from '../../config/site-info';
import media from '../../utils/media';
import { parseTime } from '../../../libs/time';
import { ContentLoader } from '../content-loader';
import Comment from './comment';
import MarkdownBody from './markdown-body';
import message from '../message';

export const MODE = {
    normal: 'normal',
    reading: 'reading',
};

const ArticleItem = styled.div<{ mode: string }>`
    max-width: ${props => (props.mode === MODE.reading ? '100%' : '570px')};
    flex: 1 0 auto;
    position: relative;
    transition: max-width 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    ${media.phone`
            padding-left: 12px;
            padding-right: 12px;
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 20px;
        `}
`;

const ModePanel = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    ${media.phone`
            display: none;
        `}
`;

const ModeButton = styled.button<{ active: boolean }>`
    border: none;
    background-color: transparent;
    border-radius: 3px;
    cursor: pointer;
    padding: 3px 5px;
    margin-right: 5px;
    outline: none;
    font-size: 12px;
    transition: color 0.2s ease-in, border 0.2s ease-in;
    border: 1px solid ${props => (props.active ? '#f86422' : 'hsla(0, 0%, 59.2%, 0.2)')};
    color: ${props => (props.active ? '#f86422' : '#999')};
    ${props => props.active && 'pointer-events:none'};
`;

const ArticleHeader = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h1`
    word-break: break-word;
    margin: 16px 0;
    font-size: 32px;
    a {
        display: inline-block;
        position: relative;
        color: rgb(0, 0, 0, 0.85);
        border-bottom: none;
        vertical-align: top;
        text-decoration: none;
    }
`;

const Meta = styled.div`
    margin: 3px 0 0 -5px;
    color: rgb(0, 0, 0, 0.45);
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
    ${media.phone`
            padding-top: 20px;
        `}
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
    getReadMode: Function;
}

const C = (props: Props) => {
    const { article, comments } = props;
    const [mode, setMode] = useState(MODE.normal);
    if (typeof props.getReadMode === 'function') {
        props.getReadMode(mode);
    }
    return (
        <ArticleItem mode={mode}>
            <ModePanel>
                <ModeButton
                    active={mode === MODE.normal}
                    onClick={() => {
                        message.success('已切换到常规模式！', 1500);
                        setMode(MODE.normal);
                    }}
                >
                    常规模式
                </ModeButton>
                <ModeButton
                    active={mode === MODE.reading}
                    onClick={() => {
                        message.success('已切换到阅读模式！', 1500);
                        setMode(MODE.reading);
                    }}
                >
                    阅读模式
                </ModeButton>
            </ModePanel>
            <Breadcrumbs>
                <Link href="/">
                    <a>首页</a>
                </Link>
                <span className="sep">›</span>
                <Link href={'/blog/articles?cid=' + (article.category && article.category._id)}>
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
                        <a href={`/blog/articles?cid=${article.category && article.category._id}`}>
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
    <ContentLoader width={720} height={520} style={{ width: '100%', height: '520px' }}>
        <rect x="0" y="0" width="320" height="20"></rect>
        <rect x="0" y="40" width="420" height="30"></rect>
        <rect x="600" y="20" width="120" height="60"></rect>
        <rect x="0" y="90" width="320" height="20"></rect>
        <rect x="0" y="130" width="720" height="30"></rect>
        <rect x="0" y="150" width="720" height="120"></rect>
        <rect x="0" y="290" width="720" height="20"></rect>
        <rect x="0" y="330" width="720" height="50"></rect>
        <rect x="0" y="400" width="720" height="120"></rect>
    </ContentLoader>
);

export default (props: Props) => {
    return !props.loading && (props.article && Object.keys(props.article).length > 0) ? <C {...props}></C> : loading;
};
