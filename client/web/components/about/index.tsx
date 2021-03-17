import React, { useEffect, useState } from 'react';
import data from './data';
import GithubPinnedList from './github-pinned-list';
import Head from 'next/head';
import AppLayout from '@blog/client/web/layouts/app';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import { Box, Flex, List, ListItem, Image, Heading, Text } from '@chakra-ui/react';
import {EmailIcon, TagIcon, PlaceIcon } from '../../icons';
import HelperListItem from './helper-list-item';
import * as api from '@blog/client/web/api/article';
import PersonCommit from './person-commit';
import { EditIcon, InfoIcon } from '@chakra-ui/icons'

const AboutPage =  () => {
    const config = useSelector((state: RootState) => state.app.config);
    const [userCommits, setUserCommits] = useState([]);
    useEffect(() => {
        api.fetchArticlesAggregationMapDate().then((res) => {
            setUserCommits(res);
        });
    }, [1]);
    let totalCountInYear = 0;
    const values = userCommits.map((item) => {
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
            <Flex fontSize={14} position="relative">
                <Box height="100%" color="theme.white" mr={[0, '240px']} position="relative" zIndex={100}>
                    <Box py={2} maxW="100%" margin="0 auto" pb={5}>
                        <List>
                            <ListItem mb={3}>
                                <Flex>
                                    <Image
                                        border="1px solid #ccc"
                                        borderRadius="50%"
                                        p="1px"
                                        src={require('@blog/client/assets/images/avatar.jpg')}
                                        alt="头像"
                                        boxSize="24px"
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
                                <PlaceIcon name="place" fill="gray.500" mr={2} w="24px" h="24px" />
                                广东 广州
                            </ListItem>
                            <ListItem mb={3}>
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <EmailIcon name="email" fill="gray.500" />
                                </Box>
                                bs32g1038#163.com（#换成@）
                            </ListItem>
                            <ListItem mb={3} display="flex">
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <TagIcon name="tag" fill="gray.500" />
                                </Box>
                                孟子：尽信书，不如无书。史记：桃李不言，下自成蹊。
                            </ListItem>
                            <ListItem>
                                <Box width="20px" textAlign="center" display="inline-block" mr={2}>
                                    <EditIcon name="edit" color="gray.500" />
                                </Box>
                                本博客是一个技术性博客，主要发布关于web前端以及后端开发的文章。博主专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢
                                coding。
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <Box
                    position="absolute"
                    top="0"
                    right={['0', '-40px']}
                    bottom="0"
                    maxW="240px"
                    flex="1 0 auto"
                    fontSize={14}
                    height="auto"
                    backgroundSize="contain"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    width="100%"
                    backgroundImage={`url(${require('@blog/client/assets/images/meihua.png')})`}
                ></Box>
            </Flex>
            <PersonCommit values={values} totalCountInYear={totalCountInYear}></PersonCommit>
            <Box mb={5} overflow="hidden" overflowX="auto" height="116.5px" mx={-3}>
                <Flex>
                    <Box
                        bg="theme.blackground"
                        p={5}
                        mx={3}
                        flex="1 0 auto"
                        textAlign="center"
                        borderRadius="sm"
                        animation="slideInUp .2s ease-in"
                    >
                        <Image
                            margin="0 auto"
                            boxSize={10}
                            src={require('@blog/client/assets/images/telescope.png')}
                        ></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            团队还承接业务
                        </Text>
                    </Box>
                    <Box
                        bg="theme.blackground"
                        p={5}
                        mx={3}
                        textAlign="center"
                        borderRadius="sm"
                        flex="1 0 auto"
                        animation="slideInUp .3s ease-in"
                    >
                        <Image margin="0 auto" boxSize={10} src={require('@blog/client/assets/images/psd.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            PSD转页面
                        </Text>
                    </Box>
                    <Box
                        bg="theme.blackground"
                        p={5}
                        mx={3}
                        textAlign="center"
                        borderRadius="sm"
                        flex="1 0 auto"
                        animation="slideInUp .4s ease-in"
                    >
                        <Image margin="0 auto" boxSize={10} src={require('@blog/client/assets/images/pc.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            PC网站制作
                        </Text>
                    </Box>
                    <Box
                        bg="theme.blackground"
                        p={5}
                        mx={3}
                        textAlign="center"
                        borderRadius="sm"
                        flex="1 0 auto"
                        animation="slideInUp .5s ease-in"
                    >
                        <Image margin="0 auto" boxSize={10} src={require('@blog/client/assets/images/app.png')}></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            移动端开发
                        </Text>
                    </Box>
                    <Box
                        bg="theme.blackground"
                        p={5}
                        mx={3}
                        flex="1 0 auto"
                        textAlign="center"
                        borderRadius="sm"
                        animation="slideInUp .6s ease-in"
                    >
                        <Image
                            margin="0 auto"
                            boxSize={10}
                            src={require('@blog/client/assets/images/mini-program-fill.png')}
                        ></Image>
                        <Text mt={2} color="theme.primaryText" fontSize={16}>
                            多端小程序
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <GithubPinnedList userRepos={data.userRepos}></GithubPinnedList>
            <Box p={5}>
                <Text textAlign="center" mb={5}>
                    <InfoIcon name="info" mr={2}></InfoIcon>常见问题
                </Text>
                {data.issues.map((issue) => {
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

export default AboutPage
