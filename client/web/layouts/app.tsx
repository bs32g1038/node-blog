import React from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import { AboutPage } from '../components/about';
import media from '../utils/media';
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
