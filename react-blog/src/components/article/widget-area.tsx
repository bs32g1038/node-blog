import styled from '@emotion/styled';
import React from 'react';
import { parseTime } from '../../utils/time';
import { ContentLoader } from '../content-loader';

const WidgetArea = styled.div`
    display: flex;
    width: 240px;
    margin-left: 20px;
    min-width: 240px;
`;

const WidgetTitle = styled.div`
    color: #8a92a9;
    font-size: 16px;
    padding-bottom: 16px;
    margin-top: 18px;
    margin-bottom: 18px;
    position: relative;
    border-bottom: 1px solid #f5f6fa;
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

const MediaContent = styled.a`
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

const ListTitle = styled.a`
    text-decoration: none;
    color: #062743;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
`;

const ListContent = styled.div`
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;
    padding-left: 16px;
`;

const TextMuted = styled.div`
    color: #8a92a9;
    font-size: 12px;
`;

interface ItemProps {
    _id: string;
    screenshot: string;
    createdAt: string;
    title: string;
}

interface Props {
    item: ItemProps;
}

const Item = (props: Props) => {
    const { item } = props;
    return (
        <ListItem key={'rc' + item._id}>
            <Media>
                <MediaContent
                    href={`/blog/articles/${item._id}`}
                    className="media-content"
                    style={{ backgroundImage: `url(${item.screenshot})` }}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                </MediaContent>
                <div className="media-action">
                    <i className="iconfont icon-pic-s"></i>
                </div>
            </Media>
            <ListContent>
                <div className="list-body">
                    <ListTitle href={`/blog/articles/${item._id}`} className="list-title text-sm h-2x" rel="noopener noreferrer" target="_blank">{item.title}</ListTitle>
                </div>
                <TextMuted>
                    <div>{parseTime(item.createdAt)}</div>
                </TextMuted>
            </ListContent>
        </ListItem>
    );
};

const Loading = () => (
    <ContentLoader width={240} height={85}>
        <rect x="0" y="0" width="100" height="85"></rect>
        <rect x="120" y="0" width="120" height="40"></rect>
        <rect x="120" y="75" width="60" height="10"></rect>
    </ContentLoader>
);

export default (props: { recentArticles: ItemProps[] }) => {
    const { recentArticles } = props;
    let arr = recentArticles;
    if (Array.isArray(recentArticles) && (recentArticles.length <= 0)) {
        arr = new Array(5).fill(null);
    }
    return (
        <WidgetArea>
            <section className="widget Recommended_Posts">
                <WidgetTitle>最近文章</WidgetTitle>
                <div className="list-grid list-grid-padding" style={{ width: '240px' }}>
                    {
                        arr.map((item, index) => {
                            return item ? <Item item={item} key={item._id}></Item> : <Loading key={`recommended_posts_loading_${index}`}></Loading>;
                        })
                    }
                    <a href="https://www.vultr.com/?ref=7866918-4F">
                        <img
                            src="https://www.vultr.com/media/banners/banner_300x250.png"
                            style={{
                                width: '220px',
                                border: '1px solid #ccc',
                                height: 'auto',
                            }}
                        />
                    </a>
                </div>
            </section>
        </WidgetArea>
    );
};