import App from 'next/app';
import React, { useEffect } from 'react';
import versionInfo from '../package.json';
import { wrapper } from '@blog/client/redux/store';
import { fetchConfig, fetchConfigSvg } from '@blog/client/web/api';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';
import '@blog/client/common/global.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: any) {
    const store = wrapper.useStore();
    useEffect(() => {
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
    }, []);
    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <Head>
                    <link rel="icon" type="image/svg+xml" href={pageProps?.siteLogo}></link>
                </Head>
                <Component {...(pageProps as any)} />
            </ConfigProvider>
        </Provider>
    );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
    const res = await store.dispatch(fetchConfig.initiate());
    let url = res.data.siteLogo;
    if (res.data.siteLogo.indexOf(res.data.siteDomain) > 0) {
        url = res.data.siteLogo.substring(res.data.siteLogo.indexOf(res.data.siteDomain) + res.data.siteDomain.length);
    }
    await store.dispatch(fetchConfigSvg.initiate({ url }));
    return {
        pageProps: {
            ...(await App.getInitialProps(context)).pageProps,
            siteLogo: res.data.siteLogo,
        },
    };
});

export default MyApp;
