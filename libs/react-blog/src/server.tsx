import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import App from './App';
import Store from './redux/store';
import routes from './router';

let assets: any;

const syncLoadAssets = () => {
    assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};

syncLoadAssets();

export const ssr = (req: express.Request, res: express.Response) => {
    const store = Store();
    const branchs = matchRoutes(routes, req.path);
    Promise.all(branchs.map((branch: any) => {
        return branch && branch.route.asyncData && branch.route.asyncData(
            store,
            {
                query: req.query,
                params: branch.match.params
            }
        );
    })).then(() => {
        const context = {};
        const markup = renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <App routes={routes} />
                </StaticRouter>
            </Provider>
        );
        const finalState = store.getState();
        res.send(
            `<!doctype html>
                <html lang="">
                    <head>
                    <title>Lizc博客</title>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                    <meta content="Lizc博客，nodejs，前端，后端，docker，综合" name="Keywords">
                    <meta content="博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！" name="description">
                    <link rel="shortcut icon" sizes="48x48" href="/static/logo.png">
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
                    <script>
                        var _hmt = _hmt || [];
                        (function() {
                            var hm = document.createElement("script");
                            hm.src = "https://hm.baidu.com/hm.js?8316669be353451259d8b6f8b9207fae";
                            var s = document.getElementsByTagName("script")[0]; 
                            s.parentNode.insertBefore(hm, s);
                        })();
                    </script>
                ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
                ${
            process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
            </head>
            <body>
                <div id="root">${markup}</div>
                <script>
                window.__INITIAL_STATE__ = ${serialize(finalState)}
                </script>
            </body>
        </html>`
        );
    });
};

const server = express()
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get('/*', ssr);

export default server;
