import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { setIsMobile } from './redux/reducers/global';
import Store from './redux/store';

import routes from './router';

let assets: any;

const syncLoadAssets = () => {
    assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};

syncLoadAssets();

function getMachine(req: any): string {
    const deviceAgent = req.headers['user-agent'].toLowerCase();
    const agentID = deviceAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/);
    if (agentID) {
        return 'mobile';
    } else {
        return 'pc';
    }
}

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
        store.dispatch(setIsMobile(getMachine(req) === 'pc'));
        const markup = renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <Switch>
                        {renderRoutes(routes, { routes })}
                    </Switch>
                </StaticRouter>
            </Provider> as any
        );
        const finalState = store.getState();
        res.send(
            `<!doctype html>
                <html lang="" style="font-size: ${getMachine(req) === 'pc' ? '50px' : '20px'}">
                    <head>
                    <title>Lizc博客</title>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
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
            <body data-machine="${getMachine(req)}">
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
