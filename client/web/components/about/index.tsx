import React, { useEffect, useState } from 'react';
import data from './data';
import dynamic from 'next/dynamic';
import GithubPinnedList from './github-pinned-list';
import { Box } from '@chakra-ui/core';
import Head from 'next/head';
import AppLayout from '@blog/client/web/layouts/app';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { Flex, List, ListItem, Image, Heading, Text, Spinner } from '@chakra-ui/core';
import Icon from '../icon';
import HelperListItem from './helper-list-item';
import * as api from '@blog/client/web/api/article';
export const GithubContribution = dynamic(() => import('./github-contribution'), {
    ssr: false,
    loading: () => (
        <Flex justifyContent="center" my={5}>
            <Spinner />
        </Flex>
    ),
});
const issues = [
    {
        _id: 1,
        question: '请问，你们目前承接网站开发业务吗？',
        answer: '你好，目前团队还在运作中，如果你有需求，可以通过邮箱联系我们。',
    },
    {
        _id: 2,
        question: '如果我要开发一个网站，我需要提供什么资料？',
        answer: '请明确你的需求，最低报价，工期，然后通过邮箱联系我们，我们将与你详细沟通。',
    },
];
export default () => {
    const config = useSelector((state: RootState) => state.app.config);
    const [userCommits, setUserCommits] = useState([]);
    useEffect(() => {
        api.fetchArticlesAggregationMapDate().then(data => {
            setUserCommits(data);
        });
    }, [1]);
    let totalCountInYear = 0;
    const values = userCommits.map(item => {
        totalCountInYear = totalCountInYear + item.articles.length;
        return {
            date: item._id,
            count: item.articles.length,
        };
    });
    return (
        <AppLayout>
            <Head>
                <title>{config.siteTitle + '-关于'}</title>
            </Head>
            <Flex>
                <Box height="100%" color="theme.white">
                    <Box background={`url(${require('@blog/client/assets/images/bg.jpg')})`}></Box>
                    <Box py={2} maxW="100%" margin="0 auto" pb={5}>
                        <List fontSize="14px">
                            <ListItem mb={3}>
                                <Flex>
                                    <Image
                                        border="1px solid #ccc"
                                        borderRadius="50%"
                                        p="1px"
                                        src={require('@blog/client/assets/images/avatar.jpg')}
                                        alt="头像"
                                        size="24px"
                                        mr={2}
                                    />
                                    <Heading as="h2" fontSize={20}>
                                        Jason Li
                                        <Text as="span" fontSize="13px" fontWeight="normal" ml={2}>
                                            web前端工程师
                                        </Text>
                                    </Heading>
                                </Flex>
                            </ListItem>
                            <ListItem mb={3}>
                                <Icon name="place" fill="gray.500" mr={2} size="20px" />
                                广东 广州
                            </ListItem>
                            <ListItem mb={3}>
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <Icon name="email" fill="gray.500" />
                                </Box>
                                bs32g1038#163.com（#换成@）
                            </ListItem>
                            <ListItem mb={3}>
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <Icon name="tag" fill="gray.500" />
                                </Box>
                                学海无涯苦作舟，梅花香自苦寒来。不断努力，寻找成功的阶梯。
                            </ListItem>
                            <ListItem>
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <Icon name="edit" color="gray.500" />
                                </Box>
                                本博客是一个技术性博客，主要发布关于web前端以及后端开发的文章。博主专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢
                                coding。
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <Box maxW="240px" flex="1 0 auto" fontSize={14} ml={5}>
                    <Text mb={2}>行路难 · 其一</Text>
                    <Text mb={2}>唐 · 李白</Text>
                    <Text mb={1.5}>金樽清酒斗十千，玉盘珍羞直万钱。</Text>
                    <Text mb={1.5}>停杯投箸不能食，拔剑四顾心茫然。</Text>
                    <Text mb={1.5}>欲渡黄河冰塞川，将登太行雪满山。</Text>
                    <Text mb={1.5}>闲来垂钓碧溪上，忽复乘舟梦日边。</Text>
                    <Text mb={1.5}>行路难！行路难！多歧路，今安在？</Text>
                    <Text>长风破浪会有时，直挂云帆济沧海。</Text>
                </Box>
            </Flex>
            <GithubContribution values={values} totalCountInYear={totalCountInYear}></GithubContribution>
            <Box mb={5}>
                <Flex justifyContent="space-between">
                    <Box bg="theme.blackground" p={5} textAlign="center" borderRadius="sm" mr={4}>
                        <Image
                            margin="0 auto"
                            size={10}
                            src={require('@blog/client/assets/images/telescope.png')}
                        ></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            团队还承接业务
                        </Text>
                    </Box>
                    <Box bg="theme.blackground" p={5} textAlign="center" borderRadius="sm" mr={4}>
                        <Image margin="0 auto" size={10} src={require('@blog/client/assets/images/psd.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            PSD转页面
                        </Text>
                    </Box>
                    <Box bg="theme.blackground" p={5} textAlign="center" borderRadius="sm" mr={4}>
                        <Image margin="0 auto" size={10} src={require('@blog/client/assets/images/pc.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            PC网站制作
                        </Text>
                    </Box>
                    <Box bg="theme.blackground" p={5} textAlign="center" borderRadius="sm" mr={4}>
                        <Image margin="0 auto" size={10} src={require('@blog/client/assets/images/app.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            移动端开发
                        </Text>
                    </Box>
                    <Box bg="theme.blackground" p={5} textAlign="center" borderRadius="sm">
                        <Image
                            margin="0 auto"
                            size={10}
                            src={require('@blog/client/assets/images/mini-program-fill.png')}
                        ></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            多端小程序
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <GithubPinnedList userRepos={data.userRepos}></GithubPinnedList>
            <Box fontSize="14px" p={5}>
                <Text textAlign="center" mb={5}>
                    <Icon name="info" mr={2}></Icon>常见问题
                </Text>
                {issues.map(issue => {
                    return <HelperListItem key={issue._id} issue={issue}></HelperListItem>;
                })}
            </Box>
            <Flex justifyContent="center">
                <a href="https://www.vultr.com/?ref=7007600">
                    <img src={require('@blog/client/assets/banners/vultr_banner_728x90.png')} width="728" height="90" />
                </a>
            </Flex>
        </AppLayout>
    );
};
