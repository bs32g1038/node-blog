import express from 'express';
import path from 'path';
let proxy;
if (process.env.NODE_ENV !== 'production') {
    proxy = require('http-proxy-middleware');
}

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
    const server = express();
    if (process.env.NODE_ENV !== 'production') {
        server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
        server.use('/static', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
        server.use('/public', express.static(process.env.RAZZLE_PUBLIC_DIR!));
    } else {
        server.use('/public', express.static(path.resolve(__dirname, './public')));
        server.use('/static', express.static(path.resolve(__dirname, './public/static')));
    }
    server.use((req, res) => app.handle(req, res))
        .listen(port, (err: Error) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`> Started on port ${port}`);
        });
}

export default S.ssr;