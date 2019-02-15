import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import siteInfo from '../../config/site-info';
import { State } from '../../redux/reducers/article';
import media from '../../utils/media';
import rem from '../../utils/rem';
import { parseTime } from '../../utils/time';
import toc from '../../utils/toc';
import Comment from './comment';
import MarkdownBody from './markdown-body';

const ArticleWrap = styled.div`
    background-color: #fff;
`;

const ArticleItem = styled.article`
    max-width: 980px;
    padding: ${rem('20px')} ${rem('30px')};
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

const Toc = styled.div`
    position: absolute;
    left: 50%;
    margin-left: 340px;
    top: 200px;
    font-size: 13px;
    &.fixed{
        position: fixed;
        top: 20px;
        overflow-y: auto;
        bottom: 0
    }
    .toc-title {
        font-size: 16px;
    }
    ol{
        line-height: 1.8em;
        list-style: none;
        padding-left: 10px;
    }
    a {
        color: #888;
        text-decoration: none
    }
    ${media.phone`
        display: none;
    `};
`;

class Article extends Component<any, any> {
    public componentDidMount() {
        const Util = {
            addClass(element: any, className: any) {
                const classes = element.className ? element.className.split(' ') : [];
                if (classes.indexOf(className) < 0) {
                    classes.push(className);
                }
                element.className = classes.join(' ');
                return element;
            },
            removeClass(element: any, className: any) {
                const classes = element.className ? element.className.split(' ') : [];
                const index = classes.indexOf(className);
                if (index > -1) {
                    classes.splice(index, 1);
                }
                element.className = classes.join(' ');
                return element;
            }
        };
        const t = toc();
        let scrollTop = 0;
        const $html = document.documentElement;
        const $body = document.body;
        const $toc: any = document.getElementById('toc');
        const objE = document.createElement('div');
        objE.innerHTML = t;
        let $cs: any = window.getComputedStyle($toc);
        let tocHeight = parseInt($cs.height, 10);
        let winHeight = document.documentElement.clientHeight;
        if (tocHeight + 20 > winHeight) {
            return;
        }
        scrollTop = $body.scrollTop || $html.scrollTop;
        scrollTop > 180 ? Util.addClass($toc, 'fixed') : Util.removeClass($toc, 'fixed');
        // toc and backTop
        window.onscroll = () => {
            scrollTop = $body.scrollTop || $html.scrollTop;
            if ($toc) {
                $cs = window.getComputedStyle($toc);
                tocHeight = parseInt($cs.height, 10);
                winHeight = document.documentElement.clientHeight;
                // if (tocHeight + 20 > winHeight) {
                //     return;
                // }
                scrollTop > 180 ? Util.addClass($toc, 'fixed') : Util.removeClass($toc, 'fixed');
            }
        };
        return $toc.appendChild(objE);
    }
    public render() {
        const { article, comments } = this.props._DB;
        return (
            <ArticleWrap>
                <Helmet title={article.title + ' - ' + siteInfo.name}></Helmet>
                <Toc id="toc">
                    <strong className="toc-title">文章目录</strong>
                </Toc>
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
)(Article as any);