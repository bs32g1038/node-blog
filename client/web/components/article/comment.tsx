import React from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';
import { Heading, Box } from '@chakra-ui/core';

const comemnt = (props: { article: any; comments: any }) => {
    const article = props.article;
    const comments = props.comments;
    return (
        <Box mt={5}>
            <Heading as="h3" size="lg" my={[4]} textAlign="center" color="theme.primaryText">
                --发表评论--
            </Heading>
            <CommentForm url="/comments" articleId={article._id} />
            <Box mt={4}>
                {comments.map((item: any, index: number) => (
                    <CommentItem item={item} index={index} key={item._id}></CommentItem>
                ))}
            </Box>
        </Box>
    );
};

export default comemnt;
