import { css, Global } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import media from '../utils/media';
import light from '../theme/light';
import dark from '../theme/dark';
import { ThemeProvider, CSSReset, useColorMode, Box } from '@chakra-ui/core';

export default (props: { children: any }) => {
    const children = props.children;
    const [theme, setTheme] = useState<any>(light);
    const { colorMode } = useColorMode();

    useEffect(() => {
        setTheme(() => (colorMode === 'light' ? light : dark));
    }, [colorMode]);
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <div className="app">
                <Global
                    styles={css`
                        html {
                            font-size: 16px;
                        }
                        html,
                        body,
                        #__next,
                        .app {
                            line-height: 1.6;
                            height: 100%;
                            min-height: 100%;
                            background-color: ${colorMode === 'light' ? '#f5f5f5' : 'rgb(10, 10, 10)'};
                        }
                        .app {
                            display: flex;
                            flex-direction: column;
                            width: 820px;
                            margin: 0 auto;
                            flex: 1 0 auto;
                            font-family: ${theme.fontFamily};
                            ${media.phone`
                        width: 100%;
                    `};
                        }
                        @keyframes slideInUp {
                            from {
                                transform: translate3d(0, 100%, 0);
                                visibility: visible;
                            }

                            to {
                                transform: translate3d(0, 0, 0);
                            }
                        }
                        .slideInUp {
                            animation-name: slideInUp;
                        }
                    `}
                />
                <AppHeader />
                <Box bg="theme.articles.bg" p={5} flex="1 0 auto">
                    {children}
                </Box>
                <AppFooter />
            </div>
        </ThemeProvider>
    );
};
