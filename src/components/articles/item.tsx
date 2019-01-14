import styled from '@emotion/styled';
import { padding } from 'polished';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import media from '../../utils/media';
import rem from '../../utils/rem';
import { parseTime } from '../../utils/time';

const ArticleItem = styled.li`
    border-bottom: 1px solid rgba(178,186,194,.15);
    padding: ${rem('10px')} ${rem('15px')};
    &:last-child {
        border-bottom: none;
    }
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
    ${padding(0, rem('18px'))}
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
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    height: 100%;
    width: 100%;
`;

const Summary = styled.p`
    font-size: 14px;
    margin: 8px 18px;
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
                    <ThumbA style={{ backgroundImage: `url(${item.screenshot})` }}></ThumbA>
                </ThumbWrap>
            </Header>
            <Summary>{item.summary}</Summary>
        </ArticleItem>
    );
};
export default Item;