import App from 'next/app';
import React from 'react';
import versionInfo from '../package.json';
import { wrapper } from '@blog/client/redux/store';
import { fetchConfig, fetchConfigSvg } from '@blog/client/web/api';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';
import '@blog/client/common/global.scss';
import Head from 'next/head';

class MyApp extends App {
    public static getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
        const res = await store.dispatch(fetchConfig.initiate());
        await store.dispatch(fetchConfigSvg.initiate({ url: res.data.siteLogo }));
        return {
            pageProps: {
                ...(await App.getInitialProps(context)).pageProps,
                siteLogo: res.data.siteLogo,
            },
        };
    });
    componentDidMount() {
        const info = [
            `Version: ${versionInfo.version}`,
            `Author: ${versionInfo.author.name + ' - ' + versionInfo.author.email}`,
            `Homepage: ${versionInfo.homepage}`,
            `Description: ${versionInfo.description}`,
            `Check out our code here: ${versionInfo.github}`,
            `Have a great day! 📣🐢`,
        ];
        for (const message of info) {
            // eslint-disable-next-line no-console
            console.log(message);
        }
    }
    public render() {
        const { Component, pageProps } = this.props as any;
        return (
            <ConfigProvider locale={zhCN}>
                <Head>
                    <link rel="icon" type="image/svg+xml" href={pageProps?.siteLogo}></link>
                </Head>
                <Component {...pageProps} />
            </ConfigProvider>
        );
    }
}

export default wrapper.withRedux(MyApp);
