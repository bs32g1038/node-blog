import { css } from 'emotion';
import React from 'react';
import { Link as UiLink, Flex, Heading, useColorMode, Button, Box, Spinner } from '@chakra-ui/core';
import Link from '../link';
import Icon from '../icon';
import NavLink from '../nav-link';
import { HomeNav, NavA, ReactSVG } from './style';
import { SearchForm } from './search-form';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';

export const AppHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode();
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
                    <ReactSVG loading={() => <Spinner size="sm" mr={2} />} src={config.siteLogo} />
                    <Heading as="h1" title={config.siteTitle} fontSize={16} fontFamily="siteitlefont">
                        {config.siteTitle}
                    </Heading>
                </HomeNav>
            </Link>
            <Box display={['none', 'flex']} flex="1 0 auto" justifyContent="flex-start">
                <NavLink href="/blog">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon fill="theme.header.fill" size="16px" name="home" mt="2px" mr={1}></Icon>首页
                        </Flex>
                    </NavA>
                </NavLink>
                <NavLink href="/about">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon fill="theme.header.fill" size="16px" name="user" mt="2px" mr={1}></Icon>关于
                        </Flex>
                    </NavA>
                </NavLink>
                <NavA flex="1 0 auto" href="/blog/rss" isExternal={true}>
                    <Flex alignItems="center" justifyContent="center">
                        <Icon
                            fill="theme.header.fill"
                            size="16px"
                            name="rss"
                            mt="2px"
                            mr={1}
                            className={css`
                                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                                &:hover {
                                    transform: rotate(270deg);
                                }
                            `}
                        ></Icon>
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
                    onClick={toggleColorMode}
                    variantColor="blue"
                >
                    <Icon size="24px" name={colorMode === 'light' ? 'moon' : 'sun'} />
                </Button>
                <UiLink display={['none', 'block']} href="https://github.com/bs32g1038" isExternal={true}>
                    <Icon fill="theme.header.fill" size="24px" name="github"></Icon>
                </UiLink>
            </Flex>
        </Box>
    );
};
