import React from 'react';
import { timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { IComment, useDeleteCommentMutation, useLazyLikeCommentQuery } from '@blog/client/web/api';
import { isString } from 'lodash';
import { Avatar, Button, Popconfirm } from 'antd';
import { CommentOutlined, DeleteOutlined, LikeOutlined } from '@ant-design/icons';
import { handleEmoji } from '@blog/client/common/helper.util';
import { useStore } from './zustand';

export const CommentItem = (props: {
    item: IComment;
    showCommentForm: string;
    setShowCommentForm: any;
    parentNickName?: string;
    parentId?: string;
}) => {
    const { updateCommentListTag } = useStore();
    const [likeComment, { isLoading }] = useLazyLikeCommentQuery();
    const [_deleteComment] = useDeleteCommentMutation();
    const { showCommentForm, setShowCommentForm, parentId, parentNickName } = props;
    const item = props.item;
    return (
        <div className={style.commentItem}>
            <div className={style.commentItemInner}>
                <div className={style.commentItemAvatar}>
                    <Avatar size={40} src={item?.user?.avatar} />
                </div>
                <div className={style.commentItemRight}>
                    <div className={style.commentItemRightTop}>
                        <div className={style.commentHeader}>
                            <div className={style.commentHeaderLeftContent}>
                                <span className={style.commentItemNickName}>{item?.user?.username}</span>
                                <span className={style.time}>{timeAgo(item.createdAt)}</span>
                            </div>
                        </div>
                        <p
                            className={style.commentItemContent}
                            dangerouslySetInnerHTML={{
                                __html:
                                    (item.reply
                                        ? `@${item.reply?.user?.username}：`
                                        : parentId
                                          ? `@${parentNickName}：`
                                          : '') + xss(handleEmoji(item?.content).replace(/\n/g, '<br>')),
                            }}
                        ></p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                            <Button
                                type="text"
                                style={{ color: 'var(--meta-text-color)' }}
                                onClick={() => setShowCommentForm(showCommentForm === item._id ? '' : item._id)}
                            >
                                <CommentOutlined style={{ fontSize: 14 }}></CommentOutlined>
                                <span>回复</span>
                            </Button>
                            <Button
                                type="text"
                                style={{ color: 'var(--meta-text-color)' }}
                                loading={isLoading}
                                onClick={() => {
                                    likeComment({
                                        id: item._id,
                                    }).then(() => {
                                        updateCommentListTag();
                                    });
                                }}
                            >
                                <LikeOutlined style={{ fontSize: 14 }} />
                                <span>点赞（{item.likes.length}）</span>
                            </Button>
                            {item.isCanDeleted && (
                                <Popconfirm
                                    title="确认要删除？"
                                    placement="right"
                                    onConfirm={() => {
                                        _deleteComment({
                                            id: item._id,
                                        }).then(() => {
                                            updateCommentListTag();
                                        });
                                    }}
                                >
                                    <Button type="text" style={{ color: 'var(--meta-text-color)' }} loading={isLoading}>
                                        <DeleteOutlined style={{ fontSize: 14 }} />
                                        <span>删除</span>
                                    </Button>
                                </Popconfirm>
                            )}
                        </div>
                        {showCommentForm === item._id && (
                            <CommentForm
                                url="/api/comments"
                                parentId={parentId || item._id}
                                articleId={isString(item.article) ? item.article : item.article._id}
                                replyId={item._id}
                                placeholder={`回复@${item.user?.username}`}
                            />
                        )}
                    </div>
                    <div className={style.commentReplyList}>
                        {item.comments?.map((_) => {
                            return (
                                <CommentItem
                                    showCommentForm={showCommentForm}
                                    setShowCommentForm={setShowCommentForm}
                                    key={_._id}
                                    parentNickName={item.user?.username}
                                    parentId={item._id}
                                    item={_}
                                ></CommentItem>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
