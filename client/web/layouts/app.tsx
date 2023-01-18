import React, { ReactNode, useEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import { Global, css } from '@emotion/react';
import { RootState, setTheme } from '@blog/client/redux/store';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useFetchConfigQuery } from '../api';
import styles from './app.module.scss';
import { useAppDispatch } from '../hooks/app';
import { ConfigProvider, theme as antTheme } from 'antd';

const App = (props: { children?: ReactNode }) => {
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const t = localStorage.getItem('theme') as 'light' | 'dark';
        t && dispatch(setTheme({ theme: t }));
    }, [dispatch]);
    const { data: config } = useFetchConfigQuery();

    return (
        <ConfigProvider
            theme={{
                algorithm: theme === 'light' ? antTheme.defaultAlgorithm : antTheme.darkAlgorithm,
            }}
        >
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
                                --primary-text-color: rgba(0, 0, 0, 0.65);
                                --secondary-text-color: rgba(0, 0, 0, 0.45);
                                --disabal-color: rgba(0, 0, 0, 0.25);
                                --border-color: rgba(0, 0, 0, 0.15);
                                --dividers-color: rgba(0, 0, 0, 0.06);
                                --blackground-color: rgba(0, 0, 0, 0.04);
                                --footer-text-color: var(--secondary-text-color);
                                --main-bg-color: #fff;
                                --app-background-color: #f5f5f5;
                                --explore-color-border-default: rgba(235, 236, 237, 0.8);
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
                                --app-background-color: rgb(10, 10, 10);
                                --explore-color-border-default: rgba(55, 53, 47, 0.16);
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
        </ConfigProvider>
    );
};

export default App;
