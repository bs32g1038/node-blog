import styled from '@emotion/styled';
import Link from '../link';
import React, { useState } from 'react';
import config from '../../config/site-info';
import media from '../../utils/media';
import { parseTime } from '../../../libs/time';
import { ContentLoader } from '../content-loader';
import Comment from './comment';
import MarkdownBody from '../markdown-body';
import message from '../message';
import {
    Box,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
    Link as UiLink,
    Flex,
    List,
    ListItem,
    ListIcon,
    Heading,
} from '@chakra-ui/core';

export const MODE = {
    normal: 'normal',
    reading: 'reading',
};

const ArticleItem = styled.div<{ mode: string }>`
    max-width: ${props => (props.mode === MODE.reading ? '100%' : '570px')};
    flex: 1 0 auto;
    position: relative;
    transition: max-width 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    ${media.phone`
            padding-left: 12px;
            padding-right: 12px;
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 20px;
        `}
`;

const ModePanel = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    ${media.phone`
            display: none;
        `}
`;

const ModeButton = styled.button<{ active: boolean }>`
    border: none;
    background-color: transparent;
    border-radius: 3px;
    cursor: pointer;
    padding: 3px 5px;
    margin-right: 5px;
    outline: none;
    font-size: 12px;
    transition: color 0.2s ease-in, border 0.2s ease-in;
    border: 1px solid ${props => (props.active ? '#f86422' : 'hsla(0, 0%, 59.2%, 0.2)')};
    color: ${props => (props.active ? '#f86422' : '#999')};
    ${props => props.active && 'pointer-events:none'};
`;

const ArticleHeader = styled.div`
    margin-bottom: 20px;
`;

interface Props {
    loading: boolean;
    article: any;
    comments: any[];
    getReadMode: Function;
}

const C = (props: Props) => {
    const { article, comments } = props;
    const [mode, setMode] = useState(MODE.normal);
    if (typeof props.getReadMode === 'function') {
        props.getReadMode(mode);
    }
    return (
        <Box bg="theme.article.bg" position="relative" flex="1 0 auto" maxW="570px" width="100%">
            {/* <ModePanel>
                <ModeButton
                    active={mode === MODE.normal}
                    onClick={() => {
                        message.success('已切换到常规模式！', 1500);
                        setMode(MODE.normal);
                    }}
                >
                    常规模式
                </ModeButton>
                <ModeButton
                    active={mode === MODE.reading}
                    onClick={() => {
                        message.success('已切换到阅读模式！', 1500);
                        setMode(MODE.reading);
                    }}
                >
                    阅读模式
                </ModeButton>
            </ModePanel> */}
            <Breadcrumb spacing="3px" separator={<Icon color="gray.500" name="chevron-right" />}>
                <BreadcrumbItem>
                    <Link href="/">
                        <BreadcrumbLink fontSize={12} color="gray.500">
                            首页
                        </BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href={'/blog/articles?cid=' + (article.category && article.category._id)}>
                        <BreadcrumbLink fontSize={12} color="gray.500">
                            {article.category && article.category.name}
                        </BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink fontSize={12} color="gray.500">
                        {article.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <ArticleHeader>
                <Link href={`/blog/articles/${article._id}`} passHref={true}>
                    <Heading as="h2" size="xl" my={[4]}>
                        {article.title}
                    </Heading>
                </Link>
                <Flex fontSize={12} flexWrap="wrap">
                    <Text color="gray.500" mr={1}>
                        发表于{parseTime(article.createdAt)}
                    </Text>
                    <Text color="gray.500" mr={1}>
                        分类于
                        <Link href={`/blog/articles?cid=${article.category && article.category._id}`}>
                            <Text as="a" color="gray.500" cursor="pointer">
                                {article.category && article.category.name}
                            </Text>
                        </Link>
                    </Text>
                    <Text color="gray.500" mr={1}>
                        {article.commentCount}条评论
                    </Text>
                    <Text color="gray.500">阅读次数{article.viewsCount}</Text>
                </Flex>
            </ArticleHeader>
            <Box color="theme.article.primaryText">
                <MarkdownBody content={article.content}></MarkdownBody>
            </Box>
            <List
                spacing={3}
                fontSize={13}
                mb={4}
                px={4}
                py={2}
                backgroundColor="theme.blackground"
                borderRadius="md"
                borderColor="#e5e5e5"
                color="theme.article.primaryText"
            >
                <ListItem mb={1}>
                    <Text as="strong">本文链接：</Text>
                    <Link href={config.domain + '/blog/articles/' + article._id} passHref={true}>
                        <UiLink isTruncated={true}>{config.domain + '/blog/articles/' + article._id}</UiLink>
                    </Link>
                </ListItem>
                <ListItem>
                    <Text as="strong">版权声明：</Text>
                    <Text as="span">
                        自由转载-署名-非商业性使用
                        <Text mx={1} as="i">
                            |
                        </Text>
                        <UiLink mr={1} href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/" isExternal={true}>
                            CC BY-NC-SA 3.0 CN
                        </UiLink>
                        许可协议。
                    </Text>
                </ListItem>
            </List>
            <Flex justifyContent="space-between" fontSize={13} color="theme.article.primaryText">
                {article.prev && (
                    <Text isTruncated={true} width="45%" mr={5}>
                        <Text as="strong">上一篇：</Text>
                        <Link href={`/blog/articles/${article.prev._id}`} passHref={true}>
                            <UiLink>{article.prev.title}</UiLink>
                        </Link>
                    </Text>
                )}
                {article.next && (
                    <Text isTruncated={true} width="45%">
                        <Text as="strong">下一篇：</Text>
                        <Link href={`/blog/articles/${article.next._id}`} passHref={true}>
                            <UiLink>{article.next.title}</UiLink>
                        </Link>
                    </Text>
                )}
            </Flex>
            <Comment article={article} comments={comments}></Comment>
        </Box>
    );
};

const loading = (
    <ContentLoader width={720} height={520} style={{ width: '100%', height: '520px' }}>
        <rect x="0" y="0" width="320" height="20"></rect>
        <rect x="0" y="40" width="420" height="30"></rect>
        <rect x="600" y="20" width="120" height="60"></rect>
        <rect x="0" y="90" width="320" height="20"></rect>
        <rect x="0" y="130" width="720" height="30"></rect>
        <rect x="0" y="150" width="720" height="120"></rect>
        <rect x="0" y="290" width="720" height="20"></rect>
        <rect x="0" y="330" width="720" height="50"></rect>
        <rect x="0" y="400" width="720" height="120"></rect>
    </ContentLoader>
);

export default (props: Props) => {
    return !props.loading && props.article && Object.keys(props.article).length > 0 ? <C {...props}></C> : loading;
};
