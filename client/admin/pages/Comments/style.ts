import styled from '@emotion/styled';

export const ReplyListItem = styled.div`
    display: flex;
    position: relative;
    padding: 16px 20px 16px 20px;
    border-left: 2px solid #bf6263;
    background-color: #f0f2f5;
    margin-bottom: 20px;
`;

export const UserAvatar = styled.div`
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 3px;
    img {
        width: 40px;
        min-width: 40px;
        border-radius: 3px;
        overflow: hidden;
        line-height: 1;
        vertical-align: middle;
    }
`;

export const ReplyContent = styled.div`
    width: 100%;
    margin-left: 16px;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    position: relative;
    &:after,
    &:before {
        position: absolute;
        top: 11px;
        right: 100%;
        left: -16px;
        display: block;
        width: 0;
        height: 0;
        pointer-events: none;
        content: ' ';
        border-color: transparent;
        border-style: solid solid outset;
    }
    &:before {
        border-width: 8px;
        border-right-color: #d1d5da;
    }
    &:after {
        margin-top: 1px;
        margin-left: 2px;
        border-width: 7px;
        border-right-color: #f6f8fa;
    }
`;

export const ReplyInfo = styled.div`
    display: flex;
    align-items: center;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d1d5da;
    padding-right: 16px;
    padding-left: 16px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
`;

export const BaseInfo = styled.div`
    flex: 1 0 auto;
    padding-top: 8px;
    padding-bottom: 8px;
    a {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
    }
    .reply-author {
        font-weight: 700;
        margin-right: 5px;
    }
    .reply-time {
        font-size: 13px;
    }
`;
export const UserAction = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    .reply-action {
        margin-left: 7px;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 2px 5px;
        border-radius: 4px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
    }
`;

export const MarkdownText = styled.div`
    font-size: 14px;
    padding: 15px;
    background-color: #fff;
`;
