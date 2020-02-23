import { css } from 'emotion';
import React from 'react';
import { Link as UiLink, Flex, Heading, useColorMode, Button, Box } from '@chakra-ui/core';
import Link from '../link';
import Icon from '../icon';
import NavLink from '../nav-link';
import { HomeNav, NavA } from './style';
import { SearchForm } from './search-form';
import siteInfo from '../../config/site-info';

export const AppHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode();
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
                <HomeNav title={siteInfo.name} mr={[0, 6]}>
                    <Icon fill="theme.header.fill" size="40px" name="logo" mr={2}></Icon>
                    <Heading as="h1" title={siteInfo.name} fontSize={16} fontFamily="siteitlefont">
                        {siteInfo.name}
                    </Heading>
                </HomeNav>
            </Link>
            <Box display={['none', 'flex']} flex="1 0 auto" justifyContent="flex-start">
                <NavLink href="/blog">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon fill="theme.header.fill" size="14px" name="home" mr={1}></Icon>首页
                        </Flex>
                    </NavA>
                </NavLink>
                <NavLink href="/about">
                    <NavA flex="1 0 auto">
                        <Flex alignItems="center" justifyContent="center">
                            <Icon fill="theme.header.fill" size="14px" name="user" mr={1}></Icon>关于
                        </Flex>
                    </NavA>
                </NavLink>
                <NavA flex="1 0 auto" href="/blog/rss" isExternal={true}>
                    <Flex alignItems="center" justifyContent="center">
                        <Icon
                            fill="theme.header.fill"
                            size="14px"
                            name="rss"
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
