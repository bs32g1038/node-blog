import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Box, BoxProps } from '@chakra-ui/core';

const skeletonWidthGlow = keyframes`
    0%   { width:100%; }
    25%  { width:85%; }
    35%  { width:70%; }
    50%  { width:55%; }
    65%  { width:76%; }
    75%  { width:90%; }
    100% { width:100%; }
`;

const _Box = styled(Box)`
    border-color: ${(props: any) => props.theme.colors.theme.blackground};
    box-shadow: none !important;
    background: ${(props: any) => props.theme.colors.theme.blackground};
    background-clip: padding-box !important;
    cursor: default;
    color: transparent !important;
    animation: ${(props: any) => props.isWidthAnimation && skeletonWidthGlow} 1s linear infinite;
    pointer-events: none;
    user-select: none;
`;

interface CProps {
    isWidthAnimation?: boolean;
}
type Props = CProps & BoxProps;

const Skeleton = (props: Props) => {
    return <_Box {...props} />;
};

export default Skeleton;
