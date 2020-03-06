import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import styled from '@emotion/styled';

const Wrap = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f2f4f7;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    height: 100vh;
    max-height: 100%;
    margin-top: -48px;
    margin-left: -24px;
`;

const Iframe = styled.iframe`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    transform: translate3d(0, 0, 0);
`;

export default () => {
    return (
        <BasicLayout>
            <Wrap>
                <Iframe src="/" frameBorder="0" allowTransparency={true}></Iframe>
            </Wrap>
        </BasicLayout>
    );
};
