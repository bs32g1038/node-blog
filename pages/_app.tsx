import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../client/web/redux/with-redux-store';
import versionInfo from '../package.json';
import siteInfo from '../client/web/config/site-info';

class MyApp extends App {
    componentDidMount() {
        const info = [
            `Version: ${versionInfo.version}`,
            `Author: ${versionInfo.author.name + ' - ' + versionInfo.author.email}`,
            `Homepage: ${versionInfo.homepage}`,
            `Description: ${versionInfo.description}`,
            `Check out our code here: ${siteInfo.projectGithub}`,
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
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default withReduxStore(MyApp);
