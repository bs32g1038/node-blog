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
    .ant-form-item {
        margin-bottom: 0;
        p {
            margin-top: 4px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 13px;
        }
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
