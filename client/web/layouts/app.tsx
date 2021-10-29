import React, { useState, useEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import { AboutPage } from '../components/about';
import media from '../utils/media';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { Global, css } from '@emotion/react';

const App = (props: { children: any }) => {
    const children = props.children;
    return (
        <div className="app">
            <AppHeader />
            <Global
                styles={css`
                    html,
                    body,
                    #__next,
                    .app {
                        line-height: 1.6;
                        height: 100%;
                        min-height: 100%;
                        background-color: #f5f5f5;
                    }
                    .app {
                        display: flex;
                        flex-direction: column;
                        width: 820px;
                        margin: 0 auto;
                        flex: 1 0 auto;
                        ${media.phone`
                            width: 100%;
                        `};
                    }
                    @font-face {
                        font-family: 'logoFont';
                        src: url(${require('@blog/client/assets/fonts/ZiXinFangMengTi-subfont.ttf')}) format('truetype');
                        font-weight: normal;
                        font-style: normal;
                    }
                    @keyframes slideInUp {
                        from {
                            transform: translate3d(0, 100%, 0);
                            visibility: visible;
                        }

                        to {
                            transform: translate3d(0, 0, 0);
                        }
                    }
                    .slideInUp {
                        animation-name: slideInUp;
                    }
                    .main {
                        flex: 1 0 auto;
                        background-color: #fff;
                    }
                    .react-calendar-heatmap text {
                        font-size: 10px;
                        fill: #aaa;
                    }
                    .react-calendar-heatmap .react-calendar-heatmap-small-text {
                        font-size: 5px;
                    }
                    .react-calendar-heatmap rect:hover {
                        stroke: #555;
                        stroke-width: 1px;
                    }
                    .react-calendar-heatmap .color-empty {
                        fill: #eeeeee;
                    }
                    .react-calendar-heatmap .color-filled {
                        fill: #8cc665;
                    }
                    .react-calendar-heatmap .color-github-0 {
                        fill: #eeeeee;
                    }
                    .react-calendar-heatmap .color-github-1 {
                        fill: #d6e685;
                    }
                    .react-calendar-heatmap .color-github-2 {
                        fill: #8cc665;
                    }
                    .react-calendar-heatmap .color-github-3 {
                        fill: #44a340;
                    }
                    .react-calendar-heatmap .color-github-4 {
                        fill: #1e6823;
                    }
                    .react-calendar-heatmap .color-gitlab-0 {
                        fill: #ededed;
                    }
                    .react-calendar-heatmap .color-gitlab-1 {
                        fill: #acd5f2;
                    }
                    .react-calendar-heatmap .color-gitlab-2 {
                        fill: #7fa8d1;
                    }
                    .react-calendar-heatmap .color-gitlab-3 {
                        fill: #49729b;
                    }
                    .react-calendar-heatmap .color-gitlab-4 {
                        fill: #254e77;
                    }
                    .tui-editor-contents {
                        font-size: 16px;
                        font-family: Helvetica, Arial, 'PingFang SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei',
                            'tohoma,sans-serif';
                        line-height: 1.8;
                        color: #333;
                        h1,
                        h2,
                        h3,
                        h4,
                        h5,
                        h6 {
                            font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB,
                                Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
                            font-weight: 700;
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
                            padding: 4px;
                            border: 1px solid rgba(0, 0, 0, 0.15);
                            display: block;
                            height: auto;
                            &.emoji {
                                border: none;
                                margin: 0;
                                padding: 0;
                            }
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
                            margin-bottom: 1.2em;
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
                            word-break: break-all;
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
                            padding: 10px 20px;
                            border: none;
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
                    }
                    :root {
                        --title-text-color: rgba(0, 0, 0, 0.85);
                        --primary-text-color: rgba(0, 0, 0, 0.65);
                        --secondary-text-color: rgba(0, 0, 0, 0.45);
                        --disabal-color: rgba(0, 0, 0, 0.25);
                        --border-color: rgba(0, 0, 0, 0.15);
                        --dividers-color: rgba(0, 0, 0, 0.06);
                        --blackground-color: rgba(0, 0, 0, 0.04);
                        --footer-text-color: var(--secondary-text-color);
                    }
                `}
            />
            <div className="main">{children}</div>
            <AppFooter />
            <AboutPage></AboutPage>
        </div>
    );
};

export default App;
