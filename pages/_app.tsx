import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../client/redux/with-redux-store';
import versionInfo from '../package.json';
import ErrorPage from '@blog/client/web/components/error-page';
import 'antd/dist/antd.css';

class MyApp extends App {
    componentDidMount() {
        const { reduxStore } = this.props as any;
        const info = [
            `Version: ${versionInfo.version}`,
            `Author: ${versionInfo.author.name + ' - ' + versionInfo.author.email}`,
            `Homepage: ${versionInfo.homepage}`,
            `Description: ${versionInfo.description}`,
            `Check out our code here: ${reduxStore.getState().app.config.projectGithub}`,
            `Have a great day! 📣🐢`,
        ];
        for (const message of info) {
            // eslint-disable-next-line no-console
            console.log(message);
        }
    }
    public render() {
        const { Component, pageProps, reduxStore } = this.props as any;
        return (
            <Provider store={reduxStore}>
                {reduxStore.getState().app.error ? (
                    <ErrorPage statusCode={reduxStore.getState().app.error.status}></ErrorPage>
                ) : (
                    <Component {...pageProps} />
                )}
            </Provider>
        );
    }
}

export default withReduxStore(MyApp);
