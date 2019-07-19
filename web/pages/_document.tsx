import React from 'react';
import versionInfo from '../../package.json';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

/* eslint-disable */
class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    componentDidMount() {
        const info = [
            `Version: ${versionInfo.version}`,
            `Author: ${versionInfo.author}`,
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
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        content="李志成的个人网站，李志成的博客，web开发，nodejs全栈，前端工程师，后端开发，docker容器，生活日常"
                        name="Keywords"
                    />
                    <meta
                        content="李志成的个人网站，专注于web开发，尤其是前端开发。喜欢做技术，也喜欢分享技术。本站主要是分享web相关文章内容，以及个人工作相关日志！"
                        name="description"
                    />
                    <link rel="shortcut icon" sizes="48x48" href="/static/logo.png" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            var _hmt = _hmt || [];
                            (function() {
                              var hm = document.createElement("script");
                              hm.src = "https://hm.baidu.com/hm.js?6f7e27c8345c16888b1454d3091382a5";
                              var s = document.getElementsByTagName("script")[0]; 
                              s.parentNode.insertBefore(hm, s);
                            })();
                        `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
