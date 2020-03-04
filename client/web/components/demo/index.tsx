import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import UiLink from '@blog/client/web/components/ui-link';
import { Box, Link } from '@chakra-ui/core';
import { iframeResizer } from 'iframe-resizer';
import styled from '@emotion/styled';
import { rem } from 'polished';

const IFrame = styled.iframe`
    width: 1px;
    min-width: 100%;
`;

export const Demo = ({ demoName }) => {
    useEffect(() => {
        iframeResizer({ log: true }, '');
    });
    return (
        <Box bg="rgba(0,0,0,0.05)" py={rem(16)} px={rem(20)} mt={rem(10)} position="relative">
            <Box mb={2}>
                源码：
                <Link href="https://gitee.com/chengli01/demo" isExternal={true} color="red.500">
                    https://gitee.com/chengli01/demo
                </Link>
            </Box>
            <Box position="absolute" top="10px" right="10px">
                DEMO窗口
            </Box>
            <IFrame src={`/demo/${demoName}/index.html`} frameBorder="0" scrolling="no"></IFrame>
        </Box>
    );
};

export default (optoins: { demoName: string }) => {
    const $el = document.createElement('div');
    ReactDom.render(<Demo demoName={optoins.demoName}></Demo>, $el);
    return $el;
};
