import styled from '@emotion/styled';
import { Row, Card } from 'antd';

export const MediaListRow = styled(Row)`
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
    .ant-card {
        margin-right: 10px;
        margin-left: 10px;
        box-sizing: border-box;
        margin-top: 16px;
        width: calc(33.333% - 20px);
    }

    .ant-card-cover {
        padding: 10px;
        height: 183px;

        * {
            display: block;
            width: auto;
            height: 100%;
            margin: 0 auto;
            max-width: 100%;
        }
    }

    .ant-card-meta-title {
        white-space: normal;
        word-break: break-all;
    }
`;

export const WrapCard = styled(Card)`
    .ant-card-body {
        height: 108px;
    }
    .button {
        display: inline-block;
        width: auto;
        i {
            display: inline-block;
            width: auto;
            margin-right: 5px;
        }
    }
    .button-view {
        color: #fff;
        border: 1px solid #4caf50;
        background-color: #4caf50;
        transition: opacity 0.5s ease-in;
        &:hover {
            color: #fff;
            opacity: 0.9;
        }
    }
`;
