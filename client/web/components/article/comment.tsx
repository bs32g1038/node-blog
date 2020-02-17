import styled from '@emotion/styled';
import React from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';
import { Heading, Alert, AlertIcon } from '@chakra-ui/core';

const CommentsWrap = styled.div`
    margin-top: 20px;
`;

const Tip = styled.h3`
    color: rgba(51, 51, 51, 0.8);
    text-align: center;
    font-size: 20px;
`;

const Main = styled.ul`
    list-style: none;
    margin: 15px 0 0 0;
    padding: 0;
`;

const comemnt = (props: { article: any; comments: any }) => {
    const article = props.article;
    const comments = props.comments;
    return (
        <CommentsWrap>
            <Heading as="h3" size="lg" my={[4]} textAlign="center" color="gray.600">
                --发表评论--
            </Heading>
            <CommentForm url="/comments" articleId={article._id} />
            <Main>
                {comments.map((item: any, index: number) => (
                    <CommentItem item={item} index={index} key={item._id}></CommentItem>
                ))}
            </Main>
        </CommentsWrap>
    );
};

export default comemnt;
