import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import BackTopBtn from '../back-top-button';
import { Flex, Box, Text, Heading, useColorMode, Image, Button, Spinner } from '@chakra-ui/react';
import UiLink from '../ui-link';
import { rem } from 'polished';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { ReactSVG } from 'react-svg';
import { EmailIcon, WechatIcon, QQIcon, GithubIcon } from '../../icons';
import { config as darkConfig } from '../../theme/dark';
import { config as lightConfig } from '../../theme/light';

const SvgDiv = styled.div`
    display: flex;
    align-items: center;
    svg {
        width: 20px;
        height: 20px;
        fill: ${(props) => {
            return props.colorMode == 'light' ? lightConfig.colors.theme.title : darkConfig.colors.theme.title;
        }};
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

export const AppFooter = () => {
    const colorMode = useSelector((state: RootState) => state.app.theme);
    const config = useSelector((state: RootState) => state.app.config);
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
                    <SvgDiv colorMode={colorMode}>
                        <ReactSVG src={config.siteLogo} />
                    </SvgDiv>
                    <Text className="site-title" ml={rem(8)}>
                        欢迎来到 {config.siteTitle}，这里主要分享前后端技术文章，致力于web技术研究。
                    </Text>
                </Flex>
                <Flex alignItems="center">
                    <div className="contact-title">Contact us: </div>
                    <Flex className="social-list">
                        <UiLink href="mailto:bs32g1038@163.com">
                            <EmailIcon ml="8px" fill="theme.primaryText"></EmailIcon>
                        </UiLink>
                        <UiLink>
                            <WechatIcon ml="8px" fill="theme.primaryText"></WechatIcon>
                        </UiLink>
                        <UiLink>
                            <QQIcon ml="8px" fill="theme.primaryText"></QQIcon>
                        </UiLink>
                        <UiLink href={config.projectGithub} isExternal={true}>
                            <GithubIcon ml="8px" fill="theme.primaryText"></GithubIcon>
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
