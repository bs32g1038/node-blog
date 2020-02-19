import styled from '@emotion/styled';
import React from 'react';
import { css } from 'emotion';
import { Box, Flex, Text, Heading } from '@chakra-ui/core';
import UiLink from '../../ui-link';
import media from '../../../utils/media';
import { parseTime } from '../../../../libs/time';
import { useFixedTopInScroll } from '../../../hook';
import { ContentLoader } from '../../content-loader';

const WidgetArea = styled.div`
    width: 200px;
    margin-left: 20px;
    min-width: 200px;
    ${media.phone`
        width: 100%;
        box-sizing: border-box;
        margin-left: 0;
        padding-left: 14px;
        padding-right: 10px;
        .widget{
            width: 100%;
        }
    `}
    &.fixed {
        position: fixed;
        top: 0;
        right: 50%;
        margin-right: -400px;
    }
`;

const Media = styled.div`
    max-width: 28%;
    position: relative;
    width: 100%;
    &:after {
        content: '';
        display: block;
        padding-top: 100%;
        padding-top: 75%;
    }
`;

const MediaContent = styled(UiLink)`
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
    createdAt: string;
    title: string;
}

interface Props {
    item: ItemProps;
}

const Item = (props: Props) => {
    const { item } = props;
    return (
        <Flex key={'rc' + item._id} width="100%" position="relative" py={2}>
            <Media>
                <MediaContent
                    href={`/blog/articles/${item._id}`}
                    style={{ backgroundImage: `url(${item.screenshot})` }}
                    isExternal={true}
                ></MediaContent>
            </Media>
            <Flex fontSize={14} pl={2} justifyContent="space-between" flexDirection="column">
                <UiLink href={`/blog/articles/${item._id}`} isExternal={true}>
                    <Heading
                        as="h2"
                        fontSize={14}
                        color="theme.primaryText"
                        isTruncated={true}
                        whiteSpace="normal"
                        className={css`
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        `}
                    >
                        {item.title}
                    </Heading>
                </UiLink>
                <Text fontSize={12} color="theme.secondaryText">
                    {parseTime(item.createdAt)}
                </Text>
            </Flex>
        </Flex>
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
    if (Array.isArray(recentArticles) && recentArticles.length <= 0) {
        arr = new Array(5).fill(null);
    }
    const [$dom, isFixed] = useFixedTopInScroll();
    return (
        <WidgetArea className={isFixed ? 'fixed' : ''}>
            <Box as="section" ref={$dom}>
                <Heading as="h3" fontSize="1.2rem" pt={2} pb={2} color="theme.primaryText">
                    最近文章
                </Heading>
                <Box>
                    {arr.map((item, index) => {
                        return item ? (
                            <Item item={item} key={item._id}></Item>
                        ) : (
                            <Loading key={`recommended_posts_loading_${index}`}></Loading>
                        );
                    })}
                    <a href="https://www.vultr.com/?ref=7866918-4F" className="vultr" style={{ display: 'block' }}>
                        <img
                            src="https://www.vultr.com/media/banners/banner_300x250.png"
                            style={{
                                width: '200px',
                                border: '1px solid #ccc',
                                height: 'auto',
                            }}
                        />
                    </a>
                </Box>
            </Box>
        </WidgetArea>
    );
};
