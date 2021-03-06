import styled from '@emotion/styled';
import React, { SFC } from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/core';
import Link from '../link';
import UiLink from '../ui-link';
import Icon from '../icon';
import Trend from '../Trend';
import { LazyLoad } from '../lazy-load';
import { parseTime } from '@blog/client/libs/time';
import { rem } from 'polished';

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

const ThumbImg = styled(Box)`
    height: 100px;
    width: 150px;
    background-color: ${(props: any) => props.theme.colors.theme.imageBg};
    background-size: cover;
    background-position: 100% 100%;
`;

const Item: SFC<{ item: any }> = (props: any) => {
    const item = props.item;
    return (
        <Flex
            bg="theme.articles.bg"
            borderStyle="solid"
            borderBottomWidth="1px"
            borderBottomColor="theme.articles.borderColor"
            pb={4}
            pt={5}
            alignItems="center"
            isTruncated={true}
            key={item._id}
        >
            <Box ml={[0, 3]} mr={[0, 4]} width="100%">
                <Link href={`/blog/articles/${item._id}`} passHref={true} prefetch={false}>
                    <Heading
                        as="h2"
                        color="theme.articles.titleColor"
                        fontSize={rem(20)}
                        cursor="pointer"
                        whiteSpace="normal"
                    >
                        {item.title}
                    </Heading>
                </Link>
                <Text
                    color="theme.articles.secondaryText"
                    fontSize={rem(14)}
                    my={rem(10)}
                    wordBreak="break-all"
                    whiteSpace="normal"
                >
                    <span className="cat">发布于 {parseTime(item.createdAt)}</span>
                    <Text as="em" ml={1} mr={1}>
                        ·
                    </Text>
                    <span className="cat">{(item.category && item.category.name) || '暂无分类'}</span>{' '}
                    <Text as="em" ml={1} mr={1}>
                        ·
                    </Text>
                    <a>阅读：{item.viewsCount}</a>
                    <Text as="em" ml={1} mr={1}>
                        ·
                    </Text>
                    <a>评论：{item.commentCount}</a>
                </Text>
                <Text
                    mb={rem(10)}
                    fontSize={rem(16)}
                    color="theme.articles.color"
                    wordBreak="break-all"
                    whiteSpace="normal"
                >
                    {item.summary}
                </Text>
                {item.tags.length > 0 && (
                    <Flex alignItems="center" mt={3}>
                        <Icon name="tag" fill="theme.articles.secondaryText"></Icon>
                        {item.tags.map((name: any) => (
                            <Link href={`/blog/articles?tag=${name}`} passHref={true} key={'tag_uid' + name}>
                                <UiLink
                                    fontSize={rem(14)}
                                    ml={2}
                                    textTransform="capitalize"
                                    color="theme.articles.secondaryText"
                                >
                                    {name}
                                </UiLink>
                            </Link>
                        ))}
                    </Flex>
                )}
            </Box>
            <Flex flexDirection="column" display={['none', 'flex']} mr={[0, 3]}>
                <ThumbWrap>
                    <LazyLoad
                        component={ThumbImg}
                        attrs={{
                            style: { backgroundImage: `url(${item.screenshot})` },
                        }}
                    ></LazyLoad>
                </ThumbWrap>
                <div title={item.title + ' 访问趋势'}>
                    <Trend data={[1, 1, ...item.dayReadings.map((tmp: any) => tmp.count), 1, 1]} />
                </div>
            </Flex>
        </Flex>
    );
};

export default Item;
