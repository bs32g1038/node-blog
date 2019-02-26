import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import media from '../../utils/media';
import { parseTime } from '../../utils/time';
import LazyLoad from '../lazy-load';

const ArticleItem = styled.li`
    border-bottom: 1px solid rgba(178,186,194,.15);
    padding: 0.2rem 0;
    ${media.phone`
        padding-left: 8px;
        padding-right: 8px;
    `};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0 10px;
`;

const Brief = styled.div`
    display: block;
    font-size: 18px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    height: 96px;
    width: 150px;
    ${media.phone`
        height: 96px;
        width: 80px;
        min-width: 80px;
    `}
`;

const ThumbA = styled.a`
    box-shadow: 0 10px 14px #d0d0d0;
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: 100%;
    width: 100%;
`;

const Summary = styled.p`
    font-size: 14px;
    margin: 8px 0;
    word-wrap: break-word;
`;

const Item: SFC<{ item: any }> = (props: any) => {
    const item = props.item;
    return (
        <ArticleItem>
            <Header>
                <Brief>
                    <Meta>
                        <strong>TIME</strong>
                        <em>·</em> {parseTime(item.createdAt)}
                    </Meta>
                    <Title to={`/blog/articles/${item._id}`}>{item.title}</Title>
                    <Meta>
                        <a href="javascript:;">评论：{item.commentCount}</a> <em>·</em>
                        <a href="javascript:;">阅读：{item.viewsCount}</a> <em>·</em>
                        <span>分类：{(item.category && item.category.name) || '暂无分类'}</span>
                    </Meta>
                </Brief>
                <ThumbWrap>
                    <LazyLoad tag={ThumbA} style={{ backgroundImage: `url(${item.screenshot})` }}></LazyLoad>
                </ThumbWrap>
            </Header>
            <Summary>{item.summary}</Summary>
        </ArticleItem>
    );
};
export default Item;