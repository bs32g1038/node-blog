import React, { useState, useEffect } from 'react';
import { timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const handleEmoji = (text) => {
    const regex = /@\((.+?)\)/g;
    return text.replace(regex, (str) => {
        if (str) {
            const r = /\((.+?)\)/g.exec(str);
            if (r) {
                const name = r[1];
                return `<img class="emoji" src="/static/images/emotion/${name}.png" style="width:28px;height:28px;vertical-align: bottom; display: inline-block;" />`;
            }
        }
        return str;
    });
};

const getBadgeVisitorOrAuthor = (identity) => {
    return identity !== 0 ? <span>博主</span> : <span>游客</span>;
};

const replyFn = (item: any) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(item.nickName) || '');
    }, [item._id]);
    return (
        <div className={style.commentReplyItem}>
            <div className={style.commentItemReplyContent}>
                <div className={style.commentItemReplyInfo}>
                    <span>&nbsp;&nbsp;</span>
                    <img
                        style={{ width: '16px', height: '16px' }}
                        src={avatarSrc}
                        className={style.commentItemAvatar}
                    />
                    <span>
                        <strong>{item.nickName}</strong>
                    </span>
                    <span className={style.divide}></span>
                    {getBadgeVisitorOrAuthor(item.identity)}
                    <span className={style.divide}></span>
                    <span>{timeAgo(item.createdAt)}</span>
                    <div className={style.commentHeaderRight}>
                        <a onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}>回复</a>
                    </div>
                </div>
                <p
                    style={{ marginBottom: 0, marginTop: '10px' }}
                    dangerouslySetInnerHTML={{
                        __html: xss(handleEmoji(item.content)),
                    }}
                ></p>
                {showCommentForm === item._id && (
                    <CommentForm url="/comments" articleId={item.article._id} replyId={item._id} />
                )}
            </div>
        </div>
    );
};

export const CommentItem = (props: { item: any; index: number }) => {
    const [showCommentForm, setShowCommentForm] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(props.item.nickName) || '');
    }, [props.item._id]);
    const item = props.item;
    return (
        <div className={style.commentItem}>
            <div className={style.commentItemInner}>
                <img src={avatarSrc} className={style.commentItemAvatar} />
                <div className={style.commentItemRight}>
                    <div className={style.commentHeader}>
                        <div className={style.commentHeaderLeft}>
                            <div className={style.commentHeaderLeftContent}>
                                <span className={style.commentItemNickName}>{item.nickName}</span>
                                <span className={style.divide}></span>
                                {getBadgeVisitorOrAuthor(item.identity)}
                                <span className={style.divide}></span>
                                <span className={style.commentHeaderTime}>{timeAgo(item.createdAt)}</span>
                            </div>
                        </div>
                        <div className={style.commentHeaderRight}>
                            <a onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}>回复</a>
                        </div>
                    </div>
                    <p
                        style={{ marginBottom: '8px', marginTop: '8px' }}
                        dangerouslySetInnerHTML={{
                            __html: xss(handleEmoji(item.content)),
                        }}
                    ></p>
                    {showCommentForm === item._id && (
                        <CommentForm url="/comments" articleId={item.article._id} replyId={item._id} />
                    )}
                    <div className={style.commentReplyList}>
                        {item.comments?.items?.map((item) => {
                            return replyFn(item);
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
