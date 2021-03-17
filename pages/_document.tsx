import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import axios from '@blog/client/web/utils/axios';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@blog/client/web/theme';

/* eslint-disable */
class AppDocument extends Document<any> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const config = await axios.get('/configs').then((res) => {
            return res.data;
        });
        return { ...initialProps, config };
    }
    render() {
        const { config } = this.props;
        return (
            <Html>
                <Head>
                    <meta content={config.siteMetaKeyWords} name="Keywords" />
                    <meta content={config.siteMetaDescription} name="description" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            var _hmt = _hmt || [];
                            (function() {
                              var hm = document.createElement("script");
                              hm.src = "https://hm.baidu.com/hm.js?ff62c5e1c5159c0b837c6a9d27016497";
                              var s = document.getElementsByTagName("script")[0]; 
                              s.parentNode.insertBefore(hm, s);
                            })();
                        `,
                        }}
                    />
                </Head>
                <body>
                    {this.props.__NEXT_DATA__.page.includes('blog') && (
                        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    )}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
