import React from 'react';
import styled from '@emotion/styled';
import { Spin } from 'antd';

const Wrap = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default () => {
    return (
        <Wrap>
            <Spin size="large" />
        </Wrap>
    );
};
