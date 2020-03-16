import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import BackTopBtn from '../back-top-button';
import { Flex, Box, Text, Heading, useColorMode, Image, Button, Spinner } from '@chakra-ui/core';
import UiLink from '../ui-link';
import Icon from '../icon';
import { rem } from 'polished';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { ReactSVG as _ReactSVG } from 'react-svg';

export const ReactSVG = styled(_ReactSVG)`
    display: flex;
    align-items: center;
    svg {
        fill: ${(props: any) => props.theme.colors.theme.header.color};
        width: 20px;
        height: 20px;
    }
`;

const LibLogo = styled.img`
    fill: #2b414d;
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 10px;
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
    const config = useSelector((state: RootState) => state.app.config);
    useEffect(() => {
        loadTimeCountEvent();
    });
    return (
        <Flex
            position="relative"
            flex="0 0 auto"
            justifyContent="space-between"
            p={4}
            fontSize={rem(14)}
            bg="theme.footer.bg"
            color="theme.footer.text"
        >
            <BackTopBtn></BackTopBtn>
            <Box>
                <Flex className="site-info" alignItems="center">
                    <ReactSVG loading={() => <Spinner size="sm" mr={2} />} src={config.siteLogo} />
                    <Text className="site-title" ml={rem(8)}>
                        欢迎来到 {config.siteTitle}，这里主要分享前后端技术文章，致力于web技术研究。
                    </Text>
                </Flex>
                <Flex alignItems="center">
                    <div className="contact-title">Contact us: </div>
                    <Flex className="social-list">
                        <UiLink href="mailto:bs32g1038@163.com">
                            <Icon name="email" ml="8px" fill="theme.primaryText"></Icon>
                        </UiLink>
                        <UiLink>
                            <Icon name="wechat" ml="8px" fill="theme.primaryText"></Icon>
                        </UiLink>
                        <UiLink>
                            <Icon name="qq" ml="8px" fill="theme.primaryText"></Icon>
                        </UiLink>
                        <UiLink href={config.projectGithub} isExternal={true}>
                            <Icon name="github" ml="8px" fill="theme.primaryText"></Icon>
                        </UiLink>
                    </Flex>
                </Flex>
                <Flex flexWrap="wrap">
                    <Text as="span">
                        Copyright © 2016-{new Date().getFullYear()} {config.siteTitle}
                    </Text>
                    <UiLink href={config.icpGovCn} isExternal={true} display="flex" alignItems="center">
                        <Image
                            ml="3px"
                            mr="3px"
                            size="14px"
                            display="inline-block"
                            src={require('@blog/client/assets/images/icp.png')}
                        ></Image>
                        <Text as="span">{config.siteIcp}</Text>
                    </UiLink>
                </Flex>
                <Text mb={1}>
                    Powered by <strong>Nodejs</strong> <strong>nestjs</strong> <strong>nextjs</strong>{' '}
                    <strong>react</strong> <strong>antdesign</strong>
                </Text>
            </Box>
            <Flex flexDirection="column" maxW={rem(200)}>
                <Heading as="h3" fontSize={rem(20)}>
                    商务合作
                </Heading>
                <Text lineHeight={1.5}>承包前后端业务，联系前，请明确你的需求，最低报价，工期。</Text>
                <Flex alignItems="center">
                    <UiLink href="https://nestjs.com" isExternal={true}>
                        <LibLogo src={require('@blog/client/assets/svgs/logo-nestjs.svg')} />
                    </UiLink>
                    <UiLink href="https://react.docschina.org" isExternal={true}>
                        <LibLogo src={require('@blog/client/assets/svgs/logo-react.svg')} />
                    </UiLink>
                    <UiLink href="https://nodejs.org/en" isExternal={true}>
                        <LibLogo src={require('@blog/client/assets/svgs/logo-nodejs.svg')} />
                    </UiLink>
                    <UiLink href="https://ant.design" isExternal={true}>
                        <LibLogo src={require('@blog/client/assets/svgs/logo-ant-design.svg')} />
                    </UiLink>
                    <Button size="sm" onClick={() => toggleColorMode()} float="right" title="主题切换">
                        {colorMode === 'light' ? '暗黑' : '明亮'}主题
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
