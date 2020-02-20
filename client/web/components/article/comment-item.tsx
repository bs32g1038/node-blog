import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Collapse, Box, Badge, Text, Flex, Image } from '@chakra-ui/core';
import { css } from 'emotion';
import marked from '../../../libs/marked';
import { timeAgo } from '../../../libs/time';
import { CommentForm } from '../comment-form';
import MarkdownBody from '../markdown-body';
import { gernateAvatarImage } from '../../utils/helper';

const ItemContent = styled(MarkdownBody)`
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
`;

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(item.nickName) || '');
    }, [item._id]);
    return (
        <Box width="100%" bg="theme.blackground" py={2} px={5} fontSize={14} mt={2} mb={2}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Text as="span">回复给：</Text>
                    <Image src={avatarSrc} size="16px" borderRadius="md" mr={1}></Image>
                    <Box color="theme.primaryText" fontSize={14} isTruncated={true} maxW="180px">
                        {item.nickName}
                    </Box>
                    <span className="separator">&nbsp;·&nbsp;</span>
                    {item.identity !== 0 ? (
                        <Badge
                            fontWeight="normal"
                            fontSize={12}
                            variant="outline"
                            variantColor=""
                            color="theme.article.badgeAuthorColor"
                        >
                            博主
                        </Badge>
                    ) : (
                        <Badge
                            fontWeight="normal"
                            fontSize={12}
                            variant="outline"
                            variantColor=""
                            color="theme.article.badgeVisitorColor"
                        >
                            游客
                        </Badge>
                    )}
                    <span className="separator">&nbsp;·&nbsp;</span>
                    <Text color="gray.500" fontSize={12}>
                        {timeAgo(item.createdAt)}
                    </Text>
                </Flex>
                <Box
                    userSelect="none"
                    color="theme.secondaryText"
                    fontSize={12}
                    style={{ cursor: 'pointer' }}
                    comment-id={item._id}
                    onClick={() => {
                        setShowContent(!showContent);
                    }}
                >
                    {showContent ? '折叠' : '展开'}
                </Box>
            </Flex>
            <Collapse mt={4} isOpen={showContent}>
                <ItemContent content={marked(item.content)}></ItemContent>
            </Collapse>
        </Box>
    );
};

export const CommentItem = (props: { item: any; index: number }) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(props.item.nickName) || '');
    }, [props.item._id]);

    const item = props.item;
    return (
        <Box
            data-index={'# ' + (props.index + 1) + ' 楼层'}
            p={2}
            pt={4}
            borderBottom="1px"
            borderBottomColor="theme.border"
            position="relative"
            className={css`
                &:after {
                    content: attr(data-index);
                    position: absolute;
                    right: 10px;
                    top: 19px;
                    text-align: center;
                    color: #d5cbcb;
                    font-size: 12px;
                }
            `}
        >
            <Flex>
                <Image src={avatarSrc} size="40px" borderRadius="4px" mt="5px" mr="10px"></Image>
                <Box width="100%">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center">
                            <Box
                                color="theme.primaryText"
                                fontWeight="bold"
                                fontSize={14}
                                isTruncated={true}
                                maxW="180px"
                            >
                                {item.nickName}
                            </Box>
                            <span className="separator">&nbsp;·&nbsp;</span>
                            {item.identity !== 0 ? (
                                <Badge
                                    fontSize={12}
                                    variant="outline"
                                    variantColor=""
                                    color="theme.article.badgeAuthorColor"
                                >
                                    博主
                                </Badge>
                            ) : (
                                <Badge
                                    fontSize={12}
                                    variant="outline"
                                    variantColor=""
                                    color="theme.article.badgeVisitorColor"
                                >
                                    游客
                                </Badge>
                            )}
                            <span className="separator">&nbsp;·&nbsp;</span>
                            <Text color="gray.500" fontSize={12}>
                                {timeAgo(item.createdAt)}
                            </Text>
                        </Flex>
                        <Box
                            userSelect="none"
                            fontSize={12}
                            mr="55px"
                            color="red.500"
                            cursor="pointer"
                            comment-id={item._id}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        >
                            回复
                        </Box>
                    </Flex>
                    {item.reply && replyFn(item.reply)}
                    <Box
                        color="theme.primaryText"
                        className={css`
                            h1,
                            h2,
                            h3 {
                                border-color: rgba(255, 255, 255, 0.2);
                            }
                        `}
                    >
                        <ItemContent content={marked(item.content)}></ItemContent>
                    </Box>
                    <Box mt={3}>
                        {showCommentForm === item._id && (
                            <CommentForm url="/comments" articleId={item.article} replyId={item._id} />
                        )}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};
