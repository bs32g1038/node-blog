import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import marked from '../../../libs/marked';
import { timeAgo } from '../../../libs/time';
import media from '../../utils/media';
import GHAT from '../../../libs/generate-avatar';
import { CommentForm } from '../comment-form';
import md5 from 'crypto-js/md5';
import { Collapse, Box, Badge, Text, Heading } from '@chakra-ui/core';

const ghat = new GHAT();

const CommentsItem = styled.li`
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    position: relative;
    &:after {
        content: attr(data-index);
        position: absolute;
        right: 10px;
        top: 12px;
        text-align: center;
        color: #d5cbcb;
        font-size: 12px;
    }
    ${media.phone`
        &:after {
            top: 10px;
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
    ${media.phone`
        width: 32px;
        height: 32px;
        img {
            width: 32px;
            height: auto;
            vertical-align: middle;
            border-radius: 4px;
        }
    `}
`;

const Content = styled.div`
    width: 100%;
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    margin-right: 55px;
    > a {
        text-decoration: none;
        color: #999;
    }
    &.quote {
        margin-right: 0;
    }
`;

const User = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InfoWrap = styled.div`
    display: flex;
    align-items: center;
    color: #6d757a;
    .separator {
        color: #b5a9a9;
        font-weight: normal;
    }
    ${media.phone`
        .tip {
            font-size: 12px;
        }
    `}
`;

const NickName = styled.span`
    ${media.phone`
        font-size: 12px;
        &.quote {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 60px;
        }
    `}
`;

const InfoTime = styled.span`
    color: #999;
    font-size: 12px;
    font-weight: normal;
`;

const UserSign: any = styled.span`
    color: #999;
    font-size: 12px;
    display: inline-block;
    color: #b5a9a9;
    font-weight: normal;
    ${(props: any) =>
        props.isAdmin &&
        `
        background-color: rgba(250, 90, 60, .95);
        color: #fff;
        padding: 0 3px;
        border-radius: 3px;
    `};
`;

const ItemContent = styled.div`
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
`;

const Quote = styled.div`
    background-color: #f5f5f5;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 10px 20px 10px 20px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    ${media.phone`
        padding: 10px;
    `}
`;

const ReplyBox = styled.div`
    margin-top: 10px;
`;

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setAvatarSrc(ghat.getImage(md5(item.nickName).toString()) || '');
    }, [item._id]);
    return (
        <Quote>
            <Box width="100%">
                <User>
                    <InfoWrap>
                        <span className="tip">回复给：</span>
                        <AvatarWrap className="quote">
                            <img src={avatarSrc} />
                        </AvatarWrap>
                        <NickName className="quote">{item.nickName}</NickName>
                        <span className="separator">&nbsp;·&nbsp;</span>
                        {item.identity !== 0 ? (
                            <Badge fontWeight="normal" fontSize={12} variant="outline" variantColor="" color="red.500">
                                博主
                            </Badge>
                        ) : (
                            <Badge fontWeight="normal" fontSize={12} variant="outline" variantColor="" color="gray.500">
                                游客
                            </Badge>
                        )}
                        <span className="separator">&nbsp;·&nbsp;</span>
                        <InfoTime>{timeAgo(item.createdAt)}</InfoTime>
                    </InfoWrap>
                    <Meta className="quote">
                        <a
                            style={{ cursor: 'pointer' }}
                            comment-id={item._id}
                            onClick={() => {
                                setShowContent(!showContent);
                            }}
                        >
                            {showContent ? '折叠' : '展开'}
                        </a>
                    </Meta>
                </User>
                <Collapse mt={4} isOpen={showContent}>
                    <ItemContent dangerouslySetInnerHTML={{ __html: marked(item.content) }}></ItemContent>
                </Collapse>
            </Box>
        </Quote>
    );
};

export const CommentItem = (props: { item: any; index: number }) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(ghat.getImage(md5(props.item.nickName).toString()) || '');
    }, [props.item._id]);

    const item = props.item;
    return (
        <CommentsItem data-index={'# ' + (props.index + 1) + ' 楼层'}>
            <Info>
                <AvatarWrap>
                    <img src={avatarSrc} />
                </AvatarWrap>
                <Content>
                    <User>
                        <InfoWrap>
                            <Box color="gray.500" fontWeight="bold" fontSize={14}>
                                {item.nickName}
                            </Box>
                            <span className="separator">&nbsp;·&nbsp;</span>
                            {item.identity !== 0 ? (
                                <Badge fontSize={12} variant="outline" variantColor="" color="red.500">
                                    博主
                                </Badge>
                            ) : (
                                <Badge fontSize={12} variant="outline" variantColor="" color="gray.500">
                                    游客
                                </Badge>
                            )}
                            <span className="separator">&nbsp;·&nbsp;</span>
                            <Text color="gray.500" fontSize={12}>
                                {timeAgo(item.createdAt)}
                            </Text>
                        </InfoWrap>
                        <Meta>
                            <Text
                                color="red.500"
                                cursor="pointer"
                                comment-id={item._id}
                                onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                            >
                                回复
                            </Text>
                        </Meta>
                    </User>
                    {item.reply && replyFn(item.reply)}
                    <ItemContent dangerouslySetInnerHTML={{ __html: marked(item.content) }}></ItemContent>
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
