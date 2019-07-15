import styled from '@emotion/styled';
import React from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';

const CommentsWrap = styled.div(_ => ({
    marginTop: '20px',
}));

const Tip = styled.h3`
    color: rgba(51, 51, 51, 0.8);
    text-align: center;
    font-size: 20px;
`;

const Main = styled.ul(_ => ({
    listStyle: 'none',
    margin: '15px 0 0 0',
    padding: 0,
}));

const comemnt = (props: { article: any; comments: any }) => {
    const article = props.article;
    const comments = props.comments;
    return (
        <CommentsWrap>
            <Tip>--发表评论--</Tip>
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
