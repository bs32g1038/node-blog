import Link from '../link';
import React, { useEffect } from 'react';
import { timeAgo } from '@blog/client/libs/time';
import { DotLoading, Space } from 'antd-mobile';
import dynamic from 'next/dynamic';
const Comment = dynamic(() => import('./comment'), { ssr: false });
const ArticleAddress = dynamic(() => import('./article-address'), { ssr: false });
import style from './article-item.style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import clsx from 'clsx';
import { CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { useFetchCommentsQuery } from '@blog/client/web/api';
import { useStore } from './zustand';
import { useRouter } from 'next/router';

interface Props {
    article: any;
}

export default function ArticleItem(props: Props) {
    const { article } = props;
    const refreshCommentListTag = useStore((state) => state.refreshCommentListTag);
    const theme = useSelector((state: RootState) => state.app.theme);
    const router = useRouter();
    const {
        data: { items: comments } = { items: [] },
        isLoading,
        refetch,
    } = useFetchCommentsQuery(router.query.id as string);
    useEffect(() => {
        if (refreshCommentListTag !== 0) {
            refetch();
        }
    }, [refetch, refreshCommentListTag]);
    return (
        <div className={style.article}>
            <div className={style.media}>
                <div
                    className={style.mediaContent}
                    style={{
                        backgroundImage: `url(${article.screenshot})`,
                    }}
                ></div>
            </div>
            <div className={style.articleMeta}>
                <Link href={`/blog/articles/${article._id}`} passHref={true}>
                    <h2 className={style.articleTitle}>{article.title}</h2>
                </Link>
                <div className={style.articleMetaInfo}>
                    <Space>
                        <span>{timeAgo(article.createdAt)}</span>
                        <span>·</span>
                        <span>
                            <Link
                                href={`/blog/articles?cid=${article.category && article.category._id}`}
                                passHref={true}
                            >
                                {article.category && article.category.name}
                            </Link>
                        </span>
                    </Space>
                    <Space>
                        <Space>
                            <EyeOutlined style={{ fontSize: 16 }}></EyeOutlined>
                            <span>{article.viewsCount}</span>
                        </Space>
                        <Space>
                            <CommentOutlined style={{ fontSize: 16 }}></CommentOutlined>
                            <span>{article.commentCount}</span>
                        </Space>
                    </Space>
                </div>
            </div>
            <div
                className={clsx(
                    'rich-text-editor rich-text',
                    {
                        dark: theme === 'dark',
                    },
                    style.editor
                )}
            >
                <div className="ck-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
            <div className={style.statement}>
                <div>
                    <strong>本文链接：</strong>
                    <ArticleAddress articleId={article._id}></ArticleAddress>
                </div>
                <div>
                    <strong>版权声明：</strong>
                    <span>
                        自由转载-署名-非商业性使用
                        <i> | </i>
                        <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/">CC BY-NC-SA 3.0 CN</a>
                        许可协议。
                    </span>
                </div>
            </div>
            <div className={style.footer}>
                {article.prev && (
                    <div>
                        <strong>上一篇：</strong>
                        <Link href={`/blog/articles/${article.prev._id}`} passHref={true}>
                            {article.prev.title}
                        </Link>
                    </div>
                )}
                {article.next && (
                    <div>
                        <strong>下一篇：</strong>
                        <Link href={`/blog/articles/${article.next._id}`} passHref={true}>
                            {article.next.title}
                        </Link>
                    </div>
                )}
            </div>
            {isLoading ? <DotLoading /> : <Comment article={article} comments={comments ?? []}></Comment>}
        </div>
    );
}
