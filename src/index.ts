import express from 'express';
const proxy = require('http-proxy-middleware');

// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let app = require('./server').default;

import * as S from './server';

if (module.hot) {
    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        try {
            app = require('./server').default;
        } catch (error) {
            console.error(error);
        }
    });
    console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

if (process.env.TYPE !== 'SSR') {
    express()
        .use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }))
        .use('/public', express.static(process.env.RAZZLE_PUBLIC_DIR!))
        .use((req, res) => app.handle(req, res))
        .listen(port, (err: Error) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`> Started on port ${port}`);
        });
}

export default S.ssr;