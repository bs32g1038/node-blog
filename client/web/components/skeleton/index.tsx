import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Box, BoxProps } from '@chakra-ui/core';
import { opacify } from 'polished';

const SkeletonLoading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const _Box = styled(Box)`
    box-shadow: none !important;
    background-clip: padding-box !important;
    cursor: default;
    color: transparent !important;
    pointer-events: none;
    user-select: none;
    background: linear-gradient(
        90deg,
        ${(props: any) => opacify(0.045, props.theme.colors.theme.blackground)} 25%,
        ${(props: any) => props.theme.colors.theme.blackground} 37%,
        ${(props: any) => opacify(0.035, props.theme.colors.theme.blackground)} 63%
    );
    background-size: 400% 100%;
    animation: ${SkeletonLoading} 1.4s ease infinite;
`;

interface CProps {
    isWidthAnimation?: boolean;
}
type Props = CProps & BoxProps;

const Skeleton = (props: Props) => {
    return <_Box {...props} />;
};

export default Skeleton;
