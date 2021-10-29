import React from 'react';
import { Card } from 'antd';
import marked from '@blog/client/libs/marked';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import { timeAgo } from '@blog/client/libs/time';
import { ClockCircleOutlined } from '@ant-design/icons';
import style from './RecentCommentList.style.module.scss';

interface Props {
    recentComments: any[];
    loading: boolean;
}

export default (props: Props) => {
    const { recentComments = [], loading = false } = props;
    return (
        <Card
            className={style.recentCommentListCard}
            style={{ marginBottom: 24 }}
            title="近期评论"
            bordered={false}
            bodyStyle={{ padding: 0 }}
            loading={loading}
        >
            <div>
                {recentComments.map((item) => (
                    <div className={style.commentMessage} key={item._id}>
                        <div className={style.commentInfo}>
                            <span style={{ flex: '1 0 auto', display: 'flex' }}>
                                <div className={style.nickName}>
                                    <strong>{item.nickName}</strong>
                                </div>
                                &nbsp;在&nbsp;
                                <a
                                    className={style.commentContentTitleA}
                                    href={`/blog/articles/${item.article && item.article._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.article && item.article.title}
                                </a>
                                {item.reply ? (
                                    <div className={style.nickName}>
                                        &nbsp;回复&nbsp;<strong>{item.reply.nickName}</strong>&nbsp;
                                    </div>
                                ) : (
                                    <span>&nbsp;说：&nbsp;</span>
                                )}
                            </span>
                            <span className={style.timestampSpan}>
                                <ClockCircleOutlined
                                    style={{
                                        marginRight: '5px',
                                    }}
                                />
                                <span>{timeAgo(item.createdAt)}</span>
                            </span>
                        </div>
                        <div className="random-logo">
                            <img className={style.commentLogoImg} src={gernateAvatarImage(item.nickName) || ''} />
                        </div>
                        <div className={style.commentTextDiv}>
                            <div
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: marked(item.content),
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
