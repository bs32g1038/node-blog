import React from 'react';
import BasicLayout from '@blog/client/admin/layouts';
import styled from '@emotion/styled';
import InfoForm from './InfoForm';
import PasswordForm from './PasswordForm';

const Wrap = styled.div`
    background-color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 20px;
    .ant-form-item-extra {
        margin-top: 6px;
    }
`;

export default () => {
    return (
        <BasicLayout>
            <Wrap>
                <InfoForm></InfoForm>
                <PasswordForm></PasswordForm>
            </Wrap>
        </BasicLayout>
    );
};
