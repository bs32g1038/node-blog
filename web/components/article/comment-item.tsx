import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { xss } from '../../utils/helper';
import marked from '../../utils/marked';
import { timeAgo } from '../../utils/time';
import media from '../../utils/media';
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
    ${media.phone`
        &:after {
            display: none;
        }
    `}
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
    &.quote {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-top: 0;
        img {
            width: 16px;
            vertical-align: inherit;
        }
    }
`;

const Content = styled.div`
    width: 100%;
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    margin-right: 60px;
    > a {
        text-decoration: none;
        color: #999;
        margin-right: 12px;
    }
    &.quote {
        margin-right: 0;
    }
    ${media.phone`
        margin-right: 0;
        a {
            margin-right: 5px;
        }
    `}
`;

const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NickName = styled.span`
    font-weight: 700;
    word-wrap: break-word;
    color: #6d757a;
    display: flex;
    align-items: center;
    ${media.phone`
        .tip {
            display: none;
        }
    `}
`;

const InfoTime = styled.span`
    color: #999;
    font-size: 12px;
    font-weight: normal;
`;

const UserSign: any = styled.span`
    margin-left: 5px;
    color: #999;
    /* background-color: rgba(58, 165, 208, 0.8); */
    padding: 0 4px;
    border-radius: 5px;
    font-size: 12px;
    display: inline-block;
    ${(props: any) => props.isAdmin && 'background-color: rgba(250, 90, 60, .95)'};
    border-bottom: 1px solid #999;
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
    padding: 10px 20px 10px 20px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
`;

const ReplyBox = styled.div`
    margin-top: 10px;
`;

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setAvatarSrc(ghat.getImage(md5(item.nickName).toString()) || '');
    }, item._id);
    return (
        <Quote>
            <Content>
                <User>
                    <NickName>
                        <span className="tip">回复给：</span>
                        <AvatarWrap className="quote">
                            <img src={avatarSrc} />
                        </AvatarWrap>
                        {item.nickName}
                        <InfoTime>&nbsp;·&nbsp;{timeAgo(item.createdAt)}</InfoTime>
                    </NickName>
                    <Meta className="quote">
                        <a
                            href="javascript:;"
                            comment-id={item._id}
                            onClick={() => {
                                setShowContent(!showContent);
                            }}
                        >
                            {showContent ? '折叠' : '展开'}
                        </a>
                        <UserSign isAdmin={item.identity !== 0}>{item.identity !== 0 ? '博主' : '游客'}</UserSign>
                    </Meta>
                </User>
                {showContent && (
                    <ItemContent dangerouslySetInnerHTML={{ __html: xss(marked(item.content)) }}></ItemContent>
                )}
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
                        <NickName>
                            {item.nickName}
                            <InfoTime>&nbsp;·&nbsp;{timeAgo(item.createdAt)}</InfoTime>
                        </NickName>
                        <Meta>
                            <a
                                style={{ color: '#f86422' }}
                                href="javascript:;"
                                comment-id={item._id}
                                onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                            >
                                回复
                            </a>
                            <UserSign isAdmin={item.identity !== 0}>{item.identity !== 0 ? '博主' : '游客'}</UserSign>
                        </Meta>
                    </User>
                    {item.reply && replyFn(item.reply)}
                    <ItemContent dangerouslySetInnerHTML={{ __html: xss(marked(item.content)) }}></ItemContent>
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
