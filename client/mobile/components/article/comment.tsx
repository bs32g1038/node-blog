import React, { useState } from 'react';
import { CommentForm } from '../comment-form';
import { CommentItem } from './comment-item';
import styles from './index.style.module.scss';
import { CommentOutlined } from '@ant-design/icons';

export default function Comemnt(props: { article: any; comments: any }) {
    const article = props.article;
    const comments = props.comments;
    const [showCommentForm, setShowCommentForm] = useState('');
    return (
        <div className={styles.commentForm}>
            <h3 className={styles.commentFormTitle}>
                <CommentOutlined />
                评论 ({article.commentCount})
            </h3>
            <CommentForm url="/api/comments" articleId={article._id} />
            <div>
                {comments.map((item: any) => (
                    <CommentItem
                        showCommentForm={showCommentForm}
                        setShowCommentForm={setShowCommentForm}
                        item={item}
                        key={item._id}
                    ></CommentItem>
                ))}
            </div>
        </div>
    );
}
