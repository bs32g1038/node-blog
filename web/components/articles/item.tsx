import styled from '@emotion/styled';
import Link from 'next/link';
import React, { SFC } from 'react';
import media from '../../utils/media';
import { parseTime } from '../../utils/time';
import { ContentLoader } from '../content-loader';
import { LazyLoad } from '../lazy-load';

const ArticleItem = styled.li`
    padding: 0.2rem 0;
    max-width: 25%;
    flex: 1 0 auto;
    position: relative;
    ${media.phone`
        width: 100%;
        max-width: 100%;
        padding: 0;
        &:after {
            content: '';
            position: absolute;
            border-bottom: 1px solid #e5e5e5;
            transform-origin: 0 0; /* 以左上角为基点 */
            transform: scaleY(.5); /* 缩放50% */
            box-sizing: border-box;
            bottom: 0;
            left: 0;
            right: 0
        }
    `};
`;

const Brief = styled.div`
    display: block;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px;
    ${media.phone`
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        margin: 18px;
    `};
`;

const Content = styled.div`
    width: 100%;
    ${media.phone`
        margin-right: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `};
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    > a {
        color: #999;
        font-size: 12px;
        text-decoration: none;
    }
    &.time {
        ${media.phone`
            display: none;
        `};
    }
    .cmt {
        margin-right: 5px;
    }
    ${media.phone`
        .cat {
            display: none;
        }
    `};
`;

const Title = styled.a`
    color: rgb(85, 85, 85);
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    font-size: 14px;
    &:hover {
        color: '#007fff';
    }
    ${media.phone`
        font-size: 16px;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    `};
`;

const ThumbWrap = styled.div`
    height: auto;
    width: 100%;
    position: relative;
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0;
    flex-shrink: 0;
    border-radius: 2px;
    ${media.phone`
        width: 80px;
        height: 80px;
    `}
    img {
        width: 100%;
        height: auto;
        min-height: fill-available;
        display: block;
        max-width: 100%;
        transition: all 444ms ease-in-out;
    }
    &:after {
        content: '';
        display: block;
        padding-top: 66.66666%;
        box-sizing: border-box;
    }
`;

const ThumbA = styled.a`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0;
    border-radius: 2px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: rgba(120, 120, 120, 0.1);
`;

const Summary = styled.p`
    margin: 0;
    word-wrap: break-word;
    margin-top: 4px;
    font-size: 12px;
    color: #93999f;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    transition: 0.3s all linear;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 48px;
    line-height: 24px;
`;

const Loading = () => (
    <ContentLoader width={375} height={114} uniqueKey={'article-item'} style={{ height: '114px' }}>
        <rect x="20" y="20" width="240" height="14"></rect>
        <rect x="20" y="44" width="280" height="14"></rect>
        <rect x="20" y="70" width="190" height="14"></rect>
        <rect x="20" y="94" width="335" height="14"></rect>
    </ContentLoader>
);

const Item: SFC<{ item: any }> = (props: any) => {
    const item = props.item;
    return (
        <ArticleItem>
            <Brief>
                <ThumbWrap>
                    <LazyLoad component={ThumbA}>
                        <img src={item.screenshot} />
                    </LazyLoad>
                </ThumbWrap>
                <Content>
                    <Meta className="time">
                        <strong>TIME</strong>
                        <em>·</em> {parseTime(item.createdAt)}
                    </Meta>
                    <Link href={`/blog/articles/${item._id}`} passHref={true}>
                        <Title>{item.title}</Title>
                    </Link>
                    <Summary>{item.summary}</Summary>
                    <Meta>
                        <span className="cat">{(item.category && item.category.name) || '暂无分类'}</span>{' '}
                        <em className="cmt">·</em>
                        <a href="javascript:;">阅读：{item.viewsCount}12</a> <em className="cmt">·</em>
                        <a href="javascript:;">评论：{item.commentCount}2</a>
                    </Meta>
                </Content>
            </Brief>
        </ArticleItem>
    );
};

const C: SFC<{ item: any; loading: boolean }> = (props: any) => {
    return !props.loading && props.item ? (
        <Item item={props.item}></Item>
    ) : (
        <li>
            <Loading></Loading>
        </li>
    );
};

export default C;
