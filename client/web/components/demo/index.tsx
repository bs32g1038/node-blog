import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { Box, Link } from '@chakra-ui/core';
import { iframeResizer } from 'iframe-resizer';
import styled from '@emotion/styled';
import { rem } from 'polished';

const IFrame = styled.iframe`
    width: 1px;
    min-width: 100%;
`;

export const Demo = ({ demoName, demoGit }) => {
    useEffect(() => {
        iframeResizer({ log: true }, '');
    });
    return (
        <Box bg="rgba(0,0,0,0.05)" py={rem(16)} px={rem(20)} mt={rem(10)} position="relative">
            <Box mb={2}>
                <Link href={demoGit + '/tree/master/' + demoName} isExternal={true} color="red.500">
                    源码
                </Link>
            </Box>
            <Box position="absolute" top="10px" right="10px">
                DEMO窗口
            </Box>
            <IFrame src={`/demo?name=${demoName}`} frameBorder="0" scrolling="no"></IFrame>
        </Box>
    );
};

export default (optoins: { demoName: string; demoGit: string }) => {
    const $el = document.createElement('div');
    ReactDom.render(<Demo demoName={optoins.demoName} demoGit={optoins.demoGit}></Demo>, $el);
    return $el;
};
