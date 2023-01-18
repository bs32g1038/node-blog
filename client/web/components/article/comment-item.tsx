import React, { useState } from 'react';
import { parseTime } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { IComment } from '@blog/client/web/api';
import { isString } from 'lodash';
import { Space } from 'antd';
import Avatar from 'boring-avatars';

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

const ReplyComponent = (props: { parentId: string; item: IComment }) => {
    const { parentId, item } = props;
    const [showCommentForm, setShowCommentForm] = useState('');
    return (
        <div className={style.commentReplyItem}>
            <div className={style.commentItemReplyContent}>
                <div className={style.commentItemReplyInfo}>
                    <div className={style.left}>
                        <Space size={4}>
                            <div className={style.commentItemReplyAvatar}>
                                <Avatar size={16} name={item.nickName} variant="beam" />
                            </div>
                            <span>
                                <strong>{item.nickName}</strong>
                            </span>
                            <div className={style.replyNickName}>{item.reply && <div>@{item.reply.nickName}</div>}</div>
                            <p
                                className={style.replyContent}
                                dangerouslySetInnerHTML={{
                                    __html: xss(handleEmoji(item.content)),
                                }}
                            ></p>
                        </Space>
                    </div>
                    <Space style={{ paddingLeft: '25px' }}>
                        {getBadgeVisitorOrAuthor(item.identity)}
                        <span>{parseTime(item.createdAt)}</span>
                        <a
                            style={{ color: 'var(--secondary-text-color)' }}
                            onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                        >
                            回复
                        </a>
                    </Space>
                </div>
                {showCommentForm === item._id && (
                    <CommentForm
                        url="/comments"
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
                        </div>
                        <p
                            className={style.commentItemContent}
                            dangerouslySetInnerHTML={{
                                __html: xss(handleEmoji(item.content)),
                            }}
                        ></p>
                        <Space>
                            {getBadgeVisitorOrAuthor(item.identity)}
                            <span>{parseTime(item.createdAt)}</span>
                            <a
                                style={{ color: 'var(--secondary-text-color)' }}
                                onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}
                            >
                                回复
                            </a>
                        </Space>
                    </div>
                    {showCommentForm === item._id && (
                        <CommentForm
                            url="/comments"
                            parentId={item._id}
                            articleId={isString(item.article) ? item.article : item.article._id}
                            replyId={item._id}
                        />
                    )}
                    <div className={style.commentReplyList}>
                        {item.comments?.items?.map((_) => {
                            return <ReplyComponent key={_._id} parentId={item._id} item={_}></ReplyComponent>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
