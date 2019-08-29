import styled from '@emotion/styled';
import Link from 'next/link';
import React, { SFC } from 'react';
import media from '../../utils/media';
import { parseTime } from '../../utils/time';
import { ContentLoader } from '../content-loader';
import { LazyLoad } from '../lazy-load';
import * as theme from '../../theme';
import Trend from '../Trend';

const ArticleItem = styled.li`
    padding: 15px 0 10px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
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
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px;
    line-height: 1.5;
    display: block;
    width: 100%;
    margin-right: 20px;
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
    color: ${theme.textColorSecondary};
    font-size: 12px;
    margin-top: 1em;
    margin-bottom: 1em;
    > a {
        color: ${theme.textColorSecondary};
        font-size: 12px;
        text-decoration: none;
    }
    &.time {
        font-size: 13px;
        ${media.phone`
            display: none;
        `};
    }
    .cmt {
        margin-right: 5px;
    }
`;

const Title = styled.a`
    color: ${theme.headingColor};
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    font-size: 18px;
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

const RightContent = styled.div`
    display: flex;
    flex-direction: column;
    ${media.phone`
       display: none;
    `}
`;

const ThumbWrap = styled.div`
    height: auto;
    height: 100px;
    width: 150px;
    position: relative;
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0;
    flex-shrink: 0;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    margin-bottom: 5px;
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
        padding-top: 100%;
        box-sizing: border-box;
    }
`;

const ThumbImg = styled.div`
    height: 100px;
    width: 150px;
    background-color: #fff;
    background-size: cover;
    background-position: 100% 100%;
`;

const Summary = styled.p`
    margin: 0;
    word-wrap: break-word;
    font-size: 14px;
    color: ${theme.textColor};
    word-wrap: break-word;
    overflow: hidden;
    ${media.phone`
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 48px;
        line-height: 24px;
    `}
`;

const Tags = styled.div`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 1.4em;
    svg {
        display: inline-block;
        fill: #757070;
    }
`;

const Tag = styled.a`
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.45);
    text-transform: capitalize;
    text-decoration: none;
    font-size: 13px;
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
                <Content>
                    <Link href={`/blog/articles/${item._id}`} passHref={true}>
                        <Title>{item.title}</Title>
                    </Link>
                    <Meta>
                        <span className="cat">发布于 {parseTime(item.createdAt)} </span>
                        <em className="cmt">·</em>
                        <span className="cat">{(item.category && item.category.name) || '暂无分类'}</span>{' '}
                        <em className="cmt">·</em>
                        <a>阅读：{item.viewsCount}</a> <em className="cmt">·</em>
                        <a>评论：{item.commentCount}</a>
                    </Meta>
                    <Summary>{item.summary}</Summary>
                    {item.tags.length > 0 && (
                        <Tags>
                            <svg viewBox="0 0 32 32" height="16" width="16">
                                <path d="M8 4v28l10-10 10 10v-28h-20zM24 0h-20v28l2-2v-24h18v-2z"></path>
                            </svg>
                            {item.tags.map((name: any) => (
                                <Link href={`/blog/articles?tag=${name}`} passHref={true} key={'tag' + name}>
                                    <Tag>{name}</Tag>
                                </Link>
                            ))}
                        </Tags>
                    )}
                </Content>
            </Brief>
            <RightContent>
                <ThumbWrap>
                    <LazyLoad tag={'div'}>
                        <ThumbImg style={{ backgroundImage: `url(${item.screenshot} )` }} />
                    </LazyLoad>
                </ThumbWrap>
                <div title={item.title + ' 访问趋势'}>
                    <Trend data={[1, 1, ...item.dayReadings.map((tmp: any) => tmp.count), 1, 1]} />
                </div>
            </RightContent>
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
