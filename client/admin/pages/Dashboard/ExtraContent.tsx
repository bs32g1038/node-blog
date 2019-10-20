import React from 'react';
import styled from '@emotion/styled';
import { Statistic } from 'antd';

export const ExtraContent = styled.div`
    &:before,
    &:after {
        display: table;
        content: ' ';
    }
    &:after {
        clear: both;
        height: 0;
        font-size: 0;
        visibility: hidden;
    }
    zoom: 1;
    float: right;
    white-space: nowrap;
    text-align: center;
    .statItem {
        position: relative;
        display: inline-block;
        padding: 0 32px;
        > p:first-child {
            margin-bottom: 4px;
            color: #999;
            font-size: 14px;
            line-height: 22px;
        }
        > p {
            margin: 0;
            color: rgba(0, 0, 0, 0.45);
            font-size: 30px;
            line-height: 38px;
            > span {
                color: #999;
                font-size: 20px;
            }
        }
        &:after {
            position: absolute;
            top: 8px;
            right: 0;
            width: 1px;
            height: 40px;
            background-color: #e8e8e8;
            content: '';
        }
        &:last-child {
            padding-right: 0;
            &::after {
                display: none;
            }
        }
    }
`;

export default ({ statisticalInfo }) => {
    return (
        <ExtraContent>
            <div className="statItem">
                <Statistic title="文章数量" value={statisticalInfo.articleCount} />
            </div>
            <div className="statItem">
                <Statistic title="分类数量" value={statisticalInfo.categoryCount} />
            </div>
            <div className="statItem">
                <Statistic title="评论数量" value={statisticalInfo.commentCount} />
            </div>
        </ExtraContent>
    );
};
