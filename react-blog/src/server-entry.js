// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { StaticRouter, matchPath } from 'react-router';
// import routes from './router';
// import App from './App';

// function HTML(html) {
//     return `
//     <!DOCTYPE html>

// <head>
//     <title>Lizc博客</title>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <meta content="Lizc博客，nodejs，前端，后端，docker，综合" name="Keywords">
//     <meta content="博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！" name="description">
//     <link rel="shortcut icon" sizes="48x48" href="/static/logo.png">
//     <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
// <link href="/static/app/app.css?fd0a2c3b290a4336d7f5" rel="stylesheet"></head>

// <body>
//     <div id="app" class="app">${html}</div>
//     <!-- scripts -->
// <script type="text/javascript" src="/static/app/app.bundle.js?fd0a2c3b290a4336d7f5"></script></body>

// </html>
//     `;
// }


// module.exports = (req, res) => {
//     Promise.all(routes.map(route => {
//         let match = matchPath(req.url, route);
//         if (match) {
//             console.log(route)
//             return route.component.asyncData && route.component.asyncData(match, {});
//         }
//         console.log(req.url, match)
//         return null;
//     }).filter(_ => !!_)).then(([data]) => {
//         console.log(data)

//         const context = {};
//         const html = ReactDOMServer.renderToString(
//             <StaticRouter location={req.url} context={context}><App routes={routes} {...data} /></StaticRouter>
//         );
//         if (context.url) {
//             res.writeHead(301, {
//                 Location: context.url
//             });
//             res.end();
//         } else {
//             res.write(HTML(html));
//             res.end();
//         }
//     }).catch(err => {
//         console.log(err)
//     });
// };
import React from 'react';
const ReactSSR = require('react-dom/server');
import { StaticRouter, matchPath } from 'react-router-dom';
import App from './App.jsx';
import routes from './router';
import { StoreContext, $store } from './context/store';

export default function init(req, cb) {
    let context = {};
    Promise.all(routes.map(route => {
        let match = matchPath(req.url, route);
        if (match) {
            console.log(route.component().asyncData, match)
            return route.component.asyncData && route.component.asyncData({ store: $store });
        }
        return null;
    }).filter(_ => !!_)).then(([data]) => {
        const content = ReactSSR.renderToString(
            <StoreContext.Provider value={$store}>
                <StaticRouter context={context}>
                    <App routes={routes} data={data} />
                </StaticRouter>
            </StoreContext.Provider>
        );
        // console.log($store)
        cb(content, $store);
    }).catch(err => {
        console.log(err, '错误');
    });
}