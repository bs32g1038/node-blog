import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../redux/with-redux-store';
import versionInfo from '../package.json';

class MyApp extends App {
    componentDidMount() {
        const info = [
            `Version: ${versionInfo.version}`,
            `Author: ${versionInfo.author.name + ' - ' + versionInfo.author.email}`,
            `Homepage: ${versionInfo.homepage}`,
            `Description: ${versionInfo.description}`,
            `Check out our code here: https://github.com/bs32g1038/node-blog`,
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
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(MyApp);
