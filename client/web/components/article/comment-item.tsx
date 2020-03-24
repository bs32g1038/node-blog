import React, { useState, useEffect } from 'react';
import { Collapse, Box, Text, Flex, Image, Icon } from '@chakra-ui/core';
import { css } from 'emotion';
import marked from '@blog/client/libs/marked';
import { timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import MarkdownBody from '../markdown-body';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import { rem } from 'polished';

const getBadgeVisitorOrAuthor = (identity) => {
    return identity !== 0 ? <Icon name="star" mr={2} fill="theme.primaryText"></Icon> : null;
};

const replyFn = (item: any) => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(item.nickName) || '');
    }, [item._id]);
    return (
        <Box width="100%" bg="theme.blackground" py={2} px={4} fontSize={rem(14)} mt={2} mb={2}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Icon name="at-sign" color="theme.secondaryText" mr={2}></Icon>
                    <Image src={avatarSrc} size="20px" borderRadius="md" mr={2}></Image>
                    <Box color="theme.primaryText" isTruncated={true} maxW={['110px', '180px']} mr={2}>
                        {item.nickName}
                    </Box>
                    {getBadgeVisitorOrAuthor(item.identity)}
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
                <MarkdownBody content={marked(item.content)}></MarkdownBody>
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
            px={[0, 2]}
            pt={3}
            pb={2}
            borderBottom="1px"
            borderBottomColor="theme.border"
            position="relative"
            fontSize={rem(14)}
            className={css`
                &:after {
                    content: attr(data-index);
                    position: absolute;
                    right: 10px;
                    top: 6.5px;
                    text-align: center;
                    color: #d5cbcb;
                    font-size: ${rem(16)};
                }
            `}
        >
            <Flex>
                <Image
                    src={avatarSrc}
                    size="38px"
                    borderRadius="md"
                    mt="5px"
                    mr="10px"
                    p={1}
                    backgroundColor="theme.blackground"
                ></Image>
                <Box width="100%">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center">
                            <Box color="theme.primaryText" fontWeight="bold" isTruncated={true} mr={2}>
                                {item.nickName}
                            </Box>
                            {getBadgeVisitorOrAuthor(item.identity)}
                            <Text color="theme.secondaryText">{timeAgo(item.createdAt)}</Text>
                        </Flex>
                        <Flex
                            userSelect="none"
                            alignItems="center"
                            color="theme.secondaryText"
                            cursor="pointer"
                            comment-id={item._id}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        >
                            <Icon name="chat" fontSize={14} mr={1}></Icon>回复
                        </Flex>
                    </Flex>
                    {item.reply && replyFn(item.reply)}
                    <Box color="theme.primaryText" mt={rem(6)}>
                        <MarkdownBody content={marked(item.content)}></MarkdownBody>
                    </Box>
                    <Box mt={3}>
                        {showCommentForm === item._id && (
                            <CommentForm url="/comments" articleId={item.article._id} replyId={item._id} />
                        )}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};
