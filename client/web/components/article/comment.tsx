import React from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';
import styles from './index.style.module.scss';

const comemnt = (props: { article: any; comments: any }) => {
    const article = props.article;
    const comments = props.comments;
    return (
        <div className={styles.commentForm}>
            <h3 className={styles.commentFormTitle}>--发表评论--</h3>
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
