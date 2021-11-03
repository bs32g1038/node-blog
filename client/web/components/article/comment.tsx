import React from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';

const comemnt = (props: { article: any; comments: any }) => {
    const article = props.article;
    const comments = props.comments;
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>--发表评论--</h3>
            <CommentForm url="/comments" articleId={article._id} />
            <div>
                {comments.map((item: any, index: number) => (
                    <CommentItem item={item} index={index} key={item._id}></CommentItem>
                ))}
            </div>
        </div>
    );
};

export default comemnt;
