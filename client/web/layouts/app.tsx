import React, { useEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import { AboutPage } from '../components/about';
import { Global, css } from '@emotion/react';
import { RootState, setTheme } from '@blog/client/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useFetchConfigQuery } from '../api';

const App = (props: { children: any }) => {
    const children = props.children;
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useDispatch();
    useEffect(() => {
        const t = localStorage.getItem('theme');
        t && dispatch(setTheme({ theme: t }));
    }, []);
    const { data: config } = useFetchConfigQuery();
    return (
        <div className="app">
            <AppHeader />
            <Head>
                <meta content={config?.siteMetaKeyWords} name="Keywords" />
                <meta content={config?.siteMetaDescription} name="description" />
            </Head>
            {theme === 'light' ? (
                <Global
                    styles={css`
                        :root {
                            --title-text-color: rgba(0, 0, 0, 0.85);
                            --primary-text-color: rgba(0, 0, 0, 0.65);
                            --secondary-text-color: rgba(0, 0, 0, 0.45);
                            --disabal-color: rgba(0, 0, 0, 0.25);
                            --border-color: rgba(0, 0, 0, 0.15);
                            --dividers-color: rgba(0, 0, 0, 0.06);
                            --blackground-color: rgba(0, 0, 0, 0.04);
                            --footer-text-color: var(--secondary-text-color);
                            --main-bg-color: #fff;
                        }
                    `}
                />
            ) : (
                <Global
                    styles={css`
                        :root {
                            --title-text-color: rgba(255, 255, 255, 0.85);
                            --primary-text-color: rgba(255, 255, 255, 0.65);
                            --secondary-text-color: rgba(255, 255, 255, 0.45);
                            --disabal-color: rgba(255, 255, 255, 0.25);
                            --border-color: rgba(255, 255, 255, 0.15);
                            --dividers-color: rgba(255, 255, 255, 0.06);
                            --blackground-color: rgba(255, 255, 255, 0.04);
                            --footer-text-color: var(--secondary-text-color);
                            --main-bg-color: #141414;
                        }
                        .ant-pagination-prev,
                        .ant-pagination-next,
                        .ant-pagination-item {
                            background-color: var(--main-bg-color);
                            a {
                                color: #fff;
                            }
                            .ant-pagination-item-link {
                                background-color: var(--main-bg-color);
                                color: #fff;
                            }
                        }
                    `}
                />
            )}
            <Global
                styles={css`
                    html,
                    body,
                    #__next,
                    .app {
                        line-height: 1.6;
                        height: 100%;
                        min-height: 100%;
                        background-color: ${theme === 'light' ? '#f5f5f5' : 'rgb(10, 10, 10)'};
                    }
                    .app {
                        display: flex;
                        flex-direction: column;
                        width: 820px;
                        margin: 0 auto;
                        flex: 1 0 auto;
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
                        background-color: var(--main-bg-color);
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
                `}
            />
            <div className="main">{children}</div>
            <AppFooter />
            <AboutPage></AboutPage>
        </div>
    );
};

export default App;
