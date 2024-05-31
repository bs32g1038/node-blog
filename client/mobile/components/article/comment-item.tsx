import React from 'react';
import { timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { IComment } from '@blog/client/web/api';
import { isString } from 'lodash';
import { Button, Space } from 'antd-mobile';
import Avatar from 'boring-avatars';
import { CommentOutlined } from '@ant-design/icons';
import { handleEmoji } from '@blog/client/common/helper.util';

const getBadgeVisitorOrAuthor = (identity) => {
    return identity !== 0 ? <span>博主</span> : <span>游客</span>;
};

export const CommentItem = (props: {
    item: IComment;
    showCommentForm: string;
    setShowCommentForm: any;
    parentNickName?: string;
    parentId?: string;
}) => {
    const { showCommentForm, setShowCommentForm, parentId, parentNickName } = props;
    const item = props.item;
    return (
        <div className={style.commentItem}>
            <div className={style.commentItemInner}>
                <div className={style.commentItemAvatar}>
                    <Avatar size={40} name={item.nickName} square variant="beam" />
                </div>
                <div className={style.commentItemRight}>
                    <div className={style.commentItemRightTop}>
                        <div className={style.commentHeader}>
                            <div className={style.commentHeaderLeftContent}>
                                <span className={style.commentItemNickName}>{item.nickName}</span>
                            </div>
                        </div>
                        <p
                            className={style.commentItemContent}
                            dangerouslySetInnerHTML={{
                                __html:
                                    (item.reply
                                        ? `@${item.reply.nickName}：`
                                        : parentId
                                          ? `@${parentNickName}：`
                                          : '') + xss(handleEmoji(item.content).replace(/\n/g, '<br>')),
                            }}
                        ></p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space>
                                <span className={style.time}>{getBadgeVisitorOrAuthor(item.identity)}</span>
                                <span>·</span>
                                <span className={style.time}>{timeAgo(item.createdAt)}</span>
                            </Space>
                            <Button
                                fill="none"
                                style={{ color: 'var(--secondary-text-color)' }}
                                onClick={() => setShowCommentForm(showCommentForm === item._id ? '' : item._id)}
                            >
                                <CommentOutlined style={{ fontSize: 16 }}></CommentOutlined>
                            </Button>
                        </div>
                        {showCommentForm === item._id && (
                            <CommentForm
                                url="/api/comments"
                                parentId={parentId || item._id}
                                articleId={isString(item.article) ? item.article : item.article._id}
                                replyId={item._id}
                                placeholder={`回复@${item.nickName}`}
                            />
                        )}
                    </div>
                    <div className={style.commentReplyList}>
                        {item.comments?.items?.map((_) => {
                            return (
                                <CommentItem
                                    showCommentForm={showCommentForm}
                                    setShowCommentForm={setShowCommentForm}
                                    key={_._id}
                                    parentNickName={item.nickName}
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
