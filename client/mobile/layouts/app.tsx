import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import { Global, css } from '@emotion/react';
import { RootState, setTheme } from '@blog/client/redux/store';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useFetchConfigQuery } from '@blog/client/web/api';
import styles from './app.module.scss';
import { useAppDispatch } from '@blog/client/web/hooks/app';

const App = (props: { children?: ReactNode }) => {
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const t = localStorage.getItem('theme') as 'light' | 'dark';
        t && dispatch(setTheme({ theme: t }));
    }, [dispatch]);
    const { data: config } = useFetchConfigQuery();
    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-prefers-color-scheme', theme === 'dark' ? 'dark' : 'light');
    }, [theme]);
    return (
        <div className={styles.app}>
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
                            --primary-text-color: rgba(0, 0, 0, 0.8);
                            --secondary-text-color: rgba(0, 0, 0, 0.65);
                            --meta-text-color: rgba(0, 0, 0, 0.45);
                            --disabal-color: rgba(0, 0, 0, 0.25);
                            --border-color: rgba(0, 0, 0, 0.06);
                            --dividers-color: rgba(0, 0, 0, 0.06);
                            --blackground-color: rgba(0, 0, 0, 0.04);
                            --footer-text-color: var(--secondary-text-color);
                            --main-bg-color: #fff;
                            --app-background-color: #fff;
                            --explore-color-border-default: rgba(235, 236, 237, 0.8);
                            --app-header-box-shadow: rgba(17, 58, 93, 0.1);
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
                            --meta-text-color: rgba(255, 255, 255, 0.45);
                            --disabal-color: rgba(255, 255, 255, 0.25);
                            --border-color: rgba(255, 255, 255, 0.06);
                            --dividers-color: rgba(255, 255, 255, 0.06);
                            --blackground-color: rgba(255, 255, 255, 0.04);
                            --footer-text-color: var(--secondary-text-color);
                            --main-bg-color: #141414;
                            --app-background-color: #141414;
                            --explore-color-border-default: rgba(55, 53, 47, 0.16);
                            --app-header-box-shadow: rgba(45, 45, 45, 0.2);
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
            <div className="main">{props.children}</div>
            <AppFooter />
        </div>
    );
};

export default App;
