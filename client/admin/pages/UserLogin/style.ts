import styled from '@emotion/styled';

export const SignIn = styled.div`
    width: 100%;
    height: 100%;
`;

export const SignInMain = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    width: 360px;
    margin-left: -180px;
    transform: translateY(-50%);
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        h2 {
            font-size: 18px;
            color: inherit;
            margin: 5px 0;
            color: #333;
        }
        p {
            margin: 0;
            font-size: 14px;
            color: #999;
        }
    }
    .header-title {
        margin-left: 20px;
    }
    .brand {
        display: block;
        width: 60px;
        fill: #fff;
    }
    > .nodeblog {
        text-align: center;
        font-size: 12px;
        color: #777;
        > a {
            color: #777;
            margin-left: 3px;
        }
    }
`;

export const SignInPanel = styled.div`
    padding-bottom: 20px;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    .ant-form > .ant-form-item {
        margin-bottom: 5px;
    }
    .ant-form-item > label {
        color: #666;
        text-align: right;
        vertical-align: middle;
        padding-top: 7px;
        padding-bottom: 7px;
    }
    .login-form {
        max-width: 300px;
        margin: 0 auto;
    }
`;

export const SignInHeader = styled.div`
    color: #333;
    background-color: #f5f5f5;
    padding: 5px 10px;
    text-align: center;
    margin-bottom: 20px;
`;

export const SignInTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    font-size: 16px;
    color: #555;
`;
