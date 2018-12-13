import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers/article';
import { parseTime } from '../../utils/time';
import Comment from './comment';
import MarkdownBody from './markdown-body';

const ArticleWrap = styled.div((_) => ({
    backgroundColor: '#fff'
}));

const ArticleItem = styled.article((_) => ({
    maxWidth: '980px',
    padding: '20px 40px 20px 40px'
}));

const ArticleHeader = styled.div((_) => ({
    marginBottom: '20px',
    textAlign: 'center'
}));

const Title = styled.h2((_) => ({
    wordBreak: 'break-word',
    margin: '10px 0',
    fontSize: '26px',
    'a': {
        display: 'inline-block',
        position: 'relative',
        color: 'rgb(85, 85, 85)',
        borderBottom: 'none',
        verticalAlign: 'top',
        textDecoration: 'none'
    }
}));

const Meta = styled.div((_) => ({
    margin: '3px 0px 6px',
    color: 'rgb(153, 153, 153)',
    fontFamily: 'Monda, "PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: '12px',
    'span': {
        padding: '0 5px',
    }
}));

const Copyright = styled.ul((_) => ({
    color: '#444',
    margin: '28px 0 0',
    padding: '7px 14px',
    listStyle: 'none',
    fontSize: '12px',
    backgroundColor: '#efefef'
}));

class Article extends Component<any, any> {
    public render() {
        const { article, comments } = this.props._DB;
        return (
            <ArticleWrap>
                <ArticleItem>
                    <ArticleHeader>
                        <Title>
                            <a href={`/blog/articles/${article._id}`}>{article.title}</a>
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
                    <Comment article={article} comments={comments}></Comment>
                </ArticleItem>
            </ArticleWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.article
    })
)(Article);