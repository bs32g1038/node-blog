import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';
import { parseTime } from '../../utils/time';

const ArticleItem = styled.li((_) => ({
    borderBottom: '1px solid rgba(178, 186, 194, .15)',
    padding: '10px 15px',
    label: 'article-item',
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const Header = styled.div((_) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0 10px'
}));

const Brief = styled.div((_) => ({
    display: 'block',
    fontSize: '18px',
    lineHeight: '32px',
    overflow: 'hidden',
    padding: '0 18px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
}));

const Meta = styled.div((_) => ({
    color: '#999',
    fontSize: '12px',
    '>a': {
        color: '#999',
        textDecoration: 'none'
    }
}));

const Title = styled(Link)((_) => ({
    color: 'rgb(85, 85, 85)',
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    '&:hover': {
        color: '#007fff'
    }
}));

const ThumbWrap = styled.div((_) => ({
    height: '96px',
    width: '150px'
}));

const ThumbA = styled.a((_) => ({
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'block',
    height: '100%',
    width: '100%'
}));

const Summary = styled.p((_) => ({
    fontSize: '14px',
    margin: '8px 18px',
    wordWrap: 'break-word'
}));

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
                    <ThumbA style={{ backgroundImage: `url(http://127.0.0.1:8080${item.screenshot})` }}></ThumbA>
                </ThumbWrap>
            </Header>
            <Summary>{item.summary}</Summary>
        </ArticleItem>
    );
};
export default Item;