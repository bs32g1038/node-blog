import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import media from '../utils/media';
import * as theme from '../theme';

const normalize = () => {
    return '/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}b,strong{font-weight:bolder}code{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}details{display:block}summary{display:list-item}[hidden]{display:none}';
};

const PageWrap = styled.div`
    padding: 20px;
    flex: 1 0 auto;
    background-color: #fff;
    ${media.phone`
        width: 100%;
        -webkit-overflow-scrolling: touch;
        padding: 0;
    `};
`;

export default (props: { children: any }) => {
    const children = props.children;
    return (
        <div className="app">
            <Global
                styles={css`
                    ${normalize()}
                `}
            />
            <Global
                styles={{
                    body: {
                        color: '#444',
                        fontFamily: '-apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        margin: 0,
                        overflowY: 'scroll',
                    },
                    input: {
                        font: '400 14px/16px -apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                    },
                    textarea: {
                        font: '400 14px/16px -apple-system, Monda, PingFang SC, Microsoft YaHei, sans-serif',
                    },
                    a: {
                        userSelect: 'none',
                    },
                }}
            />
            <Global
                styles={css`
                    html,
                    body,
                    #__next,
                    .app {
                        height: 100%;
                        min-height: 100%;
                        background-color: #f5f5f5;
                    }
                    .app {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        width: 820px;
                        margin: 0 auto;
                        font-family: ${theme.fontFamily};
                        ${media.phone`
                        width: 100%;
                    `};
                    }
                `}
            />
            <AppHeader />
            <PageWrap>{children}</PageWrap>
            <AppFooter />
        </div>
    );
};