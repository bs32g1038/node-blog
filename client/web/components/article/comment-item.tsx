import React, { useState } from 'react';
import { parseTime, timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { IComment } from '@blog/client/web/api';
import { isString } from 'lodash';
import { Button, Space } from 'antd';
import Avatar from 'boring-avatars';
import { CommentOutlined } from '@ant-design/icons';

const handleEmoji = (text) => {
    const regex = /@\((.+?)\)/g;
    return text.replace(regex, (str) => {
        if (str) {
            const r = /\((.+?)\)/g.exec(str);
            if (r) {
                const name = r[1];
                return `<img class="emoji" src="/static/images/emotion/${name}.png" style="width:28px;height:28px;display: inline-block;" />`;
            }
        }
        return str;
    });
};

const getBadgeVisitorOrAuthor = (identity) => {
    return identity !== 0 ? <span>博主</span> : <span>游客</span>;
};

const ReplyComponent = (props: { parentId: string; item: IComment; parentNickName: string }) => {
    const { parentId, item, parentNickName } = props;
    const [showCommentForm, setShowCommentForm] = useState('');
    return (
        <div className={style.commentReplyItem}>
            <div className={style.commentItemReplyContent}>
                <div className={style.commentItemReplyInfo}>
                    <div className={style.left}>
                        <div className={style.commentItemReplyAvatar}>
                            <Avatar size={16} name={item.nickName} variant="beam" />
                        </div>
                        <span className={style.commentItemNickName}>{item.nickName}</span>
                        <span className={style.time}>{getBadgeVisitorOrAuthor(item.identity)}</span>
                        <span className={style.time}>{timeAgo(item.createdAt)}</span>
                        <div className={style.replyNickName}>
                            {item.reply ? `@${item.reply.nickName}` : parentId && `@${parentNickName}`}
                        </div>
                    </div>
                    <Button
                        type="text"
                        size="small"
                        style={{ color: 'var(--secondary-text-color)' }}
                        onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        icon={<CommentOutlined></CommentOutlined>}
                    >
                        评论
                    </Button>
                </div>
                <Space size={4} align="start">
                    <p
                        className={style.replyContent}
                        dangerouslySetInnerHTML={{
                            __html: xss(handleEmoji(item.content)),
                        }}
                    ></p>
                </Space>
                {showCommentForm === item._id && (
                    <CommentForm
                        url="/api/comments"
                        parentId={parentId}
                        articleId={item.article as string}
                        replyId={item._id}
                    />
                )}
            </div>
        </div>
    );
};

export const CommentItem = (props: { item: IComment; index: number }) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const item = props.item;
    return (
        <div className={style.commentItem}>
            <div className={style.commentItemInner}>
                <div className={style.commentItemAvatar}>
                    <Avatar size={40} name={item.nickName} variant="beam" />
                </div>
                <div className={style.commentItemRight}>
                    <div className={style.commentHeader}>
                        <div className={style.commentHeaderLeftContent}>
                            <span className={style.commentItemNickName}>{item.nickName}</span>
                            <span className={style.time}>{getBadgeVisitorOrAuthor(item.identity)}</span>
                            <span className={style.time}>{parseTime(item.createdAt)}</span>
                        </div>
                        <Button
                            type="text"
                            size="small"
                            style={{ color: 'var(--secondary-text-color)' }}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                            icon={<CommentOutlined></CommentOutlined>}
                        >
                            评论
                        </Button>
                    </div>
                    <p
                        className={style.commentItemContent}
                        dangerouslySetInnerHTML={{
                            __html: xss(handleEmoji(item.content)),
                        }}
                    ></p>
                    {showCommentForm === item._id && (
                        <CommentForm
                            url="/api/comments"
                            parentId={item._id}
                            articleId={isString(item.article) ? item.article : item.article._id}
                            replyId={item._id}
                        />
                    )}
                    <div className={style.commentReplyList}>
                        {item.comments?.items?.map((_) => {
                            return (
                                <ReplyComponent
                                    key={_._id}
                                    parentNickName={item.nickName}
                                    parentId={item._id}
                                    item={_}
                                ></ReplyComponent>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
