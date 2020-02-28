import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import siteInfo from '../../config/site-info';
import media from '../../utils/media';
import NavLink from '../nav-link';
import BackTopBtn from '../back-top-button';
import BlogRuningTime from '../blog-runing-time';
import { Flex, Box, Text, Divider, useColorMode } from '@chakra-ui/core';
import UiLink from '../ui-link';
import Icon from '../icon';
import { rem } from 'polished';

const MobileTabbar = styled(Box)`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    z-index: 9000;
    display: none;
    ${media.phone`
        display: flex;
    `};
    .tabbar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #7d7e80;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        text-decoration: none;
        &.active {
            color: #1989fa;
            svg {
                fill: #1989fa !important;
            }
        }
    }
    .tabbar-item__icon {
        position: relative;
        margin-bottom: 5px;
        font-size: 18px;
    }
`;

const LibLogo = styled.img`
    fill: #2b414d;
    width: 32px;
    height: 32px;
    cursor: pointer;
    margin: 0 6px;
    display: inline-block;
`;

/**
 * 底部时间计数逻辑实现
 */
const loadTimeCountEvent = () => {
    const time = document.getElementById('blog-runing-time');
    // 显示博客运行时间
    function showRunTime() {
        const BirthDay = new Date('2016/012/11 00:00:00');
        const today = new Date();
        const timeold = today.getTime() - BirthDay.getTime();
        const msPerDay = 864e5;
        const eDaysold = timeold / msPerDay;
        const daysold = Math.floor(eDaysold);
        const eHrsold = 24 * (eDaysold - daysold);
        const hrsold = Math.floor(eHrsold);
        const eMinsold = 60 * (eHrsold - hrsold);
        const minsold = Math.floor(60 * (eHrsold - hrsold));
        const seconds = Math.floor(60 * (eMinsold - minsold));
        if (time) {
            time.innerHTML = daysold + '天' + hrsold + '小时' + minsold + '分' + seconds + '秒';
        }
    }
    setInterval(showRunTime, 1000);
};

export const AppFooter = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        loadTimeCountEvent();
    });
    return (
        <React.Fragment>
            <Flex
                flex="0 0 auto"
                position="relative"
                justifyContent="space-between"
                p={4}
                fontSize={rem(14)}
                bg="theme.footer.bg"
                color="theme.footer.text"
                mb={['50px', 0]}
            >
                <BackTopBtn></BackTopBtn>
                <Box>
                    <Text mb={1}>欢迎来到我的个人网站，这里主要分享前后端技术文章，致力于web技术研究。</Text>
                    <Text mb={1}>
                        Powered by <strong>Nodejs</strong> <strong>nestjs</strong> <strong>react</strong>{' '}
                        <strong>antdesign</strong>
                    </Text>
                    <Text mb={1}>
                        <span>累计运行</span>
                        <BlogRuningTime></BlogRuningTime>
                    </Text>
                    <Text mb={1}>
                        <span>Copyright © 2016-2019</span>
                        <UiLink className="text-white" href="/blog">
                            <strong> {siteInfo.name} </strong>
                        </UiLink>
                        <span>
                            <UiLink href={siteInfo.icpGovCn} isExternal={true}>
                                <span className="icon-icp"></span> {siteInfo.icp}
                            </UiLink>
                        </span>
                    </Text>
                </Box>
                <Flex justifyContent="space-between" flexDirection="column">
                    <Flex alignItems="center">
                        <UiLink href="https://nestjs.com" isExternal={true}>
                            <LibLogo src={require('../../assets/svgs/logo-nestjs.svg')} />
                        </UiLink>
                        <UiLink href="https://react.docschina.org" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-react.svg')} />
                        </UiLink>
                        <UiLink href="https://nodejs.org/en" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-nodejs.svg')} />
                        </UiLink>
                        <UiLink href="https://ant.design" rel="noopener noreferrer" target="_blank">
                            <LibLogo src={require('../../assets/svgs/logo-ant-design.svg')} />
                        </UiLink>
                    </Flex>
                    <Divider />
                    <Text>
                        博客已开源至
                        <UiLink href={siteInfo.projectGithub}>
                            <strong> Github </strong>
                        </UiLink>
                        请大家多多关注
                    </Text>
                </Flex>
            </Flex>
            <MobileTabbar borderTop={1} borderStyle="solid" borderTopColor="theme.border" bg="theme.mobileFooter.bg">
                <NavLink href="/blog">
                    <a className="tabbar-item">
                        <div className="tabbar-item__icon">
                            <Icon fill="theme.primaryText" size="24px" name="home" />
                        </div>
                        <div className="tabbar-item__text">博客</div>
                    </a>
                </NavLink>
                <NavLink href="/about">
                    <a className="tabbar-item">
                        <div className="tabbar-item__icon">
                            <Icon fill="theme.primaryText" size="24px" name="user" />
                        </div>
                        <div className="tabbar-item__text">关于</div>
                    </a>
                </NavLink>
                <a className="tabbar-item" onClick={() => toggleColorMode()}>
                    <div className="tabbar-item__icon">
                        <Icon size="24px" fill="theme.primaryText" name={colorMode === 'light' ? 'moon' : 'sun'} />
                    </div>
                    <div className="tabbar-item__text">主题</div>
                </a>
                <a className="tabbar-item" href={siteInfo.github} rel="noopener noreferrer" target="_blank">
                    <div className="tabbar-item__icon">
                        <Icon size="24px" name="github" fill="theme.primaryText" />
                    </div>
                    <div className="tabbar-item__text">Gituhub</div>
                </a>
            </MobileTabbar>
        </React.Fragment>
    );
};
