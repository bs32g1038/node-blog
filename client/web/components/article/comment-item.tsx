import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Collapse, Box, Badge, Text, Flex, Image } from '@chakra-ui/core';
import { css } from 'emotion';
import marked from '../../../libs/marked';
import { timeAgo } from '../../../libs/time';
import { CommentForm } from '../comment-form';
import MarkdownBody from '../markdown-body';
import { gernateAvatarImage } from '../../utils/helper';
import { rem } from 'polished';

const ItemContent = styled(MarkdownBody)`
    font-size: 16px;
    line-height: 1.8;
    word-break: break-all;
    word-wrap: break-word;
`;

const getBadgeVisitorOrAuthor = identity => {
    return identity !== 0 ? (
        <Badge
            fontWeight="normal"
            fontSize={14}
            boxShadow="none"
            variant="outline"
            color="theme.article.badgeAuthorColor"
        >
            博主
        </Badge>
    ) : (
        <Badge
            fontWeight="normal"
            fontSize={14}
            boxShadow="none"
            variant="outline"
            color="theme.article.badgeVisitorColor"
        >
            游客
        </Badge>
    );
};

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(item.nickName) || '');
    }, [item._id]);
    return (
        <Box width="100%" bg="theme.blackground" py={2} px={5} fontSize={rem(14)} mt={2} mb={2}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Text as="span">回复给：</Text>
                    <Image src={avatarSrc} size="16px" borderRadius="md" mr={1}></Image>
                    <Box color="theme.primaryText" isTruncated={true} maxW={['110px', '180px']}>
                        {item.nickName}
                    </Box>
                    <span className="separator">&nbsp;·&nbsp;</span>
                    {getBadgeVisitorOrAuthor(item.identity)}
                    <span className="separator">&nbsp;·&nbsp;</span>
                    <Text color="theme.secondaryText">{timeAgo(item.createdAt)}</Text>
                </Flex>
                <Box
                    userSelect="none"
                    color="theme.secondaryText"
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
            fontSize={rem(14)}
            className={css`
                &:after {
                    content: attr(data-index);
                    position: absolute;
                    right: 10px;
                    top: 17px;
                    text-align: center;
                    color: #d5cbcb;
                    font-size: ${rem(14)};
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
                                isTruncated={true}
                                maxW={['110px', '180px']}
                            >
                                {item.nickName}
                            </Box>
                            <span className="separator">&nbsp;·&nbsp;</span>
                            {getBadgeVisitorOrAuthor(item.identity)}
                            <span className="separator">&nbsp;·&nbsp;</span>
                            <Text color="theme.secondaryText">{timeAgo(item.createdAt)}</Text>
                        </Flex>
                        <Box
                            userSelect="none"
                            mr="4rem"
                            color="red.500"
                            cursor="pointer"
                            comment-id={item._id}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        >
                            回复
                        </Box>
                    </Flex>
                    {item.reply && replyFn(item.reply)}
                    <Box color="theme.primaryText" mt={rem(10)}>
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
