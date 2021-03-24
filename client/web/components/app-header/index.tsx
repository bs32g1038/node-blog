import { css } from '@emotion/css';
import React, { useEffect } from 'react';
import { Link as UiLink, Flex, Heading, Button, Box, Icon } from '@chakra-ui/react';
import Link from '../link';
import NavLink from '../nav-link';
import { HomeNav, NavA, SvgDiv } from './style';
import { SearchForm } from './search-form';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { GithubIcon, RssIcon } from '../../icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { getOrCreateStore } from '@blog/client/redux/with-redux-store';
import { setTheme } from '@blog/client/redux/reducers/app';
import { ReactSVG } from 'react-svg';

export const AppHeader = (props) => {
    const colorMode = useSelector((state: RootState) => state.app.theme);
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <Box
            bg="theme.header.bg"
            color="theme.header.color"
            as="header"
            alignItems="center"
            borderBottomWidth="1px"
            borderStyle="solid"
            borderBottomColor="theme.header.headerBorderBottomColor"
            flex="0 0 auto"
            display="flex"
            height="60px"
            px={5}
        >
            <Link href="/" as="/">
                <HomeNav title={config.siteTitle} mr={[0, 6]}>
                    <SvgDiv colorMode={colorMode}>
                        <ReactSVG src={config.siteLogo} />
                    </SvgDiv>
                    <Heading
                        color="theme.header.color"
                        as="h1"
                        title={config.siteTitle}
                        fontSize={16}
                        fontFamily="siteitlefont"
                    >
                        {config.siteTitle}
                    </Heading>
                </HomeNav>
            </Link>
            <Box display={['none', 'flex']} flex="1 0 auto" justifyContent="flex-start">
                <NavLink href="/blog">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon
                                as={HomeOutlined}
                                lineHeight={0}
                                fill="theme.header.fill"
                                w="16px"
                                h="16px"
                                mt="2px"
                                mr={1}
                            ></Icon>
                            首页
                        </Flex>
                    </NavA>
                </NavLink>
                <NavLink href="/about">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon
                                as={UserOutlined}
                                fill="theme.header.fill"
                                w="16px"
                                h="16px"
                                mt="2px"
                                lineHeight={0}
                                mr={1}
                            ></Icon>
                            关于
                        </Flex>
                    </NavA>
                </NavLink>
                <NavA flex="1 0 auto" href="/blog/rss" isExternal={true}>
                    <Flex alignItems="center" justifyContent="center">
                        <RssIcon
                            ffill="theme.header.fill"
                            w="16px"
                            h="16px"
                            name="rss"
                            mt="2px"
                            mr={1}
                            className={css`
                                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                                &:hover {
                                    transform: rotate(270deg);
                                }
                            `}
                        ></RssIcon>
                        Rss
                    </Flex>
                </NavA>
            </Box>
            <Flex alignItems="center" ml={5}>
                <SearchForm></SearchForm>
                <Button
                    display={['none', 'block']}
                    ml={5}
                    mr={5}
                    _focus={{
                        boxShadow: 'none',
                    }}
                    variant="unstyled"
                    aria-label="switch theme mode"
                    minWidth="auto"
                    onClick={() => {
                        getOrCreateStore().dispatch(setTheme(colorMode));
                    }}
                    colorScheme="blue"
                >
                    {colorMode === 'light' ? <MoonIcon w="24px" h="24px" /> : <SunIcon w="24px" h="24px" />}
                </Button>
                <UiLink display={['none', 'block']} href="https://github.com/bs32g1038" isExternal={true}>
                    <GithubIcon name="github" w="24px" h="24px" fill="theme.header.fill"></GithubIcon>
                </UiLink>
            </Flex>
        </Box>
    );
};
