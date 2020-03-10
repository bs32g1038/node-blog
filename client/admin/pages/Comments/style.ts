import styled from '@emotion/styled';

export const Wrap = styled.div`
    img {
        width: 100%;
    }
`;

export const ReplyListItem = styled.div`
    display: flex;
    position: relative;
    padding: 16px 20px 16px 20px;
    border: 1px dashed #d1d5da;
    background-color: #fff;
    margin-bottom: 20px;
`;

export const UserAvatar = styled.div`
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    img {
        width: 100%;
        min-width: 100%;
        border-radius: 50%;
        overflow: hidden;
        line-height: 1;
        vertical-align: middle;
    }
`;

export const ReplyContent = styled.div`
    width: 100%;
    margin-left: 16px;
    border-radius: 3px;
    position: relative;
`;

export const ReplyInfo = styled.div`
    display: flex;
    align-items: center;
    padding-right: 16px;
`;

export const Tip = styled.div`
    margin-bottom: 10px;
    svg {
        margin-right: 6px;
    }
`;

export const BaseInfo = styled.div`
    flex: 1 0 auto;
    display: flex;
    font-size: 12px;
    align-items: center;
    a {
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
    }
    .reply-author {
        font-weight: 700;
        margin-right: 5px;
    }
    .reply-time {
        font-size: 12px;
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
    padding: 15px 0;
    background-color: #fff;
`;
