import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import media from '../../utils/media';
import { parseTime } from '../../utils/time';
import LazyLoad from '../lazy-load';

const ArticleItem = styled.li`
    /* border-bottom: 1px solid rgba(178,186,194,.15); */
    padding: 0.2rem 0;
    max-width: 25%;
    flex: 1 0 auto;
    ${media.phone`
        padding-left: 8px;
        padding-right: 8px;
    `};
`;

const Header = styled.div`
    justify-content: space-between;
    margin: 10px 10px 10px;
`;

const Brief = styled.div`
    display: block;
    font-size: 18px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Meta = styled.div`
    color: #999;
    font-size: 12px;
    >a{
        color: #999;
        font-size: 12px;
        text-decoration: none;
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
        height: 96px;
        width: 80px;
        min-width: 80px;
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
`;

const Item: SFC<{ item: any }> = (props: any) => {
    const item = props.item;
    return (
        <ArticleItem>
            <Header>
                <Brief>
                    <ThumbWrap>
                        <LazyLoad tag={ThumbA}>
                            <img src={item.screenshot} />
                        </LazyLoad>
                    </ThumbWrap>
                    <Meta>
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
                </Brief>
            </Header>
        </ArticleItem>
    );
};

export default Item;