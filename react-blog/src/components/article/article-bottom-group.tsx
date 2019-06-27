import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { ContentLoader } from '../content-loader';

const ListGrouped = styled.div`
    display: flex;
`;

const ListItem = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    padding: 9px 0;
    &.list-nice-overlay{
        max-width: 25%;
        margin: 10px;
        padding: 0;
        .list-content {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 8px 16px;
            z-index: 1;
        }
        a{
            color: #FFF;
            font-size: 14px;
            text-decoration: none
        }
         .media{
            max-width: 100%!important;
        }
    }
`;

const Media = styled.div`
    max-width: 33%;
    position: relative;
    width: 100%;
    &:after{
        content: '';
        display: block;
        padding-top: 100%;
        padding-top: 75%;
    }
`;

const MediaContent = styled(Link)`
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

interface ItemProps {
    _id: string;
    screenshot: string;
    title: string;
}

interface Props {
    item: ItemProps;
}

const Item = (props: Props) => {
    const { item } = props;
    return (
        <ListItem className="list-nice-overlay" key={'rl' + item._id}>
            <Media className="media">
                <MediaContent
                    to={`/blog/articles/${item._id}`}
                    className="media-content"
                    style={{ backgroundImage: `url(${item.screenshot})` }}
                >
                </MediaContent>
                <div className="media-action">
                    <i className="iconfont icon-pic-s"></i>
                </div>
            </Media>
            <div className="list-content">
                <div className="list-body">
                    <a href={`/blog/articles/${item._id}`} className="list-title h-2x" rel="noopener noreferrer" target="_blank">
                        {item.title}
                    </a>
                </div>
            </div>
        </ListItem>
    );
};

const Loading = () => (
    <ContentLoader width={960} height={240} style={{ width: '400px' }}>
        <rect x="0" y="0" width="960" height="40"></rect>
        <rect x="0" y="60" width="960" height="40"></rect>
        <rect x="0" y="120" width="960" height="40"></rect>
    </ContentLoader>
);

export default (props: { recentArticles: ItemProps[] }) => {
    const { recentArticles } = props;
    let arr = recentArticles;
    if (Array.isArray(recentArticles) && (recentArticles.length <= 0)) {
        arr = new Array(4).fill(null);
    }
    return (
        <div className="container">
            <div className="list-header h4 mb-3 mb-md-4">相关文章</div>
            <ListGrouped>
                {
                    arr.map((item, index) => {
                        return item ? <Item item={item} key={item._id}></Item> : <Loading key={`article_bottom_group_loading_${index}`}></Loading>;
                    })
                }
            </ListGrouped>
        </div>
    );
};