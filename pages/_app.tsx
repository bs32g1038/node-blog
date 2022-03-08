import App from 'next/app';
import React from 'react';
import versionInfo from '../package.json';
import { wrapper } from '@blog/client/redux/store';
import { fetchConfig } from '@blog/client/web/api';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import 'antd/dist/antd.css';
import 'react-image-crop/dist/ReactCrop.css';
import '@blog/client/common/global.scss';

class MyApp extends App {
    public static getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
        await store.dispatch(fetchConfig.initiate());
        return {
            pageProps: {
                ...(await App.getInitialProps(context)).pageProps,
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
                <Component {...pageProps} />
            </ConfigProvider>
        );
    }
}

export default wrapper.withRedux(MyApp);
