import React, { Fragment } from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/core';

const skeletonGlow = (colorStart, colorEnd) => keyframes`
    from {
        border-color: ${colorStart};
        background: ${colorStart};
    }
    to {
        border-color: ${colorEnd};
        background: ${colorEnd};
    }
`;

const _Box = styled(Box)`
    border-color: ${(props: any) => props.theme.colors.theme.skeleton.bgStart};
    box-shadow: none !important;
    background: ${(props: any) => props.theme.colors.theme.skeleton.bgStart};
    background-clip: padding-box !important;
    cursor: default;
    color: transparent !important;
    /* animation: ${(props: any) =>
        skeletonGlow(props.theme.colors.theme.skeleton.bgStart, props.theme.colors.theme.skeleton.bgEnd)} */
        /* 1s linear infinite alternate; */
    pointer-events: none;
    user-select: none;
`;

const Skeleton = props => {
    const { isLoaded = false, ...rest } = props;
    if (isLoaded) {
        return <Fragment {...props} />;
    }

    return <_Box borderRadius="2px" {...rest} />;
};

export default Skeleton;
