import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    font-size: 18px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px;
    ${media.phone`
        display: flex;
        /* flex-direction: row-reverse; */
    `};
`;

const Content = styled.div`
    width: 100%;
    margin-left: 14px;
    ${media.phone`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `};
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    >a{
        color: #999;
        font-size: 12px;
        text-decoration: none;
    }
    &.time {
        ${media.phone`
            display: none;
        `};
    }
`;

const Title = styled(Link)`
    color: rgb(85,85,85);
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    &:hover {
        color: '#007fff';
    }
    ${media.phone`
        font-size: 16px;
        white-space: normal;
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
        /* height: 80px; */
        width: 33.65%;
    `}
    img{
        width: 100%;
        height: auto;
        min-height: fill-available;
        display: block;
        max-width: 100%;
        transition: all 444ms ease-in-out;
    }
    &:after{
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
    transition: .3s all linear;
    text-overflow: -o-ellipsis-lastline;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 48px;
    line-height: 24px;
    ${media.phone`
        display: none;
    `};
`;

const Loading = connect(
    (state: any) => ({
        $G: state.$G
    })
)((props: any) => (
    !props.$G.isMobile ?
        <ContentLoader width={240} height={300} uniqueKey={'article-item'} style={{ height: '300px' }}>
            <rect x="0" y="0" width="230" height="140"></rect>
            <rect x="0" y="150" width="140" height="14"></rect>
            <rect x="0" y="174" width="200" height="14"></rect>
            <rect x="0" y="198" width="180" height="14"></rect>
            <rect x="0" y="222" width="230" height="14"></rect>
        </ContentLoader>
        :
        <ContentLoader width={375} height={114} uniqueKey={'article-item'} style={{ height: '114px' }}>
            <rect x="20" y="20" width="240" height="14"></rect>
            <rect x="20" y="44" width="280" height="14"></rect>
            <rect x="20" y="70" width="190" height="14"></rect>
            <rect x="20" y="94" width="335" height="14"></rect>
        </ContentLoader>
));

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
                    <Title to={`/blog/articles/${item._id}`}>{item.title}</Title>
                    <Summary>{item.summary}</Summary>
                    <Meta>
                        <a href="javascript:;">评论：{item.commentCount}</a> <em>·</em>
                        <a href="javascript:;">阅读：{item.viewsCount}</a> <em>·</em>
                        <span>分类：{(item.category && item.category.name) || '暂无分类'}</span>
                    </Meta>
                </Content>
            </Brief>
        </ArticleItem>
    );
};

const C: SFC<{ item: any }> = (props: any) => {
    return props.item ? <Item item={props.item}></Item> : <li><Loading></Loading></li>;
};

export default C;