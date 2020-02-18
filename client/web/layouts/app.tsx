import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { AppFooter } from '../components/app-footer';
import { AppHeader } from '../components/app-header';
import media from '../utils/media';
import * as theme from '../theme';
import _theme from '../theme';
import dark from '../theme/dark';
import light from '../theme/light';
import { ThemeProvider, CSSReset, ColorModeProvider, useColorMode, Box } from '@chakra-ui/core';

const PageWrap = styled.div`
    padding: 20px;
    flex: 1 0 auto;
    background-color: #fff;
    ${media.phone`
        width: 100%;
        -webkit-overflow-scrolling: touch;
        padding: 0;
    `};
`;

export default (props: { children: any }) => {
    const children = props.children;
    const [theme, setTheme] = useState<any>({
        ..._theme,
        colors: {
            ..._theme.colors,
            theme: light,
        },
    });
    const { colorMode } = useColorMode();
    useEffect(() => {
        setTheme(val => ({
            ...val,
            colors: {
                ..._theme.colors,
                theme: colorMode === 'light' ? light : dark,
            },
        }));
    }, [colorMode]);
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <div className="app">
                <Global
                    styles={css`
                        html,
                        body,
                        #__next,
                        .app {
                            height: 100%;
                            min-height: 100%;
                            background-color: ${colorMode === 'light' ? '#f5f5f5' : '#141414'};
                        }
                        .app {
                            display: flex;
                            flex-direction: column;
                            height: 100%;
                            width: 820px;
                            margin: 0 auto;
                            font-family: ${theme.fontFamily};
                            ${media.phone`
                        width: 100%;
                    `};
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
