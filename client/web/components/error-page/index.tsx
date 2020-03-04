import React from 'react';
import { Text, Flex, Heading, Box, Image, Divider } from '@chakra-ui/core';
import UiLink from '../ui-link';
import { rem } from 'polished';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/web/redux/store';

interface Props {
    statusCode: number;
}

const Error = (props: Props) => {
    const { statusCode } = props;
    const config = useSelector((state: RootState) => state.app.config);

    return (
        <Flex
            backgroundColor="theme.errorPage.bg"
            height="calc(100vh - 50px)"
            width="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            fontSize={rem(16)}
            color="rgba(0, 0, 0, 0.65)"
            lineHeight={1.5}
        >
            <Box>
                <Flex alignItems="center">
                    <Box mt={3}>
                        <Image mr={3} src={require('../../assets/svgs/logo.svg')} size="80px"></Image>
                    </Box>
                    {statusCode >= 400 && statusCode < 500 ? (
                        <Box maxW="450px">
                            <Heading as="h3" fontSize={rem(24)} fontWeight={500} my={2}>
                                抱歉！您所访问的页面不存在。
                            </Heading>
                            <Text my={1}>可能是因为您的链接地址有误、或者该文章已经被作者删除。</Text>
                            <Text my={1}>您可以尝试</Text>
                            <UiLink href="/">返回「李志成的个人网站」首页</UiLink>。
                        </Box>
                    ) : (
                        <Box maxW="450px">
                            <Heading as="h3" fontSize={rem(24)} fontWeight={500} mb={2}>
                                服务器内部发生错误。
                            </Heading>
                            抱歉带给您糟糕的体验, 恳请您发送 Email 到 {config.email}, 我们将在第一时间修复。
                        </Box>
                    )}
                </Flex>
                <Divider width="100%"></Divider>
            </Box>
            <Box fontSize={rem(14)} color="rgba(0, 0, 0, 0.45)">
                <span>Copyright © 2016-2019</span>
                <UiLink color="rgba(0, 0, 0, 0.45)" href="/blog" fontSize={rem(14)} ml={1}>
                    {config.siteTitle}
                </UiLink>
                <UiLink fontSize={rem(14)} ml={1} color="rgba(0, 0, 0, 0.45)" href={config.icpGovCn} isExternal={true}>
                    <span className="icon-icp"></span> {config.icp}
                </UiLink>
            </Box>
        </Flex>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
