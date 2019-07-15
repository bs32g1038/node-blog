import styled from '@emotion/styled';
import React from 'react';

const Div = styled.div`
    &.markdown-body {
        font-family: Lato, Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC,
            Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 2;
    }
    p {
        margin: 0 0 20px 0;
        font-size: 14px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        padding: 0;
        font-weight: bold;
        line-height: 1.5;
        font-family: 'Roboto Slab', 'Monda', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        margin: 20px 0 15px;
    }
    a {
        color: #0366d6;
        text-decoration: none;
        word-wrap: break-word;
    }
    ul li {
        list-style: circle;
    }
    pre,
    code {
        font-family: 'PT Mono', consolas, Menlo, 'PingFang SC', 'Microsoft YaHei', monospace;
    }
    img {
        box-sizing: border-box;
        margin: auto;
        padding: 3px;
        max-width: 100%;
        height: auto;
        margin: 0 auto;
    }
    pre {
        overflow: auto;
        margin: 20px 0;
        padding: 36px 0 0;
        font-size: 13px;
        color: #4d4d4c;
        background: #f7f7f7;
        line-height: 1.6;
        background-color: #f7f7f7;
        position: relative;
        border-radius: 3px;
        :after {
            content: ' ';
            position: absolute;
            border-radius: 50%;
            background: #fc625d;
            width: 12px;
            height: 12px;
            top: 0;
            margin-top: 13px;
            box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
            z-index: 3;
            left: 10px;
        }
        code {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            background: #f0f0f0;
        }
    }
    blockquote {
        margin: 0;
        padding: 0;
        padding: 0 15px;
        color: #666;
        border-left: 4px solid #ddd;
        background: #f0f0f0;
    }
    .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #f0f0f0;
    }
    .hljs,
    .hljs-subst {
        color: #444;
    }
    .hljs-comment {
        color: #888888;
    }
    .hljs-keyword,
    .hljs-attribute,
    .hljs-selector-tag,
    .hljs-meta-keyword,
    .hljs-doctag,
    .hljs-name {
        font-weight: bold;
    }
    .hljs-type,
    .hljs-string,
    .hljs-number,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-quote,
    .hljs-template-tag,
    .hljs-deletion {
        color: #880000;
    }
    .hljs-title,
    .hljs-section {
        color: #880000;
        font-weight: bold;
    }
    .hljs-regexp,
    .hljs-symbol,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-link,
    .hljs-selector-attr,
    .hljs-selector-pseudo {
        color: #bc6060;
    }
    .hljs-literal {
        color: #78a960;
    }
    .hljs-built_in,
    .hljs-bullet,
    .hljs-code,
    .hljs-addition {
        color: #397300;
    }
    .hljs-meta {
        color: #1f7199;
    }
    .hljs-meta-string {
        color: #4d99bf;
    }
    .hljs-emphasis {
        font-style: italic;
    }
    .hljs-strong {
        font-weight: bold;
    }
`;

export default (props: any) => (
    <Div
        className="markdown-body"
        dangerouslySetInnerHTML={{
            __html: props.content,
        }}
    ></Div>
);
