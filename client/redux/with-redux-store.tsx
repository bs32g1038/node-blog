import React from 'react';
import initializeStore from './store';
import axios from '@blog/client/web/utils/axios';
import { setError, setConfig } from '@blog/client/redux/reducers/app';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

/**
 * 拦截 axios 响应，添加错误处理
 * @param reduxStore redux store
 */
const initAxios = (reduxStore) => {
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const { response = {} } = error;
            const { status } = response;
            await reduxStore.dispatch(setError({ error: { status } }));
            return Promise.reject(error);
        }
    );
};

const initConfig = (reduxStore) => {
    return axios.get('/configs').then(async (res) => {
        await reduxStore.dispatch(setConfig({ config: res.data }));
    });
};

export function getOrCreateStore(initialState?: any) {
    if (isServer) {
        return initializeStore(initialState);
    }
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__];
}

export default (App: any) => {
    return class AppWithRedux extends React.Component {
        public reduxStore: any;
        public static async getInitialProps(appContext: any) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const reduxStore = getOrCreateStore();

            await initAxios(reduxStore);
            await initConfig(reduxStore);
            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
            };
        }

        constructor(props: any) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        public render() {
            return <App {...this.props} reduxStore={this.reduxStore} />;
        }
    };
};
