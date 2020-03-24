import styled from '@emotion/styled';
import React from 'react';
import { css } from 'emotion';
import { Box, Flex, Text, Heading } from '@chakra-ui/core';
import UiLink from '@blog/client/web/components/ui-link';
import { parseTime } from '@blog/client/libs/time';
import { useFixedTopInScroll } from '@blog/client/web/hooks/useFixedTopInScroll';
import { rem } from 'polished';

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
            <Flex fontSize={rem(14)} pl={2} justifyContent="space-between" flexDirection="column">
                <UiLink href={`/blog/articles/${item._id}`} isExternal={true}>
                    <Heading
                        as="h2"
                        fontSize={rem(15)}
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
                <Text fontSize={13} color="theme.secondaryText">
                    {parseTime(item.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default (props: { recentArticles: ItemProps[] }) => {
    const [$dom, isFixed] = useFixedTopInScroll();
    const { recentArticles } = props;
    let arr = recentArticles;
    if (Array.isArray(recentArticles) && recentArticles.length <= 0) {
        arr = new Array(5).fill(null);
    }
    return (
        <Box
            minW="200px"
            width="200px"
            pl={5}
            display={['none', 'block']}
            ref={$dom}
            className={
                isFixed &&
                css`
                    position: fixed;
                    top: 0;
                    right: 50%;
                    margin-right: -380px;
                `
            }
        >
            <Box as="section">
                <Heading as="h3" fontSize="1.2rem" pt={2} pb={2} color="theme.primaryText">
                    最近文章
                </Heading>
                <Box>
                    {arr.map((item) => {
                        return <Item item={item} key={item._id}></Item>;
                    })}
                    <a href="https://www.vultr.com/?ref=7866918-4F" className="vultr" style={{ display: 'block' }}>
                        <img
                            src={require('@blog/client/assets/banners/vultr_banner_300x250.png')}
                            style={{
                                width: '200px',
                                border: '1px solid #ccc',
                                height: 'auto',
                            }}
                        />
                    </a>
                </Box>
            </Box>
        </Box>
    );
};
