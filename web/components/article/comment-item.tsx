import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { xss } from '../../utils/helper';
import marked from '../../utils/marked';
import { parseTime, timeAgo } from '../../utils/time';
import GHAT from '../../utils/generate-avatar';
import { CommentForm } from '../comment-form';
import md5 from 'crypto-js/md5';

const ghat = new GHAT();

const CommentsItem = styled.li`
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    position: relative;
    &:after {
        content: attr(data-index);
        position: absolute;
        right: 10px;
        top: 10px;
        text-align: center;
        color: #d5cbcb;
        font-size: 12px;
    }
`;

const Info = styled.div`
    display: flex;
`;

const AvatarWrap = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
    margin-top: 5px;
    img {
        width: 40px;
        height: auto;
        vertical-align: middle;
        border-radius: 4px;
    }
`;

const Content = styled.div`
    width: 100%;
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    > a {
        text-decoration: none;
        color: #999;
    }
`;

const User = styled.div``;

const NickName = styled.span`
    font-weight: 700;
    word-wrap: break-word;
    color: #6d757a;
`;

const UserSign: any = styled.span`
    margin-left: 5px;
    color: #fff;
    background-color: rgba(58, 165, 208, 0.8);
    padding: 0 4px;
    border-radius: 2px;
    font-size: 12px;
    display: inline-block;
    ${(props: any) => props.isAdmin && 'background-color: rgba(250, 90, 60, .95)'};
`;

const ItemContent = styled.div`
    font-size: 14px;
    line-height: 1.5;
    p {
        margin: 5px 0;
        img {
            width: 20px;
            vertical-align: bottom;
        }
    }
`;

const Quote = styled.div`
    background-color: #f5f5f5;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 5px 20px 5px 20px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
`;

const ReplyBox = styled.div`
    margin-top: 10px;
`;

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(ghat.getImage(md5(item.nickName).toString()) || '');
    }, item._id);
    return (
        <Quote>
            <AvatarWrap>
                <img src={avatarSrc} />
            </AvatarWrap>
            <Content>
                <User>
                    <NickName>{item.nickName}</NickName>
                    <UserSign isAdmin={item.identity !== 0}>{item.identity !== 0 ? '博主' : '游客'}</UserSign>
                </User>
                <ItemContent dangerouslySetInnerHTML={{ __html: xss(marked(item.content)) }}></ItemContent>
                <Meta>发表于：{timeAgo(item.createdAt)}前</Meta>
            </Content>
        </Quote>
    );
};

export const CommentItem = (props: { item: any; index: number }) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(ghat.getImage(md5(props.item.nickName).toString()) || '');
    }, props.item._id);

    const item = props.item;
    return (
        <CommentsItem data-index={'# ' + (props.index + 1) + ' 楼层'}>
            <Info>
                <AvatarWrap>
                    <img src={avatarSrc} />
                </AvatarWrap>
                <Content>
                    <User>
                        <NickName>{item.nickName}</NickName>
                        <UserSign isAdmin={item.identity !== 0}>{item.identity !== 0 ? '博主' : '游客'}</UserSign>
                    </User>
                    <ItemContent dangerouslySetInnerHTML={{ __html: xss(marked(item.content)) }}></ItemContent>
                    <Meta>
                        <span className="ArticleComments-infoTime">发表于：{parseTime(item.createdAt)}</span>
                        <span> | </span>
                        <a
                            href="javascript:;"
                            comment-id={item._id}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        >
                            回复
                        </a>
                    </Meta>
                    {item.reply && replyFn(item.reply)}
                    <ReplyBox>
                        {showCommentForm === item._id && (
                            <CommentForm url="/comments" articleId={item.article} replyId={item._id} />
                        )}
                    </ReplyBox>
                </Content>
            </Info>
        </CommentsItem>
    );
};
