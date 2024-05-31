import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const cache = createCache();
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => (
                    <StyleProvider cache={cache}>
                        <App {...props} />
                    </StyleProvider>
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {/* hacky code, `extractStyle` does not currently support returning JSX or related data. */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `</script>${extractStyle(cache)}<script>`,
                        }}
                    />
                    <script async src="//cdn.embedly.com/widgets/platform.js"></script>
                </>
            ),
        };
    }
    render() {
        return (
            <Html>
                <Head />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
                />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
