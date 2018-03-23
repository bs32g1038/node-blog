import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../src/App';
import reactRouterFetch from '../src/utils/router-fetch';
import routes from '../src/router';
import axios from '../src/utils/axios';

const Html = (html, data) => {
    return (
        <html>
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="app">{props.children}</div>
                <script id="initial-data" type="text/plain" data-json={data}></script>
                <script type="text/javascript" src="http://localhost:3000/static/test/vendor.bundle.js"></script>
      <script type="text/javascript" src="http://localhost:3000/static/test/app.bundle.js"></script>
            </body>
        </html>
    );
};

module.exports =  (req, res) => {
    const context = {title:"ss", a:55}
    const p = Promise.all([axios.get('/categories'), reactRouterFetch(routes,{pathname : req.url})])
    p.then(([resCategory, data]) => {
        // console.log(resCategory.data)
        const html = ReactDOMServer.renderToString(<StaticRouter 
            location={req.url}
            context={context}
            >
              <Html initialData={{categories: resCategory.data, data }}>
            <App categories={resCategory.data} data={data}  name="World" />
        </Html>
            </StaticRouter>) 
        res.send( html
    )
    }).catch((err)=>{
        console.log(err)
    })
}
