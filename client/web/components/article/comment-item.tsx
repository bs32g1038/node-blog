import React, { useState, useEffect } from 'react';
import { timeAgo } from '@blog/client/libs/time';
import { CommentForm } from '../comment-form';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import style from './comment-item.style.module.scss';
import { xss } from '@blog/client/libs/marked';
import { IComment } from '@blog/client/web/api';
import Image from 'next/image';
import { isString } from 'lodash';

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
    const [avatarSrc, setAvatarSrc] = useState('/null.png');
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(item.nickName) || '');
    }, [item.nickName]);
    return (
        <div className={style.commentReplyItem} key={item._id}>
            <div className={style.commentItemReplyContent}>
                <div className={style.commentItemReplyInfo}>
                    <div className={style.left}>
                        <div className={style.commentItemReplyAvatar}>
                            <Image width={72} height={72} src={avatarSrc} alt="" />
                        </div>
                        <span>
                            <strong>{item.nickName}</strong>
                        </span>
                        <span className={style.divide}></span>
                        {getBadgeVisitorOrAuthor(item.identity)}
                        <span className={style.divide}></span>
                        <span>{timeAgo(item.createdAt)}</span>
                    </div>
                    <div className={style.commentHeaderRight}>
                        <a onClick={() => setShowCommentForm(showCommentForm ? '' : item._id)}>回复</a>
                    </div>
                </div>
                <div style={{ marginBottom: 0, marginTop: '10px' }}>
                    {item.reply && (
                        <div className={style.parentWrapper}>
                            <div>“</div>
                            <div
                                className={style.parentContent}
                                dangerouslySetInnerHTML={{
                                    __html: xss(handleEmoji(item.reply.content)),
                                }}
                            ></div>
                            <div>”</div>
                        </div>
                    )}
                    <p
                        dangerouslySetInnerHTML={{
                            __html: xss(handleEmoji(item.content)),
                        }}
                    ></p>
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
    const [avatarSrc, setAvatarSrc] = useState('/null.png');
    useEffect(() => {
        setAvatarSrc(gernateAvatarImage(props.item.nickName) || '');
    }, [props.item.nickName]);
    const item = props.item;
    return (
        <div className={style.commentItem}>
            <div className={style.commentItemInner}>
                <div className={style.commentItemAvatar}>
                    <Image width={72} height={72} src={avatarSrc} alt="" />
                </div>
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
                        <CommentForm
                            url="/comments"
                            parentId={item._id}
                            articleId={isString(item.article) ? item.article : item.article._id}
                            replyId={item._id}
                        />
                    )}
                    <div className={style.commentReplyList}>
                        {item.comments?.items?.map((_) => {
                            return <ReplyComponent key={item._id} parentId={item._id} item={_}></ReplyComponent>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
