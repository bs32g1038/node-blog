import styled from '@emotion/styled';
import theme from '@blog/client/web/theme/light';

const Div = styled.div`
    font-size: 16px;
    font-family: Helvetica, Arial, 'PingFang SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'tohoma,sans-serif';
    line-height: 1.8;
    color: ${theme.colors.theme.primaryText};
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif,
            WenQuanYi Micro Hei, sans-serif;
        font-weight: 700;
        color: ${theme.colors.theme.title};
        line-height: 1.35;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 1.2em;
        margin-bottom: 0.6em;
        line-height: 1.35;
    }
    h1 {
        font-size: 1.8em;
    }
    h2 {
        font-size: 1.6em;
    }
    h3 {
        font-size: 1.4em;
    }
    h4,
    h5,
    h6 {
        font-size: 1.2em;
    }
    img {
        width: 100%;
        display: block;
        margin-bottom: 15px;
        height: auto;
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 4px;
    }
    p {
        margin: 0 0 20px;
        padding: 0;
        line-height: 1.6;
    }
    p,
    pre,
    ul,
    ol,
    dl,
    form,
    hr,
    table,
    blockquote {
        margin-bottom: 0.6em;
    }
    ul {
        margin-left: 1.3em;
        list-style: disc;
    }
    ol {
        list-style: decimal;
        margin-left: 1.9em;
    }
    li ul,
    li ol {
        margin-bottom: 0.8em;
        margin-left: 2em;
    }
    li ul {
        list-style: circle;
    }
    a {
        color: rgb(239, 112, 96);
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    a:focus {
        outline-offset: -2px;
    }
    blockquote {
        padding: 0;
        position: relative;
        color: ${theme.colors.theme.secondaryText};
        font-weight: 400;
        border-left: 1px solid rgb(239, 112, 96);
        padding-left: 1em;
        margin: 1em 3em 1em 2em;
    }
    strong,
    dfn {
        font-weight: 700;
    }
    em,
    dfn {
        font-style: italic;
        font-weight: 400;
    }
    del {
        text-decoration: line-through;
    }
    pre {
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 1.42857;
        word-break: break-all;
        word-wrap: break-word;
        border-radius: 4px;
        white-space: pre-wrap;
        display: block;
        background-color: ${theme.colors.theme.blackground};
        padding: 10px 20px;
        border: none;
        margin-bottom: 25px;
        color: #666;
        font-family: Courier, sans-serif;
        position: relative;
    }
    code {
        border-radius: 4px;
        font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
        font-size: 90%;
    }
    p > code {
        background-color: ${theme.colors.theme.blackground};
        padding: 0.2em 0.4em;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        font-style: normal;
        font-weight: 400;
    }
    figure {
        margin: 1em 0;
    }
    figcaption {
        font-size: 0.75em;
        padding: 0.5em 2em;
        margin-bottom: 2em;
    }
    figure img {
        margin-bottom: 0px;
    }
    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
    }
    ol p,
    ul p {
        margin-bottom: 0px;
    }
    li {
        margin-bottom: 0.75em;
        margin-top: 0.75em;
    }
    @keyframes highfade {
        0% {
            background-color: none;
        }
        20% {
            background-color: yellow;
        }
        100% {
            background-color: none;
        }
    }
    @-webkit-keyframes highfade {
        0% {
            background-color: none;
        }
        20% {
            background-color: yellow;
        }
        100% {
            background-color: none;
        }
    }
    a:target,
    li:target,
    sup a:target {
        animation-name: highfade;
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
        -webkit-animation-name: highfade;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-timing-function: ease-in-out;
    }
    a:target {
        border: 0;
        outline: 0;
    }
    /**
    * table
     */
    table th,
    table td,
    table caption {
        border: 1px solid #ddd;
        padding: 0.5em 1em;
        color: #666;
    }
    table th {
        background: #fbfbfb;
    }
    table thead th {
        background: #f1f1f1;
    }
    table caption {
        border-bottom: none;
    }
    .hljs,
    .hljs-subst {
        color: ${theme.colors.theme.primaryText};
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

export default Div;
